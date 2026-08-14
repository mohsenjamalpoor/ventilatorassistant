// تخمین وزن بر اساس سن برای کودکان (فرمول Best Guess / Tinning)
// و هشدار عدم تطابق سن-وزن.
// این فرمول از رگرسیون داده‌های وزن هزاران کودک در سه گروه سنی به‌دست آمده
// و نسبت به فرمول کلاسیک APLS دقت بالاتری در تخمین وزن کودکان امروزی دارد.
// معتبرترین بازه: ۰ تا ۱۴ سال؛ بالای آن فقط برای غربالگری منطقی (نه محاسبات دارویی) استفاده می‌شود.

export const estimateExpectedWeight = (ageYears) => {
  const age = Number(ageYears);
  if (!age || age < 0) return null;

  if (age < 1) {
    const months = age * 12;
    return (months + 9) / 2;
  }
  if (age <= 5) {
    return 2 * (age + 5);
  }
  if (age <= 18) {
    // دقت فرمول بالای ۱۴ سال کمتر تایید شده؛ فقط برای غربالگری خطای فاحش
    return 4 * age;
  }
  return null;
};

// بررسی همخوانی وزن با سن؛ محدوده مجاز: ۶۰٪ تا ۱۴۰٪ وزن تخمینی
export const checkWeightAgeMismatch = (weight, ageYears) => {
  const w = Number(weight);
  const a = Number(ageYears);
  if (!w || w <= 0 || !a || a <= 0) return null;

  const expected = estimateExpectedWeight(a);
  if (expected == null) return null;

  const lowerBound = expected * 0.6;
  const upperBound = expected * 1.4;

  return {
    expected: Math.round(expected * 10) / 10,
    lowerBound: Math.round(lowerBound * 10) / 10,
    upperBound: Math.round(upperBound * 10) / 10,
    mismatched: w < lowerBound || w > upperBound,
  };
};
