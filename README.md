# FitLog — Workout Library 🏋️‍♂️

FitLog is a modern, dark-themed gym companion web application built with Next.js. It allows users to browse a collection of workouts, view detailed instructions, and manage their daily lifting plans seamlessly.

## 🚀 Live Demo
- [FitLog Live Preview](https://nextjs-fit-log-assignment6.vercel.app)

## 🛠️ Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **State Management:** React Context API & `localStorage`

## ✨ Features
- **Dynamic Data Fetching:** Fetches workout data from the alternative API endpoint with robust loading and error states.
- **Advanced Sorting:** Users can seamlessly sort the workout library by Duration, Calories, or Rating.
- **Detailed Pages:** Dynamic routing (`/workout/[id]`) for individual workout instructions, equipment needs, and statistics.
- **Plan Management (Dashboard):** 
  - Add up to 5 workouts to "Today's Plan".
  - Save workouts for later in a dedicated tab.
  - Mark workouts as completed with visual interactive feedback.
  - Remove workouts from the lists safely.
- **Data Persistence:** Uses browser `localStorage` to keep user plans intact even after page reloads.
- **Responsive UI:** Fully responsive design matching the premium dark theme Figma layout perfectly.

## 📡 API Endpoints Used
- **All Workouts:** `https://api.api-store.workers.dev/api/fitlog`
- **Single Workout Detail:** `https://api.api-store.workers.dev/api/fitlog/:id`

## 📦 How to Run Locally

1. Clone the repository:
   ```bash
   git clone [https://github.com/mohammediqbal746/nextjs-fit-log-assignment6.git](https://github.com/mohammediqbal746/nextjs-fit-log-assignment6.git)