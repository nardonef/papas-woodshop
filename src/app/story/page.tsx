import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Photo } from "@/components/Photo";

export const metadata: Metadata = { title: "Our Story" };

const process = [
  {
    photo: "workshop-planks.jpg",
    title: "Sourcing in Amish country",
    copy: "Papa drives to Pennsylvania and walks the piles from dismantled barns himself. He's picking for color, straight grain, and the character marks: nail holes, saw kerfs, weathering.",
  },
  {
    photo: "tabletop-placemats.jpg",
    position: "center 40%",
    title: "Milling and matching",
    copy: "Old nails come out, boards dry to indoor humidity, then get planed flat and jointed. He lays out the top board by board so the grain and color flow across it.",
  },
  {
    photo: "peg-joint.jpg",
    title: "Joinery by hand",
    copy: "Trestles and pedestals are cut and fitted with mortise-and-tenon joints and locked with wooden pegs. Tops get breadboard ends so they stay flat through the seasons.",
  },
  {
    photo: "round-top.jpg",
    title: "A finish you can live with",
    copy: "Hand-rubbed oil, several coats. It brings up the grain without hiding the history, and it's easy to touch up at home if life leaves a mark.",
  },
];

export default function StoryPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="grid min-h-[70vh] grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))]">
          <div className="flex flex-col justify-center gap-[22px] px-[clamp(20px,5vw,64px)] py-[clamp(48px,7vw,96px)]">
            <div className="kicker">About Papa</div>
            <h1 className="font-serif text-[clamp(40px,4.8vw,64px)] leading-[1.02] font-medium tracking-[-.01em]">
              He builds tables the way his grandfather&apos;s generation did, because it still works.
            </h1>
            <p className="text-[17px] leading-[1.65] text-muted">
              Papa works a full week and spends his evenings and weekends in his shop in Westchester County, New York. He started
              building for his own family, then for friends, then for strangers on Facebook Marketplace who kept asking if he had
              another one. Every table is his work alone, from picking the boards to rubbing in the last coat of oil.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/contact" variant="green" className="!py-3.5">Talk to Papa</Button>
              <Button href="/tables" variant="outline">See his tables</Button>
            </div>
          </div>
          {/* Portrait slot: swap for a Photo once Papa's shop portrait exists */}
          <div className="relative min-h-[420px] bg-[repeating-linear-gradient(135deg,#e6dfd0_0_12px,#ebe3d4_12px_24px)]">
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <span className="border border-dashed border-faint bg-cream px-3.5 py-2.5 font-mono text-[13px] text-muted">portrait of Papa in the shop</span>
            </div>
          </div>
        </section>

        <section className="px-page bg-green-deep py-[clamp(56px,7vw,96px)] text-cream">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-12 max-w-[680px]">
              <div className="eyebrow-gold mb-3">The process</div>
              <h2 className="mb-3.5 font-serif text-[clamp(32px,4vw,48px)] leading-[1.08] font-medium">From an Amish barn to your dining room</h2>
              <p className="text-base leading-[1.6] text-line">
                There&apos;s no shortcut in any of this. Each step takes the time it takes, and that&apos;s most of why the tables come
                out the way they do.
              </p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-0.5 bg-cream/12">
              {process.map((p, i) => (
                <div key={p.title} className={`flex flex-col gap-3.5 bg-green-deep py-8 ${i === 0 ? "pr-7" : i === 3 ? "pl-7" : "px-7"}`}>
                  <Photo src={p.photo} alt={p.title} position={p.position} sizes="(max-width: 900px) 100vw, 300px" className="aspect-[4/3]" />
                  <div className="font-serif text-[40px] leading-none text-gold">0{i + 1}</div>
                  <h3 className="font-serif text-2xl font-medium">{p.title}</h3>
                  <p className="text-[15px] leading-[1.6] text-line">{p.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-page mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-center gap-[clamp(32px,5vw,72px)] py-[clamp(56px,7vw,96px)]">
          <Photo src="xbase-detail.jpg" alt="X-trestle base with pegged stretcher" sizes="(max-width: 900px) 100vw, 600px" className="aspect-[4/3]" />
          <div className="flex flex-col gap-5">
            <div className="eyebrow">Why reclaimed</div>
            <h2 className="font-serif text-[clamp(30px,3.5vw,42px)] leading-[1.1] font-medium">Old-growth wood you can&apos;t buy new</h2>
            <p className="text-base leading-[1.65] text-muted">
              Barn timbers were cut from trees that grew slowly for a century or more before they were felled. The grain is tighter
              and the wood is denser and more stable than anything at a lumberyard today. It has already spent a hundred years
              moving with the seasons, so it&apos;s done surprising anyone.
            </p>
            <p className="text-base leading-[1.65] text-muted">
              Papa leaves the marks in. A filled nail hole is a nail hole; a knot is a knot. Two tables from the same barn will
              still look different, and that&apos;s the point.
            </p>
          </div>
        </section>

        <section className="px-page bg-cream-2 py-[clamp(48px,6vw,72px)] text-center">
          <div className="kicker">Have a room in mind?</div>
          <h2 className="mt-1.5 mb-6 font-serif text-[clamp(28px,3.5vw,40px)] leading-[1.1] font-medium">Tell Papa how many you seat. He&apos;ll take it from there.</h2>
          <Button href="/contact" variant="green" className="!px-[30px] !py-4">Start a commission</Button>
        </section>
      </main>
      <Footer />
    </>
  );
}
