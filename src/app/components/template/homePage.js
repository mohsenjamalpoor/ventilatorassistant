"use client";

import { useState } from "react";
import toast from "react-hot-toast";

function HomePage() {
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!weight || !age) {
      toast.error("لطفا همه‌ی فیلدها را تکمیل کنید.");
      return;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-cyan-100 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* هدر */}
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
              />
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
