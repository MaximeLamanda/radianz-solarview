"use client";

import { useEffect, useMemo, useRef } from "react";

import { cn } from "@/lib/utils";

type Vec3 = { x: number; y: number; z: number };

/**
 * Lat/lon wireframe points on a unit sphere.
 * Sparse enough to stay readable at ~9–11 cell globe size.
 */
function buildGlobePoints(latSteps: number, lonSteps: number): Vec3[] {
  const points: Vec3[] = [];

  for (let i = 0; i <= latSteps; i++) {
    const lat = (i / latSteps) * Math.PI - Math.PI / 2;
    const y = Math.sin(lat);
    const r = Math.cos(lat);
    for (let j = 0; j < lonSteps; j++) {
      const lon = (j / lonSteps) * Math.PI * 2;
      points.push({
        x: r * Math.cos(lon),
        y,
        z: r * Math.sin(lon),
      });
    }
  }

  // Extra meridians denser feel without filling the face
  for (let m = 0; m < 4; m++) {
    const lon = (m / 4) * Math.PI * 2;
    for (let i = 0; i <= latSteps * 2; i++) {
      const lat = (i / (latSteps * 2)) * Math.PI - Math.PI / 2;
      points.push({
        x: Math.cos(lat) * Math.cos(lon),
        y: Math.sin(lat),
        z: Math.cos(lat) * Math.sin(lon),
      });
    }
  }

  return points;
}

function rotateY(p: Vec3, angle: number): Vec3 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return {
    x: p.x * c + p.z * s,
    y: p.y,
    z: -p.x * s + p.z * c,
  };
}

interface DotGlobeSpinProps {
  className?: string;
  /** CSS size of the square canvas. */
  size?: string;
  /** Pixel cell size in CSS px — match DotBirdFlight hero (~6). */
  cellSize?: number;
  fillRatio?: number;
  dotColor?: string;
  /** Rotations per minute. Keep very low. */
  rpm?: number;
  paused?: boolean;
  label?: string;
}

function DotGlobeSpin({
  className,
  size,
  cellSize = 6,
  fillRatio = 0.62,
  dotColor = "rgba(255,255,255,0.55)",
  rpm = 2.5,
  paused = false,
  label,
}: DotGlobeSpinProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  const gridSize = 11;
  const points = useMemo(() => buildGlobePoints(6, 10), []);
  const cssSize = size ?? `${gridSize * cellSize}px`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let angle = 0;
    let lastTs = 0;
    // Discrete frames so rotation feels pixel-stepped, not smooth float
    const fps = 6;
    const frameMs = 1000 / fps;
    const radPerFrame = ((rpm / 60) * Math.PI * 2) / fps;

    const paint = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = canvas.clientWidth;
      const cssH = canvas.clientHeight;
      if (cssW === 0 || cssH === 0) return;

      const pixelW = Math.round(cssW * dpr);
      const pixelH = Math.round(cssH * dpr);
      if (canvas.width !== pixelW || canvas.height !== pixelH) {
        canvas.width = pixelW;
        canvas.height = pixelH;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);

      const cell = cellSize;
      const gapBudget = cell * (1 - fillRatio);
      const pad = Math.max(cell >= 3 ? 1 : 0, Math.floor(gapBudget / 2));
      const side = Math.max(1, cell - pad * 2);
      const originX = (cssW - gridSize * cell) / 2;
      const originY = (cssH - gridSize * cell) / 2;
      const center = (gridSize - 1) / 2;
      const radius = center;

      const occupied = new Set<string>();
      ctx.fillStyle = dotColor;

      for (const p of points) {
        const r = rotateY(p, angle);
        if (r.z < -0.05) continue;

        const gx = Math.round(center + r.x * radius);
        const gy = Math.round(center - r.y * radius);
        if (gx < 0 || gy < 0 || gx >= gridSize || gy >= gridSize) continue;

        const key = `${gx},${gy}`;
        if (occupied.has(key)) continue;
        occupied.add(key);

        ctx.fillRect(
          Math.round(originX + gx * cell + pad),
          Math.round(originY + gy * cell + pad),
          side,
          side,
        );
      }
    };

    const tick = (ts: number) => {
      if (!pausedRef.current) {
        if (lastTs === 0) lastTs = ts;
        const elapsed = ts - lastTs;
        if (elapsed >= frameMs) {
          const steps = Math.floor(elapsed / frameMs);
          angle = (angle + radPerFrame * steps) % (Math.PI * 2);
          lastTs += steps * frameMs;
          paint();
        }
      }
      raf = requestAnimationFrame(tick);
    };

    paint();
    raf = requestAnimationFrame(tick);

    const ro = new ResizeObserver(() => paint());
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [cellSize, dotColor, fillRatio, points, rpm]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("block shrink-0", className)}
      style={{
        width: cssSize,
        height: cssSize,
        background: "transparent",
        imageRendering: "pixelated",
      }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}

export { DotGlobeSpin };
