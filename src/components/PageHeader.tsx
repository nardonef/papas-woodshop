export function PageHeader({ kicker, title, children }: { kicker: string; title: string; children: React.ReactNode }) {
  return (
    <div className="px-page mx-auto max-w-[1200px] pt-[clamp(48px,7vw,88px)] pb-10">
      <div className="kicker">{kicker}</div>
      <h1 className="h1-sub mt-1.5 mb-5">{title}</h1>
      <p className="lead max-w-[640px]">{children}</p>
    </div>
  );
}
