import { X, User, LogIn, LogOut, Trash2, Shield, FileText, HelpCircle, MessageSquare, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Language } from '../../types/chat';

interface ProfileModalProps {
  language: Language;
  onClose: () => void;
  isLoggedIn?: boolean;
  userName?: string;
  userEmail?: string;
}

type ProfileSection = 'main' | 'privacy' | 'terms' | 'faq' | 'feedback' | 'delete';

export default function ProfileModal({ 
  language, 
  onClose, 
  isLoggedIn = false,
  userName = 'Guest User',
  userEmail = ''
}: ProfileModalProps) {
  const [activeSection, setActiveSection] = useState<ProfileSection>('main');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleLogin = () => {
    // TODO: Implement login logic
    alert(language === 'en' ? 'Login feature coming soon!' : language === 'fil' ? 'Malapit na ang login feature!' : 'Moabot na ang login feature!');
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    const confirmMsg = language === 'en' 
      ? 'Are you sure you want to logout? Your local data will be preserved.' 
      : language === 'fil'
      ? 'Sigurado ka bang gusto mong mag-logout? Ang iyong local data ay mananatili.'
      : 'Sigurado ka ba nga gusto nimong mag-logout? Ang imong local data mapreserbar.';
    
    if (confirm(confirmMsg)) {
      alert(language === 'en' ? 'Logged out successfully!' : language === 'fil' ? 'Matagumpay na nag-logout!' : 'Malampuson nga nag-logout!');
      onClose();
    }
  };

  const handleDeleteAccount = () => {
    const confirmMsg = language === 'en'
      ? 'This will permanently delete your account and all associated data. This action cannot be undone.'
      : language === 'fil'
      ? 'Permanenteng tatanggalin nito ang iyong account at lahat ng nauugnay na data. Hindi na maaaring bawiin ang aksyong ito.'
      : 'Permanente nga tangtangon kini ang imong account ug tanan nga naugnayan nga datos. Dili na mahimo nga bawion kining lihok.';
    
    if (confirm(confirmMsg)) {
      // TODO: Implement account deletion
      alert(language === 'en' ? 'Account deletion requested.' : language === 'fil' ? 'Hiniling ang pagtanggal ng account.' : 'Gihangyo ang pagtangtang sa account.');
      onClose();
    }
  };

  const handleFeedbackSubmit = () => {
    if (!feedbackText.trim()) {
      alert(language === 'en' ? 'Please enter your feedback.' : language === 'fil' ? 'Mangyaring ilagay ang iyong feedback.' : 'Palihug ibutang ang imong feedback.');
      return;
    }
    
    // TODO: Implement feedback submission
    console.log('Feedback submitted:', feedbackText);
    setFeedbackSubmitted(true);
    
    setTimeout(() => {
      setFeedbackText('');
      setFeedbackSubmitted(false);
      setActiveSection('main');
    }, 2000);
  };

  const getTitle = () => {
    switch (activeSection) {
      case 'privacy':
        return language === 'en' ? 'Privacy Policy' : language === 'fil' ? 'Patakaran sa Privacy' : 'Palisiya sa Privacy';
      case 'terms':
        return language === 'en' ? 'Terms of Service' : language === 'fil' ? 'Mga Tuntunin ng Serbisyo' : 'Mga Termino sa Serbisyo';
      case 'faq':
        return language === 'en' ? 'Frequently Asked Questions' : language === 'fil' ? 'Mga Madalas Itanong' : 'Mga Kanunay Pangutana';
      case 'feedback':
        return language === 'en' ? 'Give Feedback' : language === 'fil' ? 'Magbigay ng Feedback' : 'Paghatag og Feedback';
      case 'delete':
        return language === 'en' ? 'Delete Account' : language === 'fil' ? 'Tanggalin ang Account' : 'Tangtangon ang Account';
      default:
        return language === 'en' ? 'Profile' : language === 'fil' ? 'Profile' : 'Profile';
    }
  };

  const faqs = [
    {
      question: language === 'en' ? 'Is my data secure?' : language === 'fil' ? 'Secure ba ang aking data?' : 'Secure ba ang akong datos?',
      answer: language === 'en' 
        ? 'Yes, all conversations are stored locally on your device. When you create an account, your data is encrypted and stored securely.' 
        : language === 'fil'
        ? 'Oo, lahat ng pag-uusap ay nakaimbak sa lokal sa iyong device. Kapag gumawa ka ng account, ang iyong data ay naka-encrypt at secure na nakaimbak.'
        : 'Oo, ang tanan nga mga panag-istoryahanay gitipigan sa lokal sa imong device. Kung maghimo ka og account, ang imong datos na-encrypt ug luwas nga gitipigan.'
    },
    {
      question: language === 'en' ? 'Is LEO a real lawyer?' : language === 'fil' ? 'Tunay na abogado ba ang LEO?' : 'Tinuod nga abogado ba ang LEO?',
      answer: language === 'en'
        ? 'No, LEO is an AI assistant that provides general legal information. For specific legal advice, please consult a licensed attorney.'
        : language === 'fil'
        ? 'Hindi, ang LEO ay isang AI assistant na nagbibigay ng pangkalahatang legal na impormasyon. Para sa tiyak na legal na payo, kumonsulta sa isang lisensyadong abogado.'
        : 'Dili, ang LEO usa ka AI assistant nga naghatag og pangkalahatang legal nga impormasyon. Para sa piho nga legal nga tambag, kumonsulta sa lisensyadong abogado.'
    },
    {
      question: language === 'en' ? 'What languages does LEO support?' : language === 'fil' ? 'Anong mga wika ang sinusuportahan ng LEO?' : 'Unsa nga mga pinulongan ang gisuportahan sa LEO?',
      answer: language === 'en'
        ? 'LEO supports English, Filipino (Tagalog), and Cebuano (Bisaya), with more Philippine languages coming soon.'
        : language === 'fil'
        ? 'Sinusuportahan ng LEO ang English, Filipino (Tagalog), at Cebuano (Bisaya), na may maraming Pilipinong wika na malapit na.'
        : 'Gisuportahan sa LEO ang English, Filipino (Tagalog), ug Cebuano (Bisaya), nga adunay daghang Pilipinhon nga mga pinulongan nga moabot na.'
    },
    {
      question: language === 'en' ? 'Can LEO help me file a case?' : language === 'fil' ? 'Matutulungan ba ako ng LEO na mag-file ng kaso?' : 'Makatabang ba ako sa LEO nga mag-file og kaso?',
      answer: language === 'en'
        ? 'LEO can guide you through the process and provide information, but you should consult with DOLE or a lawyer for actual case filing.'
        : language === 'fil'
        ? 'Maaaring gabayan ka ng LEO sa proseso at magbigay ng impormasyon, ngunit dapat kang kumonsulta sa DOLE o abogado para sa aktwal na pag-file ng kaso.'
        : 'Makagiya kanimo ang LEO sa proseso ug makahatag og impormasyon, apan kinahanglan nimong kumonsulta sa DOLE o abogado para sa aktuwal nga pag-file sa kaso.'
    }
  ];

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="profile-title"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {activeSection !== 'main' && (
              <button
                onClick={() => setActiveSection('main')}
                className="p-1 hover:bg-slate-100 rounded transition-colors"
                aria-label={language === 'en' ? 'Back' : language === 'fil' ? 'Bumalik' : 'Balik'}
              >
                <span className="text-xl">←</span>
              </button>
            )}
            <h2 id="profile-title" className="text-xl font-bold text-slate-800">
              {getTitle()}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label={language === 'en' ? 'Close profile' : language === 'fil' ? 'Isara ang profile' : 'Sirad-i ang profile'}
          >
            <X size={20} className="text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Main Profile Section */}
          {activeSection === 'main' && (
            <div className="space-y-6">
              {/* User Info */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-sky-500 to-sky-600 shadow-xl mb-4">
                  <User size={40} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">{userName}</h3>
                {isLoggedIn && userEmail && (
                  <p className="text-sm text-slate-600 mt-1">{userEmail}</p>
                )}
                {!isLoggedIn && (
                  <p className="text-sm text-slate-600 mt-1">
                    {language === 'en' ? 'Not logged in' : language === 'fil' ? 'Hindi naka-log in' : 'Wala naka-log in'}
                  </p>
                )}
              </div>

              {/* Account Actions */}
              <div className="space-y-2">
                {!isLoggedIn ? (
                  <>
                    <button
                      onClick={handleLogin}
                      className="w-full flex items-center gap-3 px-4 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors"
                    >
                      <LogIn size={20} />
                      <span className="font-medium">
                        {language === 'en' ? 'Login / Sign Up' : language === 'fil' ? 'Mag-login / Mag-sign Up' : 'Pag-login / Pag-sign Up'}
                      </span>
                    </button>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <p className="text-sm text-amber-800 flex items-start gap-2">
                        <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                        <span>
                          {language === 'en' 
                            ? 'Login to sync your conversations across devices and access them anywhere.' 
                            : language === 'fil'
                            ? 'Mag-login upang i-sync ang iyong mga pag-uusap sa iba\'t ibang device at ma-access ang mga ito kahit saan.'
                            : 'Pag-login aron ma-sync ang imong mga panag-istoryahanay sa lain-laing mga device ug ma-access kini bisan asa.'}
                        </span>
                      </p>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 border-2 border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <LogOut size={20} className="text-slate-600" />
                    <span className="font-medium text-slate-700">
                      {language === 'en' ? 'Logout' : language === 'fil' ? 'Mag-logout' : 'Pag-logout'}
                    </span>
                  </button>
                )}
              </div>

              {/* Menu Options */}
              <div className="space-y-2">
                <button
                  onClick={() => setActiveSection('privacy')}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-lg transition-colors text-left"
                >
                  <Shield size={20} className="text-slate-600" />
                  <span className="text-slate-700">
                    {language === 'en' ? 'Privacy Policy' : language === 'fil' ? 'Patakaran sa Privacy' : 'Palisiya sa Privacy'}
                  </span>
                </button>

                <button
                  onClick={() => setActiveSection('terms')}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-lg transition-colors text-left"
                >
                  <FileText size={20} className="text-slate-600" />
                  <span className="text-slate-700">
                    {language === 'en' ? 'Terms of Service' : language === 'fil' ? 'Mga Tuntunin ng Serbisyo' : 'Mga Termino sa Serbisyo'}
                  </span>
                </button>

                <button
                  onClick={() => setActiveSection('faq')}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-lg transition-colors text-left"
                >
                  <HelpCircle size={20} className="text-slate-600" />
                  <span className="text-slate-700">
                    {language === 'en' ? 'FAQ' : language === 'fil' ? 'Mga Madalas Itanong' : 'Mga Kanunay Pangutana'}
                  </span>
                </button>

                <button
                  onClick={() => setActiveSection('feedback')}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-lg transition-colors text-left"
                >
                  <MessageSquare size={20} className="text-slate-600" />
                  <span className="text-slate-700">
                    {language === 'en' ? 'Give Feedback' : language === 'fil' ? 'Magbigay ng Feedback' : 'Paghatag og Feedback'}
                  </span>
                </button>

                {isLoggedIn && (
                  <button
                    onClick={() => setActiveSection('delete')}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-lg transition-colors text-left text-red-600"
                  >
                    <Trash2 size={20} />
                    <span className="font-medium">
                      {language === 'en' ? 'Delete Account' : language === 'fil' ? 'Tanggalin ang Account' : 'Tangtangon ang Account'}
                    </span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Privacy Policy Section */}
          {activeSection === 'privacy' && (
            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p>
                {language === 'en'
                  ? 'Your privacy is important to us. This privacy policy explains how LEO (Labor Education Online) collects, uses, and protects your information.'
                  : language === 'fil'
                  ? 'Mahalaga sa amin ang iyong privacy. Ipinaliwanag ng patakaran sa privacy na ito kung paano kinokolekta, ginagamit, at pinoprotektahan ng LEO (Labor Education Online) ang iyong impormasyon.'
                  : 'Importante kanamo ang imong privacy. Gipatin-aw niining palisiya sa privacy kon giunsa pagkolekta, paggamit, ug pagpanalipod sa LEO (Labor Education Online) ang imong impormasyon.'}
              </p>

              <div>
                <h4 className="font-semibold text-slate-800 mb-2">
                  {language === 'en' ? 'Data Collection' : language === 'fil' ? 'Pagkolekta ng Data' : 'Pagkolekta sa Datos'}
                </h4>
                <p>
                  {language === 'en'
                    ? 'We collect conversation data to improve our service. All conversations are stored locally on your device unless you create an account.'
                    : language === 'fil'
                    ? 'Kinokolekta namin ang data ng pag-uusap upang mapabuti ang aming serbisyo. Ang lahat ng pag-uusap ay nakaimbak sa lokal sa iyong device maliban kung gumawa ka ng account.'
                    : 'Gikolekta namo ang datos sa panag-istoryahanay aron mapauswag ang among serbisyo. Ang tanan nga mga panag-istoryahanay gitipigan sa lokal sa imong device gawas kon maghimo ka og account.'}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-2">
                  {language === 'en' ? 'Data Security' : language === 'fil' ? 'Seguridad ng Data' : 'Seguridad sa Datos'}
                </h4>
                <p>
                  {language === 'en'
                    ? 'Your data is encrypted both in transit and at rest. We use industry-standard security measures to protect your information.'
                    : language === 'fil'
                    ? 'Ang iyong data ay naka-encrypt pareho sa paglilipat at kapag nakatigil. Ginagamit namin ang mga hakbang sa seguridad na standard sa industriya upang protektahan ang iyong impormasyon.'
                    : 'Ang imong datos na-encrypt sa paglipat ug sa pagtigil. Gigamit namo ang mga hakbang sa seguridad nga standard sa industriya aron mapanalipdan ang imong impormasyon.'}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-2">
                  {language === 'en' ? 'Your Rights' : language === 'fil' ? 'Iyong mga Karapatan' : 'Imong mga Katungod'}
                </h4>
                <p>
                  {language === 'en'
                    ? 'You have the right to access, modify, or delete your data at any time. You can export your conversations or permanently delete your account.'
                    : language === 'fil'
                    ? 'Mayroon kang karapatang ma-access, baguhin, o tanggalin ang iyong data anumang oras. Maaari mong i-export ang iyong mga pag-uusap o permanenteng tanggalin ang iyong account.'
                    : 'Aduna kay katungod nga ma-access, usbon, o tangtangon ang imong datos bisan unsang oras. Mahimo nimong i-export ang imong mga panag-istoryahanay o permanente nga tangtangon ang imong account.'}
                </p>
              </div>
            </div>
          )}

          {/* Terms of Service Section */}
          {activeSection === 'terms' && (
            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p>
                {language === 'en'
                  ? 'By using LEO, you agree to the following terms and conditions:'
                  : language === 'fil'
                  ? 'Sa paggamit ng LEO, sumasang-ayon ka sa mga sumusunod na tuntunin at kundisyon:'
                  : 'Sa paggamit sa LEO, mouyon ka sa mosunod nga mga termino ug kondisyon:'}
              </p>

              <div>
                <h4 className="font-semibold text-slate-800 mb-2">
                  {language === 'en' ? 'Use of Service' : language === 'fil' ? 'Paggamit ng Serbisyo' : 'Paggamit sa Serbisyo'}
                </h4>
                <p>
                  {language === 'en'
                    ? 'LEO provides general legal information only. It is not a substitute for professional legal advice from a licensed attorney.'
                    : language === 'fil'
                    ? 'Ang LEO ay nagbibigay lamang ng pangkalahatang legal na impormasyon. Hindi ito kapalit ng propesyonal na legal na payo mula sa lisensyadong abogado.'
                    : 'Ang LEO naghatag lamang og pangkalahatang legal nga impormasyon. Dili kini kapuli sa propesyonal nga legal nga tambag gikan sa lisensyadong abogado.'}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-2">
                  {language === 'en' ? 'Disclaimer' : language === 'fil' ? 'Disclaimer' : 'Disclaimer'}
                </h4>
                <p>
                  {language === 'en'
                    ? 'While we strive for accuracy, LEO may occasionally provide incomplete or outdated information. Always verify critical information with official sources or legal professionals.'
                    : language === 'fil'
                    ? 'Bagama\'t nagsusumikap kami para sa katumpakan, maaaring magbigay ang LEO ng hindi kumpletong o lipas na impormasyon. Palaging i-verify ang kritikal na impormasyon sa mga opisyal na sanggunian o legal na propesyonal.'
                    : 'Bisan og naningkamot mi para sa katukma, mahimong maghatag ang LEO og dili kompleto o karaan nga impormasyon. Kanunay nga i-verify ang kritikal nga impormasyon sa mga opisyal nga tinubdan o legal nga propesyonal.'}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-2">
                  {language === 'en' ? 'Prohibited Uses' : language === 'fil' ? 'Mga Ipinagbabawal na Paggamit' : 'Mga Gidili nga Paggamit'}
                </h4>
                <p>
                  {language === 'en'
                    ? 'You may not use LEO for illegal purposes, to harass others, or to spread misinformation.'
                    : language === 'fil'
                    ? 'Hindi mo dapat gamitin ang LEO para sa mga ilegal na layunin, upang mang-harass ng iba, o upang magkalat ng maling impormasyon.'
                    : 'Dili nimo kinahanglan gamiton ang LEO para sa mga ilegal nga katuyoan, aron sa pag-harass sa uban, o aron sa pagkatag og sayop nga impormasyon.'}
                </p>
              </div>
            </div>
          )}

          {/* FAQ Section */}
          {activeSection === 'faq' && (
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-slate-200 pb-4 last:border-b-0">
                  <h4 className="font-semibold text-slate-800 mb-2">{faq.question}</h4>
                  <p className="text-sm text-slate-700 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          )}

          {/* Feedback Section */}
          {activeSection === 'feedback' && (
            <div className="space-y-4">
              {!feedbackSubmitted ? (
                <>
                  <p className="text-sm text-slate-700">
                    {language === 'en'
                      ? 'We value your feedback! Please let us know how we can improve LEO.'
                      : language === 'fil'
                      ? 'Pinahahalagahan namin ang iyong feedback! Mangyaring ipaalam sa amin kung paano namin mapapabuti ang LEO.'
                      : 'Gipabilhan namo ang imong feedback! Palihug ipahibalo kanamo kon unsaon namo pagpauswag ang LEO.'}
                  </p>
                  <textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder={language === 'en' ? 'Your feedback...' : language === 'fil' ? 'Ang iyong feedback...' : 'Ang imong feedback...'}
                    className="w-full h-40 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 resize-none"
                  />
                  <button
                    onClick={handleFeedbackSubmit}
                    className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium transition-colors"
                  >
                    {language === 'en' ? 'Submit Feedback' : language === 'fil' ? 'Isumite ang Feedback' : 'Isumite ang Feedback'}
                  </button>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                    <span className="text-3xl">✓</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    {language === 'en' ? 'Thank You!' : language === 'fil' ? 'Salamat!' : 'Salamat!'}
                  </h3>
                  <p className="text-slate-600">
                    {language === 'en'
                      ? 'Your feedback has been submitted successfully.'
                      : language === 'fil'
                      ? 'Matagumpay na naisumite ang iyong feedback.'
                      : 'Malampuson nga naisumite ang imong feedback.'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Delete Account Section */}
          {activeSection === 'delete' && (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={24} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-800 mb-2">
                      {language === 'en' ? 'Warning: This action is permanent' : language === 'fil' ? 'Babala: Permanente ang aksyong ito' : 'Pahimangno: Permanente kining lihok'}
                    </h4>
                    <p className="text-sm text-red-700 leading-relaxed">
                      {language === 'en'
                        ? 'Deleting your account will permanently remove all your conversations, settings, and personal data. This action cannot be undone.'
                        : language === 'fil'
                        ? 'Ang pagtanggal ng iyong account ay permanenteng aalisin ang lahat ng iyong mga pag-uusap, settings, at personal na data. Hindi na maaaring bawiin ang aksyong ito.'
                        : 'Ang pagtangtang sa imong account permanente nga magtangtang sa tanan nimong mga panag-istoryahanay, mga setting, ug personal nga datos. Dili na mahimo nga bawion kining lihok.'}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleDeleteAccount}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                {language === 'en' ? 'Delete My Account' : language === 'fil' ? 'Tanggalin ang Aking Account' : 'Tangtangon ang Akong Account'}
              </button>

              <button
                onClick={() => setActiveSection('main')}
                className="w-full py-3 border-2 border-slate-300 hover:bg-slate-50 rounded-lg font-medium transition-colors"
              >
                {language === 'en' ? 'Cancel' : language === 'fil' ? 'Kanselahin' : 'Kanselahin'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
