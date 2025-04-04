import { useSummonerStore } from "@/stores/useSummonerStore";
import { SummonerSkeleton } from "@/components/skeletons/SummonerSkeleton";
import { SummonerCard } from "./SummonerCard";
import "../SummonerStats.css";

export const SummonerStats = () => {
  const { summoner, isLoading, error } = useSummonerStore();
 

  if (isLoading) {
    return <SummonerSkeleton />;
  }
  if (error) return;
  if (!summoner) return;

  


  return <main>
    <SummonerCard/>

  </main>
  
};
