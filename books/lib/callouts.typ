#import "colors.typ": *

#let draft-banner(body) = block(
  width: 100%,
  inset: 8pt,
  fill: rgb("#fff3cd"),
  stroke: color-draft,
  text(fill: color-draft, weight: "bold")[DRAFT / WORKING CANON — #body],
)

#let gm(body) = block(
  width: 100%,
  inset: 8pt,
  fill: rgb("#f8e8e8"),
  stroke: color-gm,
  [
    #text(fill: color-gm, weight: "bold")[GM ONLY]
    #body
  ],
)
