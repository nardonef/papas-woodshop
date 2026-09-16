"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const labelCls = "flex flex-col gap-1.5 text-xs font-semibold tracking-[.1em] uppercase text-muted";
const row = "grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5";

type Status = "idle" | "sending" | "sent" | "error";

export function InquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [firstName, setFirstName] = useState("");
  const [invalid, setInvalid] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const contact = String(data.get("contact") ?? "").trim();
    if (!name || !contact) {
      setInvalid("Name and a phone number or email are required.");
      return;
    }
    setInvalid(null);
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Commission inquiry from ${name}`,
          from_name: "Papa's Woodshop website",
          ...Object.fromEntries(data),
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message ?? res.statusText);
      setFirstName(name.split(" ")[0]);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col gap-4 py-5 text-center">
        <div className="font-script text-[40px] text-gold">Thank you, {firstName}.</div>
        <div className="font-serif text-[26px] leading-[1.3]">Papa has your note and will be in touch within a day or two.</div>
        <p className="text-[15px] leading-[1.6] text-muted">
          In the meantime, <Link href="/tables" className="border-b border-ink text-ink">look through the tables</Link> or text a photo
          of your room to {site.phoneDisplay}.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-2 text-[13px] font-semibold tracking-[.1em] uppercase text-green">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-[18px]">
      <div className="mb-1 font-serif text-[26px]">Commission inquiry</div>
      <div className={row}>
        <label className={labelCls}>Name<input name="name" required placeholder="Your name" /></label>
        <label className={labelCls}>Phone or email<input name="contact" required placeholder="Best way to reach you" /></label>
      </div>
      <div className={row}>
        <label className={labelCls}>
          Table style
          <select name="style">
            <option>Not sure yet</option>
            <option>Round pedestal</option>
            <option>X-trestle farm table</option>
            <option>Farmhouse, painted base</option>
            <option>The in-stock 60&quot; round</option>
          </select>
        </label>
        <label className={labelCls}>Seats (everyday / holiday)<input name="seats" placeholder="e.g. 6 / 10" /></label>
      </div>
      <div className={row}>
        <label className={labelCls}>Room or table size<input name="size" placeholder="e.g. 12 × 14 ft room, or 7 ft table" /></label>
        <label className={labelCls}>
          When do you need it?
          <select name="timing">
            <option>No rush</option>
            <option>Within 3 months</option>
            <option>Before the holidays</option>
            <option>Specific date (say below)</option>
          </select>
        </label>
      </div>
      <label className={labelCls}>
        Anything else
        <textarea name="notes" rows={4} placeholder="Chairs you're matching, finish preferences, delivery town, questions" />
      </label>
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} aria-hidden="true" />
      {invalid && <div className="text-[13px] text-[#8a3b2e]">{invalid}</div>}
      {status === "error" && (
        <div className="text-[13px] text-[#8a3b2e]">
          Something went wrong sending this. Call or text {site.phoneDisplay}, or email{" "}
          <a href={site.emailHref} className="border-b border-current">{site.email}</a>.
        </div>
      )}
      <div className="mt-1.5 flex flex-wrap items-center justify-between gap-4">
        <span className="text-[13px] text-muted">Photos of your space help. Text them to {site.phoneDisplay}.</span>
        {ACCESS_KEY ? (
          <button type="submit" disabled={status === "sending"} className="bg-green px-7 py-[15px] text-[13px] font-semibold tracking-[.1em] uppercase text-cream disabled:opacity-60">
            {status === "sending" ? "Sending…" : "Send to Papa"}
          </button>
        ) : (
          <span className="text-[13px] text-muted">
            The form isn&apos;t connected yet. <a href={site.smsHref} className="border-b border-ink text-ink">Text Papa</a> instead.
          </span>
        )}
      </div>
    </form>
  );
}
