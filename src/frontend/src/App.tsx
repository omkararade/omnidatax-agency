import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useRouterState,
} from "@tanstack/react-router";
import { useRef } from "react";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import { PageTransition } from "./components/PageTransition";

import { AboutPage } from "./pages/About";
import { AdminCaseStudiesPage } from "./pages/AdminCaseStudies";
import { CaseStudiesPage } from "./pages/CaseStudies";
import { ContactPage } from "./pages/Contact";
// Lazy-ish: just import page components
import { HomePage } from "./pages/Home";
import { ServicesPage } from "./pages/Services";
import { UseCasesPage } from "./pages/UseCases";

function ScrollToTop() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const prevPathRef = useRef(pathname);
  if (prevPathRef.current !== pathname) {
    prevPathRef.current = pathname;
    window.scrollTo(0, 0);
  }
  return null;
}

function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <ScrollToTop />
      <Nav />
      <main className="flex-1">
        <PageTransition routeKey={pathname}>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <Toaster richColors position="bottom-right" />
    </div>
  );
}

function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <>
      <PageTransition routeKey={pathname}>
        <Outlet />
      </PageTransition>
      <Toaster richColors position="bottom-right" />
    </>
  );
}

const rootRoute = createRootRoute({ component: RootLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: ServicesPage,
});
const useCasesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/use-cases",
  component: UseCasesPage,
});
const caseStudiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/case-studies",
  component: CaseStudiesPage,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

// Admin routes — separate layout (no Nav/Footer)
const adminRootRoute = createRootRoute({ component: AdminLayout });

const adminCaseStudiesRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: "/admin/case-studies",
  component: AdminCaseStudiesPage,
});

const publicRouteTree = rootRoute.addChildren([
  indexRoute,
  servicesRoute,
  useCasesRoute,
  caseStudiesRoute,
  aboutRoute,
  contactRoute,
]);

const adminRouteTree = adminRootRoute.addChildren([adminCaseStudiesRoute]);

const router = createRouter({
  routeTree: publicRouteTree,
  history: undefined,
});

const adminRouter = createRouter({
  routeTree: adminRouteTree,
  history: undefined,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function isAdminPath() {
  return window.location.pathname.startsWith("/admin");
}

export default function App() {
  if (isAdminPath()) {
    return <RouterProvider router={adminRouter} />;
  }
  return <RouterProvider router={router} />;
}
