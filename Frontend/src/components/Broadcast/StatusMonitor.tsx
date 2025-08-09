// =============================================
// /components/Broadcast/StatusMonitor.tsx
// =============================================
"use client";
import React, { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { useInterval } from "@/hooks/useInterval";

type Job = {
  id: number;
  status: "scheduled"|"running"|"paused"|"completed"|"canceled"|"errored";
  total_count: number; sent_count: number; failed_count: number;
  created_at?: string; started_at?: string; ended_at?: string;
};

export default function StatusMonitor() {
  const { api } = useApi();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const data = await api<Job[]>("/api/broadcast/jobs?mine=true");
    setJobs(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);
  useInterval(load, 2000);

  const act = async (id: number, op: "pause"|"resume"|"cancel") => {
    await api(`/api/broadcast/jobs/${id}/${op}`, { method: "PATCH" });
    await load();
  };

  return (
    <div className="rounded-2xl p-4 md:p-6 bg-zinc-900/60 border border-zinc-800">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">My Jobs</h3>
        <button onClick={load} className="px-3 py-2 rounded-xl border border-zinc-700 hover:bg-zinc-800 text-sm">Refresh</button>
      </div>
      {loading ? <p className="text-sm text-zinc-400">Loading…</p> : (
        <div className="space-y-3">
          {jobs.map(j => (
            <div key={j.id} className="border border-zinc-800 rounded-xl p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Job #{j.id}</div>
                  <div className="text-xs text-zinc-400">{j.status.toUpperCase()}</div>
                </div>
                <div className="text-sm">
                  <span className="mr-3">{j.sent_count}/{j.total_count}</span>
                  <span className="text-red-300">Failed: {j.failed_count}</span>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button onClick={()=>act(j.id,"pause")} disabled={j.status!=="running"}
                        className="px-3 py-1 rounded-lg border border-zinc-700 hover:bg-zinc-800 text-sm disabled:opacity-40">Pause</button>
                <button onClick={()=>act(j.id,"resume")} disabled={j.status!=="paused" && j.status!=="scheduled"}
                        className="px-3 py-1 rounded-lg border border-zinc-700 hover:bg-zinc-800 text-sm disabled:opacity-40">Resume</button>
                <button onClick={()=>act(j.id,"cancel")} disabled={j.status==="completed"||j.status==="canceled"}
                        className="px-3 py-1 rounded-lg border border-red-700 text-red-200 hover:bg-red-900/20 text-sm disabled:opacity-40">Cancel</button>
              </div>
            </div>
          ))}
          {!jobs.length && <p className="text-sm text-zinc-400">No jobs yet.</p>}
        </div>
      )}
    </div>
  );
}