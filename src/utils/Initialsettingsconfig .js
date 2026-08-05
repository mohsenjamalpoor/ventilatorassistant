// آبجکت تنظیمات اولیه برای ونتیلاتور کودکان
// نکته: مقادیر flowRate, pressureSupport, cpap, ti, trigger برای هر بیماری
// به‌صورت صریح تعیین شده‌اند (نه ارث‌بری از baseSettings) و باید توسط
// مدرس/متخصص بالینی بازبینی و در صورت نیاز اصلاح شوند.
export const initialSettingsConfig = {
  baseSettings: {
    tidalVolume: (weight) => (weight * 7).toFixed(1),
    respiratoryRate: 20,
    fio2: 100,
    peep: 5,
    ieRatio: "1:2",
    flowRate: 25,
    mode: "SIMV",
    pressureSupport: 12,
    cpap: 6,
    pip: 20,
    ti: 1.0,
    trigger: 5,
    vteRatio: 0.85,
  },

  normalLung: {
    reduced_consciousness: {
      mode: "SIMV",
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
    },
    seizure: {
      mode: "PRVC",
      respiratoryRate: 25,
      tidalVolume: (weight) => (weight * 6).toFixed(1),
      fio2: 100,
      peep: 5,
      ieRatio: "1:2",
      flowRate: 25,
      pressureSupport: 12,
      cpap: 6,
      pip: 20,
      ti: 1.0,
      trigger: 5,
      vteRatio: 0.9,
    },
  },

  obstructiveDiseases: {
    bronchiolitis: {
      mode: "PRVC",
      respiratoryRate: 25,
      tidalVolume: (weight) => (weight * 6).toFixed(1),
      fio2: 100,
      peep: 4,
      ieRatio: "1:3",
      flowRate: 30,
      pressureSupport: 15,
      cpap: 6,
      pip: 22,
      ti: 0.6,
      trigger: 4,
      vteRatio: 0.65,
    },
    asthma: {
      mode: "PRVC",
      respiratoryRate: 22,
      tidalVolume: (weight) => (weight * 6).toFixed(1),
      fio2: 100,
      peep: 3,
      ieRatio: "1:4",
      flowRate: 35,
      pressureSupport: 15,
      cpap: 5,
      pip: 25,
      ti: 0.5,
      trigger: 4,
      vteRatio: 0.7,
    },
    copd: {
      mode: "SIMV",
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
    },
    foreign_body_aspiration: {
      mode: "PRVC",
      respiratoryRate: 25,
      tidalVolume: (weight) => (weight * 6).toFixed(1),
      fio2: 100,
      peep: 5,
      ieRatio: "1:2",
      flowRate: 28,
      pressureSupport: 13,
      cpap: 6,
      pip: 20,
      ti: 0.8,
      trigger: 5,
      vteRatio: 0.6,
    },
  },

  restrictiveDiseases: {
    pneumonia: {
      mode: "PRVC",
      respiratoryRate: 28,
      tidalVolume: (weight) => (weight * 6).toFixed(1),
      fio2: 100,
      peep: 8,
      ieRatio: "1:1.5",
      flowRate: 25,
      pressureSupport: 16,
      cpap: 8,
      pip: 28,
      ti: 0.6,
      trigger: 5,
      vteRatio: 0.75,
    },
    ards: {
      mode: "PRVC",
      respiratoryRate: 35,
      tidalVolume: (weight) => (weight * 5).toFixed(1),
      fio2: 100,
      peep: 12,
      ieRatio: "1:1",
      flowRate: 30,
      pressureSupport: 18,
      cpap: 10,
      pip: 32,
      ti: 0.5,
      trigger: 6,
      vteRatio: 0.8,
    },
    pulmonary_edema: {
      mode: "PRVC",
      respiratoryRate: 35,
      tidalVolume: (weight) => (weight * 6).toFixed(1),
      fio2: 100,
      peep: 10,
      ieRatio: "1:1.5",
      flowRate: 28,
      pressureSupport: 16,
      cpap: 9,
      pip: 30,
      ti: 0.55,
      trigger: 6,
      vteRatio: 0.7,
    },
    atelectasis: {
      mode: "SIMV",
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
    },
  },
};

// لیبل فارسی و واحد هر آیتم ونتیلاتور، برای استفاده در نمایش UI
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
};

// ترتیب نمایش آیتم‌ها در صفحه‌ی تنظیمات
export const ventilatorItemOrder = [
  "mode",
  "respiratoryRate",
  "tidalVolume",
  "vte",
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

// تابع کمکی برای محاسبه محدوده‌های هشدار
export const calculateAlarmRanges = (currentSettings) => {
  const currentRR = parseFloat(currentSettings.respiratoryRate);
  const currentMvent = parseFloat(currentSettings.mvent);
  const currentPeep = parseFloat(currentSettings.peep);

  return {
    rr: {
      low: Math.max(8, currentRR / 2).toFixed(1),
      high: (currentRR * 2).toFixed(1),
      current: currentRR,
      unit: "/min",
    },
    mvent: {
      low: (currentMvent / 2).toFixed(2),
      high: (currentMvent * 2).toFixed(2),
      current: currentMvent,
      unit: "L/min",
    },
    peep: {
      low: Math.max(3, currentPeep - 2).toFixed(1),
      high: (currentPeep + 2).toFixed(1),
      current: currentPeep,
      unit: "cmH₂O",
    },
  };
};

// تابع برای محاسبه تهویه دقیقه‌ای
export const calculateMvent = (tv, rr) => {
  return ((parseFloat(tv) * parseFloat(rr)) / 1000).toFixed(2);
};

// تابع برای محاسبه VTe بر اساس نوع بیماری
export const calculateVTe = (
  vti,
  lungInvolvement,
  normalLungCondition,
  obstructiveDisease,
  restrictiveDisease,
) => {
  const vtiValue = parseFloat(vti);
  let vteRatio = initialSettingsConfig.baseSettings.vteRatio;

  switch (lungInvolvement) {
    case "normal":
      if (
        normalLungCondition &&
        initialSettingsConfig.normalLung[normalLungCondition]
      ) {
        vteRatio =
          initialSettingsConfig.normalLung[normalLungCondition].vteRatio ||
          vteRatio;
      }
      break;

    case "obstructive":
      if (
        obstructiveDisease &&
        initialSettingsConfig.obstructiveDiseases[obstructiveDisease]
      ) {
        vteRatio =
          initialSettingsConfig.obstructiveDiseases[obstructiveDisease]
            .vteRatio || vteRatio;
      }
      break;

    case "restrictive":
      if (
        restrictiveDisease &&
        initialSettingsConfig.restrictiveDiseases[restrictiveDisease]
      ) {
        vteRatio =
          initialSettingsConfig.restrictiveDiseases[restrictiveDisease]
            .vteRatio || vteRatio;
      }
      break;

    default:
      break;
  }

  return (vtiValue * vteRatio).toFixed(1);
};

// تابع برای دریافت نام بیماری به فارسی
export const getDiseaseName = (
  lungInvolvement,
  normalLungCondition,
  obstructiveDisease,
  restrictiveDisease,
) => {
  if (lungInvolvement === "normal") {
    return normalLungCondition === "reduced_consciousness"
      ? "کاهش سطح هوشیاری"
      : "تشنج";
  } else if (lungInvolvement === "obstructive") {
    const diseases = {
      bronchiolitis: "برونشیولیت",
      asthma: "آسم",
      copd: "بیماری انسدادی مزمن ریوی",
      foreign_body_aspiration: "آسپیراسیون جسم خارجی",
    };
    return diseases[obstructiveDisease] || obstructiveDisease;
  } else if (lungInvolvement === "restrictive") {
    const diseases = {
      pneumonia: "پنومونی",
      ards: "سندرم زجر تنفسی حاد (ARDS)",
      pulmonary_edema: "ادم ریوی",
      atelectasis: "آتلکتازی",
    };
    return diseases[restrictiveDisease] || restrictiveDisease;
  }
  return "بدون بیماری مشخص";
};

// تابع برای محاسبه تنظیمات اولیه بر اساس نوع بیماری
export const getInitialSettings = (
  weight,
  lungInvolvement,
  normalLungCondition,
  obstructiveDisease,
  restrictiveDisease,
) => {
  const base = initialSettingsConfig.baseSettings;

  const baseSettings = {
    ...base,
    tidalVolume: base.tidalVolume(weight),
  };

  let diseaseSettings = {};

  switch (lungInvolvement) {
    case "normal":
      if (
        normalLungCondition &&
        initialSettingsConfig.normalLung[normalLungCondition]
      ) {
        diseaseSettings = initialSettingsConfig.normalLung[normalLungCondition];
      }
      break;

    case "obstructive":
      if (
        obstructiveDisease &&
        initialSettingsConfig.obstructiveDiseases[obstructiveDisease]
      ) {
        diseaseSettings =
          initialSettingsConfig.obstructiveDiseases[obstructiveDisease];
      }
      break;

    case "restrictive":
      if (
        restrictiveDisease &&
        initialSettingsConfig.restrictiveDiseases[restrictiveDisease]
      ) {
        diseaseSettings =
          initialSettingsConfig.restrictiveDiseases[restrictiveDisease];
      }
      break;

    default:
      break;
  }

  const finalSettings = {
    ...baseSettings,
    ...diseaseSettings,
    tidalVolume: diseaseSettings.tidalVolume
      ? diseaseSettings.tidalVolume(weight)
      : baseSettings.tidalVolume,
  };

  finalSettings.vte = calculateVTe(
    finalSettings.tidalVolume,
    lungInvolvement,
    normalLungCondition,
    obstructiveDisease,
    restrictiveDisease,
  );

  return finalSettings;
};
