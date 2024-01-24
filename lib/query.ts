import type {
  DisplaySelection,
  SpaceSelection,
  WindowSelection,
} from "./types.ts";

type QueryArgs = {
  display?: DisplaySelection | "current";
  space?: SpaceSelection | "current";
  window?: WindowSelection | "current";
};

function runQuery(command: string, args: QueryArgs) {
  let commandParts: Array<string | number> = ["yabai", "-m", "query", command];

  if (args.display) {
    commandParts.push("--display");

    if (args.display !== "current") {
      commandParts.push(args.display);
    }
  }

  if (args.space) {
    commandParts.push("--space");

    if (args.space !== "current") {
      commandParts.push(args.space);
    }
  }

  if (args.window) {
    commandParts.push("--window");

    if (args.window !== "current") {
      commandParts.push(args.window);
    }
  }

  return commandParts;
}

/**
 * Retrieve information about displays.
 */
export function displays(args: QueryArgs = {}) {
  return runQuery("--displays", args);
}

/**
 * Retrieve information about spaces.
 */
export function windows(args: QueryArgs = {}) {
  return runQuery("--windows", args);
}

/**
 * Retrieve information about windows.
 */
export function spaces(args: QueryArgs = {}) {
  return runQuery("--spaces", args);
}
