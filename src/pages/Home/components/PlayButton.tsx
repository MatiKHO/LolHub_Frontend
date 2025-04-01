import { usePlayerStore } from "@/stores/usePlayerStore";
import { Button } from "@/components/ui/button";
import { Song } from "@/types";
import { Pause, Play } from "lucide-react";

const PlayButton = ({ song }: { song: Song }) => {
  const { currentSong, isPlaying, setCurrentSong, togglePlay } =
    usePlayerStore();
  const isCurrentSong = currentSong?._id === song._id;

  const handlePlay = () => {
    if (isCurrentSong) togglePlay();
    else setCurrentSong(song);
  };

  return (
    <Button
      size={"icon"}
      onClick={handlePlay}
      className={`absolute bottom-3 right-2 w-10 h-10 rounded-xs bg-gradient-to-b from-purple-600 via-purple-800 to-zinc-900/80 hover:bg-purple-600 
                 hover:scale-102 duration-200 ease-in-out transition cursor-pointer ${
          isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
    >
      {isCurrentSong && isPlaying ? (
        <Pause className="size-4 text-black fill-black" />
      ) : (
        <Play className="size-4 text-black fill-black" />
      )}
    </Button>
  );
};
export default PlayButton;
