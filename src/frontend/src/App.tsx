import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Cake,
  Camera,
  CheckCircle2,
  Circle,
  Gift,
  Heart,
  Music,
  PartyPopper,
  Sparkles,
  Star,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ── Confetti ─────────────────────────────────────────────────────────────────
const CONFETTI_COLORS = [
  "oklch(0.62 0.22 350)",
  "oklch(0.65 0.18 290)",
  "oklch(0.88 0.18 85)",
  "oklch(0.72 0.16 200)",
  "oklch(0.78 0.2 30)",
];

const confettiItems = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  left: `${(i * 5.5 + 2) % 100}%`,
  duration: `${4 + (i % 5)}s`,
  delay: `${(i * 0.4) % 3}s`,
  size: i % 3 === 0 ? 10 : i % 2 === 0 ? 7 : 5,
}));

// ── Data ──────────────────────────────────────────────────────────────────────
const planningSteps = [
  {
    emoji: "📅",
    title: "Pick a Date & Venue",
    desc: "Choose a date that works for the birthday person and key guests. Scout venues: home, rooftop, garden, or a favourite restaurant.",
  },
  {
    emoji: "💰",
    title: "Set a Budget",
    desc: "Decide how much you want to spend in total and break it into categories: venue, food, decorations, entertainment, gifts.",
  },
  {
    emoji: "📝",
    title: "Create a Guest List",
    desc: "Keep it intimate or go big — just make sure the people who matter most are included. Track RSVPs early!",
  },
  {
    emoji: "💌",
    title: "Send Invitations (2–3 Weeks Ahead)",
    desc: "Digital or printed, send invites with date, time, location, dress code, and RSVP deadline.",
  },
  {
    emoji: "🎂",
    title: "Plan Food & Cake",
    desc: "Book a custom cake or plan a dessert spread. Arrange catering or a potluck of favourite dishes.",
  },
  {
    emoji: "🎈",
    title: "Arrange Decorations",
    desc: "Theme, colours, balloons, banners — buy or DIY. Set up the day before to avoid last-minute stress.",
  },
  {
    emoji: "🎤",
    title: "Plan Activities & Entertainment",
    desc: "Games, music playlist, photo booth, or live entertainment. Keep energy up throughout the event.",
  },
  {
    emoji: "🎁",
    title: "Prepare the Birthday Surprise",
    desc: "Coordinate a group surprise: a video compilation, a heartfelt speech, a flash mob, or a special gift reveal.",
  },
];

const decorationIdeas = [
  {
    emoji: "🎈",
    title: "Balloon Arch",
    desc: "A colourful balloon arch or cluster as the centrepiece backdrop makes for stunning photos.",
  },
  {
    emoji: "🎊",
    title: "Happy Birthday Banners",
    desc: "Hang personalised banners with the person's name and age — go glittery for extra flair!",
  },
  {
    emoji: "🌸",
    title: "Table Centerpieces",
    desc: "Floral centrepieces, candles, or themed props tied to their hobbies or favourite things.",
  },
  {
    emoji: "✨",
    title: "Fairy Lights",
    desc: "String lights draped overhead or along walls create a magical, warm glow for evening parties.",
  },
  {
    emoji: "📸",
    title: "Photo Wall",
    desc: "Print their best memories and arrange a photo collage wall — guests will love reminiscing!",
  },
  {
    emoji: "🎨",
    title: "Themed Colour Palette",
    desc: "Pick 2–3 colours for everything: tablecloths, plates, cups, flowers, balloons. Consistency = elegance.",
  },
];

const foodIdeas = [
  {
    emoji: "🎂",
    title: "Custom Birthday Cake",
    desc: "Commission a bespoke cake from a local baker — personalised with a photo, fondant art, or their favourite flavour.",
  },
  {
    emoji: "🧁",
    title: "Themed Cupcakes",
    desc: "Individual cupcakes decorated to match the party theme — easy to distribute and adorably photogenic.",
  },
  {
    emoji: "🥗",
    title: "Finger Foods & Grazing Board",
    desc: "An elegant grazing board with cheeses, fruits, crackers, and charcuterie is crowd-pleasing and easy to manage.",
  },
  {
    emoji: "🍹",
    title: "Mocktails & Drinks Station",
    desc: "Set up a self-serve drinks station with flavoured sodas, fruit punches, and creative garnishes.",
  },
  {
    emoji: "🍬",
    title: "Candy Bar",
    desc: "A colourful candy bar lets guests fill their own bags — doubles as a party favour!",
  },
  {
    emoji: "🍕",
    title: "Favourite Comfort Foods",
    desc: "Include the birthday person's absolute favourite dish as the star of the menu — it's their day!",
  },
];

const activityIdeas = [
  {
    emoji: "🧠",
    title: "'About Them' Trivia",
    desc: "Create a quiz about the birthday person's life, favourite things, and memories — guests will learn something new!",
  },
  {
    emoji: "📷",
    title: "Photo Booth Corner",
    desc: "Set up a backdrop with fun props: hats, glasses, speech bubbles. Instant photo strips are a great memento.",
  },
  {
    emoji: "🎤",
    title: "Karaoke Session",
    desc: "Belt out their favourite songs together! Karaoke machines are affordable to rent and always get the party going.",
  },
  {
    emoji: "💌",
    title: "Birthday Memory Jar",
    desc: "Ask guests to write a favourite memory with the birthday person on a slip of paper — a tearful, beautiful read.",
  },
  {
    emoji: "🗺️",
    title: "Treasure Hunt",
    desc: "Hide clues around the venue that lead to a special surprise gift at the end — works for any age!",
  },
  {
    emoji: "🎬",
    title: "Video Message Compilation",
    desc: "Collect short video messages from friends and family who can't attend and play it as a surprise during the party.",
  },
];

const giftIdeas = [
  {
    emoji: "🖼️",
    title: "Personalised Gifts",
    desc: "Engraved jewellery, custom portrait, personalised star map of their birth date — deeply meaningful and unique.",
  },
  {
    emoji: "✈️",
    title: "Experience Gifts",
    desc: "Book a spa day, cooking class, concert tickets, or a weekend getaway. Experiences create lasting memories.",
  },
  {
    emoji: "💌",
    title: "Heartfelt Handwritten Letter",
    desc: "Pour your feelings onto paper. A sincere letter can become a treasured keepsake for years to come.",
  },
  {
    emoji: "📷",
    title: "Photo Album or Scrapbook",
    desc: "Curate years of photos into a beautiful printed album or hand-crafted scrapbook filled with captions and mementos.",
  },
  {
    emoji: "👥",
    title: "Group Gift",
    desc: "Pool resources with friends for one big, meaningful gift they'd never buy themselves — make it truly special.",
  },
  {
    emoji: "🌱",
    title: "Subscription Box",
    desc: "A curated monthly subscription tied to their hobby — books, coffee, skincare, plants — a gift that keeps giving.",
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

function SectionHeading({
  icon: Icon,
  title,
  subtitle,
}: { icon: React.ElementType; title: string; subtitle: string }) {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
        {title}
      </h2>
      <p className="text-muted-foreground text-lg max-w-xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
}

function IdeaCard({
  emoji,
  title,
  desc,
  index,
}: { emoji: string; title: string; desc: string; index: number }) {
  return (
    <motion.div variants={cardVariants} data-ocid={`idea.item.${index}`}>
      <Card className="h-full shadow-card hover:shadow-festive transition-shadow duration-300 cursor-default rounded-2xl border-border/50 bg-card group">
        <CardHeader className="pb-2">
          <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300 inline-block">
            {emoji}
          </div>
          <CardTitle className="font-display text-xl text-card-foreground">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed text-sm">
            {desc}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [checkedSteps, setCheckedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (i: number) => {
    setCheckedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const progress = Math.round((checkedSteps.size / planningSteps.length) * 100);

  return (
    <div className="min-h-screen bg-background font-body relative overflow-x-hidden">
      {/* Floating confetti */}
      <div aria-hidden="true">
        {confettiItems.map((p) => (
          <div
            key={p.id}
            className="confetti-particle"
            style={{
              left: p.left,
              top: `-${p.size * 2}px`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              animationDuration: p.duration,
              animationDelay: p.delay,
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      {/* ── Hero ── */}
      <header className="relative">
        <div className="relative h-64 md:h-96 overflow-hidden">
          <img
            src="/assets/generated/birthday-hero.dim_1200x400.jpg"
            alt="Birthday celebration with balloons and confetti"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background" />
        </div>
        <div className="container max-w-4xl mx-auto px-4 -mt-20 relative z-10 pb-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-5 backdrop-blur-sm">
              <PartyPopper className="w-4 h-4 text-primary" />
              <span className="text-primary font-semibold text-sm tracking-wide">
                The Ultimate Birthday Guide
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-black leading-tight mb-4">
              <span className="shimmer-text">How to Throw an </span>
              <br />
              <span className="shimmer-text">Unforgettable Birthday</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              A complete guide to planning, decorating, and celebrating the
              perfect birthday party for someone you love 🎉
            </p>
          </motion.div>
        </div>
      </header>

      <main>
        {/* ── Planning Checklist ── */}
        <section className="py-20 px-4" data-ocid="planning.section">
          <div className="container max-w-3xl mx-auto">
            <SectionHeading
              icon={Sparkles}
              title="Step-by-Step Planning Guide"
              subtitle="Follow these 8 steps to plan a celebration that'll be talked about for years."
            />

            {/* Progress bar */}
            <div className="mb-8 bg-card rounded-2xl p-5 shadow-card border border-border/50">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-foreground">
                  Your Planning Progress
                </span>
                <Badge variant="secondary" className="font-bold text-primary">
                  {progress}% done
                </Badge>
              </div>
              <div className="h-3 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  data-ocid="planning.loading_state"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {checkedSteps.size} of {planningSteps.length} steps completed
              </p>
            </div>

            <motion.ol
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {planningSteps.map((step, i) => (
                <motion.li
                  key={step.title}
                  variants={cardVariants}
                  data-ocid={`planning.item.${i + 1}`}
                >
                  <button
                    type="button"
                    onClick={() => toggleStep(i)}
                    data-ocid={`planning.checkbox.${i + 1}`}
                    className="w-full text-left group"
                    aria-pressed={checkedSteps.has(i)}
                  >
                    <div
                      className={`flex gap-4 p-5 rounded-2xl border transition-all duration-300 ${
                        checkedSteps.has(i)
                          ? "bg-primary/5 border-primary/30"
                          : "bg-card border-border/50 hover:border-primary/30 hover:shadow-card"
                      }`}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        <AnimatePresence mode="wait">
                          {checkedSteps.has(i) ? (
                            <motion.div
                              key="checked"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <CheckCircle2 className="w-6 h-6 text-primary" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="unchecked"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                            >
                              <Circle className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xl">{step.emoji}</span>
                          <span
                            className={`font-display font-bold text-lg ${
                              checkedSteps.has(i)
                                ? "line-through text-muted-foreground"
                                : "text-foreground"
                            }`}
                          >
                            {step.title}
                          </span>
                          <span className="ml-auto text-xs font-bold text-primary/60 step-glow bg-primary/10 px-2 py-0.5 rounded-full">
                            Step {i + 1}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </button>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </section>

        {/* ── Decorations ── */}
        <section
          className="py-20 px-4 bg-gradient-to-b from-background via-secondary/30 to-background"
          data-ocid="decorations.section"
        >
          <div className="container max-w-6xl mx-auto">
            <SectionHeading
              icon={Star}
              title="Decoration Ideas"
              subtitle="Transform any space into a magical birthday wonderland."
            />
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {decorationIdeas.map((item, i) => (
                <IdeaCard key={item.title} {...item} index={i + 1} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Food ── */}
        <section className="py-20 px-4" data-ocid="food.section">
          <div className="container max-w-6xl mx-auto">
            <SectionHeading
              icon={Cake}
              title="Cake & Food Ideas"
              subtitle="Delight every palate with a spread as special as the occasion."
            />
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {foodIdeas.map((item, i) => (
                <IdeaCard key={item.title} {...item} index={i + 1} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Activities ── */}
        <section
          className="py-20 px-4 bg-gradient-to-b from-background via-accent/10 to-background"
          data-ocid="activities.section"
        >
          <div className="container max-w-6xl mx-auto">
            <SectionHeading
              icon={Music}
              title="Fun Activities & Games"
              subtitle="Keep the energy high and the laughter flowing all night long."
            />
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {activityIdeas.map((item, i) => (
                <IdeaCard key={item.title} {...item} index={i + 1} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Gifts ── */}
        <section className="py-20 px-4" data-ocid="gifts.section">
          <div className="container max-w-6xl mx-auto">
            <SectionHeading
              icon={Gift}
              title="Gift Ideas"
              subtitle="The perfect gift shows you know them — here's some inspiration."
            />
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {giftIdeas.map((item, i) => (
                <IdeaCard key={item.title} {...item} index={i + 1} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Photo tip banner ── */}
        <section className="py-16 px-4">
          <div className="container max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl p-8 md:p-12 text-center"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.62 0.22 350 / 0.12), oklch(0.65 0.18 290 / 0.12), oklch(0.88 0.18 85 / 0.12))",
                border: "1.5px solid oklch(0.62 0.22 350 / 0.2)",
              }}
            >
              <div
                className="absolute top-4 left-4 text-4xl float-anim"
                aria-hidden="true"
              >
                🎉
              </div>
              <div
                className="absolute top-4 right-4 text-4xl float-anim"
                style={{ animationDelay: "1s" }}
                aria-hidden="true"
              >
                🎈
              </div>
              <div
                className="absolute bottom-4 left-8 text-3xl float-anim"
                style={{ animationDelay: "0.5s" }}
                aria-hidden="true"
              >
                ✨
              </div>
              <div
                className="absolute bottom-4 right-8 text-3xl float-anim"
                style={{ animationDelay: "1.5s" }}
                aria-hidden="true"
              >
                🎊
              </div>
              <Camera className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                Don't Forget to Capture the Moments!
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                Assign a dedicated photographer (or hire one!), set up a photo
                booth, and create a shared album so everyone can upload their
                photos. The memories are priceless.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="py-16 px-4 text-center border-t border-border/50 bg-card">
        <div className="container max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="flex gap-3 text-3xl">
              {["🎂", "🎈", "🎉", "🎁", "✨"].map((e, i) => (
                <span
                  key={e}
                  className="float-anim"
                  style={{ animationDelay: `${i * 0.3}s` }}
                  aria-hidden="true"
                >
                  {e}
                </span>
              ))}
            </div>
          </div>
          <p className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
            Make it special. Make it memorable.
          </p>
          <p className="text-3xl mb-6">Happy Celebrating! 🎊</p>
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-1.5">
            © {new Date().getFullYear()}. Built with{" "}
            <Heart className="w-4 h-4 text-primary fill-primary inline" /> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-semibold"
              data-ocid="footer.link"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
