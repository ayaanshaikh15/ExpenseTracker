"use client";

import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-background border-t border-border text-muted-foreground">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="md:col-span-1 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-lg shadow-lg shadow-emerald-500/20">
              💸
            </div>
            <div className="leading-tight">
              <p className="text-foreground font-bold text-sm tracking-tight">Expense Tracker</p>
              <p className="text-emerald-400 text-xs font-medium tracking-widest uppercase">AI Powered</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Smart expense tracking powered by AI. Take control of your finances with real-time insights and intelligent budgeting.
          </p>
          {/* Social Icons */}
          <div className="flex items-center gap-3 mt-1">
            {[
              { label: "Twitter", icon: "𝕏" },
              { label: "GitHub", icon: "⌥" },
              { label: "LinkedIn", icon: "in" },
            ].map((s) => (
              <button
                key={s.label}
                aria-label={s.label}
                className="w-8 h-8 rounded-lg bg-muted hover:bg-accent hover:text-accent-foreground text-muted-foreground text-xs font-bold flex items-center justify-center transition-all duration-200"
              >
                {s.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Product Links */}
        <div className="flex flex-col gap-3">
          <h4 className="text-foreground text-sm font-semibold tracking-wide">Product</h4>
          {["Features", "Pricing", "Dashboard", "Integrations", "Changelog"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Company Links */}
        <div className="flex flex-col gap-3">
          <h4 className="text-foreground text-sm font-semibold tracking-wide">Company</h4>
          {["About Us", "Blog", "Careers", "Contact", "Privacy Policy"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-4">
          <h4 className="text-foreground text-sm font-semibold tracking-wide">Stay Updated</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Get AI-powered finance tips and product updates straight to your inbox.
          </p>
          {subscribed ? (
            <div className="flex items-center gap-2 bg-accent border border-border rounded-lg px-4 py-2.5">
              <span className="text-accent-foreground text-sm font-medium">✓ You're subscribed!</span>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-muted border border-border focus:border-ring focus:outline-none text-foreground text-sm rounded-lg px-4 py-2.5 placeholder:text-muted-foreground transition-colors"
              />
              <button
                onClick={handleSubscribe}
                className="bg-gradient-to-r from-emerald-400 to-blue-500 text-gray-950 font-semibold text-sm px-4 py-2.5 rounded-lg hover:opacity-90 hover:-translate-y-0.5 transition-all duration-150"
              >
                Subscribe
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Expense Tracker AI. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          {["Terms", "Privacy", "Cookies"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}