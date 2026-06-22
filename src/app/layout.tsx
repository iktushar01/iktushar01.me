import type { Metadata } from "next";
// Import Cartoonish Fonts
import { Fredoka, Bubblegum_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemedToaster } from "@/components/themed-toaster";
import SmoothFollowerClient from "@/components/SmoothFollowerClient";
import Loading from "./loading";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Bold weights are key for cartoon UI
});

const bubblegum = Bubblegum_Sans({
  variable: "--font-bubblegum",
  subsets: ["latin"],
  weight: ["400"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.iktushar01.me"),
  title: "Tushar's Portfolio",
  description: "Full-stack developer crafting pixel-perfect digital experiences.",
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
    shortcut: ["/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en" 
      suppressHydrationWarning
      className={`${fredoka.variable} ${bubblegum.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col font-cartoon">
        
        <Loading />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div data-app-content className="flex flex-1 flex-col min-h-full">
            {children}
            <SmoothFollowerClient />
            <ThemedToaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}