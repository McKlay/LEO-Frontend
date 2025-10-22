import { Phone, Mail, Globe, MapPin } from 'lucide-react';
import Modal from './Modal';
import { ContactActionData } from '../../types/actions';
import { Language } from '../../types/chat';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: ContactActionData;
  language: Language;
}

const translations = {
  en: {
    hotline: 'Hotline',
    email: 'Email',
    website: 'Website',
    address: 'Address',
    callNow: 'Call Now',
    sendEmail: 'Send Email',
    visitWebsite: 'Visit Website'
  },
  fil: {
    hotline: 'Hotline',
    email: 'Email',
    website: 'Website',
    address: 'Address',
    callNow: 'Tumawag Ngayon',
    sendEmail: 'Magpadala ng Email',
    visitWebsite: 'Bisitahin ang Website'
  },
  ceb: {
    hotline: 'Hotline',
    email: 'Email',
    website: 'Website',
    address: 'Address',
    callNow: 'Tawag Karon',
    sendEmail: 'Pagpadala og Email',
    visitWebsite: 'Bisitaha ang Website'
  }
};

export default function ContactModal({ isOpen, onClose, contact, language }: ContactModalProps) {
  const t = translations[language];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={contact.name} size="md">
      <div className="space-y-4">
        {contact.hotline && (
          <div className="flex items-start gap-3 p-4 bg-sky-50 rounded-lg border border-sky-200">
            <div className="flex-shrink-0 w-10 h-10 bg-sky-600 rounded-lg flex items-center justify-center">
              <Phone size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-700 mb-1">{t.hotline}</p>
              <p className="text-xl font-bold text-slate-900 mb-2">{contact.hotline}</p>
              <a
                href={`tel:${contact.hotline}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-sky-700 hover:text-sky-800 transition-colors"
              >
                {t.callNow}
              </a>
            </div>
          </div>
        )}

        {contact.email && (
          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex-shrink-0 w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center">
              <Mail size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-700 mb-1">{t.email}</p>
              <p className="text-base font-medium text-slate-900 mb-2 break-all">{contact.email}</p>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-sky-700 hover:text-sky-800 transition-colors"
              >
                {t.sendEmail}
              </a>
            </div>
          </div>
        )}

        {contact.website && (
          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex-shrink-0 w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center">
              <Globe size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-700 mb-1">{t.website}</p>
              <p className="text-base font-medium text-slate-900 mb-2 break-all">{contact.website}</p>
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-sky-700 hover:text-sky-800 transition-colors"
              >
                {t.visitWebsite}
              </a>
            </div>
          </div>
        )}

        {contact.address && (
          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex-shrink-0 w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center">
              <MapPin size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-700 mb-1">{t.address}</p>
              <p className="text-base text-slate-900">{contact.address}</p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
