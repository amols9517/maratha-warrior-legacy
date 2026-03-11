import AnimatedSection from "@/components/AnimatedSection";
import { MapPin, Phone, Clock, User } from "lucide-react";

const branches = [
  {
    name: "Pune Main Branch (HQ)",
    trainer: "Guruji Shriram Patil",
    timings: "Mon–Sat: 6:00 AM – 8:00 AM & 5:00 PM – 7:00 PM",
    contact: "+91 98765 43210",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242117.68079314828!2d73.72287834725046!3d18.524598937498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
  },
  {
    name: "Kolhapur Branch",
    trainer: "Trainer Rajesh More",
    timings: "Mon–Sat: 6:30 AM – 8:30 AM",
    contact: "+91 98765 43211",
    mapUrl: "",
  },
  {
    name: "Satara Branch",
    trainer: "Trainer Vikram Jadhav",
    timings: "Mon–Fri: 5:30 PM – 7:30 PM",
    contact: "+91 98765 43212",
    mapUrl: "",
  },
  {
    name: "Nashik Branch",
    trainer: "Trainer Anil Shinde",
    timings: "Tue–Sun: 6:00 AM – 8:00 AM",
    contact: "+91 98765 43213",
    mapUrl: "",
  },
  {
    name: "Mumbai Branch",
    trainer: "Trainer Suresh Pawar",
    timings: "Mon–Sat: 7:00 AM – 9:00 AM & 6:00 PM – 8:00 PM",
    contact: "+91 98765 43214",
    mapUrl: "",
  },
];

const Branches = () => {
  return (
    <div className="py-20">
      <div className="section-container">
        <AnimatedSection className="text-center mb-16">
          <h1 className="section-title">Our Branches</h1>
          <div className="divider-ornament" />
          <p className="section-subtitle">Training centers across Maharashtra — find one near you</p>
        </AnimatedSection>

        <div className="space-y-8">
          {branches.map((branch, i) => (
            <AnimatedSection key={branch.name} delay={i * 0.1}>
              <div className="card-warrior p-6 md:p-8">
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-display text-xl font-bold text-primary flex items-center gap-2">
                      <MapPin className="w-5 h-5 shrink-0" />
                      {branch.name}
                    </h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p className="flex items-center gap-2">
                        <User size={14} className="text-primary shrink-0" /> {branch.trainer}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock size={14} className="text-primary shrink-0" /> {branch.timings}
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone size={14} className="text-primary shrink-0" />
                        <a href={`tel:${branch.contact.replace(/\s/g, "")}`} className="hover:text-primary transition-colors">
                          {branch.contact}
                        </a>
                      </p>
                    </div>
                  </div>
                  {branch.mapUrl ? (
                    <div className="rounded-lg overflow-hidden h-48 lg:h-auto">
                      <iframe
                        src={branch.mapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0, minHeight: 200 }}
                        allowFullScreen
                        loading="lazy"
                        title={`Map of ${branch.name}`}
                      />
                    </div>
                  ) : (
                    <div className="bg-muted rounded-lg flex items-center justify-center h-48 lg:h-auto">
                      <p className="text-muted-foreground text-sm">Map coming soon</p>
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
