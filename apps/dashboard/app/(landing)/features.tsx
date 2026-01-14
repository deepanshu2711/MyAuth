import React from "react";
import { useId } from "react";

export function FeaturesSectionDemo() {
  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-2 max-w-7xl mx-auto">
        {grid.map((feature) => (
          <div
            key={feature.title}
            className="relative bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-6 rounded-3xl overflow-hidden"
          >
            <Grid size={20} />
            <p className="text-base font-bold text-neutral-800 dark:text-white relative z-20">
              {feature.title}
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const grid = [
  {
    title: "Create Application",
    description:
      "Register your application in the dashboard and generate client credentials to get started.",
  },
  {
    title: "Configure Redirect URI",
    description:
      "Define the callback URL where users will be redirected after authentication.",
  },
  {
    title: "Configure Scopes & Permissions",
    description:
      "Select the required scopes and permissions your application needs to access user data securely.",
  },
  {
    title: "Redirect User to Login",
    description:
      "Redirect users to the secure MyAuth login page to authenticate their identity.",
  },
  {
    title: "Receive Authorization Code",
    description:
      "After a successful login, users are redirected back with a temporary authorization code.",
  },
  {
    title: "Validate Authorization Code",
    description:
      "Verify the received authorization code to ensure it is valid and not expired.",
  },
  {
    title: "Exchange Tokens",
    description:
      "Exchange the authorization code for access and refresh tokens using the token API.",
  },
  {
    title: "Authenticate API Requests",
    description:
      "Use the access token in API requests to securely access protected resources.",
  },
];

const DEFAULT_PATTERN = [
  [7, 1],
  [8, 2],
  [9, 3],
  [7, 4],
  [8, 5],
];

export const Grid = ({
  pattern,
  size,
}: {
  pattern?: number[][];
  size?: number;
}) => {
  const p = pattern ?? DEFAULT_PATTERN;

  return (
    <div className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full  mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]: any, idx: number) => (
            <rect
              strokeWidth="0"
              key={idx}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
