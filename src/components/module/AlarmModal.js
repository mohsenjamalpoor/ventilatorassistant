"use client";

import {
  LuX,
  LuBell,
  LuTriangleAlert,
  LuCheck,
  LuGraduationCap,
} from "react-icons/lu";
import { calculateAlarmRanges } from "../../utils/alarmUtils";
import NoteCard from "./shared/NoteCard";
import ReferenceFooter from "./shared/ReferenceFooter";

const ITEMS = [
  {
    key: "rr",
    label: "تعداد تنفس",
    shortLabel: "RR",
    unit: "/min",
    color: "green",
    rationale:
      "افت شدید RR می‌تواند نشانه دپرسیون تنفسی یا خستگی عضلات باشد؛ افزایش شدید مطرح‌کننده تب، درد، اضطراب یا عدم هماهنگی با ونتیلاتور است.",
  },
  {
    key: "mvent",
    label: "تهویه دقیقه‌ای",
    shortLabel: "MVent",
    unit: "L/min",
    color: "teal",
    rationale:
      "کاهش MVent خطر هیپرکاپنی دارد؛ افزایش آن می‌تواند نشانه تلاش تنفسی بالا یا نیاز واقعی متابولیک بیشتر (تب، سپسیس) باشد.",
  },
  {
    key: "peep",
    label: "PEEP",
    shortLabel: "PEEP",
    unit: "cmH₂O",
    color: "red",
    rationale:
      "PEEP پایین‌تر از حد می‌تواند به آتلکتازی منجر شود؛ PEEP بالاتر از حد خطر بیش‌تورمی و کاهش برگشت وریدی را افزایش می‌دهد.",
  },
  {
    key: "fio2",
    label: "FiO₂",
    shortLabel: "FiO₂",
    unit: "%",
    color: "purple",
    rationale:
      "افزایش نیاز به FiO₂ اغلب اولین نشانه افت وضعیت اکسیژناسیون است؛ FiO₂ طولانی‌مدت بالا خطر سمیت اکسیژن را افزایش می‌دهد.",
  },
  {
    key: "vt",
    label: "حجم جاری",
    shortLabel: "VT",
    unit: "ml",
    color: "blue",
    rationale:
      "حجم جاری خارج از محدوده می‌تواند نشانه نشتی مدار/لوله (VT پایین) یا خطر آسیب حجمی ریه (VT بالا) باشد.",
  },
];

const colorMap = {
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    chip: "bg-green-100 text-green-700",
    bar: "bg-green-500",
    track: "from-green-200 via-green-300 to-green-200",
    ring: "ring-green-100",
  },
  teal: {
    bg: "bg-teal-50",
    border: "border-teal-200",
    text: "text-teal-700",
    chip: "bg-teal-100 text-teal-700",
    bar: "bg-teal-500",
    track: "from-teal-200 via-teal-300 to-teal-200",
    ring: "ring-teal-100",
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    chip: "bg-red-100 text-red-700",
    bar: "bg-red-500",
    track: "from-red-200 via-red-300 to-red-200",
    ring: "ring-red-100",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-700",
    chip: "bg-purple-100 text-purple-700",
    bar: "bg-purple-500",
    track: "from-purple-200 via-purple-300 to-purple-200",
    ring: "ring-purple-100",
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    chip: "bg-blue-100 text-blue-700",
    bar: "bg-blue-500",
    track: "from-blue-200 via-blue-300 to-blue-200",
    ring: "ring-blue-100",
  },
};

function AlarmModal({ currentSettings, onClose }) {
  const ranges = calculateAlarmRanges(currentSettings);

  // فقط پارامترهایی که مقدار معتبر و بازه معنادار دارند نمایش داده شوند
  const visibleItems = ITEMS.filter((item) => {
    const r = ranges[item.key];
    return (
      r && !Number.isNaN(parseFloat(r.current)) && parseFloat(r.current) > 0
    );
  });

  return (
    <div
      dir="rtl"
      className="w-[92vw] max-w-xl max-h-[88vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="relative bg-gradient-to-l from-blue-600 to-cyan-500 px-6 py-5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
            <LuBell className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg leading-tight">
              محدوده‌های آلارم
            </h2>
            <p className="text-blue-100 text-xs mt-0.5">
              بر اساس تنظیمات فعلی ونتیلاتور
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
            aria-label="بستن"
          >
            <LuX className="w-5 h-5 text-white" />
          </button>
        )}
      </div>

      {/* Body */}
      <div className="overflow-y-auto px-6 py-5 space-y-4 bg-gradient-to-b from-blue-50/40 to-white">
        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <LuTriangleAlert className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-700 leading-6">
            این محدوده‌ها به‌طور خودکار محاسبه شده و با هر تغییر در مد یا
            تنظیمات ونتیلاتور به‌روزرسانی می‌شوند.
          </p>
        </div>

        {visibleItems.map(
          ({ key, label, shortLabel, unit, color, rationale }) => {
            const r = ranges[key];
            const c = colorMap[color];

            const low = parseFloat(r.low);
            const high = parseFloat(r.high);
            const current = parseFloat(r.current);
            const percent = Math.min(
              100,
              Math.max(0, ((current - low) / (high - low || 1)) * 100),
            );
            const nearEdge = percent <= 10 || percent >= 90;

            return (
              <div
                key={key}
                className={`rounded-2xl border ${c.border} ${c.bg} p-4 transition-shadow hover:shadow-md`}
              >
                {/* Row header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-bold px-2 py-1 rounded-lg ${c.chip}`}
                    >
                      {shortLabel}
                    </span>
                    <span className="text-sm font-semibold text-gray-700">
                      {label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                        nearEdge
                          ? "bg-orange-100 text-orange-600"
                          : "bg-emerald-100 text-emerald-600"
                      }`}
                    >
                      {nearEdge ? (
                        <LuTriangleAlert className="w-3 h-3" />
                      ) : (
                        <LuCheck className="w-3 h-3" />
                      )}
                      {nearEdge ? "نزدیک به حد" : "طبیعی"}
                    </span>
                  </div>
                </div>

                {/* Current value */}
                <div className="flex items-baseline gap-1 mb-3">
                  <span className={`text-2xl font-bold ${c.text}`}>
                    {r.current}
                  </span>
                  <span className="text-xs text-gray-400">{unit}</span>
                </div>

                {/* Range bar */}
                <div className="relative">
                  <div
                    className={`h-2.5 rounded-full bg-gradient-to-r ${c.track}`}
                  />
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${c.bar} border-2 border-white shadow-md ring-4 ${c.ring} transition-all`}
                    style={{ left: `calc(${percent}% - 8px)` }}
                  />
                </div>

                {/* Range labels */}
                <div className="flex items-center justify-between mt-2 text-[11px] text-gray-500 mb-3">
                  <span>
                    حد پایین:{" "}
                    <span className="font-semibold text-gray-700">{r.low}</span>{" "}
                    {unit}
                  </span>
                  <span>
                    حد بالا:{" "}
                    <span className="font-semibold text-gray-700">
                      {r.high}
                    </span>{" "}
                    {unit}
                  </span>
                </div>

                {/* توضیح بالینی کوتاه */}
                <div className="pt-3 border-t border-white/60 flex items-start gap-1.5">
                  <LuGraduationCap
                    className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${c.text}`}
                  />
                  <p className="text-[11px] text-gray-600 leading-5">
                    {rationale}
                  </p>
                </div>
              </div>
            );
          },
        )}

        <NoteCard title="نکته فوق‌تخصصی" tone="amber">
          محدوده‌های پیش‌فرض (٪۵۰± حول مقدار فعلی برای اکثر پارامترها) یک نقطه
          شروع منطقی‌اند، نه استاندارد ثابت — در بیمار ناپایدار یا با روند
          بالینی خاص (مثل weaning یا هیپرکاپنی مجاز)، این محدوده‌ها باید به‌صورت
          دستی و بر اساس قضاوت بالینی تنگ‌تر یا بازتر شوند.
        </NoteCard>

        <ReferenceFooter
          source={
            'UpToDate — "Overview of mechanical ventilation" / "Monitoring during mechanical ventilation"'
          }
        />
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-gray-100 shrink-0 bg-white">
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-gradient-to-l from-blue-600 to-cyan-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          متوجه شدم
        </button>
      </div>
    </div>
  );
}

export default AlarmModal;
