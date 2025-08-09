// =============================================
// /components/Broadcast/BroadcastController.tsx
// =============================================
"use client";
import React, { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";

export default function BroadcastController() {
  const { api } = useApi();
  const [rate, setRate] = useState(20);
  const [maxRetries, setMaxRetries] = useState(2);
  const [scheduleAt, setScheduleAt] = useState<string>("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const d = new Date(); d.setMinutes(d.getMinutes()+2); // default +2 min
    setScheduleAt(d.toISOString().slice(0,16));
  }, []);

  const start = async () => {
    setCreating(true);
    try {
      const body = { rate_limit_per_min: rate, max_retries: maxRetries, schedule_at: scheduleAt ? new Date(scheduleAt).toISOString() : null };
      const job = await api("/api/broadcast/jobs", { method: "POST", body: JSON.stringify(body) });
      alert(`Job created #${job.id}`);
    } catch (e: any) { alert(e.message || "Create job failed"); }
    finally { setCreating(false); }
  };

  return (
    <div className="rounded-2xl p-4 md:p-6 bg-zinc-900/60 border border-zinc-800">
      <h3 className="text-lg font-semibold mb-4">Broadcast Control (Mine)</h3>
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm mb-1">Rate limit (per minute)</label>
          <input type="number" value={rate} onChange={(e)=>setRate(parseInt(e.target.value||"0"))}
                 className="w-full rounded-xl bg-transparent border border-zinc-700 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm mb-1">Max retries</label>
          <input type="number" value={maxRetries} onChange={(e)=>setMaxRetries(parseInt(e.target.value||"0"))}
                 className="w-full rounded-xl bg-transparent border border-zinc-700 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm mb-1">Schedule at</label>
          <input type="datetime-local" value={scheduleAt} onChange={(e)=>setScheduleAt(e.target.value)}
                 className="w-full rounded-xl bg-transparent border border-zinc-700 px-3 py-2" />
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <button onClick={start} disabled={creating}
                className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 hover:bg-emerald-500/30">
          {creating ? "Creating…" : "Create & Start"}
        </button>
      </div>
    </div>
  );
}