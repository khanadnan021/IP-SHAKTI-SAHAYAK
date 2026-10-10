import React, { useState } from 'react';
import { SYNTHETIC_PATENT_RECORDS } from '../data/sihData';
import { SyntheticPatentRecord, NavTab } from '../types';
import { Search, AlertTriangle, ExternalLink, Bot, ArrowRight, Filter } from 'lucide-react';

interface PatentSearchProps {
  onNavigateToTab: (tab: NavTab) => void;
  onAskAIWithContext: (query: string) => void;
}

export const PatentSearch: React.FC<PatentSearchProps> = ({
  onNavigateToTab,
  onAskAIWithContext,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('Ashwagandha');
  const [selectedHerb, setSelectedHerb] = useState<string>('All');
  const [minSimilarity, setMinSimilarity] = useState<number>(0);

  const herbsFilter = ['All', 'Ashwagandha', 'Curcumin', 'Vasaka', 'Tulsi', 'Diagnostics'];

  const filteredRecords = SYNTHETIC_PATENT_RECORDS.filter((rec) => {
    const matchesQuery = 
      rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.applicant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.patentNumber.includes(searchQuery) ||
      rec.herbs.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesHerb = selectedHerb === 'All' || rec.herbs.some(h => h.toLowerCase().includes(selectedHerb.toLowerCase()));
    const matchesSim = rec.similarityScore >= minSimilarity;

    return (searchQuery === '' || matchesQuery) && matchesHerb && matchesSim;
  });

  return (
    <div className="bg-[#F6F8F4] min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Section matching Image 6 */}
        <div className="mb-8 pb-4 border-b border-stone-200">
          <div className="text-xs font-bold uppercase tracking-widest text-[#245428] mb-1.5">
            PRIOR-ART DEMONSTRATION
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#162938]">
            Patent Search
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Search synthetic demonstration records. They are not government records.
          </p>
        </div>

        {/* Search Input Bar matching Image 6 */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm mb-5">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search botanical names, patent numbers, or applicant..."
                className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#1E3A1A] focus:bg-white transition-all"
              />
            </div>
            <button
              onClick={() => {}}
              className="bg-[#1E3A1A] hover:bg-[#152D13] text-white px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow-md cursor-pointer whitespace-nowrap"
            >
              Search Potentially Relevant Records
            </button>
          </div>

          {/* Quick Filter Pills */}
          <div className="mt-3.5 pt-3 border-t border-stone-100 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-stone-400 font-medium shrink-0">Quick Herbs:</span>
            {herbsFilter.map((herb) => (
              <button
                key={herb}
                onClick={() => {
                  setSelectedHerb(herb);
                  if (herb !== 'All') setSearchQuery(herb);
                }}
                className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                  selectedHerb === herb
                    ? 'bg-[#1E3A1A] text-white font-bold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {herb}
              </button>
            ))}
          </div>
        </div>

        {/* Amber Demo Disclaimer Box matching Image 6 */}
        <div className="mb-8 p-3.5 bg-[#FEF9E7] border border-[#FDE68A] rounded-xl text-xs text-[#854D0E] flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 shrink-0 text-[#B45309]" />
          <span>
            <strong className="font-bold">Every result below is labelled DEMO / SYNTHETIC DATA.</strong> Similarity does not establish infringement or patentability. Formal Freedom-to-Operate (FTO) requires search on official Indian Patent Office (InPASS) or WIPO PATENTSCOPE.
          </span>
        </div>

        {/* Results Grid matching Image 6 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecords.map((record) => (
            <div
              key={record.id}
              className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Top Badge: DEMO DATA */}
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block px-2.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold uppercase tracking-wider rounded-md">
                    DEMO DATA
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 bg-[#EBF4E8] text-[#1E3A1A] rounded-md">
                    {record.similarityScore}% similarity
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-[#162938] leading-snug mb-2 font-sans group-hover:text-[#1E3A1A] transition-colors">
                  {record.title}
                </h3>

                {/* Number and Applicant */}
                <div className="text-xs text-stone-500 font-semibold mb-3">
                  {record.patentNumber} • {record.applicant}
                </div>

                {/* Snippet */}
                <p className="text-xs text-stone-600 leading-relaxed">
                  {record.snippet}
                </p>

                {/* IPC / Herbs tags */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap gap-1.5 text-[10px] text-stone-500 font-mono">
                  <span className="bg-stone-100 px-2 py-0.5 rounded-sm">{record.ipcClass}</span>
                  <span className="bg-stone-100 px-2 py-0.5 rounded-sm">Filing: {record.filingDate}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-6 pt-3 border-t border-stone-100 flex items-center justify-between">
                <button
                  onClick={() => {
                    onAskAIWithContext(`Please analyze patent record ${record.patentNumber} ("${record.title}") by ${record.applicant}. Does this constitute prior art against my Ayurvedic formulation?`);
                  }}
                  className="text-xs font-bold text-[#1E3A1A] hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Analyze Claim Conflict</span>
                </button>
                <span className="text-[10px] font-bold text-stone-400">
                  {record.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredRecords.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
            <Search className="w-8 h-8 text-stone-300 mx-auto mb-3" />
            <p className="text-stone-600 font-medium">No synthetic records found for "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-3 text-xs font-bold text-[#1E3A1A] underline"
            >
              Reset search query
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
