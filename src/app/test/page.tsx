"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import {
  ArrowLeftCircle,
  BookOpenCheck,
  GraduationCap,
  Clock,
} from "lucide-react";
import { useGetAllQuestionsMutation } from "@/Redux/api/questionApi";

import { useUpdateWeeklyProgressForUserMutation } from "@/Redux/api/questionApi";
import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";

type Question = {
  id: string;
  questionText: string;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  correctOption?: "A" | "B" | "C" | "D";
  marks?: number;
};

interface Questionss {
  id: string;
  setNo: number;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: "A" | "B" | "C" | "D";
  marks: number;
  courseId?: string;
  createdAt?: string;
  updatedAt?: string;
}

const TestPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const week = searchParams.get("week") || "1";

  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [getAllQuestions, { isLoading }] = useGetAllQuestionsMutation();
  const [updateWeeklyProgress] = useUpdateWeeklyProgressForUserMutation();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [questionId: string]: "A" | "B" | "C" | "D" | "" }>({});
  const [visited, setVisited] = useState<Record<string, boolean>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [showAnswers, setShowAnswers] = useState(false);
  
  const [passingStatus, setPassingStatus] = useState<"passed" | "failed">("failed");
  const [isUpdatingProgress, setIsUpdatingProgress] = useState(false);

  const test = true;

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  const currentQuestion = useMemo(
    () => (questions.length > 0 ? questions[currentIndex] : null),
    [questions, currentIndex]
  );

  const fetchQuestions = async () => {
    try {
      
      const res = await getAllQuestions({ setNo: Number(week) }).unwrap();
      if (res?.success && Array.isArray(res.questions)) {
        const fetched = test ? res.questions.slice(0, 8) : res.questions;
        setQuestions(fetched);
        const initAnswers: { [k: string]: "" } = {};
        const initVisited: Record<string, boolean> = {};
        fetched.forEach((q: Questionss) => {
          initAnswers[q.id] = "";
          initVisited[q.id] = false;
        });
        setAnswers(initAnswers);
        setVisited(initVisited);
        setCurrentIndex(0);
      } else {
        setQuestions([]);
        
      }
    } catch (err) {
      console.error("Error fetching questions:", err);
      
    }
  };

 const updateProgress = useCallback(async (weekMarks: number, weekStatus: "passed" | "failed") => {
  try {
    setIsUpdatingProgress(true);
    const result = await updateWeeklyProgress({
      weekNumber: Number(week),
      weekMarks,
      weekStatus,
    }).unwrap();

    console.log("Progress updated successfully:", result);
    return result;
  } catch (error) {
    console.error("Failed to update progress:", error);
    throw error;
  } finally {
    setIsUpdatingProgress(false);
  }
}, [week, updateWeeklyProgress]); // ✅ include dependencies actually used

const calculateScore = useCallback(() => {
  let total = 0;
  let correctAnswers = 0;

  questions.forEach((q) => {
    if (answers[q.id] && q.correctOption && answers[q.id] === q.correctOption) {
      total += q.marks ?? 1;
      correctAnswers++;
    }
  });

  const totalQuestions = questions.length;
  const requiredToPass = Math.ceil(totalQuestions * (2 / 3));
  const passed = correctAnswers >= requiredToPass;

  setScore(total);
  setPassingStatus(passed ? "passed" : "failed");
  setSubmitted(true);

  updateProgress(total, passed ? "passed" : "failed");
}, [questions, answers, updateProgress]);


  const startTest = async () => {
    await fetchQuestions();
    setStarted(true);
    setTimeout(() => {
      if (questions[0]) {
        setVisited((prev) => ({ ...prev, [questions[0].id]: true }));
      }
    }, 0);
  };

  useEffect(() => {
    if (started && questions.length > 0) {
      const q = questions[currentIndex];
      if (q) setVisited((prev) => ({ ...prev, [q.id]: true }));
    }
  }, [currentIndex, started, questions.length,questions]);

  const handleAnswer = (questionId: string, option: "A" | "B" | "C" | "D") => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
    const idx = questions.findIndex((q) => q.id === questionId);
    setTimeout(() => {
      if (idx >= 0 && idx < questions.length - 1) {
        setCurrentIndex(idx + 1);
      }
    }, 180);
  };

 useEffect(() => {
  if (!started || submitted) return;
  if (timeLeft <= 0) {
    calculateScore();
    return;
  }
  const t = setInterval(() => setTimeLeft((s) => s - 1), 1000);
  return () => clearInterval(t);
}, [started, submitted, timeLeft, calculateScore]);


  const formatTime = (secs: number) => {
    if (secs < 0) secs = 0;
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const fallbackAvatar = "https://cdn-icons-png.flaticon.com/512/847/847969.png";
 

  const questionStatus = (q: Question) => {
    if (!q) return "not";
    if (answers[q.id]) return "answered";
    if (visited[q.id]) return "visited";
    return "not";
  };

 

  // Calculate correct answers count
  const correctAnswersCount = useMemo(() => {
    return questions.filter(q => 
      answers[q.id] && q.correctOption && answers[q.id] === q.correctOption
    ).length;
  }, [questions, answers]);

  const totalQuestions = questions.length;
  const requiredToPass = Math.ceil(totalQuestions * (2/3));

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Professional Header */}
      <header className="bg-white shadow-lg border-b border-gray-200 py-4 px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ExamPortal Pro</h1>
              <p className="text-sm text-gray-600">Professional Assessment System</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {started && !submitted && (
              <div className="bg-red-50 px-4 py-2 rounded-lg border border-red-200">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-red-600" />
                  <span className="font-mono text-red-700 font-bold">{formatTime(timeLeft)}</span>
                </div>
              </div>
            )}
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors border border-gray-300 rounded-lg hover:border-blue-300"
            >
              <ArrowLeftCircle className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {!started && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8"
            >
              {/* Exam Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <BookOpenCheck className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Week {week} Certification Exam
                </h2>
                <p className="text-gray-600">Complete this assessment to demonstrate your knowledge</p>
              </div>

              {/* User Info Card */}
              {isAuthenticated && user && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border border-blue-200">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={user.profileURL || fallbackAvatar}
                      alt={user.name} 
                      width={16}
                      height={16}
                      className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-gray-600">{user.email}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>Candidate ID: {String(user.id || "").slice(0, 8)}...</span>
                        <span>•</span>
                        <span>Week {week} Assessment</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Exam Details */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{questions.length}</div>
                  <div className="text-gray-600">Total Questions</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">25:00</div>
                  <div className="text-gray-600">Time Limit</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {questions.reduce((acc, q) => acc + (q.marks ?? 1), 0)}
                  </div>
                  <div className="text-gray-600">Total Marks</div>
                </div>
              </div>

              {/* Passing Criteria */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-blue-800 mb-3">Passing Criteria</h4>
                <div className="text-blue-700 text-sm space-y-2">
                  <p>• Must answer at least <strong>{Math.ceil(questions.length * (2/3))} out of {questions.length}</strong> questions correctly</p>
                  <p>• That&apos;s approximately <strong>67%</strong> of the total questions</p>
                  <p>• No negative marking for wrong answers</p>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-yellow-800 mb-3">Important Instructions</h4>
                <ul className="text-yellow-700 text-sm space-y-2">
                  <li>• Do not refresh the page during the exam</li>
                  <li>• All questions are mandatory</li>
                  <li>• Timer will auto-submit when time expires</li>
                  <li>• No negative marking</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!isAuthenticated || isLoading}
                  onClick={startTest}
                  className={`flex-1 py-4 px-6 rounded-xl font-semibold text-lg transition-all ${
                    isAuthenticated
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Loading Exam...</span>
                    </div>
                  ) : (
                    "Start Exam"
                  )}
                </motion.button>
                
                <button
                  onClick={() => router.push("/dashboard")}
                  className="px-6 py-4 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Return to Dashboard
                </button>
              </div>
            </motion.div>
          )}

          {/* Exam Interface */}
          {started && !submitted && (
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Questions Navigator */}
              <div className="lg:w-80">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-6">
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Question Navigator</h3>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Progress</span>
                      <span>{Object.values(answers).filter(a => a).length}/{questions.length}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${(Object.values(answers).filter(a => a).length / questions.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-3 mb-6">
                    {questions.map((q, idx) => {
                      const status = questionStatus(q);
                      const isCurrent = currentIndex === idx;
                      const baseClasses = "w-10 h-10 rounded-lg flex items-center justify-center font-medium border-2 cursor-pointer transition-all";
                      
                      const statusClasses = {
                        not: "bg-white border-gray-300 text-gray-500",
                        visited: "bg-yellow-50 border-yellow-400 text-yellow-700",
                        answered: "bg-green-50 border-green-500 text-green-700",
                      };

                      const currentClass = isCurrent ? "ring-2 ring-blue-500 ring-offset-2" : "";

                      return (
                        <button
                          key={q.id}
                          onClick={() => {
                            setCurrentIndex(idx);
                            setVisited((p) => ({ ...p, [q.id]: true }));
                          }}
                          className={`${baseClasses} ${statusClasses[status]} ${currentClass}`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        const firstUnanswered = questions.findIndex(q => !answers[q.id]);
                        setCurrentIndex(firstUnanswered >= 0 ? firstUnanswered : questions.length - 1);
                      }}
                      className="w-full py-3 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-colors"
                    >
                      First Unanswered
                    </button>
                    
                    <button
                      onClick={calculateScore}
                      className="w-full py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                    >
                      Submit Exam
                    </button>
                  </div>
                </div>
              </div>

              {/* Question Display */}
              <div className="flex-1">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                  {currentQuestion && (
                    <>
                      {/* Question Header */}
                      <div className="flex items-start justify-between mb-8">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                              Question {currentIndex + 1} of {questions.length}
                            </span>
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                              {currentQuestion.marks || 1} mark{currentQuestion.marks !== 1 ? 's' : ''}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 leading-relaxed">
                            {currentQuestion.questionText}
                          </h3>
                        </div>
                      </div>

                      {/* Options */}
                      <div className="space-y-4 mb-8">
                        {(['A', 'B', 'C', 'D'] as const).map((option) => {
                          const optionText = currentQuestion[`option${option}`];
                          if (!optionText) return null;

                          const isSelected = answers[currentQuestion.id] === option;
                          
                          return (
                            <motion.button
                              key={option}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handleAnswer(currentQuestion.id, option)}
                              className={`w-full p-6 text-left rounded-xl border-2 transition-all ${
                                isSelected
                                  ? 'border-blue-500 bg-blue-50 shadow-md'
                                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center space-x-4">
                                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-semibold ${
                                  isSelected 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-100 text-gray-600'
                                }`}>
                                  {option}
                                </div>
                                <div className="flex-1 text-gray-800 font-medium">
                                  {optionText}
                                </div>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>

                      {/* Navigation Controls */}
                      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                        <button
                          onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
                          disabled={currentIndex === 0}
                          className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                            currentIndex === 0
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-gray-500 text-white hover:bg-gray-600'
                          }`}
                        >
                          Previous
                        </button>

                        <div className="text-sm text-gray-600">
                          Selected: <span className="font-semibold text-gray-900">
                            {answers[currentQuestion.id] || 'None'}
                          </span>
                        </div>

                        {currentIndex < questions.length - 1 ? (
                          <button
                            onClick={() => setCurrentIndex(i => Math.min(questions.length - 1, i + 1))}
                            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                          >
                            Next Question
                          </button>
                        ) : (
                          <button
                            onClick={calculateScore}
                            className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                          >
                            Submit Exam
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Results Screen */}
          {submitted && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center"
            >
              {!showAnswers ? (
                <>
                  <div className={`w-20 h-20 ${
                    passingStatus === "passed" ? "bg-green-100" : "bg-red-100"
                  } rounded-full flex items-center justify-center mx-auto mb-6`}>
                    {passingStatus === "passed" ? (
                      <GraduationCap className="w-10 h-10 text-green-600" />
                    ) : (
                      <BookOpenCheck className="w-10 h-10 text-red-600" />
                    )}
                  </div>
                  
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {passingStatus === "passed" ? "Congratulations! You Passed!" : "Exam Completed"}
                  </h2>
                  
                  <div className={`rounded-2xl p-8 mb-8 border max-w-2xl mx-auto ${
                    passingStatus === "passed" 
                      ? "bg-gradient-to-r from-green-50 to-blue-50 border-green-200" 
                      : "bg-gradient-to-r from-red-50 to-orange-50 border-red-200"
                  }`}>
                    <div className="text-5xl font-bold text-gray-900 mb-2">{score}</div>
                    <div className="text-gray-600 mb-2">
                      out of {questions.reduce((acc, q) => acc + (q.marks ?? 1), 0)} points
                    </div>
                    <div className="text-lg font-semibold mb-4">
                      Correct Answers: {correctAnswersCount} / {totalQuestions}
                    </div>
                    <div className={`text-lg font-semibold ${
                      passingStatus === "passed" ? "text-green-600" : "text-red-600"
                    }`}>
                      {passingStatus === "passed" 
                        ? '🎉 Excellent! You passed the exam!' 
                        : `❌ Need ${requiredToPass - correctAnswersCount} more correct answers to pass`}
                    </div>
                    {isUpdatingProgress && (
                      <div className="mt-4 text-sm text-gray-500">
                        Updating your progress...
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => setShowAnswers(true)}
                      className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Review Answers
                    </button>
                    <button
                      onClick={() => router.push("/dashboard")}
                      className="px-8 py-4 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Back to Dashboard
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Answer Review</h2>
                  
                  <div className="space-y-6 mb-8">
                    {questions.map((q, index) => {
                      const userAnswer = answers[q.id];
                      const isCorrect = q.correctOption === userAnswer;
                      
                      return (
                        <div
                          key={q.id}
                          className={`border-2 rounded-xl p-6 text-left ${
                            isCorrect 
                              ? 'border-green-200 bg-green-50' 
                              : 'border-red-200 bg-red-50'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <h4 className="text-lg font-semibold text-gray-900 flex-1">
                              {index + 1}. {q.questionText}
                            </h4>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              isCorrect 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {isCorrect ? 'Correct' : 'Incorrect'}
                            </span>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-2">Your Answer:</p>
                              <div className={`p-3 rounded-lg ${
                                isCorrect ? 'bg-green-100' : 'bg-red-100'
                              }`}>
                                {userAnswer ? (
                                  <span className="font-medium">
                                    {userAnswer}. {q[`option${userAnswer}`]}
                                  </span>
                                ) : (
                                  <span className="text-gray-500">Not answered</span>
                                )}
                              </div>
                            </div>
                            
                            {!isCorrect && q.correctOption && (
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Correct Answer:</p>
                                <div className="p-3 bg-green-100 rounded-lg">
                                  <span className="font-medium text-green-700">
                                    {q.correctOption}. {q[`option${q.correctOption}`]}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => router.push("/dashboard")}
                    className="w-full max-w-md mx-auto py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Return to Dashboard
                  </button>
                </>
              )}
            </motion.div>
          )}
        </div>
      </main>

      {/* Professional Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 text-gray-600 mb-2">
            <GraduationCap className="w-5 h-5" />
            <span className="font-semibold">ExamPortal Pro</span>
          </div>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Professional Assessment System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TestPage;