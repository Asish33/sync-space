import { authClient } from "@/lib/auth-client";

type SignUpArgs = {
  email: string;
  password: string;
  name: string;
  image?: string;
};

export async function signUpWithEmail({
  email,
  password,
  name,
  image,
}: SignUpArgs) {
  const { data, error } = await authClient.signUp.email({
    email,
    password,
    name,
    image,
    callbackURL: "/dashboard",
  });

  if (error) {
    throw new Error(error.message ?? "Failed to sign up");
  }

  return data;
}
