import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn, LayoutDashboard, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo.png";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About Us" },
  { path: "/gallery", label: "Gallery" },
  { path: "/branches", label: "Branches" },
  { path: "/events", label: "Events" },
  { path: "/library", label: "Library" },
  { path: "/join", label: "Join Training" },
  { path: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="section-container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-3">
          <div className="relative flex items-center justify-center p-1.5 rounded-lg bg-gradient-to-br from-primary/20 to-gold/10 border border-primary/30 shadow-[0_0_15px_hsl(var(--saffron)/0.3)]">
            <img src={logo} alt="ShriRam Shivkalin Mardani Khel Akhada" className="h-10 md:h-12 w-auto drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]" />
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
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin" className={`px-3 py-2 text-sm font-medium transition-colors rounded-md flex items-center gap-1 ${location.pathname === "/admin" ? "text-primary bg-primary/10" : "text-foreground/70 hover:text-primary hover:bg-primary/5"}`}>
                  <LayoutDashboard size={14} /> Admin
                </Link>
              )}
              <button onClick={signOut} className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors rounded-md flex items-center gap-1">
                <LogOut size={14} /> Logout
              </button>
            </>
          ) : (
            <Link to="/auth" className={`px-3 py-2 text-sm font-medium transition-colors rounded-md flex items-center gap-1 ${location.pathname === "/auth" ? "text-primary bg-primary/10" : "text-foreground/70 hover:text-primary hover:bg-primary/5"}`}>
              <LogIn size={14} /> Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
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
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-md text-sm font-medium text-foreground/70 hover:text-primary flex items-center gap-2">
                      <LayoutDashboard size={14} /> Admin Dashboard
                    </Link>
                  )}
                  <button onClick={() => { signOut(); setIsOpen(false); }} className="px-4 py-3 rounded-md text-sm font-medium text-foreground/70 hover:text-primary text-left flex items-center gap-2">
                    <LogOut size={14} /> Logout
                  </button>
                </>
              ) : (
                <Link to="/auth" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-md text-sm font-medium text-foreground/70 hover:text-primary flex items-center gap-2">
                  <LogIn size={14} /> Login
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
