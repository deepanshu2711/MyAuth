import { Register } from "@/features/auth";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Register />
    </Suspense>
  );
}
