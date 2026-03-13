import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Trash2, Eye, EyeOff, Save } from "lucide-react";

const categories = ["History", "Martial Arts", "Biography", "Historical Novel", "General"];

const AdminLibrary = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title_en: "", title_mr: "", author: "", category: "General",
    description_en: "", description_mr: "", external_link: "",
  });

  const fetchBooks = async () => {
    const { data } = await supabase.from("library_books").select("*").order("sort_order");
    setBooks(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleAdd = async () => {
    if (!form.title_en) { toast.error("English title is required"); return; }
    const { error } = await supabase.from("library_books").insert(form);
    if (error) toast.error("Failed to add"); else {
      toast.success("Book added!");
      setForm({ title_en: "", title_mr: "", author: "", category: "General", description_en: "", description_mr: "", external_link: "" });
      fetchBooks();
    }
  };

  const handleUpdate = async (id: string, updates: Record<string, any>) => {
    const { error } = await supabase.from("library_books").update(updates).eq("id", id);
    if (error) toast.error("Update failed"); else toast.success("Updated!");
  };

  const toggleVisibility = async (id: string, current: boolean) => {
    await supabase.from("library_books").update({ is_visible: !current }).eq("id", id);
    fetchBooks();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("library_books").delete().eq("id", id);
    toast.success("Deleted");
    fetchBooks();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-display font-bold text-foreground">Library Management</h2>

      <div className="card-warrior p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <input value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })} placeholder="Title (English) *" className="px-4 py-2 bg-muted border border-border rounded-md text-foreground text-sm" />
          <input value={form.title_mr} onChange={(e) => setForm({ ...form, title_mr: e.target.value })} placeholder="Title (Marathi)" className="px-4 py-2 bg-muted border border-border rounded-md text-foreground text-sm" />
          <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} placeholder="Author" className="px-4 py-2 bg-muted border border-border rounded-md text-foreground text-sm" />
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="px-4 py-2 bg-muted border border-border rounded-md text-foreground text-sm">
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <textarea value={form.description_en} onChange={(e) => setForm({ ...form, description_en: e.target.value })} placeholder="Description (English)" rows={2} className="w-full px-4 py-2 bg-muted border border-border rounded-md text-foreground text-sm" />
        <textarea value={form.description_mr} onChange={(e) => setForm({ ...form, description_mr: e.target.value })} placeholder="Description (Marathi)" rows={2} className="w-full px-4 py-2 bg-muted border border-border rounded-md text-foreground text-sm" />
        <input value={form.external_link} onChange={(e) => setForm({ ...form, external_link: e.target.value })} placeholder="External link (optional)" className="w-full px-4 py-2 bg-muted border border-border rounded-md text-foreground text-sm" />
        <button onClick={handleAdd} className="btn-saffron text-sm"><Plus size={14} className="inline mr-1" /> Add Book</button>
      </div>

      {loading ? <p className="text-muted-foreground">Loading...</p> : (
        <div className="space-y-3">
          {books.map((book) => (
            <div key={book.id} className="card-warrior p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">{book.category}</span>
                    <span className="text-xs text-muted-foreground">{book.author}</span>
                  </div>
                  <input defaultValue={book.title_en} onBlur={(e) => handleUpdate(book.id, { title_en: e.target.value })} className="w-full px-3 py-1.5 bg-muted border border-border rounded-md text-foreground text-sm" placeholder="Title EN" />
                  <input defaultValue={book.title_mr} onBlur={(e) => handleUpdate(book.id, { title_mr: e.target.value })} className="w-full px-3 py-1.5 bg-muted border border-border rounded-md text-foreground text-sm" placeholder="Title MR" />
                  <textarea defaultValue={book.description_en} onBlur={(e) => handleUpdate(book.id, { description_en: e.target.value })} rows={2} className="w-full px-3 py-1.5 bg-muted border border-border rounded-md text-foreground text-sm" placeholder="Desc EN" />
                  <textarea defaultValue={book.description_mr} onBlur={(e) => handleUpdate(book.id, { description_mr: e.target.value })} rows={2} className="w-full px-3 py-1.5 bg-muted border border-border rounded-md text-foreground text-sm" placeholder="Desc MR" />
                </div>
                <div className="flex flex-col gap-1">
                  <button onClick={() => toggleVisibility(book.id, book.is_visible)} className="p-1.5 text-muted-foreground hover:text-primary">
                    {book.is_visible ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <button onClick={() => handleDelete(book.id)} className="p-1.5 text-muted-foreground hover:text-destructive">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminLibrary;
