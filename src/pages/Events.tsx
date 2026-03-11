import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { Calendar, MapPin, Clock } from "lucide-react";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const upcomingEvents = [
  {
    title: "Shiv Jayanti Grand Celebration",
    date: "February 19, 2026",
    location: "Shivaji Park, Pune",
    time: "5:00 PM onwards",
    desc: "Annual celebration of Chhatrapati Shivaji Maharaj's birth anniversary with Mardani Khel performances, traditional music, and more.",
  },
  {
    title: "Maharashtra Day Performance",
    date: "May 1, 2026",
    location: "Town Hall, Mumbai",
    time: "6:00 PM – 9:00 PM",
    desc: "Special cultural performance showcasing the warrior heritage of Maharashtra.",
  },
  {
    title: "Independence Day Show",
    date: "August 15, 2026",
    location: "Lal Mahal, Pune",
    time: "7:00 AM – 10:00 AM",
    desc: "Patriotic demonstration celebrating India's freedom with traditional martial arts.",
  },
];

const pastEvents = [
  { title: "Republic Day Performance 2025", location: "Kolhapur", image: gallery2 },
  { title: "Ganesh Festival Cultural Show 2024", location: "Pune", image: gallery6 },
];

const Events = () => {
  return (
    <div className="py-20">
      <div className="section-container">
        <AnimatedSection className="text-center mb-16">
          <h1 className="section-title">Events & Shows</h1>
          <div className="divider-ornament" />
          <p className="section-subtitle">Witness the power and grace of Mardani Khel</p>
        </AnimatedSection>

        {/* Upcoming */}
        <AnimatedSection>
          <h2 className="text-2xl font-display font-bold text-primary mb-6">Upcoming Events</h2>
        </AnimatedSection>
        <div className="space-y-4 mb-16">
          {upcomingEvents.map((event, i) => (
            <AnimatedSection key={event.title} delay={i * 0.1}>
              <div className="card-warrior p-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{event.title}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Calendar size={14} className="text-primary" /> {event.date}</span>
                  <span className="flex items-center gap-1"><MapPin size={14} className="text-primary" /> {event.location}</span>
                  <span className="flex items-center gap-1"><Clock size={14} className="text-primary" /> {event.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">{event.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Past Events */}
        <AnimatedSection>
          <h2 className="text-2xl font-display font-bold text-primary mb-6">Past Performances</h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {pastEvents.map((event, i) => (
            <AnimatedSection key={event.title} delay={i * 0.1}>
              <div className="card-warrior overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-display font-semibold text-foreground">{event.title}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin size={12} /> {event.location}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Book a Show */}
        <AnimatedSection className="text-center card-warrior p-10">
          <h2 className="text-2xl font-display font-bold text-gradient-saffron mb-4">Book Our Team for a Show</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Want to add an unforgettable cultural performance to your event? Our warriors perform at festivals, corporate events, school functions, and national celebrations.
          </p>
          <Link to="/contact" className="btn-saffron">Contact for Booking</Link>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Events;
