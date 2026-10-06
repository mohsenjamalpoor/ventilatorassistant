"use client";

import { parameterInfo } from "@/utils/parameterInfo";
import { LuX, LuInfo, LuActivity } from "react-icons/lu";

export default function ParameterInfoModal({ paramKey, onClose }) {
  if (!paramKey) return null;

  const info = parameterInfo[paramKey];
  if (!info) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-blue-900/10 border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* هدر گرادیان آبی-فیروزه‌ای، هم‌راستا با طراحی HomePage */}
        <div className="relative bg-gradient-to-l from-blue-700 via-blue-600 to-cyan-600 px-6 py-5">
          <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-white/10" />
          <div className="absolute -bottom-8 -right-4 w-20 h-20 rounded-full bg-white/10" />

          <button
            onClick={onClose}
            className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
            aria-label="بستن"
          >
            <LuX className="w-4 h-4 text-white" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
              <LuActivity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{info.label}</h3>
              <p className="text-xs text-blue-100">{info.fullName}</p>
            </div>
          </div>
        </div>

        {/* بدنه */}
        <div className="px-6 py-5 space-y-4">
          <p className="text-sm text-slate-700 leading-7">{info.description}</p>

          <div className="rounded-2xl border-2 border-blue-100 bg-blue-50/60 px-4 py-3">
            <span className="block text-xs font-bold text-blue-700 mb-1">
              بازه طبیعی
            </span>
            <span className="text-sm text-slate-700">{info.normalRange}</span>
          </div>

          <div className="rounded-2xl border-2 border-cyan-100 bg-cyan-50/60 px-4 py-3 flex gap-2">
            <LuInfo className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
            <div>
              <span className="block text-xs font-bold text-cyan-700 mb-1">
                نکته فوق‌تخصصی
              </span>
              <span className="text-sm text-slate-700 leading-6">
                {info.clinicalNote}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
