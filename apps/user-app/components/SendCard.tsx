"use client";

import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { ArrowRight, Send } from "lucide-react";
import { TransactionStatusCard } from "@repo/ui/transaction-status-card";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showStatus, setShowStatus] = useState<"success" | "failure" | null>(null);
  const [txDetails, setTxDetails] = useState<any>(null);

  const isDisabled = !number || !amount || loading;

  const handleTransfer = async () => {
    if (isDisabled) return;

    // Reset state
    setError("");
    setShowStatus(null);

    // Validate amount
    const amountValue = Number(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    try {
      setLoading(true);
      const result = await p2pTransfer(number, amountValue * 100);
      
      if (result.success) {
        setTxDetails({
            amount: amountValue * 100,
            receiptId: "PAY-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
            date: new Date().toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
            recipientNumber: number,
        });
        setShowStatus("success");
        setNumber("");
        setAmount("");
      } else {
        setError(result.message);
        setTxDetails({
            amount: amountValue * 100,
            receiptId: "ERR-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
            date: new Date().toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
            recipientNumber: number,
            message: result.message
        });
        setShowStatus("failure");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setShowStatus("failure");
    } finally {
      setLoading(false);
    }
  };

  if (showStatus) {
    return (
        <div className="flex justify-center items-center py-4">
            <TransactionStatusCard
                status={showStatus}
                amount={txDetails.amount}
                receiptId={txDetails.receiptId}
                date={txDetails.date}
                recipientName="Recipient"
                recipientNumber={txDetails.recipientNumber}
                message={txDetails.message}
                onClose={() => setShowStatus(null)}
            />
        </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-indigo-50 rounded-full text-indigo-600">
            <Send className="w-6 h-6" />
        </div>
        <div>
            <h2 className="text-xl font-bold text-gray-900">Send Money</h2>
            <p className="text-sm text-gray-500">Instant P2P transfers</p>
        </div>
      </div>
      
      <div className="space-y-5">
        <TextInput
          label="Phone Number"
          placeholder="Enter recipient's number"
          onChange={(value) => {
            setError("");
            setNumber(value);
          }}
        />

        <TextInput
          label="Amount"
          placeholder="Enter amount"
          onChange={(value) => {
            setError("");
            setAmount(value);
          }}
        />
        
        {error && (
          <div className="flex items-center text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
            <span className="mr-2">●</span> {error}
          </div>
        )}

        <div className="pt-2">
            <button
                onClick={handleTransfer}
                disabled={isDisabled}
                className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold transition-all hover:bg-slate-800 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                <span>{loading ? "Processing..." : "Send Securely"}</span>
                {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
        </div>
        
        <div className="text-sm text-gray-400 text-center">
          Transfers are encrypted and processed instantly
        </div>
      </div>
    </div>
  );
}