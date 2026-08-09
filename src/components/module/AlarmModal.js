"use client";

import { LuX, LuBell, LuTriangleAlert } from "react-icons/lu";
import { calculateAlarmRanges } from "../../utils/Initialsettingsconfig "; // ⚠️ مسیر رو هماهنگ کن

function AlarmModal({ currentSettings, onClose }) {
  const ranges = calculateAlarmRanges(currentSettings);

  const items = [
    { key: "rr", label: "تعداد تنفس (RR)", unit: "/min", color: "green" },
    {
      key: "mvent",
      label: "تهویه دقیقه‌ای (MVent)",
      unit: "L/min",
      color: "teal",
    },
    { key: "peep", label: "PEEP", unit: "cmH₂O", color: "red" },
  ];

  const colorMap = {
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-700",
      bar: "bg-green-400",
    },
    teal: {
      bg: "bg-teal-50",
      border: "border-teal-200",
      text: "text-teal-700",
      bar: "bg-teal-400",
    },
    red: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-700",
      bar: "bg-red-400",
    },
  };

  return (
    <div className="w-[92vw] max-w-xl max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-2">
          <LuBell className="w-6 h-6 text-red-500" />
          <h2 className="text-lg font-bold text-gray-800">محدوده‌های آلارم</h2>
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

      <div className="overflow-y-auto p-6 space-y-4">
        <p className="text-sm text-gray-500 flex items-start gap-2">
          <LuTriangleAlert className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
          محدوده‌های آلارم به‌طور خودکار بر اساس تنظیمات فعلی ونتیلاتور محاسبه
          شده‌اند و با هر تغییر در مد یا تنظیمات به‌روز می‌شوند.
        </p>

        {items.map(({ key, label, unit, color }) => {
          const r = ranges[key];
          const c = colorMap[color];
          if (!r) return null;

          const low = parseFloat(r.low);
          const high = parseFloat(r.high);
          const current = parseFloat(r.current);
          const percent = Math.min(
            100,
            Math.max(0, ((current - low) / (high - low)) * 100),
          );

          return (
            <div
              key={key}
              className={`rounded-xl border ${c.border} ${c.bg} p-4`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`font-bold ${c.text}`}>{label}</span>
                <span className="text-sm text-gray-500">
                  فعلی:{" "}
                  <span className="font-bold text-gray-800">{r.current}</span>{" "}
                  {unit}
                </span>
              </div>

              <div className="relative h-2 rounded-full bg-white border border-gray-200 mb-2">
                <div
                  className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full ${c.bar} border-2 border-white shadow`}
                  style={{ left: `calc(${percent}% - 6px)` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>
                  حد پایین: {r.low} {unit}
                </span>
                <span>
                  حد بالا: {r.high} {unit}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AlarmModal;
