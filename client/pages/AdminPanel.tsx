import Layout from "@/layout/Layout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { advisors } from "@/data/mock";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AdminPanel() {
  const [list, setList] = useState(advisors.map((a) => ({ ...a, verified: false })));

  function verify(id: string) {
    setList((s) => s.map((it) => (it.id === id ? { ...it, verified: true } : it)));
  }

  return (
    <ProtectedRoute requiredRole={"admin"}>
      <Layout>
        <div className="container py-12">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-muted-foreground mt-2">Verify advisors and monitor platform activity.</p>

          <div className="mt-6 grid gap-4">
            {list.map((a) => (
              <div key={a.id} className="rounded-lg border p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold">{a.name}</div>
                  <div className="text-sm text-muted-foreground">{a.experienceYears} years • {a.city}</div>
                </div>
                <div className="flex gap-2">
                  {!a.verified ? (
                    <Button onClick={() => verify(a.id)}>Verify</Button>
                  ) : (
                    <div className="text-sm text-muted-foreground">Verified</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
