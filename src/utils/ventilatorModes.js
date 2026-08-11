// فایل ventilatorModes.js
// مودهای ونتیلاتور به همراه تنظیمات پیشنهادی بر اساس نوع درگیری ریه
// منبع مرجع: UpToDate — Overview of mechanical ventilation / High-frequency
// oscillatory ventilation in children / Modes of mechanical ventilation

import { calculateMvent, calculateVTe } from "../utils/Initialsettingsconfig ";

// --------------------------------------------------------------------------
// لیبل و واحد پارامترهایی که مختص برخی مودها هستند (علاوه بر
// ventilatorItemLabels موجود در Initialsettingsconfig)
// --------------------------------------------------------------------------
export const modeParameterLabels = {
  pressureControl: { label: "فشار کنترل (بالای PEEP)", unit: "cmH₂O" },
  map: { label: "میانگین فشار راه هوایی (MAP)", unit: "cmH₂O" },
  amplitude: { label: "دامنه نوسان (ΔP)", unit: "cmH₂O" },
  frequency: { label: "فرکانس", unit: "Hz" },
  inspiratoryTimePercent: { label: "درصد زمان دمی (%Ti)", unit: "%" },
};

// --------------------------------------------------------------------------
// مودهای ونتیلاتور
// --------------------------------------------------------------------------
export const pediatricVentilatorModes = {
  "VC-AC": {
    name: "VC-A/C",
    fullName: "Volume Control – Assist/Control",
    description: "کنترل حجمی با تضمین حجم جاری در هر تنفس (اجباری یا دستیار)",
    icon: "📐",
    category: "conventional",
    reference: "UpToDate — Modes of mechanical ventilation",
    clinicalIndications: [
      "نیاز به تضمین حجم جاری ثابت",
      "بیمار بدون تلاش تنفسی قابل اتکا (سداسیون عمیق، فلج عصبی-عضلانی)",
      "مرحله اولیه تهویه در اکثر بیماران PICU",
    ],
    advantages: [
      "حجم جاری و تهویه دقیقه‌ای ثابت و قابل پیش‌بینی",
      "سادگی تنظیم و پایش",
    ],
    disadvantages: [
      "فشار راه هوایی متغیر بر اساس کمپلیانس/مقاومت",
      "خطر باروتروما در صورت کاهش ناگهانی کمپلیانس",
    ],
    keyParameters: [
      "tidalVolume",
      "respiratoryRate",
      "peep",
      "ieRatio",
      "flowRate",
      "fio2",
      "trigger",
    ],
    settingsByInvolvement: {
      normal: {
        tidalVolume: (w) => (w * 7).toFixed(1),
        respiratoryRate: 20,
        peep: 5,
        ieRatio: "1:2",
        flowRate: 25,
        trigger: 5,
        note: "تنظیمات استاندارد برای ریه سالم.",
      },
      obstructive: {
        tidalVolume: (w) => (w * 6).toFixed(1),
        respiratoryRate: 16,
        peep: 6,
        ieRatio: "1:4",
        flowRate: 35,
        trigger: 4,
        note: "RR پایین‌تر و I:E کشیده‌تر برای فرصت کافی بازدم و پیشگیری از ایر-تراپینگ/PEEP خودبه‌خودی.",
      },
      restrictive: {
        tidalVolume: (w) => (w * 6).toFixed(1),
        respiratoryRate: 24,
        peep: 8,
        ieRatio: "1:1.5",
        flowRate: 25,
        trigger: 5,
        note: "حجم جاری محافظتی (~6 ml/kg) و PEEP بالاتر برای بهبود اکسیژناسیون و پیشگیری از آتلکتوتروما.",
      },
    },
  },

  "PC-AC": {
    name: "PC-A/C",
    fullName: "Pressure Control – Assist/Control",
    description:
      "کنترل فشاری با فشار ثابت در هر تنفس؛ حجم جاری متغیر بر اساس کمپلیانس",
    icon: "🎚️",
    category: "conventional",
    reference: "UpToDate — Modes of mechanical ventilation",
    clinicalIndications: [
      "نوزادان و شیرخواران با راه هوایی نشتی (لوله بدون کاف)",
      "بیماری‌های با کمپلیانس متغیر (ARDS)",
      "پیشگیری از فشار پیک بالا",
    ],
    advantages: [
      "کنترل بهتر فشار پیک راه هوایی",
      "الگوی جریان دمی کاهشی (decelerating)، توزیع مناسب‌تر گاز",
    ],
    disadvantages: [
      "حجم جاری تضمین‌شده نیست و با تغییر کمپلیانس/مقاومت نوسان می‌کند",
      "نیاز به پایش دقیق‌تر VTe",
    ],
    keyParameters: [
      "pressureControl",
      "respiratoryRate",
      "peep",
      "ti",
      "ieRatio",
      "fio2",
      "trigger",
    ],
    settingsByInvolvement: {
      normal: {
        pressureControl: 15,
        respiratoryRate: 20,
        peep: 5,
        ti: 0.8,
        ieRatio: "1:2",
        trigger: 5,
        note: "فشار کنترل برای رسیدن به VTe هدف (۶-۸ ml/kg) تنظیم و پایش شود.",
      },
      obstructive: {
        pressureControl: 18,
        respiratoryRate: 16,
        peep: 6,
        ti: 0.6,
        ieRatio: "1:4",
        trigger: 4,
        note: "Ti کوتاه‌تر و زمان بازدمی طولانی‌تر برای کاهش ایر-تراپینگ.",
      },
      restrictive: {
        pressureControl: 20,
        respiratoryRate: 24,
        peep: 8,
        ti: 0.6,
        ieRatio: "1:1.5",
        trigger: 5,
        note: "فشار کنترل به‌گونه‌ای تنظیم شود که VTe محافظتی (~6 ml/kg) حاصل شود؛ Pplat زیر ۲۸-۳۰ cmH₂O هدف باشد.",
      },
    },
  },

  SIMV: {
    name: "SIMV",
    fullName: "Synchronized Intermittent Mandatory Ventilation (+PS)",
    description:
      "تهویه اجباری متناوب هماهنگ‌شده همراه با تنفس‌های خودبه‌خودی حمایت‌شده",
    icon: "🔄",
    category: "conventional",
    reference: "UpToDate — Modes of mechanical ventilation",
    clinicalIndications: [
      "مناسب برای اکثر بیماران با تلاش تنفسی حفظ‌شده",
      "مرحله انتقال به سمت جداسازی از ونتیلاتور (weaning)",
    ],
    advantages: [
      "کاهش تعداد تنفس‌های اجباری با کاهش تدریجی RR",
      "حفظ عضلات تنفسی نسبت به کنترل کامل",
    ],
    disadvantages: [
      "احتمال افزایش کار تنفسی در تنفس‌های خودبه‌خودی بدون PS کافی",
      "امکان عدم هماهنگی بین تنفس بیمار و ونتیلاتور",
    ],
    keyParameters: [
      "tidalVolume",
      "respiratoryRate",
      "pressureSupport",
      "peep",
      "ieRatio",
      "fio2",
      "trigger",
    ],
    settingsByInvolvement: {
      normal: {
        tidalVolume: (w) => (w * 6).toFixed(1),
        respiratoryRate: 20,
        pressureSupport: 10,
        peep: 5,
        ieRatio: "1:2",
        trigger: 5,
        note: "PS معمولاً برابر با غلبه بر مقاومت لوله تراشه (۸-۱۲ cmH₂O) تنظیم می‌شود.",
      },
      obstructive: {
        tidalVolume: (w) => (w * 6).toFixed(1),
        respiratoryRate: 16,
        pressureSupport: 12,
        peep: 6,
        ieRatio: "1:3",
        trigger: 4,
        note: "PS اندکی بالاتر برای غلبه بر مقاومت راه هوایی و PEEP خودبه‌خودی احتمالی.",
      },
      restrictive: {
        tidalVolume: (w) => (w * 6.5).toFixed(1),
        respiratoryRate: 22,
        pressureSupport: 14,
        peep: 8,
        ieRatio: "1:2",
        trigger: 5,
        note: "PEEP بالاتر برای حفظ باز بودن آلوئولی؛ PS برای جبران کار تنفسی افزایش‌یافته.",
      },
    },
  },

  PRVC: {
    name: "PRVC",
    fullName: "Pressure-Regulated Volume Control (VC+ / AutoFlow)",
    description:
      "حجم جاری تضمین‌شده با کمترین فشار ممکن؛ ترکیب مزایای حجمی و فشاری",
    icon: "📊",
    category: "conventional",
    reference: "UpToDate — Modes of mechanical ventilation",
    clinicalIndications: [
      "ARDS و بیماری‌های با کمپلیانس متغیر",
      "نیاز هم‌زمان به حجم جاری تضمین‌شده و محدودیت فشار",
      "بیشتر مودهای پیش‌فرض ICU مدرن برای اغلب بیماران",
    ],
    advantages: [
      "تضمین حجم جاری با تنظیم خودکار فشار",
      "کاهش خطر باروتروما نسبت به VC خالص",
      "تطبیق خودکار با تغییرات کمپلیانس/مقاومت",
    ],
    disadvantages: [
      "وابسته به الگوریتم دستگاه؛ ممکن است تنظیم فشار به‌کندی با تغییرات ناگهانی تطبیق یابد",
    ],
    keyParameters: [
      "tidalVolume",
      "respiratoryRate",
      "peep",
      "ieRatio",
      "fio2",
      "trigger",
    ],
    settingsByInvolvement: {
      normal: {
        tidalVolume: (w) => (w * 7).toFixed(1),
        respiratoryRate: 20,
        peep: 5,
        ieRatio: "1:2",
        trigger: 5,
        note: "حجم جاری استاندارد ۶-۸ ml/kg.",
      },
      obstructive: {
        tidalVolume: (w) => (w * 6).toFixed(1),
        respiratoryRate: 16,
        peep: 6,
        ieRatio: "1:4",
        trigger: 4,
        note: "حجم جاری محدودتر و زمان بازدمی کافی برای کاهش ایر-تراپینگ.",
      },
      restrictive: {
        tidalVolume: (w) => (w * 6).toFixed(1),
        respiratoryRate: 24,
        peep: 8,
        ieRatio: "1:1.5",
        trigger: 5,
        note: "حجم جاری محافظتی ۶ ml/kg مطابق راهبرد lung-protective در ARDS.",
      },
    },
  },

  PSV: {
    name: "PSV",
    fullName: "Pressure Support Ventilation",
    description:
      "حمایت فشاری از تنفس‌های خودبه‌خودی بیمار؛ بدون تنفس اجباری پشتیبان",
    icon: "🫁",
    category: "conventional",
    reference: "UpToDate — Weaning from mechanical ventilation",
    clinicalIndications: [
      "مرحله weaning در بیمار با درایو تنفسی پایدار",
      "ارزیابی آمادگی برای اکستوباسیون (spontaneous breathing trial)",
    ],
    advantages: [
      "هماهنگی بالا با تلاش تنفسی بیمار",
      "کاهش کار تنفسی در حین حفظ تنفس خودبه‌خودی",
    ],
    disadvantages: [
      "نیازمند درایو تنفسی پایدار و قابل اتکا",
      "بدون تنفس اجباری پشتیبان (backup) ممکن است ناکافی باشد در آپنه",
    ],
    keyParameters: ["pressureSupport", "peep", "fio2", "trigger"],
    settingsByInvolvement: {
      normal: {
        pressureSupport: 10,
        peep: 5,
        trigger: 5,
        note: "PS برای رسیدن به VTe حدود ۶ ml/kg و RR خودبه‌خودی طبیعی تنظیم شود.",
      },
      obstructive: {
        pressureSupport: 12,
        peep: 6,
        trigger: 4,
        note: "PS بالاتر برای غلبه بر مقاومت راه هوایی؛ PEEP برای متعادل‌سازی PEEP خودبه‌خودی.",
      },
      restrictive: {
        pressureSupport: 14,
        peep: 8,
        trigger: 5,
        note: "PS بالاتر متناسب با کاهش کمپلیانس و افزایش کار تنفسی.",
      },
    },
  },

  CPAP: {
    name: "CPAP",
    fullName: "Continuous Positive Airway Pressure",
    description:
      "فشار مثبت مداوم راه هوایی بدون حمایت فشاری اضافه؛ تنفس کاملاً خودبه‌خودی",
    icon: "💨",
    category: "conventional",
    reference: "UpToDate — Noninvasive respiratory support in children",
    clinicalIndications: [
      "آپنه نوزادان",
      "نارسایی تنفسی خفیف تا متوسط",
      "ارزیابی نهایی پیش از اکستوباسیون",
    ],
    advantages: [
      "قابل استفاده به‌صورت غیرتهاجمی",
      "حفظ باز بودن راه هوایی و ظرفیت باقیمانده عملکردی",
    ],
    disadvantages: [
      "بدون حمایت فشاری برای هر تنفس؛ نامناسب برای بیمار با کار تنفسی بالا",
    ],
    keyParameters: ["peep", "fio2"],
    settingsByInvolvement: {
      normal: { peep: 5, note: "سطح استاندارد شروع." },
      obstructive: {
        peep: 6,
        note: "سطح اندکی بالاتر برای غلبه بر مقاومت راه هوایی و PEEP خودبه‌خودی.",
      },
      restrictive: {
        peep: 8,
        note: "سطح بالاتر برای بهبود اکسیژناسیون و کاهش آتلکتازی.",
      },
    },
  },

  HFOV: {
    name: "HFOV",
    fullName: "High-Frequency Oscillatory Ventilation",
    description:
      "تهویه با حجم جاری بسیار کم و فرکانس بالا؛ مود نجات در نارسایی تنفسی شدید",
    icon: "〰️",
    category: "advanced",
    reference: "UpToDate — High-frequency ventilation in children",
    clinicalIndications: [
      "ARDS شدید مقاوم به تهویه معمولی",
      "نشت هوای شدید ریوی همراه با نیاز به کاهش فشار پیک",
    ],
    advantages: [
      "حجم جاری بسیار کم؛ کاهش بالقوه آسیب حجمی/فشاری ریه",
      "کنترل مستقل اکسیژناسیون (MAP) و تهویه (فرکانس/دامنه)",
    ],
    disadvantages: [
      "نیاز به تجربه و پایش تخصصی بالا",
      "خطر بیش‌تورمی و ایر-تراپینگ در بیماری انسدادی راه هوایی",
      "ممکن است بر برگشت وریدی و برون‌ده قلبی اثر بگذارد",
    ],
    keyParameters: [
      "map",
      "amplitude",
      "frequency",
      "inspiratoryTimePercent",
      "fio2",
    ],
    settingsByInvolvement: {
      normal: {
        map: 10,
        amplitude: 25,
        frequency: 8,
        inspiratoryTimePercent: 33,
        note: "به‌ندرت به‌عنوان مود اولیه در ریه سالم استفاده می‌شود؛ عمدتاً مود نجات است.",
      },
      obstructive: {
        map: 10,
        amplitude: 30,
        frequency: 6,
        inspiratoryTimePercent: 33,
        note: "احتیاط: در بیماری انسدادی شدید (مثل آسم/برونشیولیت) معمولاً کمتر ترجیح داده می‌شود؛ خطر ایر-تراپینگ و بیش‌تورمی بالاست.",
      },
      restrictive: {
        map: 14,
        amplitude: 35,
        frequency: 6,
        inspiratoryTimePercent: 33,
        note: "کاربرد شاخص در ARDS شدید؛ MAP بالاتر برای بهبود اکسیژناسیون، فرکانس پایین‌تر متناسب با اندازه بیمار.",
      },
    },
  },
};

// --------------------------------------------------------------------------
// محاسبه تنظیمات نهایی یک مود بر اساس نوع درگیری ریه و وزن بیمار
// --------------------------------------------------------------------------
export const getModeSettings = (modeId, lungInvolvement, weight) => {
  const mode = pediatricVentilatorModes[modeId];
  if (!mode) return null;

  const involvementKey =
    lungInvolvement && mode.settingsByInvolvement[lungInvolvement]
      ? lungInvolvement
      : "normal";

  const raw = mode.settingsByInvolvement[involvementKey];

  const resolved = { mode: modeId, fio2: 100 };
  Object.entries(raw).forEach(([key, value]) => {
    if (key === "note") return;
    resolved[key] = typeof value === "function" ? value(weight) : value;
  });

  // محاسبه VTe و MVent فقط برای مودهای حجمی/PRVC/SIMV که tidalVolume دارند
  if (resolved.tidalVolume) {
    resolved.vte = calculateVTe(resolved.tidalVolume, lungInvolvement);
    resolved.mvent = calculateMvent(
      resolved.tidalVolume,
      resolved.respiratoryRate,
    );
  }

  return {
    settings: resolved,
    note: raw.note || "",
    involvementUsed: involvementKey,
  };
};

// لیست شناسه مودها به ترتیب نمایش (متداول سپس پیشرفته)
export const modeOrder = [
  "VC-AC",
  "PC-AC",
  "SIMV",
  "PRVC",
  "PSV",
  "CPAP",
  "HFOV",
];
