import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage, SourceCitation, Regime } from '../types';
import { Send, Sparkles, Scale, AlertTriangle, ShieldCheck, CornerDownLeft, RefreshCw, Bookmark, Copy, Check, Info } from 'lucide-react';

interface ChatAssistantProps {
  currentRegime: Regime;
  currentLanguage: string;
  onOpenCitation: (citation: SourceCitation) => void;
}

const SAMPLE_QUERIES = [
  {
    title: 'Section 3(p) & 3(e) Analysis',
    query: 'Can I patent an Ayurvedic herbal formulation combining Ashwagandha, Guduchi, and Pippali for immune modulation?'
  },
  {
    title: 'NBA Form III Approval',
    query: 'What are the mandatory requirements and timeline for obtaining NBA Form III prior approval under Section 6 of Biological Diversity Act?'
  },
  {
    title: 'TKDL Prior Art Scrutiny',
    query: 'How does the Traditional Knowledge Digital Library (TKDL) and IPC A61K 36/00 impact patent examination at the EPO and USPTO?'
  },
  {
    title: 'Rule 158B ASU Drug Licensing',
    query: 'What is the regulatory difference between classical Ayurvedic medicine and proprietary ASU medicine licensing under Rule 158B?'
  },
  {
    title: 'WIPO Treaty 2024 & Export',
    query: 'How does the WIPO Treaty on Intellectual Property, Genetic Resources and Associated Traditional Knowledge (2024) affect patent filings abroad?'
  }
];

export const ChatAssistant: React.FC<ChatAssistantProps> = ({
  currentRegime,
  currentLanguage,
  onOpenCitation,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: `**Namaste! Welcome to IP-SAKTI Sahayak (बौद्धिक सम्पदा एवं नियामक सहायक).**\n\nI am your multilingual, RAG-grounded AI advisor for **Intellectual Property, Patentability, and Regulatory Compliance** in **Ayurveda, Siddha, and Unani (ASU)** medicines.\n\n### How I Assist You:\n- **Patentability Audits**: Assessing your Ayurvedic invention against **Section 3(p)** (traditional knowledge), **Section 3(d)** (efficacy enhancement), and **Section 3(e)** (synergy requirement for admixtures).\n- **TKDL Prior Art Verification**: Checking IPC A61K 36/00 classifications and classical Samhitas (Charaka, Sushruta, Ashtanga Hridaya).\n- **Biodiversity & ABS Compliance**: Navigating **National Biodiversity Authority (NBA) Form III** approval under Section 6 of the Biological Diversity Act 2002/2023.\n- **Drug Licensing**: Guidance on **Rule 158B of Drugs & Cosmetics Rules 1945** (Classical vs. Patent/Proprietary ASU medicines).\n- **International Regimes**: Strategy for **USPTO (35 U.S.C. 101/102)**, **EPO (Articles 54/56)**, **WIPO Treaty 2024 (Mandatory Origin Disclosure)**, and **Nagoya Protocol (ABS)**.\n\n*Select a sample inquiry below or enter your formulation/IP query in any supported language.*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedFollowUps: [
        'How to overcome Section 3(p) traditional knowledge rejection?',
        'What is required for NBA Form III prior approval?',
        'How to prove synergy under Section 3(e) with Combination Index?'
      ]
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      regimeContext: currentRegime,
      language: currentLanguage,
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query.trim(),
          language: currentLanguage,
          regime: currentRegime,
          history: messages.slice(-4).map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: data.text || 'No response generated.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: data.citations || [],
        suggestedFollowUps: data.suggestedFollowUps || [],
        patentabilityInsight: data.patentabilityInsight,
        regimeContext: currentRegime,
        language: currentLanguage,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: `⚠️ **Advisory Notice:** Encountered an error generating response: ${err.message}. Please verify server connection.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-175px)] max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 font-serif">
      {/* Sample Query Editorial Selector */}
      <div className="mb-3 shrink-0">
        <div className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B] font-sans mb-1.5 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
          <span>Curated Inquiries &amp; Historical Precedents:</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none font-sans">
          {SAMPLE_QUERIES.map((sq, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(sq.query)}
              disabled={loading}
              className="px-3 py-1.5 bg-[#FAF7ED] hover:bg-[#FFF9E5] hover:border-[#B8860B] border border-[#DED9C4] text-[#2D4F1E] text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 disabled:opacity-50 text-left cursor-pointer shadow-2xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B] shrink-0" />
              <span className="font-semibold">{sq.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages Container (Editorial Parchment Scroll) */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-6 bg-[#FAF7ED]/60 p-4 sm:p-6 border border-[#DED9C4] shadow-2xs">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-full`}
            >
              <div
                className={`p-5 sm:p-6 max-w-3xl w-full leading-relaxed border transition-all ${
                  isUser
                    ? 'bg-white border-2 border-[#2D4F1E] text-[#1A1A1A] shadow-[4px_4px_0px_#2D4F1E]'
                    : 'bg-[#FDFCF6] text-[#1A1A1A] border border-[#DED9C4] shadow-xs'
                }`}
              >
                {/* User Message Header */}
                {isUser && (
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#DED9C4] font-sans">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#B8860B]">
                      Query Received
                    </span>
                    <span className="text-[10px] text-stone-500 font-medium">
                      {msg.timestamp}
                    </span>
                  </div>
                )}

                {/* Assistant Header / Metadata */}
                {!isUser && (
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#DED9C4] font-sans">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-[#2D4F1E] text-[#FDFCF6] flex items-center justify-center text-xs font-bold">
                        <Scale className="w-3 h-3" />
                      </div>
                      <span className="text-xs uppercase tracking-wider font-bold text-[#2D4F1E]">
                        AI Insight &amp; Legal Guidance
                      </span>
                      <span className="text-[#DED9C4]">•</span>
                      <span className="text-[11px] text-stone-500">{msg.timestamp}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopy(msg.text, msg.id)}
                        className="p-1 text-stone-400 hover:text-[#2D4F1E] hover:bg-[#FAF7ED] transition-colors"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-[#2D4F1E]" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Risk Insight Badge if present (Editorial Callout Box) */}
                {!isUser && msg.patentabilityInsight && (
                  <div className="mb-4 p-3.5 border border-[#B8860B] bg-[#FFF9E5] text-xs font-serif">
                    <div className="flex items-center gap-2 font-sans font-bold uppercase tracking-wider text-[11px] text-[#B8860B] mb-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#B8860B]" />
                      <span>Statutory Risk Evaluation:</span>
                      <span className={`px-2 py-0.5 text-[10px] uppercase font-extrabold ${
                        msg.patentabilityInsight.riskLevel === 'CRITICAL_BAR' || msg.patentabilityInsight.riskLevel === 'HIGH'
                          ? 'bg-rose-900 text-white'
                          : msg.patentabilityInsight.riskLevel === 'MEDIUM'
                          ? 'bg-[#B8860B] text-white'
                          : 'bg-[#2D4F1E] text-white'
                      }`}>
                        {msg.patentabilityInsight.riskLevel}
                      </span>
                    </div>
                    <p className="text-[#1A1A1A] italic leading-relaxed text-xs sm:text-sm">
                      "{msg.patentabilityInsight.advice}"
                    </p>
                  </div>
                )}

                {/* Message Body (Editorial Typography) */}
                <div className={`prose max-w-none prose-sm leading-relaxed ${isUser ? 'font-serif text-base sm:text-lg font-medium text-[#2D4F1E]' : 'text-[#1A1A1A]'}`}>
                  <ReactMarkdown
                    components={{
                      h3: ({ node, ...props }) => <h3 className="text-base font-bold text-[#2D4F1E] font-serif mt-3 mb-1.5 pb-1 border-b border-[#DED9C4]" {...props} />,
                      h4: ({ node, ...props }) => <h4 className="text-sm font-bold text-[#2D4F1E] font-serif mt-2.5 mb-1" {...props} />,
                      ul: ({ node, ...props }) => <ul className="list-disc pl-5 my-2 space-y-1 font-serif text-sm" {...props} />,
                      ol: ({ node, ...props }) => <ol className="list-decimal pl-5 my-2 space-y-1 font-serif text-sm" {...props} />,
                      li: ({ node, ...props }) => <li className="text-[#1A1A1A] my-0.5" {...props} />,
                      p: ({ node, ...props }) => <p className="mb-2.5 text-[#1A1A1A] text-sm sm:text-base leading-relaxed" {...props} />,
                      strong: ({ node, ...props }) => <strong className="font-bold text-[#2D4F1E]" {...props} />,
                      em: ({ node, ...props }) => <em className="italic text-[#2D4F1E]" {...props} />,
                      code: ({ node, ...props }) => <code className="px-1.5 py-0.5 bg-[#FAF7ED] border border-[#DED9C4] text-[#2D4F1E] font-mono text-xs font-semibold" {...props} />
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>

                {/* Source Citations Section (Editorial Verification References) */}
                {!isUser && msg.citations && msg.citations.length > 0 && (
                  <div className="mt-5 pt-3 border-t border-[#DED9C4]">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B] font-sans mb-2 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#2D4F1E]" />
                      <span>Verification Sources (Canonical Grounds):</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {msg.citations.map((citation) => (
                        <button
                          key={citation.id}
                          onClick={() => onOpenCitation(citation)}
                          className="group p-2.5 bg-[#FAF7ED] hover:bg-[#FFF9E5] border border-[#DED9C4] hover:border-[#B8860B] transition-all text-left font-sans cursor-pointer shadow-2xs"
                          title="Click to view full statutory text & legal implications"
                        >
                          <div className="flex items-center justify-between text-[10px] font-bold text-[#B8860B] mb-0.5">
                            <span>[{citation.id}]</span>
                            <span className="text-[9px] uppercase font-semibold text-[#2D4F1E]">{citation.regime}</span>
                          </div>
                          <div className="text-xs font-bold text-[#2D4F1E] group-hover:underline truncate">
                            {citation.title}
                          </div>
                          <div className="text-[10px] text-stone-500 truncate mt-0.5">
                            {citation.statutoryReference}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested Follow-Ups */}
                {!isUser && msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-[#DED9C4] font-sans">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#2D4F1E]/70 mb-1.5 flex items-center gap-1">
                      <CornerDownLeft className="w-3 h-3 text-[#B8860B]" />
                      <span>Suggested Lines of Inquiry:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestedFollowUps.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(q)}
                          disabled={loading}
                          className="text-xs px-2.5 py-1 bg-white hover:bg-[#FFF9E5] hover:border-[#B8860B] text-[#2D4F1E] transition-colors border border-[#DED9C4] text-left font-medium cursor-pointer shadow-2xs"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-start max-w-xl">
            <div className="p-4 bg-white border-2 border-[#2D4F1E] shadow-[3px_3px_0px_#2D4F1E] text-xs text-[#2D4F1E] flex items-center gap-3 font-sans">
              <div className="w-5 h-5 border-2 border-[#2D4F1E] border-t-[#B8860B] rounded-full animate-spin shrink-0" />
              <div>
                <p className="font-bold uppercase tracking-wider text-[11px] text-[#2D4F1E]">
                  Grounding with TKDL &amp; Statutory Codex...
                </p>
                <p className="text-stone-600 text-[11px]">
                  Cross-referencing Sections 3(p), 3(e), NBA Form III, and international regimes
                </p>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Query Input Bar (Sharp Editorial Shadow Box) */}
      <div className="mt-3 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="border-2 border-[#2D4F1E] p-2 sm:p-3 flex items-center bg-white shadow-[4px_4px_0px_#2D4F1E] transition-all gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask in ${currentLanguage === 'hi' ? 'हिन्दी' : currentLanguage === 'sa' ? 'संस्कृतम्' : 'English'} regarding Ayurvedic patentability, TKDL references, or regulatory filings...`}
            disabled={loading}
            className="flex-1 outline-hidden font-serif italic text-sm sm:text-base text-[#1A1A1A] placeholder:text-stone-400 bg-transparent px-2"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="bg-[#2D4F1E] hover:bg-[#1f3714] text-[#FDFCF6] px-5 sm:px-7 py-2 font-sans text-xs uppercase tracking-widest font-bold disabled:opacity-40 transition-colors shrink-0 cursor-pointer shadow-xs"
          >
            <span>Consult</span>
          </button>
        </form>
        <div className="flex items-center justify-between text-[10px] font-sans text-[#2D4F1E]/70 uppercase tracking-wider mt-1.5 px-1">
          <span>Targeting: <strong className="text-[#2D4F1E] font-bold">{currentRegime === 'all' ? 'All Regimes' : currentRegime}</strong></span>
          <span>Verified against Gazette Notifications &amp; Classical Samhitas</span>
        </div>
      </div>
    </div>
  );
};
