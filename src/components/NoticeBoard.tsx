import React from 'react';
import { Pin, Sparkles, FileText, CheckCircle2 } from 'lucide-react';

export const NoticeBoard: React.FC = () => {
  return (
    <section id="notice-board" className="py-16 px-4 bg-[#0D301D] border-b border-[#246B44]/40 relative">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <div className="inline-block text-[#A1C1B0] font-mono text-xs uppercase tracking-widest mb-2">PINNED UP</div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#E5FE47]">NOTICE BOARD</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Note 1 */}
          <div className="bg-[#FBFBF9] text-[#0F3822] p-6 rounded-lg shadow-xl relative transform -rotate-1 hover:rotate-0 transition-transform">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-red-500">
              <Pin className="w-6 h-6 fill-red-500 text-red-700 drop-shadow" />
            </div>
            <div className="text-xs font-mono text-[#1C5938] font-bold mb-1">FEATURE #1</div>
            <h3 className="text-xl font-serif font-bold mb-3">HH Goa Frame / ID Card Generator</h3>
            <p className="text-sm text-gray-700 mb-4 leading-relaxed">
              Design your own HH Goa 2026 themed photo frame generator. Use that same generator to bring your teammates into one combined frame. Post it on X with a quick how-to and you're done.
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-gray-200 text-xs font-mono text-gray-500">
              <span className="bg-[#E5FE47] text-[#0F3822] px-2 py-0.5 rounded font-bold">ACTIVE FEATURE</span>
              <span>AUG 13, 11:59 PM IST</span>
            </div>
          </div>

          {/* Note 2 */}
          <div className="bg-[#FBFBF9] text-[#0F3822] p-6 rounded-lg shadow-xl relative transform rotate-1 hover:rotate-0 transition-transform">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-yellow-500">
              <Pin className="w-6 h-6 fill-yellow-400 text-yellow-600 drop-shadow" />
            </div>
            <div className="text-xs font-mono text-[#1C5938] font-bold mb-1">INFO & FAQ</div>
            <h3 className="text-xl font-serif font-bold mb-3">HHGoa'26 : How thigs actually works</h3>
            <p className="text-sm text-gray-700 mb-4 leading-relaxed">
              Fast-track your selection by publishing your Builder ID card with <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono text-[#0F3822]">#FrameInGoa</code>. Curators review top engagement posts daily.
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-gray-200 text-xs font-mono text-gray-500">
              <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">GUIDELINES</span>
              <span>AUG ||, 7:59 PM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
