export type Regime = 'all' | 'india' | 'wipo' | 'epo' | 'uspto' | 'cbd_nagoya' | 'who';

export type NavTab = 
  | 'home'
  | 'assessment'
  | 'health-check'
  | 'patent-search'
  | 'cost-estimator'
  | 'knowledge-base'
  | 'ask-ai';

export type Category = 
  | 'patent_law' 
  | 'tkdl' 
  | 'biodiversity_abs' 
  | 'drug_regulatory' 
  | 'international_treaties' 
  | 'biopiracy_cases' 
  | 'trademark_gi';

export interface SourceCitation {
  id: string;
  title: string;
  category: Category;
  regime: Regime;
  statutoryReference: string;
  authority: string;
  summary: string;
  keyArticlesOrSections: string[];
  canonicalUrl?: string;
  practicalImplication: string;
}

export interface LandmarkCase {
  id: string;
  name: string;
  targetJurisdiction: string;
  patentNumber: string;
  assigneeOrApplicant: string;
  traditionalHerbsInvolved: string[];
  challengeBody: string;
  groundsForRevocation: string[];
  keyAyurvedicTextsCited: string[];
  outcome: string;
  yearResolved: number;
  significanceForInnovators: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  language?: string;
  citations?: SourceCitation[];
  suggestedFollowUps?: string[];
  regimeContext?: Regime;
  patentabilityInsight?: {
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL_BAR';
    keySectionTriggered?: string;
    advice: string;
  };
}

export type ProductType = 
  | 'Ayurvedic Medicine'
  | 'Herbal Food / Ayurveda Aahar'
  | 'Cosmetic'
  | 'Supplement'
  | 'Other'
  | 'Not Sure';

export interface ProductAssessmentData {
  // Step 1: Product
  productName: string;
  productDescription: string;
  productType: ProductType;

  // Step 2: Ingredients
  ingredients: string;
  partsUsed: string;
  botanicalOrigin: 'cultivated_india' | 'wild_harvested_india' | 'imported' | 'synthetic';

  // Step 3: Intended Use
  intendedUse: string;
  targetClaim: 'disease_therapeutic' | 'wellness_immunity' | 'cosmetic_skin_hair' | 'general_supplement';
  targetAudience: string;

  // Step 4: Formulation
  formulationType: 'classical_traditional' | 'aqueous_alcoholic_extract' | 'novel_nano_phytosome' | 'synthetic_bioactive_fraction';
  inClassicalTexts: 'yes' | 'no' | 'modified';
  synergyOrNoveltyProof: string;

  // Step 5: Business Goal
  commercialJurisdiction: 'india_only' | 'global_export' | 'both';
  priorityProtection: 'patent' | 'trademark' | 'trade_secret' | 'all';
  applicantType: 'Individual' | 'Startup' | 'Small Enterprise' | 'Educational Institution' | 'Other';
}

export interface InnovationMetric {
  name: string;
  score: number;
  status: 'PRELIMINARY';
  description: string;
  recommendation: string;
}

export interface InnovationHealthCheckResult {
  productName: string;
  likelyClassification: string;
  confidence: number;
  parametersSummary: string;
  overallReadiness: number;
  metrics: {
    regulatoryClarity: InnovationMetric;
    ipReadiness: InnovationMetric;
    priorArtRisk: InnovationMetric;
    traditionalKnowledgeRisk: InnovationMetric;
    absReview: InnovationMetric;
    trademarkOpportunity: InnovationMetric;
  };
  keyTakeaways: string[];
}

export interface SyntheticPatentRecord {
  id: string;
  title: string;
  patentNumber: string;
  applicant: string;
  similarityScore: number;
  snippet: string;
  herbs: string[];
  ipcClass: string;
  filingDate: string;
  status: 'GRANTED' | 'PUBLISHED' | 'EXAMINED';
}

export interface CostEstimatorOption {
  id: string;
  label: string;
  category: 'patent' | 'trademark' | 'nba' | 'design';
  basePriceIndividual: number;
  basePriceStartup: number;
  basePriceSmallEnterprise: number;
  basePriceEducational: number;
  basePriceOther: number;
  required?: boolean;
}

export interface LegalCorpusRecord {
  id: string;
  title: string;
  sections: string;
  authority: string;
  lastVerified: string;
  category: string;
  badge: 'official_curated';
  details: string;
}

export interface PatentAssessmentRequest {
  inventionTitle: string;
  herbsUsed: string[];
  compositionType: 'classical_combination' | 'modified_ratio' | 'isolated_extract' | 'synergistic_fraction' | 'nano_delivery_formulation' | 'synthetic_derivative';
  noveltyDescription: string;
  processingMethod: string;
  targetDiseaseOrIndication: string;
  hasBioAssayData: boolean;
  hasSynergyIndexData: boolean;
  biologicalMaterialOrigin: 'india_wild' | 'india_cultivated' | 'imported' | 'synthetic';
  applicantType: 'indian_entity' | 'foreign_collaborator_or_nri' | 'multinational';
  targetJurisdictions: Regime[];
  language?: string;
}

export interface PatentAssessmentResult {
  feasibilityScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'BLOCKED_BY_PRIOR_ART';
  roadblocks: {
    section: string;
    authority: string;
    description: string;
    severity: 'fatal' | 'cautionary' | 'manageable';
  }[];
  patentableCarveouts: string[];
  nbaComplianceRequirements: {
    formRequired: string;
    trigger: string;
    stepToTake: string;
    deadline: string;
  }[];
  regulatoryDrugLicensing: {
    rule: string;
    category: string;
    clinicalTrialNeeded: boolean;
    requirements: string[];
  };
  internationalFilingStrategy: {
    usptoNotes: string;
    epoNotes: string;
    wipoDisclosureNote: string;
  };
  relevantTKDLReferences: string[];
  citations: SourceCitation[];
}

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  direction?: 'ltr' | 'rtl';
}

