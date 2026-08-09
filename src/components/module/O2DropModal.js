"use client";

import { useState } from "react";
import {
  LuChevronDown,
  LuStethoscope,
  LuTriangleAlert,
  LuX,
} from "react-icons/lu";

const O2_CAUSES = [
  {
    id: "displacement",
    title: "جابجایی لوله (Displacement)",
    color: "red",
    causes: [
      "خروج جزئی یا کامل لوله تراشه (اکستوباسیون تصادفی)",
      "انتوباسیون تک‌ریوی (لوله وارد برونش راست شده)",
      "جابجایی لوله با تغییر وضعیت بیمار یا ساکشن",
    ],
    treatment: [
      "معاینه فوری: صداهای تنفسی دو طرفه و تقارن قفسه سینه",
      "بررسی عمق لوله از لب/دندان و مقایسه با عمق ثبت‌شده",
      "در صورت شک به انتوباسیون تک‌ریوی، لوله را کمی عقب کشیده و مجدد صداها را چک کنید",
      "در صورت خروج لوله، آماده‌سازی برای ری‌انتوباسیون فوری",
    ],
  },
  {
    id: "obstruction",
    title: "انسداد (Obstruction)",
    color: "amber",
    causes: [
      "انسداد لوله با ترشحات یا خون",
      "گاز گرفتن لوله توسط بیمار (biting)",
      "پیچ‌خوردگی (kinking) لوله یا مدار",
      "برونکواسپاسم شدید",
    ],
    treatment: [
      "بررسی موج Flow-Time و Pressure-Time — الگوی انسداد را نشان می‌دهند",
      "ساکشن لوله تراشه",
      "بررسی مسیر لوله و مدار از نظر پیچ‌خوردگی",
      "در صورت برونکواسپاسم، برونکودیلاتور تجویز شود",
      "اگر انسداد رفع نشد، لوله را عوض کنید",
    ],
  },
  {
    id: "pneumothorax",
    title: "پنوموتوراکس (Pneumothorax)",
    color: "orange",
    causes: [
      "پنوموتوراکس فشاری ناشی از باروتروما (فشارهای بالای ونتیلاتور)",
      "پارگی خودبه‌خودی بولا در بیماری‌های انسدادی ریه",
    ],
    treatment: [
      "معاینه: کاهش یا فقدان صدای تنفسی یک طرفه، هایپررزونانس، دویاسیون تراشه",
      "بررسی افت فشار خون و تاکی‌کاردی همزمان (علائم فشاری)",
      "در پنوموتوراکس فشاری، نیدل دکامپرشن فوری سپس چست‌تیوب",
      "رادیوگرافی قفسه سینه برای تایید در موارد پایدار",
    ],
  },
  {
    id: "equipment",
    title: "خرابی تجهیزات (Equipment Failure)",
    color: "purple",
    causes: [
      "قطع اتصال مدار ونتیلاتور (disconnection)",
      "نشتی از کاف لوله تراشه یا مدار",
      "خرابی منبع اکسیژن یا ونتیلاتور",
      "خرابی سنسور پالس اکسی‌متری (خطای دستگاه، نه بیمار)",
    ],
    treatment: [
      "بررسی تمام اتصالات مدار از دستگاه تا بیمار",
      "بررسی فشار کاف لوله تراشه",
      "در صورت شک به خرابی دستگاه، بیمار را با بگ-ولو-ماسک به‌طور دستی تهویه کنید",
      "بررسی محل و اتصال پروب پالس اکسی‌متری",
    ],
  },
  {
    id: "patient",
    title: "علل مربوط به بیمار",
    color: "blue",
    causes: [
      "پیشرفت بیماری زمینه‌ای ریوی (ARDS، پنومونی)",
      "آتلکتازی",
      "ادم ریوی",
      "شنت داخل ریوی یا داخل قلبی",
      "بی‌قراری/عدم هماهنگی با ونتیلاتور (patient-ventilator dyssynchrony)",
    ],
    treatment: [
      "بررسی نیاز به افزایش PEEP یا مانور recruitment",
      "بررسی نیاز به تنظیم مجدد مد یا حساسیت تریگر",
      "در صورت dyssynchrony، بررسی Sedation/Analgesia",
      "گرافی قفسه سینه و در صورت لزوم ABG برای ارزیابی وضعیت گازی خون",
    ],
  },
];

const colorMap = {
  red: {
    border: "border-red-200",
    bg: "bg-red-50",
    text: "text-red-700",
    icon: "text-red-500",
  },
  amber: {
    border: "border-amber-200",
    bg: "bg-amber-50",
    text: "text-amber-700",
    icon: "text-amber-500",
  },
  orange: {
    border: "border-orange-200",
    bg: "bg-orange-50",
    text: "text-orange-700",
    icon: "text-orange-500",
  },
  purple: {
    border: "border-purple-200",
    bg: "bg-purple-50",
    text: "text-purple-700",
    icon: "text-purple-500",
  },
  blue: {
    border: "border-blue-200",
    bg: "bg-blue-50",
    text: "text-blue-700",
    icon: "text-blue-500",
  },
};

function O2DropModal({ onClose }) {
  const [openId, setOpenId] = useState(O2_CAUSES[0].id);

  return (
    <div className="w-[92vw] max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col">
      {/* هدر ثابت */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-2">
          <LuTriangleAlert className="w-6 h-6 text-red-500" />
          <h2 className="text-lg font-bold text-gray-800">
            علل افت اکسیژن (SpO₂) و اقدامات درمانی
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

      {/* بدنه اسکرول‌شونده */}
      <div className="overflow-y-auto p-6">
        <p className="text-sm text-gray-500 mb-5">
          رویکرد سیستماتیک با مخفف رایج{" "}
          <span className="font-semibold text-gray-700">DOPE</span> (جابجایی،
          انسداد، پنوموتوراکس، خرابی تجهیزات) به‌همراه علل مرتبط با بیمار.
        </p>

        <div className="space-y-3">
          {O2_CAUSES.map((item) => {
            const c = colorMap[item.color];
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={`rounded-xl border ${c.border} overflow-hidden`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 ${c.bg}`}
                >
                  <span className={`font-bold ${c.text}`}>{item.title}</span>
                  <LuChevronDown
                    className={`w-5 h-5 ${c.icon} transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="p-4 bg-white space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 mb-2">
                        علل احتمالی
                      </h4>
                      <ul className="space-y-1.5">
                        {item.causes.map((cause, i) => (
                          <li
                            key={i}
                            className="text-sm text-gray-700 flex items-start gap-2"
                          >
                            <span
                              className={`mt-1.5 w-1.5 h-1.5 rounded-full ${c.icon.replace("text", "bg")} shrink-0`}
                            />
                            {cause}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-1.5">
                        <LuStethoscope className="w-4 h-4" />
                        اقدامات درمانی
                      </h4>
                      <ol className="space-y-1.5">
                        {item.treatment.map((step, i) => (
                          <li
                            key={i}
                            className="text-sm text-gray-700 flex items-start gap-2"
                          >
                            <span
                              className={`text-xs font-bold ${c.text} shrink-0`}
                            >
                              {i + 1}.
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default O2DropModal;
