'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePlan } from '@/context/PlanContext';
import { Trash2, CheckCircle, ArrowRight, Dumbbell } from 'lucide-react';

export default function MyPlanPage() {
  const { todayPlan, savedWorkouts, removeFromTodayPlan, removeFromSaved, markAsDone } = usePlan();

  return (
    <main className="min-h-screen max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      
      <div className="mb-12 border-b border-neutral-800 pb-6">
        <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-2">
          Your Dashboard
        </h1>
        <p className="text-neutral-400">Manage your daily targets and saved lifts.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Today's Plan */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#ccff00] uppercase tracking-wide flex items-center gap-2">
              <Dumbbell className="w-5 h-5" /> Today's Plan
            </h2>
            <span className="bg-neutral-800 text-white text-xs px-2.5 py-1 rounded-full font-bold">
              {todayPlan.length} / 5
            </span>
          </div>

          {todayPlan.length === 0 ? (
            <div className="bg-[#1c1e22] border border-neutral-800 border-dashed rounded-2xl p-8 text-center">
              <p className="text-neutral-500 mb-4">You haven't added any workouts for today.</p>
              <Link href="/" className="inline-flex items-center gap-2 text-[#ccff00] font-bold hover:underline text-sm uppercase">
                Browse Library <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {todayPlan.map((item) => (
                <div key={item.id} className={`bg-[#1c1e22] border rounded-2xl p-4 flex gap-4 transition-all ${item.isDone ? 'border-[#ccff00]/50 opacity-70' : 'border-neutral-800'}`}>
                  
                  <div className="relative w-20 h-20 bg-neutral-900 rounded-xl overflow-hidden flex-shrink-0">
                    {item.image && (
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className={`font-black text-white uppercase tracking-wide ${item.isDone ? 'line-through text-neutral-500' : ''}`}>
                      {item.name}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">{item.duration} min • {item.calories} kcal</p>
                  </div>

                  <div className="flex flex-col gap-2 justify-center border-l border-neutral-800 pl-4">
                    <button 
                      onClick={() => markAsDone(item.id)}
                      title="Mark as Done"
                      className={`p-2 rounded-full transition-all ${item.isDone ? 'bg-[#ccff00] text-black' : 'bg-neutral-800 text-neutral-400 hover:text-white'}`}
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => removeFromTodayPlan(item.id)}
                      title="Remove"
                      className="p-2 rounded-full bg-neutral-800 text-red-400 hover:bg-red-500/20 transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </section>

        {/* Saved for Later */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide">
              Saved for Later
            </h2>
            <span className="bg-neutral-800 text-white text-xs px-2.5 py-1 rounded-full font-bold">
              {savedWorkouts.length}
            </span>
          </div>

          {savedWorkouts.length === 0 ? (
            <div className="bg-[#1c1e22] border border-neutral-800 border-dashed rounded-2xl p-8 text-center">
              <p className="text-neutral-500">No workouts saved for later.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {savedWorkouts.map((item) => (
                <div key={item.id} className="bg-[#1c1e22] border border-neutral-800 rounded-2xl p-4 flex gap-4">
                  
                  <div className="flex-1 flex flex-col justify-center">
                    <Link href={`/workout/${item.id}`} className="font-black text-white uppercase tracking-wide hover:text-[#ccff00] transition-colors">
                      {item.name}
                    </Link>
                    <p className="text-xs text-neutral-400 mt-1">{item.equipment}</p>
                  </div>

                  <div className="flex items-center border-l border-neutral-800 pl-4">
                    <button 
                      onClick={() => removeFromSaved(item.id)}
                      className="p-2 rounded-full bg-neutral-800 text-red-400 hover:bg-red-500/20 transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}