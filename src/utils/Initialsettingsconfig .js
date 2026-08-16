export const initialSettingsConfig = {
  // تنظیمات پایه
  baseSettings: {
    tidalVolume: (weight) => (weight * 7).toFixed(1),
    respiratoryRate: 20,
    fio2: 100,
    peep: 5,
    ieRatio: "1:2",
    flowRate: 25,
    mode: "VC-SIMV",
    pressureSupport: 12,
    cpap: 6,
    pip: 20,
    ti: 1.0,
    trigger: 5,
    vteRatio: 0.85,
  },

  // تنظیمات بر اساس نوع درگیری ریه
  lungInvolvementSettings: {
    normal: {
      mode: "VC-SIMV",
      respiratoryRate: 25,
      tidalVolume: (weight) => (weight * 6).toFixed(1),
      fio2: 100,
      peep: 5,
      ieRatio: "1:2",
      flowRate: 25,
      pressureSupport: 15,
      cpap: 6,
      pip: 20,
      ti: 1.0,
      trigger: 5,
      vteRatio: 0.88,
      description: "ریه نرمال",
    },

    obstructive: {
      mode: "VC-SIMV",
      respiratoryRate: 18,
      tidalVolume: (weight) => (weight * 6).toFixed(1),
      fio2: 100,
      peep: 6,
      ieRatio: "1:3",
      flowRate: 30,
      pressureSupport: 14,
      cpap: 6,
      pip: 22,
      ti: 0.7,
      trigger: 4,
      vteRatio: 0.75,
      description: "بیماری انسدادی",
    },

    restrictive: {
      mode: "VC-SIMV",
      respiratoryRate: 22,
      tidalVolume: (weight) => (weight * 7).toFixed(1),
      fio2: 100,
      peep: 8,
      ieRatio: "1:2",
      flowRate: 25,
      pressureSupport: 14,
      cpap: 8,
      pip: 25,
      ti: 0.7,
      trigger: 5,
      vteRatio: 0.78,
      description: "بیماری محدودکننده",
    },
  },
};

// لیبل فارسی و واحد هر آیتم ونتیلاتور
export const ventilatorItemLabels = {
  mode: { label: "مود ونتیلاتور", unit: "" },
  respiratoryRate: { label: "تعداد تنفس (RR)", unit: "/min" },
  tidalVolume: { label: "حجم جاری (Tidal Volume)", unit: "ml" },
  fio2: { label: "FiO₂", unit: "%" },
  peep: { label: "PEEP", unit: "cmH₂O" },
  ieRatio: { label: "نسبت I:E", unit: "" },
  flowRate: { label: "فلوی دمی (Flow Rate)", unit: "L/min" },
  pressureSupport: { label: "فشار حمایتی (PS)", unit: "cmH₂O" },
  cpap: { label: "CPAP", unit: "cmH₂O" },
  pip: { label: "فشار پیک دمی (PIP)", unit: "cmH₂O" },
  ti: { label: "زمان دم (Ti)", unit: "sec" },
  trigger: { label: "تریگر", unit: "L/min" },
  vte: { label: "حجم بازدمی (VTe)", unit: "ml" },
  mvent: { label: "تهویه دقیقه‌ای (MVent)", unit: "L/min" },
};

// ترتیب نمایش آیتم‌ها
export const ventilatorItemOrder = [
  "mode",
  "respiratoryRate",
  "tidalVolume",
  "vte",
  "mvent",
  "fio2",
  "peep",
  "pip",
  "pressureSupport",
  "cpap",
  "ieRatio",
  "ti",
  "flowRate",
  "trigger",
];

// تابع محاسبه محدوده‌های هشدار
export const calculateAlarmRanges = (currentSettings) => {
  const currentRR = parseFloat(currentSettings.respiratoryRate) || 20;
  const currentMvent = parseFloat(currentSettings.mvent) || 5;
  const currentPeep = parseFloat(currentSettings.peep) || 5;

  return {
    rr: {
      low: Math.max(8, Math.round(currentRR * 0.7)),
      high: Math.round(currentRR * 1.5),
      current: currentRR,
      unit: "/min",
    },
    mvent: {
      low: Math.round(currentMvent * 0.7 * 100) / 100,
      high: Math.round(currentMvent * 1.5 * 100) / 100,
      current: currentMvent,
      unit: "L/min",
    },
    peep: {
      low: Math.max(3, Math.round((currentPeep - 2) * 10) / 10),
      high: Math.round((currentPeep + 3) * 10) / 10,
      current: currentPeep,
      unit: "cmH₂O",
    },
  };
};

// تابع محاسبه تهویه دقیقه‌ای
export const calculateMvent = (tv, rr) => {
  if (!tv || !rr) return "0.00";
  return ((parseFloat(tv) * parseFloat(rr)) / 1000).toFixed(2);
};

// تابع محاسبه VTe بر اساس نوع درگیری
export const calculateVTe = (vti, lungInvolvement) => {
  const vtiValue = parseFloat(vti) || 0;
  let vteRatio = initialSettingsConfig.baseSettings.vteRatio;

  // انتخاب نسبت VTe بر اساس نوع درگیری
  if (
    lungInvolvement &&
    initialSettingsConfig.lungInvolvementSettings[lungInvolvement]
  ) {
    const settings =
      initialSettingsConfig.lungInvolvementSettings[lungInvolvement];
    vteRatio = settings.vteRatio || vteRatio;
  }

  return (vtiValue * vteRatio).toFixed(1);
};

// تابع دریافت نام نوع درگیری به فارسی
export const getLungInvolvementName = (lungInvolvement) => {
  const names = {
    normal: "ریه نرمال",
    obstructive: "بیماری انسدادی",
    restrictive: "بیماری محدودکننده",
  };
  return names[lungInvolvement] || "بدون درگیری مشخص";
};

// تابع دریافت توضیحات نوع درگیری
export const getLungInvolvementDescription = (lungInvolvement) => {
  const descriptions = {
    normal: "تنظیمات استاندارد برای ریه نرمال(کاهش سطح هوشیاری، تشنج)",
    obstructive: "تنظیمات مناسب برای بیماری‌های انسدادی (آسم، برونشیولیت)",
    restrictive: "تنظیمات مناسب برای بیماری‌های محدودکننده (پنومونی، ARDS)",
  };
  return descriptions[lungInvolvement] || "تنظیمات پیش‌فرض";
};

// تابع اصلی محاسبه تنظیمات اولیه بر اساس نوع درگیری
export const getInitialSettings = (
  weight,
  age,
  lungInvolvement,
  normalLungCondition,
  obstructiveDisease,
  restrictiveDisease,
) => {
  const base = initialSettingsConfig.baseSettings;

  // تنظیمات پایه با وزن
  const baseSettings = {
    ...base,
    tidalVolume: base.tidalVolume(weight),
  };

  // دریافت تنظیمات بر اساس نوع درگیری
  let involvementSettings = {};
  if (
    lungInvolvement &&
    initialSettingsConfig.lungInvolvementSettings[lungInvolvement]
  ) {
    involvementSettings = {
      ...initialSettingsConfig.lungInvolvementSettings[lungInvolvement],
    };
  }

  // ترکیب تنظیمات
  const finalSettings = {
    ...baseSettings,
    ...involvementSettings,
    tidalVolume: involvementSettings.tidalVolume
      ? involvementSettings.tidalVolume(weight)
      : baseSettings.tidalVolume,
  };

  // محاسبه VTe بر اساس نوع درگیری
  finalSettings.vte = calculateVTe(finalSettings.tidalVolume, lungInvolvement);

  // محاسبه MVent
  finalSettings.mvent = calculateMvent(
    finalSettings.tidalVolume,
    finalSettings.respiratoryRate,
  );

  // حذف فیلد description از خروجی نهایی
  delete finalSettings.description;

  return finalSettings;
};

// تابع برای دریافت تنظیمات خاص هر نوع درگیری (برای نمایش در UI)
export const getLungInvolvementSettings = (lungInvolvement) => {
  return initialSettingsConfig.lungInvolvementSettings[lungInvolvement] || null;
};

// تابع برای مقایسه تنظیمات دو نوع درگیری مختلف
export const compareLungInvolvementSettings = (type1, type2) => {
  const settings1 = initialSettingsConfig.lungInvolvementSettings[type1];
  const settings2 = initialSettingsConfig.lungInvolvementSettings[type2];

  if (!settings1 || !settings2) return null;

  const differences = {};
  const keys = [
    "respiratoryRate",
    "peep",
    "ieRatio",
    "flowRate",
    "pressureSupport",
    "pip",
    "ti",
    "trigger",
    "vteRatio",
  ];

  keys.forEach((key) => {
    if (settings1[key] !== settings2[key]) {
      differences[key] = {
        [type1]: settings1[key],
        [type2]: settings2[key],
      };
    }
  });

  return differences;
};
