"use client";

import {
  NORMAL_CONDITIONS,
  OBSTRUCTIVE_DISEASES,
  RESTRICTIVE_DISEASES,
} from "@/utils/lungInvolvement";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function HomePage() {
  const router = useRouter();

  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [lungInvolvement, setLungInvolvement] = useState("");
  const [normalLungCondition, setNormalLungCondition] = useState("");
  const [obstructiveDisease, setObstructiveDisease] = useState("");
  const [restrictiveDisease, setRestrictiveDisease] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!weight || !age || !lungInvolvement) {
      toast.error("لطفا همه‌ی فیلدها را تکمیل کنید.");
      return;
    }
    if (Number(weight) <= 0) {
      toast.error("وزن وارد شده معتبر نیست.");
      return;
    }
    if (Number(age) <= 0) {
      toast.error("سن وارد شده معتبر نیست.");
      return;
    }

    const params = new URLSearchParams({
      weight,
      age,
      lungInvolvement,
      ...(normalLungCondition && { normalLungCondition }),
      ...(obstructiveDisease && { obstructiveDisease }),
      ...(restrictiveDisease && { restrictiveDisease }),
    });

    router.push(`/ventilatortraining/setup?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-cyan-100 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-linear-to-r from-blue-600 to-cyan-600 p-6 text-white text-center">
          <h1 className="text-2xl font-bold mb-2"> دستیار ونتیلاتور</h1>
          <p className="text-blue-100">لطفا اطلاعات بیمار را وارد کنید</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="weight"
              >
                وزن بیمار (کیلوگرم)
              </label>
              <input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg text-left focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-200"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                سن بیمار
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg text-left focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-200"
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="lungInvolvement"
              >
                نوع درگیری ریوی
              </label>
              <select
                id="lungInvolvement"
                value={lungInvolvement}
                onChange={(e) => {
                  setLungInvolvement(e.target.value);
                  setNormalLungCondition("");
                  setObstructiveDisease("");
                  setRestrictiveDisease("");
                }}
                className="w-full px-4 py-3 border rounded-lg text-right focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-200"
              >
                <option value="">لطفا نوع درگیری ریوی را انتخاب کنید</option>
                <option value="normal">ریه نرمال</option>
                <option value="obstructive">Obstructive</option>
                <option value="restrictive">Restrictive</option>
              </select>

              {lungInvolvement === "normal" && (
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="obstructiveDisease"
                  >
                    بیماری ریه نرمال
                  </label>
                  <select
                    id="obstructiveDisease"
                    value={obstructiveDisease}
                    onChange={(e) => setObstructiveDisease(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg text-right focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-200"
                  >
                    <option value="">
                      لطفا بیماری ریه نرمال را انتخاب کنید
                    </option>
                    {NORMAL_CONDITIONS.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {lungInvolvement === "obstructive" && (
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="obstructiveDisease"
                  >
                    بیماری انسدادی
                  </label>
                  <select
                    id="obstructiveDisease"
                    value={obstructiveDisease}
                    onChange={(e) => setObstructiveDisease(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg text-right focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-200"
                  >
                    <option value="">لطفا بیماری انسدادی را انتخاب کنید</option>
                    {OBSTRUCTIVE_DISEASES.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {lungInvolvement === "restrictive" && (
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="restrictiveDisease"
                  >
                    بیماری Restrictive
                  </label>
                  <select
                    id="restrictiveDisease"
                    value={restrictiveDisease}
                    onChange={(e) => setRestrictiveDisease(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg text-right focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-200"
                  >
                    <option value="">
                      لطفا بیماری Restrictive را انتخاب کنید{" "}
                    </option>
                    {RESTRICTIVE_DISEASES.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-linear-to-r from-blue-600 to-cyan-600 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition active:scale-[0.98]"
          >
            شروع
          </button>
        </form>
      </div>
    </div>
  );
}

export default HomePage;
