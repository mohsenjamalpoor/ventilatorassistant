"use client";

import { useSearchParams } from "next/navigation";
import BackButton from "../module/BackButton";
import { PiBellLight } from "react-icons/pi";
import { useState, useEffect, useMemo } from "react";
import ModalContainer from "../partials/container/ModalContainer";
import { FaEdit } from "react-icons/fa";
import AlarmModal from "../module/AlarmModal";
import O2DropModal from "../module/O2DropModal";
import HighPIPModal from "../module/HighPIPModal";
import ModeSelectionModal from "../module/ModeSelectionModal";
import {
  LuTrendingDown,
  LuTrendingUp,
  LuActivity,
  LuStethoscope,
  LuWind,
} from "react-icons/lu";
import {
  getInitialSettings,
  calculateMvent,
  getLungInvolvementName,
  getLungInvolvementDescription,
  ventilatorItemLabels,
} from "../../utils/Initialsettingsconfig ";
import {
  pediatricVentilatorModes,
  modeParameterLabels,
  getModeSettings,
} from "../../utils/ventilatorModes";
import { checkWeightAgeMismatch } from "../../utils/estimateWeightForAge";
import RespiratoryAcidosisModal from "../module/RespiratoryAcidosisModal";
import EditVentilatorModal from "../module/EditVentilatorModal";
import { IoMdAlert } from "react-icons/io";
import ReferenceFooter from "../module/shared/ReferenceFooter";

// لیبل‌های کامل همه پارامترهای ممکن (پایه + مختص مودها)
const allLabels = { ...ventilatorItemLabels, ...modeParameterLabels };

// نگاشت مقدار مود ارسالی از HomePage (cpap, pc-ac, pc-simv, vc-ac, vc-simv,
// prvc-ac, prvc-simv) به شناسه مود در pediatricVentilatorModes
const VENT_MODE_KEY_MAP = {
  cpap: "CPAP",
  "pc-ac": "PC-AC",
  "pc-simv": "PC-SIMV",
  "vc-ac": "VC-AC",
  "vc-simv": "VC-SIMV",
  "prvc-ac": "PRVC-AC",
  "prvc-simv": "PRVC-SIMV",
};

// استایل هر پارامتر — نوار رنگی باریک بالای کارت + مقدار مشکی/خاکستری تیره
const COLOR_STYLES = {
  indigo: {
    bar: "bg-indigo-500",
    label: "text-indigo-600",
    ring: "hover:border-indigo-200",
  },
  green: {
    bar: "bg-green-500",
    label: "text-green-600",
    ring: "hover:border-green-200",
  },
  purple: {
    bar: "bg-purple-500",
    label: "text-purple-600",
    ring: "hover:border-purple-200",
  },
  red: {
    bar: "bg-red-500",
    label: "text-red-600",
    ring: "hover:border-red-200",
  },
  teal: {
    bar: "bg-teal-500",
    label: "text-teal-600",
    ring: "hover:border-teal-200",
  },
  blue: {
    bar: "bg-blue-500",
    label: "text-blue-600",
    ring: "hover:border-blue-200",
  },
  orange: {
    bar: "bg-orange-500",
    label: "text-orange-600",
    ring: "hover:border-orange-200",
  },
  violet: {
    bar: "bg-violet-500",
    label: "text-violet-600",
    ring: "hover:border-violet-200",
  },
  pink: {
    bar: "bg-pink-500",
    label: "text-pink-600",
    ring: "hover:border-pink-200",
  },
  amber: {
    bar: "bg-amber-500",
    label: "text-amber-600",
    ring: "hover:border-amber-200",
  },
  slate: {
    bar: "bg-slate-400",
    label: "text-slate-600",
    ring: "hover:border-slate-200",
  },
  sky: {
    bar: "bg-sky-500",
    label: "text-sky-600",
    ring: "hover:border-sky-200",
  },
};

// رنگ اختصاصی هر پارامتر
const PARAM_COLOR = {
  pip: "indigo",
  pressureControl: "purple",
  tidalVolume: "blue",
  vte: "green",
  mvent: "teal",
  respiratoryRate: "green",
  frequency: "green",
  map: "violet",
  amplitude: "pink",
  inspiratoryTimePercent: "amber",
  peep: "red",
  cpap: "red",
  pressureSupport: "orange",
  fio2: "purple",
  ieRatio: "indigo",
  ti: "teal",
  flowRate: "sky",
  trigger: "slate",
};

// ترتیب نمایش کلی — فقط پارامترهای مرتبط با مود انتخابی از این لیست فیلتر می‌شوند
const DISPLAY_ORDER = [
  "pip",
  "pressureControl",
  "tidalVolume",
  "vte",
  "mvent",
  "respiratoryRate",
  "frequency",
  "map",
  "amplitude",
  "inspiratoryTimePercent",
  "peep",
  "cpap",
  "pressureSupport",
  "fio2",
  "ieRatio",
  "ti",
  "flowRate",
  "trigger",
];

function PediatricVentilator() {
  const [isOpen, setIsOpen] = useState(false);
  const [isO2ModalOpen, setIsO2ModalOpen] = useState(false);
  const [isHighPIPModalOpen, setIsHighPIPModalOpen] = useState(false);
  const [isModeModalOpen, setIsModeModalOpen] = useState(false);
  const [isRespiratoryAcidosis, setIsRespiratoryAcidosis] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [advance, setAdvance] = useState(false);

  const searchParams = useSearchParams();

  const weight = searchParams.get("weight");
  const age = searchParams.get("age");
  const lungInvolvement = searchParams.get("lungInvolvement");
  const normalLungCondition = searchParams.get("normalLungCondition");
  const obstructiveDisease = searchParams.get("obstructiveDisease");
  const restrictiveDisease = searchParams.get("restrictiveDisease");
  const ventModeParam = searchParams.get("ventMode");
  const initialModeKey = VENT_MODE_KEY_MAP[ventModeParam] || null;

  // تنظیمات فعلی ونتیلاتور — اگر مودی از صفحه قبل انتخاب شده، همان مود
  // با تنظیمات مخصوص نوع درگیری بارگذاری می‌شود؛ در غیر این صورت به
  // تنظیمات پایه (getInitialSettings) برمی‌گردد
  const [currentSettings, setCurrentSettings] = useState(() => {
    const modeResult = getModeSettings(initialModeKey, lungInvolvement, weight);
    if (modeResult) {
      return modeResult.settings;
    }
    const initial = getInitialSettings(
      weight,
      age,
      lungInvolvement,
      normalLungCondition,
      obstructiveDisease,
      restrictiveDisease,
    );
    return {
      ...initial,
      mvent: Number(
        calculateMvent(initial.tidalVolume, initial.respiratoryRate),
      ),
    };
  });

  // اثر برای به‌روزرسانی تنظیمات هنگام تغییر وزن یا نوع درگیری —
  // مود فعلی حفظ می‌شود و فقط اعداد بازمحاسبه می‌شوند
  useEffect(() => {
    const modeResult = getModeSettings(
      currentSettings.mode,
      lungInvolvement,
      weight,
    );

    if (modeResult) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentSettings(modeResult.settings);
      return;
    }

    const newSettings = getInitialSettings(
      weight,
      age,
      lungInvolvement,
      normalLungCondition,
      obstructiveDisease,
      restrictiveDisease,
    );

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentSettings({
      ...newSettings,
      mvent: Number(
        calculateMvent(newSettings.tidalVolume, newSettings.respiratoryRate),
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weight, lungInvolvement]);

  // هندلر انتخاب مود
  const handleModeSelect = (newSettings) => {
    setCurrentSettings({
      ...newSettings,
      mvent: Number(
        calculateMvent(newSettings.tidalVolume, newSettings.respiratoryRate),
      ),
    });
  };

  // هندلر ویرایش تنظیمات
  const handleEditSettings = (editedSettings) => {
    setCurrentSettings({
      ...editedSettings,
      mvent: Number(
        calculateMvent(
          editedSettings.tidalVolume,
          editedSettings.respiratoryRate,
        ),
      ),
    });
    setIsEditModalOpen(false);
  };

  const formatValue = (value, defaultValue = "--") => {
    return value !== undefined && value !== null && value !== ""
      ? value
      : defaultValue;
  };

  const involvementName = getLungInvolvementName(lungInvolvement);
  const involvementDescription = getLungInvolvementDescription(lungInvolvement);

  const weightAgeCheck = useMemo(
    () => checkWeightAgeMismatch(weight, age),
    [weight, age],
  );

  // --------------------------------------------------------------------
  // محاسبه لیست پارامترهای قابل‌نمایش بر اساس مود فعلی
  // --------------------------------------------------------------------
  const activeModeDef = pediatricVentilatorModes[currentSettings.mode];

  const displayKeys = useMemo(() => {
    const baseParams = activeModeDef?.keyParameters || [];
    const includeVteMvent = baseParams.includes("tidalVolume");

    return DISPLAY_ORDER.filter((key) => {
      if (key === "vte" || key === "mvent") return includeVteMvent;
      return baseParams.includes(key);
    });
  }, [activeModeDef]);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-cyan-50 to-blue-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* هدر */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6 border border-blue-100">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">
                تنظیمات اولیه ونتیلاتور
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <p className="text-blue-600 flex items-center gap-2">
                  <span className="font-semibold">نوع درگیری:</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      lungInvolvement === "normal"
                        ? "bg-green-100 text-green-700"
                        : lungInvolvement === "obstructive"
                          ? "bg-orange-100 text-orange-700"
                          : lungInvolvement === "restrictive"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {involvementName}
                  </span>
                </p>
                <span className="text-xs text-gray-400">|</span>
                <p className="text-xs text-gray-500">
                  {involvementDescription}
                </p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setAdvance((prv) => !prv)}
                className="px-4 py-2.5 bg-linear-to-l from-blue-600 to-cyan-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <LuWind className="w-4 h-4" />
                <span className="text-sm font-bold">اختلال O₂/CO₂</span>
                <span
                  className={`transform transition-transform text-xs ${advance ? "rotate-180" : ""}`}
                >
                  ▼
                </span>
              </button>
              <button
                onClick={() => {
                  const modeResult = getModeSettings(
                    currentSettings.mode,
                    lungInvolvement,
                    weight,
                  );
                  if (modeResult) {
                    setCurrentSettings(modeResult.settings);
                    return;
                  }
                  const initial = getInitialSettings(
                    weight,
                    age,
                    lungInvolvement,
                    normalLungCondition,
                    obstructiveDisease,
                    restrictiveDisease,
                  );
                  setCurrentSettings({
                    ...initial,
                    mvent: Number(
                      calculateMvent(
                        initial.tidalVolume,
                        initial.respiratoryRate,
                      ),
                    ),
                  });
                }}
                className="px-3 py-2 border border-gray-300 font-bold text-gray-700 rounded-xl hover:bg-gray-50 transition-all hover:shadow-md"
              >
                بازنشانی تنظیمات
              </button>
              <BackButton />
            </div>
          </div>

          {/* اطلاعات بیمار */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border border-blue-200">
              <p className="text-blue-600 text-sm font-medium">وزن بیمار</p>
              <p className="text-2xl font-bold text-blue-800">
                {weight || "--"} <span className="text-sm font-normal">kg</span>
              </p>
            </div>
            <div className="bg-linear-to-br from-cyan-50 to-cyan-100 rounded-xl p-4 text-center border border-cyan-200">
              <p className="text-cyan-600 text-sm font-medium">سن بیمار</p>
              <p className="text-2xl font-bold text-cyan-800">{age || "--"}</p>
            </div>
          </div>

          {/* هشدار عدم تطابق وزن و سن */}
          {weightAgeCheck?.mismatched && (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3">
              <IoMdAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 leading-relaxed">
                <span className="font-bold">هشدار: </span>
                وزن ({weight} kg) با سن بیمار ({age} سال) همخوانی معمول ندارد —
                وزن تخمینی بر اساس سن حدود {weightAgeCheck.expected} کیلوگرم
                است. این فقط یک بررسی صوری برای خطای احتمالی ثبت اطلاعات است؛
                اگر وزن واقعی و صحیح ثبت شده، طبق شرح‌حال بالینی بیمار عمل کنید.
              </p>
            </div>
          )}
        </div>

        {/* اختلال O2/CO2 - بخش اقدامات درمانی */}
        {advance && (
          <div className="relative bg-white rounded-3xl shadow-xl shadow-blue-900/5 p-6 mb-6 border border-slate-100 overflow-hidden">
            {/* دکوراسیون گرادیان مثل هدر هوم‌پیج */}
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-blue-50 pointer-events-none" />
            <div className="absolute -bottom-14 -right-10 w-36 h-36 rounded-full bg-cyan-50 pointer-events-none" />

            <div className="relative mb-5 flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-blue-700 to-cyan-600 flex items-center justify-center shadow-md shadow-blue-200 shrink-0">
                <LuWind className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold bg-linear-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">
                  اختلال O₂/CO₂
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  بررسی سریع افت اکسیژن، اختلال تهویه (CO₂) و افزایش فشار راه
                  هوایی — علل شایع و اقدام درمانی بر اساس UpToDate
                </p>
              </div>
            </div>

            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <button
                onClick={() => setIsO2ModalOpen(true)}
                className="group relative flex flex-col items-start gap-3 p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/60 hover:shadow-lg transition-all cursor-pointer text-right"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors shrink-0">
                    <LuTrendingDown className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
                      علت افت O₂
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      علل و اقدام درمانی
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setIsHighPIPModalOpen(true)}
                className="group relative flex flex-col items-start gap-3 p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-cyan-400 hover:bg-cyan-50/60 hover:shadow-lg transition-all cursor-pointer text-right"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-50 group-hover:bg-cyan-100 transition-colors shrink-0">
                    <LuTrendingUp className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 group-hover:text-cyan-700 transition-colors">
                      علت افزایش PIP
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      علل و اقدام درمانی
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setIsRespiratoryAcidosis(true)}
                className="group relative flex flex-col items-start gap-3 p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-sky-400 hover:bg-sky-50/60 hover:shadow-lg transition-all cursor-pointer text-right"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-sky-50 group-hover:bg-sky-100 transition-colors shrink-0">
                    <LuActivity className="w-6 h-6 text-sky-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 group-hover:text-sky-700 transition-colors">
                      علت اسیدوز تنفسی (CO₂)
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      علل و اقدام درمانی
                    </p>
                  </div>
                </div>
              </button>
            </div>

            <div className="relative mt-5">
              <ReferenceFooter source="پروتکل‌های بالینی مدیریت اختلالات اکسیژناسیون و تهویه در کودکان (UpToDate / PICU)" />
            </div>
          </div>
        )}

        {/* مودال‌ها */}
        <ModalContainer setIsOpen={setIsO2ModalOpen} isOpen={isO2ModalOpen}>
          <O2DropModal onClose={() => setIsO2ModalOpen(false)} />
        </ModalContainer>

        <ModalContainer
          setIsOpen={setIsHighPIPModalOpen}
          isOpen={isHighPIPModalOpen}
        >
          <HighPIPModal onClose={() => setIsHighPIPModalOpen(false)} />
        </ModalContainer>

        <ModalContainer
          setIsOpen={setIsRespiratoryAcidosis}
          isOpen={isRespiratoryAcidosis}
        >
          <RespiratoryAcidosisModal
            onClose={() => setIsRespiratoryAcidosis(false)}
          />
        </ModalContainer>

        <ModalContainer setIsOpen={setIsModeModalOpen} isOpen={isModeModalOpen}>
          <ModeSelectionModal
            weight={weight}
            lungInvolvement={lungInvolvement}
            normalLungCondition={normalLungCondition}
            obstructiveDisease={obstructiveDisease}
            restrictiveDisease={restrictiveDisease}
            initialSettings={currentSettings}
            onSelect={handleModeSelect}
            onClose={() => setIsModeModalOpen(false)}
          />
        </ModalContainer>

        <ModalContainer setIsOpen={setIsEditModalOpen} isOpen={isEditModalOpen}>
          <EditVentilatorModal
            initialSettings={currentSettings}
            onSave={handleEditSettings}
            onClose={() => setIsEditModalOpen(false)}
          />
        </ModalContainer>
        <ModalContainer setIsOpen={setIsOpen} isOpen={isOpen}>
          <AlarmModal
            currentSettings={currentSettings}
            onClose={() => setIsOpen(false)}
          />
        </ModalContainer>

        {/* مانیتور ونتیلاتور */}
        <div className="relative bg-white rounded-3xl shadow-xl shadow-blue-900/5 p-6 border border-slate-100 overflow-hidden">
          {/* دکوراسیون گرادیان مثل سایر پنل‌ها */}
          <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-blue-50 pointer-events-none" />
          <div className="absolute -bottom-16 -left-10 w-36 h-36 rounded-full bg-cyan-50 pointer-events-none" />

          <div className="relative flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-blue-700 to-cyan-600 flex items-center justify-center shadow-md shadow-blue-200 shrink-0">
                <LuActivity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold bg-linear-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">
                  مانیتور ونتیلاتور
                </h2>
                {activeModeDef && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    نمایش پارامترهای مرتبط با مود{" "}
                    <span className="font-semibold text-blue-600">
                      {activeModeDef.name}
                    </span>
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* انتخاب مد */}
              <button
                onClick={() => setIsModeModalOpen(true)}
                className="px-4 py-2.5 rounded-xl border-2 border-blue-200 bg-blue-50 text-blue-700 font-bold text-sm hover:border-blue-400 hover:bg-blue-100 transition-all shadow-sm hover:shadow-md"
                title="انتخاب مود ونتیلاتور"
              >
                {currentSettings.mode || "VC-SIMV"}
              </button>

              {/* ویرایش تنظیمات */}
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="p-2.5 rounded-xl bg-linear-to-br from-blue-700 to-cyan-600 hover:shadow-lg shadow-md shadow-blue-200 transition-all"
                title="ویرایش تنظیمات ونتیلاتور"
              >
                <FaEdit className="w-5 h-5 text-white" />
              </button>

              {/* آلارم */}
              <button
                onClick={() => setIsOpen(true)}
                className="group p-2.5 rounded-xl bg-white border-2 border-slate-200 hover:border-red-300 hover:bg-red-50 transition-all shadow-sm hover:shadow-md"
                title="تنظیمات آلارم"
              >
                <PiBellLight className="w-5 h-5 text-slate-500 group-hover:text-red-500 transition-colors" />
              </button>
            </div>
          </div>

          {/* بخش مانیتور — داینامیک بر اساس مود */}
          <div className="relative bg-slate-50/70 rounded-2xl p-5 border border-slate-100">
            {displayKeys.length === 0 ? (
              <p className="text-center text-sm text-gray-400 py-8">
                پارامتری برای این مود تعریف نشده است.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3.5">
                {displayKeys.map((key) => {
                  const item = allLabels[key];
                  if (!item) return null;
                  const colorName = PARAM_COLOR[key] || "slate";
                  const style = COLOR_STYLES[colorName];
                  const rawValue = currentSettings[key];
                  const displayValue =
                    key === "mvent"
                      ? formatValue(
                          typeof rawValue === "number"
                            ? rawValue.toFixed(1)
                            : rawValue,
                        )
                      : formatValue(rawValue);

                  return (
                    <div
                      key={key}
                      className={`group relative bg-white rounded-xl border border-slate-200 ${style.ring} shadow-sm hover:shadow-md transition-all overflow-hidden`}
                    >
                      {/* نوار رنگی بالای کارت */}
                      <div className={`h-1 w-full ${style.bar}`} />
                      <div className="px-3.5 py-3 text-center">
                        <h3
                          className={`text-[11px] font-bold uppercase tracking-wider mb-1.5 ${style.label}`}
                        >
                          {item.label}
                        </h3>
                        <p className="text-2xl font-extrabold text-slate-800 tabular-nums leading-none">
                          {displayValue}
                        </p>
                        {item.unit && (
                          <p className="text-[11px] text-slate-400 mt-1 font-medium">
                            {item.unit}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PediatricVentilator;
