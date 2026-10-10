import { SyntheticPatentRecord, CostEstimatorOption, LegalCorpusRecord } from '../types';

export const SYNTHETIC_PATENT_RECORDS: SyntheticPatentRecord[] = [
  {
    id: 'pat-1',
    title: 'Smart Wearable device and method for estimating traditional medicine system parameters',
    patentNumber: '416499',
    applicant: 'AYUR.AI (OPC) PRIVATE LIMITED',
    similarityScore: 45,
    snippet: 'Included as a nearby synthetic demonstration record examining sensor-based Nadi Pariksha and Ayurvedic constitution estimation using photoplethysmography and deep neural networks.',
    herbs: ['General Ayurvedic Diagnostics', 'Tridosha Analysis'],
    ipcClass: 'G16H 50/20, A61B 5/024',
    filingDate: '2023-04-12',
    status: 'GRANTED'
  },
  {
    id: 'pat-2',
    title: 'Integrative system and method for performing medical Diagnosis using Artificial Intelligence',
    patentNumber: '429737',
    applicant: 'Ayur.Ai (OPC) Private Limited',
    similarityScore: 45,
    snippet: 'Demonstration machine-learning system mapping patient Prakriti, Vikriti, and pulse dynamics against classical Ayurvedic formulation contraindications.',
    herbs: ['Ayurvedic Clinical Decision Support'],
    ipcClass: 'G16H 20/10, G06N 3/08',
    filingDate: '2023-08-19',
    status: 'GRANTED'
  },
  {
    id: 'pat-3',
    title: 'Herbal cigarette and process of preparation thereof',
    patentNumber: '379585',
    applicant: 'RAJAS UDAY NITSURE, UDAY ANANT NITSURE',
    similarityScore: 45,
    snippet: 'Non-tobacco, non-nicotine smoking mixture prepared from Withania somnifera (Ashwagandha), Ocimum sanctum (Tulsi), and Glycyrrhiza glabra (Yashtimadhu) processed in Dhumapana classical ratios.',
    herbs: ['Withania somnifera', 'Ocimum sanctum', 'Glycyrrhiza glabra'],
    ipcClass: 'A24B 15/16, A61K 36/81',
    filingDate: '2021-11-04',
    status: 'GRANTED'
  },
  {
    id: 'pat-4',
    title: 'Aqueous soluble nano-micellar formulation of Curcumin and Piperine for enhanced oral bioavailability',
    patentNumber: '441029',
    applicant: 'PHYTO-NANO RES LABS PVT LTD',
    similarityScore: 88,
    snippet: 'Food-grade phospholipid self-emulsifying nano-micelles of Curcuma longa extract delivering a 420-fold aqueous solubility increase, overcoming Section 3(d) therapeutic efficacy bars.',
    herbs: ['Curcuma longa', 'Piper nigrum'],
    ipcClass: 'A61K 9/107, A61K 36/9066',
    filingDate: '2022-06-15',
    status: 'PUBLISHED'
  },
  {
    id: 'pat-5',
    title: 'Standardized Withanolide-A rich fraction from Withania somnifera root with neuroprotective synergy',
    patentNumber: '402188',
    applicant: 'MED-AYUSH BIOSCIENCES LLP',
    similarityScore: 78,
    snippet: 'Standardized supercritical carbon-dioxide extraction fraction displaying a quantitative Chou-Talalay Combination Index CI < 0.7 against neurodegenerative oxidative stress.',
    herbs: ['Withania somnifera (Ashwagandha)'],
    ipcClass: 'A61K 36/81, A61P 25/28',
    filingDate: '2022-09-30',
    status: 'EXAMINED'
  },
  {
    id: 'pat-6',
    title: 'Herbal cough syrup composition comprising standardized Vasaka, Kantakari and Pippali',
    patentNumber: '398112',
    applicant: 'PRANIK HEALTHCARE TECHNOLOGIES',
    similarityScore: 82,
    snippet: 'Stable, alcohol-free Ayurvedic cough formulation retaining thermo-stable bronchodilatory alkaloids (Vasicine and Piperine) in synergistic proportion for pediatric use.',
    herbs: ['Adhatoda vasica (Vasaka)', 'Solanum xanthocarpum (Kantakari)', 'Piper longum (Pippali)'],
    ipcClass: 'A61K 36/19, A61P 11/14',
    filingDate: '2023-01-22',
    status: 'PUBLISHED'
  }
];

export const COST_ESTIMATOR_OPTIONS: CostEstimatorOption[] = [
  {
    id: 'patent-form-1-2',
    label: 'Patent Application Filing (Form 1 & 2 - up to 30 pages & 10 claims)',
    category: 'patent',
    basePriceIndividual: 1600,
    basePriceStartup: 1600,
    basePriceSmallEnterprise: 1600,
    basePriceEducational: 1600,
    basePriceOther: 8000,
    required: true
  },
  {
    id: 'patent-form-9',
    label: 'Early Publication Request (Form 9)',
    category: 'patent',
    basePriceIndividual: 2500,
    basePriceStartup: 2500,
    basePriceSmallEnterprise: 2500,
    basePriceEducational: 2500,
    basePriceOther: 12500
  },
  {
    id: 'patent-form-18',
    label: 'Request for Examination (Form 18 / 18A expedited)',
    category: 'patent',
    basePriceIndividual: 4000,
    basePriceStartup: 4000,
    basePriceSmallEnterprise: 4000,
    basePriceEducational: 4000,
    basePriceOther: 20000
  },
  {
    id: 'nba-form-3',
    label: 'NBA Biological Diversity Clearance (Form III application fee)',
    category: 'nba',
    basePriceIndividual: 10000,
    basePriceStartup: 10000,
    basePriceSmallEnterprise: 10000,
    basePriceEducational: 10000,
    basePriceOther: 10000
  },
  {
    id: 'tm-form-a',
    label: 'Trademark Application (Form TM-A - per class e-filing)',
    category: 'trademark',
    basePriceIndividual: 4500,
    basePriceStartup: 4500,
    basePriceSmallEnterprise: 4500,
    basePriceEducational: 4500,
    basePriceOther: 9000
  },
  {
    id: 'design-form-1',
    label: 'Design Registration (Form 1 - bottle / delivery packaging shape)',
    category: 'design',
    basePriceIndividual: 1000,
    basePriceStartup: 1000,
    basePriceSmallEnterprise: 1000,
    basePriceEducational: 1000,
    basePriceOther: 4000
  }
];

export const LEGAL_CORPUS_RECORDS: LegalCorpusRecord[] = [
  {
    id: 'tm-act-1999',
    title: 'Trade Marks Act, 1999',
    sections: 'Sections 2, 9, 11, 12, 13, 18, 20-23, 25, 28-29, 30-35, 47 & 57',
    authority: 'Government of India / IP India',
    lastVerified: '2026-08-30',
    category: 'Trademark Law',
    badge: 'official_curated',
    details: 'Governs registration of Ayurvedic brand names, logo marks, and collective certification marks. Bars generic Sanskrit terms (e.g., Triphala, Chyawanprash) under Section 9 absolute grounds.'
  },
  {
    id: 'tm-rules-2017',
    title: 'Trade Marks Rules, 2017',
    sections: 'Procedure, Forms, Fees (Rules 11, 23, 24, Schedule 1)',
    authority: 'Government of India / IP India',
    lastVerified: '2026-08-30',
    category: 'Trademark Procedure',
    badge: 'official_curated',
    details: 'Specifies official filing forms (TM-A, TM-M), expedited examination provisions for startups and MSMEs, and e-filing fee schedules for herbal preparations in Class 5 and Class 30.'
  },
  {
    id: 'pat-act-1970',
    title: 'Patents Act, 1970',
    sections: 'Sections 2 and 3(a)-3(p), Section 10(4), Section 64',
    authority: 'Government of India / IP India',
    lastVerified: '2026-08-30',
    category: 'Patent Law',
    badge: 'official_curated',
    details: 'Governs patent eligibility in India. Section 3(p) bars traditional knowledge; Section 3(e) bars mere admixtures; Section 3(d) requires demonstration of enhanced therapeutic efficacy.'
  },
  {
    id: 'bda-act-2002',
    title: 'Biological Diversity Act, 2002 & Amendment 2023',
    sections: 'Sections 3, 4, 6(1), 7, 19, 21, 23 (Form III & ABS)',
    authority: 'National Biodiversity Authority (NBA, Chennai)',
    lastVerified: '2026-08-30',
    category: 'Biodiversity & ABS',
    badge: 'official_curated',
    details: 'Mandates prior approval (Form III) before applying for or receiving a patent for inventions based on Indian biological resources, and governs fair and equitable benefit sharing.'
  },
  {
    id: 'dca-rules-1945',
    title: 'Drugs and Cosmetics Rules, 1945 (Rule 158B)',
    sections: 'Rule 158B(A) Classical & Rule 158B(B) Patent or Proprietary',
    authority: 'Ministry of AYUSH / State Licensing Authorities',
    lastVerified: '2026-08-30',
    category: 'Drug Regulatory',
    badge: 'official_curated',
    details: 'Delineates regulatory requirements for Ayurvedic medicines. Classical medicines cite 54 scheduled texts. Proprietary medicines require acute toxicity and clinical trial validation.'
  },
  {
    id: 'fssai-aahara-2022',
    title: 'Food Safety and Standards (Ayurveda Aahara) Regulations, 2022',
    sections: 'Chapter II, Regulations 3 to 10 & Schedules I-IV',
    authority: 'Food Safety and Standards Authority of India (FSSAI)',
    lastVerified: '2026-08-30',
    category: 'Ayurvedic Food & Supplements',
    badge: 'official_curated',
    details: 'Regulates food items prepared in accordance with Ayurvedic recipes. Prohibits disease mitigation or medicinal curative claims; restricts products to nutritional and health support.'
  }
];
