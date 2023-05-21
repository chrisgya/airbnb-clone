import { Nunito } from "next/font/google";
import ToasterProvider from "@/app/providers/ToasterProvider";

import "./globals.css";

export const metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}
