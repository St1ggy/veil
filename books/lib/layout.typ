#import "colors.typ": *
#import "typography.typ": *

#let veil-page() = {
  set page(paper: "a4", margin: 2cm, fill: color-paper)
  set text(font: veil-font, size: veil-text-size, fill: color-ink)
  set heading(numbering: "1.")
  set par(justify: true)
}
