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

      <div className="flex items-center gap-2">
        {/* Tier List */}
        <Button className="" variant="ghost">
          <span className="hidden md:inline">
            <Link to={"/champions"}>Champions</Link>
          </span> 
        </Button>

        <Button className="" variant="ghost">
          <span className="hidden md:inline">
            {/* Search  */}
            <Link to={"/tier-list"}>Tier List</Link>
          </span> 
        </Button>

        <Button className="" variant="ghost">
          <span className="hidden md:inline">
            {/* Items  */}
            <Link to={"/items"}>Items</Link>
          </span> 
        </Button>
        
        
      </div>


      <div className="flex items-center gap-4">
        {isAdmin.isAdmin && (
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
