interface EmptyStateProps {
  title?: string;
  message?: string;
}

export function EmptyState({
  title = "Nada por aqui",
  message = "Ainda não há itens para exibir.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <p className="font-display text-2xl tracking-tight">{title}</p>
      <p className="mt-3 max-w-md text-[var(--color-muted)]">{message}</p>
    </div>
  );
}
