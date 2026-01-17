"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Download,
  CheckCircle2,
  ExternalLink,
  Newspaper,
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

  const [accountBalance, setAccountBalance] = useState(0);
  const [news, setNews] = useState<any[]>([]);
  const [isSyncing, setIsSyncing] = useState(true);

  useEffect(() => {
    async function syncDashboard() {
      try {
        const [accountData, newsData] = await Promise.all([
          getLiveAccountData(),
          getRealtimeFinancialNews(),
        ]);

        setAccountBalance(accountData.currentBalance);
        setNews(newsData);
      } catch (err) {
        console.error("Dashboard Sync Failed", err);
      } finally {
        setIsSyncing(false);
      }
    }
    syncDashboard();
  }, []);

  const formatINR = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

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

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
              <Plus size={16} /> Add Money
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-100 transition">
              <Download size={16} /> Download Report
            </button>
          </div>
        </header>

        {/* Balance Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg">
          <p className="text-xs uppercase tracking-widest text-blue-100">
            Total Balance
          </p>
          <h2 className="text-4xl font-bold mt-2">
            {formatINR(accountBalance)}
          </h2>
          <div className="mt-4 flex items-center gap-2 text-sm text-blue-100">
            <TrendingUp size={16} />
            <span>+4.2% from last month</span>
          </div>
        </div>

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

        {/* News */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-800">
              Market & Policy Updates
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {news.map((item, idx) => (
              <NewsCard key={idx} item={item} />
            ))}
          </div>
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

function NewsCard({ item }: { item: any }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition cursor-pointer">
      <div className="flex justify-between mb-3">
        <span className="text-[10px] font-bold px-2 py-1 rounded bg-blue-50 text-blue-600 uppercase">
          {item.category}
        </span>
        <ExternalLink size={14} className="text-slate-300" />
      </div>

      <h3 className="font-semibold text-slate-800 leading-snug">
        {item.headline}
      </h3>
      <p className="text-xs text-slate-500 mt-2 line-clamp-2">
        {item.summary}
      </p>

      <div className="mt-4 flex justify-between text-[10px] font-semibold text-slate-400 uppercase">
        <span>{item.source}</span>
        <span>{item.time}</span>
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

async function getRealtimeFinancialNews() {
  return new Promise<any[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          headline:
            "RBI Maintains Repo Rate at 6.5%, Focuses on Inflation Control",
          summary:
            "The MPC continues its cautious stance amid global uncertainties.",
          category: "Policy",
          source: "Financial Times",
          time: "12m ago",
        },
        {
          headline:
            "Tech Stocks Rally as AI Spending Accelerates Globally",
          summary:
            "Major semiconductor firms gain momentum on cloud demand.",
          category: "Markets",
          source: "Bloomberg",
          time: "45m ago",
        },
        {
          headline:
            "Rupee Strengthens Against Dollar on Capital Inflows",
          summary:
            "Domestic equities and FII inflows support INR.",
          category: "Forex",
          source: "Reuters",
          time: "1h ago",
        },
      ]);
    }, 1000);
  });
}

async function getLiveAccountData() {
  return new Promise<{ currentBalance: number }>((resolve) => {
    setTimeout(() => {
      resolve({ currentBalance: 428500.42 });
    }, 800);
  });
}
