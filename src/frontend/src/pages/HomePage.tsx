import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, HandHeart, Sparkles, Users } from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { label: "Stories Shared", value: "0" },
  { label: "Volunteers", value: "0" },
  { label: "Communities Helped", value: "0" },
  { label: "Lives Touched", value: "0" },
];

const values = [
  {
    icon: BookOpen,
    title: "Share Your Story",
    description:
      "Your experience matters. Share your hardships openly in a safe, judgment-free space where empathy reigns.",
  },
  {
    icon: HandHeart,
    title: "Receive Support",
    description:
      "Get heartfelt suggestions and guidance from community members who truly understand and care.",
  },
  {
    icon: Users,
    title: "Volunteer with Us",
    description:
      "Join our network of compassionate volunteers and actively help those who need guidance and hope.",
  },
];

export function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section
        className="relative overflow-hidden grain-overlay"
        data-ocid="home.section"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-venthogai.dim_1200x600.jpg')",
          }}
        />
        {/* Dimmer overlay */}
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative container mx-auto px-4 py-28 md:py-40 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="glass-card max-w-3xl mx-auto px-8 py-14"
          >
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent bg-accent/25 border border-accent/40 px-4 py-1.5 rounded-full mb-6">
              <Sparkles className="w-3 h-3" />A Community of Hope
            </span>
            <h1 className="font-display text-6xl md:text-8xl font-black text-white mb-6 leading-tight drop-shadow-xl">
              You Are Not
              <br />
              <span className="text-accent italic">Alone</span>
            </h1>
            <p className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto mb-10 leading-relaxed font-medium drop-shadow">
              Venthogai Foundation — a safe haven where people share their
              hardships, receive genuine support, and volunteers unite to bring
              healing and hope.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-warm-lg text-base px-8"
                data-ocid="home.stories.primary_button"
              >
                <Link to="/stories">
                  Read Stories <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/40 hover:bg-white/25 text-base px-8 backdrop-blur-sm"
                data-ocid="home.volunteer.secondary_button"
              >
                <Link to="/volunteer">Become a Volunteer</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-primary/80 backdrop-blur-md border-t border-white/20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-3xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-white/80 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background" data-ocid="home.values.section">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="section-heading mb-4 text-black">
              How We Come Together
            </h2>
            <p className="text-gray-700 max-w-xl mx-auto">
              Three simple ways our community creates meaningful change every
              day.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="story-card flex flex-col items-start gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-black">
                  {value.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission statement */}
      <section
        className="py-20 bg-primary/5 border-y border-border"
        data-ocid="home.mission.section"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card px-10 py-10"
            >
              <blockquote className="font-display text-2xl md:text-3xl font-medium text-black italic leading-relaxed">
                "Every hardship shared is a burden halved. Every kind word given
                is a life changed. Together, we build bridges across
                loneliness."
              </blockquote>
              <p className="mt-6 text-gray-700 text-sm font-semibold uppercase tracking-widest">
                — Venthogai Foundation Mission
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-heading mb-4 text-black">
              Ready to Make a Difference?
            </h2>
            <p className="text-gray-700 mb-8 max-w-lg mx-auto">
              Join thousands of compassionate individuals who share, support,
              and heal together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-warm"
                data-ocid="home.join.primary_button"
              >
                <Link to="/volunteer">
                  Join as a Volunteer <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
                data-ocid="home.donate.secondary_button"
              >
                <Link to="/donate">
                  Donate Now <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
