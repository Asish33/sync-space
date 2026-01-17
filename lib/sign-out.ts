
import { useRouter } from "next/navigation";
import { authClient } from "./auth-client";
export function useSignOut() {
  const router = useRouter();

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-up");
        },
      },
    });
  };

  return signOut;
}
