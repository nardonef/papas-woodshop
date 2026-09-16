import Link from "next/link";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Photo } from "@/components/Photo";
import { site } from "@/lib/site";

const facts = [
  ["Hand-picked wood", "Every board comes from Pennsylvania barns, chosen by Papa for grain, color and character."],
  ["Traditional joinery", "Pegged trestles and through-tenons. No visible hardware, nothing that loosens over time."],
  ["Built to your room", "Round, rectangular, or trestle. Sized to your space and how many you feed on Sunday."],
];

const builds = [
  { photo: "round-angle.jpg", title: '60" Round Trestle', price: "$2,200", meta: "Seats 4 to 6 · Natural finish · In stock" },
  { photo: "xtrestle-side.jpg", title: "X-Trestle Farm Table", price: "Commission", meta: "Seats 6 to 10 · Pegged stretcher" },
  { photo: "black-leg-chairs.jpg", title: "Farmhouse, Black Base", price: "Commission", meta: "Seats 4 to 8 · Painted base, natural top" },
];

const steps = [
  ["Sourcing.", "Papa drives to Amish country, PA and hand-picks boards from dismantled barns."],
  ["Milling.", "Nails pulled, boards dried, planed flat, and matched for grain and color."],
  ["Joinery.", "Trestles and bases cut and pegged by hand. Breadboard ends on every top."],
  ["Finish.", "Hand-rubbed oil finish that keeps the saw marks, nail holes and history."],
];

export default function Home() {
  return (
    <>
      <section className="relative flex min-h-[min(92vh,860px)] flex-col text-cream">
        <Photo src="round-windsor.jpg" alt="Round reclaimed-wood table with black Windsor chairs" position="center 60%" priority className="absolute inset-0" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,42,31,.6)_0%,rgba(22,42,31,.2)_35%,rgba(22,42,31,.88)_100%)]" />
        <div className="relative">
          <Nav onHero />
        </div>
        <div className="px-page relative grid flex-1 grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] content-end items-end gap-x-[clamp(32px,5vw,72px)] gap-y-8 pt-[clamp(48px,8vw,120px)] pb-[clamp(40px,6vw,72px)]">
          <div>
            <div className="mb-2 font-script text-[clamp(26px,3vw,34px)] text-gold">Reclaimed Amish barn wood, hand-built one at a time</div>
            <h1 className="font-serif text-[clamp(42px,7vw,92px)] leading-[.98] font-medium tracking-[-.01em]">
              Built to gather.
              <br />
              Built to last.
            </h1>
          </div>
          <div className="flex max-w-[520px] flex-col gap-6 pb-2.5">
            <p className="text-[clamp(16px,1.4vw,18px)] leading-[1.55] text-hero-text">
              Dining tables made from barn wood Papa picks himself in Amish country, Pennsylvania, then joins the old way in his
              Westchester County shop.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Button href="/tables">See the tables</Button>
              <Button href="/build" variant="outlineLight">Build your own</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] border-b border-line">
        {facts.map(([title, copy], i) => (
          <div key={title} className={`-mb-px border-b border-line px-[clamp(20px,4vw,56px)] py-9 ${i < 2 ? "border-r" : ""}`}>
            <div className="mb-2 font-serif text-2xl">{title}</div>
            <p className="text-[15px] leading-[1.55] text-muted">{copy}</p>
          </div>
        ))}
      </section>

      <section className="px-page mx-auto max-w-[1280px] pt-section pb-[clamp(48px,6vw,72px)]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <div className="eyebrow mb-3">Recent builds</div>
            <h2 className="h2">Three ways to set a table</h2>
          </div>
          <Button href="/tables" variant="text">All tables</Button>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-7">
          {builds.map((b) => (
            <Link key={b.title} href="/tables" className="flex flex-col gap-3.5">
              <Photo src={b.photo} alt={b.title} sizes="(max-width: 900px) 100vw, 400px" className="aspect-[4/3]" />
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-serif text-[22px]">{b.title}</span>
                {site.showPrices && <span className="text-sm font-semibold text-green">{b.price}</span>}
              </div>
              <div className="text-sm text-muted">{b.meta}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] bg-green text-cream">
        <Photo src="workshop-planks.jpg" alt="Reclaimed planks being finished in the shop" sizes="(max-width: 900px) 100vw, 50vw" className="min-h-[420px]" />
        <div className="flex flex-col justify-center gap-7 px-[clamp(24px,5vw,72px)] py-[clamp(48px,6vw,80px)]">
          <div className="font-script text-[30px] text-gold">From barn to dining room</div>
          <h2 className="h2-sm">A hundred-year-old board doesn&apos;t hurry, and neither does Papa.</h2>
          <div className="grid gap-[18px] text-[15px] leading-[1.55] text-line">
            {steps.map(([lead, copy], i) => (
              <div key={lead} className="flex gap-[18px]">
                <span className="w-7 flex-none font-serif text-xl text-gold">0{i + 1}</span>
                <span>
                  <strong className="font-semibold text-cream">{lead}</strong> {copy}
                </span>
              </div>
            ))}
          </div>
          <Button href="/story" variant="outlineGold" className="self-start">Read the full story</Button>
        </div>
      </section>

      <section className="px-page py-section mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-center gap-[clamp(32px,5vw,64px)]">
        <div className="flex flex-col gap-[22px]">
          <div className="eyebrow">Build your table</div>
          <h2 className="font-serif text-[clamp(30px,3.5vw,42px)] leading-[1.1] font-medium">Pick a base, set the size, see how many you&apos;ll seat.</h2>
          <p className="text-[17px] leading-[1.6] text-muted">
            Work out the shape and size that fits your room, add a bench or a painted base, and send the plan straight to Papa for
            a quote.
          </p>
          <Button href="/build" variant="green" className="self-start">Open the table builder</Button>
        </div>
        <Link href="/build" className="grid grid-cols-2 gap-2.5">
          <Photo src="xbase-detail.jpg" alt="X-trestle base detail" sizes="300px" className="aspect-square" />
          <Photo src="round-base.jpg" alt="Round pedestal base" sizes="300px" className="aspect-square" />
          <Photo src="black-leg-portrait.jpg" alt="Farmhouse table with black legs" position="center 40%" sizes="300px" className="aspect-square" />
          <div className="flex aspect-square flex-col items-center justify-center gap-2 bg-green p-4 text-center text-cream">
            <span className="font-serif text-[clamp(28px,3vw,40px)] leading-none">5–10 ft</span>
            <span className="text-xs tracking-[.14em] uppercase text-gold">any size in between</span>
          </div>
        </Link>
      </section>

      {site.showTestimonials && (
        <section className="px-page bg-cream-2 py-[clamp(64px,8vw,96px)]">
          <div className="mx-auto max-w-[820px] text-center">
            <div className="mb-7 font-serif text-[72px] leading-[.5] text-gold">“</div>
            <p className="mb-6 font-serif text-[clamp(22px,2.6vw,30px)] leading-[1.4] italic [text-wrap:balance]">
              Every holiday since, twelve of us have fit around it. You can feel the weight of it when you lean in.
            </p>
            <div className="text-[13px] tracking-[.14em] uppercase text-muted">
              A Westchester family · <span className="font-mono tracking-normal normal-case">sample quote, replace with a real review</span>
            </div>
          </div>
        </section>
      )}

      <section className="px-page mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-center gap-[clamp(32px,5vw,64px)] py-[clamp(56px,7vw,96px)]">
        <Photo src="peg-joint.jpg" alt="Pegged through-tenon joint" sizes="(max-width: 900px) 100vw, 600px" className="aspect-[3/4] max-h-[620px]" />
        <div className="flex flex-col gap-[22px]">
          <div className="eyebrow">About Papa</div>
          <h2 className="h2-sm">A weekend shop, a grandfather&apos;s standards.</h2>
          <p className="text-[17px] leading-[1.6] text-muted">
            Papa builds tables in the hours after work and on weekends, and only the way he&apos;d want one in his own house: heavy
            tops, honest joints, and wood with a story. He sold the first few on Facebook Marketplace. The families who bought
            them keep sending photos.
          </p>
          <Button href="/story" variant="text" className="self-start">Meet Papa</Button>
        </div>
      </section>

      <Footer full />
    </>
  );
}
