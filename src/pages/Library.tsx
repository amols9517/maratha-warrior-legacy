import { useState, useEffect } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/hooks/useLanguage";
import { BookOpen, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const fallbackBooks = [
  { id: "1", title_en: "Shivaji: The Great Maratha", title_mr: "शिवाजी: महान मराठा", author: "Ranjit Desai", category: "History", description_en: "A comprehensive account of Chhatrapati Shivaji Maharaj's life, battles, and governance.", description_mr: "छत्रपती शिवाजी महाराजांचे जीवन, लढाया आणि शासन यांचा सर्वसमावेशक लेखाजोखा.", external_link: null },
  { id: "2", title_en: "Shriman Yogi", title_mr: "श्रीमान योगी", author: "Ranjit Desai", category: "Historical Novel", description_en: "The legendary Marathi novel about the life and times of Shivaji Maharaj.", description_mr: "शिवाजी महाराजांच्या जीवन आणि काळाबद्दलची पौराणिक मराठी कादंबरी.", external_link: null },
  { id: "3", title_en: "Mardani Khel: The Warrior's Art", title_mr: "मर्दानी खेळ: योद्ध्याची कला", author: "Traditional", category: "Martial Arts", description_en: "A guide to the traditional techniques, weapons, and philosophy of Mardani Khel.", description_mr: "मर्दानी खेळाच्या पारंपरिक तंत्रे, शस्त्रे आणि तत्त्वज्ञान यांचे मार्गदर्शक.", external_link: null },
  { id: "4", title_en: "The Maratha Empire: Rise and Fall", title_mr: "मराठा साम्राज्य: उदय आणि पतन", author: "Stewart Gordon", category: "History", description_en: "An academic exploration of the Maratha Empire's military strategies and governance.", description_mr: "मराठा साम्राज्याच्या लष्करी रणनीती आणि शासन यांचा शैक्षणिक अभ्यास.", external_link: null },
  { id: "5", title_en: "Raja Shivchhatrapati", title_mr: "राजा शिवछत्रपती", author: "Babasaheb Purandare", category: "Biography", description_en: "The definitive biography of Shivaji Maharaj by the renowned historian.", description_mr: "प्रसिद्ध इतिहासकारांचे शिवाजी महाराजांचे अंतिम चरित्र.", external_link: null },
  { id: "6", title_en: "Traditional Indian Weapons", title_mr: "पारंपरिक भारतीय शस्त्रे", author: "P.S. Rawson", category: "Martial Arts", description_en: "Detailed study of traditional Indian weapons including those used in Mardani Khel.", description_mr: "मर्दानी खेळात वापरल्या जाणाऱ्या शस्त्रांसह पारंपरिक भारतीय शस्त्रांचा तपशीलवार अभ्यास.", external_link: null },
];

const Library = () => {
  const { t, language } = useLanguage();
  const isMr = language === "mr";
  const [activeCategory, setActiveCategory] = useState("All");
  const [books, setBooks] = useState<any[]>(fallbackBooks);

  useEffect(() => {
    const fetchBooks = async () => {
      const { data } = await supabase.from("library_books").select("*").eq("is_visible", true).order("sort_order");
      if (data && data.length > 0) setBooks(data);
    };
    fetchBooks();
  }, []);

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
            <AnimatedSection key={book.id || i} delay={i * 0.1}>
              <div className="card-warrior p-6 h-full flex flex-col">
                <div className="flex items-start gap-3 mb-3">
                  <BookOpen className="w-8 h-8 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{isMr ? (book.title_mr || book.title_en) : book.title_en}</h3>
                    <p className="text-xs text-primary">{book.author}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground flex-1">{isMr ? (book.description_mr || book.description_en) : book.description_en}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                    {categories.find(c => c.key === book.category)?.label || book.category}
                  </span>
                  {book.external_link && (
                    <a href={book.external_link} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1">
                      <ExternalLink size={12} /> Link
                    </a>
                  )}
                </div>
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
