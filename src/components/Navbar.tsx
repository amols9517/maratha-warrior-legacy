import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn, LayoutDashboard, LogOut, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import logo from "@/assets/logo-original.jpeg";

const navLinks = [
  { path: "/", labelKey: "nav.home" },
  { path: "/about", labelKey: "nav.about" },
  { path: "/gallery", labelKey: "nav.gallery" },
  { path: "/branches", labelKey: "nav.branches" },
  { path: "/events", labelKey: "nav.events" },
  { path: "/library", labelKey: "nav.library" },
  { path: "/join", labelKey: "nav.join" },
  { path: "/contact", labelKey: "nav.contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "mr" : "en");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="section-container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-3">
          <div className="relative flex items-center justify-center rounded-lg overflow-hidden bg-foreground/90 shadow-lg">
            <img src={logo} alt="ShriRam Shivkalin Mardani Khel Akhada" className="h-12 md:h-14 w-auto" />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                location.pathname === link.path
                  ? "text-primary bg-primary/10"
                  : "text-foreground/70 hover:text-primary hover:bg-primary/5"
              }`}
            >
              {t(link.labelKey)}
            </Link>
          ))}

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors rounded-md flex items-center gap-1 border border-border ml-1"
            title={language === "en" ? "मराठीमध्ये बदला" : "Switch to English"}
          >
            <Globe size={14} />
            {language === "en" ? "मराठी" : "EN"}
          </button>

          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin" className={`px-3 py-2 text-sm font-medium transition-colors rounded-md flex items-center gap-1 ${location.pathname === "/admin" ? "text-primary bg-primary/10" : "text-foreground/70 hover:text-primary hover:bg-primary/5"}`}>
                  <LayoutDashboard size={14} /> {t("nav.admin")}
                </Link>
              )}
              <button onClick={signOut} className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors rounded-md flex items-center gap-1">
                <LogOut size={14} /> {t("nav.logout")}
              </button>
            </>
          ) : (
            <Link to="/auth" className={`px-3 py-2 text-sm font-medium transition-colors rounded-md flex items-center gap-1 ${location.pathname === "/auth" ? "text-primary bg-primary/10" : "text-foreground/70 hover:text-primary hover:bg-primary/5"}`}>
              <LogIn size={14} /> {t("nav.login")}
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="p-2 text-foreground/70 hover:text-primary border border-border rounded-md text-xs font-medium flex items-center gap-1"
          >
            <Globe size={14} />
            {language === "en" ? "मराठी" : "EN"}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="section-container py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "text-primary bg-primary/10"
                      : "text-foreground/70 hover:text-primary"
                  }`}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
              {user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-md text-sm font-medium text-foreground/70 hover:text-primary flex items-center gap-2">
                      <LayoutDashboard size={14} /> {t("nav.admin")}
                    </Link>
                  )}
                  <button onClick={() => { signOut(); setIsOpen(false); }} className="px-4 py-3 rounded-md text-sm font-medium text-foreground/70 hover:text-primary text-left flex items-center gap-2">
                    <LogOut size={14} /> {t("nav.logout")}
                  </button>
                </>
              ) : (
                <Link to="/auth" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-md text-sm font-medium text-foreground/70 hover:text-primary flex items-center gap-2">
                  <LogIn size={14} /> {t("nav.login")}
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
