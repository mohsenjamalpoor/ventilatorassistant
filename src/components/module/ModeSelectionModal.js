"use client";

import { useMemo, useState } from "react";
import {
  LuCheck,
  LuX,
  LuInfo,
  LuTriangleAlert,
  LuSlidersHorizontal,
  LuLightbulb,
} from "react-icons/lu";

import { ventilatorItemLabels } from "../../utils/Initialsettingsconfig ";
import {
  pediatricVentilatorModes,
  modeParameterLabels,
  getModeSettings,
  modeOrder,
} from "../../utils/ventilatorModes";
import NoteCard from "./shared/NoteCard";
import ReferenceFooter from "./shared/ReferenceFooter";

const allLabels = { ...ventilatorItemLabels, ...modeParameterLabels };

const involvementTheme = {
  normal: {
    text: "text-green-700",
    bg: "bg-green-50",
    border: "border-green-100",
    chip: "bg-green-100 text-green-700",
  },
  obstructive: {
    text: "text-orange-700",
    bg: "bg-orange-50",
    border: "border-orange-100",
    chip: "bg-orange-100 text-orange-700",
  },
  restrictive: {
    text: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-100",
    chip: "bg-red-100 text-red-700",
  },
  default: {
    text: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-100",
    chip: "bg-blue-100 text-blue-700",
  },
};

const involvementLabel = {
  normal: "ریه نرمال",
  obstructive: "بیماری انسدادی",
  restrictive: "بیماری محدودکننده",
};

// نکته فوق‌تخصصی مختص هر مود (اختیاری—وقتی موجود نباشد بخش نمایش داده نمی‌شود)
const modePearls = {
  "VC-AC":
    "در بیمار با کمپلیانس متغیر (مثل ARDS در حال پیشرفت)، فشار پیک را مرتب پایش کنید؛ افزایش ناگهانی آن هشدار زودهنگام افت کمپلیانس است.",
  "PC-AC":
    "چون حجم جاری تضمین‌شده نیست، VTe باید در هر شیفت پایش و با تغییر کمپلیانس/مقاومت، فشار کنترل بازبینی شود.",
  SIMV: "در بیمار با تلاش تنفسی ضعیف، PS ناکافی می‌تواند کار تنفسی تنفس‌های خودبه‌خودی را به‌شدت بالا ببرد—افزایش کار تنفسی را با پایش RR و علائم دیسترس رصد کنید.",
  PRVC: "این مود معمولاً پیش‌فرض مناسبی برای اغلب بیماران PICU با کمپلیانس متغیر است؛ الگوریتم دستگاه با تاخیر چند تنفسی به تغییرات پاسخ می‌دهد.",
  PSV: "بدون بک‌آپ تنفسی، همیشه باید آلارم آپنه فعال و به‌درستی تنظیم شده باشد.",
  CPAP: "مناسب‌ترین مرحله برای ارزیابی نهایی آمادگی اکستوباسیون است، نه یک مود درمانی طولانی‌مدت در نارسایی تنفسی فعال.",
  HFOV: "قبل از شروع، اطمینان از حجم داخل عروقی کافی مهم است؛ MAP بالا می‌تواند برگشت وریدی و برون‌ده قلبی را کاهش دهد.",
};

function ModeSelectionModal({
  weight,
  lungInvolvement,
  initialSettings,
  onSelect,
  onClose,
}) {
  const [selectedMode, setSelectedMode] = useState(
    initialSettings?.mode || null,
  );
  const [activeCategory, setActiveCategory] = useState("conventional");

  const theme = involvementTheme[lungInvolvement] || involvementTheme.default;

  const computed = useMemo(() => {
    if (!selectedMode) return null;
    return getModeSettings(selectedMode, lungInvolvement, weight);
  }, [selectedMode, lungInvolvement, weight]);

  const modesInCategory = modeOrder.filter(
    (id) => pediatricVentilatorModes[id].category === activeCategory,
  );

  const handleConfirm = () => {
    if (!computed) return;
    onSelect?.(computed.settings);
    onClose?.();
  };

  const selectedModeDef = selectedMode
    ? pediatricVentilatorModes[selectedMode]
    : null;

  return (
    <div
      dir="rtl"
      className="flex w-[95vw] max-w-4xl max-h-[90vh] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
    >
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between bg-gradient-to-l from-blue-600 to-cyan-500 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
            <LuSlidersHorizontal className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg leading-tight">
              انتخاب مد ونتیلاتور
            </h2>
            <p className="text-blue-100 text-xs mt-0.5">
              تنظیمات پیشنهادی بر اساس مد و نوع درگیری ریه محاسبه می‌شود
            </p>
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors shrink-0"
            aria-label="بستن"
          >
            <LuX className="h-5 w-5 text-white" />
          </button>
        )}
      </div>

      {/* Involvement banner */}
      <div
        className={`shrink-0 border-b px-6 py-2.5 ${theme.bg} ${theme.border}`}
      >
        <p className={`text-xs ${theme.text}`}>
          نوع درگیری فعلی بیمار:{" "}
          <span className="font-bold">
            {involvementLabel[lungInvolvement] || "نامشخص"}
          </span>{" "}
          {weight && <span>— وزن {weight} کیلوگرم</span>}
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex shrink-0 gap-2 border-b border-gray-100 px-6 pt-3">
        {[
          { id: "conventional", label: "مودهای متداول" },
          { id: "advanced", label: "مودهای پیشرفته" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`rounded-t-lg px-4 py-2 text-sm font-semibold transition-colors ${
              activeCategory === tab.id
                ? "border-b-2 border-blue-600 text-blue-700"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Mode cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {modesInCategory.map((modeId) => {
            const mode = pediatricVentilatorModes[modeId];
            const isSelected = selectedMode === modeId;

            return (
              <button
                key={modeId}
                type="button"
                onClick={() => setSelectedMode(modeId)}
                className={`flex flex-col gap-3 rounded-xl border p-4 text-right transition-all ${
                  isSelected
                    ? "border-blue-500 bg-blue-50 shadow-sm ring-1 ring-blue-200"
                    : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <span className="text-xl">{mode.icon}</span>
                    <div>
                      <p
                        className={`font-bold ${isSelected ? "text-blue-800" : "text-gray-800"}`}
                      >
                        {mode.name}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        {mode.fullName}
                      </p>
                      <p className="mt-1.5 text-xs text-gray-500 leading-5">
                        {mode.description}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <LuCheck className="h-5 w-5 shrink-0 text-blue-600" />
                  )}
                </div>

                <div className="border-t border-gray-100 pt-2.5">
                  <p className="mb-1.5 text-[11px] font-semibold text-gray-500">
                    موارد کاربرد
                  </p>
                  <ul className="space-y-1 text-xs text-gray-600">
                    {mode.clinicalIndications.slice(0, 2).map((item, i) => (
                      <li key={i} className="flex gap-1">
                        <span>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {mode.keyParameters.slice(0, 4).map((key) => (
                    <span
                      key={key}
                      className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500"
                    >
                      {allLabels[key]?.label || key}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected mode detail */}
        {selectedMode && selectedModeDef && (
          <section className="rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-gray-800">
                جزئیات {selectedModeDef.name}
              </h3>
              <span
                className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${theme.chip}`}
              >
                تنظیمات برای{" "}
                {involvementLabel[computed?.involvementUsed] || "ریه نرمال"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <p className="mb-1.5 text-xs font-semibold text-emerald-600">
                  مزایا
                </p>
                <ul className="space-y-1 text-xs text-gray-600">
                  {selectedModeDef.advantages.map((item, i) => (
                    <li key={i} className="flex gap-1">
                      <span>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-1.5 text-xs font-semibold text-amber-600">
                  محدودیت‌ها
                </p>
                <ul className="space-y-1 text-xs text-gray-600">
                  {selectedModeDef.disadvantages.map((item, i) => (
                    <li key={i} className="flex gap-1">
                      <span>−</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {computed?.note && (
              <div className="flex items-start gap-2 rounded-lg bg-blue-50 border border-blue-100 px-3 py-2">
                <LuInfo className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                <p className="text-xs text-blue-700 leading-5">
                  {computed.note}
                </p>
              </div>
            )}

            {selectedModeDef.category === "advanced" && (
              <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2">
                <LuTriangleAlert className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-700 leading-5">
                  این یک مود پیشرفته/نجات است و استفاده از آن نیازمند تجربه و
                  پایش تخصصی بالینی است.
                </p>
              </div>
            )}

            {/* Computed settings grid */}
            {computed && (
              <div>
                <p className="mb-2 text-[11px] font-semibold text-gray-500">
                  تنظیمات محاسبه‌شده
                </p>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {Object.entries(computed.settings)
                    .filter(([key]) => key !== "mode")
                    .map(([key, value]) => {
                      const item = allLabels[key];
                      if (!item) return null;
                      return (
                        <div
                          key={key}
                          className="rounded-lg border border-gray-200 bg-white p-3 text-center"
                        >
                          <p className="mb-1 text-[11px] text-gray-400">
                            {item.label}
                          </p>
                          <p className="text-base font-bold text-gray-800">
                            {value}
                            {item.unit && (
                              <span className="mr-1 text-[10px] font-normal text-gray-400">
                                {item.unit}
                              </span>
                            )}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* نکته فوق‌تخصصی مختص مود */}
            {modePearls[selectedMode] && (
              <NoteCard icon={LuLightbulb} title="نکته فوق‌تخصصی" tone="amber">
                {modePearls[selectedMode]}
              </NoteCard>
            )}
          </section>
        )}

        <ReferenceFooter
          source={
            pediatricVentilatorModes[selectedMode]?.reference ||
            "UpToDate — Modes of mechanical ventilation"
          }
        />
      </div>

      {/* Footer */}
      <div className="flex shrink-0 justify-end gap-3 border-t border-gray-100 px-6 py-4">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl px-5 py-2.5 text-gray-600 transition-colors hover:bg-gray-100 font-medium text-sm"
        >
          انصراف
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={!selectedMode}
          className="rounded-xl bg-gradient-to-l from-blue-600 to-cyan-500 px-6 py-2.5 font-bold text-white text-sm transition-opacity hover:opacity-90 shadow-md disabled:cursor-not-allowed disabled:opacity-40"
        >
          اعمال تنظیمات
        </button>
      </div>
    </div>
  );
}

export default ModeSelectionModal;
