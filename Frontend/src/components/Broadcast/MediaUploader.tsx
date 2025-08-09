// =============================================
// /components/Broadcast/MediaUploader.tsx
// =============================================
"use client";
import React, { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";

type MediaItem = { id: string; name: string; url: string; type: "image"|"pdf" };

export default function MediaUploader() {
  const { api } = useApi();
  const [items, setItems] = useState<MediaItem[]>([]);
  const [busy, setBusy] = useState(false);

  const refresh = async () => {
    const data = await api<MediaItem[]>("/api/media");
    setItems(data);
  };

  useEffect(() => { refresh(); }, []);

  const onUpload = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    setBusy(true);
    try {
      await api("/api/media", { method: "POST", body: fd });
      await refresh();
    } catch (e: any) { alert(e.message || "Upload failed"); }
    finally { setBusy(false); }
  };

  return (
    <div className="rounded-2xl p-4 md:p-6 bg-zinc-900/60 border border-zinc-800">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">My Media</h3>
        <label className="cursor-pointer text-sm px-3 py-2 rounded-xl border border-zinc-700 hover:bg-zinc-800">
          Upload Image/PDF
          <input type="file" accept="image/*,application/pdf" className="hidden"
                 onChange={(e) => e.target.files && onUpload(e.target.files[0])} />
        </label>
      </div>
      {busy && <p className="text-sm text-zinc-400">Uploading…</p>}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {items.map(m => (
          <div key={m.id} className="border border-zinc-800 rounded-xl p-3">
            <div className="text-sm font-medium truncate" title={m.name}>{m.name}</div>
            <div className="text-xs text-zinc-500">{m.type.toUpperCase()}</div>
            <a className="text-xs underline" href={m.url} target="_blank">Preview</a>
          </div>
        ))}
      </div>
      {!items.length && <p className="text-sm text-zinc-400">No media yet.</p>}
    </div>
  );
}