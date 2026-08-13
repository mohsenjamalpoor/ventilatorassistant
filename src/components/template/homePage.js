"use client";

import {
  NORMAL_CONDITIONS,
  OBSTRUCTIVE_DISEASES,
  RESTRICTIVE_DISEASES,
} from "@/utils/lungInvolvement";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { calculateEttSizes } from "@/utils/formatNumberEtt";
import { LuStethoscope, LuRuler, LuArrowLeft, LuCheck } from "react-icons/lu";
import EttSizeTable from "../module/ett/EttSizeTable";
import EttTeachingNotes from "../module/ett/EttTeachingNotes";
import { BsLungs } from "react-icons/bs";
import { RiUserSettingsLine } from "react-icons/ri";
import { TbLungsOff } from "react-icons/tb";
import { FaLungsVirus } from "react-icons/fa";

const LUNG_TYPES = [
  {
    value: "normal",
    label: "ریه نرمال",
    sub: "Normal Lung",
    icon: BsLungs,
    color: "green",
  },
  {
    value: "obstructive",
    label: "انسدادی",
    sub: "Obstructive",
    icon: TbLungsOff,
    color: "orange",
  },
  {
    value: "restrictive",
    label: "محدودکننده",
    sub: "Restrictive",
    icon: FaLungsVirus,
    color: "red",
  },
];

const LUNG_COLOR_STYLES = {
  green: {
    active: "border-green-500 bg-green-50 text-green-700 shadow-green-100",
    icon: "text-green-600",
  },
  orange: {
    active: "border-orange-500 bg-orange-50 text-orange-700 shadow-orange-100",
    icon: "text-orange-600",
  },
  red: {
    active: "border-red-500 bg-red-50 text-red-700 shadow-red-100",
    icon: "text-red-600",
  },
};

function HomePage() {
  const router = useRouter();

  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [mode, setMode] = useState(""); // "ventilator" | "ett"
  const [lungInvolvement, setLungInvolvement] = useState("");
  const [normalLungCondition, setNormalLungCondition] = useState("");
  const [obstructiveDisease, setObstructiveDisease] = useState("");
  const [restrictiveDisease, setRestrictiveDisease] = useState("");
  const [note, setNote] = useState(false);
  const [touched, setTouched] = useState(false);

  const weightError =
    touched && (!weight || Number(weight) <= 0) ? "وزن معتبر وارد کنید" : null;
  const ageError =
    touched && (!age || Number(age) <= 0) ? "سن معتبر وارد کنید" : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);

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

  const subOptionsMap = {
    normal: {
      list: NORMAL_CONDITIONS,
      value: normalLungCondition,
      set: setNormalLungCondition,
      label: "بیماری ریه نرمال",
    },
    obstructive: {
      list: OBSTRUCTIVE_DISEASES,
      value: obstructiveDisease,
      set: setObstructiveDisease,
      label: "بیماری انسدادی",
    },
    restrictive: {
      list: RESTRICTIVE_DISEASES,
      value: restrictiveDisease,
      set: setRestrictiveDisease,
      label: "بیماری محدودکننده",
    },
  };
  const activeSub = subOptionsMap[lungInvolvement];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl shadow-blue-900/5 overflow-hidden border border-slate-100">
        {/* هدر */}
        <div className="relative bg-gradient-to-l from-blue-700 via-blue-600 to-cyan-600 px-6 py-7 text-white text-center overflow-hidden">
          <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-white/10" />
          <div className="absolute -bottom-10 -right-6 w-28 h-28 rounded-full bg-white/10" />
          <div className="relative">
            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-white/15 flex items-center justify-center">
              <LuStethoscope className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-extrabold mb-1">
              دستیار ونتیلاتور در کودکان
            </h1>
            <p className="text-blue-100 text-xs">
              ابزار آموزشی برای فلوها و دستیاران PICU
            </p>
          </div>
        </div>

        <div className="p-6">
          {/* اطلاعات پایه بیمار */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label
                className="block text-gray-600 text-xs font-bold mb-2 tracking-wide"
                htmlFor="weight"
              >
                وزن بیمار
              </label>
              <div className="relative">
                <input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  onBlur={() => setTouched(true)}
                  placeholder="0"
                  className={`w-full px-4 py-3 pl-12 border rounded-xl text-center font-bold text-gray-800 focus:outline-none focus:ring-2 transition-colors ${
                    weightError
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-200 focus:ring-blue-200 focus:border-blue-400"
                  }`}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">
                  kg
                </span>
              </div>
              {weightError && (
                <p className="text-[11px] text-red-500 mt-1">{weightError}</p>
              )}
            </div>
            <div>
              <label
                className="block text-gray-600 text-xs font-bold mb-2 tracking-wide"
                htmlFor="age"
              >
                سن بیمار
              </label>
              <div className="relative">
                <input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  onBlur={() => setTouched(true)}
                  placeholder="0"
                  className={`w-full px-4 py-3 pl-14 border rounded-xl text-center font-bold text-gray-800 focus:outline-none focus:ring-2 transition-colors ${
                    ageError
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-200 focus:ring-blue-200 focus:border-blue-400"
                  }`}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">
                  سال
                </span>
              </div>
              {ageError && (
                <p className="text-[11px] text-red-500 mt-1">{ageError}</p>
              )}
            </div>
          </div>

          {/* انتخاب نوع کار */}
          <div className="mb-6">
            <label className="block text-gray-600 text-xs font-bold mb-3 tracking-wide">
              مرحله‌ی بعد را انتخاب کنید
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMode("ventilator")}
                className={`group py-4 px-3 rounded-2xl border-2 text-sm font-bold transition-all flex flex-col items-center gap-2 ${
                  mode === "ventilator"
                    ? "bg-gradient-to-br from-blue-700 to-cyan-600 text-white border-transparent shadow-lg shadow-blue-200"
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
                }`}
              >
                <RiUserSettingsLine
                  className={`w-5 h-5 ${mode === "ventilator" ? "text-white" : "text-blue-500"}`}
                />
                تنظیمات اولیه ونتیلاتور
              </button>
              <button
                type="button"
                onClick={() => setMode("ett")}
                className={`group py-4 px-3 rounded-2xl border-2 text-sm font-bold transition-all flex flex-col items-center gap-2 ${
                  mode === "ett"
                    ? "bg-gradient-to-br from-blue-700 to-cyan-600 text-white border-transparent shadow-lg shadow-blue-200"
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
                }`}
              >
                <LuRuler
                  className={`w-5 h-5 ${mode === "ett" ? "text-white" : "text-blue-500"}`}
                />
                تعیین سایز لوله تراشه
              </button>
            </div>
          </div>

          {/* پنل تنظیمات ونتیلاتور */}
          {mode === "ventilator" && (
            <form
              onSubmit={handleSubmit}
              className="animate-in fade-in duration-200"
            >
              <div className="mb-6">
                <label className="block text-gray-600 text-xs font-bold mb-3 tracking-wide">
                  نوع درگیری ریوی
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {LUNG_TYPES.map((item) => {
                    const Icon = item.icon;
                    const active = lungInvolvement === item.value;
                    const style = LUNG_COLOR_STYLES[item.color];
                    return (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => {
                          setLungInvolvement(item.value);
                          setNormalLungCondition("");
                          setObstructiveDisease("");
                          setRestrictiveDisease("");
                        }}
                        className={`relative rounded-xl border-2 py-3.5 px-2 flex flex-col items-center gap-1.5 transition-all ${
                          active
                            ? `${style.active} shadow-md`
                            : "border-gray-200 text-gray-500 hover:border-gray-300"
                        }`}
                      >
                        {active && (
                          <span className="absolute top-1.5 left-1.5 w-4 h-4 rounded-full bg-current flex items-center justify-center">
                            <LuCheck className="w-2.5 h-2.5 text-white" />
                          </span>
                        )}
                        <Icon
                          className={`w-5 h-5 ${active ? style.icon : "text-gray-400"}`}
                        />
                        <span className="text-xs font-bold leading-tight text-center">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {activeSub && (
                  <div className="mt-4">
                    <label className="block text-gray-600 text-xs font-bold mb-2 tracking-wide">
                      {activeSub.label}
                    </label>
                    <select
                      value={activeSub.value}
                      onChange={(e) => activeSub.set(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-right text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-colors bg-white"
                    >
                      <option value="">— انتخاب کنید —</option>
                      {activeSub.list.map((item, index) => (
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
                className="w-full bg-gradient-to-l from-blue-700 to-cyan-600 text-white font-bold py-3.5 rounded-2xl shadow-md hover:shadow-lg transition active:scale-[0.98] flex items-center justify-center gap-2"
              >
                شروع
                <LuArrowLeft className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* پنل تعیین سایز لوله تراشه */}
          {mode === "ett" && (
            <div className="animate-in fade-in duration-200">
              {!isAgeValid ? (
                <div className="rounded-2xl border-2 border-dashed border-gray-300 p-6 text-center">
                  <LuRuler className="w-6 h-6 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">
                    لطفا سن بیمار را در بالا وارد کنید
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <EttSizeTable ett={ett} age={ageNumber} />

                  <button
                    type="button"
                    onClick={() => setNote((prev) => !prev)}
                    className="w-full rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold py-3 transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    {note ? "مخفی کردن نکات آموزشی" : "نمایش نکات آموزشی"}
                  </button>

                  {note && <EttTeachingNotes />}
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
