// app/about/page.tsx

export default function AboutPage() {
  const team = [
    { name: "Aryan Shah", role: "CEO & Co-Founder", emoji: "👨‍💼" },
    { name: "Priya Mehta", role: "CTO & AI Lead", emoji: "👩‍💻" },
    { name: "Rohan Verma", role: "Head of Design", emoji: "🎨" },
    { name: "Neha Kapoor", role: "Product Manager", emoji: "📋" },
  ];

  const values = [
    { icon: "💡", title: "Innovation First", desc: "We use cutting-edge AI to solve real financial problems for everyday people." },
    { icon: "🤝", title: "User Trust", desc: "Transparency and security are at the heart of everything we build." },
    { icon: "🌍", title: "Accessible to All", desc: "Financial tools shouldn't be a luxury. We make them simple and free to use." },
    { icon: "📈", title: "Continuous Growth", desc: "We constantly improve based on user feedback and real-world usage data." },
  ];

  return (
    <main className="bg-background text-foreground min-h-screen">

      {/* Hero */}
      <section className="relative max-w-4xl mx-auto px-6 pt-24 pb-16 text-center flex flex-col items-center gap-5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
        <span className="text-xs font-semibold tracking-widest uppercase text-blue-400 border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 rounded-full">
          Our Story
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
          Built for people who want{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            financial clarity
          </span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
          Expense Tracker AI was born out of frustration with complicated budgeting apps. We believed managing money should be effortless, intelligent, and even enjoyable.
        </p>
      </section>

      {/* Mission */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="bg-muted border border-border rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
          <div className="text-6xl">🎯</div>
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed text-base">
              To empower individuals and families with AI-driven financial tools that make budgeting, saving, and spending decisions smarter — without needing a finance degree. We believe everyone deserves access to intelligent money management.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10 tracking-tight">
          What we stand for
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-muted border border-border rounded-2xl p-6 flex flex-col gap-3 hover:border-emerald-500/40 hover:bg-accent transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-200">
                {v.icon}
              </div>
              <h3 className="text-foreground font-semibold">{v.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10 tracking-tight">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {team.map((t) => (
            <div
              key={t.name}
              className="bg-muted border border-border rounded-2xl p-6 flex flex-col items-center gap-3 text-center hover:border-emerald-500/40 transition-all duration-200"
            >
              <div className="w-16 h-16 rounded-2xl bg-background border border-border flex items-center justify-center text-3xl">
                {t.emoji}
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm">{t.name}</p>
                <p className="text-muted-foreground text-xs mt-0.5">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}