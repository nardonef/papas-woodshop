"use client";

import { useEffect, useRef, useState } from "react";
import { Photo } from "@/components/Photo";
import { derive, initialState, type BaseColor, type BuilderState, type Oil, type Style } from "@/lib/builder";
import { site } from "@/lib/site";

const ON = "border-green";
const OFF = "border-line";
const sel = (on: boolean) => `border-2 bg-white text-left ${on ? ON : OFF}`;
// Widest plan-view content: 10 ft table plus end chairs.
const PLAN_W = 362;
const PLAN_H = 340;

const styles: { id: Style; title: string; meta: string; photo: string; position?: string }[] = [
  { id: "trestle", title: "X-Trestle", meta: "Rectangular · pegged stretcher", photo: "xbase-detail.jpg" },
  { id: "round", title: "Round Pedestal", meta: "Round · scrolled four-arm base", photo: "round-base.jpg" },
  { id: "farmhouse", title: "Farmhouse", meta: "Rectangular · tapered four legs", photo: "black-leg-portrait.jpg", position: "center 42%" },
];

const bases: { id: BaseColor; title: string; meta: string; dot: string }[] = [
  { id: "natural", title: "Natural", meta: "Same wood as the top", dot: "bg-[#d2a86a]" },
  { id: "black", title: "Black", meta: "Painted, satin", dot: "bg-ink" },
  { id: "white", title: "White", meta: "Painted, satin", dot: "bg-cream border border-line" },
];

const oils: { id: Oil; title: string; meta: string; photo: string; position?: string }[] = [
  { id: "natural", title: "Natural oil", meta: "Pale, shows the grey weathering", photo: "round-top.jpg" },
  { id: "warm", title: "Warm oil", meta: "Deeper amber, more contrast", photo: "black-leg-garland.jpg", position: "center 45%" },
];

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-4 flex items-baseline gap-3.5">
        <span className="font-serif text-[26px] text-gold">{n}</span>
        <h2 className="font-serif text-2xl font-medium">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Slider({
  label, value, display, min, max, step, lo, hi, onChange,
}: { label: string; value: number; display: string; min: number; max: number; step: number; lo: string; hi: string; onChange: (n: number) => void }) {
  return (
    <label className="flex flex-col gap-2.5">
      <div className="flex justify-between text-[13px]">
        <span className="font-semibold uppercase tracking-[.1em] text-muted">{label}</span>
        <span className="font-serif text-xl">{display}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} />
      <div className="flex justify-between text-[11px] text-faint"><span>{lo}</span><span>{hi}</span></div>
    </label>
  );
}

function Extra({ title, meta, on, onClick }: { title: string; meta: string; on: boolean; onClick: () => void }) {
  return (
    <button type="button" aria-pressed={on} onClick={onClick} className="flex items-center justify-between gap-4 bg-white px-5 py-[18px] text-left">
      <span>
        <span className="block text-[15px] font-semibold">{title}</span>
        <span className="mt-0.5 block text-[13px] text-muted">{meta}</span>
      </span>
      <span className={`text-xs font-semibold uppercase tracking-[.1em] ${on ? "text-green" : "text-gold"}`}>{on ? "Added" : "Add"}</span>
    </button>
  );
}

export function TableBuilder() {
  const [s, setS] = useState<BuilderState>(initialState);
  const set = (patch: Partial<BuilderState>) => setS((prev) => ({ ...prev, ...patch }));
  const d = derive(s);
  const label = "micro text-muted";
  const planRef = useRef<HTMLDivElement>(null);
  const [planScale, setPlanScale] = useState(1);
  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setPlanScale(Math.min(1, e.contentRect.width / PLAN_W)));
    ro.observe(planRef.current!);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="px-page mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-start gap-[clamp(28px,4vw,56px)] pb-[clamp(56px,7vw,96px)]">
      <div className="flex flex-col gap-10">
        <Step n="01" title="Base style">
          <div className="grid gap-3 sm:grid-cols-3">
            {styles.map((o) => (
              <button key={o.id} type="button" aria-pressed={s.style === o.id} onClick={() => set({ style: o.id, ...(o.id === "round" ? { bench: false } : {}) })} className={`flex p-0 sm:flex-col ${sel(s.style === o.id)}`}>
                <Photo src={o.photo} alt={o.title} position={o.position} sizes="(max-width: 640px) 120px, (max-width: 900px) 33vw, 200px" className="w-28 flex-none sm:aspect-[4/3] sm:w-full" />
                <div className="px-3.5 py-3">
                  <div className="font-serif text-[17px]">{o.title}</div>
                  <div className="mt-0.5 text-xs text-muted">{o.meta}</div>
                </div>
              </button>
            ))}
          </div>
        </Step>

        <Step n="02" title="Size">
          <div className="flex flex-col gap-[22px] border border-line bg-white px-6 py-[22px]">
            {d.isRound ? (
              <Slider label="Diameter" value={s.diameter} display={`${s.diameter} in`} min={42} max={72} step={6} lo="42 in" hi="72 in" onChange={(n) => set({ diameter: n })} />
            ) : (
              <>
                <Slider label="Length" value={s.length} display={d.lengthLabel} min={5} max={10} step={0.5} lo="5 ft" hi="10 ft" onChange={(n) => set({ length: n })} />
                <Slider label="Width" value={s.width} display={`${s.width} in`} min={34} max={46} step={2} lo="34 in · narrow" hi="46 in · wide" onChange={(n) => set({ width: n })} />
              </>
            )}
          </div>
          <div className="mt-2.5 text-[13px] leading-normal text-muted">
            Allow about 36 in between the table edge and a wall so chairs can pull out. Papa will check your room dimensions before cutting.
          </div>
        </Step>

        <Step n="03" title="Base color">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
            {bases.map((o) => (
              <button key={o.id} type="button" aria-pressed={s.base === o.id} onClick={() => set({ base: o.id })} className={`flex items-center gap-3 p-3.5 ${sel(s.base === o.id)}`}>
                <span className={`h-7 w-7 flex-none rounded-full ${o.dot}`} />
                <span>
                  <span className="block text-sm font-semibold">{o.title}</span>
                  <span className="block text-xs text-muted">{o.meta}</span>
                </span>
              </button>
            ))}
          </div>
        </Step>

        <Step n="04" title="Top finish">
          <div className="grid grid-cols-2 gap-3">
            {oils.map((o) => (
              <button key={o.id} type="button" aria-pressed={s.oil === o.id} onClick={() => set({ oil: o.id })} className={`flex flex-col p-0 ${sel(s.oil === o.id)}`}>
                <Photo src={o.photo} alt={o.title} position={o.position} sizes="(max-width: 900px) 50vw, 300px" className="h-16 w-full" />
                <div className="px-3.5 py-3">
                  <div className="text-sm font-semibold">{o.title}</div>
                  <div className="mt-0.5 text-xs text-muted">{o.meta}</div>
                </div>
              </button>
            ))}
          </div>
        </Step>

        <Step n="05" title="Extras">
          <div className="flex flex-col gap-0.5 border border-line bg-line">
            {!d.isRound && (
              <Extra title="Matching bench" meta="Same wood and base color, one long side" on={s.bench} onClick={() => set({ bench: !s.bench })} />
            )}
            <Extra title="Delivery and setup" meta="Otherwise local pickup in Westchester County, included" on={s.delivery} onClick={() => set({ delivery: !s.delivery })} />
          </div>
        </Step>
      </div>

      <div className="flex flex-col gap-0.5 border border-line bg-line wide:sticky wide:top-6">
        <div className="bg-white px-6 pt-6 pb-4">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-xs font-semibold uppercase tracking-[.16em] text-muted">Plan view</span>
            <span className="text-xs text-faint">chairs shown 20 in wide</span>
          </div>
          <div
            ref={planRef}
            className="relative mt-2"
            style={{
              height: PLAN_H * planScale,
              background:
                "repeating-linear-gradient(0deg,transparent 0 29px,#efe9dd 29px 30px),repeating-linear-gradient(90deg,transparent 0 29px,#efe9dd 29px 30px)",
            }}
          >
            <div className="absolute inset-0" style={{ transform: `scale(${planScale})` }}>
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out"
                style={{
                  width: d.tableW,
                  height: d.tableH,
                  borderRadius: d.isRound ? "50%" : 4,
                  background: d.topColor,
                  boxShadow: "inset 0 0 0 3px rgba(0,0,0,.08)",
                }}
              />
              {d.chairs.map((c, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 h-[22px] w-[22px] rounded-full bg-green"
                  style={{ transform: `translate(calc(-50% + ${c.x}px), calc(-50% + ${c.y}px))` }}
                />
              ))}
              {d.showBench && (
                <div
                  className="absolute top-1/2 left-1/2 h-4 rounded-[4px] border border-black/20"
                  style={{ width: d.benchW, background: d.baseColorHex, transform: `translate(-50%, calc(-50% + ${d.benchY}px))` }}
                />
              )}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap text-muted">{d.dims}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 bg-white px-6 py-5">
          <div><div className={label}>Seats everyday</div><div className="font-serif text-[34px] leading-[1.1]">{d.seatsEveryday}</div></div>
          <div><div className={label}>Seats at a holiday</div><div className="font-serif text-[34px] leading-[1.1]">{d.seatsHoliday}</div></div>
        </div>

        <div className="flex flex-col gap-2.5 bg-white px-6 py-5">
          <div className={label}>Your table</div>
          <div className="font-serif text-[22px] leading-[1.3]">{d.summaryTitle}</div>
          <div className="text-sm leading-[1.6] text-muted">{d.summaryDetail}</div>
        </div>

        {site.showPrices && (
          <div className="flex flex-wrap items-center justify-between gap-4 bg-green px-6 py-[22px] text-cream">
            <div>
              <div className="micro text-gold">Rough estimate</div>
              <div className="mt-1 font-serif text-[30px] leading-[1.1]">{d.priceLabel}</div>
            </div>
            <div className="max-w-[200px] text-xs leading-normal text-line">
              Firm quote from Papa once he&apos;s seen the wood on hand. Half down reserves your spot.
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3 bg-white px-6 py-5">
          <a href={d.smsHref} className="min-w-[160px] flex-1 bg-gold px-5 py-[15px] text-center text-[13px] font-semibold uppercase tracking-[.1em] text-ink">
            Text this plan to Papa
          </a>
          <a href={d.mailHref} className="min-w-[160px] flex-1 border border-ink px-5 py-[15px] text-center text-[13px] font-semibold uppercase tracking-[.1em]">
            Email it
          </a>
        </div>
      </div>
    </div>
  );
}
