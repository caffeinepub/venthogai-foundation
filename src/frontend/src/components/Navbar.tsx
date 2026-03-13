import { Button } from "@/components/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import { Heart, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const location = useLocation();

  const isLoggedIn = loginStatus === "success" && !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/stories", label: "Stories" },
    { to: "/volunteer", label: "Volunteer" },
    { to: "/donate", label: "Donate" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          data-ocid="nav.link"
        >
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-warm">
            <Heart
              className="w-4 h-4 text-primary-foreground"
              fill="currentColor"
            />
          </div>
          <span className="font-display font-bold text-lg text-black leading-tight">
            Venthogai
            <span className="text-primary"> Foundation</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              data-ocid={`nav.${link.label.toLowerCase()}.link`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                location.pathname === link.to
                  ? "bg-primary/10 text-primary"
                  : "text-black hover:text-primary hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {isLoggedIn && (
            <Link
              to="/admin"
              data-ocid="nav.admin.link"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                location.pathname === "/admin"
                  ? "bg-primary/10 text-primary"
                  : "text-black hover:text-primary hover:bg-muted"
              }`}
            >
              Admin
            </Link>
          )}
        </nav>

        {/* Auth button */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-600 font-mono">
                {identity.getPrincipal().toString().slice(0, 10)}...
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => clear()}
                data-ocid="nav.logout.button"
              >
                Log Out
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              onClick={() => login()}
              disabled={isLoggingIn}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-ocid="nav.login.button"
            >
              {isLoggingIn ? "Connecting..." : "Login"}
            </Button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          data-ocid="nav.mobile.toggle"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-border bg-background"
          >
            <div className="container px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  data-ocid={`nav.mobile.${link.label.toLowerCase()}.link`}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === link.to
                      ? "bg-primary/10 text-primary"
                      : "text-black hover:text-primary hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {isLoggedIn && (
                <Link
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  data-ocid="nav.mobile.admin.link"
                  className="px-4 py-3 rounded-lg text-sm font-medium text-black hover:text-primary hover:bg-muted"
                >
                  Admin
                </Link>
              )}
              <div className="pt-2 border-t border-border">
                {isLoggedIn ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      clear();
                      setMobileOpen(false);
                    }}
                    className="w-full"
                    data-ocid="nav.mobile.logout.button"
                  >
                    Log Out
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => {
                      login();
                      setMobileOpen(false);
                    }}
                    disabled={isLoggingIn}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    data-ocid="nav.mobile.login.button"
                  >
                    {isLoggingIn ? "Connecting..." : "Login"}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
