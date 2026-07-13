import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-8 px-6 py-16 text-center animate-fade-in">
      <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-muted)]">404</p>
      <h1 className="font-display text-4xl tracking-tight md:text-5xl">Página não encontrada</h1>
      <p className="max-w-md text-[var(--color-muted)]">
        Este endereço não existe ou o conteúdo foi removido.
      </p>
      <Link
        href="/"
        className="mt-2 text-sm uppercase tracking-[0.25em] no-underline border-b border-current pb-1"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
