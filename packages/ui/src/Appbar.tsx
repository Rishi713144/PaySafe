"use client";

import { Button } from "./button";
import { ShieldCheck, User as UserIcon } from "lucide-react";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // Fixed: Replaced 'any' with proper function type signatures
    onSignin: () => void;
    onSignout: () => void;
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
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
                    
                    <Button 
                        variant={user ? "outline" : "primary"} 
                        onClick={user ? onSignout : onSignin}
                        className={user ? "border-slate-200 text-slate-700 hover:bg-slate-50" : "bg-indigo-600 hover:bg-indigo-700"}
                    >
                        {user ? "Logout" : "Sign In"}
                    </Button>
                </div>
            </div>
        </nav>
    );
}