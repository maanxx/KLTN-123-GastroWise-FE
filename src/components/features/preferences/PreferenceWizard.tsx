'use client';

import { AnimatePresence } from 'framer-motion';

import { BudgetStep } from './BudgetStep';
import { CuisineStep } from './CuisineStep';
import { OptionsStep } from './OptionsStep';
import { TimeStep } from './TimeStep';
import { usePreferenceStore } from '@/stores/usePreferenceStore';

const TOTAL_STEPS = 4;

export function PreferenceWizard() {
  const { currentStep } = usePreferenceStore();

  // Progress Bar Width
  const progressPercent = ((currentStep - 1) / (TOTAL_STEPS - 1)) * 100;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Progress Bar Container */}
      <div className="mb-12">
        <div className="mb-4 flex items-center justify-between text-sm font-medium text-slate-500">
          <span>Bước {currentStep} trên {TOTAL_STEPS}</span>
          <span className="text-primary-600">{Math.round(progressPercent)}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Wizard Content Area */}
      <div className="overflow-hidden rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-10 dark:bg-slate-900 dark:shadow-none">
        <AnimatePresence mode="wait">
          {currentStep === 1 && <CuisineStep key="step1" />}
          {currentStep === 2 && <TimeStep key="step2" />}
          {currentStep === 3 && <BudgetStep key="step3" />}
          {currentStep === 4 && <OptionsStep key="step4" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
