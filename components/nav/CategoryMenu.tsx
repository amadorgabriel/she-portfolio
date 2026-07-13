import Link from "next/link";

export interface CategoryMenuItem {
  title: string;
  slug: string;
}

interface CategoryMenuProps {
  categories: CategoryMenuItem[];
}

export function CategoryMenu({ categories }: CategoryMenuProps) {
  if (!categories.length) {
    return (
      <p className="text-[var(--color-muted)] text-center py-16">
        Nenhuma categoria disponível no momento.
      </p>
    );
  }

  return (
    <nav aria-label="Categorias" className="animate-fade-up">
      <ul className="flex flex-col items-center gap-6 md:gap-8">
        {categories.map((cat) => (
          <li key={cat.slug}>
            <Link
              href={`/c/${cat.slug}`}
              className="font-display text-3xl uppercase tracking-[0.08em] no-underline transition-opacity hover:opacity-55 md:text-5xl"
            >
              {cat.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
