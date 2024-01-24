import { type SkhdBind, updateSkhdConfig } from "./lib/skhd.ts";
import * as space from "./lib/space.ts";
import { balance } from "./lib/space.ts";
import * as window from "./lib/window.ts";
import { run } from "./lib/yabai.ts";

const binds: SkhdBind[] = [];

function on(key: string, callback: () => void) {
  binds.push({
    key,
    callback,
    command: `bun /Users/terence/Code/yabai-ts/index.ts skhd ${key}`,
  });
}

on("alt-h", () => {
  Bun.spawnSync(["/Users/terence/focus.sh", "h"]);
});

on("alt-j", () => {
  Bun.spawnSync(["/Users/terence/focus.sh", "j"]);
});

on("alt-k", () => {
  Bun.spawnSync(["/Users/terence/focus.sh", "k"]);
});

on("alt-l", () => {
  Bun.spawnSync(["/Users/terence/focus.sh", "l"]);
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

on("alt-t", () => {
  Bun.spawnSync(["bash", "~/toggle-layout.sh"]);
});

on("alt-b", () => {
  run(balance());
});

if (process.argv[2] === "update") {
  await updateSkhdConfig(binds);
} else if (process.argv[2] === "skhd") {
  const bindKey = process.argv[3];

  const bind = binds.find((it) => it.key === bindKey);

  if (bind) {
    bind.callback?.();
  }
}
