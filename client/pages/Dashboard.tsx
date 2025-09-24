import Layout from "@/layout/Layout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { appointments, advisors, resources } from "@/data/mock";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import LiveStatus from "@/components/dashboard/LiveStatus";
import { useState, Suspense, lazy } from "react";
const StatsChart = lazy(() => import("@/components/dashboard/StatsChart"));

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const myAppointments = appointments.filter((a) => a.clientId === user?.id);

  const firstAdvisor = advisors[0];
  const { getFreeCallState } = useAuth();
  const freeState = getFreeCallState();
  const freeCallsRemaining = freeState ? freeState.remaining : 0;

  return (
    <ProtectedRoute requiredRole={"client"}>
      <Layout>
        <div className="container py-12 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <h1 className="text-2xl font-bold">Welcome back, {user?.name}</h1>
            <p className="text-muted-foreground mt-2">Your upcoming appointments and messages.</p>

            <div className="mt-6 grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-lg border p-4">
                  <div className="font-semibold">Status</div>
                  <div className="mt-3 grid grid-cols-3 gap-3">
                    <div className="rounded-md bg-muted p-3 text-center">
                      <div className="font-bold text-xl">{myAppointments.length}</div>
                      <div className="text-xs text-muted-foreground">Upcoming</div>
                    </div>
                    <div className="rounded-md bg-muted p-3 text-center">
                      <div className="font-bold text-xl">{0}</div>
                      <div className="text-xs text-muted-foreground">Unread Msgs</div>
                    </div>
                    <div className="rounded-md bg-muted p-3 text-center">
                      <div className="font-bold text-xl">{freeCallsRemaining}</div>
                      <div className="text-xs text-muted-foreground">Free Calls</div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Button asChild>
                      <Link to="/advisors">Find Advisor</Link>
                    </Button>
                    <Button variant="secondary" onClick={() => navigate(firstAdvisor ? `/video-call/${firstAdvisor.id}` : "/video-call")}>Start Call</Button>
                  </div>
                </div>

                <Suspense fallback={<div className="rounded-lg border p-4"><div className="font-semibold">Weekly Activity</div><div className="mt-4">Loading chart…</div></div>}>
                  <StatsChart />
                </Suspense>

                <LiveStatus />
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Upcoming Appointments</div>
                    <div className="text-sm text-muted-foreground">Next meetings with your advisors</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button asChild>
                      <Link to="/booking">Book</Link>
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/advisor')}>Manage</Button>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {myAppointments.length === 0 ? (
                    <div className="rounded-md bg-muted p-4">No upcoming appointments</div>
                  ) : (
                    myAppointments.map((ap) => {
                      const adv = advisors.find((x) => x.id === ap.advisorId);
                      return (
                        <div key={ap.id} className="rounded-lg border p-3 flex items-center justify-between">
                          <div>
                            <div className="font-semibold">{adv?.name}</div>
                            <div className="text-sm text-muted-foreground">{new Date(ap.datetime).toLocaleString()}</div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" onClick={() => navigate(`/advisors/${adv?.id}`)}>View</Button>
                            <Button onClick={() => navigate(`/booking/${adv?.id}`)}>Reschedule</Button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-semibold">Messages</h3>
                <div className="mt-3">
                  <ChatPanel role="client" initial={[]} />
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-semibold">Recommended Resources</h3>
                <div className="mt-3 grid gap-2">
                  {resources.slice(0, 3).map((r) => (
                    <div key={r.id} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{r.title}</div>
                        <div className="text-sm text-muted-foreground">{r.summary}</div>
                      </div>
                      <Button variant="ghost" asChild>
                        <Link to="/resources">Read</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="md:col-span-1 space-y-4">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold">Documents</h4>
              <p className="mt-2 text-sm text-muted-foreground">Upload financial statements to share with your advisor.</p>
              <div className="mt-3">
                <input ref={fileRef} type="file" />
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <Button>View All Documents</Button>
                <Button variant="outline" onClick={() => navigate('/dashboard')}>Manage Documents</Button>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h4 className="font-semibold">Recommended Advisors</h4>
              <div className="mt-3 grid gap-2">
                {advisors.slice(0, 3).map((a) => (
                  <div key={a.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{a.name}</div>
                      <div className="text-sm text-muted-foreground">{a.expertise.join(', ')}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" onClick={() => navigate(`/advisors/${a.id}`)}>View</Button>
                      <Button onClick={() => navigate(`/video-call/${a.id}`)}>Call</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border p-4 text-sm text-muted-foreground">
              <div className="font-semibold">Need help?</div>
              <div className="mt-2">Visit our Help Center or contact support for assistance.</div>
            </div>
          </aside>
        </div>
      </Layout>
      
    </ProtectedRoute>
  );
}
