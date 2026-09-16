"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks, site } from "@/lib/site";

export function Nav({ onHero = false }: { onHero?: boolean }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const linkCls = (href: string) =>
    `border-b-2 pb-[3px] ${path === href ? "border-gold" : "border-transparent"}`;

  return (
    <header className={`relative ${onHero ? "text-cream" : "border-b border-line"}`}>
      <div className="px-page flex items-center justify-between gap-4 py-[22px]">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-serif text-[19px] font-semibold tracking-[.06em] sm:text-[22px]">PAPA&apos;S WOODSHOP</span>
          <span className={`mt-1.5 text-[10px] tracking-[.22em] ${onHero ? "text-gold" : "text-gold-muted"}`}>
            HANDCRAFTED FURNITURE
          </span>
        </Link>
        <nav className="hidden gap-[clamp(16px,3vw,36px)] text-[13px] font-medium uppercase tracking-[.1em] nav:flex">
          {navLinks.map(([href, label]) => (
            <Link key={href} href={href} className={linkCls(href)}>{label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          {onHero ? (
            <Link
              href="/contact"
              className="hidden border border-gold px-5 py-[11px] text-xs font-semibold uppercase tracking-[.12em] nav:inline-block"
            >
              Commission a table
            </Link>
          ) : (
            <a href={site.phoneHref} className="hidden text-[13px] font-semibold sm:block">{site.phoneDisplay}</a>
          )}
          <button
            type="button"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="flex h-11 w-11 items-center justify-center nav:hidden"
          >
            <span className="flex w-5 flex-col gap-[5px]">
              <span className="h-[1.5px] bg-current" />
              <span className="h-[1.5px] bg-current" />
              <span className="h-[1.5px] bg-current" />
            </span>
          </button>
        </div>
      </div>
      {open && (
        <nav
          className={`px-page absolute inset-x-0 top-full z-20 flex flex-col border-t border-line text-[13px] font-medium uppercase tracking-[.1em] shadow-xl nav:hidden ${
            onHero ? "bg-green-deep" : "bg-cream"
          }`}
        >
          {navLinks.map(([href, label]) => (
            <Link key={href} href={href} className={`border-b border-line/40 py-4 ${path === href ? "text-gold" : ""}`}>
              {label}
            </Link>
          ))}
          <Link href="/contact" className="border-b border-line/40 py-4">Commission a table</Link>
          <a href={site.phoneHref} className="py-4 text-gold">Call or text {site.phoneDisplay}</a>
        </nav>
      )}
    </header>
  );
}
