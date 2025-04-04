import React, { useState } from "react";
import { useSummonerStore } from "../../stores/useSummonerStore";
import { SummonerStats } from "./components/SummonerStats";
import { MatchHistory } from "./components/MatchHistory";
import { TopbarLol } from "@/components/TopbarLol";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export const ProfilePage = () => {
  const [searchInput, setSearchInput] = useState("");
  const {getSummoner, getMatches} = useSummonerStore();
  

  const handleSearch = async () => {
    const [name, tag] = searchInput.split("#");
    if (!name || !tag) {
      console.error("Invalid input format. Use 'name#tag'.");
      return;
    }
    await getSummoner(name, tag);

    const {summoner} = useSummonerStore.getState();

    
    if (summoner && summoner.puuid) {
      await getMatches(summoner.puuid);
    } else {
      console.error("Could not fetch summoner data");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
      setSearchInput("");
    }
  };

  return (
    <div className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 via-zinc-900 to-purple-950/20">
      <TopbarLol />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          <div className="relative w-full my-4">
            <Input
              className="p-2 bg-gray-800 rounded-md  text-white w-full pl-10"
              type="text"
              placeholder="Search summoner"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onReset={() => setSearchInput("")}

            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 " size={20} />
          </div>
        </div>
        <div className="p-4 sm:p-2">
          <SummonerStats />
        </div>
        
        <div className="p-4 sm:p-2">
          <MatchHistory />
        </div>
      </ScrollArea>
    </div>
  );
};


