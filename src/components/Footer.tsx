import React from 'react';
import { Dumbbell } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full border-t border-neutral-800 bg-[#0f1012] py-8 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2 text-white font-black tracking-wider text-base">
          <div className="bg-[#ccff00] text-black p-1 rounded flex items-center justify-center">
            <Dumbbell className="w-4 h-4" />
          </div>
          <span>FITLOG</span>
        </div>

        <p className="text-xs sm:text-sm text-neutral-500 text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
};