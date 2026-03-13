import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Globe, Heart, Loader2, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitVolunteerApplication } from "../hooks/useQueries";

const benefits = [
  {
    icon: Heart,
    title: "Make a Real Impact",
    description:
      "Directly help individuals facing hardships in your community.",
  },
  {
    icon: Users,
    title: "Join a Caring Network",
    description:
      "Connect with like-minded volunteers who share your compassion.",
  },
  {
    icon: Globe,
    title: "Grow Your Skills",
    description:
      "Develop empathy, communication, and leadership through service.",
  },
];

const areas = [
  "Mental Health Support",
  "Career Counseling",
  "Financial Guidance",
  "Legal Aid",
  "Community Outreach",
  "Youth Mentoring",
  "Healthcare Assistance",
  "Emotional Support",
  "Other",
];

export function VolunteerPage() {
  const submitApplication = useSubmitVolunteerApplication();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    areaOfExpertise: "",
    motivation: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !form.name ||
      !form.email ||
      !form.areaOfExpertise ||
      !form.motivation
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await submitApplication.mutateAsync(form);
      setSubmitted(true);
    } catch {
      toast.error("Failed to submit. Please try again.");
    }
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4">
            Join Our Mission
          </span>
          <h1 className="section-heading mb-4">Volunteer with Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Your time and compassion can change lives. Join our network of
            dedicated volunteers who help people in need find hope, guidance,
            and community.
          </p>
        </motion.div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="story-card flex flex-col items-center text-center gap-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="story-card text-center py-16"
              data-ocid="volunteer.success_state"
            >
              <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                Application Received!
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
                Thank you, <strong>{form.name}</strong>! We've received your
                volunteer application. Our team will review it and reach out to
                you at <strong>{form.email}</strong> within 3-5 business days.
              </p>
              <Button
                className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => {
                  setSubmitted(false);
                  setForm({
                    name: "",
                    email: "",
                    phone: "",
                    areaOfExpertise: "",
                    motivation: "",
                  });
                }}
                data-ocid="volunteer.apply_again.button"
              >
                Submit Another Application
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="story-card"
            >
              <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                Volunteer Application
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="vol-name">
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="vol-name"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      data-ocid="volunteer.name.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="vol-email">
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="vol-email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      data-ocid="volunteer.email.input"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="vol-phone">Phone Number</Label>
                    <Input
                      id="vol-phone"
                      type="tel"
                      placeholder="+1 234 567 8900"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      data-ocid="volunteer.phone.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="vol-area">
                      Area of Expertise{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <select
                      id="vol-area"
                      value={form.areaOfExpertise}
                      onChange={(e) =>
                        setForm({ ...form, areaOfExpertise: e.target.value })
                      }
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      data-ocid="volunteer.area.select"
                    >
                      <option value="">Select an area...</option>
                      {areas.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="vol-motivation">
                    Motivation <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="vol-motivation"
                    placeholder="Tell us why you want to volunteer and how you hope to contribute..."
                    rows={5}
                    value={form.motivation}
                    onChange={(e) =>
                      setForm({ ...form, motivation: e.target.value })
                    }
                    data-ocid="volunteer.motivation.textarea"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitApplication.isPending}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-warm"
                  data-ocid="volunteer.submit_button"
                >
                  {submitApplication.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
