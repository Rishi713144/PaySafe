"use client";

import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

// --- SVG Icons ---

const SuccessIcon = () => (
    <div className="p-3 bg-emerald-50 rounded-full">
        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
    </div>
);

const FailureIcon = () => (
    <div className="p-3 bg-red-50 rounded-full">
        <XCircle className="w-10 h-10 text-red-500" />
    </div>
);

const CardIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="36"
        height="24"
        className="shrink-0"
    >
        <circle cx="8" cy="12" r="7" fill="#EA001B"></circle>
        <circle cx="16" cy="12" r="7" fill="#F79E1B" fillOpacity="0.8"></circle>
    </svg>
);

// --- Helper Components ---

const DashedLine = () => (
    <div
        className="w-full border-t border-dashed border-slate-200 my-6"
        aria-hidden="true"
    />
);

const Barcode = ({ value }: { value: string }) => {
    const hashCode = (s: string) => s.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
    const seed = hashCode(value);
    const random = (s: number) => {
        const x = Math.sin(s) * 10000;
        return x - Math.floor(x);
    };

    const bars = Array.from({ length: 50 }).map((_, index) => {
        const rand = random(seed + index);
        const width = rand > 0.7 ? 2.5 : 1.5;
        return { width };
    });

    const spacing = 1.2;
    const totalWidth = bars.reduce((acc, bar) => acc + bar.width + spacing, 0) - spacing;
    const svgWidth = 200;
    const svgHeight = 50;
    let currentX = (svgWidth - totalWidth) / 2;

    return (
        <div className="flex flex-col items-center py-2 opacity-50">
             <svg
                xmlns="http://www.w3.org/2000/svg"
                width={svgWidth}
                height={svgHeight}
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="fill-slate-800"
            >
                {bars.map((bar, index) => {
                    const x = currentX;
                    currentX += bar.width + spacing;
                    return (
                        <rect
                            key={index}
                            x={x}
                            y="5"
                            width={bar.width}
                            height="40"
                        />
                    );
                })}
            </svg>
            <p className="text-[10px] text-slate-400 font-mono tracking-[0.4em] mt-2 uppercase">{value}</p>
        </div>
    );
};

export interface TransactionStatusCardProps {
    status: "success" | "failure";
    amount: number;
    receiptId: string;
    date: string;
    recipientName: string;
    recipientNumber: string;
    message?: string;
    onClose?: () => void;
}

export const TransactionStatusCard = ({
    status,
    amount,
    receiptId,
    date,
    recipientName,
    recipientNumber,
    message,
    onClose
}: TransactionStatusCardProps) => {
    const isSuccess = status === "success";

    return (
        <div className="w-full max-w-sm bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8 flex flex-col items-center text-center">
                {isSuccess ? <SuccessIcon /> : <FailureIcon />}
                
                <h2 className="text-2xl font-bold mt-4 text-slate-900">
                    {isSuccess ? "Transfer Successful" : "Transfer Failed"}
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                    {message || (isSuccess 
                        ? "The funds have been sent successfully" 
                        : "Something went wrong with the transaction")}
                </p>

                <div className="mt-6 flex flex-col items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Total Amount</span>
                    <span className="text-4xl font-black text-slate-900 mt-2">
                        ${(amount / 100).toFixed(2)}
                    </span>
                </div>
            </div>

            <div className="px-8 pb-8">
                <DashedLine />

                <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400 font-medium">Receipt ID</span>
                        <span className="text-slate-900 font-bold font-mono">{receiptId}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400 font-medium">Date & Time</span>
                        <span className="text-slate-900 font-bold">{date}</span>
                    </div>

                    <div className="pt-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">Recipient Details</span>
                        <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-100 shadow-sm">
                                <CardIcon />
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-sm font-bold text-slate-900">{recipientName || "Contact"}</span>
                                <span className="text-xs text-slate-500 font-mono">{recipientNumber}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <DashedLine />

                <Barcode value={receiptId} />

                {onClose && (
                    <button 
                        onClick={onClose}
                        className="w-full mt-6 py-3.5 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
                    >
                        Done
                    </button>
                )}
            </div>
        </div>
    );
};
