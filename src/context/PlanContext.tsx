'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Workout, PlanItem } from '@/types/workout';
import toast from 'react-hot-toast';

interface PlanContextType {
  todayPlan: PlanItem[];
  savedWorkouts: Workout[];
  addToTodayPlan: (workout: Workout) => void;
  saveForLater: (workout: Workout) => void;
  removeFromTodayPlan: (id: string | number) => void;
  removeFromSaved: (id: string | number) => void;
  markAsDone: (id: string | number) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: React.ReactNode }) => {
  const [todayPlan, setTodayPlan] = useState<PlanItem[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    const savedPlan = localStorage.getItem('fitlog_today_plan');
    const savedLater = localStorage.getItem('fitlog_saved');

    if (savedPlan) {
      setTodayPlan(JSON.parse(savedPlan));
    }
    if (savedLater) {
      setSavedWorkouts(JSON.parse(savedLater));
    }
  }, []);

  const addToTodayPlan = (workout: Workout) => {
    if (todayPlan.length >= 5) {
      toast.error("Cap reached! You can only add up to 5 lifts for today.");
      return;
    }

    const alreadyExists = todayPlan.some((item) => item.id === workout.id);
    if (alreadyExists) {
      toast.error('Workout is already in today’s plan!');
      return;
    }

    const updatedPlan = [...todayPlan, { ...workout, isDone: false }];
    setTodayPlan(updatedPlan);
    localStorage.setItem('fitlog_today_plan', JSON.stringify(updatedPlan));
    toast.success("Added to today's plan!");
  };

  const saveForLater = (workout: Workout) => {
    const alreadySaved = savedWorkouts.some((item) => item.id === workout.id);
    if (alreadySaved) {
      toast.error('Workout is already saved!');
      return;
    }

    const updatedSaved = [...savedWorkouts, workout];
    setSavedWorkouts(updatedSaved);
    localStorage.setItem('fitlog_saved', JSON.stringify(updatedSaved));
    toast.success('Saved for later!');
  };

  const removeFromTodayPlan = (id: string | number) => {
    const updatedPlan = todayPlan.filter((item) => item.id !== id);
    setTodayPlan(updatedPlan);
    localStorage.setItem('fitlog_today_plan', JSON.stringify(updatedPlan));
    toast.success('Removed from today’s plan');
  };

  const removeFromSaved = (id: string | number) => {
    const updatedSaved = savedWorkouts.filter((item) => item.id !== id);
    setSavedWorkouts(updatedSaved);
    localStorage.setItem('fitlog_saved', JSON.stringify(updatedSaved));
    toast.success('Removed from saved list');
  };

  const markAsDone = (id: string | number) => {
    const updatedPlan = todayPlan.map((item) => {
      if (item.id === id) {
        return { ...item, isDone: !item.isDone };
      }
      return item;
    });

    setTodayPlan(updatedPlan);
    localStorage.setItem('fitlog_today_plan', JSON.stringify(updatedPlan));
    toast.success('Workout marked as completed!');
  };

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedWorkouts,
        addToTodayPlan,
        saveForLater,
        removeFromTodayPlan,
        removeFromSaved,
        markAsDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
};