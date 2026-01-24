import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="mb-40 mt-16">{children}</div>
      <Footer />
    </>
  );
};
