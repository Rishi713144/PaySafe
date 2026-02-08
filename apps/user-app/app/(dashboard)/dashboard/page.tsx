"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AnalyticsDashboard from "../../../components/AnalyticsDashboard";
import {
  CheckCircle2,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

export default function PaymentDashboard() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.replace("/signin");
    }
  }, [session.status, router]);

  if (session.status === "unauthenticated") {
    return null;
  }

  const [isSyncing, setIsSyncing] = useState(true);

  useEffect(() => {
    async function syncDashboard() {
      try {
        await getLiveAccountData();
      } catch (err) {
        console.error("Dashboard Sync Failed", err);
      } finally {
        setIsSyncing(false);
      }
    }
    syncDashboard();
  }, []);

  if (isSyncing) return <SyncingState />;

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-sm text-slate-500">
              Overview of your payments & financial activity
            </p>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Account Status"
            value="Verified"
            icon={<CheckCircle2 className="text-emerald-600" />}
          />
          <StatCard
            title="Last Sync"
            value="Just now"
            icon={<ArrowUpRight className="text-blue-600" />}
          />
          <StatCard
            title="Currency"
            value="INR (₹)"
            icon={<TrendingUp className="text-indigo-600" />}
          />
        </div>

        {/* Analytics Section */}
        <section className="bg-slate-100/50 rounded-3xl p-8 border border-slate-200/60 shadow-inner">
          <AnalyticsDashboard />
        </section>
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-slate-400">
          {title}
        </p>
        <p className="font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
}

function SyncingState() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="w-8 h-8 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4" />
      <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">
        Syncing dashboard...
      </p>
    </div>
  );
}

/* ---------- Mock APIs ---------- */

async function getLiveAccountData() {
  return new Promise<{ currentBalance: number }>((resolve) => {
    setTimeout(() => {
      resolve({ currentBalance: 428500.42 });
    }, 800);
  });
}
