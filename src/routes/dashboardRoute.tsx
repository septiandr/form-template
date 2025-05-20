import { lazy, Suspense } from "react";
import { fetchDashboardData } from "../api/dashboard";
import Loading from "./loadingPage";

const LazyApp = lazy(() => import("../App"));

export const dashboardRoute = {
  index: true,
  HydrateFallback: Loading,
  element: (
    <Suspense fallback={<Loading/>}>
      <LazyApp />
    </Suspense>
  ),
  loader: fetchDashboardData,
};
