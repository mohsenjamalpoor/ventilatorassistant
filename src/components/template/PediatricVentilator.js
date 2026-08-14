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

// لیبل‌های کامل همه پارامترهای ممکن (پایه + مختص مودها)
const allLabels = { ...ventilatorItemLabels, ...modeParameterLabels };

// نگاشت مقدار مود ارسالی از HomePage به شناسه مود در pediatricVentilatorModes
const VENT_MODE_KEY_MAP = { cpap: "CPAP", simv: "SIMV", prvc: "PRVC" };

// استایل رنگی هر پارامتر — کلاس‌های کامل و استاتیک (سازگار با Tailwind JIT)
const COLOR_STYLES = {
  indigo: {
    card: "bg-linear-to-br from-indigo-100 to-indigo-200 border-2 border-indigo-300",
    label: "text-indigo-700",
    value: "text-indigo-900",
    unit: "text-indigo-600",
  },
  green: {
    card: "bg-linear-to-br from-green-100 to-green-200 border-2 border-green-400",
    label: "text-green-700",
    value: "text-green-900",
    unit: "text-green-600",
  },
  purple: {
    card: "bg-linear-to-br from-purple-100 to-purple-200 border-2 border-purple-300",
    label: "text-purple-700",
    value: "text-purple-900",
    unit: "text-purple-600",
  },
  red: {
    card: "bg-linear-to-br from-red-100 to-red-200 border-2 border-red-300",
    label: "text-red-700",
    value: "text-red-900",
    unit: "text-red-600",
  },
  teal: {
    card: "bg-linear-to-br from-teal-100 to-teal-200 border-2 border-teal-300",
    label: "text-teal-700",
    value: "text-teal-900",
    unit: "text-teal-600",
  },
  blue: {
    card: "bg-linear-to-br from-blue-100 to-blue-200 border-2 border-blue-300",
    label: "text-blue-700",
    value: "text-blue-900",
    unit: "text-blue-600",
  },
  orange: {
    card: "bg-linear-to-br from-orange-100 to-orange-200 border-2 border-orange-300",
    label: "text-orange-700",
    value: "text-orange-900",
    unit: "text-orange-600",
  },
  violet: {
    card: "bg-linear-to-br from-violet-100 to-violet-200 border-2 border-violet-300",
    label: "text-violet-700",
    value: "text-violet-900",
    unit: "text-violet-600",
  },
  pink: {
    card: "bg-linear-to-br from-pink-100 to-pink-200 border-2 border-pink-300",
    label: "text-pink-700",
    value: "text-pink-900",
    unit: "text-pink-600",
  },
  amber: {
    card: "bg-linear-to-br from-amber-100 to-amber-200 border-2 border-amber-300",
    label: "text-amber-700",
    value: "text-amber-900",
    unit: "text-amber-600",
  },
  slate: {
    card: "bg-linear-to-br from-slate-100 to-slate-200 border-2 border-slate-300",
    label: "text-slate-700",
    value: "text-slate-900",
    unit: "text-slate-600",
  },
  sky: {
    card: "bg-linear-to-br from-sky-100 to-sky-200 border-2 border-sky-300",
    label: "text-sky-700",
    value: "text-sky-900",
    unit: "text-sky-600",
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
                className="px-2 py-2  border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all hover:shadow-md flex items-center gap-2"
              >
                <LuStethoscope className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-bold">مدیریت مشکلات تنفسی</span>
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
            <div
              className={`bg-linear-to-br rounded-xl p-4 text-center border ${
                lungInvolvement === "normal"
                  ? "from-green-50 to-green-100 border-green-200"
                  : lungInvolvement === "obstructive"
                    ? "from-orange-50 to-orange-100 border-orange-200"
                    : lungInvolvement === "restrictive"
                      ? "from-red-50 to-red-100 border-red-200"
                      : "from-gray-50 to-gray-100 border-gray-200"
              }`}
            >
              <p
                className={`text-sm font-medium ${
                  lungInvolvement === "normal"
                    ? "text-green-600"
                    : lungInvolvement === "obstructive"
                      ? "text-orange-600"
                      : lungInvolvement === "restrictive"
                        ? "text-red-600"
                        : "text-gray-600"
                }`}
              >
                نوع درگیری
              </p>
              <p
                className={`text-2xl font-bold ${
                  lungInvolvement === "normal"
                    ? "text-green-800"
                    : lungInvolvement === "obstructive"
                      ? "text-orange-800"
                      : lungInvolvement === "restrictive"
                        ? "text-red-800"
                        : "text-gray-800"
                }`}
              >
                {involvementName}
              </p>
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

        {/* عیب‌یابی بالینی - بخش اقدامات درمانی */}
        {advance && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                مدیریت مشکلات تنفسی
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Respiratory Troubleshooting — ارزیابی سریع و اقدامات اولیه در
                مشکلات شایع تنفسی
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <button
                onClick={() => setIsO2ModalOpen(true)}
                className="group relative flex flex-col items-start gap-3 p-5 rounded-xl border-2 border-gray-200 bg-white hover:border-red-300 hover:shadow-lg transition-all cursor-pointer text-right hover:bg-red-50"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-50 group-hover:bg-red-100 transition-colors shrink-0">
                    <LuTrendingDown className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 group-hover:text-red-700 transition-colors">
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
                className="group relative flex flex-col items-start gap-3 p-5 rounded-xl border-2 border-gray-200 bg-white hover:border-orange-300 hover:shadow-lg transition-all cursor-pointer text-right hover:bg-orange-50"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-orange-50 group-hover:bg-orange-100 transition-colors shrink-0">
                    <LuTrendingUp className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 group-hover:text-orange-700 transition-colors">
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
                className="group relative flex flex-col items-start gap-3 p-5 rounded-xl border-2 border-gray-200 bg-white hover:border-rose-300 hover:shadow-lg transition-all cursor-pointer text-right hover:bg-rose-50"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-rose-50 group-hover:bg-rose-100 transition-colors shrink-0">
                    <LuActivity className="w-6 h-6 text-rose-500" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 group-hover:text-rose-700 transition-colors">
                      علت اسیدوز تنفسی
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      علل و اقدام درمانی
                    </p>
                  </div>
                </div>
              </button>
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
        <div className="bg-linear-to-br from-blue-50/95 to-cyan-50/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h2 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                مانیتور ونتیلاتور
              </h2>
              {activeModeDef && (
                <p className="text-xs text-blue-500/70 mt-0.5">
                  نمایش پارامترهای مرتبط با مود {activeModeDef.name}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* انتخاب مد */}
              <button
                onClick={() => setIsModeModalOpen(true)}
                className="group relative p-3 bg-linear-to-r from-blue-50 to-cyan-50 rounded-lg hover:bg-blue-600 transition-all shadow-md hover:shadow-lg"
                title="انتخاب مود ونتیلاتور"
              >
                <p className="text-sm font-bold text-blue-800">
                  {currentSettings.mode || "SIMV"}
                </p>
              </button>

              {/* ویرایش تنظیمات */}
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="group p-2 rounded-xl bg-green-500 hover:bg-green-600 transition-all shadow-md hover:shadow-lg"
                title="ویرایش تنظیمات ونتیلاتور"
              >
                <FaEdit className="w-6 h-6 text-white" />
              </button>

              {/* آلارم */}
              <button
                onClick={() => setIsOpen(true)}
                className="group relative p-2 rounded-xl bg-red-500 hover:bg-red-600 transition-all shadow-md hover:shadow-lg"
                title="تنظیمات آلارم"
              >
                <PiBellLight className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
              </button>
            </div>
          </div>

          {/* بخش مانیتور — داینامیک بر اساس مود */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-blue-100 shadow-inner">
            {displayKeys.length === 0 ? (
              <p className="text-center text-sm text-gray-400 py-6">
                پارامتری برای این مود تعریف نشده است.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
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
                      className={`rounded-xl p-4 shadow-sm hover:shadow-md transition-all ${style.card}`}
                    >
                      <div className="text-center">
                        <h3
                          className={`text-xs font-bold uppercase tracking-wider mb-2 ${style.label}`}
                        >
                          {item.label}
                        </h3>
                        <p className={`text-2xl font-bold ${style.value}`}>
                          {displayValue}
                        </p>
                        {item.unit && (
                          <p className={`text-xs mt-1 ${style.unit}`}>
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
