import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

export const SignInOAuthButtons = () => {
  const { signIn, isLoaded } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };
  return (
    <Button
      onClick={signInWithGoogle}
      variant={"secondary"}
      className="w-15 text-white hover:text-black hover:bg-purple-500 border-zinc-200 h-9 cursor-pointer"
    >
      Sign in
    </Button>
  );
};
