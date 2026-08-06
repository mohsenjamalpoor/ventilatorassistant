"use client";

import { useSearchParams } from "next/navigation";
import BackButton from "../module/BackButton";
import { PiBellLight } from "react-icons/pi";
import { useState } from "react";

function PediatricVentilator() {
  const [advanced, setAdvanced] = useState(false);
  const searchParams = useSearchParams();

  const weight = searchParams.get("weight");
  const age = searchParams.get("age");
  const lungInvolvement = searchParams.get("lungInvolvement");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-8 px-4">
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
                onClick={() => setAdvanced()}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                تنظیمات پیشرفته
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                بازنشانی تنظیمات
              </button>
              <BackButton />
            </div>
          </div>

          {/* اطلاعات بیمار */}
          <div className="mt-2 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-blue-600 text-sm">وزن بیمار</p>
              <p className="text-xl font-bold text-blue-800">{weight} kg</p>
            </div>
            <div className="bg-cyan-50 rounded-lg p-4 text-center">
              <p className="text-cyan-600 text-sm">سن بیمار</p>
              <p className="text-xl font-bold text-cyan-800">{age}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-green-600 text-sm">گروه سنی</p>
              <p className="text-xl font-bold text-green-800">کودکان</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <p className="text-orange-600 text-sm">نوع درگیری</p>
              <p className="text-xl font-bold text-orange-800">
                {lungInvolvement === "normal"
                  ? "ریه نرمال"
                  : lungInvolvement === "obstructive"
                    ? "Obstructive"
                    : "Restrictive"}
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                انتخاب مد ونتیلاتور
              </h2>

              <button
                // onClick={openModeModal}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 mb-3"
              >
                انتخاب مد ونتیلاتور
              </button>
            </div>
          </div>
          {/* مانیتور ونتیلاتور و تفسیر ABG */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-6">
              {/* مانیتور ونتیلاتور */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-2xl shadow-lg p-6 border border-blue-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-blue-800">
                    مانیتور ونتیلاتور -
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      // onClick={openAlarmModal}
                      className="text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-lg hover:bg-blue-100"
                    >
                      <PiBellLight className="w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-lg p-1 text-white" />
                    </button>
                    <button
                      // onClick={openSettingsModal}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2 shadow-md"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* بخش مانیتور */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-4 border border-blue-100 shadow-inner">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {/* PIP */}
                    <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-lg p-3 border border-indigo-300 shadow-sm">
                      <div className="text-center">
                        <h3 className="text-indigo-700 text-xs mb-1 font-semibold">
                          PIP
                        </h3>
                        <p className="text-xl font-bold text-indigo-900"></p>
                        <p className="text-indigo-600 text-xs">cmH₂O</p>
                      </div>
                    </div>

                    {/* RR */}
                    <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg p-3 border-2 border-green-400 shadow-sm">
                      <div className="text-center">
                        <h3 className="text-green-700 text-xs mb-1 font-semibold">
                          RR
                        </h3>
                        <p className="text-xl font-bold text-green-900 mb-1"></p>
                        <p className="text-green-600 text-xs">/min</p>
                      </div>
                    </div>

                    {/* FiO2 */}
                    <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg p-3 border border-purple-300 shadow-sm">
                      <div className="text-center">
                        <h3 className="text-purple-700 text-xs mb-1 font-semibold">
                          FiO₂
                        </h3>
                        <p className="text-xl font-bold text-purple-900"></p>
                        <p className="text-purple-600 text-xs">%</p>
                      </div>
                    </div>

                    {/* PEEP */}
                    <div className="bg-gradient-to-br from-red-100 to-red-200 rounded-lg p-3 border border-red-300 shadow-sm">
                      <div className="text-center">
                        <h3 className="text-red-700 text-xs mb-1 font-semibold">
                          PEEP
                        </h3>
                        <p className="text-xl font-bold text-red-900"></p>
                        <p className="text-red-600 text-xs">cmH₂O</p>
                      </div>
                    </div>

                    {/* MVent */}
                    <div className="bg-gradient-to-br from-teal-100 to-teal-200 rounded-lg p-3 border border-teal-300 shadow-sm">
                      <div className="text-center">
                        <h3 className="text-teal-700 text-xs mb-1 font-semibold">
                          MVent
                        </h3>
                        <p className="text-xl font-bold text-teal-900"></p>
                        <p className="text-teal-600 text-xs">L/min</p>
                      </div>
                    </div>

                    {/* VTi */}
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-3 border border-blue-300 shadow-sm">
                      <div className="text-center">
                        <h3 className="text-blue-700 text-xs mb-1 font-semibold">
                          VTi
                        </h3>
                        <p className="text-xl font-bold text-blue-900"></p>
                        <p className="text-blue-600 text-xs">ml</p>
                      </div>
                    </div>

                    {/* VTe */}
                    <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg p-3 border border-green-300 shadow-sm">
                      <div className="text-center">
                        <h3 className="text-green-700 text-xs mb-1 font-semibold">
                          VTe
                        </h3>
                        <p className="text-xl font-bold text-green-900"></p>
                        <p className="text-green-600 text-xs">ml</p>
                      </div>
                    </div>
                  </div>
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
