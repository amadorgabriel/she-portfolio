/**
 * URL base pública do site (OG, canonical, sitemap).
 * `NEXT_PUBLIC_SITE_URL` deve ser o domínio público (ex. https://karinadosreis.vercel.app).
 * URLs únicas de deploy (`*.vercel.app` com hash) ficam atrás do login da Vercel e
 * não podem ser usadas em og:image — crawlers recebem redirect para SSO.
 */

function normalizeBase(value: string | undefined): string {
  return value?.replace(/\/$/, "") ?? "";
}

function hostnameOf(value: string): string | null {
  try {
    return new URL(value).hostname;
  } catch {
    return null;
  }
}

function productionUrl(): string {
  const host = normalizeBase(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  if (!host) return "";
  return host.startsWith("http") ? host : `https://${host}`;
}

/** Deploy único da Vercel, diferente do alias de produção. */
function isProtectedDeploymentAlias(configured: string, production: string): boolean {
  const configuredHost = hostnameOf(configured);
  const productionHost = hostnameOf(production);
  if (!configuredHost || !productionHost) return false;
  return configuredHost.endsWith(".vercel.app") && configuredHost !== productionHost;
}

export function getSiteBaseUrl(): string {
  const configured = normalizeBase(process.env.NEXT_PUBLIC_SITE_URL);
  const production = productionUrl();

  if (configured && production && isProtectedDeploymentAlias(configured, production)) {
    return production;
  }
  if (configured) return configured;
  if (production) return production;
  if (process.env.VERCEL_ENV !== "production" && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "";
}

export function absoluteUrl(path: string): string {
  const base = getSiteBaseUrl();
  const p = path.startsWith("/") ? path : `/${path}`;
  if (!base) return p;
  return `${base}${p}`;
}
