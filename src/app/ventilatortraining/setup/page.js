import PediatricVentilator from "@/components/template/PediatricVentilator";
import { Suspense } from "react";

export default function SetupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PediatricVentilator />
    </Suspense>
  );
}
