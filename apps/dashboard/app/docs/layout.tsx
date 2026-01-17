import { DocsSidebar } from "../../components/DocsSidebar";
import { DocsNavbar } from "../../components/DocsNavbar";

export default async function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-white dark:bg-[#131316]">
      <DocsSidebar />
      <div className="flex-1 lg:ml-76">
        <DocsNavbar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
