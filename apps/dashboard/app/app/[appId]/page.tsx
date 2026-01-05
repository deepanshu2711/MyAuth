import { AppDetails } from "@/features/appDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ appId: string }>;
}) {
  const resolvedParams = await params;
  const appId = resolvedParams.appId;

  return <AppDetails appId={appId} />;
}
