import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { Phone, Mail, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all required fields");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
    });
    if (error) {
      toast.error("Failed to send message. Please try again.");
    } else {
      toast.success("Message sent! We will get back to you shortly.");
      setForm({ name: "", email: "", phone: "", message: "" });
    }
    setSubmitting(false);
  };

  return (
    <div className="py-20">
      <div className="section-container">
        <AnimatedSection className="text-center mb-16">
          <h1 className="section-title">Contact Us</h1>
          <div className="divider-ornament" />
          <p className="section-subtitle">Get in touch — we'd love to hear from you</p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12">
          <AnimatedSection>
            <form onSubmit={handleSubmit} className="card-warrior p-6 md:p-8 space-y-5">
              {[
                { label: "Name *", key: "name", type: "text", placeholder: "Your name" },
                { label: "Email *", key: "email", type: "email", placeholder: "your@email.com" },
                { label: "Phone", key: "phone", type: "tel", placeholder: "+91 XXXXX XXXXX" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-md bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Message *</label>
                <textarea
                  rows={4}
                  placeholder="Your message..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-md bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                />
              </div>
              <button type="submit" disabled={submitting} className="btn-saffron w-full disabled:opacity-50">
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              <div className="card-warrior p-6">
                <h3 className="font-display font-bold text-foreground mb-4">Contact Information</h3>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <a href="tel:+919876543210" className="flex items-center gap-3 hover:text-primary transition-colors">
                    <Phone className="w-5 h-5 text-primary" /> +91 98765 43210
                  </a>
                  <a href="mailto:info@mardanikhel.org" className="flex items-center gap-3 hover:text-primary transition-colors">
                    <Mail className="w-5 h-5 text-primary" /> info@mardanikhel.org
                  </a>
                  <p className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" /> ShriRam Shivkalin Mardani Khel Akhada, Malegaon, Maharashtra, India
                  </p>
                </div>
              </div>

              <div className="card-warrior overflow-hidden h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242117.68079314828!2d73.72287834725046!3d18.524598937498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Location Map"
                />
              </div>

              <div className="card-warrior p-6">
                <h3 className="font-display font-bold text-foreground mb-3">Follow Us</h3>
                <div className="flex gap-3">
                  {["Facebook", "Instagram", "YouTube", "Twitter"].map((s) => (
                    <a key={s} href="#" className="px-3 py-2 text-xs font-medium bg-muted rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default Contact;
