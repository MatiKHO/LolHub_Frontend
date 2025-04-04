import { create } from "zustand";
import { fetchSummoner, fetchMatches} from "@/lib/riotApi";

interface SummonerStore {
  summoner: any | null;
  matches: any[] | null;
  isLoading: boolean;
  error: string | null;
  
  getSummoner: (name: string, tag: string) => Promise<void>;
  getMatches: (puuid: string) => Promise<void>;
  
}

export const useSummonerStore = create<SummonerStore>((set) => ({
  summoner: null,
  matches: null,
  isLoading: false,
  error: null,
  

  getSummoner: async (name, tag) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchSummoner(name, tag);

      if (!response || !response.data) {
        throw new Error("No data from summoner");
      }

      const summonerData = {
        ...response.data,
        name,
        tag,
      };
      set({ summoner: summonerData, isLoading: false });

      // Obtener las partidas del invocador
      await useSummonerStore.getState().getMatches(summonerData.puuid);
    } catch (error: any) {
      console.error("Error fetching summoner:", error);
      set({ error: error.message || "An error ocurred getting data" });
    } finally {
      set({ isLoading: false });
    }
  },

  getMatches: async (puuid) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchMatches(puuid);

      // Verificación de si 'response.data' es válido
      if (!response || !response.data || !Array.isArray(response.data)) {
        throw new Error("No data available for matches");
      }

      const matchesRaw = response.data;

      // Formateo de las partidas
      const formattedMatches = matchesRaw.map((match: any) => {
        const player = match.info.participants.find(
          (p: any) => p.puuid === puuid
        );

        return {
          matchId: match.metadata.matchId,
          championName: player.championName,
          kills: player.kills,
          deaths: player.deaths,
          assists: player.assists,
          win: player.win,
          gameDuration: match.info.gameDuration,
          items: [
            player.item0,
            player.item1,
            player.item2,
            player.item3,
            player.item4,
            player.item5,
            player.item6,
          ],
        };
      });

      set({ matches: formattedMatches, isLoading: false });
    } catch (error: any) {
      console.error("Error fetching matches:", error);
      set({ error: error.message || "An error ocurred getting data" });
    } finally {
      set({ isLoading: false });
    }
  },

}));
