import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { PageHeader } from "@/components/PageHeader";
import { TableBuilder } from "@/components/TableBuilder";

export const metadata: Metadata = { title: "Table builder" };

export default function BuildPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHeader kicker="Table builder" title="Plan the table that fits your room">
          Pick a base, set the size, and watch the seat count and rough price update. Send the plan to Papa when it looks
          right; he&apos;ll firm everything up with you.
        </PageHeader>
        <TableBuilder />
      </main>
      <Footer tagline />
    </>
  );
}
