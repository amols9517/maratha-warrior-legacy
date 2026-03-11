import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminTrainingRequests = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    const { data } = await supabase.from("training_requests").select("*").order("created_at", { ascending: false });
    setRequests(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchRequests(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("training_requests").update({ status }).eq("id", id);
    toast.success(`Marked as ${status}`);
    fetchRequests();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-display font-bold text-foreground">Training Requests</h2>
      {loading ? <p className="text-muted-foreground">Loading...</p> : requests.length === 0 ? <p className="text-muted-foreground">No requests yet.</p> : (
        <div className="space-y-3">
          {requests.map((r) => (
            <div key={r.id} className="card-warrior p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{r.name}</h3>
                  <p className="text-xs text-muted-foreground">Age: {r.age} • {r.location} • {r.contact}</p>
                  <p className="text-xs text-muted-foreground">Branch: {r.preferred_branch}</p>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(r.created_at).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <select value={r.status} onChange={(e) => updateStatus(r.id, e.target.value)} className="px-3 py-1 bg-muted border border-border rounded text-xs text-foreground">
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    <option value="enrolled">Enrolled</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminTrainingRequests;
