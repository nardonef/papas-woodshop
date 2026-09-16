import Link from "next/link";

const variants = {
  gold: "bg-gold text-ink px-[26px] py-[15px]",
  green: "bg-green text-cream px-[26px] py-[15px]",
  outline: "border border-ink text-ink px-[26px] py-[14px]",
  outlineLight: "border border-cream/60 text-cream px-[26px] py-[15px]",
  outlineGold: "border border-gold text-cream px-6 py-[13px] text-xs tracking-[.12em]",
  text: "border-b border-ink pb-1",
} as const;

type Props = {
  href: string;
  variant?: keyof typeof variants;
  className?: string;
  children: React.ReactNode;
};

export function Button({ href, variant = "gold", className = "", children }: Props) {
  const cls = `inline-block text-[13px] font-semibold uppercase tracking-[.1em] ${variants[variant]} ${className}`;
  return href.startsWith("/") ? (
    <Link href={href} className={cls}>{children}</Link>
  ) : (
    <a href={href} className={cls}>{children}</a>
  );
}
