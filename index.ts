import { type SkhdBind, updateSkhdConfig } from "./lib/skhd.ts";
import * as space from "./lib/space.ts";
import { balance } from "./lib/space.ts";
import * as window from "./lib/window.ts";
import * as query from "./lib/query.ts";

const binds: SkhdBind[] = [];

function nextIndex(current: number, length: number) {
  if (current === length - 1) {
    return 0;
  } else {
    return current + 1;
  }
}

function previousIndex(current: number, length: number) {
  if (current === 0) {
    return length - 1;
  } else {
    return current - 1;
  }
}

function moveStackDirection(direction: "next" | "previous") {
  const windows = query.windows({ space: "current" });

  const stackIndices = windows
    .map((window) => window["stack-index"])
    .sort((a, b) => a - b);

  const currentlyFocusedWindowStackIndex =
    windows.find((window) => window["has-focus"])?.["stack-index"] ?? -1;

  const currentlyFocusedIndex = stackIndices.indexOf(
    currentlyFocusedWindowStackIndex,
  );
  const nextFocusedIndex =
    direction === "next"
      ? nextIndex(currentlyFocusedIndex, stackIndices.length)
      : previousIndex(currentlyFocusedIndex, stackIndices.length);

  const nextFocusedStackIndex = stackIndices[nextFocusedIndex];

  const windowIdOfNextStackIndex = windows.find(
    (window) => window["stack-index"] === nextFocusedStackIndex,
  )?.id;

  window.focus(windowIdOfNextStackIndex);
}

function on(key: string, callback: () => void) {
  binds.push({
    key,
    callback,
    command: `bun /Users/terence/Code/yabai-ts/index.ts skhd ${key}`,
  });
}

on("alt-h", () => {
  window.focus("west");
});

on("alt-l", () => {
  window.focus("east");
});

on("alt-j", () => {
  const result = query.spaces({ space: "current" });

  if (result.type === "stack") {
    moveStackDirection("next");
  } else {
    window.focus("south");
  }
});

on("alt-k", () => {
  const result = query.spaces({ space: "current" });

  if (result.type === "stack") {
    moveStackDirection("previous");
  } else {
    window.focus("north");
  }
});

on("shift+alt-h", () => {
  window.swap("west");
});

on("shift+alt-j", () => {
  window.swap("south");
});

on("shift+alt-k", () => {
  window.swap("north");
});

on("shift+alt-l", () => {
  window.swap("east");
});

on("ctrl+alt-return", () => {
  window.grid("1:1:0:0:1:1");
});

for (let i = 0; i < 10; i++) {
  on(`alt-${i}`, () => {
    space.focus(i);
  });

  on(`shift+alt-${i}`, () => {
    window.space(i);
  });
}

on("alt-r", () => {
  space.rotate(90);
});

on("alt-e", () => {
  window.toggle("split");
});

on("alt-t", async () => {
  const result = query.spaces({ space: "current" });

  if (result.type === "bsp") {
    space.layout("stack");
  } else {
    space.layout("bsp");
  }
});

on("alt-b", () => {
  balance();
});

if (process.argv[2] === "update") {
  console.log("Generating SKHD Config...");
  await updateSkhdConfig(binds);
} else if (process.argv[2] === "skhd") {
  const bindKey = process.argv[3];

  const bind = binds.find((it) => it.key === bindKey);

  if (bind) {
    bind.callback?.();
  }
}
