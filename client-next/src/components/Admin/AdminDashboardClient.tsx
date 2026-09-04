"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Member } from "@/app/admin/page";
import MemberFormModal from "./MemberFormModal";

const MAX_SLOTS = 10;

export default function AdminDashboardClient({
  members,
  initialLeaderboardIds,
}: {
  members: Member[];
  initialLeaderboardIds: string[];
}) {
  const router = useRouter();

  const [modalMember, setModalMember] = useState<Member | "new" | null>(null);
  const [memberError, setMemberError] = useState("");

  const [slots, setSlots] = useState<string[]>(() => {
    const padded = [...initialLeaderboardIds];
    while (padded.length < MAX_SLOTS) padded.push("");
    return padded.slice(0, MAX_SLOTS);
  });
  const [leaderboardError, setLeaderboardError] = useState("");
  const [leaderboardMessage, setLeaderboardMessage] = useState("");
  const [savingLeaderboard, setSavingLeaderboard] = useState(false);

  const activeMembers = useMemo(() => members.filter((m) => m.active), [members]);
  const memberById = useMemo(() => new Map(members.map((m) => [m._id, m])), [members]);

  async function handleToggleActive(member: Member) {
    setMemberError("");
    const res = await fetch(`/api/admin/members/${member._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !member.active }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setMemberError(data.error || "Failed to update member.");
      return;
    }
    router.refresh();
  }

  function handleSlotChange(index: number, memberId: string) {
    setLeaderboardMessage("");
    setLeaderboardError("");
    if (memberId && slots.includes(memberId)) {
      setLeaderboardError("This member is already in the leaderboard.");
      return;
    }
    setSlots((prev) => {
      const next = [...prev];
      next[index] = memberId;
      return next;
    });
  }

  function moveSlot(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= MAX_SLOTS) return;
    setSlots((prev) => {
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function handleUpdateLeaderboard() {
    setLeaderboardError("");
    setLeaderboardMessage("");

    const memberIds = slots.filter(Boolean);
    if (new Set(memberIds).size !== memberIds.length) {
      setLeaderboardError("The same member cannot appear twice in the leaderboard.");
      return;
    }

    setSavingLeaderboard(true);
    try {
      const res = await fetch("/api/admin/leaderboard", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberIds }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setLeaderboardError(data.error || "Failed to update leaderboard.");
        return;
      }
      setLeaderboardMessage(data.message || "Leaderboard updated successfully.");
      router.refresh();
    } finally {
      setSavingLeaderboard(false);
    }
  }

  return (
    <div className="flex flex-col gap-12">
      {/* Members Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">Members</h2>
          <button
            onClick={() => setModalMember("new")}
            className="text-sm font-medium bg-gray-900 text-white rounded-md px-4 py-1.5 hover:bg-gray-800 transition-colors"
          >
            + Add Member
          </button>
        </div>

        {memberError && <p className="text-sm text-red-600 mb-3">{memberError}</p>}

        <div className="border border-gray-200 rounded-lg overflow-hidden overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500 text-xs uppercase tracking-wide">
                <th className="px-4 py-2 font-medium">Name</th>
                <th className="px-4 py-2 font-medium">Rating</th>
                <th className="px-4 py-2 font-medium">CodeChef</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                    No members yet.
                  </td>
                </tr>
              )}
              {members.map((member) => (
                <tr key={member._id} className="border-t border-gray-100">
                  <td className="px-4 py-2.5 text-gray-900">{member.name}</td>
                  <td className="px-4 py-2.5 text-gray-700">{member.rating}</td>
                  <td className="px-4 py-2.5">
                    <a
                      href={`https://www.codechef.com/users/${member.codechefUsername}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:underline"
                    >
                      View Profile
                    </a>
                  </td>
                  <td className="px-4 py-2.5">
                    <span
                      className={`inline-block text-xs font-medium rounded-full px-2 py-0.5 ${
                        member.active ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {member.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right whitespace-nowrap">
                    <button
                      onClick={() => setModalMember(member)}
                      className="text-gray-700 hover:underline mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggleActive(member)}
                      className="text-gray-700 hover:underline"
                    >
                      {member.active ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Current Leaderboard Section */}
      <section>
        <h2 className="text-base font-semibold text-gray-900 mb-4">Current Leaderboard</h2>

        <div className="border border-gray-200 rounded-lg divide-y divide-gray-100">
          {slots.map((slotId, index) => (
            <div key={index} className="flex items-center gap-3 px-4 py-2.5">
              <span className="w-6 text-sm font-medium text-gray-500">{index + 1}</span>
              <select
                value={slotId}
                onChange={(e) => handleSlotChange(index, e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-400"
              >
                <option value="">Select Member</option>
                {activeMembers.map((m) => (
                  <option key={m._id} value={m._id} disabled={slots.includes(m._id) && slotId !== m._id}>
                    {m.name} ({m.rating})
                  </option>
                ))}
                {slotId && !memberById.get(slotId)?.active && memberById.get(slotId) && (
                  <option value={slotId}>{memberById.get(slotId)?.name} (inactive)</option>
                )}
              </select>
              <div className="flex gap-1">
                <button
                  onClick={() => moveSlot(index, -1)}
                  disabled={index === 0}
                  className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-30"
                  aria-label="Move up"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveSlot(index, 1)}
                  disabled={index === MAX_SLOTS - 1}
                  className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-30"
                  aria-label="Move down"
                >
                  ↓
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-4">
          <button
            onClick={handleUpdateLeaderboard}
            disabled={savingLeaderboard}
            className="text-sm font-medium bg-gray-900 text-white rounded-md px-4 py-1.5 hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {savingLeaderboard ? "Updating..." : "Update Leaderboard"}
          </button>
          {leaderboardError && <p className="text-sm text-red-600">{leaderboardError}</p>}
          {leaderboardMessage && <p className="text-sm text-green-700">{leaderboardMessage}</p>}
        </div>
      </section>

      {modalMember && (
        <MemberFormModal
          member={modalMember === "new" ? null : modalMember}
          onClose={() => setModalMember(null)}
          onSaved={() => {
            setModalMember(null);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}
