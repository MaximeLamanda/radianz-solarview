import { cn } from "@/lib/utils";

/** Positions [row, col] on a square grid (0-indexed). */
export type DotPattern = readonly (readonly [number, number])[];

export const TARGETING_DOT_PATTERNS = {
  retail: [
    [1, 2],
    [1, 4],
    [2, 1],
    [2, 2],
    [2, 3],
    [2, 4],
    [2, 5],
    [3, 1],
    [3, 5],
    [4, 1],
    [4, 5],
    [5, 1],
    [5, 2],
    [5, 3],
    [5, 4],
    [5, 5],
  ],
  industry: [
    [0, 3],
    [1, 2],
    [1, 3],
    [1, 4],
    [2, 1],
    [2, 2],
    [2, 3],
    [2, 4],
    [2, 5],
    [3, 1],
    [3, 3],
    [3, 5],
    [4, 1],
    [4, 2],
    [4, 3],
    [4, 4],
    [4, 5],
  ],
  tertiary: [
    [0, 2],
    [0, 3],
    [0, 4],
    [1, 2],
    [1, 4],
    [2, 2],
    [2, 4],
    [3, 2],
    [3, 4],
    [4, 2],
    [4, 3],
    [4, 4],
    [5, 2],
    [5, 3],
    [5, 4],
  ],
  school: [
    [1, 2],
    [1, 3],
    [1, 4],
    [2, 1],
    [2, 2],
    [2, 3],
    [2, 4],
    [2, 5],
    [3, 3],
    [4, 2],
    [4, 3],
    [4, 4],
  ],
} as const satisfies Record<string, DotPattern>;

interface DotIllustrationProps {
  pattern: DotPattern;
  className?: string;
}

const DOT_RADIUS = 0.36;
const DOT_MARGIN = 0.18;

function getCenteredViewBox(pattern: DotPattern) {
  const rows = pattern.map(([row]) => row);
  const cols = pattern.map(([, col]) => col);
  const minRow = Math.min(...rows);
  const maxRow = Math.max(...rows);
  const minCol = Math.min(...cols);
  const maxCol = Math.max(...cols);

  const left = minCol + 0.5 - DOT_RADIUS - DOT_MARGIN;
  const right = maxCol + 0.5 + DOT_RADIUS + DOT_MARGIN;
  const top = minRow + 0.5 - DOT_RADIUS - DOT_MARGIN;
  const bottom = maxRow + 0.5 + DOT_RADIUS + DOT_MARGIN;

  const size = Math.max(right - left, bottom - top);
  const centerX = (left + right) / 2;
  const centerY = (top + bottom) / 2;

  return `${centerX - size / 2} ${centerY - size / 2} ${size} ${size}`;
}

function DotIllustration({ pattern, className }: DotIllustrationProps) {
  return (
    <svg
      viewBox={getCenteredViewBox(pattern)}
      className={cn("size-[32%] shrink-0", className)}
      aria-hidden
    >
      {pattern.map(([row, col], index) => (
        <circle key={index} cx={col + 0.5} cy={row + 0.5} r={DOT_RADIUS} className="fill-current" />
      ))}
    </svg>
  );
}

export { DotIllustration };
