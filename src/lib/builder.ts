import { site } from "./site";

export type Style = "trestle" | "round" | "farmhouse";
export type BaseColor = "natural" | "black" | "white";
export type Oil = "natural" | "warm";

export interface BuilderState {
  style: Style;
  length: number;
  width: number;
  diameter: number;
  base: BaseColor;
  oil: Oil;
  bench: boolean;
  delivery: boolean;
}

export const initialState: BuilderState = {
  style: "trestle",
  length: 7,
  width: 40,
  diameter: 60,
  base: "natural",
  oil: "natural",
  bench: false,
  delivery: false,
};

export const PX_PER_IN = 2.4;
const CHAIR_OFFSET = 26;

export const styleNames: Record<Style, string> = {
  trestle: "X-Trestle Farm Table",
  round: "Round Pedestal Table",
  farmhouse: "Farmhouse Table",
};

export const baseColorHex: Record<BaseColor, string> = { natural: "#c9a066", black: "#1c1a17", white: "#f4efe6" };
export const topColorHex: Record<Oil, string> = { natural: "#d2a86a", warm: "#b8803f" };

export interface Point { x: number; y: number }

export interface Derived {
  isRound: boolean;
  tableW: number;
  tableH: number;
  chairs: Point[];
  showBench: boolean;
  benchY: number;
  benchW: number;
  topColor: string;
  baseColorHex: string;
  seatsEveryday: number;
  seatsHoliday: number;
  lengthLabel: string;
  dims: string;
  summaryTitle: string;
  summaryDetail: string;
  priceLabel: string;
  smsHref: string;
  mailHref: string;
}

const fmt = (n: number) => "$" + n.toLocaleString("en-US");

function estimate(s: BuilderState): number {
  let price: number;
  if (s.style === "round") price = 2200 + Math.max(0, s.diameter - 60) * 40 - Math.max(0, 60 - s.diameter) * 25;
  else if (s.style === "trestle") price = 2600 + (s.length - 6) * 300 + (s.width - 40) * 15;
  else price = 2000 + (s.length - 6) * 250 + (s.width - 40) * 15;
  if (s.base !== "natural") price += 150;
  if (s.bench && s.style !== "round") price += 450;
  return price;
}

export function derive(s: BuilderState): Derived {
  const isRound = s.style === "round";
  const bench = !isRound && s.bench;
  const chairs: Point[] = [];
  let tableW: number, tableH: number, seatsEveryday: number, seatsHoliday: number;

  if (isRound) {
    tableW = tableH = Math.round(s.diameter * PX_PER_IN);
    seatsEveryday = Math.max(3, Math.floor(s.diameter / 12));
    seatsHoliday = seatsEveryday + 2;
    const r = tableW / 2 + CHAIR_OFFSET;
    for (let i = 0; i < seatsHoliday; i++) {
      const a = (Math.PI * 2 * i) / seatsHoliday - Math.PI / 2;
      chairs.push({ x: r * Math.cos(a), y: r * Math.sin(a) });
    }
  } else {
    const lengthIn = s.length * 12;
    tableW = Math.round(lengthIn * PX_PER_IN);
    tableH = Math.round(s.width * PX_PER_IN);
    const perSide = Math.max(1, Math.floor((lengthIn - 12) / 24));
    seatsEveryday = perSide * 2;
    seatsHoliday = perSide * 2 + 2;
    const step = tableW / perSide;
    for (let i = 0; i < perSide; i++) {
      const x = -tableW / 2 + step * (i + 0.5);
      chairs.push({ x, y: -tableH / 2 - CHAIR_OFFSET });
      if (!bench) chairs.push({ x, y: tableH / 2 + CHAIR_OFFSET });
    }
    chairs.push({ x: -tableW / 2 - CHAIR_OFFSET, y: 0 }, { x: tableW / 2 + CHAIR_OFFSET, y: 0 });
  }

  const price = estimate(s);
  const lo = Math.round((price * 0.92) / 50) * 50;
  const hi = Math.round((price * 1.08) / 50) * 50;

  const lengthLabel = Number.isInteger(s.length) ? `${s.length} ft` : `${Math.floor(s.length)} ft 6 in`;
  const dims = isRound ? `${s.diameter}" round` : `${lengthLabel} × ${s.width} in`;
  const summaryTitle = isRound ? `${s.diameter}" ${styleNames.round}` : `${dims} ${styleNames[s.style]}`;
  const detailParts = [
    s.base === "natural" ? "natural wood base" : `${s.base} painted base`,
    `${s.oil} oil finish`,
    "breadboard ends",
  ];
  if (bench) detailParts.push("matching bench");
  detailParts.push(s.delivery ? "delivery and setup" : "local pickup");
  const summaryDetail = `${detailParts.join(" · ")}. Seats ${seatsEveryday} everyday, ${seatsHoliday} at a holiday.`;
  const msg = `Hi Papa, I planned a table on your site: ${summaryTitle}, ${detailParts.join(", ")}. Seats ${seatsEveryday}/${seatsHoliday}. Estimate shown: ${fmt(lo)}–${fmt(hi)}.`;

  return {
    isRound,
    tableW,
    tableH,
    chairs,
    showBench: bench,
    benchY: tableH / 2 + CHAIR_OFFSET,
    benchW: Math.round(tableW * 0.8),
    topColor: topColorHex[s.oil],
    baseColorHex: baseColorHex[s.base],
    seatsEveryday,
    seatsHoliday,
    lengthLabel,
    dims,
    summaryTitle,
    summaryDetail,
    priceLabel: `${fmt(lo)} – ${fmt(hi)}`,
    smsHref: `${site.smsHref}?&body=${encodeURIComponent(msg)}`,
    mailHref: `${site.emailHref}?subject=${encodeURIComponent("Table plan: " + summaryTitle)}&body=${encodeURIComponent(msg)}`,
  };
}
