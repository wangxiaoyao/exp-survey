'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ResponseData } from '@/types';
export default function SurveyPost() {
  const router = useRouter();
  const [difficultyPerception, setDifficultyPerception] = useState('');
  const [performanceComparison, setPerformanceComparison] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 验证所有字段是否已填写
    if (!difficultyPerception || !performanceComparison) {
      setFormError('请完成所有评分项 / Please complete all rating items');
      return;
    }

    // 将用户选择存储在会话存储中
    localStorage.setItem(
      'survey-post',
      JSON.stringify({
        difficultyPerception,
        performanceComparison,
        timestamp: new Date().toISOString(),
      }),
    );

    // 收集所有的页面的数据：
    const fullData = {
      ...JSON.parse(localStorage.getItem('survey-demographics') || '{}'),
      ...JSON.parse(localStorage.getItem('survey-pre') || '{}'),
      ...JSON.parse(localStorage.getItem('survey-post') || '{}'),
      ...JSON.parse(localStorage.getItem('survey-taskLog') || '[]'),
    };

    const result = await fetch('/api/save', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fullData),
    });

    const response: ResponseData = await result.json();
    if (response.success) {
      alert('提交成功 / Submission successful');
      setTimeout(() => {
        router.push('/finish');
      }, 1000);
    } else {
      setFormError('提交失败 / Submission failed');
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">感谢您的参与！请回答以下问题：</h1>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">
            1. 您是否注意到字谜的难度根据您的答题情况而有所变化？
          </h2>
          <p className="mb-3">1 - 完全不同意, 7 - 完全同意</p>
          <div className="mx-auto flex max-w-md items-center justify-between">
            {[1, 2, 3, 4, 5, 6, 7].map((value) => (
              <label key={value} className="flex cursor-pointer flex-col items-center">
                <input
                  type="radio"
                  name="difficultyPerception"
                  value={value}
                  checked={difficultyPerception === value.toString()}
                  onChange={() => setDifficultyPerception(value.toString())}
                  className="mb-1 h-5 w-5"
                />
                <span className="text-lg">{value}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">2. 您认为自己在完成任务时，比其他组的表现更好吗？</h2>
          <p className="mb-3">1 - 完全不同意, 7 - 完全同意</p>
          <div className="mx-auto flex max-w-md items-center justify-between">
            {[1, 2, 3, 4, 5, 6, 7].map((value) => (
              <label key={value} className="flex cursor-pointer flex-col items-center">
                <input
                  type="radio"
                  name="performanceComparison"
                  value={value}
                  checked={performanceComparison === value.toString()}
                  onChange={() => setPerformanceComparison(value.toString())}
                  className="mb-1 h-5 w-5"
                />
                <span className="text-lg">{value}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 错误信息 */}
        {formError && (
          <div className="mt-4 text-center font-semibold text-red-500">{formError}</div>
        )}

        {/* 提交按钮 */}
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-8 py-3 font-bold text-white transition hover:bg-blue-700"
          >
            提交
          </button>
        </div>
      </form>
    </div>
  );
}
