import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/hooks/useLanguage";
import { Calendar, MapPin, Clock } from "lucide-react";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const upcomingEvents = [
  {
    titleEn: "Shiv Jayanti Grand Celebration", titleMr: "शिवजयंती महोत्सव",
    date: "February 19, 2026", dateMr: "१९ फेब्रुवारी, २०२६",
    locationEn: "Shivaji Park, Pune", locationMr: "शिवाजी पार्क, पुणे",
    timeEn: "5:00 PM onwards", timeMr: "संध्या. ५:०० पासून",
    descEn: "Annual celebration of Chhatrapati Shivaji Maharaj's birth anniversary with Mardani Khel performances, traditional music, and more.",
    descMr: "छत्रपती शिवाजी महाराजांच्या जयंतीचा वार्षिक उत्सव — मर्दानी खेळ प्रदर्शन, पारंपरिक संगीत आणि बरेच काही.",
  },
  {
    titleEn: "Maharashtra Day Performance", titleMr: "महाराष्ट्र दिन प्रदर्शन",
    date: "May 1, 2026", dateMr: "१ मे, २०२६",
    locationEn: "Town Hall, Mumbai", locationMr: "टाउन हॉल, मुंबई",
    timeEn: "6:00 PM – 9:00 PM", timeMr: "संध्या. ६:०० – ९:००",
    descEn: "Special cultural performance showcasing the warrior heritage of Maharashtra.",
    descMr: "महाराष्ट्राच्या योद्धा वारशाचे प्रदर्शन करणारा विशेष सांस्कृतिक कार्यक्रम.",
  },
  {
    titleEn: "Independence Day Show", titleMr: "स्वातंत्र्य दिन शो",
    date: "August 15, 2026", dateMr: "१५ ऑगस्ट, २०२६",
    locationEn: "Lal Mahal, Pune", locationMr: "लाल महाल, पुणे",
    timeEn: "7:00 AM – 10:00 AM", timeMr: "सकाळी ७:०० – १०:००",
    descEn: "Patriotic demonstration celebrating India's freedom with traditional martial arts.",
    descMr: "पारंपरिक युद्धकलांसह भारताच्या स्वातंत्र्याचा उत्सव साजरा करणारे देशभक्तीपर प्रात्यक्षिक.",
  },
];

const pastEvents = [
  { titleEn: "Republic Day Performance 2025", titleMr: "प्रजासत्ताक दिन प्रदर्शन २०२५", locationEn: "Kolhapur", locationMr: "कोल्हापूर", image: gallery2 },
  { titleEn: "Ganesh Festival Cultural Show 2024", titleMr: "गणेश महोत्सव सांस्कृतिक कार्यक्रम २०२४", locationEn: "Pune", locationMr: "पुणे", image: gallery6 },
];

const Events = () => {
  const { t, language } = useLanguage();
  const isMr = language === "mr";

  return (
    <div className="py-20">
      <div className="section-container">
        <AnimatedSection className="text-center mb-16">
          <h1 className="section-title">{t("events.title")}</h1>
          <div className="divider-ornament" />
          <p className="section-subtitle">{t("events.subtitle")}</p>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-2xl font-display font-bold text-primary mb-6">{t("events.upcoming")}</h2>
        </AnimatedSection>
        <div className="space-y-4 mb-16">
          {upcomingEvents.map((event, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="card-warrior p-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{isMr ? event.titleMr : event.titleEn}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Calendar size={14} className="text-primary" /> {isMr ? event.dateMr : event.date}</span>
                  <span className="flex items-center gap-1"><MapPin size={14} className="text-primary" /> {isMr ? event.locationMr : event.locationEn}</span>
                  <span className="flex items-center gap-1"><Clock size={14} className="text-primary" /> {isMr ? event.timeMr : event.timeEn}</span>
                </div>
                <p className="text-sm text-muted-foreground">{isMr ? event.descMr : event.descEn}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <h2 className="text-2xl font-display font-bold text-primary mb-6">{t("events.past")}</h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {pastEvents.map((event, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="card-warrior overflow-hidden">
                <img src={event.image} alt={isMr ? event.titleMr : event.titleEn} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-display font-semibold text-foreground">{isMr ? event.titleMr : event.titleEn}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin size={12} /> {isMr ? event.locationMr : event.locationEn}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center card-warrior p-10">
          <h2 className="text-2xl font-display font-bold text-gradient-saffron mb-4">{t("events.bookTitle")}</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">{t("events.bookDesc")}</p>
          <Link to="/contact" className="btn-saffron">{t("events.contactBooking")}</Link>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Events;
