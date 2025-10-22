import { Language, Citation } from '../../types/chat';
import { ChatResponse } from '../../types/api';

/**
 * LLM Service - handles AI response generation
 * Currently uses mock responses - will be replaced with real LLM API
 */
export const llmService = {
  /**
   * Generate AI response based on user input
   * @param userMessage - The user's question/message
   * @param language - Current language setting
   */
  generateResponse: async (userMessage: string, language: Language): Promise<ChatResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const lowerMessage = userMessage.toLowerCase();

    // Mock responses in English
    const responsesEn = {
      default: `Thank you for your question. Based on Philippine labor law, I can provide you with general information about your concern.

This is a simulated response. In a production environment, this would connect to an AI backend that analyzes your question and provides detailed legal guidance based on the Labor Code of the Philippines, DOLE regulations, and relevant jurisprudence.

For specific legal advice tailored to your situation, I recommend consulting with a licensed labor law attorney or visiting your nearest DOLE office.`,
      overtime: `Under Article 87 of the Labor Code of the Philippines, employees are entitled to overtime pay for work performed beyond 8 hours in a regular workday.

Key points:
• Overtime rate: At least 125% of regular hourly rate
• Holiday overtime: At least 130% of regular hourly rate
• Night shift differential: Additional 10% for work between 10 PM - 6 AM

If you believe you haven't been properly compensated for overtime work, you may file a complaint with DOLE or pursue SEnA (Single Entry Approach) for mediation.`,
      termination: `Article 279 of the Labor Code protects employees from illegal dismissal. Employers must have just or authorized causes to terminate employment.

Just causes include:
• Serious misconduct
• Willful disobedience
• Gross neglect of duty
• Fraud or breach of trust
• Commission of a crime

If terminated without just cause or due process, you may be entitled to:
• Reinstatement without loss of seniority rights
• Full back wages
• Other benefits

Consider filing a complaint with DOLE or seeking legal counsel immediately.`
    };

    // Mock responses in Filipino
    const responsesFil = {
      default: `Salamat sa inyong tanong. Batay sa batas paggawa ng Pilipinas, makapagbibigay ako ng pangkalahatang impormasyon tungkol sa inyong alalahanin.

Ito ay isang simulated response. Sa production environment, ito ay kukonekta sa AI backend na susuriin ang inyong tanong at magbibigay ng detalyadong legal guidance batay sa Labor Code ng Pilipinas, mga regulasyon ng DOLE, at mga kaugnay na jurisprudence.

Para sa tiyak na legal advice na angkop sa inyong sitwasyon, inirerekomenda ko na kumunsulta sa isang lisensyadong labor law attorney o bumisita sa pinakamalapit na tanggapan ng DOLE.`,
      overtime: `Sa ilalim ng Article 87 ng Labor Code ng Pilipinas, ang mga empleyado ay may karapatan sa overtime pay para sa trabahong ginawa lampas sa 8 oras sa regular na araw ng trabaho.

Mga pangunahing punto:
• Overtime rate: Hindi bababa sa 125% ng regular hourly rate
• Holiday overtime: Hindi bababa sa 130% ng regular hourly rate
• Night shift differential: Karagdagang 10% para sa trabaho sa pagitan ng 10 PM - 6 AM

Kung naniniwala kayong hindi kayo nabayaran ng tama para sa overtime work, maaari kayong mag-file ng complaint sa DOLE o magpursigi ng SEnA (Single Entry Approach) para sa mediation.`,
      termination: `Ang Article 279 ng Labor Code ay nagpoprotekta sa mga empleyado laban sa illegal dismissal. Ang mga employer ay dapat magkaroon ng just o authorized causes upang tapusin ang employment.

Mga just causes:
• Seryosong misconduct
• Willful disobedience
• Gross neglect of duty
• Fraud o breach of trust
• Pagkakagawa ng krimen

Kung tinerminate nang walang just cause o due process, maaari kayong maging entitled sa:
• Reinstatement nang walang pagkawala ng seniority rights
• Buong back wages
• Iba pang benefits

Isaalang-alang ang pag-file ng complaint sa DOLE o paghahanap ng legal counsel kaagad.`
    };

    // Mock responses in Cebuano
    const responsesCeb = {
      default: `Salamat sa imong pangutana. Base sa balaod sa trabaho sa Pilipinas, makahatag ko og pangkalahatang impormasyon bahin sa imong kabalaka.

Kini usa ka simulated response. Sa production environment, kini mokonekta sa AI backend nga mosusi sa imong pangutana ug maghatag og detalyadong legal guidance base sa Labor Code sa Pilipinas, mga regulasyon sa DOLE, ug mga related jurisprudence.

Para sa piho nga legal advice nga angay sa imong sitwasyon, girekomendar nako nga mokonsulta sa usa ka lisensyadong labor law attorney o mobisita sa pinakadulol nga opisina sa DOLE.`,
      overtime: `Ubos sa Article 87 sa Labor Code sa Pilipinas, ang mga empleyado dunay katungod sa overtime pay para sa trabahong gihimo labaw sa 8 ka oras sa regular nga adlaw sa trabaho.

Mga importanteng punto:
• Overtime rate: Dili mubu sa 125% sa regular hourly rate
• Holiday overtime: Dili mubu sa 130% sa regular hourly rate
• Night shift differential: Dugang nga 10% para sa trabaho sa taliwala sa 10 PM - 6 AM

Kon nagtuo ka nga wala ka bayaran og husto para sa overtime work, mahimo kang mag-file og complaint sa DOLE o magpursigi og SEnA (Single Entry Approach) para sa mediation.`,
      termination: `Ang Article 279 sa Labor Code nagprotekta sa mga empleyado batok sa illegal dismissal. Ang mga employer kinahanglan dunay just o authorized causes aron tapuson ang employment.

Mga just causes:
• Grabi nga misconduct
• Willful disobedience
• Gross neglect of duty
• Fraud o breach of trust
• Paghimo og krimen

Kon gitangtang ka nga walay just cause o due process, mahimo kang entitled sa:
• Reinstatement nga walay nawala nga seniority rights
• Tibuok back wages
• Ubang mga benepisyo

Ikonsiderar ang pag-file og complaint sa DOLE o pagpangita og legal counsel dayon.`
    };

    const responses = language === 'en' ? responsesEn : (language === 'fil' ? responsesFil : responsesCeb);

    // Determine which response to use based on keywords
    let content: string;
    if (lowerMessage.includes('overtime') || lowerMessage.includes('ot')) {
      content = responses.overtime;
    } else if (lowerMessage.includes('terminate') || lowerMessage.includes('fire') || lowerMessage.includes('tanggal')) {
      content = responses.termination;
    } else {
      content = responses.default;
    }

    // Mock citations
    const citations: Citation[] = [
      {
        id: '1',
        text: 'Regular working hours shall not exceed eight (8) hours a day.',
        source: 'Labor Code of the Philippines',
        article: 'Article 83',
        url: 'https://www.dole.gov.ph/labor-code-of-the-philippines/'
      },
      {
        id: '2',
        text: 'Work performed beyond eight hours a day shall be paid overtime compensation.',
        source: 'Labor Code of the Philippines',
        article: 'Article 87',
        url: 'https://www.dole.gov.ph/labor-code-of-the-philippines/'
      }
    ];

    // Mock suggestions based on language
    const suggestions = language === 'en'
      ? ['Contact DOLE', 'File SEnA Request', 'Find a Lawyer']
      : language === 'fil'
      ? ['Makipag-ugnayan sa DOLE', 'Mag-file ng SEnA', 'Humanap ng Abogado']
      : ['Kontak sa DOLE', 'Mag-file og SEnA', 'Pangitag Abogado'];

    return {
      content,
      citations,
      suggestions
    };
  }
};
