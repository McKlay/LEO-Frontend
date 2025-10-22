/**
 * Citation Validation Utilities
 * 
 * Validates and formats legal citations according to Philippine legal standards
 */

import { Citation } from '../../types/chat';

/**
 * Validates if a citation has all required fields
 */
export const isValidCitation = (citation: Citation): boolean => {
  return !!(
    citation.id &&
    citation.text &&
    citation.source &&
    citation.text.trim().length > 0 &&
    citation.source.trim().length > 0
  );
};

/**
 * Validates if a URL is properly formatted
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Formats citation article number (e.g., "Article 87", "Section 12")
 */
export const formatArticle = (article: string): string => {
  if (!article) return '';
  
  // Capitalize properly
  const formatted = article.trim();
  
  // Check if it starts with common legal prefixes
  const prefixes = ['article', 'section', 'rule', 'chapter'];
  const lowerFormatted = formatted.toLowerCase();
  
  for (const prefix of prefixes) {
    if (lowerFormatted.startsWith(prefix)) {
      const number = formatted.slice(prefix.length).trim();
      return `${prefix.charAt(0).toUpperCase()}${prefix.slice(1)} ${number}`;
    }
  }
  
  return formatted;
};

/**
 * Gets related resources based on citation source
 */
export const getRelatedResources = (citation: Citation): RelatedResource[] => {
  const resources: RelatedResource[] = [];
  const sourceLower = citation.source.toLowerCase();

  // Labor Code resources
  if (sourceLower.includes('labor code')) {
    resources.push({
      title: 'Full Labor Code of the Philippines',
      url: 'https://www.dole.gov.ph/labor-code-of-the-philippines/',
      description: 'Complete text of the Labor Code'
    });
    resources.push({
      title: 'DOLE Department Orders',
      url: 'https://www.dole.gov.ph/department-orders/',
      description: 'Implementing rules and regulations'
    });
  }

  // DOLE regulations
  if (sourceLower.includes('dole') || sourceLower.includes('department order')) {
    resources.push({
      title: 'DOLE Issuances',
      url: 'https://www.dole.gov.ph/dole-issuances/',
      description: 'Latest department orders and advisories'
    });
  }

  // Supreme Court
  if (sourceLower.includes('supreme court') || sourceLower.includes('g.r.')) {
    resources.push({
      title: 'Supreme Court E-Library',
      url: 'https://elibrary.judiciary.gov.ph/',
      description: 'Search for jurisprudence and decisions'
    });
  }

  // NLRC
  if (sourceLower.includes('nlrc')) {
    resources.push({
      title: 'NLRC Forms and Procedures',
      url: 'https://www.nlrc.dole.gov.ph/',
      description: 'Filing procedures and forms'
    });
  }

  // IRR
  if (sourceLower.includes('implementing rules') || sourceLower.includes('irr')) {
    resources.push({
      title: 'DOLE IRR Repository',
      url: 'https://www.dole.gov.ph/omnibus-rules/',
      description: 'Omnibus Rules Implementing the Labor Code'
    });
  }

  return resources;
};

/**
 * Extracts article/section numbers from text
 */
export const extractArticleNumbers = (text: string): string[] => {
  const regex = /(Article|Section|Rule)\s+(\d+[A-Za-z]?)/gi;
  const matches = text.match(regex);
  return matches || [];
};

/**
 * Generates citation short reference (e.g., "Art. 87, Labor Code")
 */
export const getCitationShortRef = (citation: Citation): string => {
  const parts: string[] = [];
  
  if (citation.article) {
    const article = formatArticle(citation.article);
    // Abbreviate if needed
    const abbreviated = article
      .replace('Article', 'Art.')
      .replace('Section', 'Sec.')
      .replace('Rule', 'R.');
    parts.push(abbreviated);
  }
  
  if (citation.source) {
    // Abbreviate common sources
    const source = citation.source
      .replace('Labor Code of the Philippines', 'Labor Code')
      .replace('Department of Labor and Employment', 'DOLE')
      .replace('National Labor Relations Commission', 'NLRC');
    parts.push(source);
  }
  
  return parts.join(', ');
};

export interface RelatedResource {
  title: string;
  url: string;
  description: string;
}
