"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SurveyPost() {
  const router = useRouter();
  const [difficultyPerception, setDifficultyPerception] = useState("");
  const [performanceComparison, setPerformanceComparison] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 验证所有字段是否已填写
    if (!difficultyPerception || !performanceComparison) {
      setFormError("请完成所有评分项 / Please complete all rating items");
      return;
    }

    // 将用户选择存储在会话存储中
    sessionStorage.setItem(
      "userSurveyPost",
      JSON.stringify({
        difficultyPerception,
        performanceComparison,
        timestamp: new Date().toISOString(),
      })
    );

    // 提交后跳转到完成页面
    router.push("/finish");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">
        感谢您的参与！请回答以下问题：
      </h1>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">
            1. 您是否注意到字谜的难度根据您的答题情况而有所变化？
          </h2>
          <p className="mb-3">1 - 完全不同意, 7 - 完全同意</p>
          <div className="flex justify-between items-center max-w-md mx-auto">
            {[1, 2, 3, 4, 5, 6, 7].map((value) => (
              <label
                key={value}
                className="flex flex-col items-center cursor-pointer"
              >
                <input
                  type="radio"
                  name="difficultyPerception"
                  value={value}
                  checked={difficultyPerception === value.toString()}
                  onChange={() => setDifficultyPerception(value.toString())}
                  className="h-5 w-5 mb-1"
                />
                <span className="text-lg">{value}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">
            2. 您认为自己在完成任务时，比其他组的表现更好吗？
          </h2>
          <p className="mb-3">1 - 完全不同意, 7 - 完全同意</p>
          <div className="flex justify-between items-center max-w-md mx-auto">
            {[1, 2, 3, 4, 5, 6, 7].map((value) => (
              <label
                key={value}
                className="flex flex-col items-center cursor-pointer"
              >
                <input
                  type="radio"
                  name="performanceComparison"
                  value={value}
                  checked={performanceComparison === value.toString()}
                  onChange={() => setPerformanceComparison(value.toString())}
                  className="h-5 w-5 mb-1"
                />
                <span className="text-lg">{value}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 错误信息 */}
        {formError && (
          <div className="text-red-500 text-center font-semibold mt-4">
            {formError}
          </div>
        )}

        {/* 提交按钮 */}
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-bold"
          >
            提交
          </button>
        </div>
      </form>
    </div>
  );
}
