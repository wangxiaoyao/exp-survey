'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function FinishTest() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const [autoRedirect, setAutoRedirect] = useState(true);

  // 5秒倒计时后自动跳转
  useEffect(() => {
    if (!autoRedirect) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/task');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [autoRedirect, router]);

  const handleSkipCountdown = () => {
    setAutoRedirect(false);
    router.push('/task');
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 text-center">
      <h1 className="mb-8 text-3xl font-bold">练习完成 / Practice Completed</h1>

      <div className="mb-8 text-lg">
        <p className="mb-6">您已经完成了所有的练习题！非常感谢您的参与。</p>
        <p className="mb-6">
          现在，您已经了解了实验的基本流程和任务要求。在正式实验中，您将面对更多类似的字谜任务。请记住，您的目标是找出与给定的三个汉字都能组成有意义词组的一个字。
        </p>
        <p className="mb-6">正式实验即将开始，请集中注意力，尽力完成每一道题目。</p>

        {autoRedirect && (
          <div className="mt-8">
            <p className="mb-2 text-lg">
              将在 <span className="text-xl font-bold">{countdown}</span> 秒后自动开始实验...
            </p>
            <button
              onClick={handleSkipCountdown}
              className="mt-4 rounded-md bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
            >
              立即开始 / Start Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
