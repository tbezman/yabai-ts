import { type SkhdBind, updateSkhdConfig } from "./lib/skhd.ts";
import * as space from "./lib/space.ts";
import { balance } from "./lib/space.ts";
import * as window from "./lib/window.ts";
import * as query from "./lib/query.ts";
import { run } from "./lib/yabai.ts";
import type { Space, Window } from "./lib/types.ts";

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
  const windows = JSON.parse(
    run(query.windows({ space: "current" })),
  ) as Window[];

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

  run(window.focus(windowIdOfNextStackIndex));
}

function on(key: string, callback: () => void) {
  binds.push({
    key,
    callback,
    command: `bun /Users/terence/Code/yabai-ts/index.ts skhd ${key}`,
  });
}

on("alt-h", () => {
  run(window.focus("west"));
});

on("alt-l", () => {
  run(window.focus("east"));
});

on("alt-j", () => {
  const result = JSON.parse(run(query.spaces({ space: "current" }))) as Space;

  if (result.type === "stack") {
    moveStackDirection("next");
  } else {
    run(window.focus("south"));
  }
});

on("alt-k", () => {
  const result = JSON.parse(run(query.spaces({ space: "current" }))) as Space;

  if (result.type === "stack") {
    moveStackDirection("previous");
  } else {
    run(window.focus("north"));
  }
});

on("shift+alt-h", () => {
  run(window.swap("west"));
});

on("shift+alt-j", () => {
  run(window.swap("south"));
});

on("shift+alt-k", () => {
  run(window.swap("north"));
});

on("shift+alt-l", () => {
  run(window.swap("east"));
});

on("ctrl+alt-return", () => {
  run(window.grid("1:1:0:0:1:1"));
});

for (let i = 0; i < 10; i++) {
  on(`alt-${i}`, () => {
    run(space.focus(i));
  });

  on(`shift+alt-${i}`, () => {
    run(window.space(i));
  });
}

on("alt-r", () => {
  run(space.rotate(90));
});

on("alt-e", () => {
  run(window.toggle("split"));
});

on("alt-t", async () => {
  const result = JSON.parse(run(query.spaces({ space: "current" }))) as Space;

  if (result.type === "bsp") {
    run(space.layout("stack"));
  } else {
    run(space.layout("bsp"));
  }
});

on("alt-b", () => {
  run(balance());
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
