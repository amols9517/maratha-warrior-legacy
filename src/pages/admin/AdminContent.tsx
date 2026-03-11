import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Save, Trash2 } from "lucide-react";

const AdminContent = () => {
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ section: "", key: "", value: "" });

  const fetchContent = async () => {
    const { data } = await supabase.from("site_content").select("*").order("section");
    setContent(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchContent(); }, []);

  const handleAdd = async () => {
    if (!form.section || !form.key) { toast.error("Section and key required"); return; }
    const { error } = await supabase.from("site_content").upsert({ section: form.section, key: form.key, value: form.value }, { onConflict: "section,key" });
    if (error) toast.error("Failed"); else { toast.success("Saved!"); setForm({ section: "", key: "", value: "" }); fetchContent(); }
  };

  const handleDelete = async (id: string) => {
    await supabase.from("site_content").delete().eq("id", id);
    toast.success("Deleted");
    fetchContent();
  };

  const handleUpdate = async (id: string, value: string) => {
    await supabase.from("site_content").update({ value }).eq("id", id);
    toast.success("Updated");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-display font-bold text-foreground">Site Content</h2>

      <div className="card-warrior p-6 space-y-4">
        <div className="grid sm:grid-cols-3 gap-4">
          <input value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })} placeholder="Section (e.g. home)" className="px-4 py-2 bg-muted border border-border rounded-md text-foreground text-sm" />
          <input value={form.key} onChange={(e) => setForm({ ...form, key: e.target.value })} placeholder="Key (e.g. tagline)" className="px-4 py-2 bg-muted border border-border rounded-md text-foreground text-sm" />
          <button onClick={handleAdd} className="btn-saffron text-sm"><Plus size={14} className="inline mr-1" /> Add</button>
        </div>
        <textarea value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} placeholder="Content value" rows={2} className="w-full px-4 py-2 bg-muted border border-border rounded-md text-foreground text-sm" />
      </div>

      {loading ? <p className="text-muted-foreground">Loading...</p> : (
        <div className="space-y-3">
          {content.map((c) => (
            <div key={c.id} className="card-warrior p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">{c.section}</span>
                <span className="text-xs text-muted-foreground">{c.key}</span>
                <button onClick={() => handleDelete(c.id)} className="ml-auto p-1 text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>
              </div>
              <div className="flex gap-2">
                <textarea defaultValue={c.value} onBlur={(e) => handleUpdate(c.id, e.target.value)} rows={2} className="flex-1 px-3 py-2 bg-muted border border-border rounded-md text-foreground text-sm" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminContent;
