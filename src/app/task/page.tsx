'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 完整的40道实验题目
const experimentQuestions = [
  { cues: ['亮', '照', '星'], answer: '明' },
  { cues: ['代', '童', '级'], answer: '年' },
  // { cues: ['倒', '超', '票'], answer: '车' },
  // { cues: ['刻', '光', '临'], answer: '时' },
  // { cues: ['升', '问', '费'], answer: '学' },
  // { cues: ['印', '园', '费'], answer: '花' },
  // { cues: ['原', '清', '超'], answer: '高' },
  // { cues: ['酒', '选', '发'], answer: '美' },
  // { cues: ['员', '计', '体'], answer: '会' },
  // { cues: ['问', '案', '应'], answer: '答' },
  // { cues: ['夜', '接', '断'], answer: '间' },
  // { cues: ['奇', '转', '喜'], answer: '好' },
  // { cues: ['存', '女', '写'], answer: '生' },
  // { cues: ['导', '费', '表'], answer: '电' },
  // { cues: ['展', '改', '度'], answer: '进' },
  // { cues: ['等', '架', '流'], answer: '上' },
  // { cues: ['建', '新', '趣'], answer: '兴' },
  // { cues: ['得', '逃', '过'], answer: '难' },
  // { cues: ['播', '导', '得'], answer: '主' },
  // { cues: ['政', '通', '善'], answer: '变' },
  // { cues: ['数', '女', '减'], answer: '少' },
  // { cues: ['书', '试', '表'], answer: '面' },
  // { cues: ['期', '落', '善'], answer: '后' },
  // { cues: ['条', '原', '压'], answer: '油' },
  // { cues: ['歌', '友', '养'], answer: '老' },
  // { cues: ['求', '物', '词'], answer: '证' },
  // { cues: ['流', '掉', '平'], answer: '放' },
  // { cues: ['火', '落', '指'], answer: '点' },
  // { cues: ['无', '报', '节'], answer: '情' },
  // { cues: ['留', '图', '随'], answer: '意' },
  // { cues: ['异', '格', '感'], answer: '性' },
  // { cues: ['当', '宜', '轻'], answer: '便' },
  // { cues: ['缘', '先', '内'], answer: '人' },
  // { cues: ['考', '产', '测'], answer: '量' },
  // { cues: ['航', '产', '运'], answer: '海' },
  // { cues: ['间', '观', '守'], answer: '看' },
  // { cues: ['解', '原', '论'], answer: '理' },
  // { cues: ['解', '服', '听'], answer: '说' },
  // { cues: ['通', '业', '李'], answer: '行' },
  // { cues: ['速', '语', '见'], answer: '成' },
];

export default function Task() {
  const router = useRouter();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showingFeedback, setShowingFeedback] = useState(false);
  const [readyForNext, setReadyForNext] = useState(false);

  const [, setTaskLog] = useState<
    { cues: string[]; expected: string; answer: string; correct: boolean }[]
  >(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('survey-taskLog');
    return saved ? JSON.parse(saved) : [];
  });

  const currentQuestion = experimentQuestions[currentQuestionIndex];

  useEffect(() => {
    if (readyForNext) {
      if (currentQuestionIndex < experimentQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setUserAnswer('');
        setFeedback(null);
        setTimeLeft(30);
        setIsTransitioning(false);
        setShowingFeedback(false);
        setReadyForNext(false);
      } else {
        router.push('/surveypost');
      }
    }
  }, [readyForNext]);

  useEffect(() => {
    if (feedback !== null || isTransitioning || !currentQuestion) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setFeedback('incorrect');
          setShowingFeedback(true);
          delayedNext();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, feedback, isTransitioning]);

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
    setShowingFeedback(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;
    // 记录用户答题记录
    const correct = userAnswer.trim() === currentQuestion.answer;
    setTaskLog((prev) => {
      const updated = [
        ...prev,
        {
          cues: currentQuestion.cues,
          expected: currentQuestion.answer,
          answer: userAnswer.trim(),
          correct,
        },
      ];
      localStorage.setItem('survey-taskLog', JSON.stringify(updated));
      return updated;
    });

    checkAnswer();
    delayedNext();
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">字谜实验任务</h1>

      <div className="mb-6 text-center">
        <p className="mb-2 text-lg">
          题目 {currentQuestionIndex + 1} / {experimentQuestions.length}
        </p>
        <p className="text-md">
          剩余时间:{' '}
          <span className={`font-bold ${timeLeft < 10 ? 'text-red-500' : ''}`}>{timeLeft}</span> 秒
        </p>
      </div>

      <div className="mb-8 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold">
          请找出与以下三个词都能组成有意义词组的一个字:
        </h2>

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

        {(showingFeedback || isTransitioning) && (
          <div
            className={`mt-6 rounded-md p-4 text-center ${
              feedback === 'correct'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
            }`}
          >
            <p className="mb-2 text-lg font-semibold">
              {feedback === 'correct' ? '回答正确！' : '回答错误！'}
            </p>

            <p className="mb-2">
              {feedback === 'correct'
                ? '系统将调整下一题的难度以匹配你的能力'
                : '系统将自动降低下一个题目的难度，帮助你继续进步'}
            </p>

            {feedback === 'incorrect' && (
              <p className="mb-2">
                正确答案: <span className="font-bold">{currentQuestion?.answer || ''}</span>
              </p>
            )}

            <p className="mt-2 text-sm font-medium">正在跳转到下一题...</p>
          </div>
        )}
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full bg-blue-600"
          style={{
            width: `${(currentQuestionIndex / experimentQuestions.length) * 100}%`,
          }}
        ></div>
      </div>
      <p className="mt-2 text-center text-sm text-gray-600">
        已完成: {currentQuestionIndex}/{experimentQuestions.length}
      </p>
    </div>
  );
}
