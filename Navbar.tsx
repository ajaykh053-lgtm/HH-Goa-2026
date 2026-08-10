import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Terminal, ExternalLink } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="w-full border-b border-[#246B44]/60 bg-[#0F3822]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#E5FE47] text-[#0F3822] font-mono font-bold text-xs px-2.5 py-1 rounded tracking-wider flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            1:47 PM STUDIO
          </div>
          <span className="hidden sm:inline-block text-[#A1C1B0] text-sm font-mono">| GOA, INDIA 2026</span>
        </div>

        <div className="flex items-center gap-3">
          <a 
            href="https://hhgoa.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1 text-xs font-mono text-[#A1C1B0] hover:text-[#E5FE47] transition-colors"
          >
            hhgoa.com <ExternalLink className="w-3 h-3" />
          </a>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-transparent border-[#246B44] text-[#FBFBF9] hover:bg-[#1C5938] hover:text-[#E5FE47] font-mono text-xs"
            onClick={() => {
              const el = document.getElementById('generator-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            CHECK
          </Button>
          <Button 
            size="sm" 
            className="bg-[#E5FE47] text-[#0F3822] hover:bg-[#d4f332] font-mono font-bold text-xs shadow-md"
            onClick={() => {
              const el = document.getElementById('generator-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Sparkles className="w-3.5 h-3.5 mr-1" /> BUILD ID CARD
          </Button>
        </div>
      </div>
    </header>
  );
};
