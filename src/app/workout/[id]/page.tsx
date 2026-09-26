'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Workout } from '@/types/workout';
import { usePlan } from '@/context/PlanContext';
import { CalendarPlus, Bookmark } from 'lucide-react';
import Link from 'next/link';

export default function WorkoutDetails() {
  const params = useParams();
  const id = params.id as string;
  
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  const { addToTodayPlan, saveForLater, todayPlan, savedWorkouts } = usePlan();

  useEffect(() => {
    const fetchWorkoutDetail = async () => {
      try {
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
        const data = await res.json();
        
        if (data && data.id) {
          setWorkout(data);
        } else if (data && data.data) {
          setWorkout(data.data);
        }
      } catch (error) {
        console.error('Error fetching workout details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-black text-white mb-4">Workout Not Found</h1>
        <Link href="/" className="text-[#ccff00] hover:underline">Go back to library</Link>
      </div>
    );
  }

  const isAddedToPlan = todayPlan.some((item) => item.id === workout.id);
  const isSaved = savedWorkouts.some((item) => item.id === workout.id);

  const tags = Array.isArray(workout.categories) ? workout.categories : workout.category ? [workout.category] : ['Chest', 'Arms'];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        
        {/* বাম কলাম: ছবি */}
        <div className="lg:col-span-5 relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-800/50">
          {workout.image && (
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>

        {/* ডান কলাম: কনটেন্ট */}
        <div className="lg:col-span-7 flex flex-col pt-2">
          
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4">
            {workout.name}
          </h1>
          
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-6">
            {workout.description || 'A compound press that builds chest thickness, triceps, and pressing power from a stable bench.'}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag, idx) => (
              <span key={idx} className="bg-[#ccff00] text-black text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>

          {/* স্পেকস টেবিল (Figma অনুযায়ী) */}
          <div className="bg-[#131417] border border-neutral-800/50 rounded-2xl p-6 mb-8 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-neutral-500 font-bold uppercase tracking-wider text-xs">Equipment</span>
              <span className="text-neutral-300">{workout.equipment || 'Barbell, Bench'}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-neutral-500 font-bold uppercase tracking-wider text-xs">Difficulty</span>
              <span className="text-neutral-300">{workout.difficulty || 'Intermediate'}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-neutral-500 font-bold uppercase tracking-wider text-xs">Sets</span>
              <span className="text-neutral-300">{workout.sets || 4}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-neutral-500 font-bold uppercase tracking-wider text-xs">Reps</span>
              <span className="text-neutral-300">{workout.reps || '6-8'}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-neutral-500 font-bold uppercase tracking-wider text-xs">Duration</span>
              <span className="text-neutral-300">{workout.duration || 25} min</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-neutral-500 font-bold uppercase tracking-wider text-xs">Calories</span>
              <span className="text-neutral-300">{workout.calories || 180} kcal</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-neutral-500 font-bold uppercase tracking-wider text-xs">Rating</span>
              <span className="text-neutral-300">{workout.rating || 4.8}</span>
            </div>
          </div>

          {/* ইনস্ট্রাকশনস */}
          <div className="mb-10">
            <h2 className="text-white font-bold uppercase tracking-wide mb-4">Instructions</h2>
            <div className="space-y-3">
              {workout.instructions && Array.isArray(workout.instructions) ? (
                workout.instructions.map((step, idx) => (
                  <p key={idx} className="text-neutral-400 text-sm leading-relaxed">
                    <span className="text-neutral-500 mr-2">{idx + 1}.</span> {step}
                  </p>
                ))
              ) : (
                <>
                  <p className="text-neutral-400 text-sm leading-relaxed"><span className="text-neutral-500 mr-2">1.</span> Lie on the bench with eyes under the bar and feet planted.</p>
                  <p className="text-neutral-400 text-sm leading-relaxed"><span className="text-neutral-500 mr-2">2.</span> Unrack with locked elbows and lower the bar to mid-chest.</p>
                  <p className="text-neutral-400 text-sm leading-relaxed"><span className="text-neutral-500 mr-2">3.</span> Press up in a slight arc until elbows lock without bouncing.</p>
                  <p className="text-neutral-400 text-sm leading-relaxed"><span className="text-neutral-500 mr-2">4.</span> Keep shoulder blades pinched and a natural arch in the back.</p>
                </>
              )}
            </div>
          </div>

          {/* বাটনস */}
          <div className="flex flex-wrap items-center gap-4 mt-auto">
            <button
              onClick={() => addToTodayPlan(workout)}
              disabled={isAddedToPlan}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-bold text-sm transition-all ${
                isAddedToPlan 
                  ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' 
                  : 'bg-[#ccff00] text-black hover:brightness-105'
              }`}
            >
              <CalendarPlus className="w-4 h-4" />
              {isAddedToPlan ? 'Added to plan' : "Add to today's plan"}
            </button>

            <button
              onClick={() => saveForLater(workout)}
              disabled={isSaved}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-bold text-sm transition-all border ${
                isSaved 
                  ? 'border-neutral-800 text-neutral-600 cursor-not-allowed' 
                  : 'border-neutral-700 text-neutral-300 hover:border-neutral-500 hover:text-white'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              {isSaved ? 'Saved' : 'Save for later'}
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}