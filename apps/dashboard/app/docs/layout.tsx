import { DocsSidebar } from "../../components/DocsSidebar";

export default async function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-white dark:bg-[#131316]">
      <DocsSidebar />
      <div className="flex-1">
        <main className="flex-1 overflow-auto lg:ml-72">{children}</main>
      </div>
    </div>
  );
}
