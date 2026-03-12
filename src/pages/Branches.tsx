import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/hooks/useLanguage";
import { MapPin, Phone, Clock, User } from "lucide-react";

const branches = [
  {
    nameEn: "Malegaon Main Branch (HQ)", nameMr: "मालेगाव मुख्य शाखा (मुख्यालय)",
    trainerEn: "Guruji Shriram Patil", trainerMr: "गुरुजी श्रीराम पाटील",
    timingsEn: "Mon–Sat: 6:00 AM – 8:00 AM & 5:00 PM – 7:00 PM", timingsMr: "सोम–शनि: सकाळी ६:०० – ८:०० आणि संध्या. ५:०० – ७:००",
    contact: "+91 98765 43210",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59895.80828717!2d74.49!3d20.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdf28b3b4d5c58f%3A0x8c7d3a5f7e2e1a0!2sMalegaon%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
  },
  {
    nameEn: "Pune Branch", nameMr: "पुणे शाखा",
    trainerEn: "Trainer Rajesh More", trainerMr: "प्रशिक्षक राजेश मोरे",
    timingsEn: "Mon–Sat: 6:30 AM – 8:30 AM", timingsMr: "सोम–शनि: सकाळी ६:३० – ८:३०",
    contact: "+91 98765 43211", mapUrl: "",
  },
  {
    nameEn: "Kolhapur Branch", nameMr: "कोल्हापूर शाखा",
    trainerEn: "Trainer Vikram Jadhav", trainerMr: "प्रशिक्षक विक्रम जाधव",
    timingsEn: "Mon–Fri: 5:30 PM – 7:30 PM", timingsMr: "सोम–शुक्र: संध्या. ५:३० – ७:३०",
    contact: "+91 98765 43212", mapUrl: "",
  },
  {
    nameEn: "Nashik Branch", nameMr: "नाशिक शाखा",
    trainerEn: "Trainer Anil Shinde", trainerMr: "प्रशिक्षक अनिल शिंदे",
    timingsEn: "Tue–Sun: 6:00 AM – 8:00 AM", timingsMr: "मंगळ–रवि: सकाळी ६:०० – ८:००",
    contact: "+91 98765 43213", mapUrl: "",
  },
  {
    nameEn: "Mumbai Branch", nameMr: "मुंबई शाखा",
    trainerEn: "Trainer Suresh Pawar", trainerMr: "प्रशिक्षक सुरेश पवार",
    timingsEn: "Mon–Sat: 7:00 AM – 9:00 AM & 6:00 PM – 8:00 PM", timingsMr: "सोम–शनि: सकाळी ७:०० – ९:०० आणि संध्या. ६:०० – ८:००",
    contact: "+91 98765 43214", mapUrl: "",
  },
];

const Branches = () => {
  const { t, language } = useLanguage();

  return (
    <div className="py-20">
      <div className="section-container">
        <AnimatedSection className="text-center mb-16">
          <h1 className="section-title">{t("branches.title")}</h1>
          <div className="divider-ornament" />
          <p className="section-subtitle">{t("branches.subtitle")}</p>
        </AnimatedSection>

        <div className="space-y-8">
          {branches.map((branch, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="card-warrior p-6 md:p-8">
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-display text-xl font-bold text-primary flex items-center gap-2">
                      <MapPin className="w-5 h-5 shrink-0" />
                      {language === "mr" ? branch.nameMr : branch.nameEn}
                    </h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p className="flex items-center gap-2">
                        <User size={14} className="text-primary shrink-0" /> {language === "mr" ? branch.trainerMr : branch.trainerEn}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock size={14} className="text-primary shrink-0" /> {language === "mr" ? branch.timingsMr : branch.timingsEn}
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone size={14} className="text-primary shrink-0" />
                        <a href={`tel:${branch.contact.replace(/\s/g, "")}`} className="hover:text-primary transition-colors">{branch.contact}</a>
                      </p>
                    </div>
                  </div>
                  {branch.mapUrl ? (
                    <div className="rounded-lg overflow-hidden h-48 lg:h-auto">
                      <iframe src={branch.mapUrl} width="100%" height="100%" style={{ border: 0, minHeight: 200 }} allowFullScreen loading="lazy" title={`Map`} />
                    </div>
                  ) : (
                    <div className="bg-muted rounded-lg flex items-center justify-center h-48 lg:h-auto">
                      <p className="text-muted-foreground text-sm">{t("branches.mapSoon")}</p>
                    </div>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Branches;
