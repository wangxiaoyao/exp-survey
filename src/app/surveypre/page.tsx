'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SurveyPre() {
  const router = useRouter();
  const [group, setGroup] = useState<'experimental' | 'control' | null>(null);
  const [rating1, setRating1] = useState('');
  const [rating2, setRating2] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    // 随机分配用户到实验组或对照组
    // 在实际应用中，这应该在服务器端完成
    const assigned = Math.random() < 0.5 ? 'experimental' : 'control';
    setGroup(assigned);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 验证所有字段是否已填写
    if (!rating1 || !rating2) {
      setFormError('请完成所有评分项 / Please complete all rating items');
      return;
    }

    // 将用户选择存储在会话存储中
    localStorage.setItem(
      'survey-pre',
      JSON.stringify({
        group,
        rating1,
        rating2,
      }),
    );

    // 提交后跳转到 tasktest 页面
    router.push('/tasktest');
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">实验分组信息 / Group Assignment</h1>

      <p className="mb-6 text-center text-xl font-semibold">
        你被分配到：{group === 'experimental' ? '实验组' : '控制组'}
      </p>

      {group === 'control' && (
        <div className="mb-8">
          <p className="mb-6 text-lg">
            亲爱的参与者，感谢您参与本次字谜任务实验。在这个实验中，您的任务是解决一系列字谜问题。为了保证实验的公正性，所有参与者的任务难度是固定的，与您的表现无关。无论您答对或答错，任务的难度都不会发生变化。我们希望您尽量在规定的时间内完成任务，享受这个过程，并尝试提升自己解谜的能力。祝您好运！
          </p>
        </div>
      )}

      {group === 'experimental' && (
        <div className="mb-8">
          <p className="mb-4 text-lg font-bold">亲爱的参与者，感谢您参与本次字谜实验！</p>
          <p className="mb-4 text-lg">
            在这个实验中，我们引入了一种
            <strong>先进的 AI辅助的自适应系统</strong>，该系统巧妙地利用
            <strong>机器学习技术 (Machine Learning)</strong>
            根据您的实时表现智能地调整任务的难度。机器学习技术是一种通过分析数据，让计算机自主学习并做出预测或决策的技术。系统通过机器学习算法分析您的答题情况，逐步优化题目的挑战程度，为您提供一个既有趣又具有挑战性的体验。
          </p>
          <p className="mb-4 text-lg">
            具体来说，
            <u>如果您的回答正确，系统会自动增加难度，提供更具挑战性的题目，</u>
            帮助您持续提升解决问题的能力；
            <u>如果您的回答错误，系统会根据您的表现适当降低任务难度，</u>
            确保任务始终处于适合您的水平，让您顺利完成任务并获得成就感。
          </p>
          <p className="mb-4 text-lg font-bold">为什么使用机器学习技术？</p>
          <p className="mb-4 text-lg">
            本实验的核心目的是通过您在任务中的表现和反馈，帮助我们进一步优化和提升这一
            AI自适应系统。机器学习技术使得系统能够根据您的实际表现实时调整任务的难度，而无需人工干预。通过收集每个参与者的数据，系统能够更加智能地分析不同用户的需求，进而优化难度调整的算法，提供个性化的体验。这样，系统不仅能为您提供一个动态的、与您能力匹配的挑战，还能帮助我们改进算法，提升整个系统的表现。
          </p>
          <p className="mb-4 text-lg">
            简而言之，机器学习算法使得这个自适应系统能够根据您的每次表现做出实时反应，确保您始终面临一个既能激发兴趣又不会让您感到过于困难的任务。无论您的表现如何，系统都会根据您的实际情况调整任务内容，确保您始终感受到适合自己的挑战。
          </p>
          <p className="mb-4 text-lg">
            请尽力发挥自己的最佳水平，享受这个过程，祝您体验愉快，挑战成功！
          </p>
        </div>
      )}

      <div className="my-8 border-t border-gray-300"></div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">
            You are in the group where the words puzzles are adjusted by your task performance. Do
            you think you will do better compared to the other groups?
            <br />
            您所在的小组的字谜题目会根据您的任务表现进行调整，您认为自己在实验中会比其他组做得更好吗？
          </h2>
          <p className="mb-2">1 - 完全不同意, 7 - 完全同意</p>
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5, 6, 7].map((value) => (
              <label key={value} className="flex cursor-pointer flex-col items-center">
                <input
                  type="radio"
                  name="rating1"
                  value={value}
                  checked={rating1 === value.toString()}
                  onChange={() => setRating1(value.toString())}
                  className="mb-1 h-4 w-4"
                />
                <span>{value}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-bold">
            Do you think the difficulty the puzzles will change as you answer more questions
            correctly or incorrectly?
            <br />
            您认为字谜题目的难度会随着您答对或答错题目而发生变化吗？
          </h2>
          <p className="mb-2">1 - 完全不同意, 7 - 完全同意</p>
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5, 6, 7].map((value) => (
              <label key={value} className="flex cursor-pointer flex-col items-center">
                <input
                  type="radio"
                  name="rating2"
                  value={value}
                  checked={rating2 === value.toString()}
                  onChange={() => setRating2(value.toString())}
                  className="mb-1 h-4 w-4"
                />
                <span>{value}</span>
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
            提交 / Submit
          </button>
        </div>
      </form>
    </div>
  );
}
