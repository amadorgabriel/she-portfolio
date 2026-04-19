import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina classes do Tailwind CSS com clsx e tailwind-merge
 * para evitar conflitos e duplicações.
 *
 * @example
 * cn("px-4", "py-2", condition && "bg-pink-2000")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
