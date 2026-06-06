import { createAuthClient } from "better-auth/react";
import { BACKEND_URL } from "./api-config";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: BACKEND_URL,
});
