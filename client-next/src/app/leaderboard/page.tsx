import { client } from "@/lib/sanityClient";
import LeaderboardClient, { type LeaderboardRowData } from "./LeaderboardClient";

interface LeaderboardMember {
  name: string;
  rating: number;
  codechefUsername: string;
}

function deriveStar(rating: number): number {
  if (rating >= 2200) return 5;
  if (rating >= 2000) return 5;
  if (rating >= 1800) return 4;
  if (rating >= 1600) return 3;
  if (rating >= 1400) return 2;
  return 1;
}

async function getLeaderboardRows(): Promise<LeaderboardRowData[]> {
  const doc = await client.fetch(
    `*[_type == "currentLeaderboard" && _id == "currentLeaderboard"][0]{
      top10[]->{ name, rating, codechefUsername }
    }`
  );

  const members: LeaderboardMember[] = doc?.top10 || [];

  return members.map((m) => ({
    name: m.name,
    star: String(deriveStar(m.rating)),
    rating: String(m.rating),
    codechefUsername: m.codechefUsername,
  }));
}

export default async function LeaderboardPage() {
  const rows = await getLeaderboardRows();
  return <LeaderboardClient rows={rows} />;
}
