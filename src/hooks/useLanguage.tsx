import { createContext, useContext, useState, ReactNode, useCallback } from "react";

type Language = "en" | "mr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navbar
  "nav.home": { en: "Home", mr: "मुख्यपृष्ठ" },
  "nav.about": { en: "About Us", mr: "आमच्याबद्दल" },
  "nav.gallery": { en: "Gallery", mr: "गॅलरी" },
  "nav.branches": { en: "Branches", mr: "शाखा" },
  "nav.events": { en: "Events", mr: "कार्यक्रम" },
  "nav.library": { en: "Library", mr: "ग्रंथालय" },
  "nav.join": { en: "Join Training", mr: "प्रशिक्षणात सामील व्हा" },
  "nav.contact": { en: "Contact", mr: "संपर्क" },
  "nav.admin": { en: "Admin", mr: "प्रशासक" },
  "nav.login": { en: "Login", mr: "लॉगिन" },
  "nav.logout": { en: "Logout", mr: "लॉगआउट" },

  // Hero
  "hero.tagline": { en: "॥ जय शिवराय ॥", mr: "॥ जय शिवराय ॥" },
  "hero.title1": { en: "ShriRam Shivkalin", mr: "श्रीराम शिवकालीन" },
  "hero.title2": { en: "Mardani Khel Akhada", mr: "मर्दानी खेळ आखाडा" },
  "hero.desc": {
    en: "Preserving the ancient warrior traditions of Chhatrapati Shivaji Maharaj. Training the next generation in the sacred art of Mardani Khel.",
    mr: "छत्रपती शिवाजी महाराजांच्या प्राचीन योद्धा परंपरांचे जतन. मर्दानी खेळाच्या पवित्र कलेमध्ये पुढच्या पिढीला प्रशिक्षण.",
  },
  "hero.joinTraining": { en: "Join Training", mr: "प्रशिक्षणात सामील व्हा" },
  "hero.bookShow": { en: "Book a Show", mr: "शो बुक करा" },

  // Features
  "features.title": { en: "The Warrior's Path", mr: "योद्ध्याचा मार्ग" },
  "features.subtitle": {
    en: "Discover the traditions, training, and heritage of Maharashtra's greatest martial art",
    mr: "महाराष्ट्राच्या महान युद्धकलेच्या परंपरा, प्रशिक्षण आणि वारसा शोधा",
  },
  "features.mardaniKhel": { en: "Mardani Khel", mr: "मर्दानी खेळ" },
  "features.mardaniKhelDesc": { en: "Ancient Maratha sword fighting art passed down through generations", mr: "पिढ्यानपिढ्या चालत आलेली प्राचीन मराठा तलवारबाजी कला" },
  "features.expertTraining": { en: "Expert Training", mr: "तज्ञ प्रशिक्षण" },
  "features.expertTrainingDesc": { en: "Learn from experienced Guruji and traditional warriors", mr: "अनुभवी गुरुजी आणि पारंपरिक योद्ध्यांकडून शिका" },
  "features.livePerformances": { en: "Live Performances", mr: "थेट प्रदर्शन" },
  "features.livePerformancesDesc": { en: "Cultural shows and demonstrations at events across India", mr: "भारतभरातील कार्यक्रमांमध्ये सांस्कृतिक कार्यक्रम आणि प्रात्यक्षिके" },
  "features.branches": { en: "5 Branches", mr: "५ शाखा" },
  "features.branchesDesc": { en: "Training centers across Maharashtra for easy access", mr: "सुलभ प्रवेशासाठी संपूर्ण महाराष्ट्रात प्रशिक्षण केंद्रे" },
  "features.richHeritage": { en: "Rich Heritage", mr: "समृद्ध वारसा" },
  "features.richHeritageDesc": { en: "Library of books and resources on Maratha warrior history", mr: "मराठा योद्धा इतिहासावरील पुस्तके आणि संसाधनांचे ग्रंथालय" },
  "features.joinLegacy": { en: "Join the Legacy", mr: "वारशात सामील व्हा" },
  "features.joinLegacyDesc": { en: "Become part of the warrior tradition — all ages welcome", mr: "योद्धा परंपरेचा भाग व्हा — सर्व वयोगटांचे स्वागत" },

  // Gallery Preview
  "galleryPreview.title": { en: "Glimpses of Glory", mr: "गौरवाची झलक" },
  "galleryPreview.viewFull": { en: "View Full Gallery", mr: "संपूर्ण गॅलरी पहा" },

  // CTA
  "cta.title": { en: "Become a Warrior", mr: "योद्धा बना" },
  "cta.desc": {
    en: "Whether you want to learn the ancient art or book our team for a spectacular cultural performance — we welcome you.",
    mr: "तुम्हाला प्राचीन कला शिकायची असो किंवा एखाद्या भव्य सांस्कृतिक कार्यक्रमासाठी आमच्या टीमला बुक करायचे असो — आम्ही तुमचे स्वागत करतो.",
  },
  "cta.startTraining": { en: "Start Training", mr: "प्रशिक्षण सुरू करा" },
  "cta.contactUs": { en: "Contact Us", mr: "आमच्याशी संपर्क साधा" },

  // About page
  "about.title": { en: "About Us", mr: "आमच्याबद्दल" },
  "about.subtitle": { en: "Guardians of Maratha Warrior Heritage", mr: "मराठा योद्धा वारशाचे रक्षक" },
  "about.historyTitle": { en: "History of the Akhada", mr: "आखाड्याचा इतिहास" },
  "about.historyP1": {
    en: "ShriRam Shivkalin Mardani Khel Akhada was founded with the sacred mission of preserving the martial traditions that were the backbone of the Maratha Empire under Chhatrapati Shivaji Maharaj.",
    mr: "श्रीराम शिवकालीन मर्दानी खेळ आखाडा हा छत्रपती शिवाजी महाराजांच्या अधिपत्याखालील मराठा साम्राज्याचा कणा असलेल्या युद्ध परंपरांचे जतन करण्याच्या पवित्र ध्येयाने स्थापन करण्यात आला.",
  },
  "about.historyP2": {
    en: "Mardani Khel, meaning \"the warrior's game,\" is an armed martial art from Maharashtra that includes sword fighting (talwar), shield combat (dhal), staff fighting (lathi), and spear techniques (vita). It was the primary combat system of the Maratha warriors who defended Swarajya.",
    mr: "मर्दानी खेळ, म्हणजे \"योद्ध्याचा खेळ,\" ही महाराष्ट्रातील एक सशस्त्र युद्धकला आहे ज्यात तलवारबाजी, ढाल लढाई, लाठी लढाई आणि भाला तंत्रे यांचा समावेश आहे. ही स्वराज्याचे रक्षण करणाऱ्या मराठा योद्ध्यांची प्राथमिक युद्ध प्रणाली होती.",
  },
  "about.historyP3": {
    en: "Our Akhada continues this unbroken tradition, training new generations in the art of combat, discipline, and the warrior spirit that defined an era.",
    mr: "आमचा आखाडा ही अखंडित परंपरा पुढे चालवत आहे, नवीन पिढ्यांना लढाईची कला, शिस्त आणि एका युगाची ओळख असलेल्या योद्धा भावनेचे प्रशिक्षण देत आहे.",
  },
  "about.gurujiTitle": { en: "Our Guruji", mr: "आमचे गुरुजी" },
  "about.gurujiSubtitle": { en: "Head Trainer & Founder", mr: "मुख्य प्रशिक्षक आणि संस्थापक" },
  "about.gurujiDesc": {
    en: "With decades of experience in traditional Mardani Khel, our Guruji has dedicated their life to preserving and teaching this ancient warrior art. Trained in the traditional guru-shishya parampara, they have performed across India and trained thousands of students in the discipline, technique, and philosophy of Maratha combat arts.",
    mr: "पारंपरिक मर्दानी खेळातील अनेक दशकांच्या अनुभवासह, आमच्या गुरुजींनी या प्राचीन योद्धा कलेचे जतन आणि शिकवण्यासाठी आपले जीवन समर्पित केले आहे. पारंपरिक गुरु-शिष्य परंपरेत प्रशिक्षित, त्यांनी संपूर्ण भारतात प्रदर्शन केले आहे आणि हजारो विद्यार्थ्यांना मराठा युद्धकलेच्या शिस्त, तंत्र आणि तत्त्वज्ञानाचे प्रशिक्षण दिले आहे.",
  },
  "about.missionTitle": { en: "Our Mission", mr: "आमचे ध्येय" },
  "about.missionDesc": {
    en: "To preserve, promote, and propagate the traditional martial art of Mardani Khel among the youth of Maharashtra and India. We train warriors — not just in combat, but in discipline, respect, and the values of Chhatrapati Shivaji Maharaj.",
    mr: "महाराष्ट्र आणि भारतातील तरुणांमध्ये मर्दानी खेळाच्या पारंपरिक युद्धकलेचे जतन, प्रसार आणि प्रचार करणे. आम्ही योद्ध्यांना प्रशिक्षण देतो — केवळ लढाईतच नव्हे, तर शिस्त, आदर आणि छत्रपती शिवाजी महाराजांच्या मूल्यांमध्ये.",
  },
  "about.visionTitle": { en: "Our Vision", mr: "आमची दृष्टी" },
  "about.visionDesc": {
    en: "To make Mardani Khel a nationally recognized martial art, bring it to international stages, and ensure that every generation remembers and carries forward the warrior heritage of the Maratha Empire.",
    mr: "मर्दानी खेळ ही राष्ट्रीय स्तरावर मान्यताप्राप्त युद्धकला बनवणे, तिला आंतरराष्ट्रीय मंचावर आणणे आणि प्रत्येक पिढी मराठा साम्राज्याचा योद्धा वारसा लक्षात ठेवेल आणि पुढे नेईल याची खात्री करणे.",
  },
  "about.joinAkhada": { en: "Join the Akhada", mr: "आखाड्यात सामील व्हा" },

  // Gallery
  "gallery.title": { en: "Gallery", mr: "गॅलरी" },
  "gallery.subtitle": { en: "Moments of valor, training, and tradition", mr: "शौर्य, प्रशिक्षण आणि परंपरेचे क्षण" },
  "gallery.all": { en: "All", mr: "सर्व" },
  "gallery.training": { en: "Training", mr: "प्रशिक्षण" },
  "gallery.performance": { en: "Performance", mr: "प्रदर्शन" },
  "gallery.heritage": { en: "Heritage", mr: "वारसा" },
  "gallery.videoTitle": { en: "Video Gallery", mr: "व्हिडिओ गॅलरी" },
  "gallery.videoDesc": { en: "Watch our performances and training sessions", mr: "आमचे प्रदर्शन आणि प्रशिक्षण सत्रे पहा" },
  "gallery.videoSoon": { en: "Video content coming soon — Subscribe to our YouTube channel for updates", mr: "व्हिडिओ सामग्री लवकरच येत आहे — अपडेटसाठी आमच्या YouTube चॅनेलची सदस्यता घ्या" },

  // Branches
  "branches.title": { en: "Our Branches", mr: "आमच्या शाखा" },
  "branches.subtitle": { en: "Training centers across Maharashtra — find one near you", mr: "संपूर्ण महाराष्ट्रात प्रशिक्षण केंद्रे — तुमच्या जवळचे शोधा" },
  "branches.mapSoon": { en: "Map coming soon", mr: "नकाशा लवकरच येत आहे" },

  // Events
  "events.title": { en: "Events & Shows", mr: "कार्यक्रम आणि शो" },
  "events.subtitle": { en: "Witness the power and grace of Mardani Khel", mr: "मर्दानी खेळाची शक्ती आणि कृपा पहा" },
  "events.upcoming": { en: "Upcoming Events", mr: "आगामी कार्यक्रम" },
  "events.past": { en: "Past Performances", mr: "मागील प्रदर्शन" },
  "events.bookTitle": { en: "Book Our Team for a Show", mr: "शोसाठी आमच्या टीमला बुक करा" },
  "events.bookDesc": {
    en: "Want to add an unforgettable cultural performance to your event? Our warriors perform at festivals, corporate events, school functions, and national celebrations.",
    mr: "तुमच्या कार्यक्रमात एक अविस्मरणीय सांस्कृतिक प्रदर्शन जोडायचे आहे? आमचे योद्धे सण, कॉर्पोरेट कार्यक्रम, शालेय कार्यक्रम आणि राष्ट्रीय उत्सवांमध्ये प्रदर्शन करतात.",
  },
  "events.contactBooking": { en: "Contact for Booking", mr: "बुकिंगसाठी संपर्क करा" },

  // Library
  "library.title": { en: "Library", mr: "ग्रंथालय" },
  "library.subtitle": { en: "Resources on Shivaji Maharaj, Maratha warriors, and Mardani Khel", mr: "शिवाजी महाराज, मराठा योद्धे आणि मर्दानी खेळ यांवरील संसाधने" },
  "library.all": { en: "All", mr: "सर्व" },
  "library.history": { en: "History", mr: "इतिहास" },
  "library.martialArts": { en: "Martial Arts", mr: "युद्धकला" },
  "library.biography": { en: "Biography", mr: "चरित्र" },
  "library.historicalNovel": { en: "Historical Novel", mr: "ऐतिहासिक कादंबरी" },
  "library.contributeTitle": { en: "Want to Contribute?", mr: "योगदान द्यायचे आहे?" },
  "library.contributeDesc": {
    en: "If you have books, articles, or resources related to Mardani Khel or Maratha history, we'd love to add them to our collection.",
    mr: "तुमच्याकडे मर्दानी खेळ किंवा मराठा इतिहासाशी संबंधित पुस्तके, लेख किंवा संसाधने असल्यास, आम्हाला ती आमच्या संग्रहात जोडायला आवडेल.",
  },
  "library.sendResources": { en: "Send Resources", mr: "संसाधने पाठवा" },

  // Join Training
  "join.title": { en: "Join Training", mr: "प्रशिक्षणात सामील व्हा" },
  "join.subtitle": { en: "Begin your warrior journey — fill out the form below", mr: "तुमचा योद्धा प्रवास सुरू करा — खालील फॉर्म भरा" },
  "join.fullName": { en: "Full Name *", mr: "पूर्ण नाव *" },
  "join.namePlaceholder": { en: "Enter your full name", mr: "तुमचे पूर्ण नाव प्रविष्ट करा" },
  "join.age": { en: "Age *", mr: "वय *" },
  "join.agePlaceholder": { en: "Your age", mr: "तुमचे वय" },
  "join.location": { en: "Location", mr: "ठिकाण" },
  "join.locationPlaceholder": { en: "City / Village", mr: "शहर / गाव" },
  "join.contact": { en: "Contact Number *", mr: "संपर्क क्रमांक *" },
  "join.contactPlaceholder": { en: "+91 XXXXX XXXXX", mr: "+91 XXXXX XXXXX" },
  "join.branch": { en: "Preferred Branch *", mr: "पसंतीची शाखा *" },
  "join.selectBranch": { en: "Select a branch", mr: "शाखा निवडा" },
  "join.submit": { en: "Submit Application", mr: "अर्ज सबमिट करा" },
  "join.submitting": { en: "Submitting...", mr: "सबमिट करत आहे..." },
  "join.fillRequired": { en: "Please fill all required fields", mr: "कृपया सर्व आवश्यक फील्ड भरा" },
  "join.success": { en: "Application submitted successfully! We will contact you soon.", mr: "अर्ज यशस्वीरित्या सबमिट झाला! आम्ही लवकरच तुमच्याशी संपर्क साधू." },
  "join.error": { en: "Submission failed. Please try again.", mr: "सबमिशन अयशस्वी. कृपया पुन्हा प्रयत्न करा." },

  // Contact
  "contact.title": { en: "Contact Us", mr: "आमच्याशी संपर्क साधा" },
  "contact.subtitle": { en: "Get in touch — we'd love to hear from you", mr: "संपर्कात राहा — आम्हाला तुमच्याकडून ऐकायला आवडेल" },
  "contact.name": { en: "Name *", mr: "नाव *" },
  "contact.namePlaceholder": { en: "Your name", mr: "तुमचे नाव" },
  "contact.email": { en: "Email *", mr: "ईमेल *" },
  "contact.phone": { en: "Phone", mr: "फोन" },
  "contact.message": { en: "Message *", mr: "संदेश *" },
  "contact.messagePlaceholder": { en: "Your message...", mr: "तुमचा संदेश..." },
  "contact.send": { en: "Send Message", mr: "संदेश पाठवा" },
  "contact.sending": { en: "Sending...", mr: "पाठवत आहे..." },
  "contact.contactInfo": { en: "Contact Information", mr: "संपर्क माहिती" },
  "contact.followUs": { en: "Follow Us", mr: "आम्हाला फॉलो करा" },
  "contact.fillRequired": { en: "Please fill all required fields", mr: "कृपया सर्व आवश्यक फील्ड भरा" },
  "contact.success": { en: "Message sent! We will get back to you shortly.", mr: "संदेश पाठवला! आम्ही लवकरच तुम्हाला उत्तर देऊ." },
  "contact.error": { en: "Failed to send message. Please try again.", mr: "संदेश पाठवणे अयशस्वी. कृपया पुन्हा प्रयत्न करा." },

  // Auth
  "auth.login": { en: "Login", mr: "लॉगिन" },
  "auth.createAccount": { en: "Create Account", mr: "खाते तयार करा" },
  "auth.fullName": { en: "Full Name", mr: "पूर्ण नाव" },
  "auth.email": { en: "Email", mr: "ईमेल" },
  "auth.password": { en: "Password", mr: "पासवर्ड" },
  "auth.signUp": { en: "Sign Up", mr: "साइन अप" },
  "auth.pleaseWait": { en: "Please wait...", mr: "कृपया प्रतीक्षा करा..." },
  "auth.noAccount": { en: "Don't have an account?", mr: "खाते नाही?" },
  "auth.haveAccount": { en: "Already have an account?", mr: "आधीच खाते आहे?" },

  // Footer
  "footer.description": {
    en: "Preserving the ancient warrior traditions of Chhatrapati Shivaji Maharaj through Mardani Khel martial arts.",
    mr: "मर्दानी खेळ युद्धकलेद्वारे छत्रपती शिवाजी महाराजांच्या प्राचीन योद्धा परंपरांचे जतन.",
  },
  "footer.quickLinks": { en: "Quick Links", mr: "जलद दुवे" },
  "footer.contact": { en: "Contact", mr: "संपर्क" },
  "footer.followUs": { en: "Follow Us", mr: "आम्हाला फॉलो करा" },
  "footer.rights": { en: "All rights reserved.", mr: "सर्व हक्क राखीव." },
  "footer.eventsShows": { en: "Events & Shows", mr: "कार्यक्रम आणि शो" },
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem("app-language");
    return (stored === "mr" ? "mr" : "en") as Language;
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("app-language", lang);
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[key]?.[language] || key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
