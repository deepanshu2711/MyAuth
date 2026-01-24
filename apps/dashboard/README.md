# MyAuth Dashboard

MyAuth Dashboard is a web application for managing authentication applications, users, and settings in the MyAuth authentication system. It provides a comprehensive admin interface for overseeing OAuth applications, user management, and system configuration.

## Features

- **Application Management**: Register and manage third-party applications that integrate with MyAuth
- **User Management**: View and manage users across all applications
- **Authentication Settings**: Configure OAuth flows, redirect URIs, and client credentials
- **Dashboard Analytics**: Monitor application usage and user activity
- **Admin Controls**: System-wide settings and permissions management

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **UI**: React 19 with Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Authentication**: @myauth/next
- **Styling**: Tailwind CSS with custom components
- **Icons**: Lucide React, Tabler Icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- MyAuth backend services running

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:
   Copy `.env.example` to `.env` and configure your settings.

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint with max warnings 0
- `npm run check-types` - Run TypeScript type checking

## Project Structure

```
apps/dashboard/
├── app/                    # Next.js app directory
│   ├── (main)/            # Main app routes
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
├── features/              # Feature-specific modules
│   ├── appDetails/        # App details management
│   └── dashboard/         # Dashboard features
├── lib/                   # Utility libraries
└── providers/             # React providers
```

## Integration Guide

For information on integrating MyAuth into third-party applications, see the integration steps documented in `app/layout.tsx`.

## Contributing

1. Follow the code style guidelines in `AGENTS.md`
2. Run `npm run lint` and `npm run check-types` before committing
3. Use conventional commit messages

## License

This project is part of the MyAuth authentication system.
