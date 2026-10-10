import React, { useState } from 'react';
import { LANDMARK_CASES } from '../data/ragCorpus';
import { LandmarkCase } from '../types';
import { ShieldAlert, BookOpen, Scale, Award, FileText, ChevronRight, CheckCircle2 } from 'lucide-react';

export const LandmarkCases: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<LandmarkCase>(LANDMARK_CASES[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-serif">
      <div className="mb-6 border-b border-[#DED9C4] pb-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B8860B] font-sans mb-1">
          <ShieldAlert className="w-4 h-4 text-[#B8860B]" />
          <span>Dharohar Suraksha (धरोहर सुरक्षा)</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black italic tracking-tight text-[#2D4F1E]">
          Landmark Ayurvedic Biopiracy Revocations &amp; IP Case Law
        </h2>
        <p className="text-sm sm:text-base text-stone-700 mt-1 max-w-3xl leading-relaxed">
          Historical jurisprudence demonstrating how canonical Ayurvedic treatises (Charaka Samhita, Sushruta Samhita, Bhavaprakasha) 
          successfully invalidated foreign patent monopolies, precipitating the TKDL and the 2024 WIPO Treaty on Genetic Resources.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left List of Cases */}
        <div className="lg:col-span-4 space-y-2.5">
          {LANDMARK_CASES.map((c) => {
            const isSelected = selectedCase.id === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCase(c)}
                className={`w-full text-left p-4 border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#2D4F1E] text-[#FDFCF6] border-[#2D4F1E] shadow-[3px_3px_0px_#B8860B]'
                    : 'bg-[#FAF7ED] text-[#2D4F1E] border-[#DED9C4] hover:bg-[#FFF9E5] hover:border-[#B8860B]'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1 font-sans">
                  <span className={`font-bold uppercase tracking-wider text-[11px] ${isSelected ? 'text-[#B8860B]' : 'text-stone-500'}`}>
                    {c.targetJurisdiction}
                  </span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    isSelected ? 'bg-white/20 text-[#FDFCF6]' : 'bg-[#FFF9E5] text-[#B8860B] border border-[#B8860B]/30'
                  }`}>
                    Revoked {c.yearResolved}
                  </span>
                </div>
                <h3 className="text-base font-bold font-serif leading-snug">{c.name}</h3>
                <div className={`text-[11px] font-sans mt-1 truncate ${isSelected ? 'text-[#FDFCF6]/80' : 'text-stone-500'}`}>
                  Patent No: {c.patentNumber}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Detail View */}
        <div className="lg:col-span-8 bg-[#FAF7ED] border border-[#DED9C4] p-6 shadow-2xs space-y-6">
          <div className="pb-4 border-b border-[#DED9C4] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="px-2.5 py-1 bg-white text-[#2D4F1E] text-[11px] font-bold font-sans uppercase tracking-wider border border-[#DED9C4]">
                {selectedCase.patentNumber} • {selectedCase.targetJurisdiction}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#2D4F1E] mt-2 leading-tight">
                {selectedCase.name}
              </h3>
              <div className="text-xs font-sans text-stone-600 mt-1">
                Assignee / Applicant: <strong className="text-[#1A1A1A]">{selectedCase.assigneeOrApplicant}</strong>
              </div>
            </div>

            <div className="text-right sm:self-start">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#2D4F1E] text-[#FDFCF6] text-xs font-bold font-sans uppercase tracking-wider shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B8860B]" />
                Invalidated {selectedCase.yearResolved}
              </span>
            </div>
          </div>

          {/* Traditional Herbs Involved */}
          <div className="bg-white p-4 border border-[#DED9C4]">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#2D4F1E] font-sans mb-2 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#B8860B]" />
              <span>Traditional Botanical Resource Involved:</span>
            </h4>
            <div className="flex flex-wrap gap-2 font-sans">
              {selectedCase.traditionalHerbsInvolved.map((herb, idx) => (
                <span key={idx} className="px-3 py-1 bg-[#FAF7ED] border border-[#DED9C4] text-[#2D4F1E] text-xs font-semibold">
                  🌿 {herb}
                </span>
              ))}
            </div>
          </div>

          {/* Legal Challenge & Grounds */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-[#DED9C4]">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B] font-sans mb-2">
                Challenging Body / Opponents
              </h4>
              <p className="text-xs text-stone-800 font-medium leading-relaxed font-serif">
                {selectedCase.challengeBody}
              </p>
            </div>

            <div className="p-4 bg-[#FFF9E5] border border-[#B8860B]/60">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B] font-sans mb-2">
                Statutory Grounds for Revocation
              </h4>
              <ul className="space-y-1 text-xs text-stone-800 font-serif">
                {selectedCase.groundsForRevocation.map((gr, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#B8860B] font-bold">•</span>
                    <span>{gr}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Classical Ayurvedic Texts Cited as Prior Art */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#2D4F1E] font-sans mb-2 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-[#B8860B]" />
              <span>Canonical Ayurvedic Samhitas Cited as Anticipatory Prior Art:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedCase.keyAyurvedicTextsCited.map((text, idx) => (
                <div key={idx} className="p-3 bg-white border border-[#DED9C4] text-xs font-medium text-stone-800 flex items-center gap-2 font-serif">
                  <div className="w-2 h-2 rounded-full bg-[#2D4F1E]" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Outcome */}
          <div className="p-4 bg-white border-l-4 border-[#2D4F1E] border-y border-r border-y-[#DED9C4] border-r-[#DED9C4]">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#2D4F1E] font-sans mb-1 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#B8860B]" />
              <span>Final Ruling &amp; Legal Outcome</span>
            </h4>
            <p className="text-xs text-stone-800 leading-relaxed font-medium font-serif">
              {selectedCase.outcome}
            </p>
          </div>

          {/* Significance for Innovators */}
          <div className="p-5 bg-[#2D4F1E] text-[#FDFCF6] border-2 border-[#2D4F1E] shadow-[4px_4px_0px_#B8860B]">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B] font-sans mb-1.5 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-[#B8860B]" />
              <span>Critical Precedent &amp; Drafting Takeaway for Modern Innovators:</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#FDFCF6]/90 leading-relaxed font-serif italic">
              "{selectedCase.significanceForInnovators}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
