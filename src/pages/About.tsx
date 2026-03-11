import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import aboutBg from "@/assets/about-bg.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import { Target, Eye, Shield, Sword } from "lucide-react";

const About = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={aboutBg} alt="Akhada" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <div className="relative z-10 text-center section-container">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-gradient-saffron">About Us</h1>
          <div className="divider-ornament" />
          <p className="text-muted-foreground text-lg">Guardians of Maratha Warrior Heritage</p>
        </div>
      </section>

      {/* History */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h2 className="section-title text-left">History of the Akhada</h2>
              <div className="w-24 h-1 rounded-full mb-6" style={{ background: "linear-gradient(90deg, hsl(28, 90%, 52%), transparent)" }} />
              <div className="space-y-4 text-muted-foreground">
                <p>
                  ShriRam Shivkalin Mardani Khel Akhada was founded with the sacred mission of preserving the martial traditions that were the backbone of the Maratha Empire under Chhatrapati Shivaji Maharaj.
                </p>
                <p>
                  Mardani Khel, meaning "the warrior's game," is an armed martial art from Maharashtra that includes sword fighting (talwar), shield combat (dhal), staff fighting (lathi), and spear techniques (vita). It was the primary combat system of the Maratha warriors who defended Swarajya.
                </p>
                <p>
                  Our Akhada continues this unbroken tradition, training new generations in the art of combat, discipline, and the warrior spirit that defined an era.
                </p>
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

      {/* Guruji */}
      <section className="py-20 bg-secondary/50">
        <div className="section-container">
          <AnimatedSection className="text-center">
            <h2 className="section-title">Our Guruji</h2>
            <div className="divider-ornament" />
            <div className="max-w-3xl mx-auto mt-8 card-warrior p-8">
              <Sword className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">Head Trainer & Founder</h3>
              <p className="text-muted-foreground">
                With decades of experience in traditional Mardani Khel, our Guruji has dedicated their life to preserving and teaching this ancient warrior art. Trained in the traditional guru-shishya parampara, they have performed across India and trained thousands of students in the discipline, technique, and philosophy of Maratha combat arts.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="card-warrior p-8 h-full">
                <Target className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">Our Mission</h3>
                <p className="text-muted-foreground">
                  To preserve, promote, and propagate the traditional martial art of Mardani Khel among the youth of Maharashtra and India. We train warriors — not just in combat, but in discipline, respect, and the values of Chhatrapati Shivaji Maharaj.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="card-warrior p-8 h-full">
                <Eye className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">Our Vision</h3>
                <p className="text-muted-foreground">
                  To make Mardani Khel a nationally recognized martial art, bring it to international stages, and ensure that every generation remembers and carries forward the warrior heritage of the Maratha Empire.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <AnimatedSection>
          <Link to="/join" className="btn-saffron">Join the Akhada</Link>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default About;
