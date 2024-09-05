import type { Metadata } from "next";
import "./globals.css";

import { Press_Start_2P, Courier_Prime, VT323 } from "next/font/google";

const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });
const courierPrime = Courier_Prime({ weight: "400", subsets: ["latin"] });
const vt323 = VT323({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`uppercas text ${pressStart2P.className} px-4 crt-effect`}>
        {children}
      </body>
    </html>
  );
}