import React from 'react';
import { Terminal, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#082213] border-t border-[#246B44] py-16 px-4 text-center relative overflow-hidden">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="bg-[#E5FE47] text-[#0F3822] p-1.5 rounded font-mono font-bold text-xs">
            1:47 PM STUDIO
          </div>
          <span className="text-[#FBFBF9] font-serif text-lg font-bold">HACKER HOUSE GOA</span>
        </div>

        <p className="text-sm text-[#A1C1B0] max-w-md mx-auto mb-8 font-mono">
          Goa, India · 28 – 31 Oct 2026. The premier gathering of elite builders, protocol researchers, and AI agents.
        </p>

        <div className="flex items-center justify-center gap-6 text-xs font-mono text-[#A1C1B0] mb-8">
          <a href="https://hhgoa.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E5FE47] transition-colors">
            Official Site
          </a>
          <span>•</span>
          <a href="https://twitter.com/intent/tweet?text=%23FrameInGoa" target="_blank" rel="noopener noreferrer" className="hover:text-[#E5FE47] transition-colors">
            Share #FrameInGoa
          </a>
          <span>•</span>
          <a href="#generator-section" className="hover:text-[#E5FE47] transition-colors">
            ID Card Generator
          </a>
        </div>

        <div className="text-xs font-mono text-[#6A947D] border-t border-[#246B44]/50 pt-6">
          © 2026 Hacker House Goa & 1:47 PM Studio. All rights reserved. Built with AI.
        </div>
      </div>
    </footer>
  );
};
