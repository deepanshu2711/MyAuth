export const Footer = () => {
  return (
    <footer className="border-t bg-black  border-white/10 py-12 px-6 ">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white rounded flex items-center justify-center">
              <span className="text-black text-sm font-bold">M</span>
            </div>
            <span className="text-lg font-medium">MyAuth</span>
          </div>

          <div className="flex gap-8 text-sm text-gray-400">
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
