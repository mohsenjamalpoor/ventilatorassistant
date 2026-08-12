"use client";

import { formatNumber } from "@/utils/formatNumberEtt";
import { LuRuler, LuGauge, LuInfo } from "react-icons/lu";

function getAgeBand(age) {
  if (age < 1 / 12) return { label: "نوزاد تازه‌متولد", tone: "rose" };
  if (age < 1) return { label: "شیرخوار", tone: "amber" };
  if (age < 2) return { label: "نوپا (زیر ۲ سال)", tone: "amber" };
  if (age < 8) return { label: "کودک خردسال", tone: "sky" };
  return { label: "کودک بزرگ‌تر / نوجوان", tone: "sky" };
}

const badgeTone = {
  rose: "bg-rose-50 text-rose-600 border-rose-200",
  amber: "bg-amber-50 text-amber-600 border-amber-200",
  sky: "bg-sky-50 text-sky-600 border-sky-200",
};

function EttSizeTable({ ett, age }) {
  const band = age !== undefined ? getAgeBand(age) : null;

  return (
    <div className="space-y-3">
      {band && (
        <div className="flex items-center justify-between">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border ${badgeTone[band.tone]}`}
          >
            {band.label}
          </span>
          {age < 2 && (
            <span className="inline-flex items-center gap-1 text-[11px] text-amber-600">
              <LuInfo className="w-3.5 h-3.5" />
              فرمول استاندارد برای سن ≥ ۲ سال است
            </span>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {/* کارت بدون کاف */}
        <div className="rounded-2xl border-2 border-blue-100 bg-white overflow-hidden shadow-sm">
          <div className="bg-gradient-to-l from-blue-50 to-cyan-50 px-4 py-2.5 flex items-center justify-between border-b border-blue-100">
            <div>
              <p className="text-xs font-bold text-gray-700">بدون کاف</p>
              <p className="text-[10px] text-gray-400">Uncuffed</p>
            </div>
            <LuGauge className="w-4 h-4 text-blue-400" />
          </div>
          <div className="p-4 text-center space-y-3">
            <div>
              <p className="text-[10px] text-gray-400 font-medium mb-1">
                سایز لوله
              </p>
              <p className="text-2xl font-extrabold text-blue-700">
                {formatNumber(ett.uncuffedSize)}
                <span className="text-xs font-medium text-gray-400 mr-1">
                  mm
                </span>
              </p>
            </div>
            <div className="pt-3 border-t border-dashed border-blue-100">
              <p className="text-[10px] text-gray-400 font-medium mb-1">
                عمق لوله
              </p>
              <p className="text-lg font-bold text-cyan-700">
                {formatNumber(ett.uncuffedDepth)}
                <span className="text-xs font-medium text-gray-400 mr-1">
                  cm
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* کارت کاف‌دار */}
        <div className="rounded-2xl border-2 border-cyan-100 bg-white overflow-hidden shadow-sm">
          <div className="bg-gradient-to-l from-cyan-50 to-blue-50 px-4 py-2.5 flex items-center justify-between border-b border-cyan-100">
            <div>
              <p className="text-xs font-bold text-gray-700">کاف‌دار</p>
              <p className="text-[10px] text-gray-400">Cuffed</p>
            </div>
            <LuRuler className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="p-4 text-center space-y-3">
            <div>
              <p className="text-[10px] text-gray-400 font-medium mb-1">
                سایز لوله
              </p>
              <p className="text-2xl font-extrabold text-blue-700">
                {formatNumber(ett.cuffedSize)}
                <span className="text-xs font-medium text-gray-400 mr-1">
                  mm
                </span>
              </p>
            </div>
            <div className="pt-3 border-t border-dashed border-cyan-100">
              <p className="text-[10px] text-gray-400 font-medium mb-1">
                عمق لوله
              </p>
              <p className="text-lg font-bold text-cyan-700">
                {formatNumber(ett.cuffedDepth)}
                <span className="text-xs font-medium text-gray-400 mr-1">
                  cm
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EttSizeTable;
