import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="mb-24 pt-32 sm:pt-28">{children}</main>
      <Footer />
    </>
  );
};
