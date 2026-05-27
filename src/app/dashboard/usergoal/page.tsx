'use client'
import GoalList from "@/components/usergoalsection/GoalList";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";

const GoalsPage = () => {
   const user = useSelector((state: RootState) => state.auth.user);
    const userId = user?.id;

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-[60px]">
      <h1 className="text-4xl font-bold mb-6 text-center">
         Your Learning <span className="text-blue-400">Goals</span>
      </h1>
       <p className="text-center text-gray-600 mb-8">
    Set goals, track progress, and stay consistent every day.
  </p>

      <GoalList userId={userId} />
    </div>
  );
};

export default GoalsPage;
