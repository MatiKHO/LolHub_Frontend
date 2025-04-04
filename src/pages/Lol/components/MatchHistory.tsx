import { useSummonerStore } from "@/stores/useSummonerStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MatchHistorySkeleton } from "@/components/skeletons/MatchHistorySkeleton";
import { Card, CardContent } from "@/components/ui/card";

export const MatchHistory = () => {
  const { matches, isLoading, error } = useSummonerStore();

  if (isLoading) {
    return (
      <MatchHistorySkeleton />
    )
  }
  if (error) return;
  if (!matches || matches.length === 0) return;

  return (
    <Card className=" bg-zinc-800/50 border-zinc-500/50 hover:border-zinc-500 cursor-pointer hover:scale-101 ease-in-out duration-500 transition-all rounded-md">
      <CardContent className="text-2xl font-semibold mb-4 p-3 ml-2">Match History
      <Table className="rounded-md overflow-hidden border-separate" style={{borderSpacing: " 0 4px"}}>
        <TableHeader>
          <TableRow >
        <TableHead>Champion</TableHead>
            <TableHead>Result</TableHead>
            <TableHead>KDA</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Items</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches.map((match, index) => (
            <TableRow key={index}
            className={`bg-zinc-800/50 border-zinc-800 hover:bg-zinc-900 transition-colors ${
              match.win ? "bg-green-950/60 hover:bg-green-950/30" : "bg-red-950/60 hover:bg-red-950/30"
            } cursor-pointer`}>
              <TableCell className="flex items-center gap-2">
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/14.7.1/img/champion/${match.championName}.png`}
                  alt={match.championName}
                  className={`w-10 h-10 rounded-full border-2 ${
                    match.win ? "border-green-600" : "border-red-600"
                  }`}
                />
                <span>{match.championName}</span>
              </TableCell>
              <TableCell>
                <span
                  className={`font-medium ${
                    match.win ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {match.win ? "WIN" : "LOSS"}
                </span>
              </TableCell>
              <TableCell>
                {match.kills} / {match.deaths} / {match.assists}
              </TableCell>
              <TableCell>
                {Math.floor(match.gameDuration / 60)}m{" "}
                {match.gameDuration % 60}s
              </TableCell>
              <TableCell className="flex flex-wrap gap-1">
                {match.items.map((itemId: number, i: number) => (
                  itemId !== 0 ? (
                    <img
                      key={i}
                      src={`https://ddragon.leagueoflegends.com/cdn/14.7.1/img/item/${itemId}.png`}
                      alt={`Item ${itemId}`}
                      className="w-6 h-6 rounded"
                      onError={(e) => {
                        e.currentTarget.src = "lolhub.png";
                        e.currentTarget.alt = "Item not found";
                      }}
                    />
                  ) : (
                    <div key={i} className="w-6 h-6 bg-muted rounded"></div>
                  )
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </CardContent>
    </Card>
  );
};
