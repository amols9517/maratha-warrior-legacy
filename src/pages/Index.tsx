import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sword, Users, Calendar, MapPin, BookOpen, Shield } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/hooks/useLanguage";
import heroBg from "@/assets/hero-bg.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery5 from "@/assets/gallery-5.jpg";

const Index = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Sword, title: t("features.mardaniKhel"), desc: t("features.mardaniKhelDesc"), link: "/about" },
    { icon: Users, title: t("features.expertTraining"), desc: t("features.expertTrainingDesc"), link: "/join" },
    { icon: Calendar, title: t("features.livePerformances"), desc: t("features.livePerformancesDesc"), link: "/events" },
    { icon: MapPin, title: t("features.branches"), desc: t("features.branchesDesc"), link: "/branches" },
    { icon: BookOpen, title: t("features.richHeritage"), desc: t("features.richHeritageDesc"), link: "/library" },
    { icon: Shield, title: t("features.joinLegacy"), desc: t("features.joinLegacyDesc"), link: "/join" },
  ];

  return (
    <div>
      <section className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Mardani Khel Warrior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>
        <div className="relative z-10 text-center section-container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
            <p className="text-primary font-display text-sm md:text-base tracking-[0.3em] uppercase mb-4">{t("hero.tagline")}</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-4 leading-tight">
              {t("hero.title1")}<br />
              <span className="text-gradient-saffron">{t("hero.title2")}</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">{t("hero.desc")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/join" className="btn-saffron">{t("hero.joinTraining")}</Link>
              <Link to="/events" className="btn-outline-saffron">{t("hero.bookShow")}</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="section-container">
          <AnimatedSection className="text-center mb-16">
            <h2 className="section-title">{t("features.title")}</h2>
            <div className="divider-ornament" />
            <p className="section-subtitle">{t("features.subtitle")}</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
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

      <section className="py-20 bg-secondary/50">
        <div className="section-container">
          <AnimatedSection className="text-center mb-12">
            <h2 className="section-title">{t("galleryPreview.title")}</h2>
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
            <Link to="/gallery" className="btn-outline-saffron">{t("galleryPreview.viewFull")}</Link>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="section-container text-center">
          <AnimatedSection>
            <h2 className="section-title">{t("cta.title")}</h2>
            <div className="divider-ornament" />
            <p className="section-subtitle mb-8">{t("cta.desc")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/join" className="btn-saffron">{t("cta.startTraining")}</Link>
              <Link to="/contact" className="btn-outline-saffron">{t("cta.contactUs")}</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Index;
