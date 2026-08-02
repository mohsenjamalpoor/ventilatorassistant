// "use client";

// import { useState, useRef, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import {
//   LuActivity,
//   LuBrain,
//   LuCalendarDays,
//   LuChevronLeft,
//   LuStethoscope,
//   LuWeight,
//   LuWind,
//   LuZap,
// } from "react-icons/lu";
// import { FaLungs } from "react-icons/fa";

// const OBSTRUCTIVE_DISEASES = [
//   { value: "bronchiolitis", label: "برونشیولیت" },
//   { value: "asthma", label: "آسم" },
//   { value: "copd", label: "بیماری انسدادی مزمن ریوی (COPD)" },
//   { value: "bronchiectasis", label: "برونشکتازی" },
//   { value: "cystic_fibrosis", label: "فیبروز سیستیک" },
//   { value: "foreign_body_aspiration", label: "آسپیراسیون جسم خارجی" },
// ];

// const RESTRICTIVE_DISEASES = [
//   { value: "pneumonia", label: "پنومونی" },
//   { value: "ards", label: "سندرم زجر تنفسی حاد (ARDS)" },
//   { value: "pulmonary_edema", label: "ادم ریوی" },
//   { value: "pulmonary_fibrosis", label: "فیبروز ریوی" },
//   { value: "pleural_effusion", label: "افیوژن پلور" },
//   { value: "pneumothorax", label: "پنوموتوراکس" },
//   { value: "atelectasis", label: "آتلکتازی" },
// ];

// const NORMAL_CONDITIONS = [
//   { value: "reduced_consciousness", label: "کاهش سطح هوشیاری", icon: LuBrain },
//   { value: "seizure", label: "تشنج", icon: LuZap },
// ];

// const LUNG_TYPES = [
//   {
//     value: "normal",
//     label: "ریه نرمال",
//     desc: "بدون درگیری پارانشیمی، اندیکاسیون تهویه غیر ریوی",
//     icon: FaLungs,
//   },
//   {
//     value: "obstructive",
//     label: "Obstructive",
//     desc: "افزایش مقاومت راه هوایی، خطر حبس هوا",
//     icon: LuWind,
//   },
//   {
//     value: "restrictive",
//     label: "Restrictive",
//     desc: "کاهش کمپلیانس ریوی",
//     icon: LuActivity,
//   },
// ];

// function StepBadge({ active, done, children }) {
//   return (
//     <div
//       className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0 ${
//         done
//           ? "bg-violet-500 text-white"
//           : active
//             ? "bg-violet-500/20 text-violet-300 ring-1 ring-violet-500"
//             : "bg-white/5 text-slate-500"
//       }`}
//     >
//       {children}
//     </div>
//   );
// }

// function DiseaseGrid({ items, value, onChange }) {
//   return (
//     <div className="grid grid-cols-2 gap-2 mt-3">
//       {items.map((item) => (
//         <button
//           key={item.value}
//           type="button"
//           onClick={() => onChange(item.value)}
//           className={`text-right rtl:text-right px-3 py-2.5 rounded-xl text-sm border transition-all ${
//             value === item.value
//               ? "bg-violet-500/15 border-violet-500 text-violet-200"
//               : "bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/20 hover:bg-white/[0.06]"
//           }`}
//         >
//           {item.label}
//         </button>
//       ))}
//     </div>
//   );
// }

// export default function HomePage() {
//   const router = useRouter();
//   const [weight, setWeight] = useState("");
//   const [age, setAge] = useState("");
//   const [lungInvolvement, setLungInvolvement] = useState("");
//   const [normalLungCondition, setNormalLungCondition] = useState("");
//   const [obstructiveDisease, setObstructiveDisease] = useState("");
//   const [restrictiveDisease, setRestrictiveDisease] = useState("");

//   // به‌جای useState از useRef استفاده می‌کنیم چون این مقدار فقط برای
//   // جلوگیری از دابل-کلیک لازمه، نه برای رندر UI. اگر از useState استفاده
//   // کنیم و مقدارش true بمونه، وقتی کاربر با دکمه Back برمی‌گرده، Next.js
//   // Router Cache همون state قبلی (submitting=true) رو نگه می‌داره و دکمه
//   // برای همیشه غیرفعال می‌مونه — حتی با اینکه فیلدها پر هستن.
//   const isSubmittingRef = useRef(false);

//   const subSelectionValue =
//     lungInvolvement === "normal"
//       ? normalLungCondition
//       : lungInvolvement === "obstructive"
//         ? obstructiveDisease
//         : lungInvolvement === "restrictive"
//           ? restrictiveDisease
//           : "";

//   const isValid = useMemo(() => {
//     if (!weight || !age || !lungInvolvement) return false;
//     if (Number(weight) <= 0 || Number(age) < 0) return false;
//     if (!subSelectionValue) return false;
//     return true;
//   }, [weight, age, lungInvolvement, subSelectionValue]);

//   const handleLungTypeSelect = (value) => {
//     setLungInvolvement(value);
//     setNormalLungCondition("");
//     setObstructiveDisease("");
//     setRestrictiveDisease("");
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (isSubmittingRef.current) return;

//     if (!weight || !age) {
//       toast.error("لطفا وزن و سن بیمار را وارد کنید.");
//       return;
//     }
//     if (Number(weight) <= 0) {
//       toast.error("وزن وارد شده معتبر نیست.");
//       return;
//     }
//     if (!lungInvolvement) {
//       toast.error("لطفا نوع درگیری ریوی را انتخاب کنید.");
//       return;
//     }
//     if (!subSelectionValue) {
//       toast.error("لطفا جزئیات مربوط به درگیری ریوی را انتخاب کنید.");
//       return;
//     }

//     const payload = {
//       weight: Number(weight),
//       age: Number(age),
//       lungInvolvement,
//       subCondition: subSelectionValue,
//       createdAt: Date.now(),
//     };

//     isSubmittingRef.current = true;
//     try {
//       sessionStorage.setItem("ventilatorPatientData", JSON.stringify(payload));
//       router.push("/ventilatortraining/result");
//     } catch (err) {
//       isSubmittingRef.current = false;
//       toast.error("ذخیره اطلاعات با خطا مواجه شد.");
//     }
//   };

//   return (
//     <div
//       className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-950 to-indigo-950 py-10 px-4"
//       dir="rtl"
//     >
//       <div className="max-w-lg mx-auto">
//         <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-violet-950/50">
//           {/* هدر */}
//           <div className="bg-gradient-to-l from-violet-600/20 via-violet-500/10 to-transparent border-b border-white/10 p-6 text-center">
//             <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center">
//               <LuStethoscope className="w-6 h-6 text-violet-300" />
//             </div>
//             <h1 className="text-xl font-bold text-white mb-1">
//               دستیار ونتیلاتور
//             </h1>
//             <p className="text-slate-400 text-sm">
//               اطلاعات بیمار را وارد کنید تا تنظیمات اولیه پیشنهادی محاسبه شود
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="bg-[#0B0F17]">
//             <div className="p-6 space-y-6">
//               {/* مرحله ۱: مشخصات بیمار */}
//               <div>
//                 <div className="flex items-center gap-2 mb-3">
//                   <StepBadge done={!!(weight && age)} active>
//                     1
//                   </StepBadge>
//                   <span className="text-sm font-semibold text-slate-200">
//                     مشخصات بیمار
//                   </span>
//                 </div>
//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <label
//                       htmlFor="weight"
//                       className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-1.5"
//                     >
//                       <LuWeight className="w-3.5 h-3.5" />
//                       وزن (کیلوگرم)
//                     </label>
//                     <input
//                       id="weight"
//                       type="number"
//                       inputMode="decimal"
//                       min="0"
//                       step="0.1"
//                       placeholder="مثلاً ۱۲"
//                       value={weight}
//                       onChange={(e) => setWeight(e.target.value)}
//                       className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors"
//                     />
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="age"
//                       className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-1.5"
//                     >
//                       <LuCalendarDays className="w-3.5 h-3.5" />
//                       سن (سال)
//                     </label>
//                     <input
//                       id="age"
//                       type="number"
//                       inputMode="decimal"
//                       min="0"
//                       step="0.1"
//                       placeholder="مثلاً ۳"
//                       value={age}
//                       onChange={(e) => setAge(e.target.value)}
//                       className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* مرحله ۲: نوع درگیری ریوی */}
//               <div>
//                 <div className="flex items-center gap-2 mb-3">
//                   <StepBadge
//                     done={!!lungInvolvement}
//                     active={!!(weight && age)}
//                   >
//                     2
//                   </StepBadge>
//                   <span className="text-sm font-semibold text-slate-200">
//                     نوع درگیری ریوی
//                   </span>
//                 </div>
//                 <div className="grid grid-cols-1 gap-2">
//                   {LUNG_TYPES.map((type) => {
//                     const Icon = type.icon;
//                     const active = lungInvolvement === type.value;
//                     return (
//                       <button
//                         key={type.value}
//                         type="button"
//                         onClick={() => handleLungTypeSelect(type.value)}
//                         className={`flex items-center gap-3 text-right px-4 py-3 rounded-xl border transition-all ${
//                           active
//                             ? "bg-violet-500/15 border-violet-500"
//                             : "bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06]"
//                         }`}
//                       >
//                         <div
//                           className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
//                             active
//                               ? "bg-violet-500/20 text-violet-300"
//                               : "bg-white/5 text-slate-400"
//                           }`}
//                         >
//                           <Icon className="w-4.5 h-4.5" />
//                         </div>
//                         <div className="flex-1">
//                           <div
//                             className={`text-sm font-semibold ${active ? "text-violet-200" : "text-slate-200"}`}
//                           >
//                             {type.label}
//                           </div>
//                           <div className="text-xs text-slate-500">
//                             {type.desc}
//                           </div>
//                         </div>
//                         <LuChevronLeft
//                           className={`w-4 h-4 shrink-0 transition-transform ${
//                             active
//                               ? "text-violet-400 -rotate-90"
//                               : "text-slate-600"
//                           }`}
//                         />
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* مرحله ۳: جزئیات */}
//               {lungInvolvement === "normal" && (
//                 <div>
//                   <div className="flex items-center gap-2 mb-3">
//                     <StepBadge done={!!normalLungCondition} active>
//                       3
//                     </StepBadge>
//                     <span className="text-sm font-semibold text-slate-200">
//                       شرایط بیمار با ریه نرمال
//                     </span>
//                   </div>
//                   <div className="grid grid-cols-2 gap-2">
//                     {NORMAL_CONDITIONS.map((cond) => {
//                       const Icon = cond.icon;
//                       const active = normalLungCondition === cond.value;
//                       return (
//                         <button
//                           key={cond.value}
//                           type="button"
//                           onClick={() => setNormalLungCondition(cond.value)}
//                           className={`flex flex-col items-center gap-2 px-3 py-3 rounded-xl border text-sm transition-all ${
//                             active
//                               ? "bg-violet-500/15 border-violet-500 text-violet-200"
//                               : "bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/20"
//                           }`}
//                         >
//                           <Icon className="w-4 h-4" />
//                           {cond.label}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               {lungInvolvement === "obstructive" && (
//                 <div>
//                   <div className="flex items-center gap-2 mb-3">
//                     <StepBadge done={!!obstructiveDisease} active>
//                       3
//                     </StepBadge>
//                     <span className="text-sm font-semibold text-slate-200">
//                       بیماری انسدادی
//                     </span>
//                   </div>
//                   <DiseaseGrid
//                     items={OBSTRUCTIVE_DISEASES}
//                     value={obstructiveDisease}
//                     onChange={setObstructiveDisease}
//                   />
//                 </div>
//               )}

//               {lungInvolvement === "restrictive" && (
//                 <div>
//                   <div className="flex items-center gap-2 mb-3">
//                     <StepBadge done={!!restrictiveDisease} active>
//                       3
//                     </StepBadge>
//                     <span className="text-sm font-semibold text-slate-200">
//                       بیماری Restrictive
//                     </span>
//                   </div>
//                   <DiseaseGrid
//                     items={RESTRICTIVE_DISEASES}
//                     value={restrictiveDisease}
//                     onChange={setRestrictiveDisease}
//                   />
//                 </div>
//               )}
//             </div>

//             <div className="p-6 pt-0">
//               <button
//                 type="submit"
//                 disabled={!isValid}
//                 className="w-full flex items-center justify-center gap-2 bg-violet-600 disabled:bg-white/5 disabled:text-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl shadow-lg shadow-violet-900/40 hover:bg-violet-500 transition-all active:scale-[0.98]"
//               >
//                 شروع
//                 <LuChevronLeft className="w-4 h-4" />
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

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
                className="w-full px-4 py-3 border rounded-lg text-left focus:outline-none focus:ring-2 
                
                 
                  border-gray-300 focus:ring-blue-200
             "
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
