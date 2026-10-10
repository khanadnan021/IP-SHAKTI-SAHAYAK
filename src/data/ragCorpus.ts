import { SourceCitation, LandmarkCase, LanguageOption } from '../types';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' }
];

export const RAG_CITATIONS: SourceCitation[] = [
  {
    id: 'IND-PAT-3P',
    title: 'Indian Patents Act 1970 - Section 3(p): Traditional Knowledge Non-Patentability Bar',
    category: 'patent_law',
    regime: 'india',
    statutoryReference: 'The Patents Act, 1970, Section 3, Clause (p)',
    authority: 'Indian Patent Office (CGPDTM) / Ministry of Commerce and Industry',
    summary: 'Explicit statutory bar stating that an invention which in effect is traditional knowledge or which is an aggregation or duplication of known properties of traditionally known component or components is NOT an invention.',
    keyArticlesOrSections: ['Section 3(p)', 'Section 2(1)(j)', 'Manual of Patent Office Practice and Procedure - Chapter 03'],
    canonicalUrl: 'https://ipindia.gov.in/patents.htm',
    practicalImplication: 'Direct Ayurvedic herb powders, decoctions (kwatha), or simple extracts cannot be patented in India. Innovators must prove non-obvious synergistic ratios (Combination Index < 1), novel delivery vehicles (e.g., targeted phytosomes), or unexpected bio-enhancement not disclosed in classical Samhitas.'
  },
  {
    id: 'IND-PAT-3D',
    title: 'Indian Patents Act 1970 - Section 3(d): Incremental Innovation & Enhanced Efficacy',
    category: 'patent_law',
    regime: 'india',
    statutoryReference: 'The Patents Act, 1970, Section 3, Clause (d)',
    authority: 'Indian Patent Office (CGPDTM) / Supreme Court Novartis Precedent',
    summary: 'The mere discovery of a new form of a known substance which does not result in the enhancement of the known efficacy of that substance is not patentable.',
    keyArticlesOrSections: ['Section 3(d)', 'Novartis AG v. Union of India (2013) 6 SCC 1'],
    canonicalUrl: 'https://ipindia.gov.in',
    practicalImplication: 'When creating an isolated phytochemical derivative from an Ayurvedic herb (e.g., modified withanolides from Ashwagandha or curcuminoids from Haridra), applicants must demonstrate therapeutic efficacy enhancement, not just improved bioavailability or pharmacokinetic parameter changes.'
  },
  {
    id: 'IND-PAT-3E',
    title: 'Indian Patents Act 1970 - Section 3(e): Mere Admixture & Synergy Proof Requirement',
    category: 'patent_law',
    regime: 'india',
    statutoryReference: 'The Patents Act, 1970, Section 3, Clause (e)',
    authority: 'Indian Patent Office (CGPDTM)',
    summary: 'A substance obtained by a mere admixture resulting only in the aggregation of the properties of the components thereof or a process for producing such substance is non-patentable.',
    keyArticlesOrSections: ['Section 3(e)', 'Guidelines for Examination of Patent Applications in the Field of Pharmaceuticals'],
    canonicalUrl: 'https://ipindia.gov.in',
    practicalImplication: 'Formulations combining two or more Ayurvedic herbs (e.g., Trikatu + Guduchi) are automatically rejected as mere admixtures unless quantitative in vitro / in vivo data establishes genuine synergy (Chou-Talalay Combination Index or isobologram showing supra-additive effect).'
  },
  {
    id: 'IND-PAT-10-4',
    title: 'Indian Patents Act 1970 - Section 10(4)(ii)(D): Mandatory Disclosure of Biological Origin',
    category: 'patent_law',
    regime: 'india',
    statutoryReference: 'The Patents Act, 1970, Section 10(4)(ii)(D)',
    authority: 'Controller General of Patents, Designs and Trade Marks',
    summary: 'Mandates that the patent specification must disclose the source and geographical origin of biological material used in an invention, and failure to do so or false disclosure is grounds for pre-grant and post-grant opposition (Section 25) or revocation (Section 64(1)(p)).',
    keyArticlesOrSections: ['Section 10(4)(ii)(D)', 'Section 25(1)(j)', 'Section 64(1)(p)'],
    canonicalUrl: 'https://ipindia.gov.in',
    practicalImplication: 'All Ayurvedic patents originating from Indian botanical specimens must declare the exact harvesting state/district in India and declare compliance with the Biological Diversity Act.'
  },
  {
    id: 'TKDL-CORPUS',
    title: 'Traditional Knowledge Digital Library (TKDL) Corpus & Prior Art Integration',
    category: 'tkdl',
    regime: 'india',
    statutoryReference: 'CSIR & Ministry of AYUSH TKDL Access Agreement Framework',
    authority: 'Council of Scientific and Industrial Research (CSIR) & Ministry of AYUSH, Govt of India',
    summary: 'A pioneering digital repository translating classical Ayurvedic, Unani, Siddha, and Sowa-Rigpa texts into 5 international languages (English, German, French, Spanish, Japanese) formatted into Traditional Knowledge Resource Classification (TKRC) mapped to IPC (A61K 36/00). Contains over 450,000 formulations.',
    keyArticlesOrSections: ['TKRC Code A61K 36/00', 'WIPO IPC Classification Section A61K', 'TKDL Access Agreements with EPO, USPTO, JPO, CIPO, IP Australia, Rospatent'],
    canonicalUrl: 'https://www.tkdl.res.in',
    practicalImplication: 'Major international patent offices routinely search TKDL before granting botanical patents. Patent examiners reject claims if an Ayurvedic combination exists in Charaka Samhita, Sushruta Samhita, Ashtanga Hridaya, Sharangadhara, Bhavaprakasha, or Bhaishajya Ratnavali.'
  },
  {
    id: 'NBA-SEC6-FORM3',
    title: 'Biological Diversity Act 2002 (Amended 2023) - Section 6 & Form III Approval for IPR',
    category: 'biodiversity_abs',
    regime: 'india',
    statutoryReference: 'Biological Diversity Act, 2002, Section 6 read with Rule 18 of BD Rules 2004',
    authority: 'National Biodiversity Authority (NBA), Chennai',
    summary: 'No person shall apply for any intellectual property right, in or outside India, for any invention based on any research or information on a biological resource obtained from India, without obtaining previous approval of the National Biodiversity Authority (Form III).',
    keyArticlesOrSections: ['Section 6(1)', 'Section 6(2)', 'Section 19', 'Rule 18 (Form III Application)'],
    canonicalUrl: 'https://nbaindia.org',
    practicalImplication: 'Before sealing/granting of a patent in India or filing under PCT abroad, an applicant who used Indian Ayurvedic plants must secure NBA Form III permission. Commercial exploitation triggers Access and Benefit Sharing (ABS) levies (typically 0.1% to 0.5% of ex-factory sale price).'
  },
  {
    id: 'NBA-AMEND-2023',
    title: 'Biological Diversity (Amendment) Act, 2023 - AYUSH Practitioner & Cultivation Exemptions',
    category: 'biodiversity_abs',
    regime: 'india',
    statutoryReference: 'Biological Diversity (Amendment) Act, 2023 (Act No. 10 of 2023)',
    authority: 'Ministry of Environment, Forest and Climate Change / NBA',
    summary: 'Decriminalizes violations and introduces exemptions from prior approval of State Biodiversity Boards (SBB) for registered AYUSH practitioners (Vaidyas, Hakims) and codified traditional knowledge users who source cultivated medicinal plants rather than wild-harvested forest flora.',
    keyArticlesOrSections: ['Section 7 Proviso', 'Section 40 (Normally Traded as Commodities - NTAC)', 'Section 55 Decriminalization'],
    canonicalUrl: 'https://egazette.gov.in',
    practicalImplication: 'Ayurvedic manufacturers utilizing certified cultivated medicinal plants get streamlined pathways, but IPR filings under Section 6 still require formal scrutiny if commercial patent monopoly is claimed.'
  },
  {
    id: 'DCA-RULE158B',
    title: 'Drugs and Cosmetics Rules 1945 - Rule 158B: Licensing of Ayurvedic, Siddha & Unani (ASU) Drugs',
    category: 'drug_regulatory',
    regime: 'india',
    statutoryReference: 'Drugs and Cosmetics Rules, 1945, Rule 158B (Chapter IV-A)',
    authority: 'Central Drugs Standard Control Organization (CDSCO) & State Licensing Authorities (SLA) under Ministry of AYUSH',
    summary: 'Prescribes distinct licensing pathways: (1) Classical ASU Drugs (manufactured strictly in accordance with authoritative classical texts listed in the First Schedule) require no clinical trials; (2) Patent or Proprietary ASU Medicines (new formulations/combinations) require safety studies, acute oral toxicity data, and published clinical trials.',
    keyArticlesOrSections: ['Rule 158B(A) Classical Medicines', 'Rule 158B(B) Patent or Proprietary ASU Medicines', 'Schedule T (GMP for ASU Drugs)', 'Schedule E(1) (Poisonous substances)'],
    canonicalUrl: 'https://ayush.gov.in',
    practicalImplication: 'Innovators pursuing novel patentable Ayurvedic formulations face a regulatory fork: classical formulations cannot be patented (Section 3p) but have instant low-cost licensing; patentable proprietary ASU medicines require comprehensive Phase I/II/III clinical trials and toxicity documentation before commercial manufacturing approval.'
  },
  {
    id: 'WIPO-TREATY-2024',
    title: 'WIPO Treaty on Intellectual Property, Genetic Resources and Associated Traditional Knowledge (2024)',
    category: 'international_treaties',
    regime: 'wipo',
    statutoryReference: 'WIPO Diplomatic Conference Document GRATK/DC/7 (Adopted May 24, 2024)',
    authority: 'World Intellectual Property Organization (WIPO), Geneva',
    summary: 'Historic landmark treaty establishing a mandatory disclosure requirement in patent applications worldwide. Where an invention is based on genetic resources (medicinal plants) or associated traditional knowledge, applicants must disclose the country of origin or indigenous community provider.',
    keyArticlesOrSections: ['Article 3 (Mandatory Disclosure Requirement)', 'Article 6 (Sanctions and Remedies)', 'Article 7 (Information Systems / Databases like TKDL)'],
    canonicalUrl: 'https://www.wipo.int/meetings/en/details.jsp?meeting_id=82308',
    practicalImplication: 'Global patent applicants filing in US, Europe, Japan, etc., can no longer conceal Indian Ayurvedic origins. Concealment can lead to post-grant revocation or non-enforceability in member states.'
  },
  {
    id: 'CBD-NAGOYA-ABS',
    title: 'Nagoya Protocol on Access to Genetic Resources and the Fair and Equitable Sharing of Benefits (ABS)',
    category: 'biodiversity_abs',
    regime: 'cbd_nagoya',
    statutoryReference: 'Nagoya Protocol to the Convention on Biological Diversity, Articles 5, 6, 7, 15, 17',
    authority: 'Secretariat of the Convention on Biological Diversity (SCBD)',
    summary: 'Requires international recognition of Prior Informed Consent (PIC) and Mutually Agreed Terms (MAT) when accessing genetic resources and traditional knowledge. Established the ABS Clearing-House (ABSCH) and Internationally Recognized Certificates of Compliance (IRCC).',
    keyArticlesOrSections: ['Article 5 (Fair and Equitable Benefit-Sharing)', 'Article 6 (Access to Genetic Resources)', 'Article 7 (Access to Traditional Knowledge)', 'Article 17 (Monitoring Utilization)'],
    canonicalUrl: 'https://absch.cbd.int',
    practicalImplication: 'International pharmaceutical companies utilizing Ayurvedic plants must obtain formal IRCC permits from India\'s NBA. Without IRCC, patents granted in signatory nations (e.g. EU, UK, Japan) are vulnerable to compliance challenges.'
  },
  {
    id: 'EPO-EPC-54-56',
    title: 'European Patent Convention (EPC) - Articles 54, 56 & Rule 28: Novelty, Synergism & TKDL Access',
    category: 'patent_law',
    regime: 'epo',
    statutoryReference: 'European Patent Convention (EPC 1973/2000), Articles 52, 54, 56',
    authority: 'European Patent Office (EPO), Munich',
    summary: 'Article 54 governs Novelty (which includes disclosures in any written or public form worldwide, such as TKDL citations); Article 56 governs Inventive Step. The EPO strictly applies the "problem-solution approach" to botanical formulations, requiring unexpected synergistic technical effect.',
    keyArticlesOrSections: ['Article 54 (Novelty & Prior Art)', 'Article 56 (Inventive Step)', 'EPO Guidelines for Examination G-VII, 5.2 (Synergistic Effects in Combinations)'],
    canonicalUrl: 'https://www.epo.org',
    practicalImplication: 'At the EPO, claiming a combination of Ayurvedic herbs fails under Article 56 unless applicant supplies comparative experimental data proving that the combination produces a supra-additive response compared to the sum of individual herbs.'
  },
  {
    id: 'EU-DIRECTIVE-THMPD',
    title: 'EU Directive 2004/24/EC - Traditional Herbal Medicinal Products Directive (THMPD)',
    category: 'drug_regulatory',
    regime: 'epo',
    statutoryReference: 'Directive 2004/24/EC of the European Parliament amending Directive 2001/83/EC',
    authority: 'European Medicines Agency (EMA) - Committee on Herbal Medicinal Products (HMPC)',
    summary: 'Provides a simplified registration procedure for traditional herbal medicinal products. Crucially requires documented evidence of traditional medicinal use throughout a period of at least 30 years, including at least 15 years within the European Community.',
    keyArticlesOrSections: ['Article 16a (Eligibility criteria)', 'Article 16c (30-year / 15-year rule)', 'HMPC Herbal Monographs & Community Herbal List'],
    canonicalUrl: 'https://www.ema.europa.eu',
    practicalImplication: 'Many classical Ayurvedic formulations face entry barriers into the EU market as traditional medicines because proving 15 years of uninterrupted use within EU borders is difficult, forcing companies to register them as food supplements under EFSA or undergo full marketing authorization.'
  },
  {
    id: 'USPTO-101-102',
    title: 'US Patent Law - 35 U.S.C. §§ 101, 102 & Natural Products Doctrine (Alice / Myriad / Mayo)',
    category: 'patent_law',
    regime: 'uspto',
    statutoryReference: 'United States Code Title 35, Sections 101, 102, 103; USPTO Subject Matter Eligibility Guidance',
    authority: 'United States Patent and Trademark Office (USPTO)',
    summary: 'Under 35 U.S.C. § 101 and landmark Supreme Court decisions (Association for Molecular Pathology v. Myriad Genetics; Mayo v. Prometheus), naturally occurring substances, crude plant extracts, or isolated herbal compounds that possess markedly similar structure/function to natural states are ineligible subject matter.',
    keyArticlesOrSections: ['35 U.S.C. § 101', '35 U.S.C. § 102 (Prior Art including TKDL)', 'MPEP 2106 (Subject Matter Eligibility)'],
    canonicalUrl: 'https://www.uspto.gov',
    practicalImplication: 'To get a US patent on an Ayurvedic botanical, the applicant must claim markedly different structural characteristics (e.g. chemically functionalized derivative, synthetic ester, liposomal/nano-structured delivery system) or a non-obvious synergistic composition addressing a specific therapeutic target with unexpected results.'
  },
  {
    id: 'US-FDA-BOTANICAL-DSHEA',
    title: 'US FDA Regulatory Pathways: DSHEA Dietary Supplements vs. CDER Botanical Drug Guidance',
    category: 'drug_regulatory',
    regime: 'uspto',
    statutoryReference: 'Dietary Supplement Health and Education Act of 1994 (DSHEA) / 21 CFR Part 111 & 312',
    authority: 'US Food and Drug Administration (FDA) CDER',
    summary: 'Ayurvedic formulations entering the US generally take the Dietary Supplement pathway under DSHEA (cannot claim to cure, treat, prevent, or diagnose diseases; can only use structure/function claims). Alternatively, under the FDA Botanical Drug Guidance (2016), complex herbal mixtures can be approved as prescription botanical drugs (e.g., Veregen, Mytesi) via IND/NDA showing batch-to-batch consistency and clinical trials.',
    keyArticlesOrSections: ['DSHEA 1994 (21 U.S.C. 321(ff))', 'FDA Guidance for Industry: Botanical Drug Development (December 2016)', '21 CFR 101.93 (Structure/Function Claims)'],
    canonicalUrl: 'https://www.fda.gov/regulatory-information/search-fda-guidance-documents/botanical-drug-development-guidance-industry',
    practicalImplication: 'Ayurvedic companies aiming for US prescription drug status must implement raw material DNA barcoding, spectroscopic fingerprinting, and standard randomized clinical trials. Otherwise, they must market as supplements without therapeutic health claims.'
  },
  {
    id: 'GI-ACT-AYURVEDA',
    title: 'Geographical Indications of Goods Act 1999 - Protection of Ayurvedic Flora & Formulations',
    category: 'trademark_gi',
    regime: 'india',
    statutoryReference: 'Geographical Indications of Goods (Registration and Protection) Act, 1999',
    authority: 'Geographical Indications Registry, Chennai',
    summary: 'Protects traditional goods originating from specific agro-climatic regions with distinctive medicinal quality attributable to geography (e.g., Navara Rice for Pizhichil/Navarakizhi therapy, Malabar Pepper, Alleppey Green Cardamom, Ganjam Kewda, Banaras Paan).',
    keyArticlesOrSections: ['Section 2(1)(e)', 'Section 9 (Prohibitions on registration)', 'Section 21 (Rights conferred by registration)'],
    canonicalUrl: 'https://ipindia.gov.in/gi.htm',
    practicalImplication: 'Ayurvedic manufacturers sourcing GI-tagged herbs gain premium brand equity and export authenticity protection against counterfeit synthetic adulterants.'
  }
];

export const LANDMARK_CASES: LandmarkCase[] = [
  {
    id: 'CASE-TURMERIC',
    name: 'The Turmeric Wound Healing Patent Revocation',
    targetJurisdiction: 'USPTO (United States)',
    patentNumber: 'US Patent No. 5,401,504',
    assigneeOrApplicant: 'University of Mississippi Medical Center',
    traditionalHerbsInvolved: ['Haridra (Curcuma longa / Turmeric)'],
    challengeBody: 'Council of Scientific and Industrial Research (CSIR), India',
    groundsForRevocation: ['Lack of Novelty under 35 U.S.C. § 102', 'Anticipation by ancient Indian traditional prior art'],
    keyAyurvedicTextsCited: [
      'Bhavaprakasha Samhita',
      'Charaka Samhita (Sutra Sthana)',
      'Indian Journal of Medical Research (1953)'
    ],
    outcome: 'Complete revocation of all 6 claims in 1997. Landmark first instance of a Third World country successfully revoking a US patent based on traditional knowledge.',
    yearResolved: 1997,
    significanceForInnovators: 'Proved that published vernacular Ayurvedic medical literature constitutes valid prior art worldwide, leading directly to the establishment of the TKDL.'
  },
  {
    id: 'CASE-NEEM-EPO',
    name: 'The Neem Antifungal Patent Revocation',
    targetJurisdiction: 'EPO (European Patent Office)',
    patentNumber: 'EP Patent No. 0436257 B1',
    assigneeOrApplicant: 'W.R. Grace & Co. / United States Department of Agriculture (USDA)',
    traditionalHerbsInvolved: ['Nimba (Azadirachta indica / Neem oil extract)'],
    challengeBody: 'Dr. Vandana Shiva (RFSTE), Magda Aelvoet (Green MEP), and International Federation of Organic Agriculture Movements (IFOAM)',
    groundsForRevocation: ['Article 56 EPC (Lack of Inventive Step)', 'Article 54 EPC (Lack of Novelty)', 'Biopiracy of centuries-old Indian agrarian practice'],
    keyAyurvedicTextsCited: [
      'Vrikshayurveda by Surapala',
      'Charaka Samhita',
      'Sushruta Samhita'
    ],
    outcome: 'Revoked by the Opposition Division in 2000; revocation upheld in 2005 by the EPO Technical Board of Appeal.',
    yearResolved: 2005,
    significanceForInnovators: 'Established that mere extraction using hydrophobic organic solvents does not impart an inventive step if the biological effect (fungicidal activity) was already known in classical texts.'
  },
  {
    id: 'CASE-BASMATI',
    name: 'Basmati Rice Germplasm & Line Patents Dispute',
    targetJurisdiction: 'USPTO (United States)',
    patentNumber: 'US Patent No. 5,663,484',
    assigneeOrApplicant: 'RiceTec Inc. (Texas, USA)',
    traditionalHerbsInvolved: ['Oryza sativa var. Basmati (Karnal local, traditional aromatic rice lines)'],
    challengeBody: 'Government of India / CSIR / APEDA',
    groundsForRevocation: ['Anticipation by existing germplasm bred by Indian farmers over centuries', 'Misleading geographic name claims'],
    keyAyurvedicTextsCited: [
      'Ain-i-Akbari',
      'Charaka Samhita (classification of Shali and Vrihi rices)',
      'Indian National Bureau of Plant Genetic Resources (NBPGR) records'
    ],
    outcome: 'RiceTec forced to withdraw 15 of its 20 broad claims; patent title restricted so they could not claim traditional Basmati rice lines.',
    yearResolved: 2001,
    significanceForInnovators: 'Demonstrated the necessity of Geographical Indication (GI) protection and Farmers\' Rights under PPVFRA 2001.'
  },
  {
    id: 'CASE-ASHWAGANDHA',
    name: 'TKDL-Facilitated Rejection of Foreign Ashwagandha Formulations',
    targetJurisdiction: 'EPO & USPTO',
    patentNumber: 'Multiple Applications (e.g. EP 2152288, US 2011/0171329)',
    assigneeOrApplicant: 'Various multinational entities',
    traditionalHerbsInvolved: ['Ashwagandha (Withania somnifera) in combination with Ginseng, Brahmi, or Haritaki'],
    challengeBody: 'TKDL Division, CSIR, India (Pre-Grant Third-Party Observations)',
    groundsForRevocation: ['Article 54 & 56 EPC', 'Prior art cited from Ashtanga Hridaya and Sharangadhara Samhita for Rasayana / Balya / Medhya effects'],
    keyAyurvedicTextsCited: [
      'Ashtanga Hridaya (Uttara Sthana)',
      'Bhavaprakasha (Guduchyadi Varga)',
      'Sahasrayogam'
    ],
    outcome: 'Applicants either completely abandoned applications or deleted combination claims after receiving TKDL prior art citations from examiners.',
    yearResolved: 2015,
    significanceForInnovators: 'Shows that modern patent drafting for Ashwagandha must avoid generic stress-relief, neuro-protective, or adaptogenic claims unless backed by a novel chemically altered constituent or patented liposomal nanocarrier.'
  },
  {
    id: 'CASE-BHUMYAMALAKI',
    name: 'Phyllanthus amarus (Bhumyamalaki) Hepatitis B Patent Opposition',
    targetJurisdiction: 'USPTO',
    patentNumber: 'US Patent No. 4,673,575',
    assigneeOrApplicant: 'Fox Chase Cancer Center (Baruch Blumberg - Nobel Laureate)',
    traditionalHerbsInvolved: ['Bhumyamalaki (Phyllanthus niruri / Phyllanthus amarus)'],
    challengeBody: 'Traditional practitioners and public health advocates',
    groundsForRevocation: ['Traditional Indian knowledge of Phyllanthus for Kamla (Jaundice / Liver disorders)'],
    keyAyurvedicTextsCited: [
      'Charaka Samhita (Chikitsa Sthana - Yakrit Roga)',
      'Chakradatta',
      'Sushruta Samhita'
    ],
    outcome: 'While the US patent was initially granted, European filings were narrowed, and subsequent commercial monopoly was heavily resisted, underscoring the battle between ethnopharmacology and patent claims.',
    yearResolved: 1999,
    significanceForInnovators: 'Using an Ayurvedic herb for an indication directly analogous to its classical Shloka indication (e.g. Jaundice -> Hepatitis) will be considered obvious to a person skilled in the art (PHOSITA) armed with translation tools.'
  }
];

export const REGIME_DETAILS: Record<string, { name: string; flag: string; description: string; focalLaw: string }> = {
  india: {
    name: 'India (National Regime)',
    flag: '🇮🇳',
    description: 'Indian Patent Act 1970 (Sec 3p/3d/3e), TKDL prior art scrutiny, National Biodiversity Authority (NBA Form III), Drugs & Cosmetics Rule 158B.',
    focalLaw: 'Patents Act 1970, BD Act 2002/2023, D&C Act 1940'
  },
  wipo: {
    name: 'WIPO & Global Treaties',
    flag: '🌐',
    description: 'WIPO Treaty on IP & Genetic Resources (2024 mandatory origin disclosure), IPC Traditional Knowledge Resource Classifications (TKRC).',
    focalLaw: 'WIPO Treaty 2024, Patent Cooperation Treaty (PCT)'
  },
  epo: {
    name: 'European Union (EPO & EMA)',
    flag: '🇪🇺',
    description: 'EPC Articles 54 (Novelty) and 56 (Inventive Step / Synergism), TKDL Examiner Gateway, EU Directive 2004/24/EC on Traditional Herbal Medicines (THMPD).',
    focalLaw: 'EPC 1973/2000, Directive 2004/24/EC'
  },
  uspto: {
    name: 'United States (USPTO & FDA)',
    flag: '🇺🇸',
    description: '35 U.S.C. § 101 (Natural Products Doctrine under Alice/Myriad), 35 U.S.C. § 102 prior art, FDA DSHEA 1994 vs Botanical Drug Guidance 2016.',
    focalLaw: '35 U.S.C. 101/102/103, 21 CFR Part 312'
  },
  cbd_nagoya: {
    name: 'CBD & Nagoya Protocol (ABS)',
    flag: '🌿',
    description: 'Prior Informed Consent (PIC), Mutually Agreed Terms (MAT), Internationally Recognized Certificates of Compliance (IRCC) for biological resources.',
    focalLaw: 'Nagoya Protocol 2010, CBD 1992'
  },
  who: {
    name: 'WHO Traditional Medicine',
    flag: '⚕️',
    description: 'WHO Traditional Medicine Strategy 2014-2023 / 2025-2034, Global Centre for Traditional Medicine (GCTM, Jamnagar, India), ICD-11 TM2 module.',
    focalLaw: 'WHO Benchmarks for Training & Safety in Ayurveda'
  }
};
