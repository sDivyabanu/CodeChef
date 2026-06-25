import { Bebas_Neue, Inter, Roboto, Outfit } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/Navbar/NavbarWrapper";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${inter.variable} ${roboto.variable} ${outfit.variable}`}
    >
      <body>{children}
        <NavbarWrapper/>
      </body>
    </html>
  );
}