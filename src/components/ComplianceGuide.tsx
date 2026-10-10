import React, { useState } from 'react';
import { FileText, CheckCircle, Scale, ShieldCheck, AlertCircle, ArrowRight, BookOpen, ExternalLink } from 'lucide-react';

export const ComplianceGuide: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'nba' | 'rule158b' | 'crossborder'>('nba');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-serif">
      <div className="mb-6 border-b border-[#DED9C4] pb-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B8860B] font-sans mb-1">
          <Scale className="w-4 h-4 text-[#B8860B]" />
          <span>Niyamak Margdarshika (नियामक मार्गदर्शिका)</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black italic tracking-tight text-[#2D4F1E]">
          Regulatory Compliance &amp; Mandatory Statutory Filings
        </h2>
        <p className="text-sm sm:text-base text-stone-700 mt-1 max-w-3xl leading-relaxed font-serif">
          Practical step-by-step roadmaps for National Biodiversity Authority (NBA Form III) clearance, 
          Ayurvedic Drug Licensing under Rule 158B, and international cross-border export standards.
        </p>
      </div>

      {/* Sub-tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-[#DED9C4] pb-3 font-sans">
        <button
          onClick={() => setActiveSubTab('nba')}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border cursor-pointer ${
            activeSubTab === 'nba'
              ? 'bg-[#2D4F1E] text-[#FDFCF6] border-[#2D4F1E] shadow-[2px_2px_0px_#B8860B]'
              : 'bg-white text-[#2D4F1E] border-[#DED9C4] hover:bg-[#FFF9E5] hover:border-[#B8860B]'
          }`}
        >
          🌿 NBA &amp; ABS Compliance (Form I to IV)
        </button>

        <button
          onClick={() => setActiveSubTab('rule158b')}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border cursor-pointer ${
            activeSubTab === 'rule158b'
              ? 'bg-[#2D4F1E] text-[#FDFCF6] border-[#2D4F1E] shadow-[2px_2px_0px_#B8860B]'
              : 'bg-white text-[#2D4F1E] border-[#DED9C4] hover:bg-[#FFF9E5] hover:border-[#B8860B]'
          }`}
        >
          💊 Rule 158B ASU Drug Licensing
        </button>

        <button
          onClick={() => setActiveSubTab('crossborder')}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border cursor-pointer ${
            activeSubTab === 'crossborder'
              ? 'bg-[#2D4F1E] text-[#FDFCF6] border-[#2D4F1E] shadow-[2px_2px_0px_#B8860B]'
              : 'bg-white text-[#2D4F1E] border-[#DED9C4] hover:bg-[#FFF9E5] hover:border-[#B8860B]'
          }`}
        >
          🌐 Cross-Border Regulatory (US / EU / WIPO)
        </button>
      </div>

      {/* NBA Form Section */}
      {activeSubTab === 'nba' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#FAF7ED] border border-[#2D4F1E] p-5 shadow-2xs">
            <h3 className="text-base font-bold text-[#2D4F1E] mb-1 flex items-center gap-2 font-serif">
              <ShieldCheck className="w-5 h-5 text-[#B8860B]" />
              <span>National Biodiversity Authority (NBA) Statutory Mandate</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-serif">
              Under the <strong>Biological Diversity Act, 2002</strong> (and Biological Diversity Amendment Act, 2023), 
              any research or patent application based on an Indian biological resource (herbs, plants, seeds) 
              mandates prior approvals from the National Biodiversity Authority (NBA), Chennai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Form III - IPR Application */}
            <div className="bg-white border-2 border-[#2D4F1E] p-6 shadow-[3px_3px_0px_#2D4F1E] relative">
              <div className="absolute top-4 right-4 px-2 py-0.5 bg-[#2D4F1E] text-[#FDFCF6] text-[10px] font-sans font-bold uppercase tracking-wider">
                Patent Essential
              </div>
              <h4 className="text-lg font-bold text-[#2D4F1E] mb-1 font-serif">
                NBA Form III: Application for IPR
              </h4>
              <div className="text-xs font-bold font-sans uppercase tracking-wider text-[#B8860B] mb-3">
                Section 6(1) of Biological Diversity Act, 2002
              </div>
              <p className="text-xs text-stone-700 mb-4 leading-relaxed font-serif">
                Mandatory for any person (Indian or foreign) applying for any intellectual property right, 
                whether in India or outside India, for any invention based on Indian biological resources or associated knowledge.
              </p>
              <div className="bg-[#FAF7ED] p-3.5 border border-[#DED9C4] text-xs space-y-1.5 text-stone-800 font-serif">
                <div><strong className="text-[#2D4F1E]">When to file:</strong> Before grant of Indian Patent or before filing PCT national phase abroad.</div>
                <div><strong className="text-[#2D4F1E]">Official Fee:</strong> ₹500 (Indian individuals/startups) / ₹10,000+ (corporate entities).</div>
                <div><strong className="text-[#2D4F1E]">ABS Trigger:</strong> Commercialization triggers 0.1% to 0.5% ex-factory sale benefit-sharing levy.</div>
              </div>
            </div>

            {/* Form I - Access by Foreigners */}
            <div className="bg-[#FAF7ED] border border-[#DED9C4] p-5 shadow-2xs">
              <h4 className="text-lg font-bold text-[#2D4F1E] mb-1 font-serif">
                NBA Form I: Access to Biological Resources
              </h4>
              <div className="text-xs font-bold font-sans uppercase tracking-wider text-stone-500 mb-3">
                Section 3 of Biological Diversity Act, 2002
              </div>
              <p className="text-xs text-stone-700 mb-4 leading-relaxed font-serif">
                Mandatory for non-citizens, NRIs, foreign entities, or Indian companies with any foreign shareholding 
                wishing to access Indian biological resources for research or commercial utilization.
              </p>
              <div className="bg-white p-3.5 border border-[#DED9C4] text-xs space-y-1.5 text-stone-800 font-serif">
                <div><strong className="text-[#2D4F1E]">When to file:</strong> Before collection or purchase of raw Ayurvedic plants in India.</div>
                <div><strong className="text-[#2D4F1E]">Competent Body:</strong> National Biodiversity Authority, Chennai.</div>
              </div>
            </div>

            {/* Form II - Transfer of Research */}
            <div className="bg-[#FAF7ED] border border-[#DED9C4] p-5 shadow-2xs">
              <h4 className="text-lg font-bold text-[#2D4F1E] mb-1 font-serif">
                NBA Form II: Transfer of Research Results
              </h4>
              <div className="text-xs font-bold font-sans uppercase tracking-wider text-stone-500 mb-3">
                Section 4 of Biological Diversity Act, 2002
              </div>
              <p className="text-xs text-stone-700 mb-4 leading-relaxed font-serif">
                Mandatory before transferring research results relating to any Indian biological resources 
                to persons who are non-citizens or incorporated/registered outside India.
              </p>
            </div>

            {/* 2023 Amendment Exemptions */}
            <div className="bg-[#FFF9E5] border border-[#B8860B] p-5 shadow-2xs">
              <h4 className="text-lg font-bold text-[#2D4F1E] mb-1 font-serif">
                2023 Amendment Key Exemptions
              </h4>
              <div className="text-xs font-bold font-sans uppercase tracking-wider text-[#B8860B] mb-3">
                Biological Diversity (Amendment) Act, 2023
              </div>
              <ul className="text-xs text-stone-800 space-y-2 list-disc pl-4 font-serif">
                <li>Registered AYUSH practitioners (Vaidyas, Hakims) exempt from prior intimation to SBB.</li>
                <li>Certified cultivated medicinal plants (with traceability proofs) exempt from certain ABS payments.</li>
                <li>Decriminalized statutory offenses; shifted criminal liability to civil monetary adjudications.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Rule 158B Section */}
      {activeSubTab === 'rule158b' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#FAF7ED] border border-[#DED9C4] p-6 shadow-2xs">
            <h3 className="text-xl font-bold text-[#2D4F1E] mb-2 font-serif">
              Rule 158B of Drugs &amp; Cosmetics Rules 1945: Licensing Matrix
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 mb-5 leading-relaxed font-serif">
              The State Licensing Authority (SLA) issues manufacturing licenses under Chapter IV-A based on 
              whether an Ayurvedic drug is strictly classical or a proprietary invention.
            </p>

            <div className="overflow-x-auto border border-[#DED9C4]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#2D4F1E] text-[#FDFCF6] font-sans">
                    <th className="p-3 font-bold uppercase tracking-wider text-[11px]">Regulatory Parameter</th>
                    <th className="p-3 font-bold uppercase tracking-wider text-[11px] text-[#FFF9E5]">Classical Ayurvedic Medicine (158B(A))</th>
                    <th className="p-3 font-bold uppercase tracking-wider text-[11px] text-[#B8860B]">Patent or Proprietary ASU Medicine (158B(B))</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DED9C4] text-stone-800 font-serif">
                  <tr className="bg-white">
                    <td className="p-3 font-semibold bg-[#FAF7ED] text-[#2D4F1E]">Formulation Basis</td>
                    <td className="p-3">Manufactured strictly as per recipes in First Schedule texts (Charaka, Sushruta, Sharangadhara).</td>
                    <td className="p-3">New combinations, novel extracts, or modified ratios not in authoritative classical texts.</td>
                  </tr>
                  <tr className="bg-[#FAF7ED]/40">
                    <td className="p-3 font-semibold bg-[#FAF7ED] text-[#2D4F1E]">Patentability (Sec 3(p))</td>
                    <td className="p-3 text-rose-800 font-bold">Strictly Non-Patentable (Section 3(p) statutory bar).</td>
                    <td className="p-3 text-[#2D4F1E] font-bold">Potentially Patentable if genuine synergy (Sec 3(e)) or novel delivery is proven.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 font-semibold bg-[#FAF7ED] text-[#2D4F1E]">Clinical Trial Requirement</td>
                    <td className="p-3 text-[#2D4F1E] font-semibold">Exempt from clinical trials; classical bibliographic citation suffices.</td>
                    <td className="p-3 text-[#B8860B] font-semibold">Mandatory Phase I safety, acute toxicity, and published clinical trials.</td>
                  </tr>
                  <tr className="bg-[#FAF7ED]/40">
                    <td className="p-3 font-semibold bg-[#FAF7ED] text-[#2D4F1E]">Quality &amp; Safety Proofs</td>
                    <td className="p-3">Schedule T GMP compliance, heavy metals, microbial load, pesticide residue tests.</td>
                    <td className="p-3">Schedule T GMP, marker-based HPLC/HPTLC fingerprinting, accelerated stability studies.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 font-semibold bg-[#FAF7ED] text-[#2D4F1E]">Schedule E(1) Warning</td>
                    <td className="p-3">Required if containing poisonous plants (Vatsanabha, Bhallataka, Dhatura, etc.).</td>
                    <td className="p-3">Required with dosage contraindications on outer carton label.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Cross-Border Matrix */}
      {activeSubTab === 'crossborder' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* USA */}
            <div className="bg-[#FAF7ED] border border-[#DED9C4] p-5 shadow-2xs hover:border-[#2D4F1E] hover:shadow-[3px_3px_0px_#2D4F1E] transition-all">
              <div className="text-xl mb-1">🇺🇸 United States</div>
              <h4 className="text-base font-bold text-[#2D4F1E] mb-2 font-serif">FDA &amp; USPTO Regime</h4>
              <ul className="text-xs text-stone-700 space-y-2 font-serif">
                <li><strong className="text-[#1A1A1A]">DSHEA 1994 Pathway:</strong> Market as Dietary Supplement. Must NOT make disease treatment claims. Only "Structure/Function" claims.</li>
                <li><strong className="text-[#1A1A1A]">CDER Botanical IND:</strong> Complex herbal extracts approved as prescription drugs (e.g. Veregen) require standard clinical trials.</li>
                <li><strong className="text-[#1A1A1A]">35 U.S.C. 101:</strong> Natural products doctrine (Alice/Myriad) bars isolated natural compounds without markedly different characteristics.</li>
              </ul>
            </div>

            {/* European Union */}
            <div className="bg-[#FAF7ED] border border-[#DED9C4] p-5 shadow-2xs hover:border-[#2D4F1E] hover:shadow-[3px_3px_0px_#2D4F1E] transition-all">
              <div className="text-xl mb-1">🇪🇺 European Union</div>
              <h4 className="text-base font-bold text-[#2D4F1E] mb-2 font-serif">EMA &amp; EPO Regime</h4>
              <ul className="text-xs text-stone-700 space-y-2 font-serif">
                <li><strong className="text-[#1A1A1A]">THMPD (Directive 2004/24/EC):</strong> Requires 30 years traditional use, including at least 15 years within the EU.</li>
                <li><strong className="text-[#1A1A1A]">EFSA Food Supplements:</strong> Standard entry route for Ayurvedic herbs without medicinal claims.</li>
                <li><strong className="text-[#1A1A1A]">EPC Article 56:</strong> EPO requires experimental proof of unexpected synergistic technical effect.</li>
              </ul>
            </div>

            {/* WIPO 2024 Treaty */}
            <div className="bg-[#FAF7ED] border border-[#DED9C4] p-5 shadow-2xs hover:border-[#2D4F1E] hover:shadow-[3px_3px_0px_#2D4F1E] transition-all">
              <div className="text-xl mb-1">🌐 WIPO Global</div>
              <h4 className="text-base font-bold text-[#2D4F1E] mb-2 font-serif">Treaty on IP &amp; Genetic Resources (2024)</h4>
              <ul className="text-xs text-stone-700 space-y-2 font-serif">
                <li><strong className="text-[#1A1A1A]">Mandatory Disclosure:</strong> Applicants in all signatory patent offices must disclose the country of origin of biological materials.</li>
                <li><strong className="text-[#1A1A1A]">TKDL Interconnection:</strong> Direct integration with international patent office examination systems.</li>
                <li><strong className="text-[#1A1A1A]">Sanctions:</strong> False declaration or concealment can result in revocation or unenforceability.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
