import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LOL_VERSION } from "@/config/version.config.ts";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { useState } from "react";
import { useSummonerStore } from "@/stores/useSummonerStore";

export const SummonerCard = () => {
  const { summoner } = useSummonerStore();

  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 50;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -50;
    setRotation({ x, y });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const handleAvatarClick = () => {
    setIsFlipped((prev) => !prev);
  };

  const normalizeRank = (rank: string) => {
    if (!rank) return "unranked";
    return rank.split(" ")[0].toLowerCase();
  };

  const rank = normalizeRank(summoner.rank);
  const profileIconUrl = `https://ddragon.leagueoflegends.com/cdn/${LOL_VERSION}/img/profileicon/${summoner.profileIconId}.png`;
  const rankIconUrl = `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/${rank}.png`;

  return (
    <Card className="flex items-start bg-zinc-800/50 border-zinc-500/50  hover:border-zinc-500 cursor-pointer hover:scale-101 ease-in-out duration-500 transition-all  rounded-md">
      <CardContent style={{ perspective: "1000px" }} className="p-3 ml-2">
        <div className="flex items-center">
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `rotateX(${rotation.y}deg) rotateY(${rotation.x}deg)`,
              transition: "transform 0.1s ease-in-out",
            }}
          >
            <div
              className={`flex items-end avatar-container ${
                isFlipped ? "flipped" : ""
              }`}
              onClick={handleAvatarClick}
            >
              <div className="avatar-front relative">
                <Avatar className="relative mt-4 mb-4 w-24 h-24 rounded-full border-2 border-zinc-400  shadow-lg">
                  <AvatarImage
                    src={profileIconUrl}
                    alt={`${summoner.name}'s icon`}
                  />
                  <AvatarFallback>Icon</AvatarFallback>
                </Avatar>

                <Badge
                  variant="outline"
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-semibold rounded-full bg-zinc-700 border-zinc-400"
                >
                  {summoner.level}
                </Badge>
              </div>
              <div className="avatar-back flex items-center justify-center ">
                <img
                  src={rankIconUrl}
                  alt={`${summoner.rank} emblem`}
                  className="w-16 h-16 mb-2"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center ml-4 text-white">
            <p className="text-2xl font-semibold leading-tight">
              {summoner.name}
            </p>
            <span className="text-sm text-muted-foreground">
              #{summoner.tag}
            </span>
          </div>

          <div className="flex flex-col justify-center ml-4 text-white">
            <p className="text-lg font-semibold leading-tight">
              {summoner.tier} {summoner.rank}
            </p>
            <span className="text-sm text-muted-foreground">
              LP: {summoner.lp} | Winrate: {summoner.winRate}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
