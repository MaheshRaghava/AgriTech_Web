import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define available languages
export type Language = 'en' | 'te' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (key: string) => string;
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations object
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.equipment': 'Equipment',
    'nav.seeds': 'Seeds',
    'nav.pesticides': 'Pesticides',
    'nav.weather': 'Weather',
    'nav.smartTools': 'Smart Tools',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.logout': 'Logout',
    'nav.myOrders': 'My Orders',
    'nav.myBookings': 'My Bookings',
    'nav.admin': 'Admin',
    'nav.account': 'Account',
    'nav.myAccount': 'My Account',
    'nav.dashboard': 'Admin Dashboard',
    'nav.getStarted': 'Get Started',

    // Home page
    'home.hero.title': 'Smart Farming for a Sustainable Future',
    'home.hero.subtitle': 'Revolutionize your agricultural practices with our advanced smart farming technologies, equipment, and premium quality seeds.',
    'home.hero.cta': 'Explore Our Services',
    'home.hero.learnMore': 'Learn More',

    'home.mission.title': 'Our Mission',
    'home.mission.sustainable.title': 'Sustainable Agriculture',
    'home.mission.sustainable.desc': 'Promoting farming practices that ensure environmental health and food security.',
    'home.mission.technology.title': 'Technology Integration',
    'home.mission.technology.desc': 'Bringing modern technology to traditional farming for improved efficiency.',
    'home.mission.data.title': 'Data-Driven Decisions',
    'home.mission.data.desc': 'Leveraging analytics to make informed farming decisions for better yields.',

    'home.benefits.title': 'Benefits of Smart Farming',
    'home.benefits.efficiency.title': 'Increased Efficiency',
    'home.benefits.efficiency.desc': 'Optimize resource usage with precision agriculture techniques.',
    'home.benefits.yields.title': 'Higher Yields',
    'home.benefits.yields.desc': 'Improve crop production through data-driven farming practices.',
    'home.benefits.sustainability.title': 'Environmental Sustainability',
    'home.benefits.sustainability.desc': 'Reduce environmental impact while maintaining productivity.',
    'home.benefits.costs.title': 'Lower Costs',
    'home.benefits.costs.desc': 'Reduce operational expenses through optimized resource management.',

    'home.cta.title': 'Ready to Transform Your Farm?',
    'home.cta.subtitle': 'Join thousands of farmers who are already benefiting from our platform.',
    'home.cta.button': 'Start Today',

    'home.login.farmer': 'Farmer Login',
    'home.login.admin': 'Admin Login',

    // Contact page
    'contact.hero.title': 'Contact Us',
    'contact.hero.subtitle': 'Have questions about our smart farming solutions? Get in touch with our team of agricultural technology experts.',
    'contact.form.title': 'Send Us a Message',
    'contact.form.firstName': 'First Name',
    'contact.form.firstName.placeholder': 'Enter your first name',
    'contact.form.lastName': 'Last Name',
    'contact.form.lastName.placeholder': 'Enter your last name',
    'contact.form.email': 'Email',
    'contact.form.email.placeholder': 'Enter your email address',
    'contact.form.phone': 'Phone Number',
    'contact.form.phone.placeholder': 'Enter your phone number',
    'contact.form.message': 'Message',
    'contact.form.message.placeholder': 'Tell us about your farming needs or questions',
    'contact.form.submit': 'Send Message',

    'contact.info.title': 'Contact Information',
    'contact.info.address.title': 'Address',
    'contact.info.address.value': 'Vishnu Institute of Technology\nBhimavaram, Andhra Pradesh, India',
    'contact.info.phone.title': 'Phone',
    'contact.info.phone.value': '+91 6281394194',
    'contact.info.email.title': 'Email',
    'contact.info.email.value': '23pa1a05d4@vishnu.edu.in\n23pa1a05d7@vishnu.edu.in',
    'contact.info.hours.title': 'Business Hours',
    'contact.info.hours.weekday': 'Monday - Friday:',
    'contact.info.hours.weekday.value': '8:00 AM - 6:00 PM',
    'contact.info.hours.saturday': 'Saturday:',
    'contact.info.hours.saturday.value': '9:00 AM - 4:00 PM',
    'contact.info.hours.sunday': 'Sunday:',
    'contact.info.hours.sunday.value': 'Closed',

    'contact.faq.title': 'Frequently Asked Questions',
    'contact.faq.q1.title': 'What agricultural services do you offer?',
    'contact.faq.q1.answer': 'We provide a comprehensive range of smart farming solutions, including equipment rental, quality seeds, weather forecasting, soil monitoring, and precision agriculture tools. Our goal is to help farmers increase productivity while optimizing resource usage.',
    'contact.faq.q2.title': 'How can I schedule a consultation?',
    'contact.faq.q2.answer': 'You can schedule a consultation by filling out our contact form, calling our office directly, or sending us an email. Our agricultural technology experts will respond within 24 hours to arrange a meeting at your convenience.',

    'contact.map.title': 'Our Location',
    'contact.cta.title': 'Ready to Transform Your Farm?',
    'contact.cta.subtitle': 'Join thousands of farmers who are already benefiting from our smart farming solutions.',
    'contact.cta.button': 'Call Us Today',

    // Auth
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.name': 'Full Name',
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.noAccount': 'Don\'t have an account?',
    'auth.haveAccount': 'Already have an account?',

    // Footer
    'footer.company': 'Company',
    'footer.about': 'About Us',
    'footer.careers': 'Careers',
    'footer.blog': 'Blog',
    'footer.partners': 'Partners',
    'footer.legal': 'Legal',
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy Policy',
    'footer.contact': 'Contact Us',
    'footer.rights': 'All rights reserved',

    // Products
    'products.price': 'Price',
    'products.availability': 'Availability',
    'products.book': 'Book Now',
    'products.addToCart': 'Add to Cart',
    'products.orderNow': 'Order Now',
    'products.available': 'Available',
    'products.unavailable': 'Unavailable',
  },
  te: {
    // Navigation
    'nav.home': 'హోమ్',
    'nav.equipment': 'పరికరాలు',
    'nav.seeds': 'విత్తనాలు',
    'nav.pesticides': 'పురుగు మందులు',
    'nav.weather': 'వాతావరణం',
    'nav.smartTools': 'స్మార్ట్ పరికరాలు',
    'nav.contact': 'సంప్రదించండి',
    'nav.login': 'లాగిన్',
    'nav.register': 'నమోదు',
    'nav.logout': 'లాగౌట్',
    'nav.myOrders': 'నా ఆర్డర్లు',
    'nav.myBookings': 'నా బుకింగ్స్',
    'nav.admin': 'అడ్మిన్',
    'nav.account': 'ఖాతా',
    'nav.myAccount': 'నా ఖాతా',
    'nav.dashboard': 'అడ్మిన్ డాష్‌బోర్డ్',
    'nav.getStarted': 'ప్రారంభించండి',

    // Home page
    'home.hero.title': 'సుస్థిర భవిష్యత్తు కోసం స్మార్ట్ వ్యవసాయం',
    'home.hero.subtitle': 'మా అధునాతన స్మార్ట్ ఫార్మింగ్ టెక్నాలజీస్, పరికరాలు మరియు నాణ్యమైన విత్తనాలతో మీ వ్యవసాయ పద్ధతులను విప్లవాత్మకంగా మార్చండి.',
    'home.hero.cta': 'మా సేవలను అన్వేషించండి',
    'home.hero.learnMore': 'మరింత తెలుసుకోండి',

    'home.mission.title': 'మా లక్ష్యం',
    'home.mission.sustainable.title': 'సుస్థిర వ్యవసాయం',
    'home.mission.sustainable.desc': 'పర్యావరణ ఆరోగ్యం మరియు ఆహార భద్రతను నిర్ధారించే వ్యవసాయ పద్ధతులను ప్రోత్సహించడం.',
    'home.mission.technology.title': 'సాంకేతిక సమన్వయం',
    'home.mission.technology.desc': 'మెరుగైన సామర్థ్యం కోసం సాంప్రదాయ వ్యవసాయానికి ఆధునిక సాంకేతికతను తీసుకువస్తోంది.',
    'home.mission.data.title': 'డేటా-ఆధారిత నిర్ణయాలు',
    'home.mission.data.desc': 'మెరుగైన దిగుబడుల కోసం సమాచారపూర్వక వ్యవసాయ నిర్ణయాలు తీసుకోవడానికి విశ్లేషణలను ఉపయోగించడం.',

    'home.benefits.title': 'స్మార్ట్ వ్యవసాయం యొక్క ప్రయోజనాలు',
    'home.benefits.efficiency.title': 'పెరిగిన సామర్థ్యం',
    'home.benefits.efficiency.desc': 'ఖచ్చితమైన వ్యవసాయ పద్ధతులతో వనరుల వినియోగాన్ని ఆప్టిమైజ్ చేయండి.',
    'home.benefits.yields.title': 'అధిక దిగుబడులు',
    'home.benefits.yields.desc': 'డేటా-ఆధారిత వ్యవసాయ పద్ధతుల ద్వారా పంట ఉత్పత్తిని మెరుగుపరచండి.',
    'home.benefits.sustainability.title': 'పర్యావరణ సుస్థిరత',
    'home.benefits.sustainability.desc': 'ఉత్పాదకతను నిర్వహిస్తూనే పర్యావరణ ప్రభావాన్ని తగ్గించండి.',
    'home.benefits.costs.title': 'తక్కువ ఖర్చులు',
    'home.benefits.costs.desc': 'ఆప్టిమైజ్ చేయబడిన వనరుల నిర్వహణ ద్వారా నిర్వహణ ఖర్చులను తగ్గించడి.',

    'home.cta.title': 'మీ వ్యవసాయాన్ని మార్చడానికి సిద్ధంగా ఉన్నారా?',
    'home.cta.subtitle': 'ఇప్పటికే మా ప్లాట్‌ఫారమ్ నుండి ప్రయోజనం పొందుతున్న వేలాది రైతులలో చేరండి.',
    'home.cta.button': 'నేడే ప్రారంభించండి',

    'home.login.farmer': 'రైతు లాగిన్',
    'home.login.admin': 'అడ్మిన్ లాగిన్',

    // Contact page
    'contact.hero.title': 'మమ్మల్ని సంప్రదించండి',
    'contact.hero.subtitle': 'మా స్మార్ట్ ఫార్మింగ్ సొల్యూషన్స్ గురించి ప్రశ్నలు ఉన్నాయా? మా వ్యవసాయ సాంకేతిక నిపుణుల బృందాన్ని సంప్రదించండి.',
    'contact.form.title': 'మాకు సందేశం పంపండి',
    'contact.form.firstName': 'మొదటి పేరు',
    'contact.form.firstName.placeholder': 'మీ మొదటి పేరును నమోదు చేయండి',
    'contact.form.lastName': 'చివరి పేరు',
    'contact.form.lastName.placeholder': 'మీ చివరి పేరును నమోదు చేయండి',
    'contact.form.email': 'ఇమెయిల్',
    'contact.form.email.placeholder': 'మీ ఇమెయిల్ చిరునామాను నమోదు చేయండి',
    'contact.form.phone': 'ఫోన్ నంబర్',
    'contact.form.phone.placeholder': 'మీ ఫోన్ నంబర్‌ను నమోదు చేయండి',
    'contact.form.message': 'సందేశం',
    'contact.form.message.placeholder': 'మీ వ్యవసాయ అవసరాలు లేదా ప్రశ్నల గురించి మాకు తెలియజేయండి',
    'contact.form.submit': 'సందేశం పంపండి',

    'contact.info.title': 'సంప్రదింపు సమాచారం',
    'contact.info.address.title': 'చిరునామా',
    'contact.info.address.value': 'విష్ణు ఇన్స్టిట్యూట్ ఆఫ్ టెక్నాలజీ\nభీమవరం, ఆంధ్ర ప్రదేశ్, భారతదేశం',
    'contact.info.phone.title': 'ఫోన్',
    'contact.info.phone.value': '+91 6281394194',
    'contact.info.email.title': 'ఇమెయిల్',
    'contact.info.email.value': '23pa1a05d4@vishnu.edu.in\n23pa1a05d7@vishnu.edu.in',
    'contact.info.hours.title': 'వ్యాపార సమయాలు',
    'contact.info.hours.weekday': 'సోమవారం - శుక్రవారం:',
    'contact.info.hours.weekday.value': 'ఉదయం 8:00 - సాయంత్రం 6:00',
    'contact.info.hours.saturday': 'శనివారం:',
    'contact.info.hours.saturday.value': 'ఉదయం 9:00 - సాయంత్రం 4:00',
    'contact.info.hours.sunday': 'ఆదివారం:',
    'contact.info.hours.sunday.value': 'మూసివేయబడింది',

    'contact.faq.title': 'తరచుగా అడిగే ప్రశ్నలు',
    'contact.faq.q1.title': 'మీరు ఏ వ్యవసాయ సేవలను అందిస్తారు?',
    'contact.faq.q1.answer': 'మేము పరికరాల అద్దె, నాణ్యమైన విత్తనాలు, వాతావరణ సూచన, నేల పర్యవేక్షణ మరియు ఖచ్చితమైన వ్యవసాయ పరికరాలతో సహా స్మార్ట్ ఫార్మింగ్ పరిష్కారాల యొక్క సమగ్ర శ్రేణిని అందిస్తాము. వనరుల వినియోగాన్ని అనుకూలీకరించడం ద్వారా రైతులు ఉత్పాదకతను పెంచడంలో సహాయపడటం మా లక్ష్యం.',
    'contact.faq.q2.title': 'నేను సంప్రదింపు ఎలా షెడ్యూల్ చేయవచ్చు?',
    'contact.faq.q2.answer': 'మా సంప్రదింపు ఫారమ్‌ను నింపడం ద్వారా, మా కార్యాలయానికి నేరుగా కాల్ చేయడం ద్వారా లేదా మాకు ఇమెయిల్ పంపడం ద్వారా మీరు సంప్రదింపును షెడ్యూల్ చేయవచ్చు. మీ సౌకర్యం వద్ద మీటింగ్‌ను ఏర్పాటు చేయడానికి మా వ్యవసాయ సాంకేతిక నిపుణులు 24 గంటల్లోపు స్పందిస్తారు.',

    'contact.map.title': 'మా స్థానం',
    'contact.cta.title': 'మీ వ్యవసాయాన్ని మార్చడానికి సిద్ధంగా ఉన్నారా?',
    'contact.cta.subtitle': 'ఇప్పటికే మా స్మార్ట్ ఫార్మింగ్ సొల్యూషన్స్‌తో ప్రయోజనం పొందుతున్న వేలాది రైతులతో చేరండి.',
    'contact.cta.button': 'ఈరోజు మాకు కాల్ చేయండి',

    // Auth
    'auth.email': 'ఇమెయిల్',
    'auth.password': 'పాస్‌వర్డ్',
    'auth.confirmPassword': 'పాస్‌వర్డ్ నిర్ధారించండి',
    'auth.name': 'పూర్తి పేరు',
    'auth.login': 'లాగిన్',
    'auth.register': 'నమోదు',
    'auth.forgotPassword': 'పాస్‌వర్డ్ మర్చిపోయారా?',
    'auth.noAccount': 'ఖాతా లేదా?',
    'auth.haveAccount': 'ఇప్పటికే ఖాతా ఉందా?',

    // Footer
    'footer.company': 'కంపెనీ',
    'footer.about': 'మా గురించి',
    'footer.careers': 'ఉద్యోగాలు',
    'footer.blog': 'బ్లాగ్',
    'footer.partners': 'భాగస్వాములు',
    'footer.legal': 'చట్టపరమైన',
    'footer.terms': 'సేవా నిబంధనలు',
    'footer.privacy': 'గోప్యతా విధానం',
    'footer.contact': 'మమ్మల్ని సంప్రదించండి',
    'footer.rights': 'అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి',

    // Products
    'products.price': 'ధర',
    'products.availability': 'లభ్యత',
    'products.book': 'ఇప్పుడే బుక్ చేయండి',
    'products.addToCart': 'కార్ట్‌కి జోడించండి',
    'products.orderNow': 'ఇప్పుడే ఆర్డర్ చేయండి',
    'products.available': 'అందుబాటులో ఉంది',
    'products.unavailable': 'అందుబాటులో లేదు',
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.equipment': 'उपकरण',
    'nav.seeds': 'बीज',
    'nav.pesticides': 'कीटनाशक',
    'nav.weather': 'मौसम',
    'nav.smartTools': 'स्मार्ट टूल्स',
    'nav.contact': 'संपर्क',
    'nav.login': 'लॉगिन',
    'nav.register': 'रजिस्टर',
    'nav.logout': 'लॉगआउट',
    'nav.myOrders': 'मेरे ऑर्डर',
    'nav.myBookings': 'मेरी बुकिंग्स',
    'nav.admin': 'एडमिन',
    'nav.account': 'खाता',
    'nav.myAccount': 'मेरा खाता',
    'nav.dashboard': 'एडमिन डैशबोर्ड',
    'nav.getStarted': 'शुरू करें',

    // Home page
    'home.hero.title': 'टिकाऊ भविष्य के लिए स्मार्ट खेती',
    'home.hero.subtitle': 'हमारी उन्नत स्मार्ट खेती तकनीकों, उपकरणों और प्रीमियम गुणवत्ता वाले बीजों के साथ अपनी कृषि प्रथाओं में क्रांति लाएं।',
    'home.hero.cta': 'हमारी सेवाओं का अन्वेषण करें',
    'home.hero.learnMore': 'और जानें',

    'home.mission.title': 'हमारा मिशन',
    'home.mission.sustainable.title': 'टिकाऊ कृषि',
    'home.mission.sustainable.desc': 'पर्यावरण स्वास्थ्य और खाद्य सुरक्षा सुनिश्चित करने वाली कृषि प्रथाओं को बढ़ावा देना।',
    'home.mission.technology.title': 'प्रौद्योगिकी एकीकरण',
    'home.mission.technology.desc': 'बेहतर दक्षता के लिए पारंपरिक खेती में आधुनिक तकनीक लाना।',
    'home.mission.data.title': 'डेटा-संचालित निर्णय',
    'home.mission.data.desc': 'बेहतर उपज के लिए सूचित कृषि निर्णय लेने के लिए विश्लेषिकी का लाभ उठाना।',

    'home.benefits.title': 'स्मार्ट खेती के लाभ',
    'home.benefits.efficiency.title': 'बढ़ी हुई दक्षता',
    'home.benefits.efficiency.desc': 'सटीक कृषि तकनीकों के साथ संसाधन उपयोग को अनुकूलित करें।',
    'home.benefits.yields.title': 'उच्च उपज',
    'home.benefits.yields.desc': 'डेटा-संचालित कृषि प्रथाओं के माध्यम से फसल उत्पादन में सुधार करें।',
    'home.benefits.sustainability.title': 'पर्यावरणीय स्थिरता',
    'home.benefits.sustainability.desc': 'उत्पादकता बनाए रखते हुए पर्यावरणीय प्रभाव को कम करें।',
    'home.benefits.costs.title': 'कम लागत',
    'home.benefits.costs.desc': 'अनुकूलित संसाधन प्रबंधन के माध्यम से परिचालन खर्चों को कम करें।',

    'home.cta.title': 'अपने खेत को बदलने के लिए तैयार हैं?',
    'home.cta.subtitle': 'हजारों किसानों से जुड़ें जो पहले से ही हमारे प्लेटफॉर्म से लाभ उठा रहे हैं।',
    'home.cta.button': 'आज ही शुरू करें',

    'home.login.farmer': 'किसान लॉगिन',
    'home.login.admin': 'एडमिन लॉगिन',

    // Contact page
    'contact.hero.title': 'संपर्क करें',
    'contact.hero.subtitle': 'हमारे स्मार्ट खेती समाधानों के बारे में प्रश्न हैं? हमारी कृषि प्रौद्योगिकी विशेषज्ञों की टीम से संपर्क करें।',
    'contact.form.title': 'हमें संदेश भेजें',
    'contact.form.firstName': 'पहला नाम',
    'contact.form.firstName.placeholder': 'अपना पहला नाम दर्ज करें',
    'contact.form.lastName': 'अंतिम नाम',
    'contact.form.lastName.placeholder': 'अपना अंतिम नाम दर्ज करें',
    'contact.form.email': 'ईमेल',
    'contact.form.email.placeholder': 'अपना ईमेल पता दर्ज करें',
    'contact.form.phone': 'फोन नंबर',
    'contact.form.phone.placeholder': 'अपना फोन नंबर दर्ज करें',
    'contact.form.message': 'संदेश',
    'contact.form.message.placeholder': 'हमें अपनी कृषि आवश्यकताओं या प्रश्नों के बारे में बताएं',
    'contact.form.submit': 'संदेश भेजें',

    'contact.info.title': 'संपर्क जानकारी',
    'contact.info.address.title': 'पता',
    'contact.info.address.value': 'विष्णु इंस्टिट्यूट ऑफ टेक्नोलॉजी\nभीमावरम, आंध्र प्रदेश, भारत',
    'contact.info.phone.title': 'फोन',
    'contact.info.phone.value': '+91 6281394194',
    'contact.info.email.title': 'ईमेल',
    'contact.info.email.value': '23pa1a05d4@vishnu.edu.in\n23pa1a05d7@vishnu.edu.in',
    'contact.info.hours.title': 'व्यापार घंटे',
    'contact.info.hours.weekday': 'सोमवार - शुक्रवार:',
    'contact.info.hours.weekday.value': 'सुबह 8:00 - शाम 6:00',
    'contact.info.hours.saturday': 'शनिवार:',
    'contact.info.hours.saturday.value': 'सुबह 9:00 - शाम 4:00',
    'contact.info.hours.sunday': 'रविवार:',
    'contact.info.hours.sunday.value': 'बंद',

    'contact.faq.title': 'अक्सर पूछे जाने वाले प्रश्न',
    'contact.faq.q1.title': 'आप कौन सी कृषि सेवाएं प्रदान करते हैं?',
    'contact.faq.q1.answer': 'हम उपकरण किराए, गुणवत्ता वाले बीज, मौसम पूर्वानुमान, मिट्टी की निगरानी और सटीक कृषि उपकरणों सहित स्मार्ट खेती समाधानों की एक व्यापक श्रृंखला प्रदान करते हैं। हमारा लक्ष्य संसाधन उपयोग को अनुकूलित करते हुए किसानों को उत्पादकता बढ़ाने में मदद करना है।',
    'contact.faq.q2.title': 'मैं परामर्श कैसे शेड्यूल कर सकता हूं?',
    'contact.faq.q2.answer': 'आप हमारे संपर्क फॉर्म को भरकर, हमारे कार्यालय को सीधे कॉल करके या हमें ईमेल भेजकर परामर्श शेड्यूल कर सकते हैं। हमारे कृषि प्रौद्योगिकी विशेषज्ञ आपकी सुविधा के अनुसार बैठक की व्यवस्था करने के लिए 24 घंटे के भीतर जवाब देंगे।',

    'contact.map.title': 'हमारा स्थान',
    'contact.cta.title': 'अपने खेत को बदलने के लिए तैयार हैं?',
    'contact.cta.subtitle': 'हजारों किसानों से जुड़ें जो पहले से ही हमारे स्मार्ट खेती समाधानों से लाभ उठा रहे हैं।',
    'contact.cta.button': 'आज ही हमें कॉल करें',

    // Auth
    'auth.email': 'ईमेल',
    'auth.password': 'पासवर्ड',
    'auth.confirmPassword': 'पासवर्ड की पुष्टि करें',
    'auth.name': 'पूरा नाम',
    'auth.login': 'लॉगिन',
    'auth.register': 'रजिस्टर',
    'auth.forgotPassword': 'पासवर्ड भूल गए?',
    'auth.noAccount': 'खाता नहीं है?',
    'auth.haveAccount': 'पहले से ही खाता है?',

    // Footer
    'footer.company': 'कंपनी',
    'footer.about': 'हमारे बारे में',
    'footer.careers': 'करियर',
    'footer.blog': 'ब्लॉग',
    'footer.partners': 'पार्टनर्स',
    'footer.legal': 'कानूनी',
    'footer.terms': 'सेवा की शर्तें',
    'footer.privacy': 'गोपनीयता नीति',
    'footer.contact': 'संपर्क करें',
    'footer.rights': 'सर्वाधिकार सुरक्षित',

    // Products
    'products.price': 'कीमत',
    'products.availability': 'उपलब्धता',
    'products.book': 'अभी बुक करें',
    'products.addToCart': 'कार्ट में जोड़ें',
    'products.orderNow': 'अभी ऑर्डर करें',
    'products.available': 'उपलब्ध',
    'products.unavailable': 'अनुपलब्ध',
  }
};

// Provider Component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get language from localStorage
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'en';
  });

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('language', language);

    // Update HTML lang attribute
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const translate = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};