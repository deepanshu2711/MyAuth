import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="border-t bg-black border-white/10 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={200}
            height={200}
            priority
            className="h-auto w-28 sm:w-[120px]"
          />

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-gray-400 sm:gap-x-8">
            <a href="#" className="hover:text-white transition-colors">
              Documentation
            </a>
            <a href="#" className="hover:text-white transition-colors">
              GitHub
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          © 2025 MyAuth. Personal authentication service.
        </div>
      </div>
    </footer>
  );
};
