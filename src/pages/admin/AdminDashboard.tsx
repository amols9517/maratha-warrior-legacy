import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { LayoutDashboard, Image, Calendar, MapPin, MessageSquare, Users, FileText, LogOut } from "lucide-react";
import AdminGallery from "./AdminGallery";
import AdminEvents from "./AdminEvents";
import AdminBranches from "./AdminBranches";
import AdminTrainingRequests from "./AdminTrainingRequests";
import AdminContactMessages from "./AdminContactMessages";
import AdminContent from "./AdminContent";

const tabs = [
  { id: "gallery", label: "Gallery", icon: Image },
  { id: "events", label: "Events", icon: Calendar },
  { id: "branches", label: "Branches", icon: MapPin },
  { id: "training", label: "Training Requests", icon: Users },
  { id: "messages", label: "Contact Messages", icon: MessageSquare },
  { id: "content", label: "Site Content", icon: FileText },
];

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("gallery");

  if (loading) return <div className="min-h-[70vh] flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>;
  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-display font-bold text-primary mb-2">Access Denied</h1>
        <p className="text-muted-foreground">You don't have admin privileges.</p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "gallery": return <AdminGallery />;
      case "events": return <AdminEvents />;
      case "branches": return <AdminBranches />;
      case "training": return <AdminTrainingRequests />;
      case "messages": return <AdminContactMessages />;
      case "content": return <AdminContent />;
      default: return null;
    }
  };

  return (
    <div className="py-8">
      <div className="section-container">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-display font-bold text-gradient-saffron">Admin Dashboard</h1>
          </div>
          <button onClick={signOut} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <LogOut size={16} /> Logout
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-56 flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
