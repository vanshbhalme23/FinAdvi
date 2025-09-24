import React, { useEffect, useState } from "react";
import { advisors } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function LiveStatus() {
  const [onlineMap, setOnlineMap] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    advisors.forEach((a) => (map[a.id] = Math.random() < 0.5));
    return map;
  });
  const navigate = useNavigate();

  useEffect(() => {
    const t = setInterval(() => {
      setOnlineMap((prev) => {
        const next = { ...prev };
        // flip a random advisor's online status to simulate live updates
        const idx = Math.floor(Math.random() * advisors.length);
        const id = advisors[idx].id;
        next[id] = !next[id];
        return next;
      });
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="rounded-lg border p-4">
      <div className="font-semibold">Live Advisors</div>
      <div className="text-sm text-muted-foreground mt-1">Advisors currently available for calls</div>
      <div className="mt-3 grid gap-2">
        {advisors.map((a) => (
          <div key={a.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`h-3 w-3 rounded-full ${onlineMap[a.id] ? 'bg-green-500' : 'bg-gray-300'}`} aria-hidden />
              <div>
                <div className="font-medium">{a.name}</div>
                <div className="text-xs text-muted-foreground">{a.expertise.join(', ')}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => navigate(`/advisors/${a.id}`)}>View</Button>
              <Button onClick={() => navigate(`/video-call/${a.id}`)} disabled={!onlineMap[a.id]}>Call</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
