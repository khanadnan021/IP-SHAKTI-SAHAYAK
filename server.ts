import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { RAG_CITATIONS, LANDMARK_CASES } from './src/data/ragCorpus.ts';
import { SourceCitation } from './src/types.ts';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// GoogleGenAI client helper with dynamic key detection
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// RAG Retrieval helper: score citations by relevance to query
function retrieveRelevantSources(query: string, regime?: string, maxResults = 5): SourceCitation[] {
  const queryLower = query.toLowerCase();
  const scored = RAG_CITATIONS.map((citation) => {
    let score = 0;
    const titleLower = citation.title.toLowerCase();
    const summaryLower = citation.summary.toLowerCase();
    const refLower = citation.statutoryReference.toLowerCase();
    const practicalLower = citation.practicalImplication.toLowerCase();

    // Regime boost
    if (regime && regime !== 'all' && citation.regime === regime) {
      score += 4;
    }

    // Keyword matching
    const keywords = queryLower.split(/\s+/).filter((w) => w.length > 2);
    for (const kw of keywords) {
      if (titleLower.includes(kw)) score += 5;
      if (refLower.includes(kw)) score += 6;
      if (summaryLower.includes(kw)) score += 3;
      if (practicalLower.includes(kw)) score += 2;
    }

    // High value legal terms
    if (queryLower.includes('section 3') && (titleLower.includes('section 3') || refLower.includes('section 3'))) score += 10;
    if (queryLower.includes('3(p)') && (titleLower.includes('3(p)') || refLower.includes('3(p)'))) score += 15;
    if (queryLower.includes('3(d)') && (titleLower.includes('3(d)') || refLower.includes('3(d)'))) score += 15;
    if (queryLower.includes('3(e)') && (titleLower.includes('3(e)') || refLower.includes('3(e)'))) score += 15;
    if (queryLower.includes('tkdl') && (citation.id === 'TKDL-CORPUS' || summaryLower.includes('tkdl'))) score += 12;
    if ((queryLower.includes('nba') || queryLower.includes('biodiversity') || queryLower.includes('form iii') || queryLower.includes('abs')) && citation.category === 'biodiversity_abs') score += 12;
    if ((queryLower.includes('rule 158b') || queryLower.includes('licens') || queryLower.includes('classical') || queryLower.includes('proprietary')) && citation.id === 'DCA-RULE158B') score += 12;
    if ((queryLower.includes('uspto') || queryLower.includes('101') || queryLower.includes('natural product')) && citation.regime === 'uspto') score += 10;
    if ((queryLower.includes('epo') || queryLower.includes('europe') || queryLower.includes('article 56') || queryLower.includes('thmpd')) && citation.regime === 'epo') score += 10;
    if ((queryLower.includes('wipo') || queryLower.includes('treaty') || queryLower.includes('disclosure of origin')) && citation.regime === 'wipo') score += 10;
    if ((queryLower.includes('turmeric') || queryLower.includes('neem') || queryLower.includes('biopiracy')) && (citation.id === 'TKDL-CORPUS' || citation.id === 'IND-PAT-3P')) score += 8;

    return { citation, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, maxResults).map((s) => s.citation);
}

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'IP-SAKTI Sahayak RAG Backend' });
});

// Sources endpoint
app.get('/api/sources', (req, res) => {
  const { regime, category } = req.query;
  let filtered = [...RAG_CITATIONS];
  if (regime && regime !== 'all') {
    filtered = filtered.filter((s) => s.regime === regime);
  }
  if (category && category !== 'all') {
    filtered = filtered.filter((s) => s.category === category);
  }
  res.json({ count: filtered.length, sources: filtered });
});

// Cases endpoint
app.get('/api/cases', (req, res) => {
  res.json({ count: LANDMARK_CASES.length, cases: LANDMARK_CASES });
});

// Chat endpoint (RAG-based)
app.post('/api/chat', async (req, res) => {
  try {
    const { message, language = 'en', regime = 'all', history = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Valid query message is required.' });
    }

    // 1. Retrieve most relevant canonical statutory citations
    const relevantSources = retrieveRelevantSources(message, regime, 4);

    // Also check for relevant landmark cases
    const lowerMsg = message.toLowerCase();
    const relevantCases = LANDMARK_CASES.filter((c) =>
      c.traditionalHerbsInvolved.some((h) => lowerMsg.includes(h.toLowerCase().split(' ')[0])) ||
      c.name.toLowerCase().includes(lowerMsg.split(' ')[0]) ||
      lowerMsg.includes('turmeric') && c.id === 'CASE-TURMERIC' ||
      lowerMsg.includes('neem') && c.id === 'CASE-NEEM-EPO' ||
      lowerMsg.includes('ashwagandha') && c.id === 'CASE-ASHWAGANDHA' ||
      lowerMsg.includes('basmati') && c.id === 'CASE-BASMATI'
    );

    // 2. Prepare Context for Gemini
    const contextPrompt = `
You are IP-SAKTI Sahayak, an authoritative multilingual, RAG-based AI assistant for Intellectual Property, Traditional Knowledge Digital Library (TKDL) prior art, National Biodiversity Authority (NBA) compliance, Drugs & Cosmetics Act licensing (Rule 158B), and cross-border regulatory regimes (India, WIPO, EPO, USPTO, Nagoya Protocol) in Ayurveda.

AUTHORITATIVE STATUTORY & REGULATORY KNOWLEDGE RETRIEVED FROM RAG CORPUS:
${relevantSources.map((s, idx) => `
[Source ${idx + 1}: ${s.id}]
Title: ${s.title}
Statutory Reference: ${s.statutoryReference}
Authority: ${s.authority}
Legal Summary: ${s.summary}
Practical Implication for Ayurvedic Innovators: ${s.practicalImplication}
`).join('\n')}

${relevantCases.length > 0 ? `RELEVANT LANDMARK BIOPIRACY/PATENT CASES RETRIEVED:
${relevantCases.map((c) => `
Case: ${c.name} (${c.patentNumber})
Jurisdiction: ${c.targetJurisdiction}
Herb(s): ${c.traditionalHerbsInvolved.join(', ')}
Outcome: ${c.outcome}
Significance: ${c.significanceForInnovators}
Ayurvedic Texts Cited: ${c.keyAyurvedicTextsCited.join(', ')}
`).join('\n')}` : ''}

USER QUERY DETAILS:
- Target Regime/Jurisdiction: ${regime}
- Requested Language: ${language}
- User Question: "${message}"

INSTRUCTIONS FOR YOUR RESPONSE:
1. Provide a direct, legally precise, deeply insightful, and structured response.
2. CITE SPECIFIC LEGAL SECTIONS & CITATION CODES: Whenever stating a rule or limitation, cite the exact source using bracketed notation like [Ref: ${relevantSources[0]?.id || 'IND-PAT-3P'}] or statutory sections (e.g. Section 3(p), Section 3(d), Section 3(e), Section 6 of Biological Diversity Act, Rule 158B of D&C Rules, 35 U.S.C. 101, EPC Article 56, WIPO Treaty 2024).
3. Include practical guidance for Ayurvedic innovators:
   - What is strictly non-patentable (e.g. classical formulations, simple decoctions/extracts, mere admixtures).
   - What can be protected (e.g. synergistic fractions with Combination Index < 1, novel nano-phytosomal delivery, standardized bio-enhancers, specific extraction technology, design patents, trademarks, GI tags).
   - Mandatory regulatory triggers: NBA Form III prior approval before patent grant, SBB notification, Rule 158B licensing for ASU manufacturing.
4. Multilingual adherence:
   - If language is 'hi', respond in clear, formal Hindi (हिन्दी) with Devanagari script. Keep core Sanskrit terms (e.g. चरक संहिता, रसशास्त्र, भावना, शोधन) and English legal terms where helpful.
   - If language is 'sa', respond in Sanskrit or Sanskrit-infused formal Hindi/English.
   - If language is 'gu', 'ta', 'te', 'ml', 'mr', 'bn', 'fr', 'de', 'es', 'ja', respond in that respective language with high legal and Ayurvedic fidelity.
   - If 'en', respond in authoritative English.
5. Provide 2-3 relevant follow-up questions for the user at the very end in a designated section titled "---SUGGESTIONS---" separated by newlines.
6. Provide a concise patentability risk rating if the query concerns an invention or formulation: "---RISK: LOW | MEDIUM | HIGH | CRITICAL_BAR---" followed by a 1-sentence summary.
`;

    // 3. Call Gemini with retry, multi-model fallback (gemini-3.8-flash -> gemini-3.6-flash)
    const ai = getGenAI();
    let assistantText = '';
    let suggestedFollowUps: string[] = [
      'What are the requirements for NBA Form III prior approval?',
      'How to establish synergy (Combination Index) under Section 3(e)?',
      'What is the difference between classical and proprietary licensing under Rule 158B?'
    ];
    let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL_BAR' = 'MEDIUM';
    let riskAdvice = 'Formulation requires novelty screening against TKDL corpus and proof of synergism.';

    let geminiSucceeded = false;
    if (ai) {
      const candidateModels = ['gemini-3.8-flash', 'gemini-3.6-flash'];
      for (const modelName of candidateModels) {
        try {
          console.log(`📡 [IP-SAKTI] Generating advisory with ${modelName}...`);
          const response = await ai.models.generateContent({
            model: modelName,
            contents: contextPrompt,
            config: {
              temperature: 0.2, // Low temperature for high legal accuracy
              topP: 0.9,
            },
          });

          const rawText = response.text || '';
          if (rawText.trim().length > 0) {
            console.log(`✅ [IP-SAKTI] Successfully generated response with ${modelName} (${rawText.length} chars)`);
            
            // Parse custom markers if present
            let cleanText = rawText;
            if (rawText.includes('---SUGGESTIONS---')) {
              const parts = rawText.split('---SUGGESTIONS---');
              cleanText = parts[0].trim();
              const suggestionsPart = parts[1] || '';
              const lines = suggestionsPart
                .split('\n')
                .map((l) => l.replace(/^[-*0-9.]+\s*/, '').trim())
                .filter((l) => l.length > 5 && !l.startsWith('---RISK'));
              if (lines.length > 0) {
                suggestedFollowUps = lines.slice(0, 3);
              }
            }

            if (rawText.includes('---RISK:')) {
              const match = rawText.match(/---RISK:\s*(LOW|MEDIUM|HIGH|CRITICAL_BAR)---?\s*([^\n]*)/i);
              if (match) {
                riskLevel = match[1].toUpperCase() as any;
                if (match[2]) riskAdvice = match[2].trim();
              }
            }

            assistantText = cleanText;
            geminiSucceeded = true;
            break;
          }
        } catch (geminiError: any) {
          console.warn(`⚠️ [IP-SAKTI] ${modelName} failed:`, geminiError.message);
        }
      }
    } else {
      console.warn('⚠️ [IP-SAKTI] GEMINI_API_KEY is not defined in process.env! Check your .env file.');
    }

    // Fallback: If Gemini is unavailable or busy, synthesize comprehensive grounded RAG advisory directly
    if (!geminiSucceeded) {
      const isHindi = language === 'hi';
      const isSanskrit = language === 'sa';

      if (isHindi) {
        assistantText = `### बौद्धिक सम्पदा एवं विधिक परामर्श (IP-SAKTI RAG Sahayak)

भारतीय पेटेंट अधिनियम, 1970 के अंतर्गत आयुर्वेदिक आविष्कारों पर निम्नलिखित वैधानिक प्रतिबंध लागू होते हैं:

1. **धारा 3(p) पारंपरिक ज्ञान प्रतिबंध:**
   पारंपरिक ज्ञान या ज्ञात घटकों के ज्ञात गुणों का केवल एकत्रीकरण अथवा दोहराव पेटेंट योग्य आविष्कार नहीं माना जाता है [Ref: IND-PAT-3P]। चरक संहिता, सुश्रुत संहिता अथवा भावप्रकाश में वर्णित शास्त्रीय योग इस धारा के तहत सीधे बाधित हैं।

2. **धारा 3(e) केवल मिश्रण (Mere Admixture) प्रतिबंध:**
   दो या अधिक आयुर्वेदिक औषधियों (जैसे अश्वगंधा + गुडूची + पिप्पली) का मिश्रण तब तक पेटेंट नहीं हो सकता जब तक कि आप प्रयोगसिद्ध सहक्रियाशीलता (Synergism / Combination Index < 1) सिद्ध न करें [Ref: IND-PAT-3E]।

3. **राष्ट्रीय जैव विविधता प्राधिकरण (NBA) अनापत्ति:**
   **जैविक विविधता अधिनियम, 2002 की धारा 6** के अनुसार, भारतीय जैविक संसाधनों पर आधारित किसी भी अनुसंधान पर पेटेंट आवेदन करने से पूर्व **प्रारूप III (Form III)** में NBA की पूर्वानुमति अनिवार्य है [Ref: NBA-SEC6-FORM3]।

4. **औषधि अनुज्ञापन (Rule 158B):**
   शास्त्रीय योगों के लिए केवल संदर्भ ग्रंथों का प्रमाण पर्याप्त है, जबकि पेटेंट अथवा प्रोप्राइटरी आयुर्वेदिक औषधियों के लिए सुरक्षा अध्ययन एवं नैदानिक परीक्षण (Clinical Trials) अनिवार्य हैं [Ref: DCA-RULE158B]।

**आविष्कारकों के लिए व्यावहारिक सुझाव:**
- यदि आप पेटेंट प्राप्त करना चाहते हैं, तो साधारण चूर्ण अथवा क्वाथ के स्थान पर **मानकीकृत बायो-एक्टिव अंश (Standardized Fraction)** अथवा **नैनो-फाइटोसोमल डिलीवरी सिस्टम** पर दावा प्रस्तुत करें।`;
      } else if (isSanskrit) {
        assistantText = `### बौद्धिक-सम्पत्ति-परामर्शः (IP-SAKTI RAG Advisory)

भारतीय-पेटेण्ट्-अधिनियमस्य (1970) प्रावधानमनुसृत्य आयुर्वेद-सम्बन्धि-अनुसन्धानेषु एते नियमाः प्रमुखाः सन्ति:

1. **अनुच्छेदः ३(p) - पारम्परिक-ज्ञान-प्रतिषेधः:**
   चरक-सुश्रुत-वाग्भट-संहितासु वर्णितानां शास्त्रीय-योगानां साक्षात् पेटेण्ट्-स्वीकृतिः असम्भवः अस्ति [Ref: IND-PAT-3P]।

2. **अनुच्छेदः ३(e) - मिश्रण-प्रतिषेधः (Mere Admixture):**
   केवलम् औषधानां मिश्रणम् पेटेण्ट्-योग्यं न भवति, यावत् सहक्रियाशीलता (Synergistic Technical Effect / CI < 1) प्रयोगशालायाम् सिद्धा न भवेत् [Ref: IND-PAT-3E]।

3. **जैव-विविधता-प्राधिकरणस्य (NBA) प्रारूपम् ३ (Form III):**
   जैविक-संसाधनानाम् उपरि पेटेण्ट्-स्वीकृतये धारा ६(१) अनुसृत्य एन.बी.ए. इत्यस्य पूर्वस्वीकृतिः सर्वथा अनिवार्या वर्तते [Ref: NBA-SEC6-FORM3]।`;
      } else {
        assistantText = `### IP-SAKTI Canonical Legal Advisory

Based on your inquiry regarding **"${message}"** across the **${regime.toUpperCase()}** regime, here is the source-cited legal and regulatory analysis:

#### 1. Statutory Patentability Bars in India:
- **Section 3(p) Traditional Knowledge Bar:** The Indian Patents Act 1970 explicitly states that an invention which in effect is traditional knowledge or an aggregation of known properties of traditionally known components is **NOT** patentable [Ref: IND-PAT-3P]. Classical formulations (Charaka, Sushruta, Ashtanga Hridaya, Sharangadhara) are indexed in the **Traditional Knowledge Digital Library (TKDL)** under IPC classification **A61K 36/00** [Ref: TKDL-CORPUS].
- **Section 3(e) Mere Admixture Bar:** Combining known herbs without experimental proof of synergy (i.e., Combination Index $CI < 1.0$ or supra-additive therapeutic effect) is rejected as a mere admixture [Ref: IND-PAT-3E].
- **Section 3(d) Enhanced Efficacy:** Modified extracts or derivatives must demonstrate enhanced therapeutic efficacy over the known botanical substance, not merely pharmacokinetic variation [Ref: IND-PAT-3D].

#### 2. Mandatory Biodiversity & ABS Clearance (NBA Form III):
Under **Section 6(1) of the Biological Diversity Act, 2002**, prior approval via **Form III** from the National Biodiversity Authority (NBA, Chennai) is **mandatory** before the grant of a patent in India or before filing PCT national phase applications abroad [Ref: NBA-SEC6-FORM3].
- Sourcing certified cultivated medicinal plants under the **Biological Diversity (Amendment) Act 2023** streamlines compliance [Ref: NBA-AMEND-2023].

#### 3. Drug Manufacturing Licensing under Rule 158B:
- **Classical Ayurvedic Medicine (Rule 158B(A)):** Direct reliance on authoritative texts in the First Schedule; exempt from clinical trials [Ref: DCA-RULE158B].
- **Patent or Proprietary ASU Medicine (Rule 158B(B)):** Requires acute oral toxicity testing and published clinical trial data.

#### 4. International Regimes (USPTO, EPO & WIPO):
- **USPTO:** Subject to the Natural Products Doctrine under 35 U.S.C. § 101 (Alice/Myriad); crude botanical extracts are ineligible subject matter without markedly different characteristics [Ref: USPTO-101-102].
- **EPO:** Under EPC Article 56, the EPO requires comparative experimental data proving an unexpected technical synergistic effect beyond the additive sum of individual herbs [Ref: EPO-EPC-54-56].
- **WIPO 2024 Treaty:** Mandates global disclosure of the country of origin (India) for genetic resources in patent filings [Ref: WIPO-TREATY-2024].

#### 💡 Strategic Patentable Carve-Outs:
To secure grantable claims, focus your patent specification on:
1. **Targeted Nano-Phytosomal Delivery Platforms:** Claiming phospholipid-to-phytochemical molar ratios, nanometer particle size (<200nm), and heightened cellular absorption.
2. **Standardized Synergistic Fractions:** Submitting Chou-Talalay quantitative synergy index data proving non-obvious supra-additive efficacy.
3. **Novel Extraction Processes:** Claiming unique solvent matrix kinetics or supercritical fractionation parameters.`;
      }

      // Check risk level based on herbs or query keywords
      const lower = message.toLowerCase();
      if (lower.includes('classical') || lower.includes('churna') || lower.includes('triphala') || lower.includes('kwatha')) {
        riskLevel = 'CRITICAL_BAR';
        riskAdvice = 'Classical Ayurvedic formulations face an absolute statutory bar under Section 3(p) and TKDL prior art.';
      } else if (lower.includes('combination') || lower.includes('admixture') || lower.includes('mix')) {
        riskLevel = 'HIGH';
        riskAdvice = 'Combination of herbs will trigger Section 3(e) rejection unless quantitative synergy index (CI < 1.0) is proven.';
      } else if (lower.includes('nano') || lower.includes('delivery') || lower.includes('phytosome')) {
        riskLevel = 'LOW';
        riskAdvice = 'Novel delivery platform or nano-phytosomal formulation represents a strong patentable carve-out.';
      } else {
        riskLevel = 'MEDIUM';
        riskAdvice = 'Formulation requires prior art clearance against TKDL and NBA Form III compliance.';
      }
    }

    res.json({
      text: assistantText,
      citations: relevantSources,
      suggestedFollowUps,
      patentabilityInsight: {
        riskLevel,
        advice: riskAdvice,
      },
    });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({
      error: 'Failed to generate guidance.',
      details: error.message,
    });
  }
});

// Patentability Assessment endpoint ("Yogyata Parikshan")
app.post('/api/assess-patentability', async (req, res) => {
  try {
    const payload = req.body;
    const {
      inventionTitle,
      herbsUsed = [],
      compositionType = 'classical_combination',
      noveltyDescription = '',
      processingMethod = '',
      targetDiseaseOrIndication = '',
      hasBioAssayData = false,
      hasSynergyIndexData = false,
      biologicalMaterialOrigin = 'india_wild',
      applicantType = 'indian_entity',
      targetJurisdictions = ['india'],
      language = 'en',
    } = payload;

    // Rule-based and AI hybrid evaluation
    let feasibilityScore = 50;
    const roadblocks: any[] = [];
    const patentableCarveouts: string[] = [];
    const nbaRequirements: any[] = [];

    // Evaluate Section 3(p) Traditional Knowledge Bar
    if (compositionType === 'classical_combination') {
      feasibilityScore -= 35;
      roadblocks.push({
        section: 'Section 3(p), Indian Patents Act 1970',
        authority: 'Indian Patent Office (CGPDTM)',
        description: 'Classical combinations or documented Ayurvedic formulations are statutory non-inventions under Section 3(p). Over 450,000 formulations in TKDL serve as anticipatory prior art under IPC A61K 36/00.',
        severity: 'fatal',
      });
      patentableCarveouts.push('Standardize a specific bioactive-enriched fraction with a proprietary, non-obvious solvent extraction profile.');
      patentableCarveouts.push('Formulate a novel nanostructured delivery system (e.g., Phytosomes, Liposomes, or Nano-emulsions) exhibiting sustained release and higher target bioavailability.');
    } else if (compositionType === 'modified_ratio' && !hasSynergyIndexData) {
      feasibilityScore -= 20;
      roadblocks.push({
        section: 'Section 3(e), Indian Patents Act 1970',
        authority: 'Indian Patent Office / EPO Article 56',
        description: 'Modifying ratios of known Ayurvedic herbs without experimental proof of synergy (Combination Index CI < 1.0) will trigger rejection as a "mere admixture" under Section 3(e).',
        severity: 'fatal',
      });
      patentableCarveouts.push('Conduct in vitro or in vivo combination index studies (Chou-Talalay method or isobologram) demonstrating supra-additive therapeutic effect against target receptor/pathway.');
    } else if (compositionType === 'synergistic_fraction' && hasSynergyIndexData) {
      feasibilityScore += 25;
      patentableCarveouts.push('Draft composition claims specifying the precise synergistic molar ratio and the technical effect demonstrated by the Combination Index.');
    } else if (compositionType === 'nano_delivery_formulation') {
      feasibilityScore += 30;
      patentableCarveouts.push('Claim the proprietary phospholipid-phytocomplex ratio, particle size distribution (<200nm), zeta potential, and enhanced cellular permeation index.');
    }

    // Evaluate Section 3(d)
    if (compositionType === 'isolated_extract' || compositionType === 'synthetic_derivative') {
      roadblocks.push({
        section: 'Section 3(d), Indian Patents Act 1970',
        authority: 'Indian Patent Office / Supreme Court Novartis Precedent',
        description: 'Isolated extracts or derivatives must demonstrate significant enhancement in therapeutic efficacy over the known herbal raw substance, not merely enhanced bioavailability.',
        severity: 'cautionary',
      });
    }

    // Evaluate Biological Diversity Act & NBA
    if (biologicalMaterialOrigin === 'india_wild' || biologicalMaterialOrigin === 'india_cultivated') {
      nbaRequirements.push({
        formRequired: 'NBA Form III',
        trigger: 'Section 6(1) of Biological Diversity Act 2002',
        stepToTake: 'Submit Form III application to the National Biodiversity Authority, Chennai, prior to filing abroad or prior to patent grant in India.',
        deadline: 'Before grant of Indian Patent or before filing PCT national phase application outside India.',
      });

      if (applicantType === 'foreign_collaborator_or_nri' || applicantType === 'multinational') {
        nbaRequirements.push({
          formRequired: 'NBA Form I',
          trigger: 'Section 3 of Biological Diversity Act 2002',
          stepToTake: 'Foreign entities/collaborators must obtain prior approval for accessing Indian biological resources for research.',
          deadline: 'Prior to obtaining or accessing any Indian biological specimen.',
        });
      }
    }

    // Calculate final feasibility score bounded between 10 and 95
    if (hasBioAssayData) feasibilityScore += 15;
    if (hasSynergyIndexData) feasibilityScore += 15;
    feasibilityScore = Math.max(10, Math.min(95, feasibilityScore));

    let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'BLOCKED_BY_PRIOR_ART' = 'MEDIUM';
    if (feasibilityScore < 30) riskLevel = 'BLOCKED_BY_PRIOR_ART';
    else if (feasibilityScore < 55) riskLevel = 'HIGH';
    else if (feasibilityScore < 75) riskLevel = 'MEDIUM';
    else riskLevel = 'LOW';

    // Regulatory Drug Licensing Rule 158B advice
    const regulatoryDrugLicensing = {
      rule: 'Drugs and Cosmetics Rules 1945, Rule 158B (Chapter IV-A)',
      category: compositionType === 'classical_combination' ? 'Classical Ayurvedic Medicine (Rule 158B(A))' : 'Patent or Proprietary ASU Medicine (Rule 158B(B))',
      clinicalTrialNeeded: compositionType !== 'classical_combination',
      requirements: compositionType === 'classical_combination'
        ? [
            'Proof of citation from authoritative texts listed in the First Schedule of DCA 1940 (e.g. Charaka Samhita, Sushruta Samhita, Sharangadhara Samhita).',
            'Schedule T Good Manufacturing Practices (GMP) compliance certificate.',
            'Heavy metal and microbiological limit clearance (Ayurvedic Pharmacopoeia of India - API standards).'
          ]
        : [
            'Acute oral toxicity testing in accordance with CDSCO / AYUSH guidelines.',
            'Controlled clinical trials (Phase I safety, Phase II/III efficacy) if introducing new therapeutic indication or modified extract.',
            'Standardized chemical fingerprinting (HPTLC / HPLC profiling of marker compounds).',
            'Schedule T GMP and stability study documentation for shelf-life validation.'
          ]
    };

    // International Filing Strategy
    const internationalFilingStrategy = {
      usptoNotes: 'Under 35 U.S.C. § 101 and the Natural Products Doctrine (Alice / Myriad), claims to crude botanical extracts are ineligible. Focus claims on either (1) a pharmaceutical combination with synergistic technical effect or (2) novel functionalized formulation/delivery platform. Expect TKDL prior art citations under 35 U.S.C. § 102.',
      epoNotes: 'Under EPC Article 56, the EPO requires rigorous comparative experimental data showing synergistic technical effect over individual components. Under EU Directive 2004/24/EC (THMPD), medicinal marketing requires 30 years traditional use (including 15 years in EU); otherwise food supplement pathway under EFSA is standard.',
      wipoDisclosureNote: 'Under the 2024 WIPO Treaty on Intellectual Property, Genetic Resources and Associated Traditional Knowledge (GRATK), patent applicants face mandatory international disclosure of the country of origin (India) and local community source.'
    };

    // Relevant TKDL references
    const relevantTKDLReferences = [
      `IPC Code A61K 36/00 (Medicinal preparations containing material from plants)`,
      `Traditional Knowledge Resource Classification (TKRC) mapped formulations for: ${herbsUsed.join(', ') || 'Ayurvedic Botanicals'}`,
      `Classical Samhitas: Charaka Samhita, Sushruta Samhita, Bhavaprakasha, Bhaishajya Ratnavali`
    ];

    const citations = retrieveRelevantSources(
      `${inventionTitle} ${herbsUsed.join(' ')} ${compositionType} section 3p section 3e nba form iii rule 158b`,
      'all',
      5
    );

    res.json({
      feasibilityScore,
      riskLevel,
      roadblocks,
      patentableCarveouts,
      nbaComplianceRequirements: nbaRequirements,
      regulatoryDrugLicensing,
      internationalFilingStrategy,
      relevantTKDLReferences,
      citations,
    });
  } catch (error: any) {
    console.error('Error in /api/assess-patentability:', error);
    res.status(500).json({ error: 'Assessment failed', details: error.message });
  }
});

// Setup Vite middleware in dev or static files in prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`IP-SAKTI Sahayak server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
