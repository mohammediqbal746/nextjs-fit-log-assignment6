'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Workout, SortOption } from '@/types/workout';
import { WorkoutCard } from '@/components/WorkoutCard';
import { ChevronDown, Loader2 } from 'lucide-react';

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>('Duration');

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetch('https://api.api-store.workers.dev/api/fitlog');
        const data = await res.json();
        
        if (Array.isArray(data)) {
          setWorkouts(data);
        } else if (data && Array.isArray(data.data)) {
          setWorkouts(data.data);
        } else {
          setWorkouts([]);
        }
      } catch (error) {
        console.error('Error fetching workouts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === 'Duration') return (a.duration || 0) - (b.duration || 0);
    if (sortBy === 'Calories') return (a.calories || 0) - (b.calories || 0);
    if (sortBy === 'Rating') return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
    <main className="min-h-screen">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="bg-[#1c1e22] rounded-3xl p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 border border-neutral-800/50">
          <div className="flex-1 max-w-2xl">
            <h3 className="text-[#ccff00] font-bold text-sm tracking-widest uppercase mb-4">Workout Library</h3>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase leading-[1.1] mb-6 tracking-tight">
              Train with intent. <br /> Log every set.
            </h1>
            <p className="text-neutral-400 text-lg mb-8 max-w-lg leading-relaxed">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
            </p>
            <Link href="#library" className="inline-flex items-center gap-2 bg-[#ccff00] text-black px-6 py-3 rounded-md font-bold hover:brightness-105 transition duration-200 uppercase text-sm tracking-wide">
              Browse Workouts
            </Link>
          </div>
          <div className="flex-1 flex justify-center md:justify-end relative">
            <div className="relative w-full max-w-[300px] md:max-w-[400px] aspect-square">
              <Image src="/banner.png" alt="Gym Workout" fill className="object-contain" priority />
            </div>
          </div>
        </div>
      </section>

      <section id="library" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-black text-white uppercase mb-2">The Library</h2>
            <p className="text-neutral-400 text-sm">Twelve lifts covering every major muscle group.</p>
          </div>
          <div className="relative">
             <div className="flex items-center gap-2 bg-[#1c1e22] border border-neutral-800 rounded-lg px-4 py-2.5">
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
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-12 h-12 text-[#ccff00] animate-spin mb-4" />
            <p className="text-neutral-400 font-medium">Fetching workouts from API...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedWorkouts?.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}