import React from 'react';
import { NavTab } from '../types';
import { Shield, Sparkles } from 'lucide-react';
import { IntelAyuLogo } from './IntelAyuLogo';

interface HeaderProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  currentLanguage: string;
  onSelectLanguage: (lang: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
}) => {
  return (
    <header className="bg-white/95 backdrop-blur-xs border-b border-[#E2E8DE] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo and Brand - Intel-Ayu exact replica from user image */}
        <button
          onClick={() => onSelectTab('home')}
          className="flex items-center text-left group cursor-pointer"
          title="Intel-Ayu Home"
        >
          <IntelAyuLogo height={42} withFrame={true} />
        </button>

        {/* Central Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => onSelectTab('assessment')}
            className={`px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'assessment' || activeTab === 'health-check'
                ? 'text-[#1E3A1A] font-semibold border-b-2 border-[#1E3A1A]'
                : 'text-stone-600 hover:text-[#1E3A1A]'
            }`}
          >
            Product Assessment
          </button>

          <button
            onClick={() => onSelectTab('patent-search')}
            className={`px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'patent-search'
                ? 'text-[#1E3A1A] font-semibold border-b-2 border-[#1E3A1A]'
                : 'text-stone-600 hover:text-[#1E3A1A]'
            }`}
          >
            Patent Search
          </button>

          <button
            onClick={() => onSelectTab('cost-estimator')}
            className={`px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'cost-estimator'
                ? 'text-[#1E3A1A] font-semibold border-b-2 border-[#1E3A1A]'
                : 'text-stone-600 hover:text-[#1E3A1A]'
            }`}
          >
            Cost Estimator
          </button>

          <button
            onClick={() => onSelectTab('knowledge-base')}
            className={`px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'knowledge-base'
                ? 'text-[#1E3A1A] font-semibold border-b-2 border-[#1E3A1A]'
                : 'text-stone-600 hover:text-[#1E3A1A]'
            }`}
          >
            Knowledge Base
          </button>

          <button
            onClick={() => onSelectTab('ask-ai')}
            className={`px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'ask-ai'
                ? 'text-[#1E3A1A] font-semibold border-b-2 border-[#1E3A1A]'
                : 'text-stone-600 hover:text-[#1E3A1A]'
            }`}
          >
            Ask AI
          </button>
        </nav>

        {/* Right CTA and Badge */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectTab('assessment')}
            className="bg-[#1E3A1A] hover:bg-[#162D14] text-white text-sm font-semibold px-4 py-2 rounded-md transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <span>Start Assessment</span>
          </button>

          {/* India Tag Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-[#F5F2EB] border border-[#E3DCCE] rounded-sm text-xs font-semibold text-stone-700">
            <span className="w-2 h-2 rounded-full bg-[#FF9933]"></span>
            <span>IN India</span>
          </div>
        </div>
      </div>

      {/* Mobile nav row */}
      <div className="md:hidden flex items-center justify-around py-2 border-t border-[#E2E8DE] bg-[#F9FAF7] text-xs font-medium text-stone-700 overflow-x-auto px-2">
        <button
          onClick={() => onSelectTab('home')}
          className={`px-2 py-1 ${activeTab === 'home' ? 'text-[#1E3A1A] font-bold' : ''}`}
        >
          Home
        </button>
        <button
          onClick={() => onSelectTab('assessment')}
          className={`px-2 py-1 ${activeTab === 'assessment' || activeTab === 'health-check' ? 'text-[#1E3A1A] font-bold' : ''}`}
        >
          Assessment
        </button>
        <button
          onClick={() => onSelectTab('patent-search')}
          className={`px-2 py-1 ${activeTab === 'patent-search' ? 'text-[#1E3A1A] font-bold' : ''}`}
        >
          Search
        </button>
        <button
          onClick={() => onSelectTab('cost-estimator')}
          className={`px-2 py-1 ${activeTab === 'cost-estimator' ? 'text-[#1E3A1A] font-bold' : ''}`}
        >
          Estimator
        </button>
        <button
          onClick={() => onSelectTab('knowledge-base')}
          className={`px-2 py-1 ${activeTab === 'knowledge-base' ? 'text-[#1E3A1A] font-bold' : ''}`}
        >
          Knowledge
        </button>
        <button
          onClick={() => onSelectTab('ask-ai')}
          className={`px-2 py-1 ${activeTab === 'ask-ai' ? 'text-[#1E3A1A] font-bold' : ''}`}
        >
          Ask AI
        </button>
      </div>
    </header>
  );
};
