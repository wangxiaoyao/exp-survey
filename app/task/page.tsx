"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// 完整的40道实验题目
const experimentQuestions = [
  { cues: ["山", "海", "日"], answer: "上" },
  { cues: ["心", "绪", "头"], answer: "乱" },
  { cues: ["黑", "名", "人"], answer: "大" },
  { cues: ["花", "空", "讲"], answer: "话" },
  { cues: ["风", "空", "魂"], answer: "灵" },
  { cues: ["言", "花", "路"], answer: "说" },
  { cues: ["心", "金", "碎"], answer: "破" },
  { cues: ["力", "三", "角"], answer: "量" },
  { cues: ["生", "目", "点"], answer: "眼" },
  { cues: ["明", "言", "话"], answer: "白" },
  { cues: ["眼", "影", "门"], answer: "光" },
  { cues: ["力", "天", "运"], answer: "气" },
  { cues: ["水", "眼", "光"], answer: "泪" },
  { cues: ["口", "木", "目"], answer: "相" },
  { cues: ["雨", "木", "风"], answer: "林" },
  { cues: ["水", "月", "流"], answer: "河" },
  { cues: ["明", "知", "意"], answer: "心" },
  { cues: ["路", "手", "心"], answer: "指" },
  { cues: ["火", "力", "身"], answer: "炼" },
  { cues: ["中", "风", "动"], answer: "感" },
  { cues: ["生", "动", "神"], answer: "精" },
  { cues: ["方", "进", "路"], answer: "向" },
  { cues: ["口", "目", "心"], answer: "想" },
  { cues: ["手", "口", "意"], answer: "指" },
  { cues: ["天", "海", "情"], answer: "深" },
  { cues: ["空", "思", "路"], answer: "想" },
  { cues: ["音", "声", "调"], answer: "乐" },
  { cues: ["水", "石", "花"], answer: "晶" },
  { cues: ["风", "流", "思"], answer: "云" },
  { cues: ["度", "分", "秒"], answer: "时" },
  { cues: ["地", "心", "路"], answer: "方" },
  { cues: ["口", "音", "道"], answer: "说" },
  { cues: ["山", "水", "画"], answer: "风" },
  { cues: ["日", "青", "白"], answer: "明" },
  { cues: ["上", "下", "思"], answer: "心" },
  { cues: ["心", "手", "口"], answer: "意" },
  { cues: ["天", "地", "人"], answer: "间" },
  { cues: ["花", "月", "情"], answer: "爱" },
  { cues: ["水", "火", "风"], answer: "元" },
  { cues: ["高", "山", "远"], answer: "望" },
];

export default function Task() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(
    null
  );
  const [timeLeft, setTimeLeft] = useState(20); // 20秒回答时间
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showingFeedback, setShowingFeedback] = useState(false);

  const currentQuestion = experimentQuestions[currentQuestionIndex];

  // 计时器
  useEffect(() => {
    if (feedback !== null || isTransitioning || !currentQuestion) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setFeedback("incorrect");
          setShowingFeedback(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, feedback, isTransitioning, currentQuestion]);

  // 检查答案
  const checkAnswer = () => {
    if (
      userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase()
    ) {
      setFeedback("correct");
    } else {
      setFeedback("incorrect");
    }
    setShowingFeedback(true);
  };

  // 提交答案
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;
    checkAnswer();

    // 设置延迟跳转标志
    setIsTransitioning(true);

    // 1.5秒后跳转到下一题或完成页面
    setTimeout(() => {
      if (currentQuestionIndex < experimentQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setUserAnswer("");
        setFeedback(null);
        setShowingFeedback(false);
        setTimeLeft(20);
        setIsTransitioning(false);
      } else {
        // 所有题目完成后跳转到结束页面
        router.push("/surveypost");
      }
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-center mb-8">字谜实验任务</h1>

      <div className="mb-6 text-center">
        <p className="text-lg mb-2">
          题目 {currentQuestionIndex + 1} / {experimentQuestions.length}
        </p>
        <p className="text-md">
          剩余时间:{" "}
          <span className={`font-bold ${timeLeft < 10 ? "text-red-500" : ""}`}>
            {timeLeft}
          </span>{" "}
          秒
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          请找出与以下三个词都能组成有意义词组的一个字:
        </h2>

        <div className="flex justify-center gap-8 my-6">
          {currentQuestion?.cues.map((cue, index) => (
            <div
              key={index}
              className="text-3xl font-bold border-2 border-gray-300 rounded-md w-16 h-16 flex items-center justify-center"
            >
              {cue}
            </div>
          ))}
        </div>

        {!showingFeedback && !isTransitioning && (
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-4">
                <label htmlFor="answer" className="text-lg">
                  请输入答案：
                </label>
                <input
                  type="text"
                  id="answer"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="border border-gray-300 rounded-md px-4 py-2 text-xl text-center w-16 h-16"
                  maxLength={1}
                  autoFocus
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                提交答案
              </button>
            </div>
          </form>
        )}

        {(showingFeedback || isTransitioning) && (
          <div
            className={`
            mt-6 p-4 rounded-md text-center 
            ${
              feedback === "correct"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
            }`}
          >
            <p className="text-lg font-semibold mb-2">
              {feedback === "correct" ? "回答正确！" : "回答错误！"}
            </p>

            <p className="mb-2">
              {feedback === "correct"
                ? "系统将调整下一题的难度以匹配你的能力"
                : "系统将自动降低下一个题目的难度，帮助你继续进步"}
            </p>

            {feedback === "incorrect" && (
              <p className="mb-2">
                正确答案:{" "}
                <span className="font-bold">{currentQuestion.answer}</span>
              </p>
            )}

            <p className="text-sm mt-2 font-medium">正在跳转到下一题...</p>
          </div>
        )}
      </div>

      {/* 显示完成情况进度条 */}
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div
          className="bg-blue-600 h-full"
          style={{
            width: `${(currentQuestionIndex / experimentQuestions.length) * 100}%`,
          }}
        ></div>
      </div>
      <p className="text-center text-sm mt-2 text-gray-600">
        已完成: {currentQuestionIndex}/{experimentQuestions.length}
      </p>
    </div>
  );
}
