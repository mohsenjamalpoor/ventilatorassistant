// "use client";

// import {
//   NORMAL_CONDITIONS,
//   OBSTRUCTIVE_DISEASES,
//   RESTRICTIVE_DISEASES,
// } from "@/utils/lungInvolvement";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { formatNumber, roundToHalf } from "@/utils/formatNumberEtt";

// function HomePage() {
//   const router = useRouter();

//   const [weight, setWeight] = useState("");
//   const [age, setAge] = useState("");
//   const [mode, setMode] = useState(""); // "ventilator" | "ett"
//   const [lungInvolvement, setLungInvolvement] = useState("");
//   const [normalLungCondition, setNormalLungCondition] = useState("");
//   const [obstructiveDisease, setObstructiveDisease] = useState("");
//   const [restrictiveDisease, setRestrictiveDisease] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!weight || !age || !lungInvolvement) {
//       toast.error("لطفا همه‌ی فیلدها را تکمیل کنید.");
//       return;
//     }
//     if (Number(weight) <= 0) {
//       toast.error("وزن وارد شده معتبر نیست.");
//       return;
//     }
//     if (Number(age) <= 0) {
//       toast.error("سن وارد شده معتبر نیست.");
//       return;
//     }

//     const params = new URLSearchParams({
//       weight,
//       age,
//       lungInvolvement,
//       ...(normalLungCondition && { normalLungCondition }),
//       ...(obstructiveDisease && { obstructiveDisease }),
//       ...(restrictiveDisease && { restrictiveDisease }),
//     });

//     router.push(`/ventilatortraining/setup?${params.toString()}`);
//   };

//   const ageNumber = Number(age);
//   const isAgeValid = age !== "" && ageNumber > 0;

//   const uncuffedSizeRaw = isAgeValid ? ageNumber / 4 + 4 : null;
//   const uncuffedSize = isAgeValid ? roundToHalf(uncuffedSizeRaw) : null;
//   const cuffedSize = isAgeValid ? roundToHalf(uncuffedSizeRaw - 0.5) : null;
//   const tubeDepth = isAgeValid ? roundToHalf(uncuffedSize * 3) : null;

//   return (
//     <div className="min-h-screen bg-linear-to-br from-blue-50 to-cyan-100 py-8 px-4">
//       <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
//         <div className="bg-linear-to-r from-blue-600 to-cyan-600 p-6 text-white text-center">
//           <h1 className="text-2xl font-bold mb-2"> دستیار ونتیلاتور</h1>
//           <p className="text-blue-100">لطفا اطلاعات بیمار را وارد کنید</p>
//         </div>

//         <div className="p-6">
//           <div className="mb-6">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="weight"
//             >
//               وزن بیمار (کیلوگرم)
//             </label>
//             <input
//               id="weight"
//               type="number"
//               value={weight}
//               onChange={(e) => setWeight(e.target.value)}
//               className="w-full px-4 py-3 border rounded-lg text-left focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-200"
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               سن بیمار
//             </label>
//             <input
//               type="number"
//               value={age}
//               onChange={(e) => setAge(e.target.value)}
//               className="w-full px-4 py-3 border rounded-lg text-left focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-200"
//             />
//           </div>

//           {/* انتخاب نوع کار */}
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-3">
//               انتخاب کنید
//             </label>
//             <div className="grid grid-cols-2 gap-3">
//               <button
//                 type="button"
//                 onClick={() => setMode("ventilator")}
//                 className={`py-3 px-3 rounded-xl border-2 text-sm font-bold transition ${
//                   mode === "ventilator"
//                     ? "bg-linear-to-r from-blue-600 to-cyan-600 text-white border-transparent shadow-md"
//                     : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
//                 }`}
//               >
//                 تنظیمات اولیه ونتیلاتور
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setMode("ett")}
//                 className={`py-3 px-3 rounded-xl border-2 text-sm font-bold transition ${
//                   mode === "ett"
//                     ? "bg-linear-to-r from-blue-600 to-cyan-600 text-white border-transparent shadow-md"
//                     : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
//                 }`}
//               >
//                 تعیین سایز لوله تراشه
//               </button>
//             </div>
//           </div>

//           {/* پنل تنظیمات ونتیلاتور */}
//           {mode === "ventilator" && (
//             <form onSubmit={handleSubmit}>
//               <div className="mb-6">
//                 <label
//                   className="block text-gray-700 text-sm font-bold mb-2"
//                   htmlFor="lungInvolvement"
//                 >
//                   نوع درگیری ریوی
//                 </label>
//                 <select
//                   id="lungInvolvement"
//                   value={lungInvolvement}
//                   onChange={(e) => {
//                     setLungInvolvement(e.target.value);
//                     setNormalLungCondition("");
//                     setObstructiveDisease("");
//                     setRestrictiveDisease("");
//                   }}
//                   className="w-full px-4 py-3 border rounded-lg text-right focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-200"
//                 >
//                   <option value="">لطفا نوع درگیری ریوی را انتخاب کنید</option>
//                   <option value="normal">ریه نرمال</option>
//                   <option value="obstructive">Obstructive</option>
//                   <option value="restrictive">Restrictive</option>
//                 </select>

//                 {lungInvolvement === "normal" && (
//                   <div className="mt-4">
//                     <label
//                       className="block text-gray-700 text-sm font-bold mb-2"
//                       htmlFor="obstructiveDisease"
//                     >
//                       بیماری ریه نرمال
//                     </label>
//                     <select
//                       id="obstructiveDisease"
//                       value={obstructiveDisease}
//                       onChange={(e) => setObstructiveDisease(e.target.value)}
//                       className="w-full px-4 py-3 border rounded-lg text-right focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-200"
//                     >
//                       <option value="">
//                         لطفا بیماری ریه نرمال را انتخاب کنید
//                       </option>
//                       {NORMAL_CONDITIONS.map((item, index) => (
//                         <option key={index} value={item.value}>
//                           {item.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 )}

//                 {lungInvolvement === "obstructive" && (
//                   <div className="mt-4">
//                     <label
//                       className="block text-gray-700 text-sm font-bold mb-2"
//                       htmlFor="obstructiveDisease"
//                     >
//                       بیماری انسدادی
//                     </label>
//                     <select
//                       id="obstructiveDisease"
//                       value={obstructiveDisease}
//                       onChange={(e) => setObstructiveDisease(e.target.value)}
//                       className="w-full px-4 py-3 border rounded-lg text-right focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-200"
//                     >
//                       <option value="">
//                         لطفا بیماری انسدادی را انتخاب کنید
//                       </option>
//                       {OBSTRUCTIVE_DISEASES.map((item, index) => (
//                         <option key={index} value={item.value}>
//                           {item.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 )}

//                 {lungInvolvement === "restrictive" && (
//                   <div className="mt-4">
//                     <label
//                       className="block text-gray-700 text-sm font-bold mb-2"
//                       htmlFor="restrictiveDisease"
//                     >
//                       بیماری Restrictive
//                     </label>
//                     <select
//                       id="restrictiveDisease"
//                       value={restrictiveDisease}
//                       onChange={(e) => setRestrictiveDisease(e.target.value)}
//                       className="w-full px-4 py-3 border rounded-lg text-right focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-200"
//                     >
//                       <option value="">
//                         لطفا بیماری Restrictive را انتخاب کنید{" "}
//                       </option>
//                       {RESTRICTIVE_DISEASES.map((item, index) => (
//                         <option key={index} value={item.value}>
//                           {item.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-linear-to-r from-blue-600 to-cyan-600 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition active:scale-[0.98]"
//               >
//                 شروع
//               </button>
//             </form>
//           )}

//           {/* پنل تعیین سایز لوله تراشه */}
//           {mode === "ett" && (
//             <div>
//               {!isAgeValid ? (
//                 <div className="rounded-xl border-2 border-dashed border-gray-300 p-4 text-center text-sm text-gray-500">
//                   لطفا سن بیمار را وارد کنید
//                 </div>
//               ) : (
//                 <div className="space-y-3">
//                   <div className="rounded-xl bg-linear-to-r from-cyan-50 to-blue-50 border border-blue-100 p-4">
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm font-bold text-gray-700">
//                         لوله بدون کاف (Uncuffed)
//                       </span>
//                       <span className="text-xl font-extrabold text-blue-700">
//                         {formatNumber(uncuffedSize)}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="rounded-xl bg-linear-to-r from-cyan-50 to-blue-50 border border-blue-100 p-4">
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm font-bold text-gray-700">
//                         لوله کاف‌دار (Cuffed)
//                       </span>
//                       <span className="text-xl font-extrabold text-blue-700">
//                         {formatNumber(cuffedSize)}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="rounded-xl bg-linear-to-r from-blue-600 to-cyan-600 p-4 text-white">
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm font-bold">
//                         عمق ثابت لوله (سانتی‌متر)
//                       </span>
//                       <span className="text-xl font-extrabold">
//                         {formatNumber(tubeDepth)}
//                       </span>
//                     </div>
//                   </div>

//                   <p className="text-xs text-gray-400 text-center pt-1">
//                     فرمول: سن ÷ ۴ + ۴ (بدون کاف) | منهای نیم برای کاف‌دار | عمق
//                     = سایز × ۳
//                   </p>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomePage;
"use client";

import {
  NORMAL_CONDITIONS,
  OBSTRUCTIVE_DISEASES,
  RESTRICTIVE_DISEASES,
} from "@/utils/lungInvolvement";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { formatNumber, calculateEttSizes } from "@/utils/formatNumberEtt";

function HomePage() {
  const router = useRouter();

  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [mode, setMode] = useState(""); // "ventilator" | "ett"
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

  const ageNumber = Number(age);
  const isAgeValid = age !== "" && ageNumber > 0;

  const ett = useMemo(
    () => (isAgeValid ? calculateEttSizes(ageNumber) : null),
    [isAgeValid, ageNumber],
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-100 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-linear-to-r from-blue-700 to-cyan-600 p-6 text-white text-center">
          <h1 className="text-2xl font-bold mb-2">دستیار آموزشی ونتیلاتور</h1>
          <p className="text-blue-100 text-sm">
            لطفا اطلاعات بیمار را وارد کنید
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="weight"
              >
                وزن (کیلوگرم)
              </label>
              <input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg text-center focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-200"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="age"
              >
                سن (سال)
              </label>
              <input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg text-center focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-200"
              />
            </div>
          </div>

          {/* انتخاب نوع کار */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-3">
              مرحله‌ی بعد را انتخاب کنید
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMode("ventilator")}
                className={`py-3 px-3 rounded-xl border-2 text-sm font-bold transition ${
                  mode === "ventilator"
                    ? "bg-linear-to-r from-blue-700 to-cyan-600 text-white border-transparent shadow-md"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                }`}
              >
                تنظیمات اولیه ونتیلاتور
              </button>
              <button
                type="button"
                onClick={() => setMode("ett")}
                className={`py-3 px-3 rounded-xl border-2 text-sm font-bold transition ${
                  mode === "ett"
                    ? "bg-linear-to-r from-blue-700 to-cyan-600 text-white border-transparent shadow-md"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                }`}
              >
                تعیین سایز لوله تراشه
              </button>
            </div>
          </div>

          {/* پنل تنظیمات ونتیلاتور */}
          {mode === "ventilator" && (
            <form onSubmit={handleSubmit}>
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
                      htmlFor="normalLungCondition"
                    >
                      بیماری ریه نرمال
                    </label>
                    <select
                      id="normalLungCondition"
                      value={normalLungCondition}
                      onChange={(e) => setNormalLungCondition(e.target.value)}
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
                      <option value="">
                        لطفا بیماری انسدادی را انتخاب کنید
                      </option>
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

              <button
                type="submit"
                className="w-full bg-linear-to-r from-blue-700 to-cyan-600 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition active:scale-[0.98]"
              >
                شروع
              </button>
            </form>
          )}

          {/* پنل تعیین سایز لوله تراشه */}
          {mode === "ett" && (
            <div>
              {!isAgeValid ? (
                <div className="rounded-xl border-2 border-dashed border-gray-300 p-5 text-center text-sm text-gray-500">
                  لطفا سن بیمار را در بالا وارد کنید
                </div>
              ) : (
                <div className="space-y-4">
                  {/* جدول مقایسه‌ای برای دید یکجا و آموزشی */}
                  <div className="rounded-2xl border border-blue-200 overflow-hidden">
                    <div className="grid grid-cols-3 bg-slate-100 text-[13px] font-bold text-gray-600">
                      <div className="p-3 border-l border-blue-100"></div>
                      <div className="p-3 border-l border-blue-100 text-center">
                        سایز لوله (mm)
                      </div>
                      <div className="p-3 text-center">عمق لوله (cm)</div>
                    </div>

                    <div className="grid grid-cols-3 items-center border-t border-blue-100">
                      <div className="p-3 border-l border-blue-100">
                        <div className="text-sm font-bold text-gray-700">
                          بدون کاف
                        </div>
                        <div className="text-[11px] text-gray-400">
                          Uncuffed
                        </div>
                      </div>
                      <div className="p-3 border-l border-blue-100 text-center">
                        <span className="text-2xl font-extrabold text-blue-700">
                          {formatNumber(ett.uncuffedSize)}
                        </span>
                      </div>
                      <div className="p-3 text-center">
                        <span className="text-xl font-bold text-cyan-700">
                          {formatNumber(ett.uncuffedDepth)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 items-center border-t border-blue-100 bg-blue-50/50">
                      <div className="p-3 border-l border-blue-100">
                        <div className="text-sm font-bold text-gray-700">
                          کاف‌دار
                        </div>
                        <div className="text-[11px] text-gray-400">Cuffed</div>
                      </div>
                      <div className="p-3 border-l border-blue-100 text-center">
                        <span className="text-2xl font-extrabold text-blue-700">
                          {formatNumber(ett.cuffedSize)}
                        </span>
                      </div>
                      <div className="p-3 text-center">
                        <span className="text-xl font-bold text-cyan-700">
                          {formatNumber(ett.cuffedDepth)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* جعبه‌ی فرمول برای مرور آموزشی */}
                  <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-[13px] text-gray-600 leading-7">
                    <div className="font-bold text-gray-700 mb-1">
                      فرمول محاسبه:
                    </div>
                    <div>
                      سایز بدون کاف = (سن ÷ ۴) + ۴ &nbsp;→&nbsp; گرد به پایین با
                      گام ۰.۵ &nbsp;(حداکثر ۸)
                    </div>
                    <div>
                      سایز کاف‌دار = سایز بدون کاف − ۰.۵ &nbsp;(حداکثر ۷.۵)
                    </div>
                    <div>عمق هر لوله = سایز همان لوله × ۳</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
