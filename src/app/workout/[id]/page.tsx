'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Workout } from '@/types/workout';
import { usePlan } from '@/context/PlanContext';
import { ArrowLeft, Clock, Flame, Star, CheckCircle, Bookmark } from 'lucide-react';

export default function WorkoutDetails() {
  const params = useParams();
  const id = params.id as string;
  
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  // Context থেকে ফাংশনগুলো নিয়ে আসা
  const { addToTodayPlan, saveForLater, todayPlan, savedWorkouts } = usePlan();

  useEffect(() => {
    const fetchWorkoutDetail = async () => {
      try {
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
        const data = await res.json();
        
        // API রেসপন্স হ্যান্ডেল করা
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

  // চেক করা যে এই ওয়ার্কআউটটি অলরেডি প্ল্যান বা সেভড লিস্টে আছে কি না
  const isAddedToPlan = todayPlan.some((item) => item.id === workout.id);
  const isSaved = savedWorkouts.some((item) => item.id === workout.id);

  const tags = Array.isArray(workout.categories) ? workout.categories : workout.category ? [workout.category] : ['FULL BODY'];

  return (
    <main className="min-h-screen pb-20">
      {/* Header Image Section */}
      <div className="relative w-full h-[40vh] md:h-[50vh] bg-neutral-900">
        {workout.image && (
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover opacity-60"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1012] to-transparent" />
        
        <div className="absolute bottom-0 w-full">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
            <Link href="/" className="inline-flex items-center gap-2 text-[#ccff00] font-bold text-sm mb-6 hover:underline uppercase tracking-wider">
              <ArrowLeft className="w-4 h-4" /> Back to Library
            </Link>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, idx) => (
                <span key={idx} className="bg-[#ccff00] text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">
              {workout.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Left Column: Details & Instructions */}
          <div className="md:col-span-2 space-y-10">
            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 py-6 border-y border-neutral-800">
              <div className="flex items-center gap-2 text-neutral-300">
                <Clock className="w-5 h-5 text-neutral-500" />
                <span className="font-medium">{workout.duration || 10} min</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <Flame className="w-5 h-5 text-neutral-500" />
                <span className="font-medium">{workout.calories || 150} kcal</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <Star className="w-5 h-5 text-[#ccff00]" />
                <span className="font-medium">{workout.rating || 4.5}</span>
              </div>
            </div>

            {/* Description */}
            <section>
              <h2 className="text-xl font-bold text-white uppercase mb-4">Overview</h2>
              <p className="text-neutral-400 leading-relaxed">
                {workout.description || 'Focus on maintaining proper form throughout the movement. Keep your core tight and control the weight during both the concentric and eccentric phases.'}
              </p>
            </section>

            {/* Instructions */}
            <section>
              <h2 className="text-xl font-bold text-white uppercase mb-4">Instructions</h2>
              {workout.instructions && Array.isArray(workout.instructions) ? (
                <ul className="space-y-4">
                  {workout.instructions.map((step, idx) => (
                    <li key={idx} className="flex gap-4 text-neutral-400 leading-relaxed">
                      <span className="text-[#ccff00] font-black text-lg">{idx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-neutral-400">Step-by-step instructions are not available for this workout.</p>
              )}
            </section>
          </div>

          {/* Right Column: Actions */}
          <div className="space-y-4">
            <div className="bg-[#1c1e22] border border-neutral-800 rounded-2xl p-6 sticky top-24">
              <div className="mb-6">
                <h3 className="text-sm text-neutral-500 font-bold uppercase tracking-wider mb-1">Equipment</h3>
                <p className="text-white font-medium">{workout.equipment || 'Bodyweight'}</p>
              </div>

              <button
                onClick={() => addToTodayPlan(workout)}
                disabled={isAddedToPlan}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold uppercase tracking-wide transition-all mb-3 ${
                  isAddedToPlan 
                    ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' 
                    : 'bg-[#ccff00] text-black hover:brightness-105'
                }`}
              >
                <CheckCircle className="w-5 h-5" />
                {isAddedToPlan ? 'Added to Plan' : "Add to Today's Plan"}
              </button>

              <button
                onClick={() => saveForLater(workout)}
                disabled={isSaved}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold uppercase tracking-wide transition-all border ${
                  isSaved 
                    ? 'border-neutral-800 text-neutral-600 cursor-not-allowed bg-transparent' 
                    : 'border-neutral-700 text-white hover:border-neutral-500 bg-transparent'
                }`}
              >
                <Bookmark className="w-5 h-5" />
                {isSaved ? 'Saved' : 'Save for Later'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}