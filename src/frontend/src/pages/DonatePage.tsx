import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Heart, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const PRESET_AMOUNTS = [10, 25, 50, 100];

export function DonatePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const effectiveAmount = customAmount ? Number(customAmount) : selectedAmount;

  function handlePresetAmount(amount: number) {
    setSelectedAmount(amount);
    setCustomAmount("");
  }

  function handleCustomAmountChange(val: string) {
    setCustomAmount(val);
    setSelectedAmount(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !effectiveAmount) return;
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 1200));
    setIsSubmitting(false);
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-background py-16 px-4">
      <div className="container mx-auto max-w-2xl">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="glass-card p-12 text-center"
              data-ocid="donate.success_state"
            >
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h2 className="font-display text-4xl font-bold text-black mb-4">
                Thank You!
              </h2>
              <p className="text-gray-700 text-lg mb-2">
                Your generous donation of{" "}
                <span className="font-bold text-primary">
                  ${effectiveAmount}
                </span>{" "}
                will help us change lives.
              </p>
              <p className="text-gray-600 text-sm mb-8">
                We've received your contribution and will send a confirmation to{" "}
                <span className="font-semibold">{email}</span>.
              </p>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setName("");
                  setEmail("");
                  setSelectedAmount(25);
                  setCustomAmount("");
                  setMessage("");
                }}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Donate Again
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="text-center mb-10">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-5">
                  <Sparkles className="w-3 h-3" /> Support Our Mission
                </span>
                <h1 className="font-display text-5xl md:text-6xl font-black text-black mb-4 leading-tight">
                  Make a <span className="text-primary italic">Difference</span>
                </h1>
                <p className="text-gray-700 text-lg max-w-lg mx-auto leading-relaxed">
                  Your donation helps the Venthogai Foundation reach more
                  communities, support more volunteers, and touch more lives.
                </p>
              </div>

              {/* Form card */}
              <div className="glass-card p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="donor-name"
                      className="text-black font-semibold"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="donor-name"
                      type="text"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="text-black placeholder:text-gray-400"
                      data-ocid="donate.name_input"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="donor-email"
                      className="text-black font-semibold"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="donor-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="text-black placeholder:text-gray-400"
                      data-ocid="donate.email_input"
                    />
                  </div>

                  {/* Donation Amount */}
                  <div className="space-y-3">
                    <Label className="text-black font-semibold">
                      Donation Amount
                    </Label>
                    <div className="grid grid-cols-4 gap-3">
                      {PRESET_AMOUNTS.map((amount) => (
                        <Button
                          key={amount}
                          type="button"
                          variant={
                            selectedAmount === amount ? "default" : "outline"
                          }
                          onClick={() => handlePresetAmount(amount)}
                          className={`font-bold ${
                            selectedAmount === amount
                              ? "bg-primary text-primary-foreground"
                              : "text-black border-gray-300 hover:border-primary hover:text-primary"
                          }`}
                          data-ocid={`donate.amount_${amount}.button`}
                        >
                          ${amount}
                        </Button>
                      ))}
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                        $
                      </span>
                      <Input
                        type="number"
                        min="1"
                        placeholder="Custom amount"
                        value={customAmount}
                        onChange={(e) =>
                          handleCustomAmountChange(e.target.value)
                        }
                        className="pl-7 text-black placeholder:text-gray-400"
                        data-ocid="donate.amount_input"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="donor-message"
                      className="text-black font-semibold"
                    >
                      Message{" "}
                      <span className="text-gray-500 font-normal">
                        (optional)
                      </span>
                    </Label>
                    <Textarea
                      id="donor-message"
                      placeholder="Share why you're donating or any message for our community..."
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="text-black placeholder:text-gray-400 resize-none"
                      data-ocid="donate.message_textarea"
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={
                      isSubmitting || !name || !email || !effectiveAmount
                    }
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base"
                    data-ocid="donate.submit_button"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Heart className="w-4 h-4" fill="currentColor" />
                        Donate {effectiveAmount ? `$${effectiveAmount}` : ""}
                      </span>
                    )}
                  </Button>
                </form>
              </div>

              {/* Trust indicators */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-primary" /> Secure &amp;
                  Safe
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-primary" /> 100% Goes to
                  Community
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-primary" /> Tax
                  Deductible
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
