"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Send,
  Receipt,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const items = [
    { href: "/dashboard", title: "Home", icon: Home },
    { href: "/transfer", title: "Transfer", icon: Send },
    { href: "/transactions", title: "Transactions", icon: Receipt },
    { href: "/p2p", title: "P2P Transfer", icon: Users },
  ];

  return (
    <aside
      className={`
        h-screen bg-white border-r border-slate-200
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-100">
        {!collapsed && (
          <span className="text-lg font-bold text-indigo-600">
            Menu 
          </span>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md hover:bg-slate-100 transition"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="py-4 space-y-1">
        {items.map(({ href, title, icon: Icon }) => {
          const isActive =
            pathname === href ||
            (href !== "/" && pathname.startsWith(href));

          return (
            <button
              key={href}
              onClick={() => router.push(href)}
              className={`
                group relative w-full flex items-center gap-3
                px-3 py-3 mx-2 rounded-lg text-left
                transition-all duration-200
                ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600 font-semibold"
                    : "text-slate-600 hover:bg-slate-100"
                }
              `}
            >
              {/* Active indicator */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-indigo-600 rounded-r-full" />
              )}

              {/* Icon */}
              <div
                className={`
                  w-9 h-9 flex items-center justify-center rounded-md
                  ${
                    isActive
                      ? "bg-indigo-100 text-indigo-600"
                      : "bg-slate-100 text-slate-400 group-hover:text-slate-600"
                  }
                `}
              >
                <Icon size={18} strokeWidth={isActive ? 2.4 : 2} />
              </div>

              {/* Label */}
              {!collapsed && (
                <span className="text-sm tracking-tight">{title}</span>
              )}

              {/* Tooltip */}
              {collapsed && (
                <span className="
                  absolute left-full ml-3 px-3 py-1 text-xs
                  bg-slate-900 text-white rounded-md
                  opacity-0 group-hover:opacity-100
                  whitespace-nowrap pointer-events-none
                ">
                  {title}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
