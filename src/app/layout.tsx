import type { Metadata } from "next";
// Import Cartoonish Fonts
import { Fredoka, Bubblegum_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemedToaster } from "@/components/themed-toaster";
import SmoothFollowerClient from "@/components/SmoothFollowerClient";
import AppReadyClient from "@/components/AppReadyClient";

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
      <body className="min-h-full flex flex-col font-cartoon">
        
        {/* Borderless Cartoon Spinner Loader */}
        <div id="initial-loader" aria-label="Loading" className="relative z-[100]">
          <div className="fixed inset-0 flex flex-col items-center justify-center bg-background select-none gap-4">
            
            {/* Spinning Element */}
            <div className="text-5xl animate-[cartoonSpin_1.5s_linear_infinite]">
              🌀
            </div>
            
            {/* Bouncing Text Indicator */}
            <h2 className="text-xl font-black uppercase tracking-widest italic text-foreground/80 animate-[cartoonPulse_1.2s_ease-in-out_infinite]">
              Loading...
            </h2>

          </div>
        </div>

        {/* Instant injection keyframes */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes cartoonSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes cartoonPulse {
            0%, 100% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.05); opacity: 1; }
          }
        `}} />

        <AppReadyClient />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <SmoothFollowerClient />
          <ThemedToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}