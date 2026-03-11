import AnimatedSection from "@/components/AnimatedSection";
import { BookOpen, ExternalLink } from "lucide-react";

const books = [
  {
    title: "Shivaji: The Great Maratha",
    author: "Ranjit Desai",
    category: "History",
    desc: "A comprehensive account of Chhatrapati Shivaji Maharaj's life, battles, and governance.",
  },
  {
    title: "Shriman Yogi",
    author: "Ranjit Desai",
    category: "Historical Novel",
    desc: "The legendary Marathi novel about the life and times of Shivaji Maharaj.",
  },
  {
    title: "Mardani Khel: The Warrior's Art",
    author: "Traditional",
    category: "Martial Arts",
    desc: "A guide to the traditional techniques, weapons, and philosophy of Mardani Khel.",
  },
  {
    title: "The Maratha Empire: Rise and Fall",
    author: "Stewart Gordon",
    category: "History",
    desc: "An academic exploration of the Maratha Empire's military strategies and governance.",
  },
  {
    title: "Raja Shivchhatrapati",
    author: "Babasaheb Purandare",
    category: "Biography",
    desc: "The definitive biography of Shivaji Maharaj by the renowned historian.",
  },
  {
    title: "Traditional Indian Weapons",
    author: "P.S. Rawson",
    category: "Martial Arts",
    desc: "Detailed study of traditional Indian weapons including those used in Mardani Khel.",
  },
];

const categories = ["All", "History", "Martial Arts", "Biography", "Historical Novel"];

import { useState } from "react";

const Library = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? books : books.filter((b) => b.category === activeCategory);

  return (
    <div className="py-20">
      <div className="section-container">
        <AnimatedSection className="text-center mb-12">
          <h1 className="section-title">Library</h1>
          <div className="divider-ornament" />
          <p className="section-subtitle">Resources on Shivaji Maharaj, Maratha warriors, and Mardani Khel</p>
        </AnimatedSection>

        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((book, i) => (
            <AnimatedSection key={book.title} delay={i * 0.1}>
              <div className="card-warrior p-6 h-full flex flex-col">
                <div className="flex items-start gap-3 mb-3">
                  <BookOpen className="w-8 h-8 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{book.title}</h3>
                    <p className="text-xs text-primary">{book.author}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground flex-1">{book.desc}</p>
                <span className="inline-block mt-3 text-xs bg-muted text-muted-foreground px-2 py-1 rounded w-fit">
                  {book.category}
                </span>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-16 text-center card-warrior p-8">
          <h3 className="font-display text-xl font-bold text-foreground mb-2">Want to Contribute?</h3>
          <p className="text-muted-foreground text-sm mb-4">
            If you have books, articles, or resources related to Mardani Khel or Maratha history, we'd love to add them to our collection.
          </p>
          <a href="mailto:info@mardanikhel.org" className="btn-outline-saffron text-sm">
            <ExternalLink size={14} className="mr-2 inline" /> Send Resources
          </a>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Library;
