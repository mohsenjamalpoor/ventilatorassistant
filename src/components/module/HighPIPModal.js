"use client";

import { useState } from "react";
import {
  LuChevronDown,
  LuStethoscope,
  LuTriangleAlert,
  LuX,
  LuGauge,
} from "react-icons/lu";

const PIP_CAUSES = [
  {
    id: "key-differentiator",
    title: "قدم اول: افتراق با Plateau Pressure",
    color: "slate",
    causes: [
      "PIP بالا + Plateau نرمال → مشکل مقاومتی (Raw بالا) — اختلاف PIP-Plateau زیاد شده",
      "PIP بالا + Plateau بالا → مشکل انطباقی (Compliance پایین) — اختلاف PIP-Plateau تقریباً ثابت مونده",
    ],
    treatment: [
      "برای اندازه‌گیری Plateau، یک inspiratory hold کوتاه (0.5-1 ثانیه) انجام بده",
      "این افتراق مسیر تشخیصی رو کاملاً از هم جدا می‌کنه — قدم اول همیشه همینه",
    ],
  },
  {
    id: "resistive",
    title: "علل مقاومتی (Raw بالا) — Plateau نرمال",
    color: "amber",
    causes: [
      "انسداد یا پیچ‌خوردگی لوله تراشه",
      "گاز گرفتن لوله توسط بیمار (biting)",
      "ترشحات فراوان در لوله یا راه هوایی",
      "برونکواسپاسم (آسم، برونشیولیت)",
      "لوله تراشه با سایز کوچک نسبت به فلوی تنظیم‌شده",
    ],
    treatment: [
      "بررسی موج Flow-Time — الگوی صاف‌شده (scooped) نشانه انسداد راه هوایی است",
      "ساکشن فوری لوله تراشه",
      "بررسی مسیر لوله و مدار از نظر پیچ‌خوردگی یا فشردگی توسط بیمار",
      "تجویز برونکودیلاتور در صورت شک به برونکواسپاسم",
      "در صورت عدم رفع، تعویض لوله تراشه",
    ],
  },
  {
    id: "compliance",
    title: "علل انطباقی (Compliance پایین) — Plateau هم بالاست",
    color: "orange",
    causes: [
      "پنوموتوراکس",
      "انتوباسیون تک‌ریوی (لوله وارد برونش راست شده)",
      "آتلکتازی گسترده",
      "ادم ریوی / پیشرفت ARDS",
      "اتساع شکمی یا آسیت (فشار به دیافراگم)",
      "افیوژن پلور حجیم",
    ],
    treatment: [
      "معاینه صداهای تنفسی دو طرفه و تقارن قفسه سینه",
      "بررسی عمق لوله تراشه و مقایسه با عمق ثبت‌شده",
      "رادیوگرافی قفسه سینه فوری در موارد ناپایدار",
      "در پنوموتوراکس فشاری، نیدل دکامپرشن اورژانسی",
      "بررسی دور شکم و فشار داخل‌شکمی در صورت اتساع",
    ],
  },
  {
    id: "dyssynchrony",
    title: "عدم هماهنگی بیمار-ونتیلاتور و Auto-PEEP",
    color: "purple",
    causes: [
      "زور زدن یا سرفه بیمار حین دم ونتیلاتور (fighting the vent)",
      "Breath stacking / Auto-PEEP در بیماری‌های انسدادی با زمان بازدم ناکافی",
      "درد یا اضطراب بدون Sedation کافی",
    ],
    treatment: [
      "بررسی موج Flow-Time برای برگشت کامل فلو به صفر قبل از دم بعدی (رد Auto-PEEP)",
      "در صورت Auto-PEEP، افزایش زمان بازدم (کاهش RR یا افزایش Flow دمی)",
      "بررسی و تنظیم مجدد سطح Sedation/Analgesia",
      "بررسی حساسیت تریگر برای کاهش عدم هماهنگی",
    ],
  },
];

const colorMap = {
  slate: {
    border: "border-slate-300",
    bg: "bg-slate-50",
    text: "text-slate-700",
    icon: "text-slate-500",
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
};

function HighPIPModal({ onClose }) {
  const [openId, setOpenId] = useState(PIP_CAUSES[0].id);

  return (
    <div className="w-[92vw] max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col">
      {/* هدر ثابت */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-2">
          <LuGauge className="w-6 h-6 text-orange-500" />
          <h2 className="text-lg font-bold text-gray-800">
            علل افزایش PIP و اقدامات درمانی
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
        <p className="text-sm text-gray-500 mb-5 flex items-start gap-2">
          <LuTriangleAlert className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
          افزایش PIP همیشه باید ابتدا با چک کردن Plateau Pressure افتراق داده
          بشه — این کار مسیر تشخیصی و درمانی رو کاملاً مشخص می‌کنه.
        </p>

        <div className="space-y-3">
          {PIP_CAUSES.map((item) => {
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
                        {item.id === "key-differentiator"
                          ? "نکات کلیدی"
                          : "علل احتمالی"}
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

export default HighPIPModal;
