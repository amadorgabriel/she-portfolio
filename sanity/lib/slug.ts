/** Charset for category/project URL slugs (DEC-003-06 / SLUG-*). */
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const SLUG_ERROR_MESSAGE =
  "Use apenas letras minúsculas (a-z), números e hífens. Sem espaços, acentos, caracteres especiais, nem hífen no início/fim ou hífen duplo.";

/**
 * Returns true if `value` matches the allowed slug charset.
 */
export function isValidSlug(value: string): boolean {
  return SLUG_PATTERN.test(value);
}

/**
 * Sanity `Rule.custom` helper for a plain slug string.
 * Returns `true` when valid, or a PT error message for the Studio.
 */
export function validateSlugString(value: unknown): true | string {
  if (typeof value !== "string" || value.length === 0) {
    return "Slug é obrigatório.";
  }
  if (!isValidSlug(value)) {
    return SLUG_ERROR_MESSAGE;
  }
  return true;
}

type SanitySlugValue = { current?: string } | undefined;

/**
 * Sanity `Rule.custom` helper for slug fields (`{ current }`).
 * Skips empty values so `Rule.required()` can own the missing-value message.
 */
export function validateSlugField(value: SanitySlugValue): true | string {
  const current = value?.current;
  if (current == null || current === "") {
    return true;
  }
  return validateSlugString(current);
}

/**
 * Generate a URL slug from a title, matching SLUG_PATTERN.
 */
export function slugifyFromTitle(input: string, maxLength = 96): string {
  const slug = input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, maxLength)
    .replace(/-+$/g, "");

  return slug;
}
