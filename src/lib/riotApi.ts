import { axiosInstance } from "./axios";


// Get data player
export const fetchSummoner = async (name: string, tag: string) => {
  const response = await axiosInstance.get(`/summoner/${name}/${tag}`);
  return response;
};

// Get match history
export const fetchMatches = async (puuid: string) => {
  const response = await axiosInstance.get(`/matches/${puuid}`);
  return response;
};


