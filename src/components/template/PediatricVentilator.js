"use client";

import { useSearchParams } from "next/navigation";
import BackButton from "../module/BackButton";
import { PiBellLight } from "react-icons/pi";
import { useState, useEffect } from "react";
import ModalContainer from "../partials/container/ModalContainer";
import { FaEdit } from "react-icons/fa";
import AlarmModal from "../module/AlarmModal";
import O2DropModal from "../module/O2DropModal";
import HighPIPModal from "../module/HighPIPModal";
import ModeSelectionModal from "../module/ModeSelectionModal";
import { LuTrendingDown, LuTrendingUp, LuActivity } from "react-icons/lu";
import {
  getInitialSettings,
  calculateMvent,
  getLungInvolvementName,
  getLungInvolvementDescription,
} from "../../utils/Initialsettingsconfig ";
import RespiratoryAcidosisModal from "../module/RespiratoryAcidosisModal";
import EditVentilatorModal from "../module/EditVentilatorModal";

function PediatricVentilator() {
  const [isOpen, setIsOpen] = useState(false);
  const [isO2ModalOpen, setIsO2ModalOpen] = useState(false);
  const [isHighPIPModalOpen, setIsHighPIPModalOpen] = useState(false);
  const [isModeModalOpen, setIsModeModalOpen] = useState(false);
  const [isRespiratoryAcidosis, setIsRespiratoryAcidosis] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [advance, setAdvance] = useState(false);

  const searchParams = useSearchParams();

  const weight = searchParams.get("weight");
  const age = searchParams.get("age");
  const lungInvolvement = searchParams.get("lungInvolvement");
  const normalLungCondition = searchParams.get("normalLungCondition");
  const obstructiveDisease = searchParams.get("obstructiveDisease");
  const restrictiveDisease = searchParams.get("restrictiveDisease");

  // تنظیمات فعلی ونتیلاتور
  const [currentSettings, setCurrentSettings] = useState(() => {
    const initial = getInitialSettings(
      weight,
      lungInvolvement,
      normalLungCondition,
      obstructiveDisease,
      restrictiveDisease,
    );
    return {
      ...initial,
      mvent: Number(
        calculateMvent(initial.tidalVolume, initial.respiratoryRate),
      ),
    };
  });

  // اثر برای به‌روزرسانی تنظیمات هنگام تغییر نوع درگیری
  useEffect(() => {
    const newSettings = getInitialSettings(
      weight,
      lungInvolvement,
      normalLungCondition,
      obstructiveDisease,
      restrictiveDisease,
    );

    setCurrentSettings({
      ...newSettings,
      mvent: Number(
        calculateMvent(newSettings.tidalVolume, newSettings.respiratoryRate),
      ),
    });
  }, [
    weight,
    lungInvolvement,
    normalLungCondition,
    obstructiveDisease,
    restrictiveDisease,
  ]);

  // هندلر انتخاب مود
  const handleModeSelect = (newSettings) => {
    setCurrentSettings({
      ...newSettings,
      mvent: Number(
        calculateMvent(newSettings.tidalVolume, newSettings.respiratoryRate),
      ),
    });
  };

  // هندلر ویرایش تنظیمات
  const handleEditSettings = (editedSettings) => {
    setCurrentSettings({
      ...editedSettings,
      mvent: Number(
        calculateMvent(
          editedSettings.tidalVolume,
          editedSettings.respiratoryRate,
        ),
      ),
    });
    setIsEditModalOpen(false);
  };

  const formatValue = (value, defaultValue = "--") => {
    return value !== undefined && value !== null ? value : defaultValue;
  };

  const involvementName = getLungInvolvementName(lungInvolvement);
  const involvementDescription = getLungInvolvementDescription(lungInvolvement);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* هدر */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6 border border-blue-100">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">
                تنظیمات اولیه ونتیلاتور
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <p className="text-blue-600 flex items-center gap-2">
                  <span className="font-semibold">نوع درگیری:</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      lungInvolvement === "normal"
                        ? "bg-green-100 text-green-700"
                        : lungInvolvement === "obstructive"
                          ? "bg-orange-100 text-orange-700"
                          : lungInvolvement === "restrictive"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {involvementName}
                  </span>
                </p>
                <span className="text-xs text-gray-400">|</span>
                <p className="text-xs text-gray-500">
                  {involvementDescription}
                </p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setAdvance((prv) => !prv)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all hover:shadow-md flex items-center gap-2"
              >
                <span className="text-sm">تنظیمات پیشرفته</span>
                <span
                  className={`transform transition-transform ${advance ? "rotate-180" : ""}`}
                >
                  ▼
                </span>
              </button>
              <button
                onClick={() => {
                  const initial = getInitialSettings(
                    weight,
                    lungInvolvement,
                    normalLungCondition,
                    obstructiveDisease,
                    restrictiveDisease,
                  );
                  setCurrentSettings({
                    ...initial,
                    mvent: Number(
                      calculateMvent(
                        initial.tidalVolume,
                        initial.respiratoryRate,
                      ),
                    ),
                  });
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all hover:shadow-md"
              >
                بازنشانی تنظیمات
              </button>
              <BackButton />
            </div>
          </div>

          {/* اطلاعات بیمار */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border border-blue-200">
              <p className="text-blue-600 text-sm font-medium">وزن بیمار</p>
              <p className="text-2xl font-bold text-blue-800">
                {weight || "--"} <span className="text-sm font-normal">kg</span>
              </p>
            </div>
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-4 text-center border border-cyan-200">
              <p className="text-cyan-600 text-sm font-medium">سن بیمار</p>
              <p className="text-2xl font-bold text-cyan-800">{age || "--"}</p>
            </div>
            <div
              className={`bg-gradient-to-br rounded-xl p-4 text-center border ${
                lungInvolvement === "normal"
                  ? "from-green-50 to-green-100 border-green-200"
                  : lungInvolvement === "obstructive"
                    ? "from-orange-50 to-orange-100 border-orange-200"
                    : lungInvolvement === "restrictive"
                      ? "from-red-50 to-red-100 border-red-200"
                      : "from-gray-50 to-gray-100 border-gray-200"
              }`}
            >
              <p
                className={`text-sm font-medium ${
                  lungInvolvement === "normal"
                    ? "text-green-600"
                    : lungInvolvement === "obstructive"
                      ? "text-orange-600"
                      : lungInvolvement === "restrictive"
                        ? "text-red-600"
                        : "text-gray-600"
                }`}
              >
                نوع درگیری
              </p>
              <p
                className={`text-2xl font-bold ${
                  lungInvolvement === "normal"
                    ? "text-green-800"
                    : lungInvolvement === "obstructive"
                      ? "text-orange-800"
                      : lungInvolvement === "restrictive"
                        ? "text-red-800"
                        : "text-gray-800"
                }`}
              >
                {involvementName}
              </p>
            </div>
          </div>
        </div>

        {/* تنظیمات پیشرفته - بخش اقدامات درمانی */}
        {advance && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              اقدامات درمانی
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <button
                onClick={() => setIsO2ModalOpen(true)}
                className="group relative flex flex-col items-start gap-3 p-5 rounded-xl border-2 border-gray-200 bg-white hover:border-red-300 hover:shadow-lg transition-all cursor-pointer text-right hover:bg-red-50"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-50 group-hover:bg-red-100 transition-colors shrink-0">
                    <LuTrendingDown className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 group-hover:text-red-700 transition-colors">
                      علت افت O₂
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      علل و اقدام درمانی
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setIsHighPIPModalOpen(true)}
                className="group relative flex flex-col items-start gap-3 p-5 rounded-xl border-2 border-gray-200 bg-white hover:border-orange-300 hover:shadow-lg transition-all cursor-pointer text-right hover:bg-orange-50"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-orange-50 group-hover:bg-orange-100 transition-colors shrink-0">
                    <LuTrendingUp className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 group-hover:text-orange-700 transition-colors">
                      علت افزایش PIP
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      علل و اقدام درمانی
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setIsRespiratoryAcidosis(true)}
                className="group relative flex flex-col items-start gap-3 p-5 rounded-xl border-2 border-gray-200 bg-white hover:border-red-300 hover:shadow-lg transition-all cursor-pointer text-right hover:bg-red-50"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-50 group-hover:bg-red-100 transition-colors shrink-0">
                    <LuTrendingDown className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 group-hover:text-red-700 transition-colors">
                      علت اسیدوز تنفسی
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      علل و اقدام درمانی
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* مودال‌ها */}
        <ModalContainer setIsOpen={setIsO2ModalOpen} isOpen={isO2ModalOpen}>
          <O2DropModal onClose={() => setIsO2ModalOpen(false)} />
        </ModalContainer>

        <ModalContainer
          setIsOpen={setIsHighPIPModalOpen}
          isOpen={isHighPIPModalOpen}
        >
          <HighPIPModal onClose={() => setIsHighPIPModalOpen(false)} />
        </ModalContainer>

        <ModalContainer
          setIsOpen={setIsRespiratoryAcidosis}
          isOpen={isRespiratoryAcidosis}
        >
          <RespiratoryAcidosisModal
            onClose={() => setIsRespiratoryAcidosis(false)}
          />
        </ModalContainer>

        <ModalContainer setIsOpen={setIsModeModalOpen} isOpen={isModeModalOpen}>
          <ModeSelectionModal
            weight={weight}
            lungInvolvement={lungInvolvement}
            normalLungCondition={normalLungCondition}
            obstructiveDisease={obstructiveDisease}
            restrictiveDisease={restrictiveDisease}
            initialSettings={currentSettings}
            onSelect={handleModeSelect}
            onClose={() => setIsModeModalOpen(false)}
          />
        </ModalContainer>

        <ModalContainer setIsOpen={setIsEditModalOpen} isOpen={isEditModalOpen}>
          <EditVentilatorModal
            initialSettings={currentSettings}
            onSave={handleEditSettings}
            onClose={() => setIsEditModalOpen(false)}
          />
        </ModalContainer>

        {/* مانیتور ونتیلاتور */}
        <div className="bg-gradient-to-br from-blue-50/95 to-cyan-50/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                مانیتور ونتیلاتور
              </h2>
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-3 text-center border border-blue-200">
                <p className="text-sm font-bold text-blue-800">
                  {currentSettings.mode || "SIMV"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* انتخاب مد */}
              <button
                onClick={() => setIsModeModalOpen(true)}
                className="group relative p-2 rounded-xl bg-blue-500 hover:bg-blue-600 transition-all shadow-md hover:shadow-lg"
                title="انتخاب مود ونتیلاتور"
              >
                <LuActivity className="w-6 h-6 text-white" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
              </button>

              {/* ویرایش تنظیمات */}
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="group p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg"
                title="ویرایش تنظیمات ونتیلاتور"
              >
                <FaEdit className="w-6 h-6 text-white" />
              </button>

              {/* آلارم */}
              <button
                onClick={() => setIsOpen(true)}
                className="group relative p-2 rounded-xl bg-red-500 hover:bg-red-600 transition-all shadow-md hover:shadow-lg"
                title="تنظیمات آلارم"
              >
                <PiBellLight className="w-6 h-6 text-white" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white animate-pulse"></span>
              </button>

              <ModalContainer setIsOpen={setIsOpen} isOpen={isOpen}>
                <AlarmModal
                  currentSettings={currentSettings}
                  onClose={() => setIsOpen(false)}
                />
              </ModalContainer>
            </div>
          </div>

          {/* بخش مانیتور */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-blue-100 shadow-inner">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
              {/* PIP */}
              <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl p-4 border-2 border-indigo-300 shadow-sm hover:shadow-md transition-all">
                <div className="text-center">
                  <h3 className="text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
                    PIP
                  </h3>
                  <p className="text-2xl font-bold text-indigo-900">
                    {formatValue(currentSettings.pip)}
                  </p>
                  <p className="text-indigo-600 text-xs mt-1">cmH₂O</p>
                </div>
              </div>

              {/* RR */}
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-4 border-2 border-green-400 shadow-sm hover:shadow-md transition-all">
                <div className="text-center">
                  <h3 className="text-green-700 text-xs font-bold uppercase tracking-wider mb-2">
                    RR
                  </h3>
                  <p className="text-2xl font-bold text-green-900">
                    {formatValue(currentSettings.respiratoryRate)}
                  </p>
                  <p className="text-green-600 text-xs mt-1">/min</p>
                </div>
              </div>

              {/* FiO2 */}
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-4 border-2 border-purple-300 shadow-sm hover:shadow-md transition-all">
                <div className="text-center">
                  <h3 className="text-purple-700 text-xs font-bold uppercase tracking-wider mb-2">
                    FiO₂
                  </h3>
                  <p className="text-2xl font-bold text-purple-900">
                    {formatValue(currentSettings.fio2)}
                  </p>
                  <p className="text-purple-600 text-xs mt-1">%</p>
                </div>
              </div>

              {/* PEEP */}
              <div className="bg-gradient-to-br from-red-100 to-red-200 rounded-xl p-4 border-2 border-red-300 shadow-sm hover:shadow-md transition-all">
                <div className="text-center">
                  <h3 className="text-red-700 text-xs font-bold uppercase tracking-wider mb-2">
                    PEEP
                  </h3>
                  <p className="text-2xl font-bold text-red-900">
                    {formatValue(currentSettings.peep)}
                  </p>
                  <p className="text-red-600 text-xs mt-1">cmH₂O</p>
                </div>
              </div>

              {/* MVent */}
              <div className="bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl p-4 border-2 border-teal-300 shadow-sm hover:shadow-md transition-all">
                <div className="text-center">
                  <h3 className="text-teal-700 text-xs font-bold uppercase tracking-wider mb-2">
                    MVent
                  </h3>
                  <p className="text-2xl font-bold text-teal-900">
                    {formatValue(currentSettings.mvent?.toFixed(1))}
                  </p>
                  <p className="text-teal-600 text-xs mt-1">L/min</p>
                </div>
              </div>

              {/* VTi */}
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-4 border-2 border-blue-300 shadow-sm hover:shadow-md transition-all">
                <div className="text-center">
                  <h3 className="text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
                    VTi
                  </h3>
                  <p className="text-2xl font-bold text-blue-900">
                    {formatValue(currentSettings.tidalVolume)}
                  </p>
                  <p className="text-blue-600 text-xs mt-1">ml</p>
                </div>
              </div>

              {/* VTe */}
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-4 border-2 border-green-300 shadow-sm hover:shadow-md transition-all">
                <div className="text-center">
                  <h3 className="text-green-700 text-xs font-bold uppercase tracking-wider mb-2">
                    VTe
                  </h3>
                  <p className="text-2xl font-bold text-green-900">
                    {formatValue(currentSettings.vte)}
                  </p>
                  <p className="text-green-600 text-xs mt-1">ml</p>
                </div>
              </div>
            </div>

            {/* نمایش جزئیات اضافی */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3 text-center border border-indigo-200">
                <p className="text-xs text-indigo-600 font-medium">نسبت I:E</p>
                <p className="text-sm font-bold text-indigo-800">
                  {currentSettings.ieRatio || "1:2"}
                </p>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-3 text-center border border-orange-200">
                <p className="text-xs text-orange-600 font-medium">
                  فشار حمایتی
                </p>
                <p className="text-sm font-bold text-orange-800">
                  {currentSettings.pressureSupport || "--"} cmH₂O
                </p>
              </div>
              <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-3 text-center border border-teal-200">
                <p className="text-xs text-teal-600 font-medium">زمان دم</p>
                <p className="text-sm font-bold text-teal-800">
                  {currentSettings.ti || "--"} sec
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PediatricVentilator;
