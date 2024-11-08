import { makeAccessor } from "./input/ColorInput.tsx";

export const prop = {
  ["--slow-key-color"]: makeAccessor("--slow-key-color"),
  ["--fast-key-color"]: makeAccessor("--fast-key-color"),
  ["--textinput__color"]: makeAccessor("--textinput__color"),
  ["--textinput--special__color"]: makeAccessor("--textinput--special__color"),
  ["--textinput--hit__color"]: makeAccessor("--textinput--hit__color"),
  ["--textinput--miss__color"]: makeAccessor("--textinput--miss__color"),
  ["--syntax-keyword"]: makeAccessor("--syntax-keyword"),
  ["--syntax-number"]: makeAccessor("--syntax-number"),
  ["--syntax-string"]: makeAccessor("--syntax-string"),
  ["--syntax-comment"]: makeAccessor("--syntax-comment"),
  ["--pinky-zone-color"]: makeAccessor("--pinky-zone-color"),
  ["--ring-zone-color"]: makeAccessor("--ring-zone-color"),
  ["--middle-zone-color"]: makeAccessor("--middle-zone-color"),
  ["--left-index-zone-color"]: makeAccessor("--left-index-zone-color"),
  ["--right-index-zone-color"]: makeAccessor("--right-index-zone-color"),
  ["--thumb-zone-color"]: makeAccessor("--thumb-zone-color"),
} as const;
