const dicePattern = /(?<!\p{L})[кd](4|6|8|10|12)([+-]\d+)?(?![\p{L}\p{N}])/giu

const escapeHtml = (value: string): string =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')

export function decorateDiceNotation(value: string): string {
  return value.replaceAll(dicePattern, (_match, sides: string, modifier = '') => {
    const notation = `d${sides}${modifier}`
    const modifierClass = modifier.startsWith('-') ? ' dice-notation__modifier--negative' : ''

    return `<span class="dice-notation" aria-label="Кубик ${notation}"><span class="dice-notation__value">d${sides}</span>${modifier ? `<span class="dice-notation__modifier${modifierClass}">${modifier}</span>` : ''}</span>`
  })
}

export function renderDiceText(value: string): string {
  return decorateDiceNotation(escapeHtml(value))
}
