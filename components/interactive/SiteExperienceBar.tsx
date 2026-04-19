"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Gamepad2, Volume2, VolumeX } from "lucide-react";
import { DesktopModal } from "@/components/ui/DesktopWindow";
import { cn } from "@/lib/utils";
import { useElevatorMuzak } from "./useElevatorMuzak";

const DressUpMiniGame = dynamic(
  () => import("./DressUpMiniGame").then((m) => ({ default: m.DressUpMiniGame })),
  {
    ssr: false,
    loading: () => (
      <p className="p-6 text-center font-[family-name:var(--font-vt323)] text-night-purple">A carregar dress-up…</p>
    ),
  }
);

export function SiteExperienceBar() {
  const [musicOn, setMusicOn] = useState(false);
  const [dressOpen, setDressOpen] = useState(false);
  useElevatorMuzak(musicOn);

  return (
    <>
      <div
        className="pointer-events-none fixed right-3 top-14 z-[42] flex flex-col items-end gap-2 md:right-4 md:top-4"
        aria-label="Extras estilo jogo"
      >
        <div className="pointer-events-auto flex flex-col gap-1.5 rounded-2xl border-2 border-pink-2000/30 bg-polaroid-offwhite/95 p-1.5 shadow-lg backdrop-blur-md">
          <button
            type="button"
            onClick={() => setMusicOn((v) => !v)}
            aria-pressed={musicOn}
            aria-label={musicOn ? "Desligar música ambiente" : "Ligar música ambiente (ativa após clique)"}
            title="Música ambiente"
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl border border-night-purple/10",
              "bg-white/90 text-night-purple transition hover:bg-pink-2000/15",
              musicOn && "border-pink-2000/40 bg-pink-2000/10 text-pink-2000"
            )}
          >
            {musicOn ? <Volume2 className="h-5 w-5" aria-hidden /> : <VolumeX className="h-5 w-5" aria-hidden />}
          </button>
          <button
            type="button"
            onClick={() => setDressOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={dressOpen}
            aria-label="Abrir mini dress-up"
            title="Dress-up"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-night-purple/10 bg-white/90 text-night-purple transition hover:bg-pink-2000/15"
          >
            <Gamepad2 className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>

      <DesktopModal isOpen={dressOpen} onClose={() => setDressOpen(false)} title="dress_up.exe" variant="pink">
        <DressUpMiniGame />
      </DesktopModal>
    </>
  );
}
