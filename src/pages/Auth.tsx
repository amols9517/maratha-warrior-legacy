import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { useEffect } from "react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Logged in successfully!");
        navigate("/");
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { data: { full_name: fullName }, emailRedirectTo: window.location.origin },
      });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Account created successfully! You are now logged in.");
        navigate("/");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="card-warrior p-8">
          <h1 className="text-2xl font-display font-bold text-gradient-saffron text-center mb-6">
            {isLogin ? t("auth.login") : t("auth.createAccount")}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">{t("auth.fullName")}</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required={!isLogin}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder={t("join.namePlaceholder")} />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1">{t("auth.email")}</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full px-4 py-3 bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1">{t("auth.password")}</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6}
                className="w-full px-4 py-3 bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Min 6 characters" />
            </div>
            <button type="submit" disabled={loading} className="w-full btn-saffron disabled:opacity-50">
              {loading ? t("auth.pleaseWait") : isLogin ? t("auth.login") : t("auth.signUp")}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isLogin ? t("auth.noAccount") : t("auth.haveAccount")}{" "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline font-medium">
              {isLogin ? t("auth.signUp") : t("auth.login")}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
