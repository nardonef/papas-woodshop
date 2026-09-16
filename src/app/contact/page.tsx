import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { InquiryForm } from "@/components/InquiryForm";
import { Nav } from "@/components/Nav";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

const ways = [
  { href: site.phoneHref, label: "Call", value: site.phoneDisplay },
  { href: site.smsHref, label: "Text", value: "Send a photo of your space" },
  { href: site.emailHref, label: "Email", value: site.email },
  { href: site.marketplaceUrl, label: "Facebook Marketplace", value: "See current listings" },
];

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="px-page mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-start gap-[clamp(40px,6vw,96px)] py-[clamp(48px,7vw,88px)]">
        <div className="flex flex-col gap-7">
          <div>
            <div className="kicker">Let&apos;s make it yours.</div>
            <h1 className="mt-1.5 mb-[18px] font-serif text-[clamp(40px,4.8vw,60px)] leading-[1.02] font-medium tracking-[-.01em]">Tell Papa about your room</h1>
            <p className="text-[17px] leading-[1.6] text-muted">
              A few details is all it takes to start. He&apos;ll call or write back within a day or two with questions and a rough
              price. No obligation.
            </p>
          </div>
          <div className="grid gap-0.5 border border-line bg-line">
            {ways.map((w) => (
              <a key={w.label} href={w.href} className="flex items-center justify-between gap-4 bg-white px-[22px] py-5">
                <div className="min-w-0">
                  <div className="mb-1 text-[11px] tracking-[.16em] uppercase text-muted">{w.label}</div>
                  <div className="font-serif text-[22px] [overflow-wrap:anywhere]">{w.value}</div>
                </div>
                <span className="text-[22px] text-gold">→</span>
              </a>
            ))}
          </div>
          <div className="text-sm leading-[1.6] text-muted">
            Westchester County, New York. Local pickup included; delivery available for an additional fee.
          </div>
        </div>
        <div className="border border-line bg-white p-[clamp(24px,3.5vw,40px)]">
          <InquiryForm />
        </div>
      </main>
      <Footer tagline />
    </>
  );
}
