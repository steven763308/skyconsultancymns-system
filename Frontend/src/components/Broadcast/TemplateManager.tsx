// =============================================
// /components/Broadcast/TemplateManager.tsx
// =============================================
"use client";
import React, { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";

type Tpl = { id?: number; template_text: string; };

export default function TemplateManager() {
  const { api } = useApi();
  const [tpls, setTpls] = useState<Tpl[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { (async () => {
    try { const data = await api<Tpl[]>("/api/templates"); setTpls(data); }
    finally { setLoading(false); }
  })(); }, []);

  const add = () => {
    if (tpls.length >= 5) return alert("Max 5 templates per user");
    setTpls([...tpls, { template_text: "Hi {company}, we help with CIDB…" }]);
  };

  const save = async () => {
    try {
      await api("/api/templates", { method: "POST", body: JSON.stringify({ templates: tpls }) });
      alert("Saved ✅");
    } catch (e: any) { alert(e.message || "Save failed"); }
  };

  return (
    <div className="rounded-2xl p-4 md:p-6 bg-zinc-900/60 border border-zinc-800">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">My Message Templates</h3>
        <button onClick={add} className="px-3 py-2 rounded-xl border border-zinc-700 hover:bg-zinc-800">+ Add</button>
      </div>
      {loading ? <p className="text-sm text-zinc-400">Loading…</p> : (
        <div className="space-y-3">
          {tpls.map((t, i) => (
            <div key={i} className="rounded-xl border border-zinc-800 p-3">
              <div className="text-xs text-zinc-400 mb-1">Template #{i+1} — placeholders: {"{company}"}, {"{gred}"}, {"{expiry}"}</div>
              <textarea
                value={t.template_text}
                onChange={(e) => setTpls(prev => prev.map((x, idx) => idx===i? {...x, template_text: e.target.value} : x))}
                rows={3}
                className="w-full bg-transparent outline-none text-sm"
                placeholder="Hi {company}, we can help with CIDB registration…"
              />
              <div className="text-right">
                <button onClick={() => setTpls(prev => prev.filter((_, idx) => idx!==i))}
                        className="text-xs text-red-300/80 hover:text-red-200">Delete</button>
              </div>
            </div>
          ))}
          {!tpls.length && <p className="text-sm text-zinc-400">No templates yet. Add one above.</p>}
        </div>
      )}
      <div className="mt-4">
        <button onClick={save} className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20">Save Templates</button>
      </div>
    </div>
  );
}