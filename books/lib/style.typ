#import "colors.typ": *
#import "typography.typ": *
#import "callouts.typ": *
#import "links.typ": *
#import "icons.typ": *

#let apply-veil-style(body) = {
  set page(paper: "a4", margin: 2cm)
  set text(font: "Libertinus Serif", size: 11pt)
  set heading(numbering: "1.")
  set par(justify: true)
  body
}
