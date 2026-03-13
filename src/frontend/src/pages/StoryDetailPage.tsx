import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  Heart,
  Loader2,
  MessageCircle,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useGetAllStories,
  useGetCommentsByStory,
  usePostComment,
} from "../hooks/useQueries";

const COMMENT_SKELETON_KEYS = ["csk-a", "csk-b", "csk-c"];

function formatDate(timestamp: bigint) {
  return new Date(Number(timestamp / 1_000_000n)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function StoryDetailPage() {
  const { storyId } = useParams({ from: "/stories/$storyId" });
  const storyIdBigInt = BigInt(storyId);

  const { data: allStories, isLoading: storiesLoading } = useGetAllStories();
  const story = allStories?.find((s) => s.id === storyIdBigInt);

  const { data: comments, isLoading: commentsLoading } =
    useGetCommentsByStory(storyIdBigInt);
  const postComment = usePostComment();

  const [form, setForm] = useState({ authorName: "", content: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.authorName.trim() || !form.content.trim()) {
      toast.error("Please fill in your name and suggestion.");
      return;
    }
    try {
      await postComment.mutateAsync({
        storyId: storyIdBigInt,
        content: form.content,
        authorName: form.authorName,
      });
      toast.success("Your suggestion has been shared. Thank you!");
      setForm({ authorName: "", content: "" });
    } catch {
      toast.error("Failed to post suggestion. Please try again.");
    }
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link
          to="/stories"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          data-ocid="story-detail.back.link"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Stories
        </Link>

        {storiesLoading ? (
          <div className="space-y-4" data-ocid="story-detail.loading_state">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-48 w-full" />
          </div>
        ) : !story ? (
          <div
            className="text-center py-24"
            data-ocid="story-detail.error_state"
          >
            <p className="text-muted-foreground">Story not found.</p>
          </div>
        ) : (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <header className="mb-8">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                {story.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  {story.authorName}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formatDate(story.timestamp)}
                </span>
              </div>
            </header>

            <div className="prose prose-stone max-w-none bg-card border border-border rounded-2xl p-8 shadow-warm mb-12">
              <p className="text-foreground leading-relaxed whitespace-pre-wrap text-base">
                {story.content}
              </p>
            </div>

            {/* Comments section */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="w-5 h-5 text-primary" />
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  Suggestions & Support
                </h2>
                {comments && (
                  <span className="text-sm text-muted-foreground">
                    ({comments.length})
                  </span>
                )}
              </div>

              {commentsLoading ? (
                <div className="space-y-4" data-ocid="comments.loading_state">
                  {COMMENT_SKELETON_KEYS.map((key) => (
                    <div key={key} className="story-card space-y-2">
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-12 w-full" />
                    </div>
                  ))}
                </div>
              ) : !comments || comments.length === 0 ? (
                <div
                  className="text-center py-12 story-card mb-6"
                  data-ocid="comments.empty_state"
                >
                  <Heart className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm">
                    No suggestions yet. Be the first to offer support.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 mb-8">
                  {comments.map((comment, i) => (
                    <motion.div
                      key={comment.id.toString()}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="story-card"
                      data-ocid={`comments.item.${i + 1}`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
                          <span className="text-primary font-semibold text-sm">
                            {comment.authorName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {comment.authorName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(comment.timestamp)}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">
                        {comment.content}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}

              <Separator className="my-6" />

              {/* Add suggestion form */}
              <div className="story-card">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-primary" />
                  Offer Your Support
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="comment-author">Your Name</Label>
                    <Input
                      id="comment-author"
                      placeholder="Your name"
                      value={form.authorName}
                      onChange={(e) =>
                        setForm({ ...form, authorName: e.target.value })
                      }
                      data-ocid="comments.author.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="comment-content">Your Suggestion</Label>
                    <Textarea
                      id="comment-content"
                      placeholder="Share a kind word, advice, or simply let them know they're not alone..."
                      rows={4}
                      value={form.content}
                      onChange={(e) =>
                        setForm({ ...form, content: e.target.value })
                      }
                      data-ocid="comments.content.textarea"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={postComment.isPending}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    data-ocid="comments.submit_button"
                  >
                    {postComment.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Support"
                    )}
                  </Button>
                </form>
              </div>
            </section>
          </motion.article>
        )}
      </div>
    </main>
  );
}
