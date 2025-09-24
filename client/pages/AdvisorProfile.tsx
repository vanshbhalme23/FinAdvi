import Layout from "@/layout/Layout";
import { useParams, Link } from "react-router-dom";
import { advisors } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdvisorProfile() {
  const { id } = useParams();
  const advisor = advisors.find((a) => a.id === id);

  if (!advisor) {
    return (
      <Layout>
        <div className="container py-20">Advisor not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-12 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="rounded-lg border p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">{advisor.name}</h1>
                <p className="text-muted-foreground">{advisor.qualifications.join(", ")} • {advisor.city}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold">₹{advisor.sessionFee}</div>
                <div className="text-sm text-muted-foreground">per session</div>
              </div>
            </div>

            <p className="mt-4 text-muted-foreground">{advisor.bio}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {advisor.expertise.map((e) => (
                <Badge key={e} variant="secondary" className="capitalize">{e}</Badge>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <Button asChild>
                <Link to={`/booking/${advisor.id}`}>Book a session</Link>
              </Button>
              <Button variant="ghost">Message</Button>
            </div>
          </div>

          <div className="mt-6 rounded-lg border p-6">
            <h3 className="font-semibold">About & Credentials</h3>
            <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground">
              {advisor.qualifications.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
            <div className="mt-3 text-sm text-muted-foreground">
              Certifications: {advisor.certifications.join(", ")}
            </div>
          </div>
        </div>

        <aside className="md:col-span-1">
          <div className="rounded-lg border p-4">
            <h4 className="font-semibold">Availability</h4>
            <p className="mt-2 text-sm text-muted-foreground">Weekdays 10:00 - 18:00</p>
            <div className="mt-4">
              <Button asChild>
                <Link to="/auth">Contact</Link>
              </Button>
            </div>
          </div>

          <div className="mt-4 rounded-lg border p-4">
            <h4 className="font-semibold">Reviews</h4>
            <p className="mt-2 text-sm text-muted-foreground">{advisor.rating} stars • {advisor.reviews} reviews</p>
          </div>
        </aside>
      </div>
    </Layout>
  );
}
