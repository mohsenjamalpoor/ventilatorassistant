"use client";

import { useState } from "react";
import {
  LuActivity,
  LuSave,
  LuSlidersHorizontal,
  LuX,
  LuGauge,
  LuClock,
  LuWind,
} from "react-icons/lu";

import { ventilatorItemLabels } from "../../utils/Initialsettingsconfig ";

const GROUPS = [
  {
    id: "ventilation",
    title: "تنظیمات تهویه",
    icon: LuActivity,
    color: {
      bg: "bg-blue-50/60",
      border: "border-blue-100",
      text: "text-blue-800",
      iconBg: "bg-blue-500",
      ring: "focus:border-blue-500 focus:ring-blue-200",
    },
    keys: ["mode", "respiratoryRate", "tidalVolume", "vte"],
  },
  {
    id: "pressure",
    title: "تنظیمات فشار",
    icon: LuGauge,
    color: {
      bg: "bg-purple-50/60",
      border: "border-purple-100",
      text: "text-purple-800",
      iconBg: "bg-purple-500",
      ring: "focus:border-purple-500 focus:ring-purple-200",
    },
    keys: ["pip", "peep", "pressureSupport", "cpap"],
  },
  {
    id: "timing",
    title: "تنظیمات زمان‌بندی",
    icon: LuClock,
    color: {
      bg: "bg-green-50/60",
      border: "border-green-100",
      text: "text-green-800",
      iconBg: "bg-green-500",
      ring: "focus:border-green-500 focus:ring-green-200",
    },
    keys: ["ieRatio", "ti", "flowRate", "trigger"],
  },
  {
    id: "oxygen",
    title: "تنظیمات اکسیژن",
    icon: LuWind,
    color: {
      bg: "bg-red-50/60",
      border: "border-red-100",
      text: "text-red-800",
      iconBg: "bg-red-500",
      ring: "focus:border-red-500 focus:ring-red-200",
    },
    keys: ["fio2"],
  },
];

function EditVentilatorModal({ initialSettings, onSave, onClose }) {
  const [settings, setSettings] = useState({ ...initialSettings });

  const handleInputChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    onSave?.(settings);
    onClose?.();
  };

  return (
    <div
      dir="rtl"
      className="flex w-full max-w-4xl max-h-[90vh] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
    >
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-6 py-4 bg-gradient-to-l from-blue-600 to-cyan-500">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
            <LuSlidersHorizontal className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white leading-tight">
              ویرایش تنظیمات ونتیلاتور
            </h2>
            <p className="text-xs text-blue-100 mt-0.5">
              تنظیمات پیشرفته ونتیلاتور را ویرایش کنید
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

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50/40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {GROUPS.map((group) => {
            const GroupIcon = group.icon;
            return (
              <div
                key={group.id}
                className={`rounded-2xl p-5 border ${group.color.bg} ${group.color.border}`}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div
                    className={`w-8 h-8 rounded-lg ${group.color.iconBg} flex items-center justify-center shrink-0`}
                  >
                    <GroupIcon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className={`font-bold text-sm ${group.color.text}`}>
                    {group.title}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  {group.keys.map((key) => {
                    const item = ventilatorItemLabels[key];
                    if (!item) return null;
                    const value = settings[key];

                    return (
                      <div key={key} className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-600 block">
                          {item.label}
                        </label>
                        <div className="relative">
                          <input
                            type={key === "mode" ? "text" : "number"}
                            value={value ?? ""}
                            onChange={(e) =>
                              handleInputChange(key, e.target.value)
                            }
                            className={`w-full px-3 py-2.5 border border-gray-200 rounded-xl outline-none text-sm bg-white transition-all focus:ring-2 ${group.color.ring} ${
                              item.unit ? "pl-12" : ""
                            }`}
                            placeholder={item.label}
                            step={key === "ieRatio" ? undefined : "0.1"}
                            min={key === "mode" ? undefined : 0}
                          />
                          {item.unit && (
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-gray-400 pointer-events-none">
                              {item.unit}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="flex shrink-0 justify-end gap-3 border-t border-gray-100 px-6 py-4 bg-white">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl px-5 py-2.5 text-gray-600 transition-colors hover:bg-gray-100 font-medium text-sm"
        >
          انصراف
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="rounded-xl bg-gradient-to-l from-blue-600 to-cyan-500 px-6 py-2.5 font-bold text-white text-sm transition-opacity hover:opacity-90 shadow-md flex items-center gap-2"
        >
          <LuSave className="w-4 h-4" />
          ذخیره تنظیمات
        </button>
      </div>
    </div>
  );
}

export default EditVentilatorModal;
