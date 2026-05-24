import { Suspense } from "react";
import DashboardContent from "./dashboard-content";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen w-full bg-[#05070D]" />}>
      <DashboardContent />
    </Suspense>
  );
}
