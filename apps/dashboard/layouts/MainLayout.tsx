import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="mb-10">{children}</div>
      <Footer />
    </>
  );
};
