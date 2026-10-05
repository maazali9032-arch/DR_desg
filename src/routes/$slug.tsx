import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Invitation } from "./index";
import {
  fetchPublicInvitation,
  getSlugFromPathname,
  mapInvitation,
  mapShopFallback,
  publicUrl,
  type PublicInvitationResponse,
} from "@/lib/invitation-content";
import { FloatingBrandBar } from "@/components/invitation/FloatingBrandBar";

export const Route = createFileRoute("/$slug")({
  component: SlugInvitation,
});

function SlugInvitation() {
  const routeSlug = Route.useParams({ select: (params) => params.slug });
  return <InvitationRequest key={routeSlug} routeSlug={routeSlug} />;
}

function InvitationRequest({ routeSlug }: { routeSlug: string }) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<PublicInvitationResponse | null>(null);
  const [requestError, setRequestError] = useState(false);

  useEffect(() => {
    const slug = getSlugFromPathname(window.location.pathname);
    if (!slug) {
      setResult({ state: "not_found" });
      return;
    }
    let active = true;
    setResult(null);
    setRequestError(false);
    void fetchPublicInvitation(slug)
      .then((data) => active && setResult(data))
      .catch(() => active && setRequestError(true));
    return () => {
      active = false;
    };
  }, [routeSlug, attempt]);

  if (requestError)
    return (
      <StatusPage
        title="Unable to load invitation"
        message="Please try again in a moment."
        retry={() => setAttempt((value) => value + 1)}
      />
    );
  if (!result)
    return <StatusPage title="Loading invitation" message="Preparing your invitation…" />;
  if (result.state === "live") return <LiveInvitation result={result} />;

  if (result.state === "fallback") {
    const shop = mapShopFallback(result.shop);
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6 pb-20 text-center">
        <div className="max-w-sm">
          <p className="eyebrow">{shop.name}</p>
          <h1 className="display-name mt-4 text-4xl">Invitation unavailable</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            This invitation is no longer available.
          </p>
          {(shop.address || shop.city) && (
            <p className="mt-5 font-display text-base text-foreground/80">
              {[shop.address, shop.city].filter(Boolean).join(", ")}
            </p>
          )}
          {shop.phone && <p className="mt-5 text-xs text-muted-foreground">{shop.phone}</p>}
          {shop.whatsapp && (
            <a
              href={publicUrl(shop.whatsapp) || `https://wa.me/${shop.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-6 inline-block border border-accent px-5 py-3 text-xs uppercase tracking-widest"
            >
              Contact on WhatsApp
            </a>
          )}
          {shop.businessContact && (
            <p className="mt-5 text-xs text-muted-foreground">{shop.businessContact}</p>
          )}
        </div>
        {/* Fixed bottom brand showcase — always visible regardless of scroll */}
        <FloatingBrandBar name={shop.name} />
      </main>
    );
  }

  return (
    <StatusPage title="Invitation not found" message="This invitation link is invalid." home />
  );
}

function StatusPage({
  title,
  message,
  home = false,
  retry,
}: {
  title: string;
  message: string;
  home?: boolean;
  retry?: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 pb-20 text-center">
      <div>
        <h1 className="display-name text-4xl">{title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{message}</p>
        {retry && (
          <button
            onClick={retry}
            className="mt-6 border border-accent px-5 py-3 text-xs uppercase tracking-widest"
          >
            Try again
          </button>
        )}
        {home && (
          <Link
            to="/"
            className="mt-6 inline-block border border-accent px-5 py-3 text-xs uppercase tracking-widest"
          >
            Go home
          </Link>
        )}
      </div>
      {/* Fixed bottom brand showcase — always visible regardless of scroll */}
    </main>
  );
}

function LiveInvitation({ result }: { result: PublicInvitationResponse }) {
  const data = mapInvitation(result);
  useEffect(() => {
    const canonical = data.publicUrl;
    if (!canonical || !publicUrl(canonical)) return;
    const link = document.createElement("link");
    link.rel = "canonical";
    link.href = canonical;
    document.head.appendChild(link);
    return () => link.remove();
  }, [data.publicUrl]);
  return <Invitation data={data} />;
}
