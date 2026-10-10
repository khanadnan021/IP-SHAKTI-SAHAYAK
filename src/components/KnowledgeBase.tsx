import React, { useState } from 'react';
import { LEGAL_CORPUS_RECORDS } from '../data/sihData';
import { NavTab } from '../types';
import { BookOpen, ShieldAlert, CheckCircle2, AlertTriangle, ExternalLink, Bot, ArrowRight } from 'lucide-react';

interface KnowledgeBaseProps {
  onNavigateToTab: (tab: NavTab) => void;
  onAskAIWithContext: (query: string) => void;
}

export const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({
  onNavigateToTab,
  onAskAIWithContext,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const landmarkCases = [
    {
      id: 'case-haldi',
      name: 'Curcuma longa (Turmeric / Haldi) Wound Healing Patent',
      patentNumber: 'US 5,401,504',
      applicant: 'University of Mississippi Medical Center',
      outcome: 'Revoked via TKDL evidence from Charaka Samhita & Sushruta Samhita',
      year: 1997,
      summary: 'Landmark case demonstrating that native biological properties of Curcuma longa are pre-existing prior art under Section 3(p).'
    },
    {
      id: 'case-neem',
      name: 'Azadirachta indica (Neem) Fungicidal Composition',
      patentNumber: 'EP 0436257',
      applicant: 'W.R. Grace and Co.',
      outcome: 'Revoked by European Patent Office (EPO) Technical Board of Appeal',
      year: 2005,
      summary: 'Established that traditional extraction of hydrophobic neem oil constitutes public knowledge barring novelty and inventive step.'
    },
    {
      id: 'case-ashwagandha',
      name: 'Withania somnifera (Ashwagandha) Radioprotective Extracts',
      patentNumber: 'EP 2873420',
      applicant: 'M/S Pharmanutrients Inc.',
      outcome: 'Withdrawn post TKDL Pre-Grant Third-Party Observation',
      year: 2016,
      summary: 'TKDL submitted slokas from Bhavaprakasha Samhita citing Withania roots as Rasayana, leading to claim abandonment.'
    }
  ];

  return (
    <div className="bg-[#F6F8F4] min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Section matching Image 8 */}
        <div className="mb-8 pb-4 border-b border-stone-200">
          <div className="text-xs font-bold uppercase tracking-widest text-[#245428] mb-1.5">
            EVIDENCE LAYER
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#162938]">
            Knowledge Base
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Curated legal-source metadata plus publicly verifiable TKDL patent examination examples.
          </p>
        </div>

        {/* Yellow Controlled Access Banner matching Image 8 */}
        <div className="mb-8 p-3.5 bg-[#FEF9E7] border border-[#FDE68A] rounded-xl text-xs text-[#854D0E] flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 shrink-0 text-[#B45309]" />
          <span>
            <strong className="font-bold">TKDL access is controlled.</strong> This prototype uses public examination records, statutory safe harbor gazettes, and official legal rules—not unrestricted access to the complete confidential TKDL database.
          </span>
        </div>

        {/* Section: Legal Corpus matching Image 8 */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-[#162938]">
              Legal Corpus
            </h2>
            <span className="text-xs text-stone-500 font-semibold">
              6 Verified Statutory Sources
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {LEGAL_CORPUS_RECORDS.map((rec) => (
              <div
                key={rec.id}
                className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-2.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold uppercase tracking-wider rounded-md">
                      official_curated
                    </span>
                    <span className="text-[11px] text-stone-400">
                      {rec.category}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#162938] mb-2 font-sans">
                    {rec.title}
                  </h3>

                  <div className="text-xs font-semibold text-[#1E3A1A] mb-2 font-mono">
                    {rec.sections}
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {rec.details}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                  <span>Authority: {rec.authority}</span>
                  <button
                    onClick={() => {
                      onAskAIWithContext(`Explain the practical implications of ${rec.title} (${rec.sections}) for an Ayurvedic startup in India.`);
                    }}
                    className="text-xs font-bold text-[#1E3A1A] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Consult</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Landmark TKDL Precedent Cases */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-[#162938]">
              Landmark TKDL Precedent Cases
            </h2>
            <span className="text-xs text-stone-500 font-semibold">
              Traditional Knowledge Revocations
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {landmarkCases.map((cs) => (
              <div
                key={cs.id}
                className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded">
                      {cs.patentNumber}
                    </span>
                    <span className="text-xs text-stone-400">
                      Resolved {cs.year}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#162938] mb-2">
                    {cs.name}
                  </h3>

                  <div className="text-xs font-semibold text-emerald-800 mb-2">
                    Outcome: {cs.outcome}
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {cs.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100">
                  <button
                    onClick={() => {
                      onAskAIWithContext(`How does the landmark case ${cs.patentNumber} (${cs.name}) apply to modern Ayurvedic formulations, and what lessons prevent Section 3(p) objections?`);
                    }}
                    className="text-xs font-bold text-[#1E3A1A] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Analyze Precedent with AI</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
