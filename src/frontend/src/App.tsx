import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  BarChart3,
  Bot,
  Brain,
  CheckCircle2,
  ChevronRight,
  Github,
  Heart,
  Lightbulb,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Phone,
  Twitter,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitContact } from "./hooks/useQueries";

// ── Data ──────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    icon: Brain,
    title: "AI Automation",
    desc: "Automate repetitive tasks and complex workflows with intelligent AI systems that learn and adapt to your business processes.",
    tag: "Efficiency",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    desc: "Unlock data-driven insights powered by machine learning algorithms. Turn raw data into strategic intelligence.",
    tag: "Intelligence",
  },
  {
    icon: Lightbulb,
    title: "AI Consulting",
    desc: "Expert guidance to identify, plan, and integrate AI solutions that align with your unique business goals.",
    tag: "Strategy",
  },
];

const CLIENTS = [
  "TechNova",
  "DataForge",
  "Nexus Labs",
  "Vertex AI",
  "Synapse Co",
  "CloudMind",
];

const FOOTER_LINKS: Record<string, { label: string; href: string }[]> = {
  Services: [
    { label: "AI Automation", href: "#services" },
    { label: "Smart Analytics", href: "#services" },
    { label: "AI Consulting", href: "#services" },
  ],
  Company: [
    { label: "About Us", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Contact", href: "#contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" },
    { label: "Cookie Policy", href: "#cookies" },
  ],
};

// ── Hero Illustration ─────────────────────────────────────────────────────────
function HeroVisual() {
  return (
    <div className="relative w-full max-w-[500px] mx-auto lg:mx-0 float-anim">
      <img
        src="/assets/generated/hero-robot-ai.dim_600x500.png"
        alt="AI Robot with glowing orb"
        className="w-full h-auto rounded-2xl"
      />
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute -left-4 top-1/4 bg-white rounded-xl shadow-card-hover px-4 py-2 flex items-center gap-2 border border-border"
      >
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs font-semibold text-foreground font-body">
          AI Models Active
        </span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="absolute -right-4 bottom-1/4 bg-white rounded-xl shadow-card-hover px-4 py-2 border border-border"
      >
        <div className="text-xs text-muted-foreground font-body">
          Efficiency
        </div>
        <div className="text-lg font-bold text-foreground font-display">
          +247%
        </div>
      </motion.div>
    </div>
  );
}

// ── Service Card ──────────────────────────────────────────────────────────────
function ServiceCard({
  icon: Icon,
  title,
  desc,
  tag,
  index,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  tag: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-card rounded-2xl p-8 border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
      data-ocid={`services.item.${index}`}
    >
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300"
        style={{ background: "oklch(0.21 0.045 232 / 0.08)" }}
      >
        <Icon className="w-7 h-7" style={{ color: "oklch(0.73 0.12 210)" }} />
      </div>
      <div
        className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 border"
        style={{
          color: "oklch(0.73 0.12 210)",
          borderColor: "oklch(0.73 0.12 210 / 0.3)",
          background: "oklch(0.73 0.12 210 / 0.08)",
        }}
      >
        {tag}
      </div>
      <h3 className="font-display text-xl font-bold text-foreground mb-3">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed text-sm">{desc}</p>
      <div
        className="mt-6 flex items-center gap-1 text-sm font-semibold"
        style={{ color: "oklch(0.73 0.12 210)" }}
      >
        Learn more <ChevronRight className="w-4 h-4" />
      </div>
    </motion.div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const submitContact = useSubmitContact();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await submitContact.mutateAsync(formData);
      toast.success("Message sent! We'll be in touch soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background font-body overflow-x-hidden">
      <Toaster />

      {/* ── Header ── */}
      <header
        className="sticky top-0 z-50 w-full"
        style={{
          background: "oklch(0.17 0.022 228)",
          borderBottom: "1px solid oklch(0.25 0.03 228)",
        }}
        data-ocid="header.section"
      >
        <div className="container max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 shrink-0"
            data-ocid="nav.link"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{
                background: "oklch(0.73 0.12 210 / 0.15)",
                border: "1px solid oklch(0.73 0.12 210 / 0.3)",
              }}
            >
              <Bot
                className="w-5 h-5"
                style={{ color: "oklch(0.73 0.12 210)" }}
              />
            </div>
            <div className="leading-none">
              <div className="font-display text-white font-bold text-sm tracking-widest uppercase">
                White Bot
              </div>
              <div
                className="text-xs tracking-widest uppercase"
                style={{ color: "oklch(0.73 0.12 210)" }}
              >
                AI Agency
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium transition-colors duration-200 hover:text-white"
                style={{ color: "oklch(0.72 0.01 228)" }}
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a href="#contact" data-ocid="nav.primary_button">
              <Button
                size="sm"
                className="rounded-full font-semibold text-sm px-5 tracking-wide"
                style={{
                  background: "oklch(0.73 0.12 210)",
                  color: "oklch(0.17 0.022 228)",
                }}
              >
                REQUEST DEMO
              </Button>
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t"
            style={{
              background: "oklch(0.17 0.022 228)",
              borderColor: "oklch(0.25 0.03 228)",
            }}
          >
            <nav className="flex flex-col px-6 py-4 gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium py-2 text-white/80 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button
                size="sm"
                className="rounded-full w-full mt-2 font-semibold"
                style={{
                  background: "oklch(0.73 0.12 210)",
                  color: "oklch(0.17 0.022 228)",
                }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                REQUEST DEMO
              </Button>
            </nav>
          </motion.div>
        )}
      </header>

      <main>
        {/* ── Hero ── */}
        <section
          id="hero"
          className="py-24 px-6 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.17 0.022 228) 0%, oklch(0.22 0.03 228) 100%)",
          }}
          data-ocid="hero.section"
        >
          {/* Background grid pattern */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(oklch(0.73 0.12 210) 1px, transparent 1px), linear-gradient(90deg, oklch(0.73 0.12 210) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />

          <div className="container max-w-6xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left column */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="gradient-border-badge inline-block mb-6">
                  <div className="gradient-border-badge-inner">
                    <span
                      className="text-xs font-bold tracking-widest uppercase"
                      style={{ color: "oklch(0.73 0.12 210)" }}
                    >
                      ✦ Next-Gen AI Agency
                    </span>
                  </div>
                </div>

                <h1 className="font-display text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
                  Intelligent AI
                  <br />
                  <span style={{ color: "oklch(0.73 0.12 210)" }}>
                    Solutions
                  </span>
                  <br />
                  for the Future
                </h1>

                <p
                  className="text-base leading-relaxed mb-10"
                  style={{ color: "oklch(0.72 0.01 228)" }}
                >
                  We build transformative AI systems that automate workflows,
                  unlock insights, and scale your business. Partner with the
                  agency trusted by leading innovators.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#services" data-ocid="hero.primary_button">
                    <Button
                      className="rounded-xl px-8 py-3 h-auto font-bold text-sm tracking-wide"
                      style={{
                        background: "oklch(0.73 0.12 210)",
                        color: "oklch(0.17 0.022 228)",
                      }}
                    >
                      EXPLORE SERVICES
                    </Button>
                  </a>
                  <a href="#about" data-ocid="hero.secondary_button">
                    <Button
                      variant="outline"
                      className="rounded-xl px-8 py-3 h-auto font-bold text-sm tracking-wide"
                      style={{
                        borderColor: "oklch(0.72 0.01 228 / 0.5)",
                        color: "white",
                        background: "transparent",
                      }}
                    >
                      LEARN MORE
                    </Button>
                  </a>
                </div>

                {/* Stats row */}
                <div className="mt-12 flex gap-10">
                  {[
                    { value: "150+", label: "Projects" },
                    { value: "98%", label: "Satisfaction" },
                    { value: "12+", label: "Industries" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="font-display text-2xl font-bold text-white">
                        {stat.value}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: "oklch(0.60 0.01 228)" }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right column */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex justify-center lg:justify-end"
              >
                <HeroVisual />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Services ── */}
        <section
          id="services"
          className="py-24 px-6 bg-background"
          data-ocid="services.section"
        >
          <div className="container max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <div
                className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border"
                style={{
                  color: "oklch(0.73 0.12 210)",
                  borderColor: "oklch(0.73 0.12 210 / 0.3)",
                  background: "oklch(0.73 0.12 210 / 0.07)",
                }}
              >
                SERVICES
              </div>
              <h2 className="font-display text-4xl font-bold text-foreground mb-4">
                What We Deliver
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                End-to-end AI solutions engineered for real business impact.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {SERVICES.map((svc, i) => (
                <ServiceCard key={svc.title} {...svc} index={i + 1} />
              ))}
            </div>
          </div>
        </section>

        {/* ── About ── */}
        <section
          id="about"
          className="py-24 px-6"
          style={{ background: "oklch(0.95 0.008 220)" }}
          data-ocid="about.section"
        >
          <div className="container max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <div
                className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border"
                style={{
                  color: "oklch(0.73 0.12 210)",
                  borderColor: "oklch(0.73 0.12 210 / 0.3)",
                  background: "oklch(0.73 0.12 210 / 0.07)",
                }}
              >
                ABOUT US
              </div>
              <h2 className="font-display text-4xl font-bold text-foreground">
                The Team Behind the Technology
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid lg:grid-cols-2 rounded-2xl overflow-hidden shadow-card-hover border border-border"
            >
              {/* Photo side */}
              <div className="relative overflow-hidden min-h-64">
                <img
                  src="/assets/generated/team-meeting.dim_600x400.jpg"
                  alt="White Bot AI team at work"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text side */}
              <div
                className="p-10 lg:p-14 flex flex-col justify-center"
                style={{ background: "oklch(0.17 0.022 228)" }}
              >
                <div
                  className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ color: "oklch(0.73 0.12 210)" }}
                >
                  WHO WE ARE
                </div>
                <h3 className="font-display text-3xl font-bold text-white mb-6">
                  Pioneers in Practical AI
                </h3>
                <p
                  className="leading-relaxed mb-6"
                  style={{ color: "oklch(0.72 0.01 228)" }}
                >
                  White Bot AI Agency is a collective of machine learning
                  engineers, data scientists, and product strategists obsessed
                  with one thing: making AI work for real businesses. Founded in
                  2019, we’ve helped over 150 companies across 12 industries
                  harness the power of intelligent automation.
                </p>
                <p
                  className="leading-relaxed"
                  style={{ color: "oklch(0.60 0.01 228)" }}
                >
                  We don’t just build models — we architect full AI pipelines,
                  integrate seamlessly with your existing stack, and stay with
                  you through every step of the journey.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Portfolio ── */}
        <section
          id="portfolio"
          className="py-20 px-6 bg-background"
          data-ocid="portfolio.section"
        >
          <div className="container max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <div
                className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border"
                style={{
                  color: "oklch(0.73 0.12 210)",
                  borderColor: "oklch(0.73 0.12 210 / 0.3)",
                  background: "oklch(0.73 0.12 210 / 0.07)",
                }}
              >
                PORTFOLIO / CLIENTS
              </div>
              <h2 className="font-display text-4xl font-bold text-foreground">
                Trusted by Industry Leaders
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
            >
              {CLIENTS.map((client, i) => (
                <div
                  key={client}
                  className="flex items-center justify-center py-6 px-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-card transition-all duration-300"
                  data-ocid={`portfolio.item.${i + 1}`}
                >
                  <span className="font-display text-sm font-bold text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase">
                    {client}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section
          id="contact"
          className="py-24 px-6 bg-background"
          data-ocid="contact.section"
        >
          <div className="container max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl overflow-hidden shadow-card-hover"
              style={{ background: "oklch(0.17 0.022 228)" }}
            >
              <div className="grid lg:grid-cols-2">
                {/* Left: info */}
                <div className="p-12 lg:p-16 flex flex-col justify-center">
                  <div
                    className="text-xs font-bold uppercase tracking-widest mb-4"
                    style={{ color: "oklch(0.73 0.12 210)" }}
                  >
                    GET IN TOUCH
                  </div>
                  <h2 className="font-display text-4xl font-bold text-white mb-4">
                    Ready to Innovate?
                  </h2>
                  <p
                    className="mb-10"
                    style={{ color: "oklch(0.65 0.01 228)" }}
                  >
                    Let’s discuss how AI can transform your business. Reach out
                    and our team will respond within 24 hours.
                  </p>

                  <div className="flex flex-col gap-5">
                    {[
                      { icon: Mail, text: "hello@whitebot.ai", label: "Email" },
                      {
                        icon: Phone,
                        text: "+1 (555) 800-2400",
                        label: "Phone",
                      },
                      {
                        icon: MapPin,
                        text: "San Francisco, CA 94105",
                        label: "Address",
                      },
                    ].map(({ icon: Icon, text, label }) => (
                      <div key={label} className="flex items-center gap-4">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                          style={{
                            background: "oklch(0.73 0.12 210 / 0.12)",
                            border: "1px solid oklch(0.73 0.12 210 / 0.25)",
                          }}
                        >
                          <Icon
                            className="w-4 h-4"
                            style={{ color: "oklch(0.73 0.12 210)" }}
                          />
                        </div>
                        <div>
                          <div
                            className="text-xs"
                            style={{ color: "oklch(0.55 0.01 228)" }}
                          >
                            {label}
                          </div>
                          <div className="text-sm font-medium text-white">
                            {text}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: form */}
                <div
                  className="p-12 lg:p-16"
                  style={{
                    background: "oklch(0.20 0.025 228)",
                    borderLeft: "1px solid oklch(0.25 0.03 228)",
                  }}
                >
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                    data-ocid="contact.modal"
                  >
                    <div className="flex flex-col gap-2">
                      <Label
                        htmlFor="name"
                        className="text-sm font-medium"
                        style={{ color: "oklch(0.72 0.01 228)" }}
                      >
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Smith"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, name: e.target.value }))
                        }
                        className="rounded-xl border text-white placeholder:text-white/30 focus:ring-2 h-12"
                        style={{
                          background: "oklch(0.17 0.022 228)",
                          borderColor: "oklch(0.28 0.03 228)",
                        }}
                        data-ocid="contact.input"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium"
                        style={{ color: "oklch(0.72 0.01 228)" }}
                      >
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, email: e.target.value }))
                        }
                        className="rounded-xl border text-white placeholder:text-white/30 h-12"
                        style={{
                          background: "oklch(0.17 0.022 228)",
                          borderColor: "oklch(0.28 0.03 228)",
                        }}
                        data-ocid="contact.input"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label
                        htmlFor="message"
                        className="text-sm font-medium"
                        style={{ color: "oklch(0.72 0.01 228)" }}
                      >
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your project..."
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            message: e.target.value,
                          }))
                        }
                        className="rounded-xl border text-white placeholder:text-white/30 resize-none"
                        style={{
                          background: "oklch(0.17 0.022 228)",
                          borderColor: "oklch(0.28 0.03 228)",
                        }}
                        data-ocid="contact.textarea"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={submitContact.isPending}
                      className="rounded-xl h-12 font-bold tracking-wide text-sm mt-2"
                      style={{
                        background: "oklch(0.73 0.12 210)",
                        color: "oklch(0.17 0.022 228)",
                      }}
                      data-ocid="contact.submit_button"
                    >
                      {submitContact.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          SENDING...
                        </>
                      ) : submitContact.isSuccess ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          MESSAGE SENT!
                        </>
                      ) : (
                        "SEND MESSAGE"
                      )}
                    </Button>

                    {submitContact.isPending && (
                      <div
                        className="text-xs text-center"
                        style={{ color: "oklch(0.55 0.01 228)" }}
                        data-ocid="contact.loading_state"
                      >
                        Sending your message...
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer
        style={{
          background: "oklch(0.17 0.022 228)",
          borderTop: "1px solid oklch(0.25 0.03 228)",
        }}
      >
        <div className="container max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{
                    background: "oklch(0.73 0.12 210 / 0.15)",
                    border: "1px solid oklch(0.73 0.12 210 / 0.3)",
                  }}
                >
                  <Bot
                    className="w-5 h-5"
                    style={{ color: "oklch(0.73 0.12 210)" }}
                  />
                </div>
                <div className="leading-none">
                  <div className="font-display text-white font-bold text-sm tracking-widest uppercase">
                    White Bot
                  </div>
                  <div
                    className="text-xs tracking-widest uppercase"
                    style={{ color: "oklch(0.73 0.12 210)" }}
                  >
                    AI Agency
                  </div>
                </div>
              </div>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "oklch(0.55 0.01 228)" }}
              >
                Building intelligent AI systems for forward-thinking businesses.
              </p>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-display text-xs font-bold uppercase tracking-widest mb-4 text-white">
                  {category}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm transition-colors duration-200 hover:text-white"
                        style={{ color: "oklch(0.55 0.01 228)" }}
                        data-ocid="footer.link"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="h-px mb-8"
            style={{ background: "oklch(0.25 0.03 228)" }}
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p
              className="text-sm flex items-center gap-1.5"
              style={{ color: "oklch(0.45 0.01 228)" }}
            >
              © {new Date().getFullYear()} White Bot AI Agency. Built with{" "}
              <Heart
                className="w-3.5 h-3.5 fill-current inline"
                style={{ color: "oklch(0.73 0.12 210)" }}
              />{" "}
              using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                style={{ color: "oklch(0.73 0.12 210)" }}
                data-ocid="footer.link"
              >
                caffeine.ai
              </a>
            </p>

            <div className="flex items-center gap-3">
              {[
                {
                  icon: Twitter,
                  label: "Twitter",
                  href: "https://twitter.com",
                },
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  href: "https://linkedin.com",
                },
                { icon: Github, label: "GitHub", href: "https://github.com" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: "oklch(0.25 0.03 228)",
                    color: "oklch(0.55 0.01 228)",
                  }}
                  data-ocid="footer.link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
