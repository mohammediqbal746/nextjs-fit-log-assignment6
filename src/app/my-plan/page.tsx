'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePlan } from '@/context/PlanContext';
import { ChevronDown, Clock, Flame, Star, Check, X } from 'lucide-react';
import { SortOption } from '@/types/workout';

export default function MyPlanPage() {
  const { 
    todayPlan, 
    savedWorkouts, 
    removeFromTodayPlan, 
    removeFromSaved, 
    markAsDone 
  } = usePlan();
  
  const [activeTab, setActiveTab] = useState<'today' | 'saved'>('today');
  const [sortBy, setSortBy] = useState<SortOption>('Duration');

  const totalExercises = todayPlan.length;
  
  let totalMinutes = 0;
  let totalCalories = 0;

  todayPlan.forEach((workout) => {
    totalMinutes = totalMinutes + (workout.duration || 0);
    totalCalories = totalCalories + (workout.calories || 0);
  });

  const currentList = activeTab === 'today' ? todayPlan : savedWorkouts;

  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === 'Duration') {
      return (a.duration || 0) - (b.duration || 0);
    }
    if (sortBy === 'Calories') {
      return (a.calories || 0) - (b.calories || 0);
    }
    if (sortBy === 'Rating') {
      return (b.rating || 0) - (a.rating || 0);
    }
    return 0;
  });


  const handleDelete = (id: string | number) => {
    const stringId = String(id);
    
    if (activeTab === 'today') {
      removeFromTodayPlan(stringId);
    } else {
      removeFromSaved(stringId);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-2">
          MY PLAN
        </h1>
        <p className="text-neutral-400 text-sm">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="bg-[#1c1e22] rounded-2xl p-6 md:p-8 mb-8 grid grid-cols-3 gap-4 border border-neutral-800/50">
        <div>
          <p className="text-neutral-500 text-xs font-bold uppercase tracking-wider mb-1">Exercises</p>
          <p className="text-3xl md:text-4xl font-black text-[#ccff00]">{totalExercises}</p>
        </div>
        <div>
          <p className="text-neutral-500 text-xs font-bold uppercase tracking-wider mb-1">Minutes</p>
          <p className="text-3xl md:text-4xl font-black text-white">{totalMinutes}</p>
        </div>
        <div>
          <p className="text-neutral-500 text-xs font-bold uppercase tracking-wider mb-1">Calories</p>
          <p className="text-3xl md:text-4xl font-black text-white">{totalCalories}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        
        <div className="flex bg-[#1c1e22] p-1 rounded-lg border border-neutral-800">
          <button
            onClick={() => setActiveTab('today')}
            className={activeTab === 'today' 
              ? "bg-neutral-800 text-white px-6 py-2 rounded-md text-sm font-bold transition-all" 
              : "text-neutral-500 hover:text-white px-6 py-2 rounded-md text-sm font-bold transition-all"}
          >
            Today's Plan
          </button>
          
          <button
            onClick={() => setActiveTab('saved')}
            className={activeTab === 'saved' 
              ? "bg-neutral-800 text-white px-6 py-2 rounded-md text-sm font-bold transition-all" 
              : "text-neutral-500 hover:text-white px-6 py-2 rounded-md text-sm font-bold transition-all"}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-2 bg-[#1c1e22] border border-neutral-800 rounded-lg px-4 py-2 relative">
          <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Sort By:</span>
          <select
            className="bg-transparent text-white text-sm font-bold outline-none appearance-none pr-6 cursor-pointer"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
          >
            <option value="Duration" className="bg-[#1c1e22]">Duration</option>
            <option value="Calories" className="bg-[#1c1e22]">Calories</option>
            <option value="Rating" className="bg-[#1c1e22]">Rating</option>
          </select>
          <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3 pointer-events-none" />
        </div>
      </div>

      <div className={sortedList.length === 0 ? "bg-[#131417] border border-neutral-800 border-dashed rounded-3xl p-6 md:p-10 min-h-[400px]" : ""}>
        
        {sortedList.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center mt-12 md:mt-24">
            <h2 className="text-2xl font-black text-white uppercase tracking-wider mb-2">NOTHING HERE YET</h2>
            <p className="text-neutral-400 text-sm mb-8">Browse the library and add a lift to get today moving.</p>
            <Link href="/" className="bg-[#ccff00] text-black px-8 py-3 rounded-full font-bold uppercase tracking-wider text-sm hover:brightness-105 transition-all">
              Go to workouts
            </Link>
          </div>
        ) : (
          
          <div className="space-y-4">
            {sortedList.map((item) => {
              const isCompleted = (item as any).isDone && activeTab === 'today';

              return (
                <div 
                  key={item.id} 
                  className={`bg-[#1c1e22] border rounded-2xl p-4 flex flex-col md:flex-row gap-6 items-center transition-all ${isCompleted ? 'border-[#ccff00]/50 opacity-70' : 'border-neutral-800'}`}
                >
                  
                  <div className="relative w-full md:w-48 h-32 md:h-24 bg-neutral-900 rounded-xl overflow-hidden flex-shrink-0">
                    {item.image ? (
                      // FIX: Added 'sizes' prop to resolve Next.js warning
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        sizes="(max-width: 768px) 100vw, 192px"
                        className="object-cover" 
                      />
                    ) : null}
                  </div>
                  
                  <div className="flex-1 w-full text-center md:text-left">
                    <h3 className={`font-black uppercase tracking-wide text-lg ${isCompleted ? 'line-through text-neutral-500' : 'text-white'}`}>
                      {item.name}
                    </h3>
                    <p className="text-sm text-neutral-400 mb-2">{item.equipment}</p>
                    <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-medium text-neutral-300">
                      <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#ccff00]" /> {item.duration} min</span>
                      <span className="flex items-center gap-1.5"><Flame className="w-4 h-4 text-[#ccff00]" /> {item.calories} kcal</span>
                      <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-[#ccff00]" /> {item.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                    <Link href={`/workout/${item.id}`} className="px-5 py-2 border border-neutral-700 rounded-full text-xs font-bold text-white hover:bg-neutral-800 transition-colors">
                      View Details
                    </Link>
                    
                    {activeTab === 'today' ? (
                      <button
                        onClick={() => markAsDone(item.id)}
                        className={(item as any).isDone 
                          ? "flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all bg-neutral-800 text-neutral-400" 
                          : "flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all bg-[#ccff00] text-black hover:brightness-105"}
                      >
                        <Check className="w-4 h-4" />
                        {(item as any).isDone ? 'Done' : 'Mark as Done'}
                      </button>
                    ) : null}
                    
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 ml-2 text-neutral-500 hover:text-red-400 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}