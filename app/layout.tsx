import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Provider from "./context/AuthContext";
import ToasterContext from "./context/ToasterContext";

const roboto = Roboto({ subsets: ["latin"], weight: '400' });

export const metadata: Metadata = {
  title: "IdeaTracker+",
  description: "Tracking ideas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <Provider>
           <ToasterContext />
               {children}
        </Provider>
        </body>
    </html>
  );
}
