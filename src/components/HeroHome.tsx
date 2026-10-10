import React from 'react';
import { NavTab } from '../types';
import { 
  FlaskConical, 
  Shield, 
  Search, 
  IndianRupee, 
  Leaf, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  BookOpen,
  FileText
} from 'lucide-react';

interface HeroHomeProps {
  onNavigate: (tab: NavTab) => void;
}

export const HeroHome: React.FC<HeroHomeProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#F6F8F4] min-h-screen text-[#1A2619]">
      {/* Top Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-bold uppercase tracking-widest text-[#245428] font-sans flex items-center gap-2">
              <span className="px-2 py-0.5 bg-[#E8F5E9] text-[#1B5E20] rounded font-extrabold border border-[#A5D6A7]">
                INTEL-AYU
              </span>
              <span>• AI-POWERED AYURVEDIC IP &amp; COMPLIANCE NAVIGATOR</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] leading-[1.1] font-serif font-black tracking-tight text-[#162938] uppercase">
              SAFEGUARD YOUR<br />
              AYURVEDIC INNOVATION.<br />
              STAY COMPLIANT.
            </h1>

            <p className="text-stone-600 text-base sm:text-lg max-w-xl leading-relaxed">
              AI guidance for IP protection, compliance, TK &amp; ABS insights, and filing costs.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('assessment')}
                className="bg-[#1E3A1A] hover:bg-[#152D13] text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Start Product Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('knowledge-base')}
                className="bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-2xs cursor-pointer"
              >
                See How It Works
              </button>
            </div>
          </div>

          {/* Right Hero Card: INNOVATION HEALTH CHECK */}
          <div className="lg:col-span-5">
            <div className="bg-[#0C1F33] text-white p-7 sm:p-9 rounded-2xl shadow-xl border border-[#16304D] relative overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#1B528A]/30 rounded-full blur-2xl pointer-events-none" />

              <div className="text-[11px] font-bold uppercase tracking-wider text-[#79B4E3] mb-4">
                INNOVATION HEALTH CHECK
              </div>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-6xl sm:text-7xl font-bold font-sans tracking-tight text-white">
                  72
                </span>
                <span className="text-stone-400 text-xl font-medium">/100</span>
              </div>

              <p className="text-stone-300 text-sm leading-relaxed mb-8">
                A single preliminary view across regulatory clarity, IP readiness, prior-art, TK, ABS and trademark opportunity.
              </p>

              {/* 4 Colored Pills Grid */}
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => onNavigate('health-check')}
                  className="bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs font-semibold py-2.5 px-3 rounded-lg flex items-center gap-2 transition-all cursor-pointer shadow-sm text-left"
                >
                  <Shield className="w-3.5 h-3.5 shrink-0" />
                  <span>IP Readiness</span>
                </button>

                <button 
                  onClick={() => onNavigate('patent-search')}
                  className="bg-[#7E22CE] hover:bg-[#6B21A8] text-white text-xs font-semibold py-2.5 px-3 rounded-lg flex items-center gap-2 transition-all cursor-pointer shadow-sm text-left"
                >
                  <span className="w-2 h-2 rounded-full bg-purple-300 shrink-0" />
                  <span>Prior Art</span>
                </button>

                <button 
                  onClick={() => onNavigate('health-check')}
                  className="bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold py-2.5 px-3 rounded-lg flex items-center gap-2 transition-all cursor-pointer shadow-sm text-left"
                >
                  <Leaf className="w-3.5 h-3.5 shrink-0" />
                  <span>ABS Review</span>
                </button>

                <button 
                  onClick={() => onNavigate('health-check')}
                  className="bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-semibold py-2.5 px-3 rounded-lg flex items-center gap-2 transition-all cursor-pointer shadow-sm text-left"
                >
                  <FileText className="w-3.5 h-3.5 shrink-0" />
                  <span>TK Risk</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-widest text-[#245428] font-sans mb-1">
            CORE CAPABILITIES
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-sans text-[#162938]">
            One pathway from idea to action
          </h2>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Product Classification */}
          <div 
            onClick={() => onNavigate('assessment')}
            className="bg-white p-7 rounded-xl border border-stone-200/80 shadow-xs hover:shadow-md hover:border-[#1E3A1A]/40 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#EBF4E8] text-[#1E3A1A] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <FlaskConical className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2 font-sans group-hover:text-[#1E3A1A] transition-colors">
                Product Classification
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                Understand the likely regulatory category.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-[#1E3A1A] gap-1 group-hover:gap-2 transition-all">
              <span>Start Assessment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: IP Protection */}
          <div 
            onClick={() => onNavigate('assessment')}
            className="bg-white p-7 rounded-xl border border-stone-200/80 shadow-xs hover:shadow-md hover:border-[#1E3A1A]/40 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#E5F2F0] text-[#0F655A] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2 font-sans group-hover:text-[#1E3A1A] transition-colors">
                IP Protection
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                Explore patent, trademark, design, copyright, GI and trade-secret considerations.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-[#0F655A] gap-1 group-hover:gap-2 transition-all">
              <span>Explore Routes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Prior-Art Check */}
          <div 
            onClick={() => onNavigate('patent-search')}
            className="bg-white p-7 rounded-xl border border-stone-200/80 shadow-xs hover:shadow-md hover:border-[#1E3A1A]/40 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#E8F1F7] text-[#1E568A] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2 font-sans group-hover:text-[#1E3A1A] transition-colors">
                Prior-Art Check
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                Find potentially relevant existing demonstration records.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-[#1E568A] gap-1 group-hover:gap-2 transition-all">
              <span>Search Patents</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Cost Estimator */}
          <div 
            onClick={() => onNavigate('cost-estimator')}
            className="bg-white p-7 rounded-xl border border-stone-200/80 shadow-xs hover:shadow-md hover:border-[#1E3A1A]/40 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#E9F6ED] text-[#16703B] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <IndianRupee className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2 font-sans group-hover:text-[#1E3A1A] transition-colors">
                Cost Estimator
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                Estimate government filing fees from structured fee data.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-[#16703B] gap-1 group-hover:gap-2 transition-all">
              <span>Calculate Fees</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 5: ABS & TK Review */}
          <div 
            onClick={() => onNavigate('health-check')}
            className="bg-white p-7 rounded-xl border border-stone-200/80 shadow-xs hover:shadow-md hover:border-[#1E3A1A]/40 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#EBF4E8] text-[#245428] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2 font-sans group-hover:text-[#1E3A1A] transition-colors">
                ABS &amp; TK Review
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                Surface preliminary traditional-knowledge and biodiversity considerations.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-[#245428] gap-1 group-hover:gap-2 transition-all">
              <span>Check Compliance</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 6: Source-backed AI */}
          <div 
            onClick={() => onNavigate('ask-ai')}
            className="bg-white p-7 rounded-xl border border-stone-200/80 shadow-xs hover:shadow-md hover:border-[#1E3A1A]/40 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#E9EEF5] text-[#1E3A6E] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2 font-sans group-hover:text-[#1E3A1A] transition-colors">
                Source-backed AI
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                Keep facts, AI interpretation and uncertainty distinct.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-[#1E3A6E] gap-1 group-hover:gap-2 transition-all">
              <span>Consult Assistant</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
