export function run(command: Array<string | number | undefined | null>) {
  // @ts-expect-error
  Bun.spawnSync(command.filter(Boolean).map((it) => it.toString()));
}
