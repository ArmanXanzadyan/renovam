"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

/**
 * Interactive before/after slider with a draggable divider.
 * Works with mouse and touch; keyboard-accessible via the range input.
 */
export function BeforeAfter({
  before,
  after,
  alt,
}: {
  before: string;
  after: string;
  alt: string;
}) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-card bg-canvas"
      onMouseDown={(e) => {
        dragging.current = true;
        setFromClientX(e.clientX);
      }}
      onMouseMove={(e) => dragging.current && setFromClientX(e.clientX)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchStart={(e) => setFromClientX(e.touches[0]!.clientX)}
      onTouchMove={(e) => setFromClientX(e.touches[0]!.clientX)}
    >
      {/* After (full) */}
      <Image src={after} alt={`${alt} — հետո`} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
      <span className="absolute right-3 top-3 rounded-full bg-ink/70 px-2 py-1 text-xs font-medium text-white">
        Հետո
      </span>

      {/* Before (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <div className="relative h-full" style={{ width: containerRef.current?.clientWidth ?? "100%" }}>
          <Image src={before} alt={`${alt} — առաջ`} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-2 py-1 text-xs font-medium text-white">
          Առաջ
        </span>
      </div>

      {/* Divider */}
      <div
        className="pointer-events-none absolute inset-y-0 flex w-0.5 items-center justify-center bg-white"
        style={{ left: `${pos}%` }}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand shadow-card">
          ⇔
        </span>
      </div>

      {/* Accessible control */}
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Առաջ/հետո համեմատություն"
        className="absolute inset-x-0 bottom-3 mx-auto w-2/3 cursor-pointer accent-brand"
      />
    </div>
  );
}
