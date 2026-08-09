"use client";

import { useSearchParams } from "next/navigation";
import BackButton from "../module/BackButton";
import { PiBellLight } from "react-icons/pi";
import { useState } from "react";
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
} from "../../utils/Initialsettingsconfig ";
import RespiratoryAcidosisModal from "../module/RespiratoryAcidosisModal";

function PediatricVentilator() {
  const [isOpen, setIsOpen] = useState(false);
  const [isO2ModalOpen, setIsO2ModalOpen] = useState(false);
  const [isHighPIPModalOpen, setIsHighPIPModalOpen] = useState(false);
  const [isModeModalOpen, setIsModeModalOpen] = useState(false);
  const [isRespiratoryAcidosis, setIsRespiratoryAcidosis] = useState(false);

  const [advance, setAdvance] = useState(false);
  const searchParams = useSearchParams();

  const weight = searchParams.get("weight" || 0);
  const age = searchParams.get("age");
  const lungInvolvement = searchParams.get("lungInvolvement");
  const normalLungCondition = searchParams.get("normalLungCondition");
  const obstructiveDisease = searchParams.get("obstructiveDisease");
  const restrictiveDisease = searchParams.get("restrictiveDisease");

  // تنظیمات فعلی ونتیلاتور — منبع واحد برای مانیتور، آلارم و مودال مد
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
      ), // ← تبدیل به عدد
    };
  });

  const handleModeSelect = (newSettings) => {
    setCurrentSettings({
      ...newSettings,
      mvent: Number(
        calculateMvent(newSettings.tidalVolume, newSettings.respiratoryRate),
      ), // ← اینجا هم
    });
  };

  // Helper function to format display values
  const formatValue = (value, defaultValue = "--") => {
    return value !== undefined && value !== null ? value : defaultValue;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-cyan-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* هدر */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-blue-800 mb-2">
                تنظیمات اولیه ونتیلاتور
              </h1>
              <p className="text-blue-600">بیماری: </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setAdvance((prv) => !prv)}
                className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                تنظیمات پیشرفته
              </button>

              <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                بازنشانی تنظیمات
              </button>
              <BackButton />
            </div>
          </div>

          {/* اطلاعات بیمار */}
          <div className="mt-2 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-blue-600 text-sm">وزن بیمار</p>
              <p className="text-xl font-bold text-blue-800">
                {weight || "--"} kg
              </p>
            </div>
            <div className="bg-cyan-50 rounded-lg p-4 text-center">
              <p className="text-cyan-600 text-sm">سن بیمار</p>
              <p className="text-xl font-bold text-cyan-800">{age || "--"}</p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <p className="text-orange-600 text-sm">نوع درگیری</p>
              <p className="text-xl font-bold text-orange-800">
                {lungInvolvement === "normal"
                  ? "ریه نرمال"
                  : lungInvolvement === "obstructive"
                    ? "Obstructive"
                    : lungInvolvement === "restrictive"
                      ? "Restrictive"
                      : "--"}
              </p>
            </div>
          </div>
        </div>

        {/* تنظیمات پیشرفته */}
        {advance && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => setIsO2ModalOpen(true)}
                className="group relative flex flex-col items-start gap-2 p-4 rounded-xl border border-gray-200 bg-white hover:border-red-300 hover:shadow-md transition-all cursor-pointer text-right"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors">
                  <LuTrendingDown className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="font-bold text-gray-800 group-hover:text-red-700 transition-colors">
                    علت افت O₂
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    علل و اقدام درمانی
                  </p>
                </div>
              </button>

              <button
                onClick={() => setIsHighPIPModalOpen(true)}
                className="group relative flex flex-col items-start gap-2 p-4 rounded-xl border border-gray-200 bg-white hover:border-orange-300 hover:shadow-md transition-all cursor-pointer text-right"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-50 group-hover:bg-orange-100 transition-colors">
                  <LuTrendingUp className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="font-bold text-gray-800 group-hover:text-orange-700 transition-colors">
                    علت افزایش PIP
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    علل و اقدام درمانی
                  </p>
                </div>
              </button>
              <button
                onClick={() => setIsRespiratoryAcidosis(true)}
                className="group relative flex flex-col items-start gap-2 p-4 rounded-xl border border-gray-200 bg-white hover:border-red-300 hover:shadow-md transition-all cursor-pointer text-right"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors">
                  <LuTrendingDown className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="font-bold text-gray-800 group-hover:text-red-700 transition-colors">
                    علت اسیدوز تنفسی
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    علل و اقدام درمانی
                  </p>
                </div>
              </button>
            </div>

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
          </div>
        )}

        {/* مانیتور ونتیلاتور */}
        <div className="bg-linear-to-br from-blue-50 to-cyan-100 rounded-2xl shadow-lg p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-blue-800">
              مانیتور ونتیلاتور
            </h2>
            <div className="flex items-center gap-2">
              {/* انتخاب مد */}
              <button
                onClick={() => setIsModeModalOpen(true)}
                className="text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-lg hover:bg-blue-100"
              >
                <LuActivity className="w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-lg p-1.5 text-white" />
              </button>
              <ModalContainer
                setIsOpen={setIsModeModalOpen}
                isOpen={isModeModalOpen}
              >
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

              {/* آلارم */}
              <button
                onClick={() => setIsOpen(true)}
                className="text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-lg hover:bg-blue-100"
              >
                <PiBellLight className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-lg p-1 text-white" />
              </button>
              <ModalContainer setIsOpen={setIsOpen} isOpen={isOpen}>
                <AlarmModal
                  currentSettings={currentSettings}
                  onClose={() => setIsOpen(false)}
                />
              </ModalContainer>

              {/* setting مود فعال */}
              <button className="bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2 shadow-md">
                <FaEdit />
              </button>
            </div>
          </div>

          {/* بخش مانیتور */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-4 border border-blue-100 shadow-inner">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {/* PIP */}
              <div className="bg-linear-to-br from-indigo-100 to-indigo-200 rounded-lg p-3 border border-indigo-300 shadow-sm">
                <div className="text-center">
                  <h3 className="text-indigo-700 text-xs mb-1 font-semibold">
                    PIP
                  </h3>
                  <p className="text-xl font-bold text-indigo-900">
                    {formatValue(currentSettings.pip)}
                  </p>
                  <p className="text-indigo-600 text-xs">cmH₂O</p>
                </div>
              </div>

              {/* RR */}
              <div className="bg-linear-to-br from-green-100 to-green-200 rounded-lg p-3 border-2 border-green-400 shadow-sm">
                <div className="text-center">
                  <h3 className="text-green-700 text-xs mb-1 font-semibold">
                    RR
                  </h3>
                  <p className="text-xl font-bold text-green-900 mb-1">
                    {formatValue(currentSettings.respiratoryRate)}
                  </p>
                  <p className="text-green-600 text-xs">/min</p>
                </div>
              </div>

              {/* FiO2 */}
              <div className="bg-linear-to-br from-purple-100 to-purple-200 rounded-lg p-3 border border-purple-300 shadow-sm">
                <div className="text-center">
                  <h3 className="text-purple-700 text-xs mb-1 font-semibold">
                    FiO₂
                  </h3>
                  <p className="text-xl font-bold text-purple-900">
                    {formatValue(currentSettings.fio2)}
                  </p>
                  <p className="text-purple-600 text-xs">%</p>
                </div>
              </div>

              {/* PEEP */}
              <div className="bg-linear-to-br from-red-100 to-red-200 rounded-lg p-3 border border-red-300 shadow-sm">
                <div className="text-center">
                  <h3 className="text-red-700 text-xs mb-1 font-semibold">
                    PEEP
                  </h3>
                  <p className="text-xl font-bold text-red-900">
                    {formatValue(currentSettings.peep)}
                  </p>
                  <p className="text-red-600 text-xs">cmH₂O</p>
                </div>
              </div>

              {/* MVent */}
              <div className="bg-linear-to-br from-teal-100 to-teal-200 rounded-lg p-3 border border-teal-300 shadow-sm">
                <div className="text-center">
                  <h3 className="text-teal-700 text-xs mb-1 font-semibold">
                    MVent
                  </h3>
                  <p className="text-xl font-bold text-teal-900">
                    {formatValue(currentSettings.mvent?.toFixed(1))}
                  </p>
                  <p className="text-teal-600 text-xs">L/min</p>
                </div>
              </div>

              {/* VTi */}
              <div className="bg-linear-to-br from-blue-100 to-blue-200 rounded-lg p-3 border border-blue-300 shadow-sm">
                <div className="text-center">
                  <h3 className="text-blue-700 text-xs mb-1 font-semibold">
                    VTi
                  </h3>
                  <p className="text-xl font-bold text-blue-900">
                    {formatValue(currentSettings.tidalVolume)}
                  </p>
                  <p className="text-blue-600 text-xs">ml</p>
                </div>
              </div>

              {/* VTe */}
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg p-3 border border-green-300 shadow-sm">
                <div className="text-center">
                  <h3 className="text-green-700 text-xs mb-1 font-semibold">
                    VTe
                  </h3>
                  <p className="text-xl font-bold text-green-900">
                    {formatValue(currentSettings.vte)}
                  </p>
                  <p className="text-green-600 text-xs">ml</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PediatricVentilator;
