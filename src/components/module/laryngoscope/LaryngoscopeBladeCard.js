"use client";

import { LuFlashlight, LuCheck } from "react-icons/lu";
import { LARYNGOSCOPE_AGE_REFERENCE } from "@/utils/laryngoscopeBlade";

function LaryngoscopeBladeCard({ recommendation }) {
  if (!recommendation) return null;

  const { ageLabel, type, name, size, altType, altName, altSize, rationale } =
    recommendation;

  const primaryColor =
    type === "straight"
      ? "border-amber-500 bg-amber-50 text-amber-700"
      : "border-sky-500 bg-sky-50 text-sky-700";

  return (
    <div className="space-y-4">
      {/* کارت پیشنهاد اصلی */}
      <div className="rounded-2xl border-2 border-gray-100 bg-white p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
            <LuFlashlight className="w-4.5 h-4.5 text-amber-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-700">
              تیغه‌ی پیشنهادی بر اساس سن
            </p>
            <p className="text-[10px] text-gray-400 font-medium">{ageLabel}</p>
          </div>
        </div>

        <div
          className={`relative rounded-xl border-2 py-4 px-3 flex flex-col items-center gap-1 shadow-md ${primaryColor}`}
        >
          <span className="absolute top-2 left-2 w-4 h-4 rounded-full bg-current flex items-center justify-center">
            <LuCheck className="w-2.5 h-2.5 text-white" />
          </span>
          <span className="text-sm font-extrabold">
            {type === "straight"
              ? "تیغه‌ی صاف (Miller)"
              : "تیغه‌ی خمیده (Macintosh)"}
          </span>
          <span className="text-xs font-bold opacity-80">
            سایز پیشنهادی: {name} {size}
          </span>
        </div>

        {altType && (
          <div className="mt-2.5 rounded-xl border border-dashed border-gray-200 py-2.5 px-3 text-center">
            <p className="text-[11px] text-gray-500 font-medium">
              گزینه‌ی جایگزین قابل‌قبول:{" "}
              <span className="font-bold text-gray-700">
                {altName} {altSize}
              </span>{" "}
              ({altType === "straight" ? "تیغه‌ی صاف" : "تیغه‌ی خمیده"})
            </p>
          </div>
        )}
      </div>

      {/* توضیح آناتومیک */}
      <div className="rounded-xl bg-blue-50 border border-blue-100 px-4 py-3">
        <p className="text-[11px] leading-relaxed text-blue-700">{rationale}</p>
      </div>

      {/* جدول مرجع سنی */}
      <div className="rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-2.5">
          <p className="text-xs font-bold text-gray-600">
            جدول مرجع بر اساس سن
          </p>
        </div>
        <div className="divide-y divide-gray-100">
          {LARYNGOSCOPE_AGE_REFERENCE.map((row, index) => {
            const active = row.ageLabel === ageLabel;
            return (
              <div
                key={index}
                className={`flex items-center justify-between px-4 py-2.5 ${
                  active ? "bg-amber-50" : "bg-white"
                }`}
              >
                <span
                  className={`text-[11px] font-bold ${
                    active ? "text-amber-700" : "text-gray-600"
                  }`}
                >
                  {row.ageLabel}
                </span>
                <span
                  className={`text-[11px] font-medium ${
                    active ? "text-amber-600" : "text-gray-400"
                  }`}
                >
                  {row.name} {row.size}
                  {row.altName ? ` (یا ${row.altName} ${row.altSize})` : ""}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LaryngoscopeBladeCard;
