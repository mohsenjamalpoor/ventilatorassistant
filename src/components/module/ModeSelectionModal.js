"use client";

import { useState } from "react";
import { LuX, LuCheck, LuActivity } from "react-icons/lu";
import {
  getDiseaseName,
  ventilatorItemLabels,
  ventilatorItemOrder,
} from "../../utils/Initialsettingsconfig ";

const MODES = [
  { id: "VC", name: "Volume Control (VC)", desc: "حجم جاری ثابت، فشار متغیر" },
  { id: "PC", name: "Pressure Control (PC)", desc: "فشار ثابت، حجم متغیر" },
  { id: "SIMV", name: "SIMV", desc: "تهویه اجباری متناوب همگام" },
  { id: "PSV", name: "PSV", desc: "حمایت فشاری، تنفس خودبخودی" },
];

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
    initialSettings.mode || null,
  );

  const diseaseName = getDiseaseName(
    lungInvolvement,
    normalLungCondition,
    obstructiveDisease,
    restrictiveDisease,
  );

  const handleConfirm = () => {
    if (!selectedMode) return;
    onSelect?.({ ...initialSettings, mode: selectedMode });
    onClose?.();
  };

  return (
    <div className="w-[92vw] max-w-3xl max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-2">
          <LuActivity className="w-6 h-6 text-blue-600" />
          <h2 className="text-lg font-bold text-gray-800">
            انتخاب مد ونتیلاتور
          </h2>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-1.5 transition-colors"
          >
            <LuX className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="overflow-y-auto p-6 space-y-6">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <p className="text-sm text-blue-700">
            بیماری: <span className="font-bold">{diseaseName}</span> — تنظیمات
            پیشنهادی زیر بر اساس این تشخیص و وزن بیمار محاسبه شده است.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-3">
            مد ونتیلاتور
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MODES.map((m) => {
              const isSelected = selectedMode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedMode(m.id)}
                  className={`flex items-start justify-between gap-2 p-4 rounded-xl border text-right transition-all ${
                    isSelected
                      ? "border-blue-500 bg-blue-50 shadow-sm"
                      : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
                  }`}
                >
                  <div>
                    <p
                      className={`font-bold ${isSelected ? "text-blue-800" : "text-gray-800"}`}
                    >
                      {m.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{m.desc}</p>
                  </div>
                  {isSelected && (
                    <LuCheck className="w-5 h-5 text-blue-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-3">
            تنظیمات اولیه پیشنهادی (وزن {weight} کیلوگرم)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {ventilatorItemOrder
              .filter(
                (key) => key !== "mode" && initialSettings[key] !== undefined,
              )
              .map((key) => (
                <div
                  key={key}
                  className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100"
                >
                  <p className="text-xs text-gray-500 mb-1">
                    {ventilatorItemLabels[key]?.label}
                  </p>
                  <p className="text-lg font-bold text-gray-800">
                    {initialSettings[key]}
                    <span className="text-xs text-gray-400 mr-1">
                      {ventilatorItemLabels[key]?.unit}
                    </span>
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-gray-100 shrink-0 flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
        >
          انصراف
        </button>
        <button
          onClick={handleConfirm}
          disabled={!selectedMode}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          اعمال تنظیمات
        </button>
      </div>
    </div>
  );
}

export default ModeSelectionModal;
