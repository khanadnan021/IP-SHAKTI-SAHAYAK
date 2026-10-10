import React, { useState } from 'react';
import { RAG_CITATIONS, REGIME_DETAILS } from '../data/ragCorpus';
import { SourceCitation, Regime, Category } from '../types';
import { Search, Scale, BookOpen, ExternalLink, Filter, ShieldCheck } from 'lucide-react';

interface KnowledgeCodexProps {
  currentRegime: Regime;
  onOpenCitation: (citation: SourceCitation) => void;
}

export const KnowledgeCodex: React.FC<KnowledgeCodexProps> = ({
  currentRegime,
  onOpenCitation,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');

  const filteredCitations = RAG_CITATIONS.filter((citation) => {
    // Regime filter
    if (currentRegime !== 'all' && citation.regime !== currentRegime) {
      return false;
    }

    // Category filter
    if (selectedCategory !== 'all' && citation.category !== selectedCategory) {
      return false;
    }

    // Search query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        citation.title.toLowerCase().includes(q) ||
        citation.id.toLowerCase().includes(q) ||
        citation.statutoryReference.toLowerCase().includes(q) ||
        citation.summary.toLowerCase().includes(q) ||
        citation.practicalImplication.toLowerCase().includes(q)
      );
    }

    return true;
  });

  const categories: { id: Category | 'all'; label: string }[] = [
    { id: 'all', label: 'All Legal Categories' },
    { id: 'patent_law', label: 'Patent Law & Bars (Sec 3p/3d/3e)' },
    { id: 'tkdl', label: 'TKDL & Prior Art' },
    { id: 'biodiversity_abs', label: 'Biological Diversity Act & ABS' },
    { id: 'drug_regulatory', label: 'Drug Licensing & Rule 158B' },
    { id: 'international_treaties', label: 'International Treaties (WIPO/Nagoya)' },
    { id: 'trademark_gi', label: 'Geographical Indications (GI)' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-serif">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 border-b border-[#DED9C4] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B8860B] font-sans mb-1">
            <BookOpen className="w-4 h-4 text-[#B8860B]" />
            <span>Vidhi Kosh (विधि कोष)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black italic tracking-tight text-[#2D4F1E]">
            Canonical Ayurveda IP &amp; Regulatory Codex
          </h2>
          <p className="text-sm sm:text-base text-stone-700 mt-1 max-w-3xl leading-relaxed">
            Ground-truth legal statutes, official gazette notifications, TKDL classification guidelines, and regulatory frameworks.
          </p>
        </div>

        {/* Search Input (Editorial Border Box) */}
        <div className="w-full md:w-80 relative font-sans">
          <Search className="w-4 h-4 text-[#2D4F1E]/60 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search statute, Sec 3(p), Form III, TKDL..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border-2 border-[#2D4F1E] shadow-[3px_3px_0px_#2D4F1E] focus:outline-hidden text-[#1A1A1A] placeholder:text-stone-400 font-sans"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none font-sans">
        <Filter className="w-3.5 h-3.5 text-[#B8860B] shrink-0" />
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-all border cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#2D4F1E] text-[#FDFCF6] border-[#2D4F1E] shadow-2xs'
                : 'bg-white text-[#2D4F1E] hover:bg-[#FFF9E5] hover:border-[#B8860B] border-[#DED9C4]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of Citations */}
      {filteredCitations.length === 0 ? (
        <div className="bg-[#FAF7ED] border border-dashed border-[#DED9C4] p-12 text-center text-[#2D4F1E]">
          <BookOpen className="w-10 h-10 text-[#B8860B]/60 mx-auto mb-2" />
          <h3 className="font-bold text-base font-serif text-[#2D4F1E]">No matching statutory references found</h3>
          <p className="text-xs text-stone-600 mt-1">Try relaxing search terms or selecting 'All Regimes'.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCitations.map((citation) => {
            const regimeInfo = REGIME_DETAILS[citation.regime] || { flag: '🌐', name: citation.regime };
            return (
              <div
                key={citation.id}
                className="bg-[#FAF7ED] border border-[#DED9C4] p-5 shadow-2xs hover:border-[#2D4F1E] hover:shadow-[3px_3px_0px_#2D4F1E] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between gap-2 mb-2.5 font-sans">
                    <span className="px-2 py-0.5 bg-[#FFF9E5] text-[#B8860B] text-[10px] font-mono font-bold border border-[#B8860B]/40">
                      {citation.id}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#2D4F1E] flex items-center gap-1">
                      <span>{regimeInfo.flag}</span>
                      <span>{citation.regime}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#2D4F1E] leading-snug mb-2 font-serif">
                    {citation.title}
                  </h3>

                  <div className="text-[11px] font-sans text-stone-500 font-semibold mb-3">
                    Ref: <span className="text-[#1A1A1A]">{citation.statutoryReference}</span>
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed mb-4 font-serif line-clamp-3">
                    {citation.summary}
                  </p>
                </div>

                <div>
                  {/* Practical Implication snippet */}
                  <div className="p-3 bg-white border border-[#DED9C4] mb-3 text-xs text-stone-800 font-serif">
                    <strong className="text-[#B8860B] font-sans text-[10px] uppercase font-bold block mb-0.5 tracking-wider">
                      Innovator Impact:
                    </strong>
                    <span className="line-clamp-2 italic">{citation.practicalImplication}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#DED9C4]">
                    <button
                      onClick={() => onOpenCitation(citation)}
                      className="text-[11px] font-bold font-sans uppercase tracking-wider text-[#2D4F1E] hover:text-[#B8860B] flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Scale className="w-3.5 h-3.5 text-[#B8860B]" />
                      <span>Inspect Legal Clause</span>
                    </button>

                    {citation.canonicalUrl && (
                      <a
                        href={citation.canonicalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-stone-400 hover:text-[#2D4F1E] text-xs transition-colors"
                        title="Open Official Portal"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
