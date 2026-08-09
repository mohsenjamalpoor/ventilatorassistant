"use client";

import { useState } from "react";

import {
  ventilatorItemLabels,
  ventilatorItemOrder,
} from "../../utils/Initialsettingsconfig ";
import { LuActivity, LuSave, LuSlidersHorizontal, LuX } from "react-icons/lu";

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

  // گروه‌بندی تنظیمات
  const ventilationGroup = ["mode", "respiratoryRate", "tidalVolume", "vte"];
  const pressureGroup = ["pip", "peep", "pressureSupport", "cpap"];
  const timingGroup = ["ieRatio", "ti", "flowRate", "trigger"];
  const oxygenGroup = ["fio2"];

  const renderSettingItem = (key) => {
    const item = ventilatorItemLabels[key];
    const value = settings[key];

    if (!item) return null;

    return (
      <div key={key} className="space-y-1">
        <label className="text-xs font-medium text-gray-600 block">
          {item.label}
        </label>
        <input
          type={key === "mode" ? "text" : "number"}
          value={value || ""}
          onChange={(e) => handleInputChange(key, e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-sm bg-white"
          placeholder={item.label}
          step={key === "ieRatio" ? "0.1" : key === "flowRate" ? "1" : "0.1"}
          min={0}
        />
        {item.unit && (
          <span className="text-xs text-gray-400">{item.unit}</span>
        )}
      </div>
    );
  };

  return (
    <div className="flex max-h-[90vh] flex-col overflow-hidden rounded-2xl bg-white w-full max-w-4xl">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-6 py-4 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500 rounded-xl">
            <LuSlidersHorizontal className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              ویرایش تنظیمات ونتیلاتور
            </h2>
            <p className="text-xs text-gray-500">
              تنظیمات پیشرفته ونتیلاتور را ویرایش کنید
            </p>
          </div>
        </div>
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

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* گروه تهویه */}
          <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center gap-2 mb-4">
              <LuActivity className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-blue-800 text-sm">تنظیمات تهویه</h3>
            </div>
            <div className="space-y-4">
              {ventilationGroup.map(renderSettingItem)}
            </div>
          </div>

          {/* گروه فشار */}
          <div className="bg-purple-50/50 rounded-xl p-4 border border-purple-100">
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="w-4 h-4 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <h3 className="font-bold text-purple-800 text-sm">
                تنظیمات فشار
              </h3>
            </div>
            <div className="space-y-4">
              {pressureGroup.map(renderSettingItem)}
            </div>
          </div>

          {/* گروه زمان‌بندی */}
          <div className="bg-green-50/50 rounded-xl p-4 border border-green-100">
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="w-4 h-4 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="font-bold text-green-800 text-sm">
                تنظیمات زمان‌بندی
              </h3>
            </div>
            <div className="space-y-4">
              {timingGroup.map(renderSettingItem)}
            </div>
          </div>

          {/* گروه اکسیژن */}
          <div className="bg-red-50/50 rounded-xl p-4 border border-red-100">
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="w-4 h-4 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="font-bold text-red-800 text-sm">تنظیمات اکسیژن</h3>
            </div>
            <div className="space-y-4">
              {oxygenGroup.map(renderSettingItem)}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex shrink-0 justify-end gap-3 border-t border-gray-100 px-6 py-4 bg-gray-50/50">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg px-5 py-2.5 text-gray-600 transition-colors hover:bg-gray-100 font-medium"
        >
          انصراف
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2.5 font-bold text-white transition-all hover:from-blue-700 hover:to-cyan-700 shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <LuSave className="w-4 h-4" />
          ذخیره تنظیمات
        </button>
      </div>
    </div>
  );
}

export default EditVentilatorModal;
