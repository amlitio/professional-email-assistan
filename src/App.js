import { useState } from 'react';
import { Send, Copy, Check, Mail, Sparkles, MessageSquare, User } from 'lucide-react';

const TRANSLATIONS = {
  "en-US": {
    "emailWritingAssistant": "Professional Email Assistant",
    "transformThoughtsDescription": "Transform your ideas into executive-level business communications with AI assistance",
    "yourThoughts": "Your Message",
    "thoughtsPlaceholder": "Describe what you need to communicate... e.g., 'Need to follow up on the Q4 budget proposal we discussed last week' or 'Want to decline this meeting but suggest alternative'",
    "tipKeyboardShortcut": "💡 Tip: Press Cmd/Ctrl + Enter to generate your email",
    "emailTone": "Business Tone",
    "executiveTone": "Executive",
    "executiveDescription": "C-level appropriate communication",
    "diplomaticTone": "Diplomatic",
    "diplomaticDescription": "Tactful and politically aware",
    "assertiveTone": "Assertive",
    "assertiveDescription": "Confident and direct",
    "collaborativeTone": "Collaborative",
    "collaborativeDescription": "Team-focused and inclusive",
    "formalTone": "Formal",
    "formalDescription": "Traditional corporate style",
    "consultativeTone": "Consultative",
    "consultativeDescription": "Advisory and strategic",
    "emailType": "Email Type",
    "emailTypeDescription": "Select the type of business communication",
    "contextOptional": "Reference Email (Optional)",
    "hide": "Hide",
    "show": "Show",
    "contextDescription": "Paste the email thread you're responding to for context-aware replies",
    "contextPlaceholder": "Paste the original email or thread here...",
    "subjectLine": "Subject Line",
    "generateSubject": "Generate Subject",
    "craftingEmail": "Crafting professional email...",
    "generateEmail": "Generate Email",
    "generatedEmail": "Professional Email",
    "generatedSubject": "Suggested Subject",
    "copied": "Copied!",
    "copy": "Copy Email",
    "copySubject": "Copy Subject",
    "emailWillAppearHere": "Your professional email will appear here",
    "getStartedPrompt": "Enter your message details and select tone to get started",
    "businessTips": "📋 Business Email Best Practices",
    "tipClearObjective": "• State your objective in the opening sentence",
    "tipActionItems": "• Include clear action items and deadlines",
    "tipProfessionalClosing": "• Use appropriate professional closings",
    "tipFollowUp": "• Set expectations for follow-up communication",
    "emailTypeFollowup": "Follow-up",
    "emailTypeRequest": "Request/Ask",
    "emailTypeUpdate": "Status Update", 
    "emailTypeMeeting": "Meeting Related",
    "emailTypeFeedback": "Feedback/Review",
    "emailTypeDecline": "Decline/Reject",
    "emailTypeIntroduction": "Introduction",
    "emailTypeProposal": "Proposal/Pitch"
  },
  "es-ES": {
    "emailWritingAssistant": "Asistente Profesional de Correos",
    "transformThoughtsDescription": "Transforma tus ideas en comunicaciones empresariales de nivel ejecutivo con asistencia de IA",
    "yourThoughts": "Tu Mensaje",
    "thoughtsPlaceholder": "Describe lo que necesitas comunicar... ej., 'Necesito dar seguimiento a la propuesta de presupuesto Q4 que discutimos' o 'Quiero declinar esta reunión pero sugerir alternativa'",
    "tipKeyboardShortcut": "💡 Consejo: Presiona Cmd/Ctrl + Enter para generar tu correo",
    "emailTone": "Tono Empresarial",
    "executiveTone": "Ejecutivo",
    "executiveDescription": "Comunicación apropiada para nivel C",
    "diplomaticTone": "Diplomático", 
    "diplomaticDescription": "Táctil y políticamente consciente",
    "assertiveTone": "Asertivo",
    "assertiveDescription": "Seguro y directo",
    "collaborativeTone": "Colaborativo",
    "collaborativeDescription": "Enfocado en equipo e inclusivo",
    "formalTone": "Formal",
    "formalDescription": "Estilo corporativo tradicional",
    "consultativeTone": "Consultivo",
    "consultativeDescription": "Asesor y estratégico",
    "emailType": "Tipo de Correo",
    "emailTypeDescription": "Selecciona el tipo de comunicación empresarial",
    "contextOptional": "Correo de Referencia (Opcional)",
    "hide": "Ocultar",
    "show": "Mostrar", 
    "contextDescription": "Pega el hilo de correo al que respondes para respuestas contextualizadas",
    "contextPlaceholder": "Pega el correo original o hilo aquí...",
    "subjectLine": "Línea de Asunto",
    "generateSubject": "Generar Asunto",
    "craftingEmail": "Creando correo profesional...",
    "generateEmail": "Generar Correo",
    "generatedEmail": "Correo Profesional",
    "generatedSubject": "Asunto Sugerido",
    "copied": "¡Copiado!",
    "copy": "Copiar Correo",
    "copySubject": "Copiar Asunto",
    "emailWillAppearHere": "Tu correo profesional aparecerá aquí",
    "getStartedPrompt": "Ingresa detalles del mensaje y selecciona tono para comenzar",
    "businessTips": "📋 Mejores Prácticas de Correo Empresarial",
    "tipClearObjective": "• Establece tu objetivo en la primera oración",
    "tipActionItems": "• Incluye elementos de acción claros y plazos",
    "tipProfessionalClosing": "• Usa cierres profesionales apropiados", 
    "tipFollowUp": "• Establece expectativas para comunicación de seguimiento",
    "emailTypeFollowup": "Seguimiento",
    "emailTypeRequest": "Solicitud",
    "emailTypeUpdate": "Actualización",
    "emailTypeMeeting": "Relacionado con Reunión",
    "emailTypeFeedback": "Retroalimentación",
    "emailTypeDecline": "Declinar/Rechazar",
    "emailTypeIntroduction": "Presentación",
    "emailTypeProposal": "Propuesta/Pitch"
  }
};

const appLocale = '{{APP_LOCALE}}';
const browserLocale = navigator.languages?.[0] || navigator.language || 'en-US';
const findMatchingLocale = (locale) => {
  if (TRANSLATIONS[locale]) return locale;
  const lang = locale.split('-')[0];
  const match = Object.keys(TRANSLATIONS).find(key => key.startsWith(lang + '-'));
  return match || 'en-US';
};
const locale = (appLocale !== '{{APP_LOCALE}}') ? findMatchingLocale(appLocale) : findMatchingLocale(browserLocale);
const t = (key) => TRANSLATIONS[locale]?.[key] || TRANSLATIONS['en-US'][key] || key;

export default function EmailWriterApp() {
  const [rawThoughts, setRawThoughts] = useState('');
  const [tone, setTone] = useState('executive');
  const [emailType, setEmailType] = useState('request');
  const [contextEmail, setContextEmail] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [generatedSubject, setGeneratedSubject] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [showContext, setShowContext] = useState(false);

  const tones = [
    { value: 'executive', label: t('executiveTone'), description: t('executiveDescription') },
    { value: 'diplomatic', label: t('diplomaticTone'), description: t('diplomaticDescription') },
    { value: 'assertive', label: t('assertiveTone'), description: t('assertiveDescription') },
    { value: 'collaborative', label: t('collaborativeTone'), description: t('collaborativeDescription') },
    { value: 'formal', label: t('formalTone'), description: t('formalDescription') },
    { value: 'consultative', label: t('consultativeTone'), description: t('consultativeDescription') }
  ];

  const emailTypes = [
    { value: 'followup', label: t('emailTypeFollowup') },
    { value: 'request', label: t('emailTypeRequest') },
    { value: 'update', label: t('emailTypeUpdate') },
    { value: 'meeting', label: t('emailTypeMeeting') },
    { value: 'feedback', label: t('emailTypeFeedback') },
    { value: 'decline', label: t('emailTypeDecline') },
    { value: 'introduction', label: t('emailTypeIntroduction') },
    { value: 'proposal', label: t('emailTypeProposal') }
  ];

  const generateEmail = async () => {
    if (!rawThoughts.trim()) return;

    setIsLoading(true);
    try {
      const contextPart = contextEmail.trim() 
        ? `\n\nReference Email Context:\n"${contextEmail}"\n\n`
        : '';

      const businessPrompt = `You are an expert business communication consultant. Create a professional business email based on the following requirements:

Message Intent: "${rawThoughts}"
Email Type: ${emailType}
Tone: ${tone}${contextPart}

Business Communication Guidelines:
- Use clear, executive-level language appropriate for ${tone} tone
- Structure with proper business email format
- Include actionable next steps when appropriate
- Maintain professional courtesy while being direct
- Use industry-standard business communication practices

Please provide two outputs:

1. SUBJECT LINE: Create a clear, actionable subject line (max 60 characters)
2. EMAIL BODY: Write the complete email body without subject line

Format your response exactly like this:
SUBJECT: [subject line here]

EMAIL:
[email body here]

Please respond in ${locale} language.`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1500,
          messages: [{ role: "user", content: businessPrompt }]
        })
      });
      
      const data = await response.json();
      const claudeResponse = data.content[0].text;
      
      // Parse the response to extract subject and email
      const parts = claudeResponse.trim().split('\n\nEMAIL:\n');
      if (parts.length === 2) {
        const subjectLine = parts[0].replace('SUBJECT: ', '').trim();
        const emailBody = parts[1].trim();
        setGeneratedSubject(subjectLine);
        setGeneratedEmail(emailBody);
      } else {
        // Fallback parsing
        const lines = claudeResponse.trim().split('\n');
        const subjectIndex = lines.findIndex(line => line.startsWith('SUBJECT:'));
        if (subjectIndex >= 0) {
          setGeneratedSubject(lines[subjectIndex].replace('SUBJECT: ', '').trim());
          setGeneratedEmail(lines.slice(subjectIndex + 1).join('\n').replace(/^EMAIL:\s*/, '').trim());
        } else {
          setGeneratedEmail(claudeResponse.trim());
          setGeneratedSubject('');
        }
      }
    } catch (error) {
      console.error('Error generating email:', error);
      setGeneratedEmail('Sorry, there was an error generating your professional email. Please try again.');
      setGeneratedSubject('');
    } finally {
      setIsLoading(false);
    }
  };

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (error) {
      console.error('Failed to copy email:', error);
    }
  };

  const copySubjectToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedSubject);
      setCopiedSubject(true);
      setTimeout(() => setCopiedSubject(false), 2000);
    } catch (error) {
      console.error('Failed to copy subject:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      generateEmail();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-lg">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent mb-4">
              {t('emailWritingAssistant')}
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              {t('transformThoughtsDescription')}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-700/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-2xl font-semibold text-slate-100">{t('yourThoughts')}</h2>
              </div>
              
              <textarea
                value={rawThoughts}
                onChange={(e) => setRawThoughts(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={t('thoughtsPlaceholder')}
                className="w-full h-40 p-4 border border-slate-600 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-700/50 backdrop-blur-sm text-slate-100 placeholder-slate-400"
              />
              
              <div className="mt-4 text-sm text-slate-400">
                {t('tipKeyboardShortcut')}
              </div>
            </div>

            {/* Email Type Selection */}
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-700/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-purple-400" />
                </div>
                <h2 className="text-2xl font-semibold text-slate-100">{t('emailType')}</h2>
              </div>
              <p className="text-slate-300 mb-4">{t('emailTypeDescription')}</p>
              
              <div className="grid grid-cols-2 gap-3">
                {emailTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setEmailType(type.value)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                      emailType === type.value
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-slate-600 bg-slate-700/50 hover:border-slate-500 hover:bg-slate-700/70'
                    }`}
                  >
                    <div className="font-medium text-slate-100 text-sm">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Business Tone Selection */}
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-700/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                </div>
                <h2 className="text-2xl font-semibold text-slate-100">{t('emailTone')}</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {tones.map((toneOption) => (
                  <button
                    key={toneOption.value}
                    onClick={() => setTone(toneOption.value)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      tone === toneOption.value
                        ? 'border-blue-500 bg-blue-500/20 shadow-md'
                        : 'border-slate-600 bg-slate-700/50 hover:border-slate-500 hover:bg-slate-700/70'
                    }`}
                  >
                    <div className="font-medium text-slate-100">{toneOption.label}</div>
                    <div className="text-sm text-slate-300 mt-1">{toneOption.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Context Email Section */}
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-700/50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-600/50 rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5 text-slate-300" />
                  </div>
                  <h2 className="text-2xl font-semibold text-slate-100">{t('contextOptional')}</h2>
                </div>
                <button
                  onClick={() => setShowContext(!showContext)}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  {showContext ? t('hide') : t('show')}
                </button>
              </div>
              
              {showContext && (
                <>
                  <p className="text-slate-300 mb-4">
                    {t('contextDescription')}
                  </p>
                  <textarea
                    value={contextEmail}
                    onChange={(e) => setContextEmail(e.target.value)}
                    placeholder={t('contextPlaceholder')}
                    className="w-full h-32 p-4 border border-slate-600 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-700/50 backdrop-blur-sm text-slate-100 placeholder-slate-400"
                  />
                </>
              )}
            </div>

            {/* Generate Button */}
            <button
              onClick={generateEmail}
              disabled={isLoading || !rawThoughts.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  {t('craftingEmail')}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {t('generateEmail')}
                </>
              )}
            </button>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            {/* Subject Line */}
            {generatedSubject && (
              <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-700/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <Mail className="w-4 h-4 text-yellow-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-100">{t('generatedSubject')}</h3>
                  </div>
                  <button
                    onClick={copySubjectToClipboard}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-slate-200 font-medium text-sm"
                  >
                    {copiedSubject ? (
                      <>
                        <Check className="w-3 h-3 text-green-400" />
                        {t('copied')}
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        {t('copySubject')}
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-slate-700/60 rounded-lg p-4 border border-slate-600">
                  <p className="text-slate-100 font-medium">{generatedSubject}</p>
                </div>
              </div>
            )}

            {/* Email Body */}
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-700/50 min-h-96">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-green-400" />
                  </div>
                  <h2 className="text-2xl font-semibold text-slate-100">{t('generatedEmail')}</h2>
                </div>
                
                {generatedEmail && (
                  <button
                    onClick={copyEmailToClipboard}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-slate-200 font-medium"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        {t('copied')}
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        {t('copy')}
                      </>
                    )}
                  </button>
                )}
              </div>
              
              {generatedEmail ? (
                <div className="bg-slate-700/60 rounded-xl p-6 border border-slate-600">
                  <pre className="whitespace-pre-wrap font-sans text-slate-100 leading-relaxed">
                    {generatedEmail}
                  </pre>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                  <Mail className="w-16 h-16 mb-4 opacity-50" />
                  <p className="text-lg">{t('emailWillAppearHere')}</p>
                  <p className="text-sm mt-2">{t('getStartedPrompt')}</p>
                </div>
              )}
            </div>

            {/* Business Tips */}
            <div className="bg-gradient-to-r from-slate-800/60 to-slate-700/60 rounded-2xl p-6 border border-slate-600/50">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-blue-400" />
                </div>
                <h3 className="font-semibold text-slate-100">{t('businessTips')}</h3>
              </div>
              <ul className="text-sm text-slate-300 space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">•</span>
                  <span>State your objective in the opening sentence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">•</span>
                  <span>Include clear action items and deadlines</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">•</span>
                  <span>Use appropriate professional closings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">•</span>
                  <span>Set expectations for follow-up communication</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
