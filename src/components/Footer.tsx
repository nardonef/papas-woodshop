import Link from "next/link";
import { navLinks, site } from "@/lib/site";

const heading = "mb-2.5 text-xs font-semibold uppercase tracking-[.1em] text-cream";

export function Footer({ full = false }: { full?: boolean }) {
  if (!full) {
    return (
      <footer className="px-page flex flex-wrap items-start justify-between gap-8 bg-green py-12 text-sm leading-[1.7] text-line">
        <div>
          <div className="font-serif text-[22px] font-semibold tracking-[.06em] text-cream">PAPA&apos;S WOODSHOP</div>
          <div className="mt-1.5 text-faint">{site.location} · Local pickup, delivery for a fee</div>
        </div>
        <div className="flex flex-wrap gap-12">
          <div>
            <a href={site.phoneHref} className="text-cream">{site.phoneDisplay}</a>
            <br />
            <span className="text-faint">call or text</span>
          </div>
          <div>
            <a href={site.emailHref} className="text-cream">{site.email}</a>
            <br />
            <a href={site.marketplaceUrl} className="text-faint">Facebook Marketplace</a>
          </div>
        </div>
      </footer>
    );
  }
  return (
    <footer className="px-page grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10 bg-green-deep py-[clamp(40px,5vw,56px)] text-sm leading-[1.7] text-line">
      <div>
        <div className="font-serif text-[22px] font-semibold tracking-[.06em] text-cream">PAPA&apos;S WOODSHOP</div>
        <div className="mt-1.5 font-script text-2xl text-gold">{site.tagline}</div>
        <div className="mt-[18px] text-faint">
          {site.location}
          <br />
          Local pickup · Delivery available for a fee
        </div>
      </div>
      <div>
        <div className={heading}>Contact</div>
        <a href={site.phoneHref}>{site.phoneDisplay} · call or text</a>
        <br />
        <a href={site.emailHref}>{site.email}</a>
      </div>
      <div>
        <div className={heading}>Explore</div>
        <Link href="/">Home</Link>
        {navLinks.map(([href, label]) => (
          <span key={href}>
            <br />
            <Link href={href}>{label}</Link>
          </span>
        ))}
      </div>
      <div>
        <div className={heading}>Elsewhere</div>
        <a href={site.marketplaceUrl}>Facebook Marketplace</a>
      </div>
    </footer>
  );
}
