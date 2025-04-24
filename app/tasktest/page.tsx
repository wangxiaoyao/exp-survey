"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// 示例练习题
const practiceQuestions = [
  {
    cues: ["菜", "包", "烧"],
    answer: "香",
    hint: "这个词能与'菜'、'包'、'烧'分别组成'香菜'、'香包'和'烧香'",
  },
  {
    cues: ["大", "心", "肚"],
    answer: "小",
    hint: "这个词能与'大'、'心'、'肚'分别组成'大小'、'小心'和'小肚'",
  },
];

export default function TaskTest() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(
    null
  );
  const [timeLeft, setTimeLeft] = useState(30); // 30秒回答时间
  const [allCompleted, setAllCompleted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentQuestion = practiceQuestions[currentQuestionIndex];

  // 计时器
  useEffect(() => {
    if (feedback !== null || allCompleted || isTransitioning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setFeedback("incorrect");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, feedback, allCompleted, isTransitioning]);

  // 检查答案
  const checkAnswer = () => {
    if (
      userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase()
    ) {
      setFeedback("correct");
    } else {
      setFeedback("incorrect");
    }
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
      if (currentQuestionIndex < practiceQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setUserAnswer("");
        setFeedback(null);
        setTimeLeft(30);
        setIsTransitioning(false);
      } else {
        setAllCompleted(true);
      }
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {!allCompleted ? (
        <>
          <h1 className="text-3xl font-bold text-center mb-8">
            练习题 / Practice Questions
          </h1>

          <div className="mb-8 text-lg">
            <p className="mb-4">亲爱的同学，感谢您参与本次联想任务实验！</p>

            <p className="mb-4">
              在这个实验中，您将需要通过三个没有关系的汉字，找到一个能与它们都组合成真实词语的目标汉字。每个题目会给出三个汉字，您的任务是根据这三个汉字找到一个可以组合成三个有意义词组的答案。
            </p>

            <p className="mb-4">
              例如，给定&quot;菜&quot;、&quot;包&quot;、&quot;烧&quot;这三个汉字，您需要想出一个汉字，例如&quot;香&quot;能够与这三个词一起组成像&quot;香菜&quot;、&quot;香包&quot;和&quot;烧香&quot;这样的词组。
            </p>

            <p className="mb-4">
              每个题目有时间限制，通常是20秒或30秒，请在时间内作答。
            </p>

            <p className="mb-4">
              <strong>异音词提醒</strong>：
              请注意，某些题目会包含&quot;异音词&quot;，这些词有可能有多个发音或者多个意思。在遇到这种情况时，请考虑每个词的不同发音或意思，看看能否找到符合题意的答案。例如，&quot;乐&quot;字在&quot;乐观&quot;和&quot;音乐&quot;中的发音和意义不同，您需要特别注意这一点。
            </p>

            <p className="mb-4">
              在实验正式开始前，您会先完成以下两道练习题，帮助您更好适应任务以及增加对实验的理解。
            </p>
          </div>

          <div className="mb-6 text-center">
            <p className="text-lg mb-2">
              练习题 {currentQuestionIndex + 1} / {practiceQuestions.length}
            </p>
            <p className="text-md">
              剩余时间:{" "}
              <span
                className={`font-bold ${timeLeft < 10 ? "text-red-500" : ""}`}
              >
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
              {currentQuestion.cues.map((cue, index) => (
                <div
                  key={index}
                  className="text-3xl font-bold border-2 border-gray-300 rounded-md w-16 h-16 flex items-center justify-center"
                >
                  {cue}
                </div>
              ))}
            </div>

            {!feedback && !isTransitioning && (
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

            {(feedback || isTransitioning) && (
              <div
                className={`
                 mt-6 p-4 rounded-md text-center 
                 ${
                   feedback === "correct"
                     ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                     : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                 }`}
              >
                <p className="text-lg font-semibold">
                  {feedback === "correct" ? "回答正确！" : "回答错误！"}
                </p>
                {feedback === "incorrect" && (
                  <p>
                    正确答案:{" "}
                    <span className="font-bold">{currentQuestion.answer}</span>
                  </p>
                )}
                <p className="text-sm mt-2 font-medium">正在跳转到下一题...</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">
            练习完成！/ Practice Completed!
          </h1>
          <p className="text-lg mb-8">
            您已完成所有练习题。现在您可以继续进行下一步。
          </p>
          <button
            onClick={() => router.push("/finish_test")}
            className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition font-bold"
          >
            继续 / Continue
          </button>
        </div>
      )}
    </div>
  );
}
