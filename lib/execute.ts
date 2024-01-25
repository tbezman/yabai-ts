export function run(
  command: Array<string | number | undefined | null>,
): string {
  const result = Bun.spawnSync(
    // @ts-expect-error
    command.filter(Boolean).map((it) => it.toString()),
  );

  return result.stdout.toString();
}
