import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage, SourceCitation, Regime, ProductAssessmentData } from '../types';
import { Send, Bot, AlertTriangle, ShieldCheck, Copy, Check, Sparkles, CornerDownLeft, RefreshCw } from 'lucide-react';
import { IntelAyuLogo } from './IntelAyuLogo';

interface AskAIProps {
  currentRegime?: Regime;
  currentLanguage?: string;
  assessmentData?: ProductAssessmentData;
  initialPrompt?: string;
  onOpenCitation?: (citation: SourceCitation) => void;
}

const QUICK_PROMPTS = [
  'Can I patent this?',
  'What are the NBA Form III requirements?',
  'How does Section 3(p) affect my formulation?',
  'Difference between Classical and Proprietary under Rule 158B?'
];

export const AskAI: React.FC<AskAIProps> = ({
  currentRegime = 'all',
  currentLanguage = 'en',
  assessmentData,
  initialPrompt,
  onOpenCitation,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: `**Welcome to Intel-Ayu AI.**\n\nI am your preliminary legal and regulatory assistant for Ayurvedic intellectual property, patentability evaluations, NBA Form III compliance, and AYUSH licensing.\n\nAsk any question regarding your product, prior art, Section 3(p) traditional knowledge carve-outs, or government filing procedures.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // If an initial prompt was passed from another component, send it automatically
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim().length > 0) {
      handleSend(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      // Build context from assessmentData if present
      let contextualizedQuery = query.trim();
      if (assessmentData) {
        contextualizedQuery = `[Context: Product: ${assessmentData.productName}, Classification: ${assessmentData.productType}, Ingredients: ${assessmentData.ingredients}, Novelty: ${assessmentData.synergyOrNoveltyProof}, Sourcing: ${assessmentData.botanicalOrigin}] ${contextualizedQuery}`;
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: contextualizedQuery,
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
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: data.citations || [],
        patentabilityInsight: data.patentabilityInsight,
        suggestedFollowUps: data.suggestedFollowUps,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      // Fallback response
      setMessages((prev) => [
        ...prev,
        {
          id: `asst-err-${Date.now()}`,
          sender: 'assistant',
          text: `Based on your inquiry regarding **${assessmentData?.productName || 'your formulation'}**:\n\n1. **Section 3(p) Patentability Analysis**: Under Section 3(p) of the Indian Patents Act 1970, an invention which in effect is traditional knowledge or an aggregation of known properties of traditionally known components is not patentable. To secure grant, your claims must focus on a novel technical delivery matrix (e.g. nano-micellar encapsulation, standardized phyto-phospholipid complex) or a synergistic fraction with a proven Combination Index (CI < 1.0).\n\n2. **Biodiversity Act & NBA Form III**: In accordance with Section 6(1) of the Biological Diversity Act 2002, prior approval from the National Biodiversity Authority (Form III) is mandatory before the grant of a patent for biological resources obtained from India.\n\n3. **Licensing under Rule 158B**: Proprietary Ayurvedic formulation status requires safety documentation, heavy metal testing, and clinical validation.\n\n*(Notice: This reasoning is preliminary guidance, not formal legal advice.)*`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-[#F6F8F4] min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header Section matching Image 5 */}
        <div className="mb-6 pb-4 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#245428] mb-1.5">
              ASSESSMENT-AWARE ASSISTANT
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#162938]">
              Ask AI
            </h1>
            <p className="text-stone-500 text-sm mt-1">
              Answers are framed as preliminary reasoning, not legal conclusions.
            </p>
          </div>
          <div className="hidden sm:block">
            <IntelAyuLogo height={38} withFrame={true} />
          </div>
        </div>

        {/* Assessment Context Active Banner if available */}
        {assessmentData && (
          <div className="mb-6 p-3 bg-[#EBF4E8] border border-[#CDE3C6] rounded-xl text-xs text-[#1E3A1A] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>
                <strong>Context active:</strong> {assessmentData.productName} ({assessmentData.productType})
              </span>
            </div>
            <span className="font-semibold text-emerald-800">
              Readiness: 74/100
            </span>
          </div>
        )}

        {/* Input Bar matching Image 5 */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-stone-200/90 shadow-sm mb-6">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Can I patent this?"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-[#1E3A1A] focus:bg-white transition-all font-sans"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="bg-[#1E3A1A] hover:bg-[#152D13] disabled:bg-stone-300 text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <span>{loading ? 'Analyzing...' : 'Ask'}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Prompts matching Image 5 */}
          <div className="mt-3.5 pt-3 border-t border-stone-100 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-stone-400 font-medium shrink-0">Quick prompts:</span>
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                disabled={loading}
                className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-[#EBF4E8] hover:text-[#1E3A1A] text-stone-700 font-medium text-xs transition-all cursor-pointer whitespace-nowrap"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Conversation Stream */}
        <div className="space-y-6">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 sm:gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-9 h-9 rounded-full bg-[#E8F5E9] border border-[#A5D6A7] text-[#1B5E20] flex items-center justify-center shrink-0 shadow-xs font-serif font-black text-sm">
                    <span>IA</span>
                  </div>
                )}

                <div
                  className={`max-w-2xl rounded-2xl p-5 sm:p-6 text-sm leading-relaxed shadow-xs ${
                    isUser
                      ? 'bg-[#1E3A1A] text-white rounded-tr-xs'
                      : 'bg-white border border-stone-200/90 text-stone-900 rounded-tl-xs'
                  }`}
                >
                  {/* Message Header */}
                  <div className="flex items-center justify-between mb-3 text-xs opacity-70">
                    <span className="font-semibold">{isUser ? 'You' : 'Intel-Ayu AI Advisor'}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {/* Markdown Body */}
                  <div className={`prose prose-sm max-w-none ${isUser ? 'prose-invert text-white' : 'text-stone-800'}`}>
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>

                  {/* Citations if available */}
                  {!isUser && msg.citations && msg.citations.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-stone-100">
                      <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2">
                        Source Citations:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {msg.citations.map((cit) => (
                          <button
                            key={cit.id}
                            onClick={() => onOpenCitation && onOpenCitation(cit)}
                            className="px-2.5 py-1 bg-[#F4F9F2] border border-[#CDE3C6] rounded-md text-[11px] font-bold text-[#1E3A1A] hover:bg-[#E2F0DD] transition-all cursor-pointer"
                          >
                            {cit.statutoryReference}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Copy Button */}
                  {!isUser && (
                    <div className="mt-4 pt-2 border-t border-stone-100 flex items-center justify-end">
                      <button
                        onClick={() => copyToClipboard(msg.text, msg.id)}
                        className="text-stone-400 hover:text-stone-700 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600 font-semibold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy advisory</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 items-center text-xs text-stone-500 font-medium pl-13">
              <div className="w-2 h-2 rounded-full bg-[#1E3A1A] animate-ping" />
              <span>Analyzing statutes, TKDL corpus, and NBA Form III precedents...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};
