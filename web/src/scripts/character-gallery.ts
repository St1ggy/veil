type CharacterCardElement = {
  dataset: DOMStringMap & {
    dialog?: string
    filters?: string
    search?: string
  }
} & HTMLButtonElement

type ImageOpenElement = {
  dataset: DOMStringMap & {
    characterImage?: string
    characterImageAlt?: string
  }
} & HTMLElement

function openDialog(dialog: HTMLDialogElement): void {
  if (!dialog.open) dialog.showModal()
}

document.querySelectorAll<HTMLElement>('[data-character-gallery]').forEach((gallery) => {
  const filters = [...gallery.querySelectorAll<HTMLInputElement>('input[data-character-filter]')]
  const compassFilters = [...gallery.querySelectorAll<HTMLInputElement>('input[data-character-compass]')]
  const search = gallery.querySelector<HTMLInputElement>('[data-character-search]')
  const count = gallery.querySelector<HTMLOutputElement>('[data-character-count]')
  const cards = [...gallery.querySelectorAll<CharacterCardElement>('[data-character-card]')]
  const groups = [...gallery.querySelectorAll<HTMLElement>('[data-character-group]')]
  const dialogs = [...gallery.querySelectorAll<HTMLDialogElement>('[data-character-dialog]')]
  const imageDialog = gallery.querySelector<HTMLDialogElement>('[data-character-image-dialog]')
  const imageElement = imageDialog?.querySelector<HTMLImageElement>('[data-character-image-element]')

  const closeOpenCharacterDialog = (): void => {
    dialogs.find((dialog) => dialog.open)?.close()
  }

  const openCard = (card: CharacterCardElement): void => {
    const dialog = gallery.querySelector<HTMLDialogElement>(`#${CSS.escape(card.dataset.dialog ?? '')}`)

    if (!dialog) return

    closeOpenCharacterDialog()
    openDialog(dialog)
  }

  const visibleCards = (): CharacterCardElement[] => cards.filter((card) => !card.closest('.character-card')?.hidden)

  const moveDialog = (dialog: HTMLDialogElement, direction: -1 | 1): void => {
    const activeCards = visibleCards()
    const current = activeCards.findIndex((card) => card.dataset.dialog === dialog.id)

    if (current === -1 || activeCards.length < 2) return

    const next = activeCards[(current + direction + activeCards.length) % activeCards.length]

    openCard(next)
  }

  const openImage = (source: ImageOpenElement): void => {
    const source_ = source.dataset.characterImage

    if (!source_ || !imageDialog || !imageElement) return

    imageElement.src = source_
    imageElement.alt = source.dataset.characterImageAlt ?? 'Портрет персонажа'
    openDialog(imageDialog)
  }

  const apply = (): void => {
    const query = (search?.value.trim().toLocaleLowerCase('ru') ?? '').replaceAll('ё', 'е')
    let visible = 0

    for (const card of cards) {
      const values = JSON.parse(card.dataset.filters ?? '{}') as Record<string, string>
      const isMatchesFilters =
        filters.every((filter) => {
          const key = filter.dataset.characterFilter ?? ''

          return !filter.value || values[key] === filter.value
        }) &&
        compassFilters
          .filter((filter) => filter.checked && filter.value)
          .every((filter) => {
            const key = filter.dataset.characterCompass ?? ''

            return !filter.value || values[key] === filter.value
          })
      const matchesSearch = !query || card.dataset.search?.includes(query)
      const show = isMatchesFilters && matchesSearch
      const cardContainer = card.closest<HTMLElement>('.character-card')

      if (cardContainer) cardContainer.hidden = !show

      if (show) visible += 1
    }

    for (const group of groups) {
      group.hidden = [...group.querySelectorAll<HTMLElement>('.character-card')].every((card) => card.hidden)
    }

    if (count) count.value = `Показано: ${visible}`
  }

  for (const filter of filters) filter.addEventListener('change', apply)
  for (const filter of compassFilters) filter.addEventListener('change', apply)

  const customSelects = [...gallery.querySelectorAll<HTMLElement>('[data-custom-select-toggle]')]
  const closeCustomSelects = (except?: HTMLElement): void => {
    for (const toggle of customSelects) {
      if (toggle === except) continue

      toggle.setAttribute('aria-expanded', 'false')
      toggle.parentElement?.querySelector<HTMLElement>('[data-custom-select-menu]')?.setAttribute('hidden', '')
    }
  }

  for (const toggle of customSelects) {
    const wrapper = toggle.parentElement
    const menu = wrapper?.querySelector<HTMLElement>('[data-custom-select-menu]')
    const input = wrapper?.querySelector<HTMLInputElement>('input[data-character-filter]')
    const value = wrapper?.querySelector<HTMLElement>('[data-custom-select-value]')
    const icon = wrapper?.querySelector<HTMLElement>('[data-custom-select-icon]')

    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true'

      closeCustomSelects(toggle)
      toggle.setAttribute('aria-expanded', String(!open))

      if (menu) menu.hidden = open
    })

    menu?.querySelectorAll<HTMLButtonElement>('[data-custom-select-option]').forEach((option) => {
      option.addEventListener('click', () => {
        if (!input || !value) return

        input.value = option.dataset.value ?? ''
        value.textContent =
          option.querySelector<HTMLElement>('[data-custom-select-option-label]')?.textContent?.trim() ?? ''

        if (icon) icon.innerHTML = option.querySelector<SVGElement>('.filter-icon')?.outerHTML ?? ''

        menu.querySelectorAll<HTMLButtonElement>('[data-custom-select-option]').forEach((item) => {
          item.setAttribute('aria-selected', String(item === option))
        })
        closeCustomSelects()
        input.dispatchEvent(new Event('change', { bubbles: true }))
      })
    })
  }

  const compassFilter = gallery.querySelector<HTMLElement>('[data-compass-filter]')
  const compassToggle = compassFilter?.querySelector<HTMLButtonElement>('[data-compass-toggle]')
  const compassPanel = compassFilter?.querySelector<HTMLElement>('[data-compass-panel]')
  const setCompassOpen = (open: boolean): void => {
    if (!compassToggle || !compassPanel) return

    compassToggle.setAttribute('aria-expanded', String(open))
    compassPanel.hidden = !open
  }

  compassToggle?.addEventListener('click', () => setCompassOpen(compassPanel?.hidden ?? true))
  document.addEventListener('click', (event) => {
    if (compassFilter && !compassFilter.contains(event.target as Node)) setCompassOpen(false)

    if (
      !(event.target instanceof Element) ||
      !event.target.closest('[data-custom-select-toggle], [data-custom-select-menu]')
    ) {
      closeCustomSelects()
    }
  })
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') {
      return
    }

    setCompassOpen(false)
    closeCustomSelects()
  })
  search?.addEventListener('input', apply)
  for (const card of cards) card.addEventListener('click', () => openCard(card))

  for (const dialog of dialogs) {
    dialog.querySelector<HTMLButtonElement>('[data-character-close]')?.addEventListener('click', () => dialog.close())
    dialog
      .querySelector<HTMLButtonElement>('[data-character-previous]')
      ?.addEventListener('click', () => moveDialog(dialog, -1))
    dialog
      .querySelector<HTMLButtonElement>('[data-character-next]')
      ?.addEventListener('click', () => moveDialog(dialog, 1))
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close()
    })
  }

  gallery.querySelectorAll<ImageOpenElement>('[data-character-image-open]').forEach((button) => {
    button.addEventListener('click', () => openImage(button))
  })

  imageDialog
    ?.querySelector<HTMLButtonElement>('[data-character-image-close]')
    ?.addEventListener('click', () => imageDialog.close())
  imageDialog?.addEventListener('click', (event) => {
    if (event.target === imageDialog) imageDialog.close()
  })

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return

    if (imageDialog?.open) return

    const dialog = dialogs.find((item) => item.open)

    if (!dialog) return

    event.preventDefault()
    moveDialog(dialog, event.key === 'ArrowLeft' ? -1 : 1)
  })
})
