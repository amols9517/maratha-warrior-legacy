import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/hooks/useLanguage";
import { BookOpen, ExternalLink } from "lucide-react";

const books = [
  { titleEn: "Shivaji: The Great Maratha", titleMr: "शिवाजी: महान मराठा", author: "Ranjit Desai", category: "History", descEn: "A comprehensive account of Chhatrapati Shivaji Maharaj's life, battles, and governance.", descMr: "छत्रपती शिवाजी महाराजांचे जीवन, लढाया आणि शासन यांचा सर्वसमावेशक लेखाजोखा." },
  { titleEn: "Shriman Yogi", titleMr: "श्रीमान योगी", author: "Ranjit Desai", category: "Historical Novel", descEn: "The legendary Marathi novel about the life and times of Shivaji Maharaj.", descMr: "शिवाजी महाराजांच्या जीवन आणि काळाबद्दलची पौराणिक मराठी कादंबरी." },
  { titleEn: "Mardani Khel: The Warrior's Art", titleMr: "मर्दानी खेळ: योद्ध्याची कला", author: "Traditional", category: "Martial Arts", descEn: "A guide to the traditional techniques, weapons, and philosophy of Mardani Khel.", descMr: "मर्दानी खेळाच्या पारंपरिक तंत्रे, शस्त्रे आणि तत्त्वज्ञान यांचे मार्गदर्शक." },
  { titleEn: "The Maratha Empire: Rise and Fall", titleMr: "मराठा साम्राज्य: उदय आणि पतन", author: "Stewart Gordon", category: "History", descEn: "An academic exploration of the Maratha Empire's military strategies and governance.", descMr: "मराठा साम्राज्याच्या लष्करी रणनीती आणि शासन यांचा शैक्षणिक अभ्यास." },
  { titleEn: "Raja Shivchhatrapati", titleMr: "राजा शिवछत्रपती", author: "Babasaheb Purandare", category: "Biography", descEn: "The definitive biography of Shivaji Maharaj by the renowned historian.", descMr: "प्रसिद्ध इतिहासकारांचे शिवाजी महाराजांचे अंतिम चरित्र." },
  { titleEn: "Traditional Indian Weapons", titleMr: "पारंपरिक भारतीय शस्त्रे", author: "P.S. Rawson", category: "Martial Arts", descEn: "Detailed study of traditional Indian weapons including those used in Mardani Khel.", descMr: "मर्दानी खेळात वापरल्या जाणाऱ्या शस्त्रांसह पारंपरिक भारतीय शस्त्रांचा तपशीलवार अभ्यास." },
];

const Library = () => {
  const { t, language } = useLanguage();
  const isMr = language === "mr";
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    { key: "All", label: t("library.all") },
    { key: "History", label: t("library.history") },
    { key: "Martial Arts", label: t("library.martialArts") },
    { key: "Biography", label: t("library.biography") },
    { key: "Historical Novel", label: t("library.historicalNovel") },
  ];

  const filtered = activeCategory === "All" ? books : books.filter((b) => b.category === activeCategory);

  return (
    <div className="py-20">
      <div className="section-container">
        <AnimatedSection className="text-center mb-12">
          <h1 className="section-title">{t("library.title")}</h1>
          <div className="divider-ornament" />
          <p className="section-subtitle">{t("library.subtitle")}</p>
        </AnimatedSection>

        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeCategory === cat.key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-primary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((book, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="card-warrior p-6 h-full flex flex-col">
                <div className="flex items-start gap-3 mb-3">
                  <BookOpen className="w-8 h-8 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{isMr ? book.titleMr : book.titleEn}</h3>
                    <p className="text-xs text-primary">{book.author}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground flex-1">{isMr ? book.descMr : book.descEn}</p>
                <span className="inline-block mt-3 text-xs bg-muted text-muted-foreground px-2 py-1 rounded w-fit">
                  {categories.find(c => c.key === book.category)?.label}
                </span>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-16 text-center card-warrior p-8">
          <h3 className="font-display text-xl font-bold text-foreground mb-2">{t("library.contributeTitle")}</h3>
          <p className="text-muted-foreground text-sm mb-4">{t("library.contributeDesc")}</p>
          <a href="mailto:info@mardanikhel.org" className="btn-outline-saffron text-sm">
            <ExternalLink size={14} className="mr-2 inline" /> {t("library.sendResources")}
          </a>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Library;
