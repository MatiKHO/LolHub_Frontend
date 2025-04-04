
import { AuthCallbackPage } from "./pages/Auth/AuthCallbackPage.tsx";
import { AdminPage } from "./pages/Admin/AdminPage.tsx";
import { MainLayout } from "./layouts/MainLayout.tsx";
import { HomePage } from "./pages/Home/HomePage.tsx";
import { ChatPage } from "./pages/Chat/ChatPage.tsx";
import { AlbumPage } from "./pages/Album/AlbumPage.tsx";
import { ProfilePage } from "./pages/Profile/ProfilePage.tsx";
import { NotFoundPage } from "./pages/404/NotFoundPage.tsx";

import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";



const App = () => {

  
  return (
    <header>
      <Routes>
        <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl="/auth-callback" />} />
        <Route path="/auth-callback" element={<AuthCallbackPage/>}/>
        <Route path="/admin" element={<AdminPage/>}/>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/chat" element={<ChatPage/>}/>
          <Route path="/albums/:albumId" element={<AlbumPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Route>
      </Routes>
      <Toaster/>
    </header>
  )
}

export default App;