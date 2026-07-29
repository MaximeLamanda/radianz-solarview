#!/usr/bin/env python3
"""Extract dot-bird flight frames from a screen recording into JSON.

Usage:
  python3 scripts/extract-dot-bird.py [path/to/recording.mov]

Requires: opencv-python (cv2), numpy
"""

from __future__ import annotations

import json
import os
import sys
from pathlib import Path

import cv2
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
OUT_JSON = ROOT / "solarview-site" / "lib" / "dot-bird-frames.json"
PITCH = 8
TARGET_FPS = 20


def find_default_src() -> Path | None:
    downloads = Path.home() / "Downloads"
    if not downloads.is_dir():
        return None
    candidates = sorted(
        (p for p in downloads.iterdir() if p.suffix.lower() == ".mov" and "5.42" in p.name),
        key=lambda p: p.stat().st_mtime,
        reverse=True,
    )
    return candidates[0] if candidates else None


def extract_dots(frame: np.ndarray):
    lab = cv2.cvtColor(frame, cv2.COLOR_BGR2LAB)
    L = lab[:, :, 0]
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    opened = cv2.morphologyEx(
        (L > 220).astype(np.uint8) * 255,
        cv2.MORPH_OPEN,
        np.ones((3, 3), np.uint8),
    )
    n, _, stats, centroids = cv2.connectedComponentsWithStats(opened, 8)
    dots = []
    for i in range(1, n):
        a = stats[i, cv2.CC_STAT_AREA]
        ww = stats[i, cv2.CC_STAT_WIDTH]
        hh = stats[i, cv2.CC_STAT_HEIGHT]
        if a < 4 or a > 80:
            continue
        if ww < 2 or hh < 2 or ww > 12 or hh > 12:
            continue
        if max(ww, hh) / max(1, min(ww, hh)) > 2.2:
            continue
        cx, cy = centroids[i]
        dots.append((cx, cy, "w"))

    sat, val, hue = hsv[:, :, 1], hsv[:, :, 2], hsv[:, :, 0]
    colored = ((sat > 90) & (val > 90) & (val < 250)).astype(np.uint8) * 255
    colored = cv2.morphologyEx(colored, cv2.MORPH_OPEN, np.ones((2, 2), np.uint8))
    n2, _, st2, c2 = cv2.connectedComponentsWithStats(colored, 8)
    accents = []
    for i in range(1, n2):
        a = st2[i, cv2.CC_STAT_AREA]
        ww = st2[i, cv2.CC_STAT_WIDTH]
        hh = st2[i, cv2.CC_STAT_HEIGHT]
        if a < 2 or a > 40 or ww > 10 or hh > 10:
            continue
        cx, cy = c2[i]
        x, y = int(round(cx)), int(round(cy))
        h = int(hue[y, x])
        if h < 15 or h > 165:
            color = "r"
        elif 35 <= h <= 95:
            color = "g"
        else:
            color = "c"
        accents.append((cx, cy, color))
    return dots, accents


def largest_cluster(points, max_dist=PITCH * 2.8):
    if not points:
        return []
    pts = np.array([(p[0], p[1]) for p in points], dtype=np.float32)
    n = len(pts)
    used = np.zeros(n, dtype=bool)
    best: list[int] = []
    for i in range(n):
        if used[i]:
            continue
        stack = [i]
        used[i] = True
        comp = [i]
        while stack:
            u = stack.pop()
            d = np.linalg.norm(pts - pts[u], axis=1)
            for v in np.where((d <= max_dist) & ~used)[0]:
                used[v] = True
                stack.append(int(v))
                comp.append(int(v))
        if len(comp) > len(best):
            best = comp
    return [points[i] for i in best]


def fill_ui_grid_gaps(grid: np.ndarray) -> np.ndarray:
    closed = cv2.morphologyEx(grid, cv2.MORPH_CLOSE, np.ones((1, 3), np.uint8))
    return cv2.morphologyEx(closed, cv2.MORPH_CLOSE, np.ones((3, 1), np.uint8))


def main() -> int:
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else find_default_src()
    if src is None or not src.exists():
        print("Usage: python3 scripts/extract-dot-bird.py <recording.mov>", file=sys.stderr)
        return 1

    cap = cv2.VideoCapture(str(src))
    fps = cap.get(cv2.CAP_PROP_FPS) or 60
    frames = []
    while True:
        ok, frame = cap.read()
        if not ok:
            break
        frames.append(frame)
    cap.release()

    step = max(1, int(round(fps / TARGET_FPS)))
    sampled = frames[::step]

    all_xy = []
    per_frame = []
    for frame in sampled:
        dots, accents = extract_dots(frame)
        bird = largest_cluster(dots)
        if bird:
            bx = float(np.mean([d[0] for d in bird]))
            by = float(np.mean([d[1] for d in bird]))
            near = [a for a in accents if abs(a[0] - bx) < 120 and abs(a[1] - by) < 120]
            bird = bird + near
        per_frame.append(bird)
        all_xy.extend((d[0], d[1]) for d in bird)

    xs = np.array([p[0] for p in all_xy])
    ys = np.array([p[1] for p in all_xy])
    origin_x, origin_y = float(xs.min()), float(ys.min())

    raw_cells = []
    max_x = max_y = 0
    min_x = min_y = 10**9
    for bird in per_frame:
        cells: dict[tuple[int, int], str] = {}
        for cx, cy, color in bird:
            gx = int(round((cx - origin_x) / PITCH))
            gy = int(round((cy - origin_y) / PITCH))
            prev = cells.get((gx, gy))
            if prev is None or (prev == "w" and color != "w"):
                cells[(gx, gy)] = color
            max_x = max(max_x, gx)
            max_y = max(max_y, gy)
            min_x = min(min_x, gx)
            min_y = min(min_y, gy)
        raw_cells.append(cells)

    cols = max_x - min_x + 1
    rows = max_y - min_y + 1
    norm_frames = []
    for cells in raw_cells:
        shifted = {(gx - min_x, gy - min_y): c for (gx, gy), c in cells.items()}
        grid = np.zeros((rows, cols), dtype=np.uint8)
        colors = {}
        for (gx, gy), c in shifted.items():
            if 0 <= gx < cols and 0 <= gy < rows:
                grid[gy, gx] = 1
                colors[(gx, gy)] = c
        filled = fill_ui_grid_gaps(grid)
        enc = []
        ys_idx, xs_idx = np.where(filled > 0)
        for gy, gx in zip(ys_idx.tolist(), xs_idx.tolist()):
            c = colors.get((gx, gy), "w")
            enc.append([gx, gy] if c == "w" else [gx, gy, c])
        norm_frames.append(enc)

    # Trim to a seamless loop: find later frame ≈ first pose, drop the duplicate.
    def cell_set(frame):
        return {(item[0], item[1]) for item in frame}

    def jaccard(a, b):
        inter = len(a & b)
        uni = len(a | b)
        return inter / uni if uni else 0.0

    sets = [cell_set(f) for f in norm_frames]
    sims = [jaccard(s, sets[0]) for s in sets]
    half = max(1, len(norm_frames) // 2)
    loop_end = half + int(max(range(len(sims[half:])), key=lambda i: sims[half + i]))
    loop_frames = norm_frames[:loop_end]

    min_x = min_y = 10**9
    max_x = max_y = 0
    for fr in loop_frames:
        for item in fr:
            min_x = min(min_x, item[0])
            min_y = min(min_y, item[1])
            max_x = max(max_x, item[0])
            max_y = max(max_y, item[1])

    cropped = []
    for fr in loop_frames:
        enc = []
        for item in fr:
            gx, gy = item[0] - min_x, item[1] - min_y
            enc.append([gx, gy] if len(item) == 2 else [gx, gy, item[2]])
        cropped.append(enc)

    cols = max_x - min_x + 1
    rows = max_y - min_y + 1

    payload = {
        "version": 1,
        "cols": cols,
        "rows": rows,
        "fps": TARGET_FPS,
        "loop": True,
        "frames": cropped,
    }
    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(payload, separators=(",", ":")))
    print(
        f"wrote {OUT_JSON} ({OUT_JSON.stat().st_size / 1024:.1f} KB) "
        f"{cols}x{rows} x {len(cropped)} frames (loop@{loop_end}/{len(norm_frames)}) from {src}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
