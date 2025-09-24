import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

interface DataPoint {
  name: string;
  sessions: number;
  revenue: number;
}

const data: DataPoint[] = [
  { name: "Mon", sessions: 4, revenue: 1200 },
  { name: "Tue", sessions: 6, revenue: 1800 },
  { name: "Wed", sessions: 5, revenue: 1500 },
  { name: "Thu", sessions: 7, revenue: 2100 },
  { name: "Fri", sessions: 8, revenue: 2400 },
  { name: "Sat", sessions: 3, revenue: 900 },
  { name: "Sun", sessions: 2, revenue: 600 },
];

function formatCurrency(v: number) {
  return `₹${v.toLocaleString()}`;
}

export default function StatsChart() {
  const totalSessions = data.reduce((s, d) => s + d.sessions, 0);
  const totalRevenue = data.reduce((s, d) => s + d.revenue, 0);

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold">Weekly Activity</div>
          <div className="text-sm text-muted-foreground">Sessions & revenue over the past week</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Total sessions</div>
          <div className="font-bold">{totalSessions}</div>
          <div className="text-sm text-muted-foreground">Revenue</div>
          <div className="font-bold">{formatCurrency(totalRevenue)}</div>
        </div>
      </div>

      <div className="mt-4 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip formatter={(value: any, name: string) => (name === "revenue" ? formatCurrency(value) : value)} />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="sessions" stroke="#0ea5e9" dot={{ r: 3 }} name="Sessions" />
            <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#34d399" dot={false} name="Revenue" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
