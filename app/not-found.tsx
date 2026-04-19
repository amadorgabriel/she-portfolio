import { GlitterText } from "@/components/ui/GlitterText";
import { GlossyButton } from "@/components/ui/GlossyButton";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-8 px-4 py-16 text-center">
      <div className="rounded-2xl border-4 border-night-purple bg-polaroid-offwhite px-8 py-10 shadow-[8px_8px_0_#FF1493]">
        <p className="font-[family-name:var(--font-vt323)] text-sm uppercase tracking-[0.35em] text-night-purple/70">
          Error 404
        </p>
        <GlitterText as="h1" size="xl" variant="purple" className="mt-2 block">
          Game Over
        </GlitterText>
        <p className="mt-4 max-w-md font-[family-name:var(--font-inter)] text-night-purple">
          Este look não existe no closet. Talvez tenha sido vendido em um bazar Y2K paralelo.
        </p>
        <p className="mt-2 font-[family-name:var(--font-caveat)] text-xl text-pink-2000">Insert coin to continue… ✨</p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <GlossyButton href="/" size="lg" variant="pink" hasSparkle>
          Voltar pra Sala
        </GlossyButton>
        <GlossyButton href="/projetos" size="lg" variant="gold">
          Explorar Closet
        </GlossyButton>
      </div>
    </div>
  );
}
