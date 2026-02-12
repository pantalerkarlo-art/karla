import { PortfolioGrid } from "@/components/PortfolioGrid";
import { initialItems } from "@/data/items";

export default function Home() {
  return (
    <main className="min-h-screen pb-20 pt-16 md:pt-24 bg-editorial-white">
      <header className="max-w-7xl mx-auto px-4 md:px-6 mb-12 md:mb-20 text-center">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif font-regular tracking-tight mb-4 md:mb-6 text-editorial-charcoal">
          KARLO PANTALER
        </h1>
        <p className="text-base md:text-lg font-mono text-editorial-charcoal/60 max-w-2xl mx-auto border-t border-editorial-charcoal/10 pt-6">
          engineering aesthetics. crafting pixels &amp; code.
        </p>
      </header>

      <PortfolioGrid items={initialItems} />
    </main>
  );
}
