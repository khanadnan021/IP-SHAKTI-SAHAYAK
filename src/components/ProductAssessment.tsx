import React, { useState } from 'react';
import { ProductAssessmentData, ProductType } from '../types';
import { ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';

interface ProductAssessmentProps {
  onComplete: (data: ProductAssessmentData) => void;
  onNavigateToTab: (tab: any) => void;
}

const PRODUCT_TYPES: ProductType[] = [
  'Ayurvedic Medicine',
  'Herbal Food / Ayurveda Aahar',
  'Cosmetic',
  'Supplement',
  'Other',
  'Not Sure',
];

export const ProductAssessment: React.FC<ProductAssessmentProps> = ({ onComplete, onNavigateToTab }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Assessment form state
  const [formData, setFormData] = useState<ProductAssessmentData>({
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

  const stepsList = [
    { id: 1, label: '1. Product' },
    { id: 2, label: '2. Ingredients' },
    { id: 3, label: '3. Intended Use' },
    { id: 4, label: '4. Formulation' },
    { id: 5, label: '5. Business Goal' },
    { id: 6, label: '6. Assessment' },
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // Step 5 completed -> generate Health Check!
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="bg-[#F6F8F4] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Top Header Section matching Image 3 */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-stone-200">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#245428] font-sans mb-1.5">
              PRODUCT ASSESSMENT
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-sans text-[#162938]">
              Understand your product before you protect it.
            </h1>
            <p className="text-stone-500 text-sm mt-1">
              Keep the assessment short. You can refine details later.
            </p>
          </div>

          <div className="text-xs font-bold text-stone-500 font-sans mt-3 sm:mt-0">
            Step {currentStep} of 6
          </div>
        </div>

        {/* Main Grid: Left Stepper + Right Form Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Vertical Stepper */}
          <div className="md:col-span-4 bg-white/60 p-4 rounded-xl border border-stone-200/80">
            <nav className="space-y-1 font-sans">
              {stepsList.map((step) => {
                const isActive = currentStep === step.id;
                const isPassed = currentStep > step.id;

                return (
                  <button
                    key={step.id}
                    onClick={() => {
                      if (step.id <= 5) setCurrentStep(step.id);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-lg text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white text-[#1E3A1A] font-bold shadow-xs border-l-4 border-[#1E3A1A]'
                        : isPassed
                        ? 'text-stone-700 hover:bg-white/80'
                        : 'text-stone-400 hover:text-stone-600'
                    }`}
                  >
                    <span>{step.label}</span>
                    {isPassed && (
                      <span className="w-4 h-4 rounded-full bg-[#1E3A1A] text-white flex items-center justify-center text-[10px]">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 p-3.5 bg-[#EBF4E8] rounded-lg border border-[#CDE3C6] text-xs text-[#1E3A1A] leading-relaxed">
              <div className="font-bold flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Statutory Safe Harbor</span>
              </div>
              Your inputs will automatically be evaluated against Section 3(p) TKDL, Section 3(d), Section 3(e) synergies, and NBA Form III requirements.
            </div>
          </div>

          {/* Right Form Card matching Image 3 */}
          <div className="md:col-span-8 bg-white p-7 sm:p-9 rounded-2xl border border-stone-200/90 shadow-sm">
            {/* STEP 1: Product */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold font-sans text-stone-900 mb-1">
                    Product
                  </h2>
                  <p className="text-xs text-stone-500">
                    Define the primary identity and nature of your Ayurvedic formulation or device.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    placeholder="e.g. Herbal Cough Syrup"
                    className="w-full px-4 py-3 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1E3A1A] focus:bg-white transition-all text-stone-900 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    Product Description
                  </label>
                  <textarea
                    rows={4}
                    value={formData.productDescription}
                    onChange={(e) => setFormData({ ...formData, productDescription: e.target.value })}
                    placeholder="What is the product and what makes it different?"
                    className="w-full px-4 py-3 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1E3A1A] focus:bg-white transition-all text-stone-900 font-sans leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    Product Type
                  </label>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {PRODUCT_TYPES.map((pt) => {
                      const isSelected = formData.productType === pt;
                      return (
                        <button
                          key={pt}
                          type="button"
                          onClick={() => setFormData({ ...formData, productType: pt })}
                          className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#1E3A1A] border-[#1E3A1A] text-white shadow-xs'
                              : 'bg-white border-stone-300 text-stone-700 hover:border-stone-400 hover:bg-stone-50'
                          }`}
                        >
                          {pt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Ingredients */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold font-sans text-stone-900 mb-1">
                    Ingredients &amp; Botanical Sourcing
                  </h2>
                  <p className="text-xs text-stone-500">
                    Indian biological resources trigger mandatory NBA Form III compliance before patent grant.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    Active Herbal Ingredients (Botanical Names)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.ingredients}
                    onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                    placeholder="e.g. Adhatoda vasica (Vasaka), Ocimum sanctum (Tulsi), Curcuma longa"
                    className="w-full px-4 py-3 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1E3A1A] focus:bg-white transition-all text-stone-900 font-sans leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    Plant Parts Used
                  </label>
                  <input
                    type="text"
                    value={formData.partsUsed}
                    onChange={(e) => setFormData({ ...formData, partsUsed: e.target.value })}
                    placeholder="e.g. Leaves, Rhizome, Fruit, Seeds"
                    className="w-full px-4 py-3 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1E3A1A] focus:bg-white transition-all text-stone-900 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    Botanical Resource Origin
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { id: 'cultivated_india', label: 'Cultivated in India (BD Act 2023 Exemption Eligible)' },
                      { id: 'wild_harvested_india', label: 'Wild Harvested in India (Mandatory SBB/NBA ABS)' },
                      { id: 'imported', label: 'Imported from outside India' },
                      { id: 'synthetic', label: 'Bio-identical Synthetic / Synthetic Matrix' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, botanicalOrigin: opt.id as any })}
                        className={`p-3 text-xs font-semibold rounded-lg border text-left transition-all cursor-pointer ${
                          formData.botanicalOrigin === opt.id
                            ? 'bg-[#EBF4E8] border-[#1E3A1A] text-[#1E3A1A] shadow-2xs font-bold'
                            : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Intended Use */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold font-sans text-stone-900 mb-1">
                    Intended Use &amp; Therapeutic Claims
                  </h2>
                  <p className="text-xs text-stone-500">
                    Determines whether your product is regulated under AYUSH Rule 158B or FSSAI Ayurveda Aahara.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    Therapeutic or Intended Indication
                  </label>
                  <textarea
                    rows={3}
                    value={formData.intendedUse}
                    onChange={(e) => setFormData({ ...formData, intendedUse: e.target.value })}
                    placeholder="e.g. Relief of cough, seasonal allergies, respiratory congestion"
                    className="w-full px-4 py-3 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1E3A1A] focus:bg-white transition-all text-stone-900 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    Primary Claim Level
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { id: 'disease_therapeutic', label: 'Therapeutic Treatment / Disease Mitigation (AYUSH ASU Drug)' },
                      { id: 'wellness_immunity', label: 'General Wellness / Immunity Support (Ayurveda Aahara / FSSAI)' },
                      { id: 'cosmetic_skin_hair', label: 'Cosmetic / Topical Skin & Hair Care' },
                      { id: 'general_supplement', label: 'Dietary Supplement / Nutraceutical' }
                    ].map((claim) => (
                      <button
                        key={claim.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, targetClaim: claim.id as any })}
                        className={`p-3 text-xs font-semibold rounded-lg border text-left transition-all cursor-pointer ${
                          formData.targetClaim === claim.id
                            ? 'bg-[#EBF4E8] border-[#1E3A1A] text-[#1E3A1A] shadow-2xs font-bold'
                            : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        {claim.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    Target Consumer / Patient Group
                  </label>
                  <input
                    type="text"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    placeholder="e.g. Adults and children above 5 years"
                    className="w-full px-4 py-3 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1E3A1A] focus:bg-white transition-all text-stone-900 font-sans"
                  />
                </div>
              </div>
            )}

            {/* STEP 4: Formulation */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold font-sans text-stone-900 mb-1">
                    Formulation &amp; Technical Novelty
                  </h2>
                  <p className="text-xs text-stone-500">
                    Overcoming Section 3(p) TKDL and Section 3(d)/3(e) patentability bars.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    Formulation Architecture
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { id: 'classical_traditional', label: 'Classical Churna / Kwatha / Asava (Section 3p Barred)' },
                      { id: 'aqueous_alcoholic_extract', label: 'Standardized Solvent Extract (Needs proof of enhancement)' },
                      { id: 'novel_nano_phytosome', label: 'Nano-micelle / Phytosome Delivery (Strong Patentable Carve-Out)' },
                      { id: 'synthetic_bioactive_fraction', label: 'Synergistic Fraction with Combination Index CI < 1' }
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, formulationType: f.id as any })}
                        className={`p-3 text-xs font-semibold rounded-lg border text-left transition-all cursor-pointer ${
                          formData.formulationType === f.id
                            ? 'bg-[#EBF4E8] border-[#1E3A1A] text-[#1E3A1A] shadow-2xs font-bold'
                            : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    Is this recipe explicitly described in 54 Classical Ayurvedic Texts?
                  </label>
                  <div className="flex gap-3">
                    {[
                      { id: 'yes', label: 'Yes (Direct classical recipe)' },
                      { id: 'modified', label: 'Modified / Novel ratio' },
                      { id: 'no', label: 'No (Completely new concept)' }
                    ].map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, inClassicalTexts: c.id as any })}
                        className={`px-4 py-2.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                          formData.inClassicalTexts === c.id
                            ? 'bg-[#1E3A1A] border-[#1E3A1A] text-white shadow-xs'
                            : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    Synergy / Technological Advancement Proof
                  </label>
                  <textarea
                    rows={3}
                    value={formData.synergyOrNoveltyProof}
                    onChange={(e) => setFormData({ ...formData, synergyOrNoveltyProof: e.target.value })}
                    placeholder="Describe laboratory assays, bioavailability increase, or synergistic fraction testing..."
                    className="w-full px-4 py-3 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1E3A1A] focus:bg-white transition-all text-stone-900 font-sans"
                  />
                </div>
              </div>
            )}

            {/* STEP 5: Business Goal */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold font-sans text-stone-900 mb-1">
                    Business Goal &amp; Commercialization
                  </h2>
                  <p className="text-xs text-stone-500">
                    Determines applicant fee discounts (80% rebate for Startups) and international filing needs.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    Applicant Legal Entity Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {['Individual', 'Startup', 'Small Enterprise', 'Educational Institution', 'Other'].map((entity) => (
                      <button
                        key={entity}
                        type="button"
                        onClick={() => setFormData({ ...formData, applicantType: entity as any })}
                        className={`p-2.5 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                          formData.applicantType === entity
                            ? 'bg-[#1E3A1A] border-[#1E3A1A] text-white shadow-xs'
                            : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        {entity}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    Target Commercial Markets
                  </label>
                  <div className="flex gap-3">
                    {[
                      { id: 'india_only', label: 'India Only' },
                      { id: 'global_export', label: 'Global Export (US/EU)' },
                      { id: 'both', label: 'Both Domestic & Global' }
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, commercialJurisdiction: m.id as any })}
                        className={`px-4 py-2.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                          formData.commercialJurisdiction === m.id
                            ? 'bg-[#1E3A1A] border-[#1E3A1A] text-white shadow-xs'
                            : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    IP Strategy Focus
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { id: 'patent', label: 'Patent on Process / Delivery Platform' },
                      { id: 'trademark', label: 'Trademark & Brand Protection' },
                      { id: 'trade_secret', label: 'Trade Secret for Formulation Matrix' },
                      { id: 'all', label: 'Comprehensive IP Bundle (Patent + TM + Design)' }
                    ].map((ip) => (
                      <button
                        key={ip.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, priorityProtection: ip.id as any })}
                        className={`p-3 text-xs font-semibold rounded-lg border text-left transition-all cursor-pointer ${
                          formData.priorityProtection === ip.id
                            ? 'bg-[#EBF4E8] border-[#1E3A1A] text-[#1E3A1A] shadow-2xs font-bold'
                            : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        {ip.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Buttons matching Image 3 */}
            <div className="mt-8 pt-6 border-t border-stone-200 flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  currentStep === 1
                    ? 'text-stone-300 cursor-not-allowed'
                    : 'text-stone-600 hover:text-stone-900 border border-stone-300 hover:bg-stone-50'
                }`}
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="bg-[#1E3A1A] hover:bg-[#152D13] text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>{currentStep === 5 ? 'Run Health Check' : 'Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
