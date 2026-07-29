const CAL_LINK_PATTERN = /^[a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+$/;

export function getCalLink(): string | null {
  const raw = process.env.NEXT_PUBLIC_CAL_LINK?.trim() ?? "";
  if (!raw) return null;
  if (!CAL_LINK_PATTERN.test(raw)) return null;
  return raw;
}
