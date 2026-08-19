"use client";

import {
  NORMAL_CONDITIONS,
  OBSTRUCTIVE_DISEASES,
  RESTRICTIVE_DISEASES,
} from "@/utils/lungInvolvement";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { calculateEttSizes } from "@/utils/formatNumberEtt";
import { checkWeightAgeMismatch } from "@/utils/estimateWeightForAge";
import {
  LuStethoscope,
  LuRuler,
  LuArrowLeft,
  LuCheck,
  LuClipboardList,
  LuSyringe,
  LuWind,
  LuActivity,
  LuGauge,
  LuLightbulb,
  LuRepeat,
  LuZap,
  LuChevronDown,
  LuMoon,
  LuHeartPulse,
  LuShieldAlert,
} from "react-icons/lu";
import EttSizeTable from "../module/ett/EttSizeTable";
import EttTeachingNotes from "../module/ett/EttTeachingNotes";
// مسیر این دو کامپوننت رو مطابق محل واقعی‌شون در پروژه اصلاح کنید
import ReferenceFooter from "../module/shared/ReferenceFooter";
import NoteCard from "../module/shared/NoteCard";
import { BsLungs } from "react-icons/bs";
import { RiUserSettingsLine } from "react-icons/ri";

import { FaLungsVirus } from "react-icons/fa";
import { GiLungs } from "react-icons/gi";
import { IoMdAlert } from "react-icons/io";
import { RSI_MEDICATION_CATEGORIES } from "@/utils/rsiMedications";
import RsiMedications from "../module/RsiMedications";

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
    icon: GiLungs,
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

// مودهای اصلی ونتیلاتور — CPAP زیرمجموعه ندارد، بقیه AC/SIMV دارند
const VENT_MODES = [
  {
    value: "cpap",
    label: "CPAP",
    sub: "Continuous Positive Airway Pressure",
    icon: LuWind,
    color: "sky",
    hasSubModes: false,
  },
  {
    value: "pc",
    label: "کنترل فشار",
    sub: "Pressure Control",
    icon: LuGauge,
    color: "purple",
    hasSubModes: true,
  },
  {
    value: "vc",
    label: "کنترل حجم",
    sub: "Volume Control",
    icon: LuActivity,
    color: "teal",
    hasSubModes: true,
  },
  {
    value: "prvc",
    label: "PRVC",
    sub: "Pressure-Regulated Volume Control",
    icon: LuZap,
    color: "indigo",
    hasSubModes: true,
  },
];

// زیرمجموعه‌ی هر مود (به‌جز CPAP): AC یا SIMV
const VENT_SUB_MODES = [
  {
    value: "ac",
    label: "AC",
    sub: "Assist Control",
    icon: LuActivity,
  },
  {
    value: "simv",
    label: "SIMV",
    sub: "Synchronized IMV",
    icon: LuRepeat,
  },
];

const PRE_INTUBATION_OPTIONS = [
  {
    value: "ett",
    label: "سایز لوله تراشه",
    sub: "ETT Size",
    icon: LuRuler,
    color: "sky",
  },
  {
    value: "medications",
    label: "داروهای RSI",
    sub: "RSI Medications",
    icon: LuSyringe,
    color: "rose",
  },
];

// آیکون هر دسته دارویی RSI
const RSI_CATEGORY_ICONS = {
  sedative: LuMoon,
  opioid: LuHeartPulse,
  nmb: LuZap,
  pretreatment: LuShieldAlert,
};

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
  sky: {
    active: "border-sky-500 bg-sky-50 text-sky-700 shadow-sky-100",
    icon: "text-sky-600",
  },
  purple: {
    active: "border-purple-500 bg-purple-50 text-purple-700 shadow-purple-100",
    icon: "text-purple-600",
  },
  teal: {
    active: "border-teal-500 bg-teal-50 text-teal-700 shadow-teal-100",
    icon: "text-teal-600",
  },
  rose: {
    active: "border-rose-500 bg-rose-50 text-rose-700 shadow-rose-100",
    icon: "text-rose-600",
  },
  indigo: {
    active: "border-indigo-500 bg-indigo-50 text-indigo-700 shadow-indigo-100",
    icon: "text-indigo-600",
  },
  amber: {
    active: "border-amber-500 bg-amber-50 text-amber-700 shadow-amber-100",
    icon: "text-amber-600",
  },
};

// محاسبه متن دوز دارو بر اساس وزن بیمار — پشتیبانی از دوز بازه‌ای و دوز سقف‌دار
function getMedDoseText(med, weightNumber, isWeightValid) {
  if (med.type === "capped") {
    if (!isWeightValid) {
      return `${med.factor} mg/kg (حداکثر ${med.maxDose} ${med.unit})`;
    }
    const dose = Math.min(weightNumber * med.factor, med.maxDose).toFixed(2);
    return `${dose} ${med.unit}`;
  }

  // type === "range"
  if (!isWeightValid) {
    return `${med.doseLow} تا ${med.doseHigh} ${med.unit}`;
  }
  const baseUnit = med.unit.split("/")[0];
  return `${(weightNumber * med.doseLow).toFixed(1)} تا ${(weightNumber * med.doseHigh).toFixed(1)} ${baseUnit}`;
}

function HomePage() {
  const router = useRouter();

  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [mode, setMode] = useState(""); // "ventilator" | "preintubation"
  const [lungInvolvement, setLungInvolvement] = useState("");
  const [ventMode, setVentMode] = useState(""); // "cpap" | "pc" | "vc" | "prvc"
  const [subVentMode, setSubVentMode] = useState(""); // "ac" | "simv" (برای همه به‌جز cpap)
  const [preIntubationSection, setPreIntubationSection] = useState(""); // "ett" | "medications"
  const [openRsiCategory, setOpenRsiCategory] = useState(""); // آکاردئون دسته‌های دارویی RSI
  const [note, setNote] = useState(false);
  const [touched, setTouched] = useState(false);

  const weightError =
    touched && (!weight || Number(weight) <= 0) ? "وزن معتبر وارد کنید" : null;
  const ageError =
    touched && (!age || Number(age) <= 0) ? "سن معتبر وارد کنید" : null;

  const selectedVentModeMeta = VENT_MODES.find((m) => m.value === ventMode);
  const needsSubMode = !!selectedVentModeMeta?.hasSubModes;

  // با تغییر مود اصلی، زیرمود قبلی پاک شود
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSubVentMode("");
  }, [ventMode]);

  const handleSelectVentMode = (value) => {
    setVentMode((prev) => (prev === value ? "" : value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);

    if (!weight || !age || !lungInvolvement || !ventMode) {
      toast.error("لطفا همه‌ی فیلدها را تکمیل کنید.");
      return;
    }
    if (needsSubMode && !subVentMode) {
      toast.error("لطفا نوع تهویه (AC یا SIMV) را انتخاب کنید.");
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

    // کد نهایی مود: cpap تنها، یا ترکیب مثل pc-ac / vc-simv / prvc-ac
    const finalVentMode =
      ventMode === "cpap" ? "cpap" : `${ventMode}-${subVentMode}`;

    const params = new URLSearchParams({
      weight,
      age,
      lungInvolvement,
      ventMode: finalVentMode,
    });

    router.push(`/ventilatortraining/setup?${params.toString()}`);
  };

  const ageNumber = Number(age);
  const isAgeValid = age !== "" && ageNumber > 0;

  const weightNumber = Number(weight);
  const isWeightValid = weight !== "" && weightNumber > 0;

  const ett = useMemo(
    () => (isAgeValid ? calculateEttSizes(ageNumber) : null),
    [isAgeValid, ageNumber],
  );

  const weightAgeCheck = useMemo(
    () => checkWeightAgeMismatch(weight, age),
    [weight, age],
  );

  const subOptionsMap = {
    normal: {
      list: NORMAL_CONDITIONS,
      label: "نمونه بیماری‌های ریه نرمال",
    },
    obstructive: {
      list: OBSTRUCTIVE_DISEASES,
      label: "نمونه بیماری‌های انسدادی",
    },
    restrictive: {
      list: RESTRICTIVE_DISEASES,
      label: "نمونه بیماری‌های محدودکننده",
    },
  };
  const activeSub = lungInvolvement ? subOptionsMap[lungInvolvement] : null;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-cyan-50 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl shadow-blue-900/5 overflow-hidden border border-slate-100">
        {/* هدر */}
        <div className="relative bg-linear-to-l from-blue-700 via-blue-600 to-cyan-600 px-6 py-7 text-white text-center overflow-hidden">
          <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-white/10" />
          <div className="absolute -bottom-10 -right-6 w-28 h-28 rounded-full bg-white/10" />
          <div className="relative">
            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-white/15 flex items-center justify-center">
              <LuStethoscope className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-extrabold mb-1">
              دستیار ونتیلاتور در کودکان
            </h1>
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

          {/* هشدار عدم تطابق وزن و سن */}
          {weightAgeCheck?.mismatched && (
            <div className="mb-6 flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3">
              <IoMdAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 leading-relaxed">
                <span className="font-bold">هشدار: </span>
                وزن وارد شده با سن بیمار همخوانی معمول ندارد (وزن تخمینی بر اساس
                سن حدود {weightAgeCheck.expected} کیلوگرم است). لطفاً از صحت
                اطلاعات ثبت‌شده اطمینان حاصل کنید.
              </p>
            </div>
          )}

          {/* انتخاب نوع کار */}
          <div className="mb-6">
            <label className="block text-gray-600 text-xs font-bold mb-3 tracking-wide">
              مرحله‌ی بعد را انتخاب کنید
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() =>
                  setMode(mode === "ventilator" ? "" : "ventilator")
                }
                className={`group py-4 px-3 rounded-2xl border-2 text-sm font-bold transition-all flex flex-col items-center gap-2 ${
                  mode === "ventilator"
                    ? "bg-linear-to-br from-blue-700 to-cyan-600 text-white border-transparent shadow-lg shadow-blue-200"
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
                onClick={() =>
                  setMode(mode === "preintubation" ? "" : "preintubation")
                }
                className={`group py-4 px-3 rounded-2xl border-2 text-sm font-bold transition-all flex flex-col items-center gap-2 ${
                  mode === "preintubation"
                    ? "bg-linear-to-br from-blue-700 to-cyan-600 text-white border-transparent shadow-lg shadow-blue-200"
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
                }`}
              >
                <LuClipboardList
                  className={`w-5 h-5 ${mode === "preintubation" ? "text-white" : "text-blue-500"}`}
                />
                اقدامات پیش از اینتوباسیون
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
                        onClick={() =>
                          setLungInvolvement(active ? "" : item.value)
                        }
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

                {/* نمایش اطلاعاتی (غیرقابل‌انتخاب) بیماری‌های این دسته */}
                {activeSub && (
                  <div className="mt-4">
                    <label className="block text-gray-600 text-xs font-bold mb-2 tracking-wide">
                      {activeSub.label}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {activeSub.list.map((item, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-xs font-medium text-gray-600"
                        >
                          {item.label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* انتخاب نوع مود ونتیلاتور */}
              <div className="mb-6">
                <label className="block text-gray-600 text-xs font-bold mb-3 tracking-wide">
                  نوع مود ونتیلاتور
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {VENT_MODES.map((item) => {
                    const Icon = item.icon;
                    const active = ventMode === item.value;
                    const style = LUNG_COLOR_STYLES[item.color];
                    return (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => handleSelectVentMode(item.value)}
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
                        <span
                          className={`text-[10px] font-medium leading-tight text-center ${
                            active ? "opacity-80" : "text-gray-400"
                          }`}
                        >
                          {item.sub}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* زیرمنوی AC / SIMV — فقط برای مودهایی که hasSubModes دارند */}
                {needsSubMode && (
                  <div className="mt-4 animate-in fade-in duration-200">
                    <label className="block text-gray-600 text-xs font-bold mb-2.5 tracking-wide">
                      نوع تهویه ({selectedVentModeMeta.label})
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {VENT_SUB_MODES.map((item) => {
                        const Icon = item.icon;
                        const active = subVentMode === item.value;
                        const style =
                          LUNG_COLOR_STYLES[selectedVentModeMeta.color];
                        return (
                          <button
                            key={item.value}
                            type="button"
                            onClick={() =>
                              setSubVentMode(active ? "" : item.value)
                            }
                            className={`relative rounded-xl border-2 py-3 px-2 flex flex-col items-center gap-1 transition-all ${
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
                              className={`w-4.5 h-4.5 ${active ? style.icon : "text-gray-400"}`}
                            />
                            <span className="text-xs font-bold leading-tight text-center">
                              {item.label}
                            </span>
                            <span
                              className={`text-[10px] font-medium leading-tight text-center ${
                                active ? "opacity-80" : "text-gray-400"
                              }`}
                            >
                              {item.sub}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-linear-to-l from-blue-700 to-cyan-600 text-white font-bold py-3.5 rounded-2xl shadow-md hover:shadow-lg transition active:scale-[0.98] flex items-center justify-center gap-2"
              >
                شروع
                <LuArrowLeft className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* پنل اقدامات پیش از اینتوباسیون */}
          {mode === "preintubation" && (
            <div className="animate-in fade-in duration-200">
              <div className="grid grid-cols-2 gap-3 mb-5">
                {PRE_INTUBATION_OPTIONS.map((item) => {
                  const Icon = item.icon;
                  const active = preIntubationSection === item.value;
                  const style = LUNG_COLOR_STYLES[item.color];
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() =>
                        setPreIntubationSection(active ? "" : item.value)
                      }
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

              {!preIntubationSection && (
                <div className="rounded-2xl border-2 border-dashed border-gray-300 p-6 text-center">
                  <LuClipboardList className="w-6 h-6 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">
                    یکی از گزینه‌های بالا را انتخاب کنید
                  </p>
                </div>
              )}

              {/* سایز لوله تراشه */}
              {preIntubationSection === "ett" && (
                <>
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
                </>
              )}

              {/* داروهای RSI — آکاردئون دسته‌بندی‌شده */}
              {preIntubationSection === "medications" && (
                <div className="space-y-3">
                  {!isWeightValid && (
                    <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-2.5 text-[11px] text-amber-700 font-medium">
                      برای محاسبه‌ی خودکار دوز بر حسب میلی‌گرم، وزن بیمار را در
                      بالا وارد کنید.
                    </div>
                  )}

                  {RSI_MEDICATION_CATEGORIES.map((cat) => {
                    const CatIcon = RSI_CATEGORY_ICONS[cat.id] || LuSyringe;
                    const isOpen = openRsiCategory === cat.id;
                    const style = LUNG_COLOR_STYLES[cat.color];
                    return (
                      <div
                        key={cat.id}
                        className={`rounded-2xl border-2 overflow-hidden transition-colors ${
                          isOpen ? style.active : "border-gray-200 bg-white"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setOpenRsiCategory(isOpen ? "" : cat.id)
                          }
                          className="w-full flex items-center justify-between gap-3 px-4 py-3.5"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center ${
                                isOpen ? "bg-white/60" : "bg-gray-50"
                              }`}
                            >
                              <CatIcon
                                className={`w-4.5 h-4.5 ${isOpen ? style.icon : "text-gray-400"}`}
                              />
                            </div>
                            <div className="text-right min-w-0">
                              <p
                                className={`text-xs font-bold leading-tight truncate ${
                                  isOpen ? style.icon : "text-gray-700"
                                }`}
                              >
                                {cat.label}
                              </p>
                              <p
                                className={`text-[10px] font-medium leading-tight truncate mt-0.5 ${
                                  isOpen ? "opacity-70" : "text-gray-400"
                                }`}
                              >
                                {cat.sub}
                              </p>
                            </div>
                          </div>
                          <LuChevronDown
                            className={`w-4 h-4 shrink-0 transition-transform ${
                              isOpen
                                ? `rotate-180 ${style.icon}`
                                : "text-gray-400"
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <div className="px-3 pb-3 pt-1 space-y-2.5 animate-in fade-in duration-200">
                            {cat.description && (
                              <p
                                className={`text-[11px] leading-relaxed px-1 pb-1 ${style.icon} opacity-80`}
                              >
                                {cat.description}
                              </p>
                            )}
                            {cat.medications.map((med, index) => (
                              <RsiMedications
                                key={index}
                                med={med}
                                doseText={getMedDoseText(
                                  med,
                                  weightNumber,
                                  isWeightValid,
                                )}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  <NoteCard
                    icon={LuLightbulb}
                    title="نکته فوق‌تخصصی"
                    tone="amber"
                  >
                    روکورونیوم با دسترسی به سوگاماداکس جهت ریورس اورژانسی،
                    امروزه در بسیاری از پروتکل‌های PICU جایگزین اصلی
                    ساکسینیل‌کولین شده است؛ اما در موقعیت‌های راه هوایی مشکل که
                    سرعت بازگشت تنفس خودبه‌خودی اهمیت دارد، ساکسینیل‌کولین
                    همچنان انتخاب رایج باقی مانده است.
                  </NoteCard>

                  <ReferenceFooter source="پروتکل‌های بالینی Rapid Sequence Intubation در کودکان (UpToDate / PICU)" />
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
