#import "../../lib/veil.typ": *

#let chapter(title: none, body) = {
  if title != none {
    heading(level: 1, title)
  }
  body
}
