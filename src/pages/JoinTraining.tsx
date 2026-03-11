import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { toast } from "sonner";

const branchOptions = ["Pune (HQ)", "Kolhapur", "Satara", "Nashik", "Mumbai"];

const JoinTraining = () => {
  const [form, setForm] = useState({ name: "", age: "", location: "", contact: "", branch: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.age || !form.contact || !form.branch) {
      toast.error("Please fill all required fields");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Application submitted successfully! We will contact you soon.");
      setForm({ name: "", age: "", location: "", contact: "", branch: "" });
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="py-20">
      <div className="section-container max-w-2xl">
        <AnimatedSection className="text-center mb-12">
          <h1 className="section-title">Join Training</h1>
          <div className="divider-ornament" />
          <p className="section-subtitle">Begin your warrior journey — fill out the form below</p>
        </AnimatedSection>

        <AnimatedSection>
          <form onSubmit={handleSubmit} className="card-warrior p-6 md:p-8 space-y-5">
            {[
              { label: "Full Name *", key: "name", type: "text", placeholder: "Enter your full name" },
              { label: "Age *", key: "age", type: "number", placeholder: "Your age" },
              { label: "Location", key: "location", type: "text", placeholder: "City / Village" },
              { label: "Contact Number *", key: "contact", type: "tel", placeholder: "+91 XXXXX XXXXX" },
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
              <label className="block text-sm font-medium text-foreground mb-1.5">Preferred Branch *</label>
              <select
                value={form.branch}
                onChange={(e) => setForm({ ...form, branch: e.target.value })}
                className="w-full px-4 py-2.5 rounded-md bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              >
                <option value="">Select a branch</option>
                {branchOptions.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <button type="submit" disabled={submitting} className="btn-saffron w-full disabled:opacity-50">
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default JoinTraining;
