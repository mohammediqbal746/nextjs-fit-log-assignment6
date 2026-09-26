'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dumbbell } from 'lucide-react';
import { usePlan } from '@/context/PlanContext';

export const Navbar = () => {
  const pathname = usePathname();
  const { todayPlan, savedWorkouts } = usePlan();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-[#0f1012]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        <Link href="/" className="flex items-center gap-2 text-white font-black tracking-wider text-xl">
          <div className="bg-[#ccff00] text-black p-1.5 rounded-md flex items-center justify-center">
            <Dumbbell className="w-5 h-5" />
          </div>
          <span>FITLOG</span>
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              pathname === '/'
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              pathname === '/my-plan'
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 bg-[#ccff00] text-black px-3 py-1 rounded-full text-xs font-bold shadow-sm hover:brightness-105 transition"
          >
            <span>Plan</span>
            <span className="bg-black text-[#ccff00] px-1.5 py-0.2 rounded-full text-[11px]">
              {todayPlan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 border border-neutral-700 text-neutral-300 hover:border-neutral-500 px-3 py-1 rounded-full text-xs font-bold transition"
          >
            <span>Saved</span>
            <span className="text-white text-[11px]">
              {savedWorkouts.length}
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
};