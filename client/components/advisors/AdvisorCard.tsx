import { Advisor } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Star, Video } from "lucide-react";

export function AdvisorCard({ advisor }: { advisor: Advisor }) {
  return (
    <div className="rounded-lg border bg-card p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="size-14 shrink-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{advisor.name}</h3>
              <p className="text-sm text-muted-foreground">{advisor.city} • {advisor.experienceYears} yrs experience</p>
            </div>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="fill-current" />
              <span className="font-semibold">{advisor.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">({advisor.reviews})</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{advisor.bio}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {advisor.expertise.map((s) => (
              <Badge key={s} variant="secondary" className="capitalize">{s}</Badge>
            ))}
            {/* Video call availability badge */}
            <Badge variant="outline" className="ml-1 flex items-center gap-1">
              <Video className="h-4 w-4" />
              Video
            </Badge>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">₹{advisor.sessionFee}</span> / session • <span className="font-semibold text-foreground">₹{advisor.hourlyFee}</span> / hr
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link to={`/advisors/${advisor.id}`}>View Profile</Link>
              </Button>
              <Button asChild>
                <Link to={`/booking/${advisor.id}`}>Book</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to={`/video-call/${advisor.id}`}>Video Call</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
