import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });

  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
    orderBy: {
      startTime: "desc",
    },
  });

  return txns.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

export default async function TransferPage() {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();

  return (
    <div className="min-h-screen w-full bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-900">
            Transfers
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Add money to your wallet and track transactions
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column – Add Money */}
          <div className="lg:col-span-1">
            <div className="rounded-xl bg-white border border-slate-200 shadow-sm p-6">
              <AddMoney />
            </div>
          </div>

          {/* Right Column – Balance + Transactions */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl bg-white border border-slate-200 shadow-sm p-6">
              <BalanceCard
                amount={balance.amount}
                locked={balance.locked}
              />
            </div>

            <div className="rounded-xl bg-white border border-slate-200 shadow-sm p-6">
              <OnRampTransactions transactions={transactions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
