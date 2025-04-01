
import { AuthCallbackPage } from "./pages/Auth/AuthCallbackPage.tsx";
import { HomePage } from "./pages/Home/HomePage.tsx";
import { ChatPage } from "./pages/Chat/ChatPage.tsx";
import { AlbumPage } from "./pages/Album/AlbumPage.tsx";
import { MainLayout } from "./layouts/MainLayout.tsx";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { Route, Routes } from "react-router";




const App = () => {

  
  return (
    <header>
      <Routes>
        <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl="/auth-callback" />} />
        <Route path="/auth-callback" element={<AuthCallbackPage/>}></Route>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/chat" element={<ChatPage/>}/>
          <Route path="/albums/:albumId" element={<AlbumPage/>}/>
        </Route>
      </Routes>
    </header>
  )
}

export default App;