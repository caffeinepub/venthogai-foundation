import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { AdminPage } from "./pages/AdminPage";
import { DonatePage } from "./pages/DonatePage";
import { HomePage } from "./pages/HomePage";
import { StoriesPage } from "./pages/StoriesPage";
import { StoryDetailPage } from "./pages/StoryDetailPage";
import { VolunteerPage } from "./pages/VolunteerPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 30 },
  },
});

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const storiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/stories",
  component: StoriesPage,
});

const storyDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/stories/$storyId",
  component: StoryDetailPage,
});

const volunteerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/volunteer",
  component: VolunteerPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const donateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/donate",
  component: DonatePage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  storiesRoute,
  storyDetailRoute,
  volunteerRoute,
  adminRoute,
  donateRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
