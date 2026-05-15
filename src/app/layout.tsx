import type { Metadata } from "next";
// Import Cartoonish Fonts
import { Fredoka, Bubblegum_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
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
      // Apply the new variables here
      className={`${fredoka.variable} ${bubblegum.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-cartoon">
        <div id="initial-loader" aria-label="Loading">
          <div className="fixed inset-0 flex items-center justify-center bg-background">
  <div className="fixed inset-0 flex items-center justify-center bg-background z-[100]">
  <div id="initial-loader-card" className="w-full max-w-sm p-8 text-center bg-card border-4 border-black dark:border-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.1)] rounded-[32px] mx-4">
    

    {/* Text Content */}
    <div className="space-y-4">
      <div className="inline-block px-4 py-1 bg-accent border-2 border-black dark:border-white -rotate-2 mb-2">
        <h2 className="text-xl font-black uppercase italic tracking-tighter text-accent-foreground">
          Initializing...
        </h2>
      </div>
      
      {/* Brutalist Progress Bar */}
      

      
    </div>
  </div>
</div>
</div>
        </div>
        <AppReadyClient />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <SmoothFollowerClient />
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
