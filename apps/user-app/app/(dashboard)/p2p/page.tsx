import { SendCard } from "../../../components/SendCard";

export default function SendPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">
            Send Payment
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Fast, secure, and reliable transactions
          </p>
        </div>

        {/* Card Wrapper */}
        <div className="rounded-xl bg-white shadow-lg border border-slate-200 p-6">
          <SendCard />
        </div>

        {/* Footer hint */}
        <p className="mt-6 text-center text-xs text-slate-400">
          Powered by PaySafe • Secure payments
        </p>
      </div>
    </div>
  );
}
