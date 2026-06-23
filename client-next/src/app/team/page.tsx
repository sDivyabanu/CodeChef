"use client";

import { useState } from "react";

import Board from "../../sections/team/Board";
import Departments from "../../sections/team/Departments";

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState<"board" | "departments">("board");

  return (
    <main className="min-h-screen bg-[#5C7FBA] overflow-hidden">
      {/* Team Navigation */}
      <section className="pt-12">
<div className="flex justify-center gap-10">
  <button
    onClick={() => setActiveTab("board")}
    className={`px-5 py-1 text-3xl tracking-wider border-2 border-black shadow-md transition-all ${
      activeTab === "board"
        ? "bg-black text-white"
        : "bg-transparent text-white"
    }`}
  >
    BOARD
  </button>

  <button
    onClick={() => setActiveTab("departments")}
    className={`px-5 py-1 text-3xl tracking-wider border-2 border-black shadow-md transition-all ${
      activeTab === "departments"
        ? "bg-black text-white"
        : "bg-transparent text-white"
    }`}
  >
    DEPARTMENTS
  </button>
</div>
      </section>

      {/* Content */}
      <section className="mt-10">
        {activeTab === "board" ? <Board /> : <Departments />}
      </section>
    </main>
  );
}