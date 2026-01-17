"use client";

import { Button } from "./button";
import { ShieldCheck, User as UserIcon } from "lucide-react";
import { useState, useEffect } from "react";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    
    onSignin: () => void;
    onSignout: () => void;
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    const [visitorCount, setVisitorCount] = useState(14203);

    useEffect(() => {
        const stored = localStorage.getItem("payment_app_visitor_count");
        const current = stored ? parseInt(stored) : 14203;
        const next = current + 1;
        setVisitorCount(next);
        localStorage.setItem("payment_app_visitor_count", next.toString());
    }, []);

    return (
        <nav className="flex justify-between items-center px-6 py-3 border-b border-slate-200 bg-white sticky top-0 z-50">
            {/* Logo Section */}
            <div className="flex items-center gap-2 cursor-pointer select-none">
                <div className="bg-indigo-600 p-1.5 rounded-lg">
                    <ShieldCheck className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900">
                    PaySafe
                </span>
            </div>

            {/* Actions Section */}
            <div className="flex items-center gap-4">
                {user && (
                    <div className="hidden md:flex flex-col items-end mr-2">
                        <span className="text-sm font-semibold text-slate-700 leading-none">
                            {user.name}
                        </span>
                        <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider mt-1">
                            Verified Account
                        </span>
                    </div>
                )}

                <div className="flex items-center gap-3">
                    {user && (
                        <div className="h-9 w-9 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
                            <UserIcon className="w-5 h-5 text-slate-500" />
                        </div>
                    )}
                    
                    {user ? (
                         <Button onClick={onSignout}>Logout</Button>
                    ) : (
                         <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg border border-slate-100">
                             <div className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Visitors</span>
                                <span className="text-sm font-bold text-slate-700 font-mono">{visitorCount.toLocaleString()}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}