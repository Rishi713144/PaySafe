"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isDisabled = !number || !amount || loading;

  const handleTransfer = async () => {
    if (isDisabled) return;

    // Reset error
    setError("");

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
        alert("Transfer successful");
        setNumber("");
        setAmount("");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Send Money">
      <div className="space-y-4">
        <TextInput
          label="Amount"
          placeholder="Enter amount"
          onChange={(value) => {
            setError("");
            setAmount(value);
          }}
        />
        <TextInput
          label="Phone Number"
          placeholder="Enter recipient's number"
          onChange={(value) => {
            setError("");
            setNumber(value);
          }}
        />
        
        {error && (
          <div className="text-red-500 text-sm p-2 bg-red-50 rounded border border-red-200">
            {error}
          </div>
        )}

        <Center>
          <Button
            onClick={handleTransfer}
            disabled={isDisabled}
          >
            {loading ? "Processing..." : "Send Money"}
          </Button>
        </Center>

        <div className="text-sm text-gray-500 text-center">
          Transfers are processed instantly and securely
        </div>
      </div>
    </Card>
  );
}