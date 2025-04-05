import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider} from "@clerk/clerk-react";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./providers/AuthProvider.tsx";


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const clerkFrontendApi = process.env.VITE_PUBLIC_CLERK_FRONTEND_API;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider signInUrl={clerkFrontendApi} publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ClerkProvider>
  </StrictMode>
);
