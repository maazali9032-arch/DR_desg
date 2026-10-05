export function getSlugFromPathname(pathname: string): string | null {
  const segment = pathname.split("/").filter(Boolean).at(-1);
  if (!segment) return null;
  try {
    const slug = decodeURIComponent(segment).trim();
    return slug && !slug.includes("/") && !slug.includes("\\") ? slug : null;
  } catch {
    return null;
  }
}
