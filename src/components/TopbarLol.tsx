import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router";
import { SignInOAuthButtons } from "./SignInOAuthButtons";
import { useAuthStore } from "@/stores/useAuthStore";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

export const TopbarLol = () => {
  const isAdmin = useAuthStore();
  return (
    <div
      className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900 
    backdrop-blur-md z-10 rounded-md
    "
    >
      <div className="flex gap-2 items-center">
        <img
          src="/public/lolhub.png"
          className="size-8 cursor-pointer"
          alt="lolhub logo"
        />
        <h1>LolHub!</h1>
      </div>
      <div className="flex items-center">
        <Button variant={"ghost"} className="">
          <Link to={"/tier-list"} className="flex items-center gap-2">
            Tier List
          </Link>
        </Button>

        <Button variant={"ghost"} className="">
          <Link to={"/champions"} className="flex items-center gap-2">
            Champions
          </Link>
        </Button>

        <Button variant={"ghost"} className="">
          <Link to={"/items"} className="flex items-center gap-2">
            Items
          </Link>
        </Button>
      </div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link
            to={"/admin"}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LayoutDashboardIcon className="size-4 mr-2" />
            Admin Dashboard
          </Link>
        )}

        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
};
