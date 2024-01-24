import { watch } from "fs";

Bun.spawnSync(["bun", "./index.ts", "update"], {
  cwd: `/Users/terence/Code/yabai-ts`,
  stdout: "inherit",
});

const watcher = watch(
  import.meta.dir,
  { recursive: true },
  (event, filename) => {
    Bun.spawnSync(["bun", "./index.ts", "update"], {
      cwd: `/Users/terence/Code/yabai-ts`,
      stdout: "inherit",
    });
  },
);

process.on("SIGINT", () => {
  // close watcher when Ctrl-C is pressed
  console.log("Closing watcher...");
  watcher.close();

  process.exit(0);
});
