import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { PageHeader } from "@/components/PageHeader";
import { Photo } from "@/components/Photo";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Pricing & FAQ" };

const cards = [
  { photo: "round-angle.jpg", title: "Round Pedestal", meta: '48" to 66" diameter · seats 4 to 8', price: "from $2,200" },
  { photo: "xtrestle-side.jpg", title: "X-Trestle Farm Table", meta: "6 to 8 ft · seats 6 to 10", price: "from $2,600" },
  { photo: "black-leg-bench.jpg", title: "Farmhouse, Painted Base", meta: "5 to 8 ft · seats 4 to 8 · bench optional", price: "from $2,000" },
];

const notes = [
  ["What's included", "Design conversation, hand-picked reclaimed wood, traditional joinery, hand-rubbed finish, and local pickup in Westchester County."],
  ["What moves the price", "Overall size and top thickness, base style, a painted base, a matching bench, and delivery distance."],
  ["How payment works", "Half down to reserve the wood and a spot on the bench, the balance at pickup or delivery."],
];

const faq = [
  ["How long does a table take?", "Usually 6 to 10 weeks from deposit. It depends on the wood already in the shop and how many tables are ahead of yours. Papa will give you a real date when you order, not a guess."],
  ["Do you deliver?", "Local pickup in Westchester County is included. Delivery within the Hudson Valley, NYC, and nearby Connecticut is available for an additional fee based on distance. Papa brings the table in and sets it where you want it."],
  ["What wood is it, exactly?", "Reclaimed barn wood from Amish country, Pennsylvania. Species varies by barn; Papa can tell you what a specific table is made from. All of it is old-growth, dense, and long since done moving."],
  ["How do I care for it?", "Wipe with a damp cloth, dry it, and skip harsh cleaners. Use trivets under hot pans. Once a year or so, a light coat of the same oil finish brings it back. Papa will send you home with instructions and can supply the oil."],
  ["Can you match a size or a chair I already have?", "Yes. Send room measurements, how many you seat day-to-day and at a holiday, and photos of your chairs. Height, overhang and leg placement are worked out to fit them."],
  ["Do you make benches or other pieces?", "Matching benches, yes. Other pieces from the same wood are occasionally possible; ask."],
];

const quotes = [
  ["Heavier than anything we've owned. The kids do homework on it, we host on it, and it looks better every year.", "Round pedestal · Katonah"],
  ["He asked how many we seat at Thanksgiving before he asked anything else. That's who you want building your table.", "X-trestle commission · Yorktown"],
  ["Delivered it himself, set it in place, and showed us the nail holes from the barn. Our guests always ask about it.", "Farmhouse with bench · Croton"],
];

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader kicker="Pricing guide" title="What a table costs, roughly">
          Every table is quoted individually because the size, base, and the boards on hand all move the number. These ranges are
          where most land. Firm quotes are free and usually same-day.
        </PageHeader>

        <section className="px-page mx-auto max-w-[1200px] pt-2 pb-section">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-0.5 border border-line bg-line">
            {cards.map((c) => (
              <div key={c.title} className="flex flex-col gap-2.5 bg-cream px-7 py-8">
                <Photo src={c.photo} alt={c.title} sizes="(max-width: 900px) 100vw, 400px" className="mb-2 aspect-[3/2]" />
                <h3 className="font-serif text-2xl font-medium">{c.title}</h3>
                <div className="text-sm text-muted">{c.meta}</div>
                {site.showPrices && <div className="mt-2 font-serif text-[30px] text-green">{c.price}</div>}
              </div>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-10 gap-y-6 text-[15px] leading-[1.55] text-muted">
            {notes.map(([title, copy]) => (
              <div key={title}>
                <div className="mb-1 font-semibold text-ink">{title}</div>
                {copy}
              </div>
            ))}
          </div>
          {site.showPrices && (
            <div className="mt-6 font-mono text-xs text-faint">Starting prices other than the $2,200 round are placeholders for Papa to confirm.</div>
          )}
        </section>

        <section className="px-page py-section bg-cream-2">
          <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[clamp(32px,5vw,72px)]">
            <div>
              <div className="eyebrow mb-3">Questions</div>
              <h2 className="h2 mb-4">Delivery, lead time, care</h2>
              <p className="text-base leading-[1.6] text-muted">
                Anything not answered here,{" "}
                <a href={site.phoneHref} className="border-b border-ink text-ink">call or text Papa</a>. He&apos;d rather talk than type.
              </p>
            </div>
            <div className="flex flex-col border-t border-ink">
              {faq.map(([q, a]) => (
                <details key={q} className="group border-b border-line-2">
                  <summary className="flex justify-between gap-5 py-5 font-serif text-xl">
                    <span>{q}</span>
                    <span className="text-2xl leading-none text-gold transition-transform duration-150 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mb-5 text-[15px] leading-[1.6] text-muted">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {site.showTestimonials && (
          <section className="px-page py-section mx-auto max-w-[1200px]">
            <div className="mb-10 text-center">
              <div className="font-script text-[30px] text-gold">From the families</div>
              <h2 className="h2-sm mt-1">What owners say</h2>
              <div className="mt-2.5 font-mono text-xs text-faint">sample quotes, replace with real Marketplace reviews</div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
              {quotes.map(([quote, who]) => (
                <div key={who} className="border-t-[3px] border-gold pt-7">
                  <p className="mb-4 font-serif text-[21px] leading-[1.45] italic">{quote}</p>
                  <div className="text-xs tracking-[.14em] uppercase text-muted">{who}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
