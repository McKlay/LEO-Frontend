/**
 * Cebuano Legal Terms Dictionary
 * 
 * Provides translations and explanations for common legal terms
 * used in Philippine labor law, translated to Cebuano (Bisaya).
 * 
 * Format: { term: { cebuano: string, explanation: string } }
 */

export interface LegalTerm {
  cebuano: string;
  explanation: string;
}

export const cebuanoLegalTerms: Record<string, LegalTerm> = {
  // Employment Terms
  'employment': {
    cebuano: 'trabaho / empleyado',
    explanation: 'Ang relasyon tali sa empleyado ug employer'
  },
  'employee': {
    cebuano: 'empleyado / trabahante',
    explanation: 'Tawo nga nagtrabaho alang sa usa ka kompanya o employer'
  },
  'employer': {
    cebuano: 'amo / employer',
    explanation: 'Tawo o kompanya nga naghatag og trabaho'
  },
  'termination': {
    cebuano: 'pagtangtang sa trabaho',
    explanation: 'Ang paghunong sa trabaho, legal o dili legal'
  },
  'dismissal': {
    cebuano: 'pagpapahawa',
    explanation: 'Pagpapahawa sa empleyado gikan sa trabaho'
  },
  'resignation': {
    cebuano: 'pagresign',
    explanation: 'Boluntaryong paghawa sa empleyado sa trabaho'
  },

  // Labor Rights
  'labor rights': {
    cebuano: 'katungod sa trabahante',
    explanation: 'Mga katungod nga giprotektahan sa balaod'
  },
  'minimum wage': {
    cebuano: 'minimum nga suweldo',
    explanation: 'Pinakagamay nga suweldo nga gitugotan sa balaod'
  },
  'overtime pay': {
    cebuano: 'overtime pay / bayad sa sobra nga oras',
    explanation: 'Bayad para sa mga oras nga labaw sa regular nga oras sa trabaho'
  },
  'holiday pay': {
    cebuano: 'bayad sa holiday',
    explanation: 'Bayad sa mga regular nga holiday'
  },
  'separation pay': {
    cebuano: 'separation pay / bayad sa paghawa',
    explanation: 'Bayad nga gihatag kon ang empleyado gitangtang sa trabaho'
  },
  'thirteenth month pay': {
    cebuano: '13th month pay',
    explanation: 'Bonus nga gihatag matag Disyembre, equivalent sa 1/12 sa tuig nga suweldo'
  },

  // Legal Processes
  'labor complaint': {
    cebuano: 'reklamo sa trabaho',
    explanation: 'Opisyal nga reklamo batok sa employer'
  },
  'DOLE': {
    cebuano: 'DOLE (Department of Labor and Employment)',
    explanation: 'Ahensya sa gobyerno nga nag-atiman sa mga isyu sa trabaho'
  },
  'SEnA': {
    cebuano: 'SEnA (Single Entry Approach)',
    explanation: 'Programa sa DOLE para sa paspas nga pagsulbad sa labor disputes'
  },
  'NLRC': {
    cebuano: 'NLRC (National Labor Relations Commission)',
    explanation: 'Quasi-judicial body nga nagsulbad sa labor disputes'
  },

  // Employment Types
  'regular employee': {
    cebuano: 'regular nga empleyado',
    explanation: 'Empleyado nga permanente ug may hingpit nga benepisyo'
  },
  'probationary employee': {
    cebuano: 'probationary nga empleyado',
    explanation: 'Empleyado sa sulay pa (usually 6 ka bulan)'
  },
  'contractual employee': {
    cebuano: 'contractual nga empleyado',
    explanation: 'Empleyado nga nag-depende sa kontrata (project-based o seasonal)'
  },

  // Violations
  'illegal dismissal': {
    cebuano: 'illegal nga pagtangtang',
    explanation: 'Pagpapahawa nga walay legal nga basehan'
  },
  'constructive dismissal': {
    cebuano: 'constructive dismissal',
    explanation: 'Kon ang empleyado gipugos sa pagresign tungod sa dili maayo nga kondisyon'
  },
  'labor violation': {
    cebuano: 'labag sa balaod sa trabaho',
    explanation: 'Paglapas sa mga balaod sa trabaho'
  },
  'unfair labor practice': {
    cebuano: 'dili patas nga gawi sa trabaho',
    explanation: 'Mga buhat nga dili patas sa empleyado o unyon'
  },

  // Benefits
  'SSS': {
    cebuano: 'SSS (Social Security System)',
    explanation: 'Social insurance program para sa private sector workers'
  },
  'PhilHealth': {
    cebuano: 'PhilHealth',
    explanation: 'National health insurance program'
  },
  'Pag-IBIG': {
    cebuano: 'Pag-IBIG Fund',
    explanation: 'Home Development Mutual Fund para sa housing loans'
  },

  // Work Conditions
  'working hours': {
    cebuano: 'oras sa trabaho',
    explanation: 'Normal nga 8 ka oras kada adlaw, 40-48 ka oras kada semana'
  },
  'rest day': {
    cebuano: 'adlaw sa pahulay',
    explanation: 'Adlaw nga dili magtrabaho (usually Sunday)'
  },
  'leave': {
    cebuano: 'leave / pahulay',
    explanation: 'Panahon nga dili magtrabaho samtang may bayad (sick leave, vacation leave)'
  },
  'maternity leave': {
    cebuano: 'maternity leave',
    explanation: '105 ka adlaw nga leave para sa mga inahan'
  },
  'paternity leave': {
    cebuano: 'paternity leave',
    explanation: '7 ka adlaw nga leave para sa mga amahan'
  },

  // Legal Documents
  'employment contract': {
    cebuano: 'kontrata sa trabaho',
    explanation: 'Kasabotan tali sa empleyado ug employer'
  },
  'payslip': {
    cebuano: 'payslip',
    explanation: 'Dokumento nga nagpakita sa detalye sa suweldo'
  },
  'certificate of employment': {
    cebuano: 'certificate of employment',
    explanation: 'Dokumento nga nagpamatuod nga nagtrabaho ka sa usa ka kompanya'
  }
};

/**
 * Get Cebuano translation for a legal term
 */
export const getCebuanoTerm = (englishTerm: string): string => {
  const term = cebuanoLegalTerms[englishTerm.toLowerCase()];
  return term ? term.cebuano : englishTerm;
};

/**
 * Get explanation for a legal term in Cebuano
 */
export const getCebuanoExplanation = (englishTerm: string): string => {
  const term = cebuanoLegalTerms[englishTerm.toLowerCase()];
  return term ? term.explanation : '';
};

/**
 * Check if a term exists in the dictionary
 */
export const hasCebuanoTerm = (englishTerm: string): boolean => {
  return englishTerm.toLowerCase() in cebuanoLegalTerms;
};
