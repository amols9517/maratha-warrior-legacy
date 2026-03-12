import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/hooks/useLanguage";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const branchOptions = ["Malegaon (HQ)", "Pune", "Kolhapur", "Nashik", "Mumbai"];

const JoinTraining = () => {
  const [form, setForm] = useState({ name: "", age: "", location: "", contact: "", branch: "" });
  const [submitting, setSubmitting] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.age || !form.contact || !form.branch) {
      toast.error(t("join.fillRequired"));
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("training_requests").insert({
      name: form.name, age: parseInt(form.age), location: form.location, contact: form.contact, preferred_branch: form.branch,
    });
    if (error) {
      toast.error(t("join.error"));
    } else {
      toast.success(t("join.success"));
      setForm({ name: "", age: "", location: "", contact: "", branch: "" });
    }
    setSubmitting(false);
  };

  return (
    <div className="py-20">
      <div className="section-container max-w-2xl">
        <AnimatedSection className="text-center mb-12">
          <h1 className="section-title">{t("join.title")}</h1>
          <div className="divider-ornament" />
          <p className="section-subtitle">{t("join.subtitle")}</p>
        </AnimatedSection>

        <AnimatedSection>
          <form onSubmit={handleSubmit} className="card-warrior p-6 md:p-8 space-y-5">
            {[
              { label: t("join.fullName"), key: "name", type: "text", placeholder: t("join.namePlaceholder") },
              { label: t("join.age"), key: "age", type: "number", placeholder: t("join.agePlaceholder") },
              { label: t("join.location"), key: "location", type: "text", placeholder: t("join.locationPlaceholder") },
              { label: t("join.contact"), key: "contact", type: "tel", placeholder: t("join.contactPlaceholder") },
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
              <label className="block text-sm font-medium text-foreground mb-1.5">{t("join.branch")}</label>
              <select
                value={form.branch}
                onChange={(e) => setForm({ ...form, branch: e.target.value })}
                className="w-full px-4 py-2.5 rounded-md bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              >
                <option value="">{t("join.selectBranch")}</option>
                {branchOptions.map((b) => (<option key={b} value={b}>{b}</option>))}
              </select>
            </div>
            <button type="submit" disabled={submitting} className="btn-saffron w-full disabled:opacity-50">
              {submitting ? t("join.submitting") : t("join.submit")}
            </button>
          </form>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default JoinTraining;
