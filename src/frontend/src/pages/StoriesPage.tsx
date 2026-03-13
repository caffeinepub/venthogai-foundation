import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import { BookOpen, Calendar, Loader2, PenLine, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useGetAllStories, usePostStory } from "../hooks/useQueries";

const SKELETON_KEYS = ["sk-a", "sk-b", "sk-c", "sk-d", "sk-e", "sk-f"];

function formatDate(timestamp: bigint) {
  return new Date(Number(timestamp / 1_000_000n)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function StoriesPage() {
  const { data: stories, isLoading } = useGetAllStories();
  const postStory = usePostStory();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ title: "", authorName: "", content: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.authorName.trim() || !form.content.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await postStory.mutateAsync(form);
      toast.success("Your story has been shared. Thank you for your courage!");
      setForm({ title: "", authorName: "", content: "" });
      setDialogOpen(false);
    } catch {
      toast.error("Failed to share story. Please try again.");
    }
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12"
        >
          <div>
            <h1 className="section-heading mb-2">Community Stories</h1>
            <p className="text-muted-foreground">
              Real stories from real people. Read, reflect, and respond with
              kindness.
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-warm"
                data-ocid="stories.share.open_modal_button"
              >
                <PenLine className="w-4 h-4 mr-2" />
                Share Your Story
              </Button>
            </DialogTrigger>
            <DialogContent
              className="sm:max-w-lg"
              data-ocid="stories.share.dialog"
            >
              <DialogHeader>
                <DialogTitle className="font-display text-xl">
                  Share Your Story
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                <div className="space-y-1.5">
                  <Label htmlFor="story-author">Your Name</Label>
                  <Input
                    id="story-author"
                    placeholder="How should we call you?"
                    value={form.authorName}
                    onChange={(e) =>
                      setForm({ ...form, authorName: e.target.value })
                    }
                    data-ocid="stories.author.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="story-title">Title</Label>
                  <Input
                    id="story-title"
                    placeholder="Give your story a title..."
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    data-ocid="stories.title.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="story-content">Your Story</Label>
                  <Textarea
                    id="story-content"
                    placeholder="Share what you've been going through..."
                    rows={6}
                    value={form.content}
                    onChange={(e) =>
                      setForm({ ...form, content: e.target.value })
                    }
                    data-ocid="stories.content.textarea"
                  />
                </div>
                <div className="flex gap-3 justify-end pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                    data-ocid="stories.share.cancel_button"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={postStory.isPending}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    data-ocid="stories.share.submit_button"
                  >
                    {postStory.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sharing...
                      </>
                    ) : (
                      "Share Story"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Stories grid */}
        {isLoading ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="stories.loading_state"
          >
            {SKELETON_KEYS.map((key) => (
              <div key={key} className="story-card space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-16 w-full" />
              </div>
            ))}
          </div>
        ) : !stories || stories.length === 0 ? (
          <div className="text-center py-24" data-ocid="stories.empty_state">
            <BookOpen className="w-14 h-14 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              No stories yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Be the first to share your story and inspire others.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story, i) => (
              <motion.div
                key={story.id.toString()}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                data-ocid={`stories.item.${i + 1}`}
              >
                <Link
                  to="/stories/$storyId"
                  params={{ storyId: story.id.toString() }}
                >
                  <article className="story-card h-full flex flex-col cursor-pointer group">
                    <h2 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {story.title}
                    </h2>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {story.authorName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(story.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 flex-1">
                      {story.content}
                    </p>
                    <span className="mt-4 text-xs font-semibold text-primary group-hover:underline">
                      Read full story →
                    </span>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
