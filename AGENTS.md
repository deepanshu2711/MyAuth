# AGENTS.md

## Build/Lint/Test Commands

- **Build all apps**: `npm run build` (uses Turbo)
- **Lint all apps**: `npm run lint` (uses Turbo, max warnings 0)
- **Type check all apps**: `npm run check-types` (uses Turbo)
- **Format code**: `npm run format` (uses Prettier)
- **No test framework configured** - run lint and type check instead

## Code Style Guidelines

### General
- **Language**: TypeScript with strict typing
- **Modules**: ES modules (`"type": "module"` in package.json)
- **Formatting**: Prettier (run `npm run format`)
- **Linting**: ESLint with TypeScript, React, and Turbo rules

### Imports
- Use relative imports with `.js` extensions for TypeScript files
- Group imports: external libraries first, then internal modules
- Example: `import { AppError } from "../../utils/appError.js";`

### Naming Conventions
- **Variables/Functions**: camelCase (`userId`, `generateAccessToken`)
- **Components/Types**: PascalCase (`Login`, `UserModel`)
- **Files**: kebab-case for components (`login.tsx`), camelCase for utilities (`appError.ts`)
- **Models**: PascalCase with `.model.ts` suffix (`User.model.ts`)

### React Components
- Functional components with hooks
- Use `"use client"` directive for client components
- Props: Use object destructuring in function parameters
- State: Use `useState` with descriptive names
- Styling: Tailwind CSS classes

### Backend (API)
- **Framework**: Express.js with TypeScript
- **Database**: MongoDB with Mongoose
- **Error Handling**: Custom `AppError` class with status codes
- **Authentication**: JWT tokens (access + refresh)
- **Async/Await**: Preferred over Promises for all async operations

### Error Handling
- API: Throw `AppError` instances with message and status code
- React: Handle errors in components or with error boundaries
- Validation: Check required fields and throw appropriate errors

### Database Models
- Use Mongoose schemas with TypeScript
- Include timestamps: `{ timestamps: true }`
- Required fields: `{ type: String, required: true }`
- Trim strings: `{ type: String, required: true, trim: true }`

### Security
- Hash passwords with bcrypt (10 rounds)
- Use crypto.randomBytes for secure tokens
- Validate client secrets and tokens
- No secrets in code - use environment variables</content>
<parameter name="filePath">/Users/deepanshu/myauth/AGENTS.md