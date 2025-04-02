import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";

// update token if exists, if not delete it
const updateApiToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};
// provides authentication
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken, userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const {checkAdminStatus} = useAuthStore();
  const {initSocket, disconnectSocket} = useChatStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
        if(token) {
          await checkAdminStatus();
          // init socket
          if(userId) {
            initSocket(userId);
          }
        }
      } catch (error) {
        updateApiToken(null);
        console.log("Error in authProvider", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // clean up
    return () => disconnectSocket();
  }, [getToken, userId, checkAdminStatus, initSocket, disconnectSocket]);

  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <img src="/lolhub.png" className=" size-8 animate-spin [animation-duration:1s]" />
      </div>
    );

  return <div>{children}</div>;
};
