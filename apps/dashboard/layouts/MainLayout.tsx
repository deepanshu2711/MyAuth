import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen ">{children}</div>
      <Footer />
    </>
  );
};
