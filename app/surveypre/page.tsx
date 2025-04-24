"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SurveyPre() {
  const router = useRouter();
  const [group, setGroup] = useState<"experimental" | "control" | null>(null);
  const [rating1, setRating1] = useState("");
  const [rating2, setRating2] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    // 随机分配用户到实验组或对照组
    // 在实际应用中，这应该在服务器端完成
    const assigned = Math.random() < 0.5 ? "experimental" : "control";
    setGroup(assigned);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 验证所有字段是否已填写
    if (!rating1 || !rating2) {
      setFormError("请完成所有评分项 / Please complete all rating items");
      return;
    }

    // 将用户选择存储在会话存储中
    sessionStorage.setItem(
      "userSurveyPre",
      JSON.stringify({
        group,
        rating1,
        rating2,
      }),
    );

    // 提交后跳转到 tasktest 页面
    router.push("/tasktest");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">
        实验分组信息 / Group Assignment
      </h1>

      <p className="text-xl font-semibold text-center mb-6">
        你被分配到：{group === "experimental" ? "实验组" : "控制组"}
      </p>

      {group === "control" && (
        <div className="mb-8">
          <p className="mb-6 text-lg">
            亲爱的参与者，感谢您参与本次字谜任务实验。在这个实验中，您的任务是解决一系列字谜问题。为了保证实验的公正性，所有参与者的任务难度是固定的，与您的表现无关。无论您答对或答错，任务的难度都不会发生变化。我们希望您尽量在规定的时间内完成任务，享受这个过程，并尝试提升自己解谜的能力。祝您好运！
          </p>
        </div>
      )}

      {group === "experimental" && (
        <div className="mb-8">
          <p className="mb-4 text-lg">
            亲爱的参与者，感谢您参与本次字谜任务实验。在这个实验中，我们接入了一种AI辅助的自适应系统，它会根据您在任务中的表现来调整难度。如果您回答正确，系统会逐渐增加任务的挑战性，以帮你不断提升解决字谜的能力；如果您回答错误，系统将适当降低难度，以确保您能够顺利完成任务，避免过度挑战给您带来压力。
          </p>
          <p className="mb-4 text-lg">
            本实验的意义在于通过您的参与和反馈，帮助我们进一步优化和提升这一AI辅助自适应系统在实际应用中的表现。通过让系统根据每位参与者的表现同台调整任务难度，我们能够更好地理解不同用户的需求，从而改进系统的智能性和个性化算法。这不仅有助于提升参与者的体验，同时也为未来的系统优化提供了宝贵的数据和反馈。
          </p>
          <p className="mb-4 text-lg">
            接入自适应系统的是为了让每一位参与者都能够在最佳的挑战水平下进行实验，最大程度地保持任务的趣味性和参与感。无论您的表现如何，系统都会根据您的实际情况调整任务内容，让您始终感受到适合自己的挑战。请尽力发挥自己的最佳水平，享受这个过程，祝您体验愉快，挑战成功！
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 mt-8">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">
            You are in the group where the words puzzles are adjusted by your
            task performance. Do you think you will do better compared to the
            other groups?
            <br />
            您所在的小组的字谜题目会根据您的任务表现进行调整，您认为自己在实验中会比其他组做得更好吗？
          </h2>
          <p className="mb-2">1 - 完全不同意, 7 - 完全同意</p>
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4, 5, 6, 7].map((value) => (
              <label
                key={value}
                className="flex flex-col items-center cursor-pointer"
              >
                <input
                  type="radio"
                  name="rating1"
                  value={value}
                  checked={rating1 === value.toString()}
                  onChange={() => setRating1(value.toString())}
                  className="h-4 w-4 mb-1"
                />
                <span>{value}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-4 mt-8">
          <h2 className="text-xl font-bold">
            Do you think the difficulty the puzzles will change as you answer
            more questions correctly or incorrectly?
            <br />
            您认为字谜题目的难度会随着您答对或答错题目而发生变化吗？
          </h2>
          <p className="mb-2">1 - 完全不同意, 7 - 完全同意</p>
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4, 5, 6, 7].map((value) => (
              <label
                key={value}
                className="flex flex-col items-center cursor-pointer"
              >
                <input
                  type="radio"
                  name="rating2"
                  value={value}
                  checked={rating2 === value.toString()}
                  onChange={() => setRating2(value.toString())}
                  className="h-4 w-4 mb-1"
                />
                <span>{value}</span>
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
            提交 / Submit
          </button>
        </div>
      </form>
    </div>
  );
}
