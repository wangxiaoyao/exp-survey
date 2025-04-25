'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Population() {
  const router = useRouter();
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [school, setSchool] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 验证所有字段是否已填写
    if (!gender || !age || !school) {
      setFormError('请完成所有必填项 / Please complete all required fields');
      return;
    }

    // 将用户选择存储在会话存储中，以便在其他页面可以使用
    localStorage.setItem(
      'survey-demographics',
      JSON.stringify({
        gender,
        age,
        school,
      }),
    );

    // 提交后跳转到 surveypre 页面
    router.push('/surveypre');
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">人口统计信息 / Demographics</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 性别选择 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">性别 / Gender</h2>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === 'male'}
                onChange={(e) => setGender(e.target.value)}
                className="h-5 w-5"
              />
              <span>男 / Male</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={(e) => setGender(e.target.value)}
                className="h-5 w-5"
              />
              <span>女 / Female</span>
            </label>
          </div>
        </div>

        {/* 年龄选择 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">年龄 / Age</h2>
          <select
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
          >
            <option value="">请选择 / Please select</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="25+">25及以上 / 25 and above</option>
          </select>
        </div>

        {/* 学校选择 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">学校 / School</h2>
          <select
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
          >
            <option value="">请选择 / Please select</option>
            <option value="温州肯恩大学">温州肯恩大学 / Wenzhou-Kean University</option>
            <option value="温州大学">温州大学 / Wenzhou University</option>
            <option value="温州医科大学">温州医科大学 / Wenzhou Medical University</option>
            <option value="浙江工贸职业技术学院">
              浙江工贸职业技术学院 / Zhejiang Industry & Trade Vocational College
            </option>
            <option value="其他">其他 / Other</option>
          </select>
        </div>

        {/* 错误信息 */}
        {formError && <div className="text-center font-semibold text-red-500">{formError}</div>}

        {/* 提交按钮 */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-8 py-3 font-bold text-white transition hover:bg-blue-700"
          >
            继续 / Continue
          </button>
        </div>
      </form>
    </div>
  );
}
