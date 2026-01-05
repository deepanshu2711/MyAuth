import { Login } from "@/features/auth";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Login />
    </Suspense>
  );
}
