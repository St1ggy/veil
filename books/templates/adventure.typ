#import "../../lib/veil.typ": *

#let adventure(title: "", body) = {
  show: apply-veil-style
  heading(level: 1)[#title]
  gm[Мастерский материал — не показывать игрокам без подготовки.]
  body
}
