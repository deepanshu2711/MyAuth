"use client";

export default function Page() {
  const handleClick = () => {
    console.log("reach here");
    window.location.href = `http://localhost:3001/login?clientId=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=http://localhost:3000/callback`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/50 backdrop-blur-xl border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold">
              M
            </div>
            <span className="text-xl font-bold">MyAuth</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-slate-300 hover:text-white transition-colors"
            >
              How it Works
            </a>
            <a
              href="#pricing"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Pricing
            </a>
            <a
              href="#docs"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Docs
            </a>
          </div>
          <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all">
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse delay-700"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-2 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full text-sm text-purple-300">
            ✨ OAuth 2.0 compatible
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Authentication made simple.
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            MyAuth helps developers integrate secure sign-in and user management
            in minutes. Focus on building your app, not authentication
            infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleClick()}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105"
            >
              Get Started →
            </button>
            <button className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl font-semibold hover:bg-white/10 transition-all">
              View Docs
            </button>
          </div>

          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent z-10"></div>
            <div className="bg-slate-900/50 backdrop-blur-md border border-purple-500/20 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <pre className="text-left text-sm overflow-x-auto">
                <code className="text-purple-300">
                  {`const response = await fetch('https://api.myauth.dev/oauth/token', {
  method: 'POST',
  body: JSON.stringify({
    client_id: 'your_client_id',
    redirect_uri: 'https://yourapp.com/callback'
  })
});`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-slate-400 text-lg">
              Everything you need for modern authentication
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🔐",
                title: "OAuth 2.0 Compatible",
                description:
                  "Industry-standard authentication protocols that work everywhere.",
              },
              {
                icon: "🎨",
                title: "Customizable UI",
                description:
                  "Brand your sign-in pages with custom themes and logos.",
              },
              {
                icon: "📊",
                title: "App Dashboard",
                description:
                  "Manage all your apps and users from one central dashboard.",
              },
              {
                icon: "🔑",
                title: "Token Control",
                description:
                  "Full control over access tokens, refresh tokens, and sessions.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-6 bg-slate-900/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl hover:bg-slate-900/50 hover:border-purple-500/40 transition-all hover:transform hover:scale-105"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-slate-400 text-lg">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>

            {[
              {
                step: "01",
                title: "Create Your App",
                description:
                  "Sign up and create your first application in the MyAuth dashboard.",
              },
              {
                step: "02",
                title: "Configure Settings",
                description:
                  "Add your client ID, redirect URLs, and customize your auth flow.",
              },
              {
                step: "03",
                title: "Start Authenticating",
                description:
                  "Integrate our SDK and start authenticating users immediately.",
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-slate-900 border border-purple-500/30 rounded-2xl p-8 relative z-10 hover:border-purple-500/60 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center font-bold text-xl mb-4 mx-auto">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-center">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developers Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-purple-500/30 rounded-3xl p-8 md:p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>

            <div className="grid md:grid-cols-2 gap-12 relative z-10">
              <div>
                <div className="inline-block mb-4 px-3 py-1 bg-purple-500/20 rounded-full text-sm text-purple-300">
                  For Developers
                </div>
                <h2 className="text-4xl font-bold mb-6">
                  Built for developers, by developers
                </h2>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Simple APIs, comprehensive documentation, and SDKs for your
                  favorite languages. Integrate authentication in minutes, not
                  weeks.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "REST & GraphQL APIs",
                    "Works with any framework",
                    "Standard OAuth 2.0 flow",
                    "Webhook support",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-slate-300"
                    >
                      <div className="w-5 h-5 bg-purple-500/20 rounded-full flex items-center justify-center">
                        <span className="text-purple-400 text-xs">✓</span>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all">
                  Explore Documentation →
                </button>
              </div>

              <div className="bg-slate-950 rounded-2xl p-6 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="ml-2 text-xs text-slate-500">
                    auth-example.ts
                  </span>
                </div>
                <pre className="text-sm overflow-x-auto">
                  <code className="text-purple-300">
                    {`// Make authorization request
const authUrl = \`https://api.myauth.dev/oauth/authorize?
  client_id=\${CLIENT_ID}&
  redirect_uri=\${REDIRECT_URI}&
  response_type=code&
  scope=email+profile\`;

window.location.href = authUrl;

// Handle callback and exchange code for token
const response = await fetch(
  'https://api.myauth.dev/oauth/token',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code: authCode,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI
    })
  }
);

const { access_token } = await response.json();`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-slate-400 text-lg">
              Start free, scale as you grow
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-slate-900 border border-purple-500/30 rounded-2xl p-8 hover:border-purple-500/60 transition-all">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <p className="text-slate-400 mb-6">Perfect for side projects</p>
              <div className="mb-6">
                <span className="text-5xl font-bold">$0</span>
                <span className="text-slate-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Up to 1,000 users",
                  "1 application",
                  "Email support",
                  "Basic analytics",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-slate-300"
                  >
                    <span className="text-purple-400">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full px-6 py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all">
                Get Started
              </button>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 relative overflow-hidden transform hover:scale-105 transition-transform">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-4">
                  MOST POPULAR
                </div>
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <p className="text-purple-100 mb-6">For growing startups</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold">$29</span>
                  <span className="text-purple-100">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    "Up to 10,000 users",
                    "Unlimited applications",
                    "Priority support",
                    "Advanced analytics",
                    "Custom branding",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="w-full px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all">
                  Start Free Trial
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to simplify authentication?
          </h2>
          <p className="text-xl text-slate-300 mb-10">
            Join thousands of developers who trust MyAuth for their
            authentication needs.
          </p>
          <button className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105">
            Launch Dashboard →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 py-12 px-6 bg-slate-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold">
                  M
                </div>
                <span className="text-xl font-bold">MyAuth</span>
              </div>
              <p className="text-slate-400 text-sm">
                Authentication made simple for modern developers.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API Reference
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-purple-500/20 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
            <p>© 2025 MyAuth. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
