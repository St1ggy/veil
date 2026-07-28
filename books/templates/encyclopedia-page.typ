#import "../../lib/veil.typ": *

#let encyclopedia-page(title: "", body) = {
  show: apply-veil-style
  align(center, text(size: 18pt, weight: "bold")[#title])
  v(1em)
  body
}
