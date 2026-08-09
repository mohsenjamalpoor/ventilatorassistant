import React from "react";
import {
  LuX,
  LuActivity,
  LuWind,
  LuDroplet,
  LuStethoscope,
  LuLightbulb,
  LuBookOpen,
  LuTriangleAlert,
} from "react-icons/lu";

function RespiratoryAcidosisModal({ onClose }) {
  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[92vw] max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-l from-rose-600 to-rose-500 px-6 py-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
              <LuWind className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg leading-tight">
                اسیدوز تنفسی
              </h2>
              <p className="text-rose-100 text-xs mt-0.5">
                Respiratory Acidosis
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
            aria-label="بستن"
          >
            <LuX className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Body - scrollable */}
        <div className="overflow-y-auto px-6 py-5 space-y-6">
          {/* تعریف */}
          <section>
            <SectionTitle
              icon={<LuActivity className="w-4 h-4" />}
              label="تعریف و پاتوفیزیولوژی"
            />
            <p className="text-sm text-slate-600 leading-7">
              اسیدوز تنفسی زمانی رخ می‌دهد که تهویه آلوئولی برای دفع CO2
              تولیدشده در بدن کافی نباشد، در نتیجه PaCO2 بالا رفته و pH خون کاهش
              می‌یابد. علت اصلی، اختلال در یکی از اجزای پمپ تنفسی (مرکز تنفسی،
              عصب، عضله، دیواره قفسه سینه) یا خود ریه است.
            </p>
          </section>

          {/* علل */}
          <section>
            <SectionTitle
              icon={<LuTriangleAlert className="w-4 h-4" />}
              label="علل شایع"
            />
            <div className="grid grid-cols-2 gap-3">
              <CauseCard
                title="حاد"
                items={[
                  "دپرسیون CNS (سداتیو، اپیوئید)",
                  "انسداد راه هوایی فوقانی",
                  "برونکواسپاسم شدید (آسم)",
                  "خستگی عضلات تنفسی",
                  "پنوموتوراکس / فلیل چست",
                  "تهویه مکانیکی نامناسب",
                ]}
              />
              <CauseCard
                title="مزمن"
                items={[
                  "بیماری‌های عصبی-عضلانی (SMA، دیستروفی)",
                  "کیفواسکولیوز شدید",
                  "برونکوپولمونری دیسپلازی (BPD)",
                  "سندرم هیپوونتیلاسیون مرکزی",
                  "چاقی مفرط (OHS)",
                ]}
              />
            </div>
          </section>

          {/* یافته های ABG */}
          <section>
            <SectionTitle
              icon={<LuDroplet className="w-4 h-4" />}
              label="یافته‌های گازومتری (ABG)"
            />
            <div className="grid grid-cols-3 gap-3">
              <ValueBox label="pH" value="< 7.35" tone="rose" />
              <ValueBox label="PaCO2" value="> 45 mmHg" tone="rose" />
              <ValueBox
                label="HCO3"
                value="طبیعی یا افزایش جبرانی"
                tone="slate"
              />
            </div>
          </section>

          {/* فرمول جبران */}
          <section>
            <SectionTitle
              icon={<LuBookOpen className="w-4 h-4" />}
              label="جبران کلیوی مورد انتظار"
            />
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <FormulaRow
                label="حاد (Acute)"
                formula="به ازای هر 10 mmHg افزایش PaCO2 → HCO3 حدود 1 mEq/L افزایش می‌یابد"
              />
              <FormulaRow
                label="مزمن (Chronic، پس از 3-5 روز)"
                formula="به ازای هر 10 mmHg افزایش PaCO2 → HCO3 حدود 3.5-4 mEq/L افزایش می‌یابد"
              />
              <p className="text-xs text-slate-500 leading-6 pt-1">
                عدم تطابق میزان جبران با این محدوده مطرح‌کننده اختلال اسید-باز
                مختلط همراه است.
              </p>
            </div>
          </section>

          {/* رویکرد بالینی */}
          <section>
            <SectionTitle
              icon={<LuStethoscope className="w-4 h-4" />}
              label="رویکرد بالینی و درمان"
            />
            <ul className="text-sm text-slate-600 leading-7 list-disc pr-5 space-y-1">
              <li>یافتن و درمان علت زمینه‌ای، اولویت اول است.</li>
              <li>
                در بیمار تحت تهویه مکانیکی، افزایش RR و/یا حجم جاری (در محدوده
                ایمن ریه) برای بهبود تهویه دقیقه‌ای.
              </li>
              <li>
                در نارسایی تنفسی حاد و pH پایین، بررسی نیاز به NIV یا
                اینتوباسیون.
              </li>
              <li>
                در بیماران مزمن با جبران کامل، اجتناب از اصلاح سریع PaCO2 برای
                پیشگیری از آلکالمی پس از درمان.
              </li>
              <li>
                توجه ویژه به همزمانی هیپوکسمی، که در بسیاری از موارد اورژانسی‌تر
                از خود هیپرکاپنی است.
              </li>
            </ul>
          </section>

          {/* نکته فوق تخصصی */}
          <section className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
            <LuLightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800 mb-1">
                نکته فوق‌تخصصی
              </p>
              <p className="text-sm text-amber-700 leading-7">
                در بیمار PICU با اسیدوز تنفسی مزمن (مثل BPD یا بیماری
                عصبی-عضلانی)، هدف هیپرکاپنی مجاز (Permissive Hypercapnia) با حفظ
                pH قابل قبول (معمولاً بالای 7.25-7.30) ترجیح داده می‌شود تا تلاش
                برای نرمال‌سازی کامل PaCO2 که می‌تواند منجر به آسیب حجمی/فشاری
                ریه شود.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ icon, label }) {
  return (
    <div className="flex items-center gap-2 mb-2.5">
      <span className="text-rose-500">{icon}</span>
      <h3 className="text-sm font-bold text-slate-800">{label}</h3>
    </div>
  );
}

function CauseCard({ title, items }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
      <p className="text-xs font-semibold text-slate-500 mb-2">{title}</p>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li
            key={i}
            className="text-xs text-slate-600 leading-5 flex items-start gap-1.5"
          >
            <span className="w-1 h-1 rounded-full bg-rose-400 mt-1.5 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ValueBox({ label, value, tone }) {
  const toneClasses =
    tone === "rose"
      ? "bg-rose-50 border-rose-200 text-rose-700"
      : "bg-slate-50 border-slate-200 text-slate-700";
  return (
    <div className={`rounded-xl border px-3 py-3 text-center ${toneClasses}`}>
      <p className="text-[11px] font-medium opacity-70 mb-1">{label}</p>
      <p className="text-sm font-bold">{value}</p>
    </div>
  );
}

function FormulaRow({ label, formula }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-semibold text-slate-700">{label}</span>
      <span className="text-sm text-slate-600 leading-6">{formula}</span>
    </div>
  );
}

export default RespiratoryAcidosisModal;
