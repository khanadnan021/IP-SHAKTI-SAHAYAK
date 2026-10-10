import React from 'react';
import { SourceCitation } from '../types';
import { X, ExternalLink, ShieldCheck, BookOpen, Scale, FileText } from 'lucide-react';

interface CitationModalProps {
  citation: SourceCitation | null;
  onClose: () => void;
}

export const CitationModal: React.FC<CitationModalProps> = ({ citation, onClose }) => {
  if (!citation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fadeIn font-serif">
      <div 
        className="relative w-full max-w-2xl bg-[#FDFCF6] shadow-[8px_8px_0px_rgba(45,79,30,0.3)] border-2 border-[#2D4F1E] overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#2D4F1E] text-[#FDFCF6] px-6 py-4 flex items-center justify-between border-b-2 border-[#B8860B]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-black/20 border border-[#B8860B]/40">
              <Scale className="w-5 h-5 text-[#B8860B]" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-widest text-[#B8860B] font-sans font-bold flex items-center gap-1.5">
                <span>Ref Code: {citation.id}</span>
                <span>•</span>
                <span className="capitalize">{citation.regime} Regime</span>
              </div>
              <h3 className="text-xl font-bold leading-tight text-[#FDFCF6] mt-0.5 font-serif">{citation.title}</h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-[#FDFCF6]/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-stone-800 text-sm bg-[#FDFCF6]">
          {/* Statutory Reference & Authority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-[#FAF7ED] p-4 border border-[#DED9C4]">
            <div>
              <div className="text-[10px] font-bold text-[#B8860B] font-sans uppercase tracking-widest">Statutory Reference</div>
              <div className="font-bold text-stone-900 mt-0.5 font-serif">{citation.statutoryReference}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-[#B8860B] font-sans uppercase tracking-widest">Competent Authority</div>
              <div className="font-semibold text-stone-800 mt-0.5 font-serif">{citation.authority}</div>
            </div>
          </div>

          {/* Legal Summary */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#2D4F1E] font-sans mb-1.5 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#B8860B]" />
              <span>Statutory Provision &amp; Principle</span>
            </h4>
            <div className="leading-relaxed text-stone-800 bg-[#FAF7ED] p-4 border-l-4 border-[#2D4F1E] border-y border-r border-[#DED9C4] font-serif text-xs sm:text-sm">
              {citation.summary}
            </div>
          </div>

          {/* Practical Implication */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B] font-sans mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#B8860B]" />
              <span>Practical Implication for Ayurvedic Innovators</span>
            </h4>
            <div className="leading-relaxed text-stone-800 bg-[#FFF9E5] p-4 border-l-4 border-[#B8860B] border-y border-r border-[#DED9C4] font-serif text-xs sm:text-sm">
              {citation.practicalImplication}
            </div>
          </div>

          {/* Key Articles / Sections */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#2D4F1E] font-sans mb-2 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#B8860B]" />
              <span>Key Sections / Articles</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {citation.keyArticlesOrSections.map((item, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-white text-[#2D4F1E] font-sans text-xs font-bold border border-[#DED9C4] shadow-2xs">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#FAF7ED] border-t border-[#DED9C4] flex items-center justify-between text-xs font-sans">
          <span className="text-stone-600 font-medium">Verified RAG Corpus Document</span>
          <div className="flex items-center gap-3">
            {citation.canonicalUrl && (
              <a 
                href={citation.canonicalUrl} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[#2D4F1E] hover:text-[#B8860B] font-bold uppercase tracking-wider underline decoration-[#B8860B]"
              >
                Official Gazette / Portal
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#2D4F1E] hover:bg-[#233d17] text-[#FDFCF6] font-bold text-xs uppercase tracking-wider transition-all border border-[#2D4F1E] shadow-[2px_2px_0px_#B8860B] cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
