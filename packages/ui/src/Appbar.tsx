"use client";

import { ShieldCheck, User as UserIcon } from "lucide-react";

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
    return (
        <nav className="flex justify-between items-center px-8 py-3.5 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-[100]">
            {/* Logo Section */}
            <div className="flex items-center gap-3 cursor-pointer select-none group">
                <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200 transition-transform group-hover:scale-105">
                    <ShieldCheck className="text-white w-5 h-5" />
                </div>
                <div className="flex flex-col">
                    <span className="text-lg font-black tracking-tight text-slate-900 leading-none">
                        PaySafe
                    </span>
                    
                </div>
            </div>

            {/* Actions Section */}
            <div className="flex items-center gap-6">
                {user ? (
                    <div className="flex items-center gap-4">
                        <div className="hidden border-r border-slate-200 pr-4 md:flex flex-col items-end">
                            <span className="text-sm font-bold text-slate-900 leading-none">
                                {user.name}
                            </span>
                            <div className="flex items-center gap-1 mt-0.5">
                                <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
                                <span className="font-bold uppercase tracking-wider" style={{ fontSize: '9px', color: '#10b981' }}>
                                    Online
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl flex items-center justify-center border border-slate-200 shadow-sm transition-hover hover:border-indigo-200">
                                <UserIcon className="w-5 h-5 text-slate-600" />
                            </div>

                            <button
                                onClick={onSignout}
                                className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={onSignin}
                        className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95"
                    >
                        Sign In
                    </button>
                )}
            </div>
        </nav>
    );
}
