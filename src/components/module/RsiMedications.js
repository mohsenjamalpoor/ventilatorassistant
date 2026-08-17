"use client";

import { LuTriangleAlert } from "react-icons/lu";

function RsiMedications({ med, doseText }) {
  return (
    <div className="rounded-2xl border-2 border-gray-200 bg-white overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-1">
          <div className="min-w-0">
            <p className="text-sm font-bold text-gray-800 leading-tight truncate">
              {med.name}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">{med.role}</p>
          </div>
          <span className="shrink-0 text-xs font-bold text-blue-600 bg-blue-50 rounded-full px-2.5 py-1 whitespace-nowrap">
            {doseText}
          </span>
        </div>

        {med.note && (
          <p className="text-[11px] text-gray-400 leading-relaxed mt-2">
            {med.note}
          </p>
        )}
      </div>

      {/* عوارض شایع */}
      {Array.isArray(med.sideEffects) && med.sideEffects.length > 0 && (
        <div className="px-4 pb-4">
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
    </div>
  );
}

export default RsiMedications;
