"use client";

import { useState } from "react";
import { LuCheck, LuX } from "react-icons/lu";

import {
  getLungInvolvementName, // تغییر نام تابع
  ventilatorItemLabels,
  ventilatorItemOrder,
} from "../../utils/Initialsettingsconfig ";

import { pediatricVentilatorModes } from "../../utils/ventilatorModes";

function ModeSelectionModal({
  weight,
  lungInvolvement,
  normalLungCondition,
  obstructiveDisease,
  restrictiveDisease,
  initialSettings,
  onSelect,
  onClose,
}) {
  const [selectedMode, setSelectedMode] = useState(
    initialSettings?.mode || null,
  );

  // --------------------------------------------------
  // نام نوع درگیری
  // --------------------------------------------------

  const involvementName = getLungInvolvementName(lungInvolvement);

  // --------------------------------------------------
  // اعمال Mode انتخاب شده
  // --------------------------------------------------

  const handleConfirm = () => {
    if (!selectedMode) return;

    onSelect?.({
      ...initialSettings,
      mode: selectedMode,
    });

    onClose?.();
  };

  return (
    <div className="flex max-h-[90vh] flex-col overflow-hidden rounded-2xl bg-white">
      <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-6 py-4">
        <h2 className="text-lg font-bold text-gray-800">انتخاب مد ونتیلاتور</h2>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
            aria-label="بستن"
          >
            <LuX className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* ==================================================
          Content
      ================================================== */}

      <div className="space-y-6 overflow-y-auto p-6">
        {/* --------------------------------------------------
            اطلاعات نوع درگیری
        -------------------------------------------------- */}

        <div
          className={`rounded-xl border p-4 ${
            lungInvolvement === "normal"
              ? "border-green-100 bg-green-50"
              : lungInvolvement === "obstructive"
                ? "border-orange-100 bg-orange-50"
                : lungInvolvement === "restrictive"
                  ? "border-red-100 bg-red-50"
                  : "border-blue-100 bg-blue-50"
          }`}
        >
          <p
            className={`text-sm ${
              lungInvolvement === "normal"
                ? "text-green-700"
                : lungInvolvement === "obstructive"
                  ? "text-orange-700"
                  : lungInvolvement === "restrictive"
                    ? "text-red-700"
                    : "text-blue-700"
            }`}
          >
            نوع درگیری: <span className="font-bold">{involvementName}</span> —
            تنظیمات پیشنهادی بر اساس نوع درگیری و وزن بیمار محاسبه شده است.
          </p>
        </div>

        {/* --------------------------------------------------
            انتخاب Mode
        -------------------------------------------------- */}

        <section>
          <h3 className="mb-3 text-sm font-semibold text-gray-500">
            مد ونتیلاتور
          </h3>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {Object.entries(pediatricVentilatorModes).map(([modeId, mode]) => {
              const isSelected = selectedMode === modeId;

              return (
                <button
                  key={modeId}
                  type="button"
                  onClick={() => setSelectedMode(modeId)}
                  className={`flex flex-col gap-3 rounded-xl border p-4 text-right transition-all ${
                    isSelected
                      ? "border-blue-500 bg-blue-50 shadow-sm"
                      : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
                  }`}
                >
                  {/* Mode header */}

                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{mode.icon}</span>

                      <div>
                        <p
                          className={`font-bold ${
                            isSelected ? "text-blue-800" : "text-gray-800"
                          }`}
                        >
                          {mode.name}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {mode.description}
                        </p>
                      </div>
                    </div>

                    {isSelected && (
                      <LuCheck className="h-5 w-5  shrink-0 text-blue-600" />
                    )}
                  </div>

                  {/* Clinical indications */}

                  <div className="border-t border-gray-100 pt-3">
                    <p className="mb-2 text-xs font-semibold text-gray-500">
                      موارد کاربرد
                    </p>

                    <ul className="space-y-1 text-xs text-gray-600">
                      {mode.clinicalIndications.map((item, index) => (
                        <li key={index} className="flex gap-1">
                          <span>•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Advantages */}

                  <div className="border-t border-gray-100 pt-3">
                    <p className="mb-2 text-xs font-semibold text-gray-500">
                      مزایا
                    </p>

                    <ul className="space-y-1 text-xs text-gray-600">
                      {mode.advantages.map((item, index) => (
                        <li key={index} className="flex gap-1">
                          <span>✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* --------------------------------------------------
            تنظیمات اولیه
        -------------------------------------------------- */}

        <section>
          <h3 className="mb-3 text-sm font-semibold text-gray-500">
            تنظیمات اولیه پیشنهادی {weight && `(وزن ${weight} کیلوگرم)`}
          </h3>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {ventilatorItemOrder
              .filter(
                (key) => key !== "mode" && initialSettings?.[key] !== undefined,
              )
              .map((key) => {
                const item = ventilatorItemLabels[key];

                return (
                  <div
                    key={key}
                    className="rounded-lg border border-gray-100 bg-gray-50 p-3 text-center"
                  >
                    <p className="mb-1 text-xs text-gray-500">{item?.label}</p>

                    <p className="text-lg font-bold text-gray-800">
                      {initialSettings[key]}

                      {item?.unit && (
                        <span className="mr-1 text-xs text-gray-400">
                          {item.unit}
                        </span>
                      )}
                    </p>
                  </div>
                );
              })}
          </div>
        </section>
      </div>

      {/* ==================================================
          Footer
      ================================================== */}

      <div className="flex shrink-0 justify-end gap-2 border-t border-gray-100 px-6 py-4">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg px-4 py-2 text-gray-600 transition-colors hover:bg-gray-100"
        >
          انصراف
        </button>

        <button
          type="button"
          onClick={handleConfirm}
          disabled={!selectedMode}
          className="rounded-lg bg-blue-600 px-5 py-2 font-bold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          اعمال تنظیمات
        </button>
      </div>
    </div>
  );
}

export default ModeSelectionModal;
