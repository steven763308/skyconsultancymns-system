// =============================================
// /pages/crm/marketing.tsx
// =============================================
"use client";
import React from "react";
import UploadClientCsv from "@/components/Broadcast/UploadClient";
import TemplateManager from "@/components/Broadcast/TemplateManager";
import MediaUploader from "@/components/Broadcast/MediaUploader";
import BroadcastController from "@/components/Broadcast/BroadcastController";
import StatusMonitor from "@/components/Broadcast/StatusMonitor";
import { AuthProvider, useAuth } from "@/context/AuthProvider";

function Guard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Please log in</h1>
          <p className="text-zinc-400">This page shows only <b>your</b> data (per-user isolation).</p>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}

export default function MarketingPage() {
  return (
    <AuthProvider>
      <Guard>
        <main className="min-h-screen bg-[#0f0f0f] text-white">
          <section className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
            <h1 className="text-3xl font-bold">WhatsApp Broadcast (My Workspace)</h1>
            <p className="text-sm text-zinc-400">Everything you see here belongs to your account only.</p>
            <div className="grid md:grid-cols-2 gap-6">
              <UploadClientCsv />
              <TemplateManager />
              <MediaUploader />
              <BroadcastController />
            </div>
            <StatusMonitor />
          </section>
        </main>
      </Guard>
    </AuthProvider>
  );
}