'use client';

import { useEffect, useState } from 'react';

export default function Disagree() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Set a timer to close the window after 5 seconds
    const timer = setTimeout(() => {
      window.close();
    }, 5000);

    // Update countdown every second
    const countdownInterval = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, []);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 text-center">
      <h1 className="mb-8 text-3xl font-bold">感谢您的参与</h1>
      <p className="mb-4 text-lg">我们很遗憾您选择退出，感谢您的时间和配合。</p>
      <p className="mb-8 text-lg">如果您有任何问题，欢迎随时联系我们。</p>
      <p className="mb-4 text-lg">Thank you for your consideration.</p>
      <p className="mt-4 text-lg">
        页面将在 {countdown} 秒后关闭。如果未自动关闭，请手动关闭此窗口。
      </p>
      <div className="mt-6">
        <span className="inline-block rounded-full bg-gray-200 px-5 py-3 text-xl font-bold text-gray-800 dark:bg-gray-700 dark:text-gray-200">
          {countdown}
        </span>
      </div>
    </div>
  );
}
