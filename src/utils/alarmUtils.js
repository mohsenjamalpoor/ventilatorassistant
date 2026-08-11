// Main calculation function
export const calculateAlarmRanges = (currentSettings) => {
  const currentRR = parseFloat(currentSettings.respiratoryRate) || 0;
  const currentMvent = parseFloat(currentSettings.mvent) || 0;
  const currentPeep = parseFloat(currentSettings.peep) || 0;
  const currentFio2 = parseFloat(currentSettings.fio2) || 21;
  const currentVt = parseFloat(currentSettings.vt) || 0;

  return {
    rr: {
      low: Math.max(8, Math.round((currentRR / 2) * 10) / 10).toFixed(1),
      high: Math.round(currentRR * 2 * 10) / 10,
      current: currentRR,
      unit: "/min",
    },
    mvent: {
      low: Math.round((currentMvent / 2) * 100) / 100,
      high: Math.round(currentMvent * 2 * 100) / 100,
      current: currentMvent,
      unit: "L/min",
    },
    peep: {
      low: Math.max(3, currentPeep - 2).toFixed(1),
      high: (currentPeep + 2).toFixed(1),
      current: currentPeep,
      unit: "cmH₂O",
    },
    fio2: {
      low: Math.max(21, currentFio2 - 10).toFixed(0),
      high: Math.min(100, currentFio2 + 10).toFixed(0),
      current: currentFio2,
      unit: "%",
    },
    vt: {
      low: Math.max(100, Math.round((currentVt / 2) * 10) / 10).toFixed(1),
      high: Math.round(currentVt * 2 * 10) / 10,
      current: currentVt,
      unit: "ml",
    },
  };
};

// Check if any parameter is in alarm state
export const checkAlarms = (alarmRanges) => {
  const alerts = [];
  const status = {};

  Object.keys(alarmRanges).forEach((key) => {
    const param = alarmRanges[key];
    const low = parseFloat(param.low);
    const high = parseFloat(param.high);
    const current = parseFloat(param.current);

    let severity = "normal";
    let message = "";

    if (current < low) {
      severity = "low";
      message = `${getParameterName(key)} پایین است (${current} ${param.unit})`;
      alerts.push({
        parameter: key,
        type: "low",
        value: current,
        threshold: low,
        unit: param.unit,
        message,
      });
    } else if (current > high) {
      severity = "high";
      message = `${getParameterName(key)} بالا است (${current} ${param.unit})`;
      alerts.push({
        parameter: key,
        type: "high",
        value: current,
        threshold: high,
        unit: param.unit,
        message,
      });
    }

    status[key] = {
      ...param,
      severity,
      isAlert: severity !== "normal",
      message,
    };
  });

  return {
    status,
    alerts,
    hasAlert: alerts.length > 0,
    alertCount: alerts.length,
    criticalAlerts: alerts.filter((a) => a.type === "high").length,
  };
};

// Get Persian name for parameters
export const getParameterName = (key) => {
  const names = {
    rr: "نرخ تنفس",
    mvent: "تهویه دقیقه‌ای",
    peep: "PEEP",
    fio2: "FiO₂",
    vt: "حجم جاری",
  };
  return names[key] || key;
};

// Get severity color
export const getSeverityColor = (severity) => {
  const colors = {
    normal: "text-green-600",
    low: "text-red-600",
    high: "text-yellow-600",
  };
  return colors[severity] || "text-gray-600";
};

// Get severity background color
export const getSeverityBgColor = (severity) => {
  const colors = {
    normal: "bg-green-100",
    low: "bg-red-100",
    high: "bg-yellow-100",
  };
  return colors[severity] || "bg-gray-100";
};

// Get border color for parameter card
export const getParameterBorderColor = (severity) => {
  const colors = {
    normal: "border-green-400",
    low: "border-red-400",
    high: "border-yellow-400",
  };
  return colors[severity] || "border-gray-300";
};

// Generate alarm summary for display
export const getAlarmSummary = (alarmStatus) => {
  const { alerts, alertCount, criticalAlerts } = alarmStatus;

  if (alertCount === 0) {
    return {
      level: "normal",
      icon: "✅",
      message: "همه پارامترها در محدوده نرمال هستند",
      bgColor: "bg-green-100",
      textColor: "text-green-800",
    };
  }

  if (criticalAlerts > 0) {
    return {
      level: "critical",
      icon: "🚨",
      message: `${criticalAlerts} آلارم بحرانی!`,
      bgColor: "bg-red-100",
      textColor: "text-red-800",
    };
  }

  return {
    level: "warning",
    icon: "⚠️",
    message: `${alertCount} آلارم فعال است`,
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800",
  };
};

// Validate settings before calculating
export const validateSettings = (settings) => {
  const errors = [];

  if (
    !settings.respiratoryRate ||
    settings.respiratoryRate < 5 ||
    settings.respiratoryRate > 60
  ) {
    errors.push("نرخ تنفس باید بین 5 تا 60 باشد");
  }

  if (!settings.mvent || settings.mvent < 0.5 || settings.mvent > 15) {
    errors.push("تهویه دقیقه‌ای باید بین 0.5 تا 15 باشد");
  }

  if (!settings.peep || settings.peep < 0 || settings.peep > 20) {
    errors.push("PEEP باید بین 0 تا 20 باشد");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Update alarm ranges with new settings
export const updateAlarmRanges = (currentSettings, previousAlarms = null) => {
  const newRanges = calculateAlarmRanges(currentSettings);
  const alarmStatus = checkAlarms(newRanges);

  // Detect changes if previous alarms provided
  if (previousAlarms) {
    const changes = detectAlarmChanges(previousAlarms, alarmStatus);
    return {
      ...newRanges,
      status: alarmStatus,
      changes,
    };
  }

  return {
    ...newRanges,
    status: alarmStatus,
  };
};

// Detect changes between alarm states
export const detectAlarmChanges = (oldAlarm, newAlarm) => {
  const changes = [];

  Object.keys(newAlarm.status).forEach((key) => {
    const old = oldAlarm.status[key];
    const current = newAlarm.status[key];

    if (old && current) {
      if (old.severity !== current.severity) {
        changes.push({
          parameter: key,
          from: old.severity,
          to: current.severity,
          message: `${getParameterName(key)}: ${old.severity} → ${current.severity}`,
        });
      }
    }
  });

  return changes;
};

// Generate report for alarm events
export const generateAlarmReport = (alarmHistory) => {
  const report = {
    totalAlarms: alarmHistory.length,
    criticalAlarms: alarmHistory.filter((a) => a.severity === "high").length,
    lowAlarms: alarmHistory.filter((a) => a.severity === "low").length,
    averageDuration: 0,
    mostCommonAlarm: "",
    timeline: [],
  };

  if (alarmHistory.length === 0) return report;

  // Calculate average duration
  const totalDuration = alarmHistory.reduce((sum, alarm) => {
    return sum + (alarm.duration || 0);
  }, 0);
  report.averageDuration = totalDuration / alarmHistory.length;

  // Find most common alarm
  const alarmCounts = {};
  alarmHistory.forEach((alarm) => {
    const key = `${alarm.parameter}-${alarm.type}`;
    alarmCounts[key] = (alarmCounts[key] || 0) + 1;
  });

  let maxCount = 0;
  let mostCommon = "";
  Object.keys(alarmCounts).forEach((key) => {
    if (alarmCounts[key] > maxCount) {
      maxCount = alarmCounts[key];
      mostCommon = key;
    }
  });

  const [param, type] = mostCommon.split("-");
  report.mostCommonAlarm = `${getParameterName(param)} - ${type === "high" ? "بالا" : "پایین"}`;

  return report;
};
