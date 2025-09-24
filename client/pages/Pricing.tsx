import React from "react";
import Layout from "@/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const tiers = [
  {
    id: "basic",
    name: "Basic",
    price: "Free",
    desc: "Access to articles and directory, 2 free 10-minute calls for new clients.",
    features: ["Advisor directory", "Limited resources", "2 free calls (first-time)"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹499/mo",
    desc: "Priority booking, extended call durations, premium content.",
    features: ["Priority booking", "60-minute calls", "Premium resources"],
  },
  {
    id: "team",
    name: "Team",
    price: "Contact",
    desc: "Custom plans for advisory teams and businesses.",
    features: ["Multi-user", "Billing & invoicing", "Dedicated support"],
  },
];

export default function Pricing() {
  return (
    <Layout>
      <div className="container py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold">Pricing</h1>
          <p className="mt-3 text-muted-foreground">Choose a plan that fits your needs — from browsing advisors to premium support.</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <div key={t.id} className="rounded-lg border p-6 flex flex-col">
              <div className="flex-1">
                <div className="text-lg font-semibold">{t.name}</div>
                <div className="mt-2 text-muted-foreground">{t.desc}</div>
                <div className="mt-4">
                  <div className="text-2xl font-bold">{t.price}</div>
                </div>
                <ul className="mt-4 list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {t.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                {t.id === "basic" ? (
                  <Button asChild>
                    <Link to="/auth">Get Started</Link>
                  </Button>
                ) : t.id === "pro" ? (
                  <Button asChild>
                    <Link to="/auth?mode=signup">Upgrade</Link>
                  </Button>
                ) : (
                  <Button asChild>
                    <Link to="/contact">Contact Sales</Link>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
