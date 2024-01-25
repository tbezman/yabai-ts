import type {
  DisplaySelection,
  Layer,
  SpaceSelection,
  WindowSelection,
} from "./types.ts";
import { run } from "./execute.ts";

/**
 * Focus the given window. If none specified, focus the selected window instead.
 */
export function focus(window?: WindowSelection) {
  run(["yabai", "-m", "window", "--focus", window]);
}

/**
 * Swap position of the selected window and the given window.
 */
export function swap(window: WindowSelection) {
  run(["yabai", "-m", "window", "--swap", window]);
}

/**
 * Re-insert the selected window, splitting the given window.
 */
export function warp(window: WindowSelection) {
  run(["yabai", "-m", "window", "--warp", window]);
}

/**
 * Stack the given window on top of the selected window.
 * Any kind of warp operation performed on a stacked window will unstack it.
 */
export function stack(window: WindowSelection) {
  run(["yabai", "-m", "window", "--stack", window]);
}

/**
 * Set the splitting mode of the selected window.
 * If the current splitting mode matches the selected mode, the action will be undone.
 */
export function insert(
  direction: "west" | "east" | "south" | "north" | "stack",
) {
  run(["yabai", "-m", "window", "--insert", direction]);
}

/**
 * Set the frame of the selected window based on a self-defined grid.
 */
export function grid(
  param: `${number}:${number}:${number}:${number}:${number}:${number}`,
) {
  run(["yabai", "-m", "window", "--grid", param]);
}

/**
 * If type is rel the selected window is moved by dx pixels horizontally and dy pixels vertically, otherwise dx and dy will become its new position.
 */
export function move(param: `${"abs" | "rel"}:${number}:${number}`) {
  run(["yabai", "-m", "window", "--move", param]);
}

/**
 * Resize the selected window by moving the given handle dx pixels horizontally and dy pixels vertically. If handle is abs the new size will be dx width and dy height and cannot be used on managed windows.
 */
export function resize(
  param:
    | "top"
    | "left"
    | "bottom"
    | "right"
    | "top_left"
    | "top_right"
    | "bottom_right"
    | "bottom_left"
    | `abs:${number}:${number}`,
) {
  run(["yabai", "-m", "window", "--resize", param]);
}

/**
 * If type is rel the split ratio of the selected window is changed by dr, otherwise dr will become the new split ratio. A positive/negative delta will increase/decrease the size of the left-child.
 */
export function ratio(param: `${"abs" | "rel"}:${number}`) {
  run(["yabai", "-m", "window", "--ratio", param]);
}

/**
 * Toggle the given property of the selected window.
 * The following properties require System Integrity Protection to be partially disabled: sticky, pip, shadow.
 */
export function toggle(
  param:
    | "float"
    | "sticky"
    | "pip"
    | "shadow"
    | "split"
    | "zoom-parent"
    | "zoom-fullscreen"
    | "native-fullscreen"
    | "expose",
) {
  run(["yabai", "-m", "window", "--toggle", param]);
}

/**
 * Set the stacking layer of the selected window. The window will no longer be eligible for automatic change in layer when managed/unmanaged.
 */
export function layer(layer: Layer) {
  run(["yabai", "-m", "window", "--layer", layer]);
}

/**
 * Set the opacity of the selected window. The window will no longer be eligible for automatic change in opacity upon focus change.
 */
export function opacity(opacity: number) {
  run(["yabai", "-m", "window", "--opacity", opacity]);
}

/**
 * Send the selected window to the given display.
 */
export function display(display: DisplaySelection) {
  run(["yabai", "-m", "window", "--display", display]);
}

/**
 * Send the selected window to the given space.
 */
export function space(space: SpaceSelection) {
  run(["yabai", "-m", "window", "--space", space]);
}

/**
 * Minimizes the given window. If none specified, minimize the selected window instead. Only works on windows that provide a minimize button in its titlebar.
 */
export function minimize(window: WindowSelection) {
  run(["yabai", "-m", "window", "--minimize", window]);
}

/**
 * Restores the given window, if it is minimized. The window will only get focus if the owning application has focus.
 */
export function deminimize(window: WindowSelection) {
  run(["yabai", "-m", "window", "--deminimize", window]);
}

/**
 * Closes the given window. If none specified, close the selected window instead. Only works on windows that provide a close button in its titlebar.
 */
export function close(window?: WindowSelection) {
  run(["yabai", "-m", "window", "--close", window]);
}
