/**
 * Suggested Action Types
 * 
 * Defines the types of actions that can be suggested to users
 * and their associated data.
 */

export type ActionType = 'query' | 'link' | 'info' | 'contact' | 'form';

export interface SuggestedAction {
  id: string;
  type: ActionType;
  label: string;
  data?: ActionData;
}

export type ActionData =
  | QueryActionData
  | LinkActionData
  | InfoActionData
  | ContactActionData
  | FormActionData;

export interface QueryActionData {
  query: string;
  context?: string;
}

export interface LinkActionData {
  url: string;
  external?: boolean;
}

export interface InfoActionData {
  title: string;
  content: string;
  icon?: string;
}

export interface ContactActionData {
  name: string;
  hotline?: string;
  email?: string;
  website?: string;
  address?: string;
}

export interface FormActionData {
  formName: string;
  instructions: string[];
  downloadUrl?: string;
}

/**
 * Pre-defined common actions
 */
export const COMMON_ACTIONS = {
  CONTACT_DOLE: {
    en: {
      id: 'contact-dole',
      type: 'contact' as ActionType,
      label: 'Contact DOLE',
      data: {
        name: 'Department of Labor and Employment (DOLE)',
        hotline: '1349',
        email: 'dolero4a@gmail.com',
        website: 'https://www.dole.gov.ph',
        address: 'Various regional offices nationwide'
      } as ContactActionData
    },
    fil: {
      id: 'contact-dole',
      type: 'contact' as ActionType,
      label: 'Makipag-ugnayan sa DOLE',
      data: {
        name: 'Department of Labor and Employment (DOLE)',
        hotline: '1349',
        email: 'dolero4a@gmail.com',
        website: 'https://www.dole.gov.ph',
        address: 'Iba\'t ibang mga rehiyonal na opisina sa buong bansa'
      } as ContactActionData
    },
    ceb: {
      id: 'contact-dole',
      type: 'contact' as ActionType,
      label: 'Kontak sa DOLE',
      data: {
        name: 'Department of Labor and Employment (DOLE)',
        hotline: '1349',
        email: 'dolero4a@gmail.com',
        website: 'https://www.dole.gov.ph',
        address: 'Lainlaing mga regional nga opisina sa tibuok nasud'
      } as ContactActionData
    }
  },
  FILE_SENA: {
    en: {
      id: 'file-sena',
      type: 'form' as ActionType,
      label: 'File SEnA Request',
      data: {
        formName: 'Single Entry Approach (SEnA)',
        instructions: [
          'Go to the nearest DOLE office or visit the DOLE website',
          'Fill out the SEnA Request Form with your complaint details',
          'Provide supporting documents (employment contract, payslips, etc.)',
          'Submit the form to the DOLE officer',
          'Wait for the mandatory 30-day conciliation-mediation period'
        ],
        downloadUrl: 'https://www.dole.gov.ph/sena-request-form/'
      } as FormActionData
    },
    fil: {
      id: 'file-sena',
      type: 'form' as ActionType,
      label: 'Mag-file ng SEnA Request',
      data: {
        formName: 'Single Entry Approach (SEnA)',
        instructions: [
          'Pumunta sa pinakamalapit na tanggapan ng DOLE o bisitahin ang website ng DOLE',
          'Punan ang SEnA Request Form kasama ang mga detalye ng iyong reklamo',
          'Magbigay ng mga suportang dokumento (kontrata sa trabaho, payslip, atbp.)',
          'Isumite ang form sa opisyal ng DOLE',
          'Maghintay para sa mandatory na 30-araw na conciliation-mediation period'
        ],
        downloadUrl: 'https://www.dole.gov.ph/sena-request-form/'
      } as FormActionData
    },
    ceb: {
      id: 'file-sena',
      type: 'form' as ActionType,
      label: 'Mag-file og SEnA Request',
      data: {
        formName: 'Single Entry Approach (SEnA)',
        instructions: [
          'Adto sa labing duol nga opisina sa DOLE o bisitaha ang website sa DOLE',
          'Pun-a ang SEnA Request Form uban ang mga detalye sa imong reklamo',
          'Paghatag og suportang mga dokumento (kontrata sa trabaho, payslip, ug uban pa)',
          'Isumite ang form sa opisyal sa DOLE',
          'Hulat para sa mandatory nga 30-ka adlaw nga conciliation-mediation period'
        ],
        downloadUrl: 'https://www.dole.gov.ph/sena-request-form/'
      } as FormActionData
    }
  },
  FIND_LAWYER: {
    en: {
      id: 'find-lawyer',
      type: 'link' as ActionType,
      label: 'Find a Lawyer',
      data: {
        url: 'https://www.pao.gov.ph',
        external: true
      } as LinkActionData
    },
    fil: {
      id: 'find-lawyer',
      type: 'link' as ActionType,
      label: 'Humanap ng Abogado',
      data: {
        url: 'https://www.pao.gov.ph',
        external: true
      } as LinkActionData
    },
    ceb: {
      id: 'find-lawyer',
      type: 'link' as ActionType,
      label: 'Pangitag Abogado',
      data: {
        url: 'https://www.pao.gov.ph',
        external: true
      } as LinkActionData
    }
  }
};
