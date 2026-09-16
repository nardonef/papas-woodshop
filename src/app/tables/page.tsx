import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { PageHeader } from "@/components/PageHeader";
import { Photo } from "@/components/Photo";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Tables" };

const specs = [
  ["Diameter", "60 inches"],
  ["Height", "30 inches"],
  ["Top", '2" solid reclaimed wood'],
  ["Finish", "Natural, hand-rubbed"],
];

const styles = [
  {
    photo: "xtrestle-side.jpg",
    title: "X-Trestle Farm Table",
    copy: "Rectangular top with breadboard ends on an X-braced trestle. The stretcher is held by an exposed, pegged through-tenon. Legs sit at the ends, so no one straddles a leg.",
    meta: "Typically 6 to 8 ft · seats 6 to 10",
  },
  {
    photo: "round-angle.jpg",
    title: "Round Pedestal",
    copy: "A round top on a four-arm scrolled pedestal. Good for square rooms and conversation, and there's no corner to walk into. The same base carries an oval top.",
    meta: '48" to 66" diameter · seats 4 to 8',
  },
  {
    photo: "black-leg-bench.jpg",
    title: "Farmhouse, Painted Base",
    copy: "Tapered four-leg base painted black (or the color you choose) under a natural reclaimed top. Reads a little more modern; pairs well with a bench.",
    meta: "5 to 8 ft · seats 4 to 8 · matching bench available",
  },
];

const gallery: { photo: string; span?: string; position?: string }[] = [
  { photo: "xtrestle-windsor.jpg", span: "col-span-2 row-span-2" },
  { photo: "xbase-detail.jpg" },
  { photo: "tabletop-placemats.jpg", position: "center 40%" },
  { photo: "xtrestle-chandelier.jpg", span: "row-span-2" },
  { photo: "round-windsor.jpg" },
  { photo: "black-leg-garland.jpg", span: "col-span-2" },
  { photo: "peg-joint.jpg" },
  { photo: "trestle-white-chairs.jpg", position: "center 55%" },
  { photo: "black-leg-bench-night.jpg", span: "col-span-2" },
  { photo: "round-ovalrug.jpg" },
  { photo: "xtrestle-rug.jpg" },
];

export default function TablesPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader kicker="The tables" title="Ready now, or built for your room">
          A finished table is occasionally available for pickup. Everything else is built to order in one of three styles, sized
          to your space.
        </PageHeader>

        <section className="px-page mx-auto max-w-[1200px] pb-20">
          <div className="mb-7 flex items-baseline justify-between border-b border-ink pb-3">
            <h2 className="font-serif text-[28px] font-medium">Available now</h2>
            <span className="text-xs font-semibold tracking-[.14em] uppercase text-green">1 table</span>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] border border-line bg-white">
            <div className="grid grid-cols-2 gap-0.5 bg-line">
              <Photo src="round-side.jpg" alt="60 inch round trestle table, side view" sizes="(max-width: 900px) 100vw, 600px" className="col-span-2 aspect-[4/3]" />
              <Photo src="round-top.jpg" alt="Round table top" sizes="300px" className="aspect-[4/3]" />
              <Photo src="round-base.jpg" alt="Scrolled trestle base" sizes="300px" className="aspect-[4/3]" />
            </div>
            <div className="flex flex-col gap-5 p-[clamp(28px,4vw,48px)]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="micro bg-green px-2.5 py-1.5 font-semibold text-cream">In stock · local pickup</span>
                {site.showPrices && (
                  <span className="font-serif text-[30px] text-green">
                    $2,200 <span className="font-sans text-sm tracking-[.1em] text-muted">OBO</span>
                  </span>
                )}
              </div>
              <h3 className="font-serif text-[clamp(28px,3vw,38px)] leading-[1.1] font-medium">60&quot; Round Trestle Dining Table</h3>
              <p className="text-base leading-[1.6] text-muted">
                A thick round top on a heavy scrolled trestle base, all reclaimed barn wood with a natural hand-rubbed finish.
                Traditional joinery throughout. Seats four comfortably, six at a holiday.
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-5 text-sm leading-normal">
                {specs.map(([k, v]) => (
                  <div key={k}>
                    <div className="micro text-muted">{k}</div>
                    {v}
                  </div>
                ))}
              </div>
              <div className="mt-1.5 flex flex-wrap gap-3">
                <Button href="/contact" className="!px-6 !py-3.5">Ask about this table</Button>
                <Button href={site.phoneHref} variant="outline" className="!px-6 !py-3.5">Call or text</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="px-page py-section bg-cream-2">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-11 max-w-[640px]">
              <div className="eyebrow mb-3">Built to order</div>
              <h2 className="h2 mb-3.5">Three styles, any size</h2>
              <p className="text-base leading-[1.6] text-muted">
                Pick a base, tell Papa how many you seat and how much room you have. Lead time is usually 6 to 10 weeks depending
                on the wood on hand.
              </p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6">
              {styles.map((s) => (
                <div key={s.title} className="flex flex-col border border-line bg-cream">
                  <Photo src={s.photo} alt={s.title} sizes="(max-width: 900px) 100vw, 400px" className="aspect-[4/3]" />
                  <div className="flex flex-1 flex-col gap-2.5 p-[26px]">
                    <h3 className="font-serif text-[26px] font-medium">{s.title}</h3>
                    <p className="flex-1 text-[15px] leading-[1.55] text-muted">{s.copy}</p>
                    <div className="border-t border-line pt-3 text-[13px] text-muted">{s.meta}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button href="/build" variant="green" className="!px-[30px] !py-4">Plan yours in the builder</Button>
              <Button href="/contact" variant="outline" className="!px-[30px] !py-4">Start a commission</Button>
            </div>
          </div>
        </section>

        <section className="px-page py-section mx-auto max-w-[1200px]">
          <div className="mb-7 flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="font-serif text-[clamp(28px,3.5vw,36px)] font-medium">Past builds, at home</h2>
            <span className="text-sm text-muted">Photos from the families who own them</span>
          </div>
          <div className="grid auto-rows-[220px] grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3 [grid-auto-flow:dense]">
            {gallery.map((g) => (
              <Photo key={g.photo} src={g.photo} alt="A finished table in its home" position={g.position} sizes="(max-width: 700px) 50vw, 33vw" className={g.span} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
