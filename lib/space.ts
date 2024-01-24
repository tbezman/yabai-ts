import type { DisplaySelection, Label, SpaceSelection } from "./types.ts";

/**
 * Focus the given space.
 * System Integrity Protection must be partially disabled.
 */
export function focus(space: SpaceSelection) {
  return ["yabai", "-m", "space", "--focus", space];
}

/**
 * Create a new space on the given display. If none specified, use the display of the active space instead.
 * System Integrity Protection must be partially disabled.
 */
export function create(display?: DisplaySelection) {
  return ["yabai", "-m", "display", "--create", display];
}

/**
 * Remove the given space. If none specified, use the selected space instead.
 * System Integrity Protection must be partially disabled.
 */
export function destroy(space?: SpaceSelection) {
  return ["yabai", "-m", "space", "--destroy", space];
}

/**
 * Move position of the selected space to the position of the given space.
 * The selected space and given space must both belong to the same display.
 * System Integrity Protection must be partially disabled.
 */
export function move(space: SpaceSelection) {
  return ["yabai", "-m", "window", "--space", space];
}

/**
 * Swap the selected space with the given space.
 * The selected space and given space must both belong to the same display.
 * System Integrity Protection must be partially disabled.
 */
export function swap(space: SpaceSelection) {
  return ["yabai", "-m", "space", "--swap", space];
}

/**
 * Send the selected space to the given display.
 * System Integrity Protection must be partially disabled.
 */
export function display(display: DisplaySelection) {
  return ["yabai", "-m", "space", "--display", display];
}

/**
 * Adjust the split ratios on the selected space so that all windows along the given axis occupy the same area. If no axis is specified, use both.
 */
export function balance(axis?: "x-axis" | "y-axis") {
  return ["yabai", "-m", "space", "--balance", axis];
}

/**
 * Flip the tree of the selected space along the given axis.
 */
export function mirror(axis: "x-axis" | "y-axis") {
  return ["yabai", "-m", "space", "--mirror", axis];
}

/**
 * Rotate the tree of the selected space.
 */
export function rotate(degrees: 90 | 180 | 270) {
  return ["yabai", "-m", "space", "--rotate", degrees];
}

/**
 * Padding added at the sides of the selected space.
 */
export function padding(
  param: `abs|rel:${number}:${number}:${number}:${number}`,
) {
  return ["yabai", "-m", "space", "--padding", param];
}

/**
 * Padding added at the sides of the selected space.
 */
export function gap(param: `abs|rel:${number}`) {
  return ["yabai", "-m", "space", "--gap", param];
}

/**
 * Toggle space setting on or off for the selected space.
 */
export function toggle(
  param: "padding" | "gap" | "mission-control" | "show-desktop",
) {
  return ["yabai", "-m", "space", "--toggle", param];
}

/**
 * Set the layout of the selected space.
 */
export function layout(param: "bsp" | "stack" | "float") {
  return ["yabai", "-m", "space", "--layout", param];
}

/**
 * Label the selected space, allowing that label to be used as an alias in commands that take a SPACE_SEL parameter.
 * If the command is called without an argument it will try to remove a previously assigned label.
 */
export function label(label?: Label) {
  return ["yabai", "-m", "space", "--label", label];
}
