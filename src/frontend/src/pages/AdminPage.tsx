import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Loader2, ShieldAlert, Trash2, Users } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import {
  useDeleteStory,
  useGetAllStories,
  useGetAllVolunteerApplications,
  useIsCallerAdmin,
} from "../hooks/useQueries";

const SKELETON_KEYS = ["sk-1", "sk-2", "sk-3", "sk-4"];

function formatDate(timestamp: bigint) {
  return new Date(Number(timestamp / 1_000_000n)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function AdminPage() {
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: stories, isLoading: storiesLoading } = useGetAllStories();
  const { data: applications, isLoading: appsLoading } =
    useGetAllVolunteerApplications();
  const deleteStory = useDeleteStory();

  async function handleDeleteStory(storyId: bigint) {
    try {
      await deleteStory.mutateAsync(storyId);
      toast.success("Story deleted.");
    } catch {
      toast.error("Failed to delete story.");
    }
  }

  if (adminLoading) {
    return (
      <div
        className="container mx-auto px-4 py-16"
        data-ocid="admin.loading_state"
      >
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div
        className="container mx-auto px-4 py-24 text-center"
        data-ocid="admin.error_state"
      >
        <ShieldAlert className="w-16 h-16 text-destructive/60 mx-auto mb-4" />
        <h1 className="font-display text-2xl font-bold text-foreground mb-3">
          Access Denied
        </h1>
        <p className="text-muted-foreground">
          You must be an administrator to access this page.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="section-heading mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">
            Manage stories and volunteer applications.
          </p>
        </motion.div>

        <Tabs defaultValue="stories" data-ocid="admin.tab">
          <TabsList className="mb-6">
            <TabsTrigger
              value="stories"
              className="flex items-center gap-2"
              data-ocid="admin.stories.tab"
            >
              <BookOpen className="w-4 h-4" />
              Stories ({stories?.length ?? 0})
            </TabsTrigger>
            <TabsTrigger
              value="volunteers"
              className="flex items-center gap-2"
              data-ocid="admin.volunteers.tab"
            >
              <Users className="w-4 h-4" />
              Volunteers ({applications?.length ?? 0})
            </TabsTrigger>
          </TabsList>

          {/* Stories tab */}
          <TabsContent value="stories">
            {storiesLoading ? (
              <div
                className="space-y-3"
                data-ocid="admin.stories.loading_state"
              >
                {SKELETON_KEYS.map((key) => (
                  <Skeleton key={key} className="h-14 w-full" />
                ))}
              </div>
            ) : !stories || stories.length === 0 ? (
              <div
                className="text-center py-16 story-card"
                data-ocid="admin.stories.empty_state"
              >
                <p className="text-muted-foreground">No stories yet.</p>
              </div>
            ) : (
              <div className="story-card overflow-hidden p-0">
                <Table data-ocid="admin.stories.table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stories.map((story, i) => (
                      <TableRow
                        key={story.id.toString()}
                        data-ocid={`admin.stories.row.${i + 1}`}
                      >
                        <TableCell className="font-medium">
                          <span className="line-clamp-1">{story.title}</span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {story.authorName}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {formatDate(story.timestamp)}
                        </TableCell>
                        <TableCell className="text-right">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                data-ocid={`admin.stories.delete_button.${i + 1}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent data-ocid="admin.delete.dialog">
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Story
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{story.title}
                                  "? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel data-ocid="admin.delete.cancel_button">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteStory(story.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  data-ocid="admin.delete.confirm_button"
                                  disabled={deleteStory.isPending}
                                >
                                  {deleteStory.isPending ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    "Delete"
                                  )}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          {/* Volunteers tab */}
          <TabsContent value="volunteers">
            {appsLoading ? (
              <div
                className="space-y-3"
                data-ocid="admin.volunteers.loading_state"
              >
                {SKELETON_KEYS.map((key) => (
                  <Skeleton key={key} className="h-14 w-full" />
                ))}
              </div>
            ) : !applications || applications.length === 0 ? (
              <div
                className="text-center py-16 story-card"
                data-ocid="admin.volunteers.empty_state"
              >
                <p className="text-muted-foreground">
                  No volunteer applications yet.
                </p>
              </div>
            ) : (
              <div className="story-card overflow-hidden p-0">
                <Table data-ocid="admin.volunteers.table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Area of Expertise</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((app, i) => (
                      <TableRow
                        key={`${app.email}-${app.name}`}
                        data-ocid={`admin.volunteers.row.${i + 1}`}
                      >
                        <TableCell className="font-medium">
                          {app.name}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {app.email}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {app.phone || "—"}
                        </TableCell>
                        <TableCell>
                          <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                            {app.areaOfExpertise}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {formatDate(app.timestamp)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
