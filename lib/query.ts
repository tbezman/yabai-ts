import type {
  Display,
  DisplaySelection,
  Space,
  SpaceSelection,
  Window,
  WindowSelection,
} from "./types.ts";
import { run } from "./execute.ts";

type QueryArgs =
  | {
      display: DisplaySelection | "current";
    }
  | {
      space: SpaceSelection | "current";
    }
  | {
      window: WindowSelection | "current";
    }
  | Record<never, never>;

function runQuery(command: string, args: QueryArgs) {
  let commandParts: Array<string | number> = ["yabai", "-m", "query", command];

  if ("display" in args) {
    commandParts.push("--display");

    if (args.display !== "current") {
      commandParts.push(args.display);
    }
  }

  if ("space" in args) {
    commandParts.push("--space");

    if (args.space !== "current") {
      commandParts.push(args.space);
    }
  }

  if ("window" in args) {
    commandParts.push("--window");

    if (args.window !== "current") {
      commandParts.push(args.window);
    }
  }

  return JSON.parse(run(commandParts));
}

export function displays(args: { display: "current" }): Display;
export function displays(args: QueryArgs): Display[];
export function displays(): Display[];
/**
 * Retrieve information about displays.
 */
export function displays(args: any = {}): any {
  return runQuery("--displays", args);
}

export function windows(args: { window: "current" }): Window;
export function windows(args: QueryArgs): Window[];
export function windows(): Window[];
/**
 * Retrieve information about spaces.
 */
export function windows(args: any = {}): any {
  return runQuery("--windows", args);
}

export function spaces(args: { space: "current" }): Space;
export function spaces(args: QueryArgs): Space[];
export function spaces(): Space[];
/**
 * Retrieve information about windows.
 */
export function spaces(args: any = {}): any {
  return runQuery("--spaces", args);
}
