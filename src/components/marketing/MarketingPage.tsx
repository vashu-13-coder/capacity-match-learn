import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

/** Shared shell for all public marketing pages. */
export function MarketingPage({
  title,
  intro,
  children,
}: {
  title?: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {title && (
          <section className="border-b border-border bg-card">
            <div className="mx-auto max-w-6xl px-4 py-14">
              <h1 className="text-3xl sm:text-4xl">{title}</h1>
              {intro && <p className="mt-3 max-w-2xl text-muted-foreground">{intro}</p>}
            </div>
          </section>
        )}
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
