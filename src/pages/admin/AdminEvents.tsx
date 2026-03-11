import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Trash2, Edit2, X, Check } from "lucide-react";

const AdminEvents = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", description: "", event_date: "", location: "", event_type: "upcoming" });

  const fetchEvents = async () => {
    const { data } = await supabase.from("events").select("*").order("event_date", { ascending: false });
    setEvents(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleSave = async () => {
    if (!form.title) { toast.error("Title required"); return; }
    const payload = { ...form, event_date: form.event_date || null };

    if (editId) {
      const { error } = await supabase.from("events").update(payload).eq("id", editId);
      if (error) toast.error("Update failed"); else toast.success("Updated!");
    } else {
      const { error } = await supabase.from("events").insert(payload);
      if (error) toast.error("Create failed"); else toast.success("Created!");
    }
    setForm({ title: "", description: "", event_date: "", location: "", event_type: "upcoming" });
    setShowForm(false);
    setEditId(null);
    fetchEvents();
  };

  const handleEdit = (event: any) => {
    setForm({ title: event.title, description: event.description || "", event_date: event.event_date?.slice(0, 16) || "", location: event.location || "", event_type: event.event_type || "upcoming" });
    setEditId(event.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("events").delete().eq("id", id);
    toast.success("Deleted");
    fetchEvents();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-foreground">Events Management</h2>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ title: "", description: "", event_date: "", location: "", event_type: "upcoming" }); }} className="btn-saffron text-sm py-2 px-4">
          {showForm ? <><X size={14} className="inline mr-1" /> Cancel</> : <><Plus size={14} className="inline mr-1" /> Add Event</>}
        </button>
      </div>

      {showForm && (
        <div className="card-warrior p-6 space-y-4">
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Event Title" className="w-full px-4 py-2 bg-muted border border-border rounded-md text-foreground text-sm" />
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" rows={3} className="w-full px-4 py-2 bg-muted border border-border rounded-md text-foreground text-sm" />
          <div className="grid sm:grid-cols-3 gap-4">
            <input type="datetime-local" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} className="px-4 py-2 bg-muted border border-border rounded-md text-foreground text-sm" />
            <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Location" className="px-4 py-2 bg-muted border border-border rounded-md text-foreground text-sm" />
            <select value={form.event_type} onChange={(e) => setForm({ ...form, event_type: e.target.value })} className="px-4 py-2 bg-muted border border-border rounded-md text-foreground text-sm">
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
          </div>
          <button onClick={handleSave} className="btn-saffron text-sm py-2 px-6"><Check size={14} className="inline mr-1" /> Save</button>
        </div>
      )}

      {loading ? <p className="text-muted-foreground">Loading...</p> : (
        <div className="space-y-3">
          {events.map((event) => (
            <div key={event.id} className="card-warrior p-4 flex items-center justify-between">
              <div>
                <h3 className="font-display font-semibold text-foreground">{event.title}</h3>
                <p className="text-xs text-muted-foreground">{event.event_type} • {event.location} • {event.event_date ? new Date(event.event_date).toLocaleDateString() : "No date"}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(event)} className="p-2 text-muted-foreground hover:text-primary"><Edit2 size={16} /></button>
                <button onClick={() => handleDelete(event.id)} className="p-2 text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
