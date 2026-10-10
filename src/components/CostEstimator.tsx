import React, { useState } from 'react';
import { COST_ESTIMATOR_OPTIONS } from '../data/sihData';
import { NavTab } from '../types';
import { IndianRupee, AlertTriangle, Check, ArrowRight, Shield, Bot } from 'lucide-react';

interface CostEstimatorProps {
  onNavigateToTab: (tab: NavTab) => void;
  onAskAIWithContext: (query: string) => void;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({
  onNavigateToTab,
  onAskAIWithContext,
}) => {
  const [applicantType, setApplicantType] = useState<'Individual' | 'Startup' | 'Small Enterprise' | 'Educational Institution' | 'Other'>('Startup');

  // Selected checkbox options (default matching Image 7: Form 1&2 + Form 9 + Form 18 = 1600 + 2500 + 4000 = ₹8,100!)
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'patent-form-1-2',
    'patent-form-9',
    'patent-form-18'
  ]);

  const toggleOption = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const getPriceForApplicant = (option: typeof COST_ESTIMATOR_OPTIONS[0]) => {
    switch (applicantType) {
      case 'Individual':
        return option.basePriceIndividual;
      case 'Startup':
        return option.basePriceStartup;
      case 'Small Enterprise':
        return option.basePriceSmallEnterprise;
      case 'Educational Institution':
        return option.basePriceEducational;
      case 'Other':
      default:
        return option.basePriceOther;
    }
  };

  // Calculate total fee dynamically
  const totalFee = selectedIds.reduce((sum, id) => {
    const opt = COST_ESTIMATOR_OPTIONS.find(o => o.id === id);
    return sum + (opt ? getPriceForApplicant(opt) : 0);
  }, 0);

  const formattedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(totalFee);

  return (
    <div className="bg-[#F6F8F4] min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Section matching Image 7 */}
        <div className="mb-8 pb-4 border-b border-stone-200">
          <div className="text-xs font-bold uppercase tracking-widest text-[#245428] mb-1.5">
            GOVERNMENT FEE CALCULATOR
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#162938]">
            IP Cost Estimator
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Structured fee data, not LLM-generated calculations.
          </p>
        </div>

        {/* 2-Column Layout matching Image 7 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form & Checkboxes */}
          <div className="lg:col-span-7 bg-white p-7 sm:p-8 rounded-2xl border border-stone-200/90 shadow-sm space-y-6">
            {/* Applicant Type Select */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                Applicant type
              </label>
              <select
                value={applicantType}
                onChange={(e) => setApplicantType(e.target.value as any)}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg text-sm font-semibold text-stone-900 focus:outline-none focus:border-[#1E3A1A] focus:bg-white transition-all cursor-pointer"
              >
                <option value="Individual">Individual / Natural Person</option>
                <option value="Startup">Startup (80% Official Fee Concession)</option>
                <option value="Small Enterprise">Small Enterprise (MSME)</option>
                <option value="Educational Institution">Educational Institution</option>
                <option value="Other">Other (Large Corporation / Non-MSME)</option>
              </select>
            </div>

            {/* Checkboxes List */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Statutory IP &amp; Regulatory Filings
              </label>

              {COST_ESTIMATOR_OPTIONS.map((opt) => {
                const isChecked = selectedIds.includes(opt.id);
                const fee = getPriceForApplicant(opt);
                const formatted = new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  maximumFractionDigits: 0,
                }).format(fee);

                return (
                  <div
                    key={opt.id}
                    onClick={() => toggleOption(opt.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                      isChecked
                        ? 'bg-[#F4F9F2] border-[#245428] shadow-2xs'
                        : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center transition-all ${
                        isChecked ? 'bg-[#1E3A1A] text-white' : 'border border-stone-300 bg-white'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">
                          {opt.label}
                        </div>
                        <div className="text-[11px] text-stone-500 mt-0.5 capitalize">
                          Category: {opt.category}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs sm:text-sm font-black text-[#1E3A1A] font-mono">
                        {formatted}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Estimated Government Fees Card matching Image 7 */}
          <div className="lg:col-span-5 space-y-6">
            {/* Main Total Card */}
            <div className="bg-white p-7 sm:p-8 rounded-2xl border border-stone-200/90 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-block px-2.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold uppercase tracking-wider rounded-md">
                  ESTIMATE
                </span>
                <span className="text-xs font-semibold text-stone-500">
                  {applicantType}
                </span>
              </div>

              <h2 className="text-xl font-bold text-[#162938] mb-1">
                Estimated Government Fees
              </h2>

              {/* Giant Teal Number matching Image 7 */}
              <div className="my-5">
                <div className="text-5xl sm:text-6xl font-black text-[#0D7A73] tracking-tight font-sans">
                  {formattedTotal}
                </div>
                <div className="text-xs font-semibold text-stone-500 mt-1">
                  Government filing fees only.
                </div>
              </div>

              {/* Amber Disclaimer Box */}
              <div className="p-3.5 bg-[#FEF9E7] border border-[#FDE68A] rounded-xl text-xs text-[#854D0E] leading-relaxed mb-6">
                Professional/legal fees are not included. Actual fees may vary depending on applicable requirements. Verify the latest official IP India fee schedule before filing.
              </div>

              <button
                onClick={() => {
                  onAskAIWithContext(`How can I file patent Form 1, Form 9, and Form 18 in India with the ₹${totalFee} fee under Startup India scheme? What documents are needed?`);
                }}
                className="w-full bg-[#1E3A1A] hover:bg-[#152D13] text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Bot className="w-4 h-4" />
                <span>Ask AI About Filing Strategy</span>
              </button>
            </div>

            {/* Trademark & MSME Reference Card matching Image 7 */}
            <div className="bg-[#EBF4E8] p-5 rounded-2xl border border-[#CDE3C6] text-xs text-[#1E3A1A] space-y-2">
              <div className="font-bold flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                <span>Trademark reference</span>
              </div>
              <p className="leading-relaxed">
                TM-A e-filing: <strong>₹4,500</strong> per mark, per class for Individuals &amp; Startups (vs ₹9,000 for standard companies).
              </p>
              <p className="text-[11px] text-[#1E3A1A]/80 pt-1 border-t border-[#CDE3C6]/60">
                Startup/MSME: 80% statutory fee concession applied under amended Indian Patent Rules 2020.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
