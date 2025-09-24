import Layout from "@/layout/Layout";
import { advisors } from "@/data/mock";
import { useMemo, useState } from "react";
import { AdvisorCard } from "@/components/advisors/AdvisorCard";
import { FilterBar } from "@/components/advisors/FilterBar";

export default function Advisors() {
  const [filtered, setFiltered] = useState(advisors);

  function apply(filters: any) {
    let out = advisors.slice();
    if (filters.q) {
      const q = filters.q.toLowerCase();
      out = out.filter((a) => a.name.toLowerCase().includes(q) || a.city.toLowerCase().includes(q) || a.bio.toLowerCase().includes(q));
    }
    if (filters.specialization) {
      out = out.filter((a) => a.expertise.includes(filters.specialization));
    }
    if (filters.maxFee) {
      out = out.filter((a) => a.sessionFee <= filters.maxFee);
    }
    if (filters.sort === "rating") out = out.sort((x, y) => y.rating - x.rating);
    if (filters.sort === "experience") out = out.sort((x, y) => y.experienceYears - x.experienceYears);
    setFiltered(out);
  }

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-2xl font-bold">Find Advisors</h1>
        <p className="text-muted-foreground mt-2">Filter by specialization, experience, fees and ratings.</p>
        <div className="mt-6 grid gap-6 md:grid-cols-4">
          <div className="md:col-span-1">
            <FilterBar onChange={apply} />
          </div>
          <div className="md:col-span-3 grid gap-4">
            {filtered.map((a) => (
              <AdvisorCard key={a.id} advisor={a} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
