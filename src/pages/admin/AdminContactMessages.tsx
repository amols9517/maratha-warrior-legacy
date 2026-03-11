import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Mail, MailOpen } from "lucide-react";

const AdminContactMessages = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
    setMessages(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchMessages(); }, []);

  const toggleRead = async (id: string, current: boolean) => {
    await supabase.from("contact_messages").update({ is_read: !current }).eq("id", id);
    fetchMessages();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-display font-bold text-foreground">Contact Messages</h2>
      {loading ? <p className="text-muted-foreground">Loading...</p> : messages.length === 0 ? <p className="text-muted-foreground">No messages yet.</p> : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={`card-warrior p-4 ${!m.is_read ? "border-primary/30" : ""}`}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{m.name}</h3>
                  <p className="text-xs text-muted-foreground">{m.email} • {m.phone}</p>
                  <p className="text-sm text-foreground/80 mt-2">{m.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{new Date(m.created_at).toLocaleString()}</p>
                </div>
                <button onClick={() => toggleRead(m.id, m.is_read)} className="p-2 text-muted-foreground hover:text-primary">
                  {m.is_read ? <MailOpen size={16} /> : <Mail size={16} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminContactMessages;
