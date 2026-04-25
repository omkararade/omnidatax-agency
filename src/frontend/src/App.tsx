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

// True root — no layout, just renders children
function RootShell() {
  return (
    <>
      <Outlet />
      <Toaster richColors position="bottom-right" />
    </>
  );
}

// Public layout: Nav + Footer
function PublicLayout() {
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
    </div>
  );
}

// Admin layout: no Nav/Footer
function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <PageTransition routeKey={pathname}>
      <Outlet />
    </PageTransition>
  );
}

// ─── Route tree ───────────────────────────────────────────────────────────────

const rootRoute = createRootRoute({ component: RootShell });

// "_public" layout route — path-less, renders Nav+Footer wrapper
const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "_public",
  component: PublicLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/",
  component: HomePage,
});
const servicesRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/services",
  component: ServicesPage,
});
const useCasesRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/use-cases",
  component: UseCasesPage,
});
const caseStudiesRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/case-studies",
  component: CaseStudiesPage,
});
const aboutRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/about",
  component: AboutPage,
});
const contactRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/contact",
  component: ContactPage,
});

// "_admin" layout route — path-less, renders minimal wrapper (no Nav/Footer)
const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "_admin",
  component: AdminLayout,
});

const adminCaseStudiesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/case-studies",
  component: AdminCaseStudiesPage,
});

// Single unified route tree
const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([
    indexRoute,
    servicesRoute,
    useCasesRoute,
    caseStudiesRoute,
    aboutRoute,
    contactRoute,
  ]),
  adminLayoutRoute.addChildren([adminCaseStudiesRoute]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
