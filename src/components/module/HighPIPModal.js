"use client";

import { useState } from "react";
import {
  LuChevronDown,
  LuStethoscope,
  LuTriangleAlert,
  LuX,
  LuGauge,
  LuGitCompare,
  LuWind,
  LuLayers,
  LuActivity,
  LuLightbulb,
} from "react-icons/lu";
import NoteCard from "./shared/NoteCard";
import ReferenceFooter from "./shared/ReferenceFooter";

const PIP_CAUSES = [
  {
    id: "key-differentiator",
    letter: "1",
    title: "قدم اول: افتراق با Plateau Pressure",
    icon: LuGitCompare,
    color: "slate",
    causes: [
      {
        text: "PIP بالا + Plateau نرمال",
        detail: "مشکل مقاومتی (Raw بالا) — اختلاف PIP-Plateau زیاد شده",
      },
      {
        text: "PIP بالا + Plateau بالا",
        detail:
          "مشکل انطباقی (Compliance پایین) — اختلاف PIP-Plateau تقریباً ثابت مونده",
      },
    ],
    treatment: [
      "برای اندازه‌گیری Plateau، یک inspiratory hold کوتاه (۰.۵-۱ ثانیه) انجام بده",
      "این افتراق مسیر تشخیصی رو کاملاً از هم جدا می‌کنه — همیشه قدم اول همینه",
      "در مدهای فشاری (PC)، Plateau معادل خود PIP است و این افتراق کاربرد ندارد؛ فقط در VC معنادار است",
    ],
  },
  {
    id: "resistive",
    letter: "2",
    title: "علل مقاومتی (Raw بالا) — Plateau نرمال",
    icon: LuWind,
    color: "sky",
    causes: [
      {
        text: "انسداد یا پیچ‌خوردگی لوله تراشه",
        detail: "شایع‌ترین علت قابل‌رفع سریع در بیمار انتوبه",
      },
      {
        text: "گاز گرفتن لوله (biting)",
        detail: "در سداسیون ناکافی یا هوشیاری بازگشته",
      },
      {
        text: "ترشحات فراوان",
        detail: "در لوله یا راه هوایی، به‌ویژه پس از مدت طولانی بدون ساکشن",
      },
      {
        text: "برونکواسپاسم",
        detail: "آسم، برونشیولیت — با ویز و افزایش زمان بازدم همراه",
      },
      {
        text: "لوله تراشه کوچک نسبت به فلو",
        detail: "مقاومت لوله با توان چهارم شعاع رابطه عکس دارد (قانون پواسوی)",
      },
    ],
    treatment: [
      "بررسی موج Flow-Time — الگوی صاف‌شده (scooped) نشانه انسداد راه هوایی است",
      "ساکشن فوری لوله تراشه",
      "بررسی مسیر لوله و مدار از نظر پیچ‌خوردگی یا فشردگی توسط بیمار",
      "تجویز برونکودیلاتور در شک به برونکواسپاسم",
      "در صورت عدم رفع، تعویض لوله تراشه",
    ],
  },
  {
    id: "compliance",
    letter: "3",
    title: "علل انطباقی (Compliance پایین) — Plateau هم بالاست",
    icon: LuLayers,
    color: "cyan",
    causes: [
      {
        text: "پنوموتوراکس",
        detail:
          "همیشه در بیمار ناپایدار با PIP و Plateau ناگهانی بالا، اول رد شود",
      },
      {
        text: "انتوباسیون تک‌ریوی",
        detail: "لوله بیش‌ازحد پیش رفته و وارد برونش اصلی راست شده",
      },
      {
        text: "آتلکتازی گسترده",
        detail: "کاهش حجم ریه فعال، اغلب پس از مدت طولانی بی‌حرکتی",
      },
      {
        text: "ادم ریوی / پیشرفت ARDS",
        detail: "کاهش کمپلیانس پارانشیمی، معمولاً روند تدریجی‌تر",
      },
      {
        text: "اتساع شکمی یا آسیت",
        detail: "فشار به دیافراگم و کاهش کمپلیانس دیواره قفسه سینه",
      },
      { text: "افیوژن پلور حجیم", detail: "محدودیت مکانیکی خارج ریوی" },
    ],
    treatment: [
      "معاینه صداهای تنفسی دو طرفه و تقارن حرکت قفسه سینه",
      "بررسی عمق لوله تراشه و مقایسه با عمق ثبت‌شده در پرونده",
      "رادیوگرافی قفسه سینه فوری در موارد ناپایدار",
      "در پنوموتوراکس فشاری، نیدل دکامپرشن اورژانسی بدون تاخیر",
      "بررسی دور شکم و فشار داخل‌شکمی در صورت اتساع",
    ],
  },
  {
    id: "dyssynchrony",
    letter: "4",
    title: "عدم هماهنگی بیمار-ونتیلاتور و Auto-PEEP",
    icon: LuActivity,
    color: "indigo",
    causes: [
      {
        text: "زور زدن یا سرفه حین دم",
        detail: "Fighting the vent — افزایش ناگهانی و متغیر PIP",
      },
      {
        text: "Breath stacking / Auto-PEEP",
        detail:
          "در بیماری‌های انسدادی با زمان بازدم ناکافی؛ حجم بازدمی کامل تخلیه نمی‌شود",
      },
      { text: "درد یا اضطراب", detail: "بدون Sedation/Analgesia کافی" },
    ],
    treatment: [
      "بررسی موج Flow-Time برای برگشت کامل فلو به صفر قبل از دم بعدی (رد Auto-PEEP)",
      "در Auto-PEEP، افزایش زمان بازدم (کاهش RR یا افزایش Flow دمی)",
      "بررسی و تنظیم مجدد سطح Sedation/Analgesia",
      "بررسی و تنظیم حساسیت تریگر برای کاهش عدم هماهنگی",
    ],
  },
];

const colorMap = {
  slate: {
    border: "border-slate-300",
    bg: "bg-slate-50",
    text: "text-slate-700",
    icon: "text-slate-500",
    dot: "bg-slate-400",
    badge: "bg-slate-500",
  },
  sky: {
    border: "border-sky-200",
    bg: "bg-sky-50",
    text: "text-sky-700",
    icon: "text-sky-500",
    dot: "bg-sky-400",
    badge: "bg-sky-500",
  },
  cyan: {
    border: "border-cyan-200",
    bg: "bg-cyan-50",
    text: "text-cyan-700",
    icon: "text-cyan-500",
    dot: "bg-cyan-400",
    badge: "bg-cyan-500",
  },
  indigo: {
    border: "border-indigo-200",
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    icon: "text-indigo-500",
    dot: "bg-indigo-400",
    badge: "bg-indigo-500",
  },
};

function HighPIPModal({ onClose }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div
      dir="rtl"
      className="w-[92vw] max-w-2xl max-h-[88vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
    >
      {/* هدر گرادیانت */}
      <div className="relative bg-linear-to-l from-blue-700 to-cyan-600 px-6 py-5 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
              <LuGauge className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg leading-tight">
                افزایش PIP
              </h2>
              <p className="text-blue-100 text-xs mt-0.5">
                High Peak Inspiratory Pressure — Bedside Approach
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

        {/* نوار شماره مراحل */}
        <div className="flex gap-2 mt-4">
          {PIP_CAUSES.map((item) => {
            const active = openId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setOpenId(active ? null : item.id)}
                className={`flex-1 rounded-lg py-2 flex flex-col items-center gap-0.5 transition-colors ${
                  active
                    ? "bg-white text-blue-700"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <span className="text-sm font-extrabold leading-none">
                  {item.letter}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* بدنه اسکرول‌شونده */}
      <div className="overflow-y-auto p-6">
        <p className="text-sm text-gray-500 mb-5 flex items-start gap-2">
          <LuTriangleAlert className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
          افزایش PIP همیشه باید ابتدا با چک‌کردن Plateau Pressure افتراق داده
          بشه — این کار مسیر تشخیصی و درمانی رو کاملاً مشخص می‌کنه.
        </p>

        <div className="space-y-3">
          {PIP_CAUSES.map((item) => {
            const c = colorMap[item.color];
            const Icon = item.icon;
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
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-7 h-7 rounded-lg ${c.badge} flex items-center justify-center shrink-0`}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </span>
                    <span className={`font-bold text-sm ${c.text}`}>
                      {item.title}
                    </span>
                  </div>
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
                      <ul className="space-y-2">
                        {item.causes.map((cause, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span
                              className={`mt-1.5 w-1.5 h-1.5 rounded-full ${c.dot} shrink-0`}
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-700">
                                {cause.text}
                              </p>
                              <p className="text-xs text-gray-500 leading-5 mt-0.5">
                                {cause.detail}
                              </p>
                            </div>
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

        <div className="mt-5 space-y-3">
          <NoteCard icon={LuLightbulb} title="نکته فوق‌تخصصی" tone="amber">
            در PICU، آلارم High PIP هرگز فقط با افزایش سقف آلارم مدیریت نمی‌شود
            — همیشه علت زمینه‌ای باید مشخص شود، چون PIP بالای مداوم می‌تواند به
            باروتروما و پنوموتوراکس منجر شود.
          </NoteCard>

          <ReferenceFooter
            source={
              'UpToDate — "Overview of mechanical ventilation" / "Ventilator management strategies for adults and children with acute respiratory failure"'
            }
          />
        </div>
      </div>
    </div>
  );
}

export default HighPIPModal;
