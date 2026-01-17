"use client";
import React, { useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [session.status, router]);

  if (session.status === "authenticated") {
    return null;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2 animate-pulse"></span>
            Now supporting multi-currency wallets
          </div>
          
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl mb-6">
            Secure payments for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              the modern economy.
            </span>
          </h1>
          
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed">
            PaySafe provides the infrastructure for global money movement. 
            Send, receive, and manage your capital with bank-grade security and instant settlement.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => router.push("/signin")} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95">
              Open Free Account
            </button>
            <button className="px-8 py-4 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold rounded-xl transition-all">
              Contact Sales
            </button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 grayscale opacity-60 flex-wrap">
            <span className="font-bold text-xl italic tracking-tighter">TRUSTED BY</span>
            <div className="flex gap-8 font-semibold text-slate-400">
              <span>FINTECH-X</span>
              <span>GLOBEX</span>
              <span>LUMINA</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Built for scale, designed for trust.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Security */}
            <div className="group">
              <div className="h-14 w-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-indigo-100 group-hover:-translate-y-1 transition-transform">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Military-Grade Encryption</h3>
              <p className="text-slate-600 leading-relaxed">
                AES-256 encryption at rest and TLS 1.3 in transit. Your financial data never touches our servers unencrypted.
              </p>
            </div>
            
            {/* Speed */}
            <div className="group">
              <div className="h-14 w-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-indigo-100 group-hover:-translate-y-1 transition-transform">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Real-time Settlement</h3>
              <p className="text-slate-600 leading-relaxed">
                Why wait 3-5 days? Our direct banking integrations allow for settlement in seconds, not business days.
              </p>
            </div>

            {/* Global */}
            <div className="group">
              <div className="h-14 w-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-indigo-100 group-hover:-translate-y-1 transition-transform">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Global Compliance</h3>
              <p className="text-slate-600 leading-relaxed">
                Operating under strict EMI licenses across 100+ countries, ensuring full AML and KYC compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust CTA */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to simplify your finances?</h2>
            <p className="text-slate-400 mb-8">Join over 2 million individuals and businesses using PaySafe today.</p>
            <button onClick={() => router.push("/signin")} className="bg-white text-slate-900 px-8 py-3 rounded-lg font-bold hover:bg-indigo-50 transition-colors">
                Get Started Now
            </button>
        </div>
      </section>
    </div>
  );
}