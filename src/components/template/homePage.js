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
import { RSI_MEDICATIONS } from "@/utils/rsiMedications";

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

const VENT_MODES = [
  {
    value: "cpap",
    label: "CPAP",
    sub: "Continuous Positive Airway Pressure",
    icon: LuWind,
    color: "sky",
  },
  {
    value: "simv",
    label: "SIMV",
    sub: "Synchronized Intermittent Mandatory",
    icon: LuActivity,
    color: "purple",
  },
  {
    value: "prvc",
    label: "PRVC",
    sub: "Pressure-Regulated Volume Control",
    icon: LuGauge,
    color: "teal",
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
};

function HomePage() {
  const router = useRouter();

  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [mode, setMode] = useState(""); // "ventilator" | "preintubation"
  const [lungInvolvement, setLungInvolvement] = useState("");
  const [ventMode, setVentMode] = useState("");
  const [preIntubationSection, setPreIntubationSection] = useState(""); // "ett" | "medications"
  const [note, setNote] = useState(false);
  const [touched, setTouched] = useState(false);

  const weightError =
    touched && (!weight || Number(weight) <= 0) ? "وزن معتبر وارد کنید" : null;
  const ageError =
    touched && (!age || Number(age) <= 0) ? "سن معتبر وارد کنید" : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);

    if (!weight || !age || !lungInvolvement || !ventMode) {
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
      ventMode,
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

  // محاسبه دوز آتروپین: ۰.۰۲ mg/kg وریدی، حداکثر تک‌دوز ۰.۵ میلی‌گرم
  const atropineDose = isWeightValid
    ? Math.min(weightNumber * 0.02, 0.5).toFixed(2)
    : null;

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
                onClick={() =>
                  setMode(mode === "preintubation" ? "" : "preintubation")
                }
                className={`group py-4 px-3 rounded-2xl border-2 text-sm font-bold transition-all flex flex-col items-center gap-2 ${
                  mode === "preintubation"
                    ? "bg-gradient-to-br from-blue-700 to-cyan-600 text-white border-transparent shadow-lg shadow-blue-200"
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
                }`}
              >
                <LuClipboardList
                  className={`w-5 h-5 ${mode === "preintubation" ? "text-white" : "text-blue-500"}`}
                />
                ملاحظات پیش از اینتوباسیون
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
                <div className="grid grid-cols-3 gap-2.5">
                  {VENT_MODES.map((item) => {
                    const Icon = item.icon;
                    const active = ventMode === item.value;
                    const style = LUNG_COLOR_STYLES[item.color];
                    return (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => setVentMode(active ? "" : item.value)}
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

          {/* پنل ملاحظات پیش از اینتوباسیون */}
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

              {/* داروهای RSI */}
              {preIntubationSection === "medications" && (
                <div className="space-y-3">
                  {!isWeightValid && (
                    <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-2.5 text-[11px] text-amber-700 font-medium">
                      برای محاسبه‌ی خودکار دوز بر حسب میلی‌گرم، وزن بیمار را در
                      بالا وارد کنید.
                    </div>
                  )}

                  {RSI_MEDICATIONS.map((med, index) => {
                    const doseText = isWeightValid
                      ? `${(weightNumber * med.doseLow).toFixed(1)} تا ${(weightNumber * med.doseHigh).toFixed(1)} ${med.unit.split("/")[0]}`
                      : `${med.doseLow} تا ${med.doseHigh} ${med.unit}`;
                    return (
                      <div
                        key={index}
                        className="rounded-2xl border-2 border-gray-200 p-4"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold text-gray-800">
                            {med.name}
                          </span>
                          <span className="text-xs font-bold text-blue-600 bg-blue-50 rounded-full px-2.5 py-1 whitespace-nowrap">
                            {doseText}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">{med.role}</p>
                        <p className="text-[11px] text-gray-400 leading-relaxed">
                          {med.note}
                        </p>
                      </div>
                    );
                  })}

                  {/* آتروپین در صورت برادی‌کاردی */}
                  <div className="rounded-2xl border-2 border-rose-200 bg-rose-50/50 p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-rose-700">
                        آتروپین (Atropine)
                      </span>
                      <span className="text-xs font-bold text-rose-700 bg-rose-100 rounded-full px-2.5 py-1 whitespace-nowrap">
                        {atropineDose ? `${atropineDose} mg` : "0.02 mg/kg"}
                      </span>
                    </div>
                    <p className="text-xs text-rose-600 mb-1">
                      در صورت بروز برادی‌کاردی حین یا پس از RSI
                    </p>
                    <p className="text-[11px] text-rose-500 leading-relaxed">
                      دوز ۰.۰۲ mg/kg وریدی، حداکثر تک‌دوز ۰.۵ میلی‌گرم. کاربرد
                      آن بیشتر در سن زیر ۱ سال یا هم‌زمان با تجویز
                      سوکسینیل‌کولین توصیه می‌شود؛ برای مصرف روتین در همه‌ی
                      گروه‌های سنی شواهد قطعی وجود ندارد.
                    </p>
                  </div>

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
