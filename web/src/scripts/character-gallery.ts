interface CharacterCardElement extends HTMLElement {
  dataset: DOMStringMap & {
    dialog?: string;
    filters?: string;
    search?: string;
  };
}

function openCard(card: CharacterCardElement): void {
  const dialog = document.getElementById(card.dataset.dialog ?? "") as HTMLDialogElement | null;
  dialog?.showModal();
}

document.querySelectorAll<HTMLElement>("[data-character-gallery]").forEach((gallery) => {
  const filters = [...gallery.querySelectorAll<HTMLSelectElement>("[data-character-filter]")];
  const search = gallery.querySelector<HTMLInputElement>("[data-character-search]");
  const count = gallery.querySelector<HTMLOutputElement>("[data-character-count]");
  const cards = [...gallery.querySelectorAll<CharacterCardElement>("[data-character-card]")];

  const apply = (): void => {
    const query = (search?.value.trim().toLocaleLowerCase("ru") ?? "").replace(/ё/g, "е");
    let visible = 0;
    for (const card of cards) {
      const values = JSON.parse(card.dataset.filters ?? "{}") as Record<string, string>;
      const matchesFilters = filters.every((filter) => {
        const key = filter.dataset.characterFilter ?? "";
        return !filter.value || values[key] === filter.value;
      });
      const matchesSearch = !query || card.dataset.search?.includes(query);
      const show = matchesFilters && matchesSearch;
      card.hidden = !show;
      if (show) visible += 1;
    }
    if (count) count.value = `Показано: ${visible}`;
  };

  filters.forEach((filter) => filter.addEventListener("change", apply));
  search?.addEventListener("input", apply);
  cards.forEach((card) => {
    card.addEventListener("click", () => openCard(card));
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openCard(card);
    });
  });
});

document.querySelectorAll<HTMLDialogElement>("[data-character-dialog]").forEach((dialog) => {
  dialog.querySelector<HTMLButtonElement>("[data-character-close]")?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});
