"use client";

import { useState } from "react";
import {
  LuChevronDown,
  LuStethoscope,
  LuTriangleAlert,
  LuX,
  LuMoveHorizontal,
  LuBan,
  LuWind,
  LuWrench,
  LuUser,
  LuLightbulb,
} from "react-icons/lu";
import NoteCard from "./shared/NoteCard";
import ReferenceFooter from "./shared/ReferenceFooter";

const O2_CAUSES = [
  {
    id: "displacement",
    letter: "D",
    title: "جابجایی لوله (Displacement)",
    icon: LuMoveHorizontal,
    color: "red",
    causes: [
      {
        text: "خروج جزئی یا کامل لوله تراشه",
        detail: "اکستوباسیون تصادفی، معمولاً با تغییر وضعیت بیمار یا کشش مدار",
      },
      {
        text: "انتوباسیون تک‌ریوی",
        detail: "لوله بیش‌ازحد پیش رفته و وارد برونش اصلی راست شده",
      },
      {
        text: "جابجایی حین ساکشن یا جابجایی بیمار",
        detail: "به‌ویژه در نوزادان و شیرخواران با فاصله ایمنی کم لوله",
      },
    ],
    treatment: [
      "معاینه فوری: صداهای تنفسی دو طرفه و تقارن حرکت قفسه سینه",
      "بررسی عمق لوله از لب/دندان و مقایسه با عمق ثبت‌شده در پرونده",
      "در شک به انتوباسیون تک‌ریوی، لوله را کمی عقب کشیده و مجدد صداها را چک کنید",
      "در خروج لوله یا عدم اطمینان از جای‌گیری، آماده‌سازی فوری برای ری‌انتوباسیون",
    ],
  },
  {
    id: "obstruction",
    letter: "O",
    title: "انسداد (Obstruction)",
    icon: LuBan,
    color: "amber",
    causes: [
      {
        text: "انسداد لوله با ترشحات یا خون",
        detail: "شایع‌ترین علت افت ناگهانی SpO2 در بیمار انتوبه",
      },
      {
        text: "گاز گرفتن لوله (biting)",
        detail: "در بیماران با سطح هوشیاری بالاتر یا سداسیون ناکافی",
      },
      {
        text: "پیچ‌خوردگی (kinking)",
        detail: "لوله یا مدار ونتیلاتور، معمولاً با تغییر وضعیت سر/گردن",
      },
      {
        text: "برونکواسپاسم شدید",
        detail: "افزایش ناگهانی مقاومت راه هوایی، اغلب با PIP بالا همراه است",
      },
    ],
    treatment: [
      "بررسی موج Flow-Time و Pressure-Time — الگوی انسداد را نشان می‌دهند",
      "ساکشن لوله تراشه با تکنیک استریل",
      "بررسی مسیر لوله و مدار از نظر پیچ‌خوردگی",
      "در برونکواسپاسم، برونکودیلاتور استنشاقی تجویز شود",
      "اگر انسداد با ساکشن رفع نشد، تعویض لوله را در نظر بگیرید",
    ],
  },
  {
    id: "pneumothorax",
    letter: "P",
    title: "پنوموتوراکس (Pneumothorax)",
    icon: LuWind,
    color: "orange",
    causes: [
      {
        text: "پنوموتوراکس فشاری ناشی از باروتروما",
        detail: "فشارهای بالای ونتیلاتور، به‌خصوص در ریه‌های با کمپلیانس پایین",
      },
      {
        text: "پارگی خودبه‌خودی بولا",
        detail: "بیشتر در بیماری‌های انسدادی مزمن ریه",
      },
    ],
    treatment: [
      "معاینه: کاهش یا فقدان صدای تنفسی یک‌طرفه، هایپررزونانس، دویاسیون تراشه",
      "بررسی افت فشار خون و تاکی‌کاردی هم‌زمان (علائم فشاری هشداردهنده)",
      "در پنوموتوراکس فشاری، نیدل دکامپرشن فوری و سپس چست‌تیوب — بدون تاخیر برای رادیوگرافی",
      "رادیوگرافی قفسه سینه صرفاً در موارد پایدار همودینامیک برای تایید",
    ],
  },
  {
    id: "equipment",
    letter: "E",
    title: "خرابی تجهیزات (Equipment Failure)",
    icon: LuWrench,
    color: "purple",
    causes: [
      {
        text: "قطع اتصال مدار ونتیلاتور",
        detail:
          "Disconnection — معمولاً با آلارم فشار پایین یا حجم کم همراه است",
      },
      {
        text: "نشتی از کاف لوله تراشه یا مدار",
        detail: "افت تدریجی VTe و/یا صدای نشتی قابل شنیدن",
      },
      {
        text: "خرابی منبع اکسیژن یا خود دستگاه",
        detail: "نادر ولی باید همیشه در تشخیص افتراقی باقی بماند",
      },
      {
        text: "خرابی سنسور پالس اکسی‌متری",
        detail: "خطای دستگاه، نه بیمار — با علائم بالینی بیمار مطابقت ندارد",
      },
    ],
    treatment: [
      "بررسی تمام اتصالات مدار از دستگاه تا بیمار",
      "بررسی فشار کاف لوله تراشه",
      "در شک به خرابی دستگاه، فوراً بیمار را با بگ-ولو-ماسک به‌صورت دستی تهویه کنید",
      "بررسی محل و اتصال پروب پالس اکسی‌متری و مقایسه با وضعیت بالینی بیمار",
    ],
  },
  {
    id: "patient",
    letter: "+",
    title: "علل مربوط به بیمار",
    icon: LuUser,
    color: "blue",
    causes: [
      {
        text: "پیشرفت بیماری زمینه‌ای ریوی",
        detail: "ARDS، پنومونی، ادم ریوی در حال پیشرفت",
      },
      { text: "آتلکتازی", detail: "به‌ویژه پس از ساکشن یا در بی‌حرکتی طولانی" },
      {
        text: "شنت داخل ریوی یا داخل قلبی",
        detail: "پاسخ ضعیف به افزایش FiO2 مطرح‌کننده شنت است",
      },
      {
        text: "عدم هماهنگی با ونتیلاتور",
        detail: "Patient-ventilator dyssynchrony، افزایش کار تنفسی",
      },
    ],
    treatment: [
      "بررسی نیاز به افزایش PEEP یا مانور recruitment",
      "بررسی نیاز به تنظیم مجدد مد یا حساسیت تریگر",
      "در dyssynchrony، بررسی کفایت Sedation/Analgesia",
      "گرافی قفسه سینه و در صورت لزوم ABG برای ارزیابی گاز خون",
    ],
  },
];

const colorMap = {
  red: {
    border: "border-red-200",
    bg: "bg-red-50",
    text: "text-red-700",
    icon: "text-red-500",
    dot: "bg-red-400",
    badge: "bg-red-500",
  },
  amber: {
    border: "border-amber-200",
    bg: "bg-amber-50",
    text: "text-amber-700",
    icon: "text-amber-500",
    dot: "bg-amber-400",
    badge: "bg-amber-500",
  },
  orange: {
    border: "border-orange-200",
    bg: "bg-orange-50",
    text: "text-orange-700",
    icon: "text-orange-500",
    dot: "bg-orange-400",
    badge: "bg-orange-500",
  },
  purple: {
    border: "border-purple-200",
    bg: "bg-purple-50",
    text: "text-purple-700",
    icon: "text-purple-500",
    dot: "bg-purple-400",
    badge: "bg-purple-500",
  },
  blue: {
    border: "border-blue-200",
    bg: "bg-blue-50",
    text: "text-blue-700",
    icon: "text-blue-500",
    dot: "bg-blue-400",
    badge: "bg-blue-500",
  },
};

function O2DropModal({ onClose }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div
      dir="rtl"
      className="w-[92vw] max-w-2xl max-h-[88vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
    >
      {/* هدر گرادیانت */}
      <div className="relative bg-gradient-to-l from-red-600 to-orange-500 px-6 py-5 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
              <LuTriangleAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg leading-tight">
                علل افت اکسیژن (SpO₂)
              </h2>
              <p className="text-red-100 text-xs mt-0.5">
                Sudden Desaturation — Bedside Approach
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

        {/* نوار حروف DOPE */}
        <div className="flex gap-2 mt-4">
          {O2_CAUSES.map((item) => {
            const active = openId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setOpenId(active ? null : item.id)}
                className={`flex-1 rounded-lg py-2 flex flex-col items-center gap-0.5 transition-colors ${
                  active
                    ? "bg-white text-red-600"
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
        <p className="text-sm text-gray-500 mb-5">
          رویکرد سیستماتیک با مخفف رایج{" "}
          <span className="font-semibold text-gray-700">DOPE</span> (جابجایی،
          انسداد، پنوموتوراکس، خرابی تجهیزات) به‌همراه علل مرتبط با بیمار —
          ترتیب بررسی از شایع‌ترین و قابل‌رفع‌ترین علت شروع می‌شود.
        </p>

        <div className="space-y-3">
          {O2_CAUSES.map((item) => {
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
                        علل احتمالی
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
            در بیمار PICU، همیشه ابتدا خودتان و مدار را بررسی کنید، نه فقط
            دستگاه یا بیمار — یک بررسی سریع «از بیمار به دستگاه» (تماس مستقیم با
            بیمار، سپس لوله، سپس مدار، سپس ونتیلاتور) از اتلاف زمان در حل مشکلات
            فوریتی جلوگیری می‌کند.
          </NoteCard>

          <ReferenceFooter
            source={
              'UpToDate — "Overview of mechanical ventilation" / "Complications of mechanical ventilation"'
            }
          />
        </div>
      </div>
    </div>
  );
}

export default O2DropModal;
