"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import FloatingIcons from "../FloatingIcons/FloatingIcons";

export default function NavbarWrapper() {
  const pathname = usePathname();

  console.log(pathname);

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