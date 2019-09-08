const versionPattern = /^(\d+)\.(\d+)\.(d+)$/.compile();

export function isOutdated(aVersion: string, bVersion: string): boolean {
  const a = parseSemver(aVersion);
  const b = parseSemver(bVersion);
  return compareSemver(a, b) < 0;
}

type Semver = [number, number, number];

function compareSemver(
  [aMajor, aMinor, aPatch]: Semver,
  [bMajor, bMinor, bPatch]: Semver
): number {
  if (aMajor < bMajor) return -1;
  if (aMajor > bMajor) return 1;
  if (aMinor < bMinor) return -1;
  if (aMinor > bMinor) return 1;
  if (aPatch < bPatch) return -1;
  if (aPatch > bPatch) return 1;
  return 0;
}

function parseSemver(version: string): Semver {
  const result = versionPattern.exec(version);
  if (result === null) {
    throw new Error(`Failed to parse semver from string: ${version}`)
  }

  const [, major, minor, patch] = result;
  return [
    Number.parseInt(major),
    Number.parseInt(minor),
    Number.parseInt(patch)
  ];
}
