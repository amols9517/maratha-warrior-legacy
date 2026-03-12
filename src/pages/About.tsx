import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/hooks/useLanguage";
import aboutBg from "@/assets/about-bg.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import { Target, Eye, Shield, Sword } from "lucide-react";

const About = () => {
  const { t } = useLanguage();

  return (
    <div>
      <section className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={aboutBg} alt="Akhada" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <div className="relative z-10 text-center section-container">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-gradient-saffron">{t("about.title")}</h1>
          <div className="divider-ornament" />
          <p className="text-muted-foreground text-lg">{t("about.subtitle")}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h2 className="section-title text-left">{t("about.historyTitle")}</h2>
              <div className="w-24 h-1 rounded-full mb-6" style={{ background: "linear-gradient(90deg, hsl(28, 90%, 52%), transparent)" }} />
              <div className="space-y-4 text-muted-foreground">
                <p>{t("about.historyP1")}</p>
                <p>{t("about.historyP2")}</p>
                <p>{t("about.historyP3")}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="rounded-lg overflow-hidden card-warrior">
                <img src={gallery3} alt="Guruji teaching" className="w-full h-80 object-cover" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/50">
        <div className="section-container">
          <AnimatedSection className="text-center">
            <h2 className="section-title">{t("about.gurujiTitle")}</h2>
            <div className="divider-ornament" />
            <div className="max-w-3xl mx-auto mt-8 card-warrior p-8">
              <Sword className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">{t("about.gurujiSubtitle")}</h3>
              <p className="text-muted-foreground">{t("about.gurujiDesc")}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="card-warrior p-8 h-full">
                <Target className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">{t("about.missionTitle")}</h3>
                <p className="text-muted-foreground">{t("about.missionDesc")}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="card-warrior p-8 h-full">
                <Eye className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">{t("about.visionTitle")}</h3>
                <p className="text-muted-foreground">{t("about.visionDesc")}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <AnimatedSection>
          <Link to="/join" className="btn-saffron">{t("about.joinAkhada")}</Link>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default About;
