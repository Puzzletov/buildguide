const FALLBACK_SITE_URL = "https://buildguide.vercel.app";

function normalizeSiteUrl(rawUrl: string | undefined): string {
  const value = (rawUrl ?? FALLBACK_SITE_URL).trim();
  if (!value) {
    return FALLBACK_SITE_URL;
  }

  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const url = new URL(withProtocol);
    return url.toString().replace(/\/$/, "");
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export function getSiteUrl(): string {
  return normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
}

export function getSiteUrlObject(): URL {
  return new URL(getSiteUrl());
}
