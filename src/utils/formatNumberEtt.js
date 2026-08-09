// گرد کردن به سمت پایین با گام ۰.۵  )
export const roundToHalf = (n) => Math.floor(n * 2) / 2;

// نمایش عدد: اگر صحیح بود بدون اعشار، وگرنه با یک رقم اعشار (مثلا 4 یا 4.5)
export const formatNumber = (n) => {
  if (n === null || n === undefined || Number.isNaN(n)) return "-";
  return Number.isInteger(n) ? n.toString() : n.toFixed(1);
};

// محاسبه‌ی کامل سایز و عمق لوله تراشه بر اساس سن (سال)
// خروجی: { uncuffedSize, cuffedSize, uncuffedDepth, cuffedDepth }
export const calculateEttSizes = (ageInYears) => {
  const raw = ageInYears / 4 + 4;

  const uncuffedSize = Math.min(roundToHalf(raw), 7.5);
  const cuffedSize = Math.min(roundToHalf(raw - 0.5), 7);

  const uncuffedDepth = roundToHalf(uncuffedSize * 3);
  const cuffedDepth = roundToHalf(cuffedSize * 3);

  return { uncuffedSize, cuffedSize, uncuffedDepth, cuffedDepth };
};
