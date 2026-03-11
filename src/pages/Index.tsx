import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sword, Users, Calendar, MapPin, BookOpen, Shield } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import heroBg from "@/assets/hero-bg.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery5 from "@/assets/gallery-5.jpg";

const features = [
  { icon: Sword, title: "Mardani Khel", desc: "Ancient Maratha sword fighting art passed down through generations", link: "/about" },
  { icon: Users, title: "Expert Training", desc: "Learn from experienced Guruji and traditional warriors", link: "/join" },
  { icon: Calendar, title: "Live Performances", desc: "Cultural shows and demonstrations at events across India", link: "/events" },
  { icon: MapPin, title: "5 Branches", desc: "Training centers across Maharashtra for easy access", link: "/branches" },
  { icon: BookOpen, title: "Rich Heritage", desc: "Library of books and resources on Maratha warrior history", link: "/library" },
  { icon: Shield, title: "Join the Legacy", desc: "Become part of the warrior tradition — all ages welcome", link: "/join" },
];

const Index = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Mardani Khel Warrior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>
        <div className="relative z-10 text-center section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <p className="text-primary font-display text-sm md:text-base tracking-[0.3em] uppercase mb-4">
              ॥ जय शिवराय ॥
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-4 leading-tight">
              ShriRam Shivkalin
              <br />
              <span className="text-gradient-saffron">Mardani Khel Akhada</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Preserving the ancient warrior traditions of Chhatrapati Shivaji Maharaj.
              Training the next generation in the sacred art of Mardani Khel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/join" className="btn-saffron">
                Join Training
              </Link>
              <Link to="/events" className="btn-outline-saffron">
                Book a Show
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-28">
        <div className="section-container">
          <AnimatedSection className="text-center mb-16">
            <h2 className="section-title">The Warrior's Path</h2>
            <div className="divider-ornament" />
            <p className="section-subtitle">
              Discover the traditions, training, and heritage of Maharashtra's greatest martial art
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <AnimatedSection key={feature.title} delay={i * 0.1}>
                <Link to={feature.link} className="card-warrior block p-6 group">
                  <feature.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-secondary/50">
        <div className="section-container">
          <AnimatedSection className="text-center mb-12">
            <h2 className="section-title">Glimpses of Glory</h2>
            <div className="divider-ornament" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[gallery1, gallery2, gallery5].map((img, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="aspect-[4/3] rounded-lg overflow-hidden card-warrior">
                  <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-10">
            <Link to="/gallery" className="btn-outline-saffron">
              View Full Gallery
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="section-container text-center">
          <AnimatedSection>
            <h2 className="section-title">Become a Warrior</h2>
            <div className="divider-ornament" />
            <p className="section-subtitle mb-8">
              Whether you want to learn the ancient art or book our team for a spectacular cultural performance — we welcome you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/join" className="btn-saffron">Start Training</Link>
              <Link to="/contact" className="btn-outline-saffron">Contact Us</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Index;
