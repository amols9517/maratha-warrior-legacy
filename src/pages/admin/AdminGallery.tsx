import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trash2, Plus, Eye, EyeOff } from "lucide-react";

const AdminGallery = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("training");

  const fetchItems = async () => {
    const { data } = await supabase.from("gallery_media").select("*").order("created_at", { ascending: false });
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const ext = file.name.split(".").pop();
    const path = `gallery/${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("media").upload(path, file);

    if (uploadError) { toast.error("Upload failed"); setUploading(false); return; }

    const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(path);

    const { error } = await supabase.from("gallery_media").insert({
      title: title || file.name,
      media_url: publicUrl,
      media_type: file.type.startsWith("video") ? "video" : "image",
      category,
    });

    if (error) toast.error("Failed to save"); else { toast.success("Uploaded!"); setTitle(""); fetchItems(); }
    setUploading(false);
  };

  const toggleVisibility = async (id: string, current: boolean) => {
    await supabase.from("gallery_media").update({ is_visible: !current }).eq("id", id);
    fetchItems();
  };

  const deleteItem = async (id: string, url: string) => {
    const path = url.split("/media/")[1];
    if (path) await supabase.storage.from("media").remove([path]);
    await supabase.from("gallery_media").delete().eq("id", id);
    toast.success("Deleted");
    fetchItems();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-display font-bold text-foreground">Gallery Management</h2>

      {/* Upload form */}
      <div className="card-warrior p-6 space-y-4">
        <div className="grid sm:grid-cols-3 gap-4">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="px-4 py-2 bg-muted border border-border rounded-md text-foreground text-sm" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-4 py-2 bg-muted border border-border rounded-md text-foreground text-sm">
            <option value="training">Training</option>
            <option value="performance">Performance</option>
            <option value="heritage">Heritage</option>
            <option value="general">General</option>
          </select>
          <label className={`btn-saffron text-center cursor-pointer ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
            <Plus size={16} className="inline mr-1" /> {uploading ? "Uploading..." : "Upload"}
            <input type="file" accept="image/*,video/*" onChange={handleUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* Grid */}
      {loading ? <p className="text-muted-foreground">Loading...</p> : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="card-warrior group relative">
              <div className="aspect-square">
                {item.media_type === "video" ? (
                  <video src={item.media_url} className="w-full h-full object-cover" />
                ) : (
                  <img src={item.media_url} alt={item.title} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="p-2 text-xs text-muted-foreground truncate">{item.title}</div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => toggleVisibility(item.id, item.is_visible)} className="p-1.5 bg-background/80 rounded-md hover:bg-background">
                  {item.is_visible ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
                <button onClick={() => deleteItem(item.id, item.media_url)} className="p-1.5 bg-background/80 rounded-md hover:bg-background text-destructive">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
