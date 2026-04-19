"use client";

import { useEffect, useRef } from "react";

/**
 * Loop simples estilo "elevador / minijogo" via Web Audio (sem ficheiro externo).
 * Só corre quando `playing` é true; o utilizador já interagiu ao ligar o toggle.
 */
export function useElevatorMuzak(playing: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!playing) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (ctxRef.current) {
        void ctxRef.current.close();
        ctxRef.current = null;
      }
      return;
    }

    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctor();
    ctxRef.current = ctx;
    void ctx.resume();

    const gain = ctx.createGain();
    gain.gain.value = 0.06;
    gain.connect(ctx.destination);

    const notes = [523.25, 587.33, 659.25, 698.46, 783.99, 698.46, 659.25, 587.33];
    let step = 0;

    const playNote = () => {
      if (ctx.state !== "running") return;
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.value = notes[step % notes.length]!;
      osc.connect(gain);
      const t = ctx.currentTime;
      osc.start(t);
      osc.stop(t + 0.18);
      step++;
    };

    playNote();
    intervalRef.current = setInterval(playNote, 380);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      void ctx.close();
      if (ctxRef.current === ctx) ctxRef.current = null;
    };
  }, [playing]);
}
