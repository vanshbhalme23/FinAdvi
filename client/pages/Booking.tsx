import Layout from "@/layout/Layout";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { PaymentWidget } from "@/components/payments/PaymentWidget";
import { useParams } from "react-router-dom";
import { advisors } from "@/data/mock";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function BookingPage() {
  const { advisorId } = useParams();
  const advisor = advisors.find((a) => a.id === advisorId);
  const [selected, setSelected] = useState<string | null>(null);
  const [paid, setPaid] = useState(false);

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
          <h1 className="text-2xl font-bold">Book with {advisor.name}</h1>
          <p className="text-muted-foreground">{advisor.qualifications.join(", ")}</p>

          <div className="mt-6">
            <BookingCalendar onSelect={(iso) => setSelected(iso)} />
          </div>
        </div>
        <aside className="md:col-span-1">
          <div className="rounded-lg border p-4">
            <h4 className="font-semibold">Summary</h4>
            <div className="mt-3 text-sm text-muted-foreground">
              <div>Advisor: {advisor.name}</div>
              <div>Fee: ₹{advisor.sessionFee}</div>
              <div>Selected: {selected ? new Date(selected).toLocaleString() : "—"}</div>
            </div>
            {!paid ? (
              <div className="mt-4">
                <PaymentWidget amount={advisor.sessionFee} onPay={(m) => { setPaid(true); alert(`Mock pay with ${m}`); }} />
              </div>
            ) : (
              <div className="mt-4">
                <div className="rounded-md bg-primary/10 p-3">Payment confirmed — booking requested</div>
                <Button className="mt-3">Go to Dashboard</Button>
              </div>
            )}
          </div>
        </aside>
      </div>
    </Layout>
  );
}
