import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logoEmblem} alt="Emblem" className="h-10 w-auto" />
              <div>
                <p className="font-display text-sm font-bold text-primary">ShriRam Shivkalin</p>
                <p className="font-display text-xs text-foreground/80">Mardani Khel Akhada</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Preserving the ancient warrior traditions of Chhatrapati Shivaji Maharaj through Mardani Khel martial arts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-primary mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { path: "/about", label: "About Us" },
                { path: "/gallery", label: "Gallery" },
                { path: "/branches", label: "Branches" },
                { path: "/events", label: "Events & Shows" },
                { path: "/join", label: "Join Training" },
              ].map((link) => (
                <Link key={link.path} to={link.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-primary mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <a href="tel:+919876543210" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone size={14} /> +91 98765 43210
              </a>
              <a href="mailto:info@mardanikhel.org" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail size={14} /> info@mardanikhel.org
              </a>
              <p className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin size={14} className="mt-0.5 shrink-0" /> Pune, Maharashtra, India
              </p>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-semibold text-primary mb-4">Follow Us</h4>
            <div className="flex gap-3">
              {["Facebook", "Instagram", "YouTube"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="px-3 py-2 text-xs font-medium bg-muted rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ShriRam Shivkalin Mardani Khel Akhada. All rights reserved.
          </p>
          <p className="text-xs text-primary/60 mt-1 font-display">
            जय शिवराय! | Jai Shivray!
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
