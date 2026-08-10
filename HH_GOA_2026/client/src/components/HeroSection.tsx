import React from 'react';
import { ArrowDown, Sparkles, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0F3822] via-[#124229] to-[#0F3822] pt-12 pb-16 px-4 text-center border-b border-[#246B44]/40">
      {/* Decorative sun & tropical elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center overflow-hidden">
        <div className="w-[600px] h-[600px] rounded-full bg-[#E5FE47]/10 blur-3xl absolute -top-40"></div>
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1C5938] border border-[#246B44] text-[#E5FE47] text-xs font-mono mb-6 shadow-inner">
          <ShieldCheck className="w-3.5 h-3.5 text-[#E5FE47]" />
          <span>HH GOA 2026 BUILDER FRAME & ID CARD GENERATOR</span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-black tracking-tight text-[#E5FE47] mb-4 drop-shadow-md">
          HACKER <span className="text-[#FF4A8D] font-sans font-extrabold px-1 tracking-normal inline-block transform -rotate-2">गोआ</span> HOUSE
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-4 text-[#A1C1B0] font-mono text-sm sm:text-base mb-8">
          <span>GOA, INDIA</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#E5FE47]"></span>
          <span>28 – 31 OCT 2026</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#E5FE47]"></span>
          <span className="text-[#E5FE47]">1:47 PM STUDIO</span>
        </div>

        <p className="max-w-2xl mx-auto text-[#C2D8CD] text-base sm:text-lg mb-10 leading-relaxed">
          Design your official HH Goa 2026 themed Builder ID badge in seconds. Upload your photo, customize your hacker stack, and generate your shareable `#FrameInGoa` badge instantly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg" 
            className="bg-[#E5FE47] text-[#0F3822] hover:bg-[#d4f332] font-mono font-bold px-8 py-6 text-base shadow-xl transform transition hover:-translate-y-0.5"
            onClick={() => {
              document.getElementById('generator-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Sparkles className="w-5 h-5 mr-2" /> CREATE YOUR ID CARD NOW
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-[#246B44] bg-[#15472E]/60 text-[#FBFBF9] hover:bg-[#1C5938] hover:text-[#E5FE47] font-mono px-6 py-6 text-base"
            onClick={() => {
              document.getElementById('notice-board')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            VIEW NOTICE BOARD <ArrowDown className="w-4 h-4 ml-2 animate-bounce" />
          </Button>
        </div>
      </div>
    </section>
  );
};
