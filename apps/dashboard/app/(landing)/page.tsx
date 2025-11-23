"use client";

export default function Page() {
  const handleClick = () => {
    console.log("reach here");
    window.location.href = `http://localhost:3001/login?clientId=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=http://localhost:3000/callback`;
  };

  return (
    <div className=" bg-black min-h-screen text-white flex flex-col items-center justify-center">
      <section className=" px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Simple Authentication
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed">
            A personal OAuth 2.0 service for my applications.
            <br />
            Clean, secure, and straightforward.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleClick}
              className="px-7 py-3 bg-white text-black font-medium rounded hover:bg-gray-200 transition-colors"
            >
              Get Started
            </button>
            <button className="px-7 py-3 border border-white/20 rounded hover:bg-white/5 transition-colors">
              Documentation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
