'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const practiceQuestions = [
  {
    cues: ['牌', '现', '钱'],
    answer: '金',
    hint: "这个词能与'牌'、'现'、'钱'分别组成'金牌'、'现金'和'金钱'",
  },
  {
    cues: ['黑', '具', '德'],
    answer: '道',
    hint: "这个词能与'黑'、'具'、'德'分别组成'道具'、'德道'和'黑道'",
  },
];

export default function TaskTest() {
  const router = useRouter();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [allCompleted, setAllCompleted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [readyForNext, setReadyForNext] = useState(false); // ✅ 关键状态

  const currentQuestion = practiceQuestions[currentQuestionIndex];

  // ✅ 统一控制题目切换（确保 useEffect 被触发）
  useEffect(() => {
    if (readyForNext) {
      if (currentQuestionIndex < practiceQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setUserAnswer('');
        setFeedback(null);
        setTimeLeft(30);
        setIsTransitioning(false);
        setReadyForNext(false); // ✅ 重置
      } else {
        setAllCompleted(true);
        setReadyForNext(false);
      }
    }
  }, [readyForNext]);

  // ✅ 倒计时逻辑
  useEffect(() => {
    if (!currentQuestion || feedback !== null || allCompleted || isTransitioning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setFeedback('incorrect');
          delayedNext(); // ⏱️ 时间到也跳转
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, feedback, allCompleted, isTransitioning]);

  // ✅ 统一延迟跳题
  const delayedNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setReadyForNext(true);
    }, 1500);
  };

  const checkAnswer = () => {
    if (userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase()) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;
    checkAnswer();
    delayedNext();
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {!allCompleted ? (
        <>
          <h1 className="mb-8 text-center text-3xl font-bold">练习题 / Practice Questions</h1>

          <div className="mb-8 text-lg">
            <p className="mb-4">
              在这个实验中，您需要通过三个汉字找到一个能与它们组成词语的目标字。
            </p>
            <p className="mb-4">每题限时 30 秒，注意多音字和词义的变化。</p>
          </div>

          <div className="mb-6 text-center">
            <p className="mb-2 text-lg">
              练习题 {currentQuestionIndex + 1} / {practiceQuestions.length}
            </p>
            <p className="text-md">
              剩余时间:{' '}
              <span className={`font-bold ${timeLeft < 10 ? 'text-red-500' : ''}`}>{timeLeft}</span>{' '}
              秒
            </p>
          </div>

          <div className="mb-8 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold">请找出与以下三个词都能组成词组的一个字：</h2>

            <div className="my-6 flex justify-center gap-8">
              {currentQuestion?.cues?.map((cue, index) => (
                <div
                  key={index}
                  className="flex h-16 w-16 items-center justify-center rounded-md border-2 border-gray-300 text-3xl font-bold"
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
                      className="h-16 w-16 rounded-md border border-gray-300 px-4 py-2 text-center text-xl"
                      maxLength={1}
                      autoFocus
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-md bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
                  >
                    提交答案
                  </button>
                </div>
              </form>
            )}

            {(feedback || isTransitioning) && (
              <div
                className={`mt-6 rounded-md p-4 text-center ${
                  feedback === 'correct'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                }`}
              >
                <p className="text-lg font-semibold">
                  {feedback === 'correct' ? '回答正确！' : '回答错误！'}
                </p>
                {feedback === 'incorrect' && (
                  <p>
                    正确答案: <span className="font-bold">{currentQuestion?.answer}</span>
                  </p>
                )}
                <p className="mt-2 text-sm font-medium">正在跳转到下一题...</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-center">
          <h1 className="mb-6 text-3xl font-bold">练习完成！/ Practice Completed!</h1>
          <p className="mb-8 text-lg">您已完成所有练习题。现在可以继续进入实验。</p>
          <button
            onClick={() => router.push('/finish_test')}
            className="rounded-md bg-green-600 px-8 py-3 font-bold text-white transition hover:bg-green-700"
          >
            继续 / Continue
          </button>
        </div>
      )}
    </div>
  );
}
