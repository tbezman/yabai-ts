import { binds, on, updateSkhdConfig } from "./lib/skhd.ts";
import * as space from "./lib/space.ts";
import { balance } from "./lib/space.ts";
import * as window from "./lib/window.ts";
import * as query from "./lib/query.ts";

on("alt-h", () => {
  window.focus("west");
});

on("alt-l", () => {
  window.focus("east");
});

on("alt-j", () => {
  const currentSpace = query.spaces({ space: "current" });

  if (currentSpace.type === "stack") {
    window.focus("stack.next");
  } else {
    window.focus("south");
  }
});

on("alt-k", () => {
  const currentSpace = query.spaces({ space: "current" });

  if (currentSpace.type === "stack") {
    window.focus("stack.prev");
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
  const currentSpace = query.spaces({ space: "current" });

  if (currentSpace.type === "bsp") {
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
