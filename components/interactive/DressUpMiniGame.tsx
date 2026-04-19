"use client";

import { useState } from "react";

const HAIR = ["#3d2314", "#f5e6d3", "#ff69b4", "#6a0dad", "#1a1a2e"];
const TOP = ["#ff1493", "#3a5a9a", "#ffe55c", "#ffffff", "#4b0082"];

export function DressUpMiniGame() {
  const [hair, setHair] = useState(0);
  const [top, setTop] = useState(0);
  const [acc, setAcc] = useState(0);

  return (
    <div className="flex flex-col gap-6 p-2 md:flex-row md:items-start md:justify-center">
      <div className="flex justify-center">
        <svg
          viewBox="0 0 120 168"
          className="h-52 w-40 drop-shadow-lg"
          role="img"
          aria-label="Avatar dress-up de brincadeira"
        >
          <ellipse cx="60" cy="148" rx="36" ry="10" fill="rgba(75,0,130,0.12)" />
          <rect x="38" y="82" width="44" height="56" rx="10" fill={TOP[top]!} />
          <circle cx="60" cy="54" r="30" fill="#ffdcc4" />
          <path d="M28 52 Q60 18, 92 52 L92 66 Q60 58, 28 66 Z" fill={HAIR[hair]!} />
          <circle cx="52" cy="50" r="3" fill="#2a1210" />
          <circle cx="68" cy="50" r="3" fill="#2a1210" />
          <path d="M52 62 Q60 68, 68 62" stroke="#c97b89" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {acc === 1 && (
            <path d="M48 26 L60 14 L72 26 Q60 22, 48 26 Z" fill="#ff1493" stroke="#4B0082" strokeWidth="0.5" />
          )}
          {acc === 2 && (
            <>
              <polygon points="88,28 94,38 84,38" fill="#ffe55c" stroke="#4B0082" strokeWidth="0.5" />
              <circle cx="90" cy="34" r="3" fill="#fff" />
            </>
          )}
        </svg>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-4 font-[family-name:var(--font-vt323)] text-night-purple">
        <fieldset className="rounded-xl border border-pink-2000/20 p-3">
          <legend className="px-1 text-sm uppercase tracking-wide">Cabelo</legend>
          <div className="mt-2 flex flex-wrap gap-2" aria-label="Cor do cabelo">
            {HAIR.map((c, i) => (
              <button
                key={c}
                type="button"
                aria-pressed={hair === i}
                onClick={() => setHair(i)}
                className="h-9 w-9 rounded-full border-2 border-night-purple/25 shadow-sm transition focus-visible:ring-2 focus-visible:ring-pink-2000 data-[on=true]:ring-2 data-[on=true]:ring-pink-2000"
                style={{ background: c }}
                data-on={hair === i ? "true" : undefined}
                aria-label={`Cabelo opção ${i + 1}`}
              />
            ))}
          </div>
        </fieldset>

        <fieldset className="rounded-xl border border-pink-2000/20 p-3">
          <legend className="px-1 text-sm uppercase tracking-wide">Blusa</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {TOP.map((c, i) => (
              <button
                key={c}
                type="button"
                aria-pressed={top === i}
                onClick={() => setTop(i)}
                className="h-9 w-9 rounded-md border-2 border-night-purple/25 shadow-sm focus-visible:ring-2 focus-visible:ring-pink-2000 data-[on=true]:ring-2 data-[on=true]:ring-pink-2000"
                style={{ background: c }}
                data-on={top === i ? "true" : undefined}
                aria-label={`Blusa opção ${i + 1}`}
              />
            ))}
          </div>
        </fieldset>

        <fieldset className="rounded-xl border border-pink-2000/20 p-3">
          <legend className="px-1 text-sm uppercase tracking-wide">Acessório</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-lg border px-3 py-1 text-sm hover:bg-pink-2000/10"
              aria-pressed={acc === 0}
              data-on={acc === 0 ? "true" : undefined}
              onClick={() => setAcc(0)}
            >
              Nenhum
            </button>
            <button
              type="button"
              className="rounded-lg border px-3 py-1 text-sm hover:bg-pink-2000/10"
              aria-pressed={acc === 1}
              data-on={acc === 1 ? "true" : undefined}
              onClick={() => setAcc(1)}
            >
              Laço
            </button>
            <button
              type="button"
              className="rounded-lg border px-3 py-1 text-sm hover:bg-pink-2000/10"
              aria-pressed={acc === 2}
              data-on={acc === 2 ? "true" : undefined}
              onClick={() => setAcc(2)}
            >
              Estrela
            </button>
          </div>
        </fieldset>

        <p className="text-center text-xs opacity-70">Easter egg Y2K — sem guardar dados ✨</p>
      </div>
    </div>
  );
}
