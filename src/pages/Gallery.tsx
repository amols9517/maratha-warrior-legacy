import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import { X } from "lucide-react";

const photos = [
  { src: gallery1, title: "Sword Training Session", category: "Training" },
  { src: gallery2, title: "Stage Performance", category: "Performance" },
  { src: gallery3, title: "Guruji with Students", category: "Training" },
  { src: gallery4, title: "Traditional Weapons", category: "Heritage" },
  { src: gallery5, title: "Young Warriors", category: "Training" },
  { src: gallery6, title: "Cultural Festival", category: "Performance" },
];

const categories = ["All", "Training", "Performance", "Heritage"];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = activeCategory === "All" ? photos : photos.filter((p) => p.category === activeCategory);

  return (
    <div>
      <section className="py-20">
        <div className="section-container">
          <AnimatedSection className="text-center mb-12">
            <h1 className="section-title">Gallery</h1>
            <div className="divider-ornament" />
            <p className="section-subtitle">Moments of valor, training, and tradition</p>
          </AnimatedSection>

          {/* Filters */}
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

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((photo, i) => (
              <AnimatedSection key={photo.title} delay={i * 0.1}>
                <button
                  onClick={() => setLightbox(photo.src)}
                  className="card-warrior w-full aspect-[4/3] overflow-hidden group relative"
                >
                  <img src={photo.src} alt={photo.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div className="text-left">
                      <p className="font-display font-semibold text-foreground text-sm">{photo.title}</p>
                      <p className="text-xs text-primary">{photo.category}</p>
                    </div>
                  </div>
                </button>
              </AnimatedSection>
            ))}
          </div>

          {/* Video Section */}
          <AnimatedSection className="mt-20 text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gradient-saffron mb-4">Video Gallery</h2>
            <div className="divider-ornament" />
            <p className="text-muted-foreground mb-8">Watch our performances and training sessions</p>
            <div className="card-warrior aspect-video max-w-3xl mx-auto flex items-center justify-center">
              <p className="text-muted-foreground">Video content coming soon — Subscribe to our YouTube channel for updates</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-foreground hover:text-primary" onClick={() => setLightbox(null)}>
            <X size={32} />
          </button>
          <img src={lightbox} alt="Gallery view" className="max-w-full max-h-[85vh] rounded-lg object-contain" />
        </div>
      )}
    </div>
  );
};

export default Gallery;
