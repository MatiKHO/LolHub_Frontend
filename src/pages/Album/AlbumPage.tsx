import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Clock, Pause, Play } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router";

export const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

  useEffect(() => {
    if (albumId) {
      fetchAlbumById(albumId);
    }
  }, [fetchAlbumById, albumId]);
  if (isLoading) return null;

  const handlePlayAlbum = () => {
    if (!currentAlbum) return;
    const isCurrenAlbumPlaying = currentAlbum?.songs.some(
      (song) => song._id === currentSong?._id
    );
    if (isCurrenAlbumPlaying) togglePlay();
    else {
      // start playing the album from the beginning
      playAlbum(currentAlbum?.songs, 0);
    }
  };

  const handlePlaySong = (index: number) => {
    if (!currentAlbum) return;
    playAlbum(currentAlbum?.songs, index);
  };

  return (
    <div className="h-full">
      <ScrollArea className="h-full rounded-md">
        {/* Main Content */}
        <div className="relative min-h-full">
          {/* bg gradient */}
          <div
            className="absolute inset-0 bg-gradient-to-b  from-zinc-800 via-zinc-900 to-purple-950/40 p-4
                pointer-events-none"
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10">
            <div className="flex p-6 gap-6 pb-8">
              <img
                src={currentAlbum?.imageUrl}
                alt={currentAlbum?.title}
                className="w-100 h-100 shadow-xl rounded-2xl cursor-pointer hover:scale-101 transition-all ease-in duration-200"
              />
              <div className="flex flex-col justify-end">
                <p className="text-sm font-medium">Album</p>
                <h1 className="text-7xl font-bold my-4 hover:scale-101 transition-all duration-200 cursor-pointer">
                  {currentAlbum?.title}
                </h1>
                <div className="flex items-center gap-2 text-sm text-zinc-100">
                  <span className="font-medium text-white">
                    {currentAlbum?.artist}
                  </span>
                  <span>• {currentAlbum?.songs.length}</span>
                  <span>• {currentAlbum?.releaseYear}</span>
                </div>
              </div>
            </div>
          </div>

          {/* play button */}
          <div className="px-6 pb-4 flex items-center gap-6">
            <Button
              onClick={handlePlayAlbum}
              size="icon"
              className="w-10 h-10 rounded-xs bg-gradient-to-b from-purple-600 via-purple-800 to-zinc-900/80 hover:bg-purple-600 
                 hover:scale-102 duration-200 ease-in-out transition cursor-pointer"
            >
              {isPlaying && currentAlbum?.songs.some((song) => song._id === currentSong?._id) ? (
                <Pause className="h-5 w-5 size-0.5 text-black fill-black" />
              ) : (
                <Play className="h-5 w-5 size-0.5 text-black fill-black" />
                )}
            </Button>
          </div>

          {/* Table List */}
          <div className="bg-black/20 backdrop-blur-sm">
            {/* Table header */}
            <div className="grid grid-cols-[16px_4fr_2fr_2fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
              <div>#</div>
              <div>Title</div>
              <div>Released Date</div>
              <div>
                <Clock className="h-4 w-4" />
              </div>
            </div>
            {/* songs list  */}
            <div className="px-6">
              <div className="space-y-2 py-4">
                {currentAlbum?.songs.map((song, index) => {
                  const isCurrentSong = currentSong?._id === song._id;
                  return (
                    <div
                      key={song._id}
                      onClick={() => handlePlaySong(index)}
                      className={`grid grid-cols-[16px_4fr_2fr_2fr] gap-4 px-4 py-2 text-sm text-zinc-400
                         hover:bg-white/5 rounded-md group cursor-pointer hover:scale-101 tramsition-all ease-in duration-200`}
                    >
                      <div className="flex items-center justify-center">
                        {isCurrentSong && isPlaying ? (
                          <div className="size-4 text-purple-500">♫</div>
                        ) : (
                          <span className="group-hover:hidden">
                            {index + 1}
                          </span>
                        )}
                        {!isCurrentSong && (
                          <Play className="h-4 w-4 hidden group-hover:block" />
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <img
                          src={song.imageUrl}
                          alt={song.title}
                          className="size-10 rounded-lg"
                        />
                        <div>
                          <div className={`font-medium text-white`}>
                            {song.title}
                          </div>
                          <div>{song.artist}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {song.createdAt.split("T")[0]}
                      </div>
                      <div className="flex items-center">
                        {formatDuration(song.duration)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
