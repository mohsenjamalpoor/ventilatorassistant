import React, { useState } from "react";
import {
  LuX,
  LuActivity,
  LuWind,
  LuDroplet,
  LuStethoscope,
  LuLightbulb,
  LuBookOpen,
  LuTriangleAlert,
  LuGitBranch,
  LuInfo,
} from "react-icons/lu";
import NoteCard from "./shared/NoteCard";
import ReferenceFooter from "./shared/ReferenceFooter";

function RespiratoryAcidosisModal({ onClose }) {
  const [severityTab, setSeverityTab] = useState("acute");

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[92vw] max-w-2xl max-h-[88vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
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
              عصب، عضله، دیواره قفسه سینه) یا خود پارانشیم ریه است.
            </p>
            <div className="mt-3">
              <NoteCard icon={LuInfo}>
                <strong>رابطه PaCO₂ با تهویه آلوئولی:</strong> PaCO₂ با تهویه
                دقیقه‌ای آلوئولی (VA) رابطه معکوس دارد؛ بنابراین هر عاملی که
                باعث کاهش VA شود، می‌تواند منجر به افزایش PaCO₂ و هیپرکاپنی شود.
                کاهش حجم جاری (VT)، کاهش تعداد تنفس (RR) یا افزایش فضای مرده
                (Dead Space) از مهم‌ترین عواملی هستند که تهویه آلوئولی را کاهش
                می‌دهند. در مقابل، افزایش تهویه آلوئولی معمولاً باعث کاهش PaCO₂
                می‌شود.
              </NoteCard>
            </div>
          </section>

          {/* علل - با تب حاد/مزمن */}
          <section>
            <SectionTitle
              icon={<LuTriangleAlert className="w-4 h-4" />}
              label="علل شایع"
            />
            <div className="flex gap-2 mb-3">
              <TabButton
                active={severityTab === "acute"}
                onClick={() => setSeverityTab("acute")}
              >
                حاد
              </TabButton>
              <TabButton
                active={severityTab === "chronic"}
                onClick={() => setSeverityTab("chronic")}
              >
                مزمن
              </TabButton>
            </div>
            {severityTab === "acute" ? (
              <CauseList
                items={[
                  {
                    title: "دپرسیون CNS",
                    detail: "سداتیو، اپیوئید، تروما یا خونریزی مغزی",
                  },
                  {
                    title: "انسداد راه هوایی فوقانی",
                    detail: "کروپ شدید، لارنگواسپاسم، جسم خارجی",
                  },
                  {
                    title: "برونکواسپاسم شدید",
                    detail: "حمله حاد آسم با خستگی تنفسی",
                  },
                  {
                    title: "خستگی عضلات تنفسی",
                    detail: "کار تنفسی طولانی‌مدت، Guillain-Barré حاد",
                  },
                  {
                    title: "پنوموتوراکس / فلیل چست",
                    detail: "کاهش حاد کمپلیانس یا مکانیک قفسه سینه",
                  },
                  {
                    title: "تهویه مکانیکی نامناسب",
                    detail: "VT یا RR ناکافی تنظیم‌شده",
                  },
                ]}
              />
            ) : (
              <CauseList
                items={[
                  {
                    title: "بیماری‌های عصبی-عضلانی",
                    detail: "SMA، دیستروفی عضلانی، میوپاتی مزمن",
                  },
                  {
                    title: "کیفواسکولیوز شدید",
                    detail: "محدودیت مکانیکی مزمن دیواره قفسه سینه",
                  },
                  {
                    title: "برونکوپولمونری دیسپلازی (BPD)",
                    detail: "نوزادان نارس با بیماری ریوی مزمن",
                  },
                  {
                    title: "سندرم هیپوونتیلاسیون مرکزی",
                    detail: "مادرزادی (CCHS) یا اکتسابی",
                  },
                  {
                    title: "چاقی مفرط (OHS)",
                    detail: "کمتر در PICU، ولی در نوجوانان مطرح",
                  },
                ]}
              />
            )}
          </section>

          {/* یافته های ABG */}
          <section>
            <SectionTitle
              icon={<LuDroplet className="w-4 h-4" />}
              label="یافته‌های ABG"
            />
            <div className="grid grid-cols-3 gap-3">
              <ValueBox label="pH" value="< 7.35" tone="rose" />
              <ValueBox label="PaCO2" value="> 45 mmHg" tone="rose" />
              <ValueBox label="HCO3" value="طبیعی یا ↑ جبرانی" tone="slate" />
            </div>
          </section>

          {/* فرمول جبران */}
          <section>
            <SectionTitle
              icon={<LuBookOpen className="w-4 h-4" />}
              label="جبران کلیوی مورد انتظار"
            />
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <FormulaRow
                label="حاد (Acute)"
                formula="به ازای هر ۱۰ mmHg افزایش PaCO2 → HCO3 حدود ۱ mEq/L افزایش می‌یابد"
              />
              <FormulaRow
                label="مزمن (Chronic، پس از ۳-۵ روز)"
                formula="به ازای هر ۱۰ mmHg افزایش PaCO2 → HCO3 حدود ۳.۵-۴ mEq/L افزایش می‌یابد"
              />
              <div className="pt-1 border-t border-slate-200">
                <p className="text-xs text-slate-500 leading-6">
                  عدم تطابق میزان جبران با این محدوده، مطرح‌کننده اختلال
                  اسید-باز مختلط همراه (مثل آلکالوز متابولیک یا اسیدوز متابولیک
                  هم‌زمان) است.
                </p>
              </div>
            </div>
          </section>

          {/* الگوریتم افتراق سریع */}
          <section>
            <SectionTitle
              icon={<LuGitBranch className="w-4 h-4" />}
              label="الگوریتم افتراق سریع در تخت بیمار"
            />
            <ol className="space-y-2.5">
              <AlgoStep
                n={1}
                text="تایید اسیدمی (pH < 7.35) و PaCO2 بالا در ABG"
              />
              <AlgoStep
                n={2}
                text="محاسبه HCO3 مورد انتظار طبق فرمول حاد/مزمن و مقایسه با HCO3 اندازه‌گیری‌شده بیمار"
              />
              <AlgoStep
                n={3}
                text="در صورت عدم تطابق → بررسی اختلال اسید-باز مختلط (مثلاً افت HCO3 بیشتر از حد انتظار → آلکالوز تنفسی مزمن هم‌زمان با CO2 بالا حاد)"
              />
              <AlgoStep
                n={4}
                text="ارزیابی هم‌زمان اکسیژناسیون (PaO2/SpO2) — هیپوکسمی همراه اغلب فوریت بالینی بیشتری دارد"
              />
              <AlgoStep
                n={5}
                text="تصمیم‌گیری درباره حمایت تنفسی (NIV / اینتوباسیون) بر اساس روند بالینی، نه فقط عدد PaCO2"
              />
            </ol>
          </section>

          {/* رویکرد بالینی */}
          <section>
            <SectionTitle
              icon={<LuStethoscope className="w-4 h-4" />}
              label="رویکرد بالینی و درمان"
            />
            <ul className="text-sm text-slate-600 leading-7 list-disc pr-5 space-y-1.5">
              <li>یافتن و درمان علت زمینه‌ای، اولویت اول است.</li>
              <li>
                در بیمار تحت تهویه مکانیکی، افزایش RR و/یا حجم جاری (در محدوده
                ایمن ریه) برای بهبود تهویه دقیقه‌ای.
              </li>
              <li>
                در نارسایی تنفسی حاد و pH پایین (معمولاً &lt; 7.20-7.25)، بررسی
                نیاز به NIV یا اینتوباسیون.
              </li>
              <li>
                در بیماران مزمن با جبران کامل، اجتناب از اصلاح سریع PaCO2 برای
                پیشگیری از آلکالمی پس از درمان (Post-hypercapnic alkalosis).
              </li>
              <li>
                توجه ویژه به همزمانی هیپوکسمی، که در بسیاری از موارد اورژانسی‌تر
                از خود هیپرکاپنی است.
              </li>
            </ul>
          </section>

          {/* نکته فوق تخصصی و رفرنس */}
          <div className="space-y-3">
            <NoteCard icon={LuLightbulb} title="نکته فوق‌تخصصی" tone="amber">
              در بیمار PICU با اسیدوز تنفسی مزمن (مثل BPD یا بیماری
              عصبی-عضلانی)، هدف هیپرکاپنی مجاز (Permissive Hypercapnia) با حفظ
              pH قابل قبول (معمولاً بالای ۷.۲۵-۷.۳۰) ترجیح داده می‌شود تا تلاش
              برای نرمال‌سازی کامل PaCO2 که می‌تواند منجر به آسیب حجمی/فشاری ریه
              (Volutrauma/Barotrauma) شود.
            </NoteCard>

            <ReferenceFooter
              source={'UpToDate — "Simple and mixed acid-base disorders"'}
            />
          </div>
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

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
        active
          ? "bg-rose-500 text-white"
          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
      }`}
    >
      {children}
    </button>
  );
}

function CauseList({ items }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2.5">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-slate-700">{item.title}</p>
            <p className="text-xs text-slate-500 leading-5 mt-0.5">
              {item.detail}
            </p>
          </div>
        </div>
      ))}
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

function AlgoStep({ n, text }) {
  return (
    <li className="flex items-start gap-3">
      <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 text-xs font-bold flex items-center justify-center shrink-0">
        {n}
      </span>
      <p className="text-sm text-slate-600 leading-7 pt-0.5">{text}</p>
    </li>
  );
}

export default RespiratoryAcidosisModal;
