import React, { useState } from 'react';
import { NavTab, SourceCitation, ProductAssessmentData } from './types';
import { Header } from './components/Header';
import { HeroHome } from './components/HeroHome';
import { ProductAssessment } from './components/ProductAssessment';
import { HealthCheckResult } from './components/HealthCheckResult';
import { PatentSearch } from './components/PatentSearch';
import { CostEstimator } from './components/CostEstimator';
import { KnowledgeBase } from './components/KnowledgeBase';
import { AskAI } from './components/AskAI';
import { CitationModal } from './components/CitationModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const [selectedCitation, setSelectedCitation] = useState<SourceCitation | null>(null);

  // Active product assessment state
  const [assessmentData, setAssessmentData] = useState<ProductAssessmentData>({
    productName: 'Herbal Cough Syrup',
    productDescription: 'An alcohol-free, non-drowsy herbal formulation engineered with standardized Adhatoda vasica (Vasaka) and Piper longum (Pippali) for rapid mucosal soothing and bronchodilation.',
    productType: 'Ayurvedic Medicine',
    ingredients: 'Adhatoda vasica (Vasaka) leaf extract, Piper longum (Pippali) fruit, Glycyrrhiza glabra (Yashtimadhu) root, Ocimum sanctum (Tulsi), Honey matrix.',
    partsUsed: 'Leaves, Dried Fruits, and Stolon/Root',
    botanicalOrigin: 'cultivated_india',
    intendedUse: 'Relief of acute dry cough, mucosal irritation, and seasonal upper respiratory congestion.',
    targetClaim: 'disease_therapeutic',
    targetAudience: 'Adults and pediatric population above 5 years seeking natural antitussive therapy.',
    formulationType: 'aqueous_alcoholic_extract',
    inClassicalTexts: 'modified',
    synergyOrNoveltyProof: 'Novel solvent extraction and micro-emulsified honey base providing 3.8x faster bioavailability of vasicine without requiring synthetic preservatives.',
    commercialJurisdiction: 'both',
    priorityProtection: 'all',
    applicantType: 'Startup',
  });

  const [aiInitialPrompt, setAiInitialPrompt] = useState<string>('');

  const handleAssessmentComplete = (data: ProductAssessmentData) => {
    setAssessmentData(data);
    setActiveTab('health-check');
  };

  const handleAskAIWithContext = (prompt: string) => {
    setAiInitialPrompt(prompt);
    setActiveTab('ask-ai');
  };

  return (
    <div className="min-h-screen bg-[#F6F8F4] text-stone-900 flex flex-col font-sans selection:bg-[#1E3A1A]/20 selection:text-[#1E3A1A]">
      {/* Top Application Header matching all screenshots */}
      <Header
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setAiInitialPrompt('');
          setActiveTab(tab);
        }}
        currentLanguage={currentLanguage}
        onSelectLanguage={setCurrentLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {activeTab === 'home' && (
          <HeroHome onNavigate={(tab) => setActiveTab(tab)} />
        )}

        {activeTab === 'assessment' && (
          <ProductAssessment
            onComplete={handleAssessmentComplete}
            onNavigateToTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'health-check' && (
          <HealthCheckResult
            assessmentData={assessmentData}
            onNavigateToTab={(tab) => setActiveTab(tab)}
            onAskAIWithContext={handleAskAIWithContext}
          />
        )}

        {activeTab === 'patent-search' && (
          <PatentSearch
            onNavigateToTab={(tab) => setActiveTab(tab)}
            onAskAIWithContext={handleAskAIWithContext}
          />
        )}

        {activeTab === 'cost-estimator' && (
          <CostEstimator
            onNavigateToTab={(tab) => setActiveTab(tab)}
            onAskAIWithContext={handleAskAIWithContext}
          />
        )}

        {activeTab === 'knowledge-base' && (
          <KnowledgeBase
            onNavigateToTab={(tab) => setActiveTab(tab)}
            onAskAIWithContext={handleAskAIWithContext}
          />
        )}

        {activeTab === 'ask-ai' && (
          <AskAI
            assessmentData={assessmentData}
            initialPrompt={aiInitialPrompt}
            onOpenCitation={(cit) => setSelectedCitation(cit)}
          />
        )}
      </main>

      {/* Minimal Footer */}
      <footer className="py-4 bg-white border-t border-stone-200 text-center text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between px-6 max-w-7xl mx-auto w-full">
        <span>© 2026 Intel-Ayu • AI-Powered Ayurvedic IP &amp; Compliance Navigator</span>
        <span className="mt-1 sm:mt-0 font-medium text-stone-600">
          Statutory Safe Harbor Grounding &amp; TKDL Evidence Layer
        </span>
      </footer>

      {/* Citation Modal */}
      <CitationModal
        citation={selectedCitation}
        onClose={() => setSelectedCitation(null)}
      />
    </div>
  );
}
