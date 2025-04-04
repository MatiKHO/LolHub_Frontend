import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/stores/useAuthStore";
import { Header } from "./components/Header";
import { DashboardStats } from "./components/DashboardStats";
import { Album, Music } from "lucide-react";
import { SongsTabContent } from "./components/SongsTabContent";
import { AlbumsTabContent } from "./components/AlbumsTabContent";
import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";

export const AdminPage = () => {

    const { isAdmin, isLoading } = useAuthStore();
    const {fetchAlbums, fetchSongs, fetchStats} = useMusicStore();

    useEffect(() => {
        fetchAlbums();
        fetchSongs();
        fetchStats();
    }, [fetchAlbums, fetchSongs, fetchStats]);

    if (!isAdmin && !isLoading) {
      return (
        <div className="flex items-center justify-center h-screen bg-zinc-900 text-zinc-100">
          <h1 className="text-2xl">You are not authorized to view this page</h1>
        </div>
      );
    };

  return (
    <div className="min-h-screen  bg-zinc-900 text-zinc-100 p-8">
      <Header />

      <DashboardStats />

      <Tabs defaultValue="songs" className="space-y-6">
        <TabsList className="p-1 bg-zinc-800/50" >
            <TabsTrigger value="songs" className="data-[state=active]:bg-zinc-700 cursor-pointer">
                <Music className="mr-2 size-4" />
                Songs
            </TabsTrigger>
            <TabsTrigger value="albums" className="data-[state=active]:bg-zinc-700 cursor-pointer">
                <Album className="mr-2 size-4" />
                Albums
            </TabsTrigger>
        </TabsList>

        <TabsContent value="songs">
           <SongsTabContent/>
        </TabsContent>
        <TabsContent value="albums">
            <AlbumsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};
