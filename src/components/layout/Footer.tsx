
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Phone, Mail, Leaf } from 'lucide-react';

const Footer = () => {
  const { translate } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-farm-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">{translate('footer.company')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-farm-200 hover:text-white transition-colors">
                  {translate('footer.about')}
                </a>
              </li>
              <li>
                <a href="#" className="text-farm-200 hover:text-white transition-colors">
                  {translate('footer.careers')}
                </a>
              </li>
              <li>
                <a href="#" className="text-farm-200 hover:text-white transition-colors">
                  {translate('footer.blog')}
                </a>
              </li>
              <li>
                <a href="#" className="text-farm-200 hover:text-white transition-colors">
                  {translate('footer.partners')}
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/equipment" className="text-farm-200 hover:text-white transition-colors">
                  {translate('nav.equipment')}
                </a>
              </li>
              <li>
                <a href="/seeds" className="text-farm-200 hover:text-white transition-colors">
                  {translate('nav.seeds')}
                </a>
              </li>
              <li>
                <a href="/pesticides" className="text-farm-200 hover:text-white transition-colors">
                  {translate('nav.pesticides')}
                </a>
              </li>
              <li>
                <a href="/weather" className="text-farm-200 hover:text-white transition-colors">
                  {translate('nav.weather')}
                </a>
              </li>
              <li>
                <a href="/smart-tools" className="text-farm-200 hover:text-white transition-colors">
                  {translate('nav.smartTools')}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xl font-bold mb-4">{translate('footer.legal')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-farm-200 hover:text-white transition-colors">
                  {translate('footer.terms')}
                </a>
              </li>
              <li>
                <a href="#" className="text-farm-200 hover:text-white transition-colors">
                  {translate('footer.privacy')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">{translate('footer.contact')}</h3>
            <address className="not-italic text-farm-200 space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-farm-400 mr-2 mt-0.5 flex-shrink-0" />
                <span>Vishnu Institute of Technology,<br />Bhimavaram, Andhra Pradesh, India</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-farm-400 mr-2 flex-shrink-0" />
                <span>+91 6281394194</span>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-farm-400 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p>23pa1a05d4@vishnu.edu.in</p>
                  <p>23pa1a05d7@vishnu.edu.in</p>
                </div>
              </div>
            </address>
          </div>
        </div>

        <div className="border-t border-farm-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-farm-200 font-bold text-2xl flex items-center">
              <Leaf className="h-6 w-6 mr-2 text-farm-400" />
              AgriTech
            </span>
          </div>
          <p className="text-farm-300 text-sm">
            &copy; {currentYear} AgriTech Solutions. {translate('footer.rights')}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
