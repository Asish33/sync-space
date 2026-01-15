import { authClient } from "./auth-client";

type SignInArgs = {
  email: string;
  password: string;
  rememberMe?: boolean;
  callbackURL?: string;
};

export async function signInWithEmail({
  email,
  password,
  rememberMe,
  callbackURL,
}: SignInArgs) {
  const { data, error } = await authClient.signIn.email({
    email,
    password,
    rememberMe,
    callbackURL: "/dashboard",
  });

  if (error) {
    throw new Error(error.message ?? "Failed to sign in");
  }

  return data;
};
