export type Label = string;
export type Layer = "below" | "normal" | "above" | "auto";
export type BoolSelection = "on" | "off";
export type RuleSelection = number | Label;
export type SignalSelection = number | Label;
export type DirectionSelection = "north" | "east" | "south" | "west";
export type StackSelection =
  | "stack.prev"
  | "stack.next"
  | "stack.first"
  | "stack.last"
  | "stack.recent";
export type WindowSelection =
  | "prev"
  | "next"
  | "first"
  | "last"
  | "recent"
  | "mouse"
  | "largest"
  | "smallest"
  | "sibling"
  | "first_nephew"
  | "second_nephew"
  | "uncle"
  | "first_cousin"
  | "second_cousin"
  | StackSelection
  | DirectionSelection
  | number;
export type DisplaySelection =
  | "prev"
  | "next"
  | "first"
  | "last"
  | "recent"
  | "mouse"
  | DirectionSelection
  | number;
export type SpaceSelection =
  | "prev"
  | "next"
  | "first"
  | "last"
  | "recent"
  | "mouse"
  | number
  | Label;

export type Display = {
  id: number;
  uuid: string;
  index: number;
  frame: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  spaces: number[];
};

export type Space = {
  id: number;
  uuid: string;
  index: number;
  label: string;
  type: string;
  display: number;
  windows: number[];
  "first-window": number;
  "last-window": number;
  "has-focus": boolean;
  "is-visible": boolean;
  "is-native-fullscreen": boolean;
};

export type Window = {
  id: number;
  pid: number;
  app: string;
  title: string;
  frame: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  role: string;
  subrole: string;
  "root-window": boolean;
  display: number;
  space: number;
  level: number;
  "sub-level": number;
  layer: string;
  "sub-layer": string;
  opacity: number;
  "split-type": string;
  "split-child": string;
  "stack-index": number;
  "can-move": boolean;
  "can-resize": boolean;
  "has-focus": boolean;
  "has-shadow": boolean;
  "has-parent-zoom": boolean;
  "has-fullscreen-zoom": boolean;
  "is-native-fullscreen": boolean;
  "is-visible": boolean;
  "is-minimized": boolean;
  "is-hidden": boolean;
  "is-floating": boolean;
  "is-sticky": boolean;
  "is-grabbed": boolean;
};
