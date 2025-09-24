import Layout from "@/layout/Layout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { appointments, advisors } from "@/data/mock";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AdvisorDashboard() {
  const { user } = useAuth();
  const myAppointments = appointments.filter((a) => a.advisorId === user?.id || true);
  const [list, setList] = useState(myAppointments);

  function accept(id: string) {
    setList((s) => s.map((it) => (it.id === id ? { ...it, status: "confirmed" } : it)));
  }
  function reject(id: string) {
    setList((s) => s.map((it) => (it.id === id ? { ...it, status: "rejected" } : it)));
  }

  return (
    <ProtectedRoute requiredRole={"advisor"}>
      <Layout>
        <div className="container py-12">
          <h1 className="text-2xl font-bold">Advisor Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage bookings, chat with clients and upload documents.</p>

          <div className="mt-6 grid gap-4">
            {list.map((ap) => {
              const clientName = ap.clientId;
              return (
                <div key={ap.id} className="rounded-lg border p-4 flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Booking with {clientName}</div>
                    <div className="text-sm text-muted-foreground">{new Date(ap.datetime).toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Status: {ap.status}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" onClick={() => accept(ap.id)}>Accept</Button>
                    <Button variant="destructive" onClick={() => reject(ap.id)}>Reject</Button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-lg border p-4">
            <h3 className="font-semibold">Documents</h3>
            <div className="mt-3">
              <input type="file" />
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
