import { useMemo, useState } from "react";
import { addDays, format, isSameDay } from "date-fns";
import { Button } from "@/components/ui/button";

interface Props {
  onSelect: (iso: string) => void;
}

const HOURS = [10, 11, 12, 14, 15, 16, 17];

export function BookingCalendar({ onSelect }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date>(addDays(new Date(), 1));
  const [selectedTime, setSelectedTime] = useState<number | null>(null);

  const days = useMemo(() => Array.from({ length: 14 }, (_, i) => addDays(new Date(), i + 1)), []);

  const confirm = () => {
    if (selectedTime == null) return;
    const dt = new Date(selectedDate);
    dt.setHours(selectedTime, 0, 0, 0);
    onSelect(dt.toISOString());
  };

  return (
    <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
      <div className="rounded-lg border p-4">
        <h4 className="mb-3 font-semibold">Select a date</h4>
        <div className="grid grid-cols-7 gap-2">
          {days.map((d) => {
            const active = isSameDay(d, selectedDate);
            return (
              <button
                key={d.toISOString()}
                onClick={() => setSelectedDate(d)}
                className={`rounded-md border p-2 text-center text-sm ${active ? "border-primary bg-primary/10" : "hover:bg-muted"}`}
              >
                <div className="font-medium">{format(d, "EEE")}</div>
                <div className="text-muted-foreground">{format(d, "d MMM")}</div>
              </button>
            );
          })}
        </div>
      </div>
      <div className="rounded-lg border p-4">
        <h4 className="mb-3 font-semibold">Time slots</h4>
        <div className="grid grid-cols-2 gap-2">
          {HOURS.map((h) => (
            <button
              key={h}
              onClick={() => setSelectedTime(h)}
              className={`rounded-md border px-3 py-2 text-sm ${selectedTime === h ? "border-primary bg-primary/10" : "hover:bg-muted"}`}
            >
              {h}:00
            </button>
          ))}
        </div>
        <Button className="mt-4 w-full" onClick={confirm} disabled={selectedTime == null}>
          Continue
        </Button>
      </div>
    </div>
  );
}
