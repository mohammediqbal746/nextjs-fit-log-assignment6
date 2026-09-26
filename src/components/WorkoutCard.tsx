import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Workout } from '@/types/workout';
import { Clock, Flame, Star } from 'lucide-react';

export const WorkoutCard = ({ workout }: { workout: Workout }) => {
  const tags = Array.isArray(workout.categories) 
    ? workout.categories 
    : workout.category 
      ? [workout.category] 
      : ['FULL BODY'];

  const calories = workout.calories || 150;

  return (
    <Link 
      href={`/workout/${workout.id}`} 
      className="bg-[#1c1e22] rounded-2xl overflow-hidden hover:ring-2 hover:ring-[#ccff00] transition-all group block border border-neutral-800/50"
    >
      <div className="relative w-full h-48 bg-neutral-900 overflow-hidden">
        {workout.image && (
          <Image
            src={workout.image}
            alt={workout.name || 'Workout'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
      </div>
      
      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, idx) => (
            <span 
              key={idx} 
              className="bg-[#ccff00] text-black text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-white font-black text-lg uppercase tracking-wide mb-1 truncate">
          {workout.name}
        </h3>
        <p className="text-neutral-400 text-sm mb-5 truncate">
          {workout.equipment || 'No equipment'}
        </p>
        
        <div className="flex items-center gap-4 text-neutral-300 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-neutral-500" />
            <span>{workout.duration || 10} min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-neutral-500" />
            <span>{calories} kcal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-[#ccff00]" />
            <span>{workout.rating || 4.5}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};