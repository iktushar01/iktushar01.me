import { RefreshCw } from "lucide-react";

export default function Loading() {
  return (
    <main className="min-h-[100dvh] flex flex-col items-center justify-center bg-background text-foreground select-none gap-4">
      
      {/* High-Impact Borderless Spinner */}
      <div className="relative flex items-center justify-center">
        <RefreshCw 
          className="size-10 text-primary animate-[spin_1.2s_linear_infinite]" 
          strokeWidth={3.5} 
        />
      </div>

      {/* Simplified Cartoon Status Text */}
      <h2 className="text-xl font-black uppercase tracking-widest italic text-foreground/80 animate-[cartoonPulse_1.2s_ease-in-out_infinite]">
        Loading...
      </h2>

      {/* Minimal Keyframe Injector for Text Scaling */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes cartoonPulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.06); opacity: 1; }
        }
      `}} />

    </main>
  );
}