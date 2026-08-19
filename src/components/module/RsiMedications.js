"use client";

import { useState } from "react";
import {
  LuTriangleAlert,
  LuBan,
  LuLightbulb,
  LuTimer,
  LuChevronDown,
} from "react-icons/lu";

function RsiMedications({ med, doseText }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`rounded-2xl border-2 overflow-hidden transition-colors ${
        isOpen ? "border-blue-200 bg-white" : "border-gray-200 bg-white"
      }`}
    >
      {/* هدر — همیشه نمایان: فقط نام و دوز */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3"
      >
        <span className="text-sm font-bold text-gray-800 leading-tight truncate min-w-0">
          {med.name}
        </span>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 rounded-full px-2.5 py-1 whitespace-nowrap">
            {doseText}
          </span>
          <LuChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* جزئیات — فقط وقتی باز است نمایش داده می‌شود */}
      {isOpen && (
        <div className="px-4 pb-4 animate-in fade-in duration-200">
          <p className="text-xs text-gray-500 mb-1">{med.role}</p>

          {med.note && (
            <p className="text-[11px] text-gray-400 leading-relaxed mb-3">
              {med.note}
            </p>
          )}

          {/* شروع و مدت اثر */}
          {(med.onset || med.duration) && (
            <div className="grid grid-cols-2 gap-2.5 mb-3">
              {med.onset && (
                <div className="rounded-xl bg-gray-50 border border-gray-100 px-3 py-2">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <LuTimer className="w-3 h-3 text-gray-400" />
                    <span className="text-[10px] font-bold text-gray-400 tracking-wide">
                      شروع اثر
                    </span>
                  </div>
                  <p className="text-[11px] font-bold text-gray-700">
                    {med.onset}
                  </p>
                </div>
              )}
              {med.duration && (
                <div className="rounded-xl bg-gray-50 border border-gray-100 px-3 py-2">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <LuTimer className="w-3 h-3 text-gray-400" />
                    <span className="text-[10px] font-bold text-gray-400 tracking-wide">
                      مدت اثر
                    </span>
                  </div>
                  <p className="text-[11px] font-bold text-gray-700">
                    {med.duration}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* مکانیسم اثر */}
          {med.mechanism && (
            <div className="mb-3">
              <span className="text-[11px] font-bold text-slate-500 tracking-wide">
                مکانیسم اثر
              </span>
              <p className="text-[11px] text-slate-600 leading-relaxed mt-1">
                {med.mechanism}
              </p>
            </div>
          )}

          {/* موارد منع مصرف */}
          {Array.isArray(med.contraindications) &&
            med.contraindications.length > 0 && (
              <div className="mb-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <LuBan className="w-3.5 h-3.5 text-red-500" />
                  <span className="text-[11px] font-bold text-red-600 tracking-wide">
                    موارد منع مصرف
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {med.contraindications.map((item, index) => (
                    <span
                      key={index}
                      className="text-[10px] font-medium text-red-700 bg-red-50 border border-red-100 rounded-full px-2.5 py-1"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

          {/* عوارض شایع */}
          {Array.isArray(med.sideEffects) && med.sideEffects.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center gap-1.5 mb-2">
                <LuTriangleAlert className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-[11px] font-bold text-amber-600 tracking-wide">
                  عوارض شایع
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {med.sideEffects.map((effect, index) => (
                  <span
                    key={index}
                    className="text-[10px] font-medium text-amber-700 bg-amber-50 border border-amber-100 rounded-full px-2.5 py-1"
                  >
                    {effect}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* نکته بالینی */}
          {med.pearl && (
            <div className="rounded-xl bg-blue-50/70 border border-blue-100 px-3 py-2.5">
              <div className="flex items-center gap-1.5 mb-1">
                <LuLightbulb className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-[11px] font-bold text-blue-600 tracking-wide">
                  نکته بالینی
                </span>
              </div>
              <p className="text-[11px] text-blue-700 leading-relaxed">
                {med.pearl}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default RsiMedications;
