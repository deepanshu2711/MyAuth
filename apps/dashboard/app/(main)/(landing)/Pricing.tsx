import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

const tiers = [
  {
    name: "Free",
    id: "tier-free",
    priceLabel: "Free during beta",
    description: "Everything you need to get started with MyAuth.",
    features: [
      "Up to 3 apps",
      "Up to 100 users per app",
      "Email, OAuth, and OTP login",
      "JWT-based sessions",
      "Standard hashing & token refresh",
      "Community support",
    ],
    cta: "Get started",
    mostPopular: false,
  },
  {
    name: "Basic",
    id: "tier-basic",
    priceLabel: "Coming soon",
    description: "For growing projects that need more control and scale.",
    features: [
      "Up to 10 apps",
      "Up to 1,000 users per app",
      "All Free features",
      "Webhooks",
      "Custom token expiration",
      "Basic analytics",
    ],
    cta: "Join waitlist",
    mostPopular: true,
  },
  {
    name: "Pro",
    id: "tier-pro",
    priceLabel: "Coming later",
    description: "Advanced security, observability, and enterprise features.",
    features: [
      "Unlimited apps & users",
      "All Basic features",
      "Audit logs",
      "Advanced OAuth scopes",
      "Priority support",
      "No rate limits",
    ],
    cta: "Contact us",
    mostPopular: false,
  },
];

// const tiers = [
//   {
//     name: "Free",
//     id: "tier-free",
//     href: "#",
//     priceMonthly: "$0",
//     description: "Get started with basic authentication and SDK access.",
//     features: [
//       "3 app per account",
//       "Up to 100 users per app",
//       "Multiple login methods (Email, OAuth, OTP)",
//       "Basic JWT tokens",
//       "Standard hashing & token refresh",
//       "Rate limits: 1k requests/day",
//     ],
//     mostPopular: false,
//   },
//   {
//     name: "Basic",
//     id: "tier-basic",
//     href: "#",
//     priceMonthly: "$9",
//     description: "Everything you need to scale small projects.",
//     features: [
//       "10 apps per account",
//       "Up to 1,000 users per app",
//       "All Free features",
//       "Webhook support",
//       "Token expiration settings",
//       "Enhanced analytics",
//       "Rate limits: 10k requests/day",
//     ],
//     mostPopular: true,
//   },
//   {
//     name: "Pro",
//     id: "tier-pro",
//     href: "#",
//     priceMonthly: "$29",
//     description: "Advanced security, integrations, and priority support.",
//     features: [
//       "Unlimited apps",
//       "Unlimited users per app",
//       "All Basic features",
//       "Advanced OAuth scopes",
//       "Enterprise SDK integrations",
//       "Audit logs",
//       "Real-time analytics & exportable reports",
//       "No rate limits",
//     ],
//     mostPopular: false,
//   },
// ];

//@ts-expect-error type error
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <div className="bg-transparent pt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base/7 font-sans text-cyan-600">Plans</h2>
          <p className="mt-2 text-4xl font-sans tracking-tight text-balance text-neutral-900 sm:text-4xl dark:text-white">
            Simple plans, transparent limits
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-xs font-sans text-pretty text-gray-600 sm:text-sm">
          MyAuth is free during beta. Paid hosted plans will be introduced once
          the platform is production-hardened.
        </p>

        <div className="isolate mx-auto  grid max-w-md grid-cols-1 gap-y-8 sm:mt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular ? "lg:z-10 lg:rounded-b-none" : "lg:mt-8",
                tierIdx === 0 ? "-mr-px lg:rounded-r-none" : "",
                tierIdx === tiers.length - 1 ? "-ml-px lg:rounded-l-none" : "",
                "flex flex-col justify-between rounded-3xl bg-transparent p-8 inset-ring inset-ring-gray-200 xl:p-10",
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.id}
                    className={classNames(
                      tier.mostPopular
                        ? "text-cyan-600"
                        : "text-neutal-900 dark:text-white",
                      "text-lg/8 font-semibold",
                    )}
                  >
                    {tier.name}
                  </h3>
                  {tier.mostPopular ? <Badge>Most popular</Badge> : null}
                </div>
                <p className="mt-4 text-sm text-gray-600">{tier.description}</p>
                <p className="mt-6 text-lg font-medium text-cyan-600">
                  {tier.priceLabel}
                </p>

                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm/6 text-neutral-600 dark:text-white"
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        aria-hidden="true"
                        className="h-6 w-5 flex-none text-cyan-600"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                aria-describedby={tier.id}
                variant={tier.mostPopular ? "secondary" : "default"}
                className="mt-8"
              >
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
