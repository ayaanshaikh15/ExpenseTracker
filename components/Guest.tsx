// app/page.tsx — Guest Home Page (shown when user is NOT logged in)

import Link from "next/link";

export default function GuestHomePage() {
  const features = [
    { icon: "🤖", title: "AI Expense Analysis", desc: "Let AI categorize and analyze your spending patterns automatically." },
    { icon: "📊", title: "Real-time Dashboard", desc: "See where every rupee goes with beautiful live charts." },
    { icon: "🎯", title: "Smart Budget Goals", desc: "Set goals and get AI nudges to keep you on track." },
    { icon: "🔔", title: "Overspend Alerts", desc: "Get notified before you blow your budget — not after." },
    { icon: "🔒", title: "Bank-Level Security", desc: "256-bit encryption keeps your financial data safe." },
    { icon: "📁", title: "Export Anytime", desc: "Download your reports in PDF or CSV with one click." },
  ];

  const steps = [
    { step: "01", title: "Create your account", desc: "Sign up for free in under 30 seconds. No credit card required." },
    { step: "02", title: "Add your expenses", desc: "Log expenses manually or connect your bank for auto-sync." },
    { step: "03", title: "Let AI do the work", desc: "Get instant insights, trends, and savings suggestions." },
  ];

  const testimonials = [
    { name: "Rahul M.", role: "Freelancer", text: "I saved ₹15,000 in my first month just by seeing where my money was going!", avatar: "👨‍💻" },
    { name: "Sneha P.", role: "Student", text: "Finally a budgeting app that actually makes sense. The AI suggestions are 🔥", avatar: "👩‍🎓" },
    { name: "Karan T.", role: "Startup Founder", text: "We use this to track company expenses. It's replaced 3 other tools for us.", avatar: "👨‍💼" },
  ];

  return (
    <main className="bg-background text-foreground min-h-screen overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 flex flex-col items-center text-center gap-7">
        {/* Background glow blobs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute top-32 left-1/4 w-[300px] h-[300px] bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />

        {/* Badge */}
        <span className="relative inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          AI-Powered • Free to Start
        </span>

        {/* Headline */}
        <h1 className="relative text-5xl md:text-7xl font-extrabold text-foreground leading-[1.08] tracking-tight max-w-4xl">
          Stop guessing{" "}
          <br className="hidden md:block" />
          where your{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            money goes
          </span>
        </h1>

        {/* Subtext */}
        <p className="relative text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed">
          Expense Tracker AI helps you manage your budget, analyze spending habits, and reach your financial goals — all powered by artificial intelligence. </p>

        {/* CTAs */}
        <div className="relative flex flex-col sm:flex-row items-center gap-3 mt-2">
          <Link
            href="/sign-up"
            className="bg-gradient-to-r from-emerald-400 to-blue-500 text-gray-950 font-bold px-8 py-3.5 rounded-xl hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 shadow-xl shadow-emerald-500/20 text-base"
          >
            Get Started — It's Free
          </Link>
          <Link
            href="/sign-in"
            className="border border-border text-foreground font-medium px-8 py-3.5 rounded-xl hover:bg-muted transition-all duration-150 text-base"
          >
            Sign In →
          </Link>
        </div>

        {/* Social proof */}
        <div className="relative flex items-center gap-3 mt-1">
          <div className="flex -space-x-2">
            {["👩‍💼","👨‍💻","👩‍🎓","👨‍🍳","👩‍💻"].map((emoji, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-sm">
                {emoji}
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm">
            <span className="text-foreground font-semibold">50,000+</span> people already saving smarter
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "50K+", label: "Active Users" },
            { value: "₹2Cr+", label: "Expenses Tracked" },
            { value: "99.9%", label: "Uptime" },
            { value: "4.9 ★", label: "User Rating" },
          ].map((s) => (
            <div key={s.label} className="bg-muted border border-border rounded-2xl p-6 flex flex-col items-center gap-1 text-center hover:border-emerald-500/30 transition-all">
              <span className="text-3xl font-extrabold text-foreground">{s.value}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-widest">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
              master your money
            </span>
          </h2>
          <p className="text-muted-foreground mt-3 text-base max-w-xl mx-auto">
            Powerful features that make tracking expenses feel effortless.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-muted border border-border rounded-2xl p-6 flex flex-col gap-3 hover:border-emerald-500/40 hover:bg-accent transition-all duration-200 group cursor-default"
            >
              <div className="w-11 h-11 rounded-xl bg-background border border-border flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-200">
                {f.icon}
              </div>
              <h3 className="text-foreground font-semibold text-base">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Up and running in{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
              3 simple steps
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px bg-gradient-to-r from-emerald-500/30 via-blue-500/30 to-emerald-500/30" />

          {steps.map((s) => (
            <div key={s.step} className="flex flex-col items-center text-center gap-4 relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 flex items-center justify-center z-10">
                <span className="text-2xl font-extrabold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  {s.step}
                </span>
              </div>
              <h3 className="text-foreground font-semibold text-base">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Loved by{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
              thousands
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-muted border border-border rounded-2xl p-6 flex flex-col gap-4 hover:border-emerald-500/30 transition-all duration-200"
            >
              <p className="text-muted-foreground text-sm leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-xl">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-foreground font-semibold text-sm">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="relative bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-3xl px-8 py-16 flex flex-col items-center text-center gap-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 blur-2xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />

          <h2 className="relative text-3xl md:text-5xl font-extrabold text-foreground tracking-tight max-w-2xl leading-tight">
            Your finances deserve better — start today
          </h2>
          <p className="relative text-muted-foreground text-lg max-w-md">
            Join 50,000+ users who have taken control of their money with AI.
          </p>
          <div className="relative flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/sign-up"
              className="bg-gradient-to-r from-emerald-400 to-blue-500 text-gray-950 font-bold px-9 py-3.5 rounded-xl hover:opacity-90 hover:-translate-y-0.5 transition-all duration-150 shadow-xl shadow-emerald-500/20 text-base"
            >
              Create Free Account
            </Link>
            <p className="text-muted-foreground text-sm">No credit card · Cancel anytime</p>
          </div>
        </div>
      </section>

    </main>
  );
}