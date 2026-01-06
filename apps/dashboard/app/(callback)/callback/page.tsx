import Callback from "@/features/auth/components/Callback";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <Callback />
    </Suspense>
  );
}
