import React from 'react';
import { ProductAssessmentData, NavTab } from '../types';
import { 
  Sparkles, 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Bot, 
  Scale, 
  BookOpen, 
  Leaf,
  FileCheck2,
  RefreshCw,
  Search
} from 'lucide-react';

interface HealthCheckResultProps {
  assessmentData?: ProductAssessmentData;
  onNavigateToTab: (tab: NavTab) => void;
  onAskAIWithContext: (contextPrompt: string) => void;
}

export const HealthCheckResult: React.FC<HealthCheckResultProps> = ({
  assessmentData,
  onNavigateToTab,
  onAskAIWithContext,
}) => {
  const productName = assessmentData?.productName || 'Herbal Cough Syrup';
  const likelyClass = assessmentData?.productType || 'Ayurvedic Medicine';

  const metrics = [
    {
      id: 'reg-clarity',
      title: 'Regulatory Clarity',
      score: 85,
      summary: 'Strong alignment with Rule 158B of Drugs & Cosmetics Rules. Pre-clinical acute toxicity documentation required for proprietary syrup license.',
      icon: Scale,
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-50'
    },
    {
      id: 'ip-readiness',
      title: 'IP Readiness',
      score: 75,
      summary: 'Delivery platform formulation and solvent extraction method are eligible for patent claims under Section 3(d) enhancement benchmarks.',
      icon: Shield,
      color: 'text-blue-700',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'prior-art',
      title: 'Prior-Art Risk',
      score: 75,
      summary: 'Multiple classical references to Vasaka in Charaka Samhita. Novel claim must be limited to stabilized nano-emulsified bioavailability.',
      icon: Search,
      color: 'text-purple-700',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'tk-risk',
      title: 'Traditional Knowledge Risk',
      score: 60,
      summary: 'Section 3(p) statutory bar active on raw herb combination. Novel claim must avoid claiming inherent antitussive properties of Vasaka.',
      icon: BookOpen,
      color: 'text-amber-700',
      bgColor: 'bg-amber-50'
    },
    {
      id: 'abs-review',
      title: 'ABS Review',
      score: 70,
      summary: 'NBA Form III clearance mandatory prior to patent grant under Section 6 of Biological Diversity Act. Cultivated sourcing reduces access levy.',
      icon: Leaf,
      color: 'text-teal-700',
      bgColor: 'bg-teal-50'
    },
    {
      id: 'tm-opp',
      title: 'Trademark Opportunity',
      score: 80,
      summary: 'High registration potential under Class 5 (Ayurvedic pharmaceuticals) provided coined non-descriptive brand name is selected.',
      icon: FileCheck2,
      color: 'text-indigo-700',
      bgColor: 'bg-indigo-50'
    }
  ];

  const handleAskAIClick = () => {
    const prompt = `I have performed an innovation health check for "${productName}" (Classification: ${likelyClass}). Overall Readiness is 74/100. How do I address the Section 3(p) Traditional Knowledge risk (Score: 60) and navigate the NBA Form III requirement for commercial launch?`;
    onAskAIWithContext(prompt);
  };

  return (
    <div className="bg-[#F6F8F4] min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Top Header Section matching Image 4 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-stone-200">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#245428] mb-1.5 flex items-center gap-1.5">
              <span>IP-SAKTI PRELIMINARY INNOVATION HEALTH CHECK</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#162938]">
              Your Ayurvedic Innovation Health Check
            </h1>
            <p className="text-stone-500 text-sm mt-1">
              From Product Idea to Protection Pathway.
            </p>
          </div>

          <div>
            <button
              onClick={handleAskAIClick}
              className="bg-[#1E3A1A] hover:bg-[#152D13] text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Bot className="w-4 h-4" />
              <span>Ask AI About Your Assessment</span>
            </button>
          </div>
        </div>

        {/* Top 2 Cards: Left Classification Card + Right Score Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Left Classification Card */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200/70 text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
                PRELIMINARY / NOT LEGAL ADVICE
              </div>

              <h2 className="text-2xl font-bold text-[#162938] mb-2 font-sans">
                Likely classification: {likelyClass}
              </h2>

              <div className="text-sm font-semibold text-emerald-700 mb-3">
                Confidence: 82%
              </div>

              <div className="text-xs text-stone-500 font-medium leading-relaxed mb-6">
                intended use: General wellness &amp; respiratory relief • formulation information: Yes • user-provided product and ingredient information
              </div>
            </div>

            {/* Warning / Important Banner */}
            <div className="p-3.5 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl text-xs text-amber-900 leading-relaxed">
              <span className="font-bold">Important:</span> This is a preliminary AI-assisted classification, not an official regulatory determination. Formal opinion from an AYUSH Licensing Authority or Registered Patent Agent is recommended.
            </div>
          </div>

          {/* Right Score Card */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#0F352E] to-[#0A2228] text-white p-7 sm:p-8 rounded-2xl shadow-md border border-[#174A40] flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#7EE3CA] mb-3">
                Overall Readiness
              </div>

              <div className="flex items-baseline gap-2 my-2">
                <span className="text-6xl sm:text-7xl font-black font-sans tracking-tight text-white">
                  74
                </span>
                <span className="text-stone-300 text-xl font-medium">/100</span>
              </div>

              <p className="text-xs text-stone-200 leading-relaxed mt-4">
                Balanced score showing solid regulatory feasibility under Rule 158B with patentable carve-outs available on delivery platform.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between text-xs">
              <span className="text-emerald-300 font-semibold">Status: Strong Potential</span>
              <button 
                onClick={() => onNavigateToTab('cost-estimator')}
                className="text-white hover:underline flex items-center gap-1 font-bold cursor-pointer"
              >
                <span>Estimate Fees</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* 6 Metric Cards Grid matching Image 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                className="bg-white p-6 rounded-xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-[#162938]">
                      {m.title}
                    </span>
                    <span className="text-[10px] font-bold text-stone-400 bg-stone-100 px-2 py-0.5 rounded-sm">
                      PRELIMINARY
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl font-black text-[#162938] font-sans">
                      {m.score}
                    </span>
                    <div className={`p-2 rounded-lg ${m.bgColor} ${m.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-xs text-stone-500 leading-relaxed">
                    {m.summary}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      onAskAIWithContext(`Explain the ${m.title} evaluation (Score: ${m.score}) for ${productName} and how to improve it.`);
                    }}
                    className="text-[11px] font-bold text-[#1E3A1A] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Analyze with AI</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Actions Bar */}
        <div className="mt-10 p-6 bg-white rounded-2xl border border-stone-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateToTab('assessment')}
              className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Modify Assessment Inputs</span>
            </button>

            <button
              onClick={() => onNavigateToTab('patent-search')}
              className="px-4 py-2.5 bg-[#EBF4E8] hover:bg-[#DDECD7] text-[#1E3A1A] text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Explore Nearby Prior-Art</span>
            </button>
          </div>

          <button
            onClick={() => onNavigateToTab('cost-estimator')}
            className="px-6 py-2.5 bg-[#1E3A1A] hover:bg-[#152D13] text-white text-xs font-bold rounded-lg transition-all flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <span>Proceed to Cost Estimator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
