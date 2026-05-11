import type { Metadata } from "next";
// Import Cartoonish Fonts
import { Fredoka, Bubblegum_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import SmoothFollower from "@/components/modules/SmoothFollower/SmoothFollower";

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
  title: "Cartoon App",
  description: "Bold and Fun UI",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <SmoothFollower />
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}