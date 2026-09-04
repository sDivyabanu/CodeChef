"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import FloatingIcons from "../FloatingIcons/FloatingIcons";

export default function NavbarWrapper() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <>
      <Navbar />
      <FloatingIcons />
    </>
  );
}
