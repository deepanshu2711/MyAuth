# @myauth/node

Node.js SDK for MyAuth authentication service

## Installation

```bash
npm install @myauth/node
```

## Usage

```typescript
import { MyAuth } from "@myauth/node";

const myauth = new MyAuth({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  apiBaseUrl: "https://api.myauth.com", // optional
});

const result = await myauth.handleCallback("authorization-code");
console.log(result);
```

## API

### MyAuth

- `constructor(config: { clientId: string; clientSecret: string; apiBaseUrl?: string })`
- `handleCallback(code: string): Promise<any>` - Exchanges authorization code for access tokens

### exchangeCode

- `exchangeCode(data: ExchangeCodeType): Promise<any>` - Direct function to exchange authorization code

## License

ISC
