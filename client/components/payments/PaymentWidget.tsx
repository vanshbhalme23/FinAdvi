import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Props {
  amount: number;
  onPay: (method: "stripe" | "razorpay" | "paypal") => void;
}

export function PaymentWidget({ amount, onPay }: Props) {
  const [method, setMethod] = useState<"stripe" | "razorpay" | "paypal">("stripe");
  return (
    <div className="rounded-lg border p-4">
      <h4 className="mb-3 font-semibold">Payment</h4>
      <p className="text-sm text-muted-foreground">Amount due</p>
      <div className="mb-4 text-2xl font-bold">₹{amount}</div>
      <RadioGroup value={method} onValueChange={(v) => setMethod(v as any)}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="stripe" id="pm-stripe" />
          <Label htmlFor="pm-stripe">Stripe</Label>
        </div>
        <div className="mt-2 flex items-center space-x-2">
          <RadioGroupItem value="razorpay" id="pm-razorpay" />
          <Label htmlFor="pm-razorpay">Razorpay</Label>
        </div>
        <div className="mt-2 flex items-center space-x-2">
          <RadioGroupItem value="paypal" id="pm-paypal" />
          <Label htmlFor="pm-paypal">PayPal</Label>
        </div>
      </RadioGroup>
      <Button className="mt-4 w-full" onClick={() => onPay(method)}>Pay Now</Button>
    </div>
  );
}
