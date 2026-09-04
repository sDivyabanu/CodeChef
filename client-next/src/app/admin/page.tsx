import { client } from "@/lib/sanityClient";
import AdminDashboardClient from "@/components/Admin/AdminDashboardClient";
import LogoutButton from "@/components/Admin/LogoutButton";

export const dynamic = "force-dynamic";

export interface Member {
  _id: string;
  name: string;
  codechefUsername: string;
  rating: number;
  active: boolean;
}

async function getMembers(): Promise<Member[]> {
  return client.fetch(
    `*[_type == "member"] | order(name asc){ _id, name, codechefUsername, rating, "active": active != false }`,
    {},
    { useCdn: false }
  );
}

async function getCurrentLeaderboardIds(): Promise<string[]> {
  const doc = await client.fetch(
    `*[_type == "currentLeaderboard" && _id == "currentLeaderboard"][0]{ "ids": top10[]._ref }`,
    {},
    { useCdn: false }
  );
  return doc?.ids || [];
}

export default async function AdminPage() {
  const [members, leaderboardIds] = await Promise.all([getMembers(), getCurrentLeaderboardIds()]);

  return (
    <main className="min-h-screen w-full bg-white">
      <header className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">CodeChef Admin</h1>
        <LogoutButton />
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <AdminDashboardClient members={members} initialLeaderboardIds={leaderboardIds} />
      </div>
    </main>
  );
}
