import { Language } from '../types/chat';

export const translations = {
  en: {
    appTitle: 'Legal Assistant',
    appSubtitle: 'AI-Powered Labor Law Guidance',
    newChat: 'New Conversation',
    conversations: 'Conversations',
    settings: 'Settings',
    profile: 'Profile',
    inputPlaceholder: 'Ask about labor law, rights, or DOLE processes...',
    send: 'Send',
    disclaimer: 'This chatbot provides general legal information only. For specific legal advice, consult a licensed attorney.',
    privacyNotice: 'Your privacy is protected. Conversations are confidential.',
    suggestedActions: 'Suggested Actions',
    citations: 'Legal References',
    contactDOLE: 'Contact DOLE',
    fileSENA: 'File SEnA Request',
    findLawyer: 'Find a Lawyer',
    welcomeMessage: 'Hello! I\'m here to help you understand Philippine labor law and your rights as a worker. How can I assist you today?',
    exampleQuestions: [
      'What are my rights if I\'m terminated?',
      'How do I file a labor complaint?',
      'Am I entitled to overtime pay?',
      'What is the minimum wage in my region?'
    ]
  },
  fil: {
    appTitle: 'Legal na Katulong',
    appSubtitle: 'AI-Powered na Gabay sa Batas Paggawa',
    newChat: 'Bagong Pag-uusap',
    conversations: 'Mga Pag-uusap',
    settings: 'Settings',
    profile: 'Profile',
    inputPlaceholder: 'Magtanong tungkol sa batas paggawa, karapatan, o proseso ng DOLE...',
    send: 'Ipadala',
    disclaimer: 'Ang chatbot na ito ay nagbibigay lamang ng pangkalahatang impormasyon tungkol sa batas. Para sa tiyak na legal na payo, kumonsulta sa lisensyadong abogado.',
    privacyNotice: 'Protektado ang iyong privacy. Kumpidensyal ang mga pag-uusap.',
    suggestedActions: 'Mga Mungkahing Aksyon',
    citations: 'Mga Legal na Sanggunian',
    contactDOLE: 'Makipag-ugnayan sa DOLE',
    fileSENA: 'Mag-file ng SEnA Request',
    findLawyer: 'Humanap ng Abogado',
    welcomeMessage: 'Kumusta! Nandito ako upang tulungan kang maunawaan ang batas paggawa ng Pilipinas at ang iyong mga karapatan bilang manggagawa. Paano kita matutulungan ngayong araw?',
    exampleQuestions: [
      'Ano ang aking mga karapatan kung ako ay tinanggal sa trabaho?',
      'Paano mag-file ng labor complaint?',
      'May karapatan ba ako sa overtime pay?',
      'Ano ang minimum wage sa aking rehiyon?'
    ]
  },
  ceb: {
    appTitle: 'Legal nga Tabang',
    appSubtitle: 'AI-Powered nga Giya sa Balaod sa Trabaho',
    newChat: 'Bag-ong Panag-istoryahanay',
    conversations: 'Mga Panag-istoryahanay',
    settings: 'Mga Setting',
    profile: 'Profile',
    inputPlaceholder: 'Pangutana bahin sa balaod sa trabaho, katungod, o proseso sa DOLE...',
    send: 'Ipadala',
    disclaimer: 'Kining chatbot naghatag lamang og pangkalahatang impormasyon bahin sa balaod. Para sa piho nga legal nga tambag, kumonsulta sa lisensyadong abogado.',
    privacyNotice: 'Protektado ang imong privacy. Kompidensyal ang mga panag-istoryahanay.',
    suggestedActions: 'Gisugyot nga mga Aksyon',
    citations: 'Mga Legal nga Sanggunian',
    contactDOLE: 'Kontak sa DOLE',
    fileSENA: 'Mag-file og SEnA Request',
    findLawyer: 'Pangitag Abogado',
    welcomeMessage: 'Kumusta! Ania ako aron sa pagtabang kanimo nga masabtan ang balaod sa trabaho sa Pilipinas ug ang imong mga katungod isip trabahante. Unsaon nako pagtabang kanimo karon?',
    exampleQuestions: [
      'Unsa ang akong mga katungod kon ako gipapahawa sa trabaho?',
      'Unsaon pag-file og labor complaint?',
      'Dunay ba koy katungod sa overtime pay?',
      'Unsa ang minimum wage sa akong rehiyon?'
    ]
  }
};

export const getTranslation = (language: Language, key: keyof typeof translations.en): string => {
  return translations[language][key] as string;
};

export const getTranslationArray = (language: Language, key: keyof typeof translations.en): string[] => {
  return translations[language][key] as string[];
};
