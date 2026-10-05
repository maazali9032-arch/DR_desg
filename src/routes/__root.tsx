import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Invitation not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This invitation link is invalid.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    // Log error for diagnostics without leaking Lovable-specific telemetry hooks
    console.error("[ZAR] Error boundary caught:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ZAR Invitations" },
      {
        name: "description",
        content: "Crafted with love — ZAR digital wedding invitations.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "ZAR Wedding Invitation" },
      { property: "og:description", content: "Open a private wedding invitation." },
      { property: "og:image", content: "/og-image.png" },
      { property: "og:image:alt", content: "ZAR Invitations" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ZAR Wedding Invitation" },
      { name: "twitter:description", content: "Open a private wedding invitation." },
      { name: "twitter:image", content: "/og-image.png" },
      // Microsoft Tiles
      { name: "msapplication-TileColor", content: "#30161c" },
      { name: "msapplication-TileImage", content: "/ms-icon-144x144.png" },
      { name: "msapplication-config", content: "/browserconfig.xml" },
      // Theme colour
      { name: "theme-color", content: "#30161c" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Halant:wght@400;500&family=Jost:wght@300;400;500&display=swap",
      },
      // Standard favicon
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "icon", href: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { rel: "icon", href: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      // Apple touch icons
      { rel: "apple-touch-icon", href: "/apple-icon.png" },
      { rel: "apple-touch-icon", href: "/apple-icon-57x57.png", sizes: "57x57" },
      { rel: "apple-touch-icon", href: "/apple-icon-60x60.png", sizes: "60x60" },
      { rel: "apple-touch-icon", href: "/apple-icon-72x72.png", sizes: "72x72" },
      { rel: "apple-touch-icon", href: "/apple-icon-76x76.png", sizes: "76x76" },
      { rel: "apple-touch-icon", href: "/apple-icon-114x114.png", sizes: "114x114" },
      { rel: "apple-touch-icon", href: "/apple-icon-120x120.png", sizes: "120x120" },
      { rel: "apple-touch-icon", href: "/apple-icon-144x144.png", sizes: "144x144" },
      { rel: "apple-touch-icon", href: "/apple-icon-152x152.png", sizes: "152x152" },
      { rel: "apple-touch-icon", href: "/apple-icon-180x180.png", sizes: "180x180" },
      // Web app manifest
      { rel: "manifest", href: "/manifest.json" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
