import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Trash2, Edit2, X, Check } from "lucide-react";

const AdminBranches = () => {
  const [branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", trainer: "", timings: "", contact: "", address: "", map_url: "", is_hq: false });

  const fetchBranches = async () => {
    const { data } = await supabase.from("branches").select("*").order("is_hq", { ascending: false });
    setBranches(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchBranches(); }, []);

  const handleSave = async () => {
    if (!form.name) { toast.error("Name required"); return; }
    if (editId) {
      const { error } = await supabase.from("branches").update(form).eq("id", editId);
      if (error) toast.error("Update failed"); else toast.success("Updated!");
    } else {
      const { error } = await supabase.from("branches").insert(form);
      if (error) toast.error("Create failed"); else toast.success("Created!");
    }
    setForm({ name: "", trainer: "", timings: "", contact: "", address: "", map_url: "", is_hq: false });
    setShowForm(false);
    setEditId(null);
    fetchBranches();
  };

  const handleEdit = (b: any) => {
    setForm({ name: b.name, trainer: b.trainer || "", timings: b.timings || "", contact: b.contact || "", address: b.address || "", map_url: b.map_url || "", is_hq: b.is_hq || false });
    setEditId(b.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("branches").delete().eq("id", id);
    toast.success("Deleted");
    fetchBranches();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-foreground">Branches Management</h2>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ name: "", trainer: "", timings: "", contact: "", address: "", map_url: "", is_hq: false }); }} className="btn-saffron text-sm py-2 px-4">
          {showForm ? <><X size={14} className="inline mr-1" /> Cancel</> : <><Plus size={14} className="inline mr-1" /> Add Branch</>}
        </button>
      </div>

      {showForm && (
        <div className="card-warrior p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Branch Name" className="px-4 py-2 bg-muted border border-border rounded-md text-foreground text-sm" />
            <input value={form.trainer} onChange={(e) => setForm({ ...form, trainer: e.target.value })} placeholder="Trainer Name" className="px-4 py-2 bg-muted border border-border rounded-md text-foreground text-sm" />
            <input value={form.timings} onChange={(e) => setForm({ ...form, timings: e.target.value })} placeholder="Timings" className="px-4 py-2 bg-muted border border-border rounded-md text-foreground text-sm" />
            <input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} placeholder="Contact" className="px-4 py-2 bg-muted border border-border rounded-md text-foreground text-sm" />
          </div>
          <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Address" className="w-full px-4 py-2 bg-muted border border-border rounded-md text-foreground text-sm" />
          <input value={form.map_url} onChange={(e) => setForm({ ...form, map_url: e.target.value })} placeholder="Google Maps Embed URL" className="w-full px-4 py-2 bg-muted border border-border rounded-md text-foreground text-sm" />
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input type="checkbox" checked={form.is_hq} onChange={(e) => setForm({ ...form, is_hq: e.target.checked })} /> Headquarters
          </label>
          <button onClick={handleSave} className="btn-saffron text-sm py-2 px-6"><Check size={14} className="inline mr-1" /> Save</button>
        </div>
      )}

      {loading ? <p className="text-muted-foreground">Loading...</p> : (
        <div className="space-y-3">
          {branches.map((b) => (
            <div key={b.id} className="card-warrior p-4 flex items-center justify-between">
              <div>
                <h3 className="font-display font-semibold text-foreground">{b.name} {b.is_hq && <span className="text-xs text-primary">(HQ)</span>}</h3>
                <p className="text-xs text-muted-foreground">{b.trainer} • {b.timings}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(b)} className="p-2 text-muted-foreground hover:text-primary"><Edit2 size={16} /></button>
                <button onClick={() => handleDelete(b.id)} className="p-2 text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBranches;
