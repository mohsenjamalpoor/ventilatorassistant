"use client";

import { useState } from "react";
import { LuBookOpen, LuX, LuChevronRight } from "react-icons/lu";

const topics = [
  {
    id: "tidal-volume",
    title: "Tidal Volume (Vt)",
    content: (
      <>
        <p>
          Goal tidal volumes (Vt) for patients with healthy lungs are{" "}
          <strong>5–8 mL/kg</strong> ideal body weight (IBW).
        </p>

        <p className="mt-4">
          For patients with PARDS, the goal tidal volume is{" "}
          <strong>3–6 mL/kg IBW</strong>.
        </p>
      </>
    ),
  },

  {
    id: "goal-ph",
    title: "Goal pH",
    content: (
      <>
        <p>
          Goal pH for patients with healthy lungs is <strong>7.35–7.45</strong>.
        </p>

        <p className="mt-4">
          For moderate-severe PARDS, the goal pH is <strong>7.15–7.30</strong>.
        </p>

        <p className="mt-4">
          For mild PARDS, the goal pH is <strong>7.25–7.35</strong>.
        </p>
      </>
    ),
  },

  {
    id: "goal-paco2",
    title: "Goal PaCO₂",
    content: (
      <>
        <p>
          Goal PaCO₂ for patients with healthy lungs is{" "}
          <strong>35–45 mmHg</strong> (4.7–6 kPa).
        </p>

        <p className="mt-4">
          In patients with PARDS, PaCO₂ may be allowed to rise (permissive
          hypercapnia), while maintaining pH in the goal range for the disease
          state.
        </p>
      </>
    ),
  },

  {
    id: "goal-pao2",
    title: "Goal PaO₂",
    content: (
      <>
        <p>PaO₂ is used to assess the adequacy of oxygenation.</p>

        <p className="mt-4">
          Oxygenation should be evaluated together with SpO₂, clinical
          condition, and the overall ventilator settings.
        </p>
      </>
    ),
  },

  {
    id: "oxygen-concentration",
    title: "Oxygen Concentration",
    content: (
      <>
        <p>
          FiO₂ represents the fraction of inspired oxygen delivered to the
          patient.
        </p>

        <p className="mt-4">
          The ventilator can influence oxygenation by varying the amount of
          oxygen delivered to the patient.
        </p>
      </>
    ),
  },

  {
    id: "respiratory-rate",
    title: "Mandatory Breath Rate",
    content: (
      <>
        <p>
          The mandatory respiratory rate is the number of breaths per minute
          that the ventilator guarantees.
        </p>

        <p className="mt-4">
          The appropriate respiratory rate depends on patient age, disease
          state, ventilation requirements, and blood gas results.
        </p>
      </>
    ),
  },

  {
    id: "peep",
    title: "Positive End Expiratory Pressure (PEEP)",
    content: (
      <>
        <p>
          PEEP is the positive pressure maintained in the airway at the end of
          expiration.
        </p>

        <p className="mt-4">
          PEEP can help prevent alveolar collapse and can influence alveolar
          recruitment and oxygenation.
        </p>
      </>
    ),
  },

  {
    id: "pip",
    title: "Peak Inspiratory Pressure (PIP)",
    content: (
      <>
        <p>
          Peak Inspiratory Pressure (PIP) is the highest pressure reached in the
          airway during inspiration.
        </p>

        <p className="mt-4">
          Changes in PIP may be related to airway resistance, lung compliance,
          secretions, tube obstruction, or other patient and ventilator factors.
        </p>
      </>
    ),
  },

  {
    id: "inspiratory-time",
    title: "Inspiratory Time",
    content: (
      <>
        <p>
          Inspiratory time is the amount of time spent delivering the
          inspiratory phase of a breath.
        </p>

        <p className="mt-4">
          Inspiratory time influences the inspiratory-to-expiratory ratio and
          should be adjusted according to the patients clinical condition and
          ventilator mode.
        </p>
      </>
    ),
  },

  {
    id: "peak-flow",
    title: "Peak Inspiratory Flow",
    content: (
      <>
        <p>
          Peak inspiratory flow is the maximum flow delivered during
          inspiration.
        </p>

        <p className="mt-4">
          Flow settings can influence inspiratory time, airway pressures, and
          patient-ventilator interaction.
        </p>
      </>
    ),
  },

  {
    id: "trigger",
    title: "Trigger Sensitivity",
    content: (
      <>
        <p>
          Trigger sensitivity determines how easily the patient can initiate a
          ventilator-supported breath.
        </p>

        <p className="mt-4">
          The trigger should be sensitive enough to recognize patient effort
          without causing auto-triggering.
        </p>
      </>
    ),
  },
];

export default function VentilatorReferenceModal({ onClose }) {
  const [activeTopic, setActiveTopic] = useState(topics[0]);

  const activeIndex = topics.findIndex((topic) => topic.id === activeTopic.id);

  const previousTopic = topics[activeIndex - 1];
  const nextTopic = topics[activeIndex + 1];

  return (
    <div className="w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between bg-slate-800 px-5 py-4 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20">
            <LuBookOpen className="h-6 w-6 text-blue-300" />
          </div>

          <div>
            <h2 className="text-lg font-bold">Quick Reference</h2>

            <p className="text-xs text-slate-300">Ventilator Reference</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition hover:bg-red-500"
          aria-label="بستن"
        >
          <LuX className="h-6 w-6" />
        </button>
      </div>

      {/* Main */}
      <div className="flex h-[70vh] flex-col md:h-[600px] md:flex-row">
        {/* LEFT */}
        <aside className="w-full overflow-y-auto border-b border-slate-200 bg-slate-50 md:w-[35%] md:border-b-0 md:border-r">
          <div className="sticky top-0 border-b border-slate-200 bg-slate-50 p-4">
            <h3 className="text-lg font-bold text-slate-800">Topics</h3>
          </div>

          <div className="p-2">
            {topics.map((topic) => {
              const isActive = activeTopic.id === topic.id;

              return (
                <button
                  type="button"
                  key={topic.id}
                  onClick={() => setActiveTopic(topic)}
                  className={`mb-1 flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-left transition-all ${
                    isActive
                      ? "bg-blue-100 text-blue-700 shadow-sm"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span className="text-sm font-medium">{topic.title}</span>

                  {isActive && <LuChevronRight className="h-5 w-5 shrink-0" />}
                </button>
              );
            })}
          </div>
        </aside>

        {/* RIGHT */}
        <main className="flex-1 overflow-y-auto bg-white p-6 md:p-10">
          <div className="mx-auto max-w-3xl">
            {/* Title */}
            <div className="mb-6 flex items-center gap-3">
              <div className="h-10 w-2 rounded-full bg-blue-500" />

              <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">
                {activeTopic.title}
              </h1>
            </div>

            {/* Content */}
            <div className="text-base leading-8 text-slate-600 md:text-lg">
              {activeTopic.content}
            </div>

            {/* Navigation */}
            <div className="mt-10 flex justify-between gap-3 border-t border-slate-200 pt-5">
              <button
                type="button"
                disabled={!previousTopic}
                onClick={() => {
                  if (previousTopic) {
                    setActiveTopic(previousTopic);
                  }
                }}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50 disabled:opacity-30"
              >
                ← قبلی
              </button>

              <button
                type="button"
                disabled={!nextTopic}
                onClick={() => {
                  if (nextTopic) {
                    setActiveTopic(nextTopic);
                  }
                }}
                className="rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600 disabled:opacity-30"
              >
                بعدی →
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
