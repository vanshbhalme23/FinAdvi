import { Specialization } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface Props {
  onChange: (filters: { q: string; specialization?: Specialization; maxFee?: number; sort?: "rating" | "experience" }) => void;
}

export function FilterBar({ onChange }: Props) {
  const [q, setQ] = useState("");
  const [spec, setSpec] = useState<Specialization | undefined>();
  const [fee, setFee] = useState<number | undefined>(80);
  const [sort, setSort] = useState<"rating" | "experience" | undefined>("rating");

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="grid gap-3 md:grid-cols-4">
        <Input placeholder="Search by name, city, keyword..." value={q} onChange={(e) => setQ(e.target.value)} />
        <Select onValueChange={(v) => setSpec(v as Specialization)} value={spec}>
          <SelectTrigger>
            <SelectValue placeholder="Specialization" />
          </SelectTrigger>
          <SelectContent>
            {(["investments","tax","retirement","savings","insurance","estate"] as Specialization[]).map((s) => (
              <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div>
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>Max session fee</span>
            <span className="text-foreground font-medium">₹{fee}</span>
          </div>
          <Slider value={[fee ?? 80]} min={20} max={200} step={5} onValueChange={(v) => setFee(v[0])} />
        </div>
        <Select onValueChange={(v) => setSort(v as any)} value={sort}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Top rated</SelectItem>
            <SelectItem value="experience">Experience</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-3 flex justify-end">
        <Button onClick={() => onChange({ q, specialization: spec, maxFee: fee, sort })}>Apply Filters</Button>
      </div>
    </div>
  );
}
