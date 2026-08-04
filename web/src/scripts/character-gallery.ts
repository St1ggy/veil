interface CharacterCardElement extends HTMLButtonElement {
  dataset: DOMStringMap & {
    dialog?: string;
    filters?: string;
    search?: string;
  };
}

interface ImageOpenElement extends HTMLElement {
  dataset: DOMStringMap & {
    characterImage?: string;
    characterImageAlt?: string;
  };
}

function openDialog(dialog: HTMLDialogElement): void {
  if (!dialog.open) dialog.showModal();
}

document.querySelectorAll<HTMLElement>("[data-character-gallery]").forEach((gallery) => {
  const filters = [...gallery.querySelectorAll<HTMLSelectElement | HTMLInputElement>("[data-character-filter]")];
  const search = gallery.querySelector<HTMLInputElement>("[data-character-search]");
  const count = gallery.querySelector<HTMLOutputElement>("[data-character-count]");
  const cards = [...gallery.querySelectorAll<CharacterCardElement>("[data-character-card]")];
  const dialogs = [...gallery.querySelectorAll<HTMLDialogElement>("[data-character-dialog]")];
  const imageDialog = gallery.querySelector<HTMLDialogElement>("[data-character-image-dialog]");
  const imageElement = imageDialog?.querySelector<HTMLImageElement>("[data-character-image-element]");

  const closeOpenCharacterDialog = (): void => {
    dialogs.find((dialog) => dialog.open)?.close();
  };

  const openCard = (card: CharacterCardElement): void => {
    const dialog = gallery.querySelector<HTMLDialogElement>(`#${CSS.escape(card.dataset.dialog ?? "")}`);
    if (!dialog) return;
    closeOpenCharacterDialog();
    openDialog(dialog);
  };

  const visibleCards = (): CharacterCardElement[] => cards.filter((card) => !card.closest(".character-card")?.hidden);

  const moveDialog = (dialog: HTMLDialogElement, direction: -1 | 1): void => {
    const activeCards = visibleCards();
    const current = activeCards.findIndex((card) => card.dataset.dialog === dialog.id);
    if (current === -1 || activeCards.length < 2) return;
    const next = activeCards[(current + direction + activeCards.length) % activeCards.length];
    openCard(next);
  };

  const openImage = (source: ImageOpenElement): void => {
    const src = source.dataset.characterImage;
    if (!src || !imageDialog || !imageElement) return;
    imageElement.src = src;
    imageElement.alt = source.dataset.characterImageAlt ?? "Портрет персонажа";
    openDialog(imageDialog);
  };

  const apply = (): void => {
    const query = (search?.value.trim().toLocaleLowerCase("ru") ?? "").replace(/ё/g, "е");
    let visible = 0;
    for (const card of cards) {
      const values = JSON.parse(card.dataset.filters ?? "{}") as Record<string, string>;
      const matchesFilters = filters.every((filter) => {
        const key = filter.dataset.characterFilter ?? "";
        const allowed = filter.dataset.filterValues ? JSON.parse(filter.dataset.filterValues) as string[] : undefined;
        const selected = allowed ? allowed[Number(filter.value)] ?? "" : filter.value;
        return !selected || values[key] === selected;
      });
      const matchesSearch = !query || card.dataset.search?.includes(query);
      const show = matchesFilters && matchesSearch;
      const cardContainer = card.closest<HTMLElement>(".character-card");
      if (cardContainer) cardContainer.hidden = !show;
      if (show) visible += 1;
    }
    if (count) count.value = `Показано: ${visible}`;
  };

  filters.forEach((filter) => {
    const updateSliderLabel = (): void => {
      if (!filter.dataset.filterValues) return;
      const values = JSON.parse(filter.dataset.filterValues) as string[];
      const text = values[Number(filter.value)] || "Любое значение";
      const label = gallery.querySelector<HTMLOutputElement>(`[data-character-filter-label="${CSS.escape(filter.dataset.characterFilter ?? "")}"]`);
      if (label) label.value = text;
      filter.setAttribute("aria-valuetext", text);
    };
    filter.addEventListener("change", () => { updateSliderLabel(); apply(); });
    filter.addEventListener("input", () => { updateSliderLabel(); apply(); });
    updateSliderLabel();
  });
  search?.addEventListener("input", apply);
  cards.forEach((card) => card.addEventListener("click", () => openCard(card)));

  dialogs.forEach((dialog) => {
    dialog.querySelector<HTMLButtonElement>("[data-character-close]")?.addEventListener("click", () => dialog.close());
    dialog.querySelector<HTMLButtonElement>("[data-character-previous]")?.addEventListener("click", () => moveDialog(dialog, -1));
    dialog.querySelector<HTMLButtonElement>("[data-character-next]")?.addEventListener("click", () => moveDialog(dialog, 1));
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  });

  gallery.querySelectorAll<ImageOpenElement>("[data-character-image-open]").forEach((button) => {
    button.addEventListener("click", () => openImage(button));
  });

  imageDialog?.querySelector<HTMLButtonElement>("[data-character-image-close]")?.addEventListener("click", () => imageDialog.close());
  imageDialog?.addEventListener("click", (event) => {
    if (event.target === imageDialog) imageDialog.close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    if (imageDialog?.open) return;
    const dialog = dialogs.find((item) => item.open);
    if (!dialog) return;
    event.preventDefault();
    moveDialog(dialog, event.key === "ArrowLeft" ? -1 : 1);
  });
});
