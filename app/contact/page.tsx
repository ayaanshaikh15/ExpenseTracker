"use client";
// app/contact/page.tsx

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSubmitted(true);
    }
  };

  const contactInfo = [
    { icon: "📧", label: "Email Us", value: "support@expensetracker.ai" },
    { icon: "📞", label: "Call Us", value: "+1 (800) 123-4567" },
    { icon: "📍", label: "Office", value: "San Francisco, CA 94103" },
    { icon: "🕐", label: "Hours", value: "Mon–Fri, 9am – 6pm PST" },
  ];

  return (
    <main className="bg-background text-foreground min-h-screen">

      {/* Hero */}
      <section className="relative max-w-4xl mx-auto px-6 pt-24 pb-12 text-center flex flex-col items-center gap-5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
        <span className="text-xs font-semibold tracking-widest uppercase text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 rounded-full">
          Get In Touch
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
          We'd love to{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            hear from you
          </span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
          Have a question, feedback, or just want to say hi? Our team is here to help you.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Contact Info Cards */}
        <div className="flex flex-col gap-4">
          {contactInfo.map((c) => (
            <div
              key={c.label}
              className="bg-muted border border-border rounded-2xl p-5 flex items-start gap-4 hover:border-emerald-500/40 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-xl flex-shrink-0">
                {c.icon}
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm">{c.label}</p>
                <p className="text-muted-foreground text-sm mt-0.5">{c.value}</p>
              </div>
            </div>
          ))}

          {/* FAQ Note */}
          <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-2xl p-5 mt-2">
            <p className="text-foreground font-semibold text-sm mb-1">💬 Check our FAQ</p>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Most common questions are already answered in our Help Center.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-muted border border-border rounded-3xl p-8">
          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-10">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-3xl">
                ✅
              </div>
              <h3 className="text-foreground text-xl font-bold">Message Sent!</h3>
              <p className="text-muted-foreground text-sm max-w-sm">
                Thanks for reaching out! We'll get back to you within 24 hours.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                className="mt-2 border border-border text-foreground text-sm px-5 py-2 rounded-xl hover:bg-accent transition-all"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <h2 className="text-foreground text-xl font-bold">Send us a message</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-muted-foreground font-medium">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="bg-background border border-border focus:border-ring focus:outline-none text-foreground text-sm rounded-xl px-4 py-2.5 placeholder:text-muted-foreground transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-muted-foreground font-medium">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="bg-background border border-border focus:border-ring focus:outline-none text-foreground text-sm rounded-xl px-4 py-2.5 placeholder:text-muted-foreground transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-muted-foreground font-medium">Subject</label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="bg-background border border-border focus:border-ring focus:outline-none text-foreground text-sm rounded-xl px-4 py-2.5 transition-colors"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-muted-foreground font-medium">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  required
                  rows={5}
                  className="bg-background border border-border focus:border-ring focus:outline-none text-foreground text-sm rounded-xl px-4 py-2.5 placeholder:text-muted-foreground transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-emerald-400 to-blue-500 text-gray-950 font-semibold text-sm px-6 py-3 rounded-xl hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 shadow-md shadow-emerald-500/20 self-start"
              >
                Send Message →
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}