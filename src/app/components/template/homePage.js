"use client";

import { useState } from "react";
import toast from "react-hot-toast";

function HomePage() {
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [lungInvolvement, setLungInvolvement] = useState("");
  const [normalLungCondition, setNormalLungCondition] = useState("");
  const [obstructiveDisease, setObstructiveDisease] = useState("");
  const [restrictiveDisease, setRestrictiveDisease] = useState("");

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
              >
                <option value="">لطفا نوع درگیری ریوی را انتخاب کنید</option>
                <option value="normal">ریه نرمال</option>
                <option value="obstructive">Obstructive</option>
                <option value="restrictive">Restrictive</option>
                {/* <option value="mixed">ترکیبی (Mixed)</option> */}
                {/* <option value="none">بدون درگیری ریوی</option> */}
              </select>
              {/* فیلد شرایط ریه نرمال  */}
              {lungInvolvement === "normal" && (
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="normalLungCondition"
                  >
                    شرایط بیمار با ریه نرمال
                  </label>
                  <select
                    id="normalLungCondition"
                    value={normalLungCondition}
                    onChange={(e) => setNormalLungCondition(e.target.value)}
                  >
                    <option value="">لطفا شرایط بیمار را انتخاب کنید</option>
                    <option value="reduced_consciousness">
                      کاهش سطح هوشیاری
                    </option>
                    <option value="seizure">تشنج</option>
                  </select>
                </div>
              )}

              {/* فیلد بیماری انسدادی   */}
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
                  >
                    <option value="">لطفا بیماری انسدادی را انتخاب کنید</option>
                    <option value="bronchiolitis">برونشیولیت</option>
                    <option value="asthma">آسم</option>
                    <option value="copd">
                      بیماری انسدادی مزمن ریوی (COPD)
                    </option>
                    <option value="bronchiectasis">برونشکتازی</option>
                    <option value="cystic_fibrosis">فیبروز سیستیک</option>
                    <option value="foreign_body_aspiration">
                      آسپیراسیون جسم خارجی
                    </option>
                  </select>
                </div>
              )}

              {/* فیلد بیماری Restrictive*/}
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
                  >
                    <option value="">
                      لطفا بیماری Restrictive را انتخاب کنید
                    </option>
                    <option value="pneumonia">پنومونی</option>
                    <option value="ards">سندرم زجر تنفسی حاد (ARDS)</option>
                    <option value="pulmonary_edema">ادم ریوی</option>
                    <option value="pulmonary_fibrosis">فیبروز ریوی</option>
                    <option value="pleural_effusion">افیوژن پلور</option>
                    <option value="pneumothorax">پنوموتوراکس</option>
                    <option value="atelectasis">آتلکتازی</option>
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
