import { Heart } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display font-bold text-lg text-black mb-3">
              Venthogai Foundation
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              A compassionate space where people share their hardships and find
              strength through community support.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-black mb-3 uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/stories", label: "Community Stories" },
                { href: "/volunteer", label: "Become a Volunteer" },
                { href: "/donate", label: "Donate" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-700 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-black mb-3 uppercase tracking-wide">
              Our Mission
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              We believe that no one should face their struggles alone.
              Together, we can build a community of empathy, hope, and healing.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            © {year} Venthogai Foundation. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 flex items-center gap-1">
            Built with{" "}
            <Heart className="w-3 h-3 text-primary" fill="currentColor" /> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
