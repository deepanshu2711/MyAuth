let currentToken: string | null = null;

export const setSessionToken = (token: string | null) => {
  currentToken = token;
};

export const getSessionToken = () => currentToken;
