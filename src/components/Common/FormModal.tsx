import { FileText, Download, CheckCircle } from 'lucide-react';
import Modal from './Modal';
import { FormActionData } from '../../types/actions';
import { Language } from '../../types/chat';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormActionData;
  language: Language;
}

const translations = {
  en: {
    instructions: 'Instructions',
    step: 'Step',
    downloadForm: 'Download Form',
    note: 'Note',
    noteText: 'This is a mandatory 30-day conciliation-mediation process. If unresolved, you may proceed to file a formal case with the NLRC.'
  },
  fil: {
    instructions: 'Mga Tagubilin',
    step: 'Hakbang',
    downloadForm: 'I-download ang Form',
    note: 'Paalala',
    noteText: 'Ito ay mandatory na 30-araw na conciliation-mediation process. Kung hindi malutas, maaari kang magpatuloy sa pag-file ng pormal na kaso sa NLRC.'
  },
  ceb: {
    instructions: 'Mga Instruksyon',
    step: 'Lakang',
    downloadForm: 'I-download ang Form',
    note: 'Pahinumdom',
    noteText: 'Kini usa ka mandatory nga 30-ka adlaw nga conciliation-mediation process. Kon dili masulbad, mahimo ka nga magpadayon sa pag-file og pormal nga kaso sa NLRC.'
  }
};

export default function FormModal({ isOpen, onClose, formData, language }: FormModalProps) {
  const t = translations[language];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={formData.formName} size="lg">
      <div className="space-y-6">
        {/* Instructions Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FileText size={20} className="text-sky-600" />
            <h3 className="text-lg font-semibold text-slate-800">{t.instructions}</h3>
          </div>

          <div className="space-y-3">
            {formData.instructions.map((instruction, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-sky-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-sm text-slate-700 leading-relaxed">{instruction}</p>
                </div>
                <CheckCircle size={20} className="text-slate-300 flex-shrink-0 mt-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Download Button */}
        {formData.downloadUrl && (
          <div className="flex justify-center">
            <a
              href={formData.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
            >
              <Download size={20} />
              {t.downloadForm}
            </a>
          </div>
        )}

        {/* Note Section */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">!</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-amber-900 mb-1">{t.note}</h4>
              <p className="text-sm text-amber-800 leading-relaxed">{t.noteText}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
