import React, { useState } from 'react';
import { PatentAssessmentRequest, PatentAssessmentResult, Regime, SourceCitation } from '../types';
import { FileCheck, AlertTriangle, ShieldCheck, CheckCircle2, XCircle, ArrowRight, BookOpen, Layers, Zap, Info, Download } from 'lucide-react';

interface PatentEvaluatorProps {
  currentLanguage: string;
  onOpenCitation: (citation: SourceCitation) => void;
}

const COMMON_HERBS = [
  'Ashwagandha (Withania somnifera)',
  'Guduchi (Tinospora cordifolia)',
  'Haridra / Curcumin (Curcuma longa)',
  'Brahmi (Bacopa monnieri)',
  'Tulsi (Ocimum sanctum)',
  'Triphala (Amalaki, Bibhitaki, Haritaki)',
  'Pippali (Piper longum)',
  'Guggulu (Commiphora mukul)',
  'Neem (Azadirachta indica)',
  'Shatavari (Asparagus racemosus)',
  'Bhumyamalaki (Phyllanthus amarus)',
  'Arjuna (Terminalia arjuna)'
];

export const PatentEvaluator: React.FC<PatentEvaluatorProps> = ({
  currentLanguage,
  onOpenCitation,
}) => {
  const [formData, setFormData] = useState<PatentAssessmentRequest>({
    inventionTitle: 'Standardized Synergistic Phytosomal Complex of Ashwagandha and Guduchi for Neuroprotection',
    herbsUsed: ['Ashwagandha (Withania somnifera)', 'Guduchi (Tinospora cordifolia)'],
    compositionType: 'nano_delivery_formulation',
    noveltyDescription: 'A phospholipid-complexed nano-phytosomal delivery formulation (particle size <150nm) exhibiting 4.2-fold higher blood-brain barrier permeability and synergistic inhibition of neuro-inflammation at a 3:1 molar ratio.',
    processingMethod: 'Ethanolic fractionation followed by stoichiometric complexation with phosphatidylcholine under controlled ultrasonic cavitation.',
    targetDiseaseOrIndication: 'Neurodegenerative disorders / Cognitive protection',
    hasBioAssayData: true,
    hasSynergyIndexData: true,
    biologicalMaterialOrigin: 'india_cultivated',
    applicantType: 'indian_entity',
    targetJurisdictions: ['india', 'uspto', 'epo', 'wipo'],
    language: currentLanguage,
  });

  const [customHerb, setCustomHerb] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [result, setResult] = useState<PatentAssessmentResult | null>(null);

  const toggleHerb = (herb: string) => {
    setFormData((prev) => {
      const exists = prev.herbsUsed.includes(herb);
      return {
        ...prev,
        herbsUsed: exists ? prev.herbsUsed.filter((h) => h !== herb) : [...prev.herbsUsed, herb],
      };
    });
  };

  const addCustomHerb = () => {
    if (customHerb.trim() && !formData.herbsUsed.includes(customHerb.trim())) {
      setFormData((prev) => ({
        ...prev,
        herbsUsed: [...prev.herbsUsed, customHerb.trim()],
      }));
      setCustomHerb('');
    }
  };

  const runEvaluation = async () => {
    if (!formData.inventionTitle.trim() || formData.herbsUsed.length === 0) {
      alert('Please provide an invention title and at least one Ayurvedic botanical ingredient.');
      return;
    }

    setEvaluating(true);
    try {
      const res = await fetch('/api/assess-patentability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, language: currentLanguage }),
      });

      if (!res.ok) {
        throw new Error('Assessment evaluation failed');
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      alert('Failed to evaluate invention: ' + err.message);
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-serif">
      <div className="mb-6 border-b border-[#DED9C4] pb-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B8860B] font-sans mb-1">
          <FileCheck className="w-4 h-4 text-[#B8860B]" />
          <span>Yogyata Parikshan (योग्यता परीक्षण)</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black italic tracking-tight text-[#2D4F1E]">
          Ayurvedic Patentability &amp; Regulatory Triage
        </h2>
        <p className="text-sm sm:text-base text-stone-700 mt-1 max-w-3xl leading-relaxed">
          Automated legal screening against Indian Patents Act Sections 3(p), 3(d), 3(e), 
          TKDL anticipatory prior art, National Biodiversity Authority (NBA Form III) triggers, 
          Drugs &amp; Cosmetics Rule 158B, and USPTO/EPO eligibility standards.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Innovation Parameters */}
        <div className="lg:col-span-6 bg-[#FAF7ED] border border-[#DED9C4] p-6 shadow-2xs space-y-5">
          <h3 className="text-base font-bold text-[#2D4F1E] pb-2 border-b border-[#DED9C4] flex items-center gap-2 font-sans uppercase tracking-wider text-xs">
            <Layers className="w-4 h-4 text-[#B8860B]" />
            1. Formulation &amp; Invention Profile
          </h3>

          {/* Title */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#2D4F1E] font-sans mb-1.5">
              Invention Title / Proposed Patent Subject
            </label>
            <input
              type="text"
              value={formData.inventionTitle}
              onChange={(e) => setFormData({ ...formData, inventionTitle: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-white border border-[#DED9C4] focus:border-[#2D4F1E] focus:outline-hidden text-[#1A1A1A] font-sans"
              placeholder="e.g. Synergistic botanical extract of Withania somnifera..."
            />
          </div>

          {/* Herbs Selection */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#2D4F1E] font-sans mb-1.5">
              Ayurvedic Botanical Ingredients Used ({formData.herbsUsed.length} selected)
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2.5 max-h-36 overflow-y-auto p-2 bg-white border border-[#DED9C4] font-sans">
              {COMMON_HERBS.map((herb) => {
                const selected = formData.herbsUsed.includes(herb);
                return (
                  <button
                    key={herb}
                    type="button"
                    onClick={() => toggleHerb(herb)}
                    className={`px-2.5 py-1 text-xs transition-all font-medium flex items-center gap-1 cursor-pointer ${
                      selected
                        ? 'bg-[#2D4F1E] text-[#FDFCF6] font-bold shadow-2xs'
                        : 'bg-[#FAF7ED] text-[#2D4F1E] border border-[#DED9C4] hover:bg-[#FFF9E5] hover:border-[#B8860B]'
                    }`}
                  >
                    <span>{selected ? '✓' : '+'}</span>
                    <span>{herb.split(' (')[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Custom herb input */}
            <div className="flex gap-2 font-sans">
              <input
                type="text"
                value={customHerb}
                onChange={(e) => setCustomHerb(e.target.value)}
                placeholder="Add other classical herb / Sanskrit name..."
                className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#DED9C4] focus:outline-hidden"
              />
              <button
                type="button"
                onClick={addCustomHerb}
                className="px-4 py-1.5 bg-[#2D4F1E] text-[#FDFCF6] text-xs font-bold uppercase tracking-wider hover:bg-[#1f3714] cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>

          {/* Composition Type */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#2D4F1E] font-sans mb-1.5">
              Composition Characterization (Crucial for Sec 3(p) &amp; 3(e))
            </label>
            <select
              value={formData.compositionType}
              onChange={(e) => setFormData({ ...formData, compositionType: e.target.value as any })}
              className="w-full px-3.5 py-2 text-sm border border-[#DED9C4] bg-white text-[#1A1A1A] font-sans focus:border-[#2D4F1E] focus:outline-hidden"
            >
              <option value="classical_combination">
                Classical Ayurvedic Combination (Documented in Samhitas / Formularies)
              </option>
              <option value="modified_ratio">
                Modified Herb Proportions / Novel Ratio of Known Herbs
              </option>
              <option value="isolated_extract">
                Standardized Single Phytochemical Extract / Enriched Fraction
              </option>
              <option value="synergistic_fraction">
                Synergistic Multi-Fraction with Combination Index (CI &lt; 1)
              </option>
              <option value="nano_delivery_formulation">
                Novel Delivery Platform (Phytosomes, Liposomes, Nano-emulsions)
              </option>
              <option value="synthetic_derivative">
                Chemically Functionalized Semi-Synthetic Analogue
              </option>
            </select>
          </div>

          {/* Novelty Description */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#2D4F1E] font-sans mb-1.5">
              Technical Problem &amp; Purported Novelty
            </label>
            <textarea
              rows={2}
              value={formData.noveltyDescription}
              onChange={(e) => setFormData({ ...formData, noveltyDescription: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-white border border-[#DED9C4] focus:border-[#2D4F1E] focus:outline-hidden font-serif text-[#1A1A1A]"
              placeholder="Explain how this transcends traditional knowledge or achieves unexpected therapeutic efficacy..."
            />
          </div>

          {/* Processing / Extraction Method */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#2D4F1E] font-sans mb-1.5">
              Processing &amp; Extraction Technology
            </label>
            <input
              type="text"
              value={formData.processingMethod}
              onChange={(e) => setFormData({ ...formData, processingMethod: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-white border border-[#DED9C4] focus:border-[#2D4F1E] focus:outline-hidden font-sans text-[#1A1A1A]"
              placeholder="e.g. Classical Kwatha, Supercritical CO2, Ultrasonic cavitation, Phospholipid complexation..."
            />
          </div>

          {/* Target Disease */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#2D4F1E] font-sans mb-1.5">
              Target Therapeutic Indication
            </label>
            <input
              type="text"
              value={formData.targetDiseaseOrIndication}
              onChange={(e) => setFormData({ ...formData, targetDiseaseOrIndication: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-white border border-[#DED9C4] focus:border-[#2D4F1E] focus:outline-hidden font-sans text-[#1A1A1A]"
            />
          </div>

          {/* Checkboxes: Data Availability */}
          <div className="bg-[#FFF9E5] p-3.5 border border-[#B8860B]/50 space-y-2.5 font-sans">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B] block">
              Experimental Evidence Available:
            </span>

            <label className="flex items-center gap-2.5 text-xs text-[#2D4F1E] font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={formData.hasBioAssayData}
                onChange={(e) => setFormData({ ...formData, hasBioAssayData: e.target.checked })}
                className="accent-[#2D4F1E]"
              />
              <span>In Vitro / In Vivo bio-potency assay data demonstrating enhanced efficacy (Sec 3(d))</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs text-[#2D4F1E] font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={formData.hasSynergyIndexData}
                onChange={(e) => setFormData({ ...formData, hasSynergyIndexData: e.target.checked })}
                className="accent-[#2D4F1E]"
              />
              <span>Quantified Combination Index (CI &lt; 1) or isobologram proving synergism over mere admixture (Sec 3(e))</span>
            </label>
          </div>

          {/* Origin & Applicant Type for NBA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#2D4F1E] mb-1">
                Biological Resource Origin
              </label>
              <select
                value={formData.biologicalMaterialOrigin}
                onChange={(e) => setFormData({ ...formData, biologicalMaterialOrigin: e.target.value as any })}
                className="w-full px-3 py-1.5 text-xs border border-[#DED9C4] bg-white text-[#1A1A1A]"
              >
                <option value="india_cultivated">Cultivated in India (GAP certified)</option>
                <option value="india_wild">Wild-harvested in Indian Forests</option>
                <option value="imported">Imported from Foreign Jurisdiction</option>
                <option value="synthetic">Synthetic Botanical Analogue</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#2D4F1E] mb-1">
                Applicant Entity Type
              </label>
              <select
                value={formData.applicantType}
                onChange={(e) => setFormData({ ...formData, applicantType: e.target.value as any })}
                className="w-full px-3 py-1.5 text-xs border border-[#DED9C4] bg-white text-[#1A1A1A]"
              >
                <option value="indian_entity">Indian Citizen / Indian MSME</option>
                <option value="foreign_collaborator_or_nri">Foreign Collaborator / NRI</option>
                <option value="multinational">Multinational Corporation</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={runEvaluation}
            disabled={evaluating}
            className="w-full py-3.5 bg-[#2D4F1E] hover:bg-[#1f3714] disabled:opacity-50 text-[#FDFCF6] font-sans text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-[3px_3px_0px_#B8860B] transition-all cursor-pointer"
          >
            {evaluating ? (
              <>
                <div className="w-4 h-4 border-2 border-[#FDFCF6] border-t-transparent rounded-full animate-spin" />
                <span>Screening against TKDL, Sec 3(p), Sec 3(e) &amp; NBA...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-[#B8860B]" />
                <span>Execute Patentability &amp; Regulatory Audit</span>
              </>
            )}
          </button>
        </div>

        {/* Right Panel: Audit Report & Roadblocks */}
        <div className="lg:col-span-6 space-y-5">
          {!result && !evaluating && (
            <div className="bg-[#FAF7ED] border border-dashed border-[#DED9C4] p-12 text-center text-[#2D4F1E]">
              <FileCheck className="w-12 h-12 text-[#B8860B]/60 mx-auto mb-3" />
              <h3 className="text-lg font-bold font-serif text-[#2D4F1E]">Dossier Screening Ready</h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-md mx-auto leading-relaxed">
                Configure your formulation profile on the left and click "Execute Patentability &amp; Regulatory Audit" 
                to generate a legally grounded evaluation across national and international regimes.
              </p>
            </div>
          )}

          {evaluating && (
            <div className="bg-white border-2 border-[#2D4F1E] p-12 text-center shadow-[4px_4px_0px_#2D4F1E]">
              <div className="w-10 h-10 border-3 border-[#2D4F1E] border-t-[#B8860B] rounded-full animate-spin mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#2D4F1E]">Conducting RAG Patentability Audit</h3>
              <p className="text-xs text-stone-600 mt-2 max-w-md mx-auto">
                Cross-referencing Traditional Knowledge Digital Library (TKDL) IPC A61K 36/00,
                Indian Patent Act Section 3(p), Section 3(e), NBA Section 6 Form III, and USPTO 101 rules...
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-5 animate-fadeIn">
              {/* Scorecard Box */}
              <div className="bg-white border-2 border-[#2D4F1E] p-6 shadow-[4px_4px_0px_#2D4F1E]">
                <div className="flex items-center justify-between pb-4 border-b border-[#DED9C4]">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B] font-sans">
                      Diagnostic Examination Result
                    </div>
                    <h3 className="text-2xl font-bold font-serif text-[#2D4F1E] mt-0.5">
                      Patentability Feasibility Index
                    </h3>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl font-extrabold text-[#2D4F1E] font-serif flex items-center gap-1 justify-end">
                      <span className={
                        result.feasibilityScore >= 70 ? 'text-[#2D4F1E]' :
                        result.feasibilityScore >= 45 ? 'text-[#B8860B]' : 'text-rose-700'
                      }>
                        {result.feasibilityScore}
                      </span>
                      <span className="text-sm font-normal text-stone-400">/ 100</span>
                    </div>
                    <span className={`inline-block px-2.5 py-0.5 text-[10px] font-sans uppercase font-bold mt-1 ${
                      result.riskLevel === 'LOW' ? 'bg-[#2D4F1E] text-[#FDFCF6]' :
                      result.riskLevel === 'MEDIUM' ? 'bg-[#B8860B] text-[#FDFCF6]' :
                      'bg-rose-900 text-white'
                    }`}>
                      Risk: {result.riskLevel.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>

                {/* Meter Bar */}
                <div className="mt-4">
                  <div className="h-2.5 w-full bg-[#FAF7ED] border border-[#DED9C4] overflow-hidden flex">
                    <div
                      className={`h-full transition-all duration-700 ${
                        result.feasibilityScore >= 70 ? 'bg-[#2D4F1E]' :
                        result.feasibilityScore >= 45 ? 'bg-[#B8860B]' : 'bg-rose-700'
                      }`}
                      style={{ width: `${result.feasibilityScore}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-sans uppercase font-semibold text-stone-500 mt-1.5">
                    <span>Statutory Bar (0-35)</span>
                    <span>Rejection Risk (36-60)</span>
                    <span>Carveout Safe Harbor (61-100)</span>
                  </div>
                </div>
              </div>

              {/* Statutory Roadblocks */}
              {result.roadblocks.length > 0 && (
                <div className="bg-[#FFF9E5] border border-[#B8860B] p-5">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B] font-sans mb-3 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-[#B8860B]" />
                    <span>Identified Statutory Roadblocks &amp; Prior Art Bars</span>
                  </h4>
                  <div className="space-y-2.5">
                    {result.roadblocks.map((rb, idx) => (
                      <div key={idx} className="bg-white p-3.5 border border-[#DED9C4] text-xs">
                        <div className="flex items-center justify-between font-bold text-[#2D4F1E] mb-1 font-sans">
                          <span>{rb.section}</span>
                          <span className={`px-2 py-0.5 text-[9px] uppercase font-extrabold ${
                            rb.severity === 'fatal' ? 'bg-rose-900 text-white' : 'bg-[#B8860B] text-white'
                          }`}>
                            {rb.severity}
                          </span>
                        </div>
                        <p className="text-stone-800 leading-relaxed font-serif">{rb.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Patentable Carve-outs & Drafting Strategy */}
              {result.patentableCarveouts.length > 0 && (
                <div className="bg-[#FAF7ED] border border-[#2D4F1E] p-5">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#2D4F1E] font-sans mb-3 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#2D4F1E]" />
                    <span>Recommended Patentable Carve-Outs &amp; Claim Formulations</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-stone-800 font-serif">
                    {result.patentableCarveouts.map((carveout, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-white p-3 border border-[#DED9C4]">
                        <CheckCircle2 className="w-4 h-4 text-[#2D4F1E] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{carveout}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* NBA Compliance Requirement */}
              <div className="bg-[#FAF7ED] border border-[#DED9C4] p-5">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B] font-sans mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#B8860B]" />
                  <span>Mandatory National Biodiversity Authority (NBA) Protocol</span>
                </h4>
                {result.nbaComplianceRequirements.map((nba, idx) => (
                  <div key={idx} className="bg-white p-3.5 border border-[#DED9C4] text-xs mb-2">
                    <div className="font-bold text-[#2D4F1E] mb-0.5 font-sans">
                      {nba.formRequired} - Trigger: {nba.trigger}
                    </div>
                    <p className="text-stone-700 font-serif">{nba.stepToTake}</p>
                    <div className="text-[10px] text-[#B8860B] font-sans font-bold uppercase mt-1">
                      Critical Deadline: {nba.deadline}
                    </div>
                  </div>
                ))}
              </div>

              {/* Drug Licensing Rule 158B */}
              <div className="bg-[#FAF7ED] border border-[#DED9C4] p-5 text-xs text-stone-800">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#2D4F1E] font-sans mb-2">
                  Drug Licensing Pathway under Rule 158B (D&amp;C Rules 1945)
                </h4>
                <div className="p-3.5 bg-white border border-[#DED9C4]">
                  <div className="font-bold text-[#2D4F1E] mb-1 font-sans text-xs">
                    Classification: {result.regulatoryDrugLicensing.category}
                  </div>
                  <div className="text-stone-700 mb-2 font-serif">
                    Clinical Trial Status:{' '}
                    <strong className="text-[#2D4F1E]">
                      {result.regulatoryDrugLicensing.clinicalTrialNeeded
                        ? 'Mandatory (Phase I safety & Phase II/III efficacy required)'
                        : 'Exempt (Classical Samhita proof admissible)'}
                    </strong>
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-stone-700 font-serif">
                    {result.regulatoryDrugLicensing.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Citations */}
              <div className="pt-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500 font-sans block mb-2">
                  Cited Statutory Grounds:
                </span>
                <div className="flex flex-wrap gap-2 font-sans">
                  {result.citations.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => onOpenCitation(c)}
                      className="px-2.5 py-1 bg-white hover:bg-[#FFF9E5] border border-[#DED9C4] hover:border-[#B8860B] text-xs font-semibold text-[#2D4F1E] transition-colors cursor-pointer shadow-2xs"
                    >
                      {c.id} ({c.statutoryReference.split(',')[0]})
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
