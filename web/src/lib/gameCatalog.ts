import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";
import { gameSections, type GameSectionId } from "../i18n/gameSections";

const GAME_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../game",
);

export interface GameItem {
  /** Stable page key within section */
  slug: string;
  sectionId: GameSectionId;
  id?: string;
  title: string;
  summary?: string;
  type?: string;
  status?: string;
  tags?: string[];
  /** Relpath under game/ for primary source */
  sourcePath: string;
  yamlPath?: string;
  mdPath?: string;
  /** Parsed YAML / frontmatter fields (safe subset rendered on page) */
  data: Record<string, unknown>;
  /** Markdown body without frontmatter */
  bodyMd?: string;
}

function isBlockedDir(relPosix: string): boolean {
  const parts = relPosix.split("/");
  if (parts[0] === "gm") return true;
  if (parts[0] === "_schemas" || parts[0] === "_templates") return true;
  if (parts.some((p) => p.startsWith("_") && p !== "_schemas")) {
    // allow normal folders; block hidden/_internal only at top
  }
  return false;
}

function walkFiles(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    if (name.startsWith(".")) continue;
    const full = path.join(dir, name);
    const rel = path.relative(GAME_ROOT, full).split(path.sep).join("/");
    if (isBlockedDir(rel)) continue;
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      if (name === "gm" || name === "_schemas" || name === "_templates") continue;
      walkFiles(full, out);
    } else if (name.endsWith(".yaml") || name.endsWith(".yml") || name.endsWith(".md")) {
      out.push(full);
    }
  }
  return out;
}

function stripFrontmatter(raw: string): { data: Record<string, unknown>; body: string } {
  if (!raw.startsWith("---")) return { data: {}, body: raw };
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { data: {}, body: raw };
  const fm = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).replace(/^\s*\n/, "");
  try {
    const data = (parseYaml(fm) as Record<string, unknown>) || {};
    return { data, body };
  } catch {
    return { data: {}, body: raw };
  }
}

function isPublicMeta(data: Record<string, unknown>): boolean {
  const visibility = String(data.visibility ?? "").toLowerCase();
  if (visibility === "gm" || visibility === "secret") return false;
  const spoilers = String(data.spoilers ?? "").toLowerCase();
  if (spoilers === "gm" || spoilers === "secret") return false;
  return true;
}

function sectionForRel(relPosix: string): GameSectionId | undefined {
  for (const section of gameSections) {
    for (const root of section.roots) {
      if (relPosix === root || relPosix.startsWith(`${root}/`)) {
        return section.id;
      }
    }
  }
  return undefined;
}

function basenameKey(relPosix: string): string {
  return relPosix.replace(/\.(yaml|yml|md)$/i, "");
}

function slugFromRel(sectionId: GameSectionId, relPosix: string, id?: string): string {
  if (id && /^[A-Z][A-Z0-9_]*$/.test(id)) return id;
  const section = gameSections.find((s) => s.id === sectionId)!;
  for (const root of section.roots) {
    if (relPosix === root || relPosix.startsWith(`${root}/`)) {
      const rest = relPosix.slice(root.length).replace(/^\//, "");
      return basenameKey(rest || "index");
    }
  }
  return basenameKey(path.posix.basename(relPosix));
}

function titleFrom(data: Record<string, unknown>, fallback: string): string {
  const t = data.title;
  if (typeof t === "string" && t.trim()) return t.trim();
  return fallback
    .split("/")
    .pop()!
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

let cache: GameItem[] | null = null;

export function loadGameCatalog(): GameItem[] {
  if (cache) return cache;

  const files = walkFiles(GAME_ROOT);
  type Bundle = {
    sectionId: GameSectionId;
    key: string;
    yamlPath?: string;
    mdPath?: string;
    yamlData?: Record<string, unknown>;
    mdData?: Record<string, unknown>;
    bodyMd?: string;
  };

  const bundles = new Map<string, Bundle>();

  for (const full of files) {
    const rel = path.relative(GAME_ROOT, full).split(path.sep).join("/");
    if (rel === "README.md") continue;
    const sectionId = sectionForRel(rel);
    if (!sectionId) continue;

    const key = `${sectionId}::${basenameKey(rel)}`;
    const bundle = bundles.get(key) ?? { sectionId, key };
    const raw = fs.readFileSync(full, "utf8");

    if (/\.ya?ml$/i.test(full)) {
      let data: Record<string, unknown> = {};
      try {
        data = (parseYaml(raw) as Record<string, unknown>) || {};
      } catch {
        continue;
      }
      if (!isPublicMeta(data)) continue;
      bundle.yamlPath = rel;
      bundle.yamlData = data;
    } else {
      const { data, body } = stripFrontmatter(raw);
      if (!isPublicMeta(data)) continue;
      // Skip empty README scaffolds with only headings? keep them
      bundle.mdPath = rel;
      bundle.mdData = data;
      bundle.bodyMd = body;
    }
    bundles.set(key, bundle);
  }

  const items: GameItem[] = [];

  for (const bundle of bundles.values()) {
    const data = { ...(bundle.mdData || {}), ...(bundle.yamlData || {}) };
    if (!isPublicMeta(data)) continue;

    const sourcePath = bundle.yamlPath || bundle.mdPath!;
    // Section README becomes intro only — skip as list item named README
    const base = path.posix.basename(sourcePath).toLowerCase();
    if (base === "readme.md" || base === "readme.yaml") continue;

    const id = typeof data.id === "string" ? data.id : undefined;
    const slug = slugFromRel(bundle.sectionId, sourcePath, id);
    const title = titleFrom(data, slug);

    items.push({
      slug,
      sectionId: bundle.sectionId,
      id,
      title,
      summary:
        typeof data.summary === "string"
          ? data.summary.trim()
          : typeof data.purpose === "string"
            ? data.purpose.trim()
            : undefined,
      type: typeof data.type === "string" ? data.type : undefined,
      status: typeof data.status === "string" ? data.status : undefined,
      tags: Array.isArray(data.tags)
        ? data.tags.filter((t): t is string => typeof t === "string")
        : undefined,
      sourcePath,
      yamlPath: bundle.yamlPath,
      mdPath: bundle.mdPath,
      data,
      bodyMd: bundle.bodyMd,
    });
  }

  items.sort((a, b) => a.title.localeCompare(b.title, "en"));
  cache = items;
  return items;
}

export function gameItemsInSection(sectionId: GameSectionId): GameItem[] {
  return loadGameCatalog().filter((i) => i.sectionId === sectionId);
}

export function findGameItem(
  sectionId: string,
  slug: string,
): GameItem | undefined {
  return loadGameCatalog().find(
    (i) => i.sectionId === sectionId && i.slug === slug,
  );
}

export function sectionReadme(sectionId: GameSectionId): string | undefined {
  const section = gameSections.find((s) => s.id === sectionId);
  if (!section) return undefined;
  for (const root of section.roots) {
    const full = path.join(GAME_ROOT, root, "README.md");
    if (fs.existsSync(full)) {
      const { body } = stripFrontmatter(fs.readFileSync(full, "utf8"));
      return body;
    }
  }
  return undefined;
}

/** Fields safe/useful to show from YAML on the page */
export const DETAIL_KEYS = [
  "category",
  "rank",
  "severity",
  "requirements",
  "effects",
  "design_notes",
  "balance_notes",
  "future_hooks",
  "lore_targets",
  "dependencies",
  "scope",
  "purpose",
] as const;
