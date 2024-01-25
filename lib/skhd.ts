export type SkhdBind = {
  key: string;
  command: string;
  callback?: () => void;
};

export const binds: SkhdBind[] = [];

export function on(key: string, callback: () => void) {
  binds.push({
    key,
    callback,
    command: `bun /Users/terence/Code/yabai-ts/index.ts skhd ${key}`,
  });
}

function buildSkhdConfig(binds: SkhdBind[]) {
  return binds.map((bind) => `${bind.key}: ${bind.command}`).join("\n");
}

export async function updateSkhdConfig(binds: SkhdBind[]) {
  await Bun.write("/Users/terence/.skhdrc", buildSkhdConfig(binds));

  await Bun.spawn(["skhd", "-r"]).exited;
}
