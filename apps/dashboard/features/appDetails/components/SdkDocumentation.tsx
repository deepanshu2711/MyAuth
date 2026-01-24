"use client";
import React, { useState } from "react";
import {
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Terminal,
  Code,
  FileText,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SdkDocumentationProps {
  clientId: string;
  appId: string;
  selectedFramework: string;
  onFrameworkChange: (framework: string) => void;
}

interface Framework {
  id: string;
  name: string;
  icon: string;
  installCommand: string;
  package: string;
}

interface Step {
  id: number;
  title: string;
  description?: string;
  code?: string;
  fileName?: string;
  note?: string;
  framework?: string[];
}

const frameworks: Framework[] = [
  {
    id: "nextjs",
    name: "Next.js",
    icon: "▲",
    installCommand: "npm install @myauth/next",
    package: "@myauth/next",
  },
  {
    id: "react",
    name: "React",
    icon: "⚛",
    installCommand: "npm install @myauth/react",
    package: "@myauth/react",
  },
  {
    id: "express",
    name: "Express",
    icon: "🚀",
    installCommand: "npm install @myauth/express",
    package: "@myauth/express",
  },
  {
    id: "nuxt",
    name: "Nuxt",
    icon: "🟢",
    installCommand: "npm install @myauth/nuxt",
    package: "@myauth/nuxt",
  },
  {
    id: "vue",
    name: "Vue",
    icon: "💚",
    installCommand: "npm install @myauth/vue",
    package: "@myauth/vue",
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "JS",
    installCommand: "npm install @myauth/core",
    package: "@myauth/core",
  },
];

const getStepsForFramework = (
  framework: string,
  clientId: string,
  appId: string,
): Step[] => {
  const baseSteps: Step[] = [
    {
      id: 1,
      title: `Install ${frameworks.find((f) => f.id === framework)?.package}`,
      code: frameworks.find((f) => f.id === framework)?.installCommand || "",
      note: "Run this command in your project directory to install the MyAuth SDK.",
    },
    {
      id: 2,
      title: "Set your MyAuth API keys",
      description:
        "Add these keys to your .env or create the file if it doesn't exist.",
      code: `MYAUTH_CLIENT_ID=${clientId}
MYAUTH_APP_ID=${appId}`,
      fileName: ".env",
      note: "Retrieve these keys anytime from the API keys page in your dashboard.",
    },
  ];

  if (framework === "nextjs" || framework === "react") {
    baseSteps.push(
      {
        id: 3,
        title: "Update middleware.ts",
        description:
          "If you're using Next.js ≤15, name your file middleware.ts instead of proxy.ts.",
        code: `import { myAuthMiddleware } from '@myauth/next/server';

export default myAuthMiddleware();

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};`,
        fileName: "proxy.ts",
        note: "The clerkMiddleware helper enables authentication and is where you'll configure your protected routes.",
      },
      {
        id: 4,
        title: "Add MyAuthProvider to your app",
        description:
          "The MyAuthProvider component provides MyAuth's authentication context to your app.",
        code: `import { MyAuthProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@myauth/next';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MyAuthProvider>
      <html>
        <body>
          <header className="flex justify-end items-center p-4 gap-4">
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm h-10 px-4">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          {children}
        </body>
      </html>
    </MyAuthProvider>
  );
}`,
        fileName: "src/app/layout.tsx",
        note: "It's recommended to wrap your entire app at the entry point to make authentication globally accessible.",
      },
    );
  }

  if (framework === "express") {
    baseSteps.push({
      id: 3,
      title: "Configure Express middleware",
      code: `import express from 'express';
import { myAuthExpress } from '@myauth/express';

const app = express();

// MyAuth middleware
app.use(myAuthExpress({
  clientId: process.env.MYAUTH_CLIENT_ID,
  appId: process.env.MYAUTH_APP_ID
}));

// Your routes
app.get('/protected', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  res.json({ user: req.user });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
      fileName: "app.js",
      note: "Add the MyAuth middleware to protect your routes and access user data.",
    });
  }

  return baseSteps;
};

export default function SdkDocumentation({
  clientId,
  appId,
  selectedFramework,
  onFrameworkChange,
}: SdkDocumentationProps) {
  const [copiedItem, setCopiedItem] = useState("");
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(
    new Set([1, 2, 3, 4]),
  );

  const steps = getStepsForFramework(selectedFramework, clientId, appId);

  const handleCopy = (content: string, type: string) => {
    navigator.clipboard.writeText(content);
    setCopiedItem(type);
    setTimeout(() => setCopiedItem(""), 2000);
  };

  const toggleStep = (stepId: number) => {
    setExpandedSteps((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(stepId)) {
        newSet.delete(stepId);
      } else {
        newSet.add(stepId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-8">
      {/* Framework Tabs */}
      <div>
        <h3 className="text-xl font-sans mb-4">
          Copy this quickstart guide as a prompt for LLMs to implement MyAuth in
          your {frameworks.find((f) => f.id === selectedFramework)?.name}{" "}
          application.
        </h3>
      </div>

      {/* Installation Steps */}
      <div className="space-y-6 max-w-4xl mx-auto">
        {steps.map((step) => (
          <Card key={step.id} className="border border-white/10 bg-black/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-400 text-black rounded-full flex items-center justify-center font-bold text-sm">
                    {step.id}
                  </div>
                  <h4 className="text-lg font-sans">{step.title}</h4>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleStep(step.id)}
                  className="text-gray-400 hover:text-white"
                >
                  {expandedSteps.has(step.id) ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Button>
              </div>

              {step.description && (
                <p className="text-gray-400 text-sm mt-2">{step.description}</p>
              )}
            </CardHeader>

            {expandedSteps.has(step.id) && step.code && (
              <CardContent className="pt-0">
                {step.note && (
                  <div className="mb-4">
                    <Badge variant="secondary" className="mb-2">
                      Note
                    </Badge>
                    <p className="text-gray-400 text-sm">{step.note}</p>
                  </div>
                )}

                <div className="relative">
                  {step.fileName && (
                    <div className="absolute -top-8 left-4 text-gray-400 text-sm font-mono">
                      {step.fileName}
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Code className="w-4 h-4" />
                      Code
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(step.code!, `step-${step.id}`)}
                      className="text-gray-400 hover:text-white"
                    >
                      {copiedItem === `step-${step.id}` ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>

                  <pre className="bg-black/50 border border-white/10 rounded p-4 overflow-x-auto">
                    <code className="text-green-400 font-mono text-sm whitespace-pre">
                      {step.code}
                    </code>
                  </pre>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Run Project */}
      <Card className="border border-emerald-400/20 bg-emerald-400/5 max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-emerald-400" />
            <h4 className="text-lg font-sans">Create your first user</h4>
          </div>
          <p className="text-gray-400">
            Run your project. Then, visit your app's homepage and sign up to
            create your first user.
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-gray-400" />
              <code className="text-green-400 font-mono">npm run dev</code>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy("npm run dev", "run-dev")}
              className="text-gray-400 hover:text-white"
            >
              {copiedItem === "run-dev" ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
