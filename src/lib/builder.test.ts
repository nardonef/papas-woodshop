import { describe, expect, it } from "vitest";
import { derive, initialState, type BuilderState } from "./builder";

const state = (patch: Partial<BuilderState> = {}): BuilderState => ({ ...initialState, ...patch });

describe("derive: rectangular", () => {
  it("default 7 ft x 40 in trestle", () => {
    const d = derive(state());
    expect(d.isRound).toBe(false);
    expect(d.seatsEveryday).toBe(6);
    expect(d.seatsHoliday).toBe(8);
    expect(d.chairs).toHaveLength(8);
    expect(d.tableW).toBe(202);
    expect(d.tableH).toBe(96);
    expect(d.lengthLabel).toBe("7 ft");
    expect(d.dims).toBe("7 ft × 40 in");
    expect(d.summaryTitle).toBe("7 ft × 40 in X-Trestle Farm Table");
    expect(d.summaryDetail).toBe(
      "natural wood base · natural oil finish · breadboard ends · local pickup. Seats 6 everyday, 8 at a holiday.",
    );
    expect(d.priceLabel).toBe("$2,650 – $3,150");
    expect(d.showBench).toBe(false);
  });

  it("half-foot length label", () => {
    expect(derive(state({ length: 7.5 })).lengthLabel).toBe("7 ft 6 in");
  });

  it("bench removes bottom-side chairs and adds $450", () => {
    const d = derive(state({ bench: true }));
    expect(d.chairs).toHaveLength(5);
    expect(d.showBench).toBe(true);
    expect(d.benchW).toBe(162);
    expect(d.summaryDetail).toContain("matching bench");
    expect(d.priceLabel).toBe("$3,100 – $3,600");
  });

  it("farmhouse 6 ft with painted base and delivery", () => {
    const d = derive(state({ style: "farmhouse", length: 6, base: "black", delivery: true }));
    expect(d.summaryTitle).toBe("6 ft × 40 in Farmhouse Table");
    expect(d.summaryDetail).toContain("black painted base");
    expect(d.summaryDetail).toContain("delivery and setup");
    expect(d.baseColorHex).toBe("#1c1a17");
    expect(d.priceLabel).toBe("$2,000 – $2,300");
  });
});

describe("derive: round", () => {
  it("60 in round pedestal", () => {
    const d = derive(state({ style: "round" }));
    expect(d.isRound).toBe(true);
    expect(d.tableW).toBe(144);
    expect(d.seatsEveryday).toBe(5);
    expect(d.seatsHoliday).toBe(7);
    expect(d.chairs).toHaveLength(7);
    expect(d.chairs[0].x).toBeCloseTo(0);
    expect(d.chairs[0].y).toBeCloseTo(-98);
    expect(d.dims).toBe('60" round');
    expect(d.summaryTitle).toBe('60" Round Pedestal Table');
    expect(d.priceLabel).toBe("$2,000 – $2,400");
  });

  it("small round seats at least 3", () => {
    expect(derive(state({ style: "round", diameter: 42 })).seatsEveryday).toBe(3);
  });

  it("ignores bench even if set", () => {
    const d = derive(state({ style: "round", bench: true }));
    expect(d.showBench).toBe(false);
    expect(d.summaryDetail).not.toContain("bench");
  });
});

describe("derive: finish colors and message links", () => {
  it("warm oil changes top color", () => {
    expect(derive(state({ oil: "warm" })).topColor).toBe("#b8803f");
    expect(derive(state()).topColor).toBe("#d2a86a");
  });

  it("sms and mailto hrefs carry the plan", () => {
    const d = derive(state());
    expect(d.smsHref.startsWith("sms:9142821270?&body=")).toBe(true);
    const body = decodeURIComponent(d.smsHref.split("body=")[1]);
    expect(body).toBe(
      "Hi Papa, I planned a table on your site: 7 ft × 40 in X-Trestle Farm Table, natural wood base, natural oil finish, breadboard ends, local pickup. Seats 6/8. Estimate shown: $2,650–$3,150.",
    );
    expect(d.mailHref.startsWith("mailto:mike.ryan50@gmail.com?subject=")).toBe(true);
    expect(decodeURIComponent(d.mailHref)).toContain("subject=Table plan: 7 ft × 40 in X-Trestle Farm Table");
  });
});
