import React from 'react';
import { ExternalLink, Flame, Trophy, Award, Sparkles } from 'lucide-react';

export const CelebRadar: React.FC = () => {
  const radarItems = [
    { rank: 1, name: 'Tenzin Gravity', handle: '@tenzingravity', track: 'AI Agents', views: '69.3k', score: '99' },
    { rank: 2, name: 'AirDrop', handle: '@airdrop_xyz', track: 'Solana Dev', views: '298.6k', score: '97' },
    { rank: 3, name: 'Ctrl-B', handle: '@ctrl_builder', track: 'Smart Contracts', views: '45k', score: '95' },
    { rank: 4, name: 'Buidlfrens', handle: '@buidlfrens', track: 'ZK Cryptography', views: '38.1k', score: '93' },
    { rank: 5, name: 'Tech Sonic', handle: '@techsonic', track: 'Frontend & UX', views: '179.4k', score: '91' },
  ];

  return (
    <section className="py-16 px-4 bg-[#0A2616] border-b border-[#246B44]/40">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-[#E5FE47] font-mono text-xs uppercase tracking-widest mb-2 bg-[#1C5938] px-3 py-1 rounded-full border border-[#246B44]">
            <Flame className="w-3.5 h-3.5 text-[#FF4A8D]" /> GOA CELEB RADAR
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#E5FE47]">Top Shared #FrameInGoa Posts</h2>
        </div>

        <div className="bg-[#15472E] border border-[#246B44] rounded-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-mono text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#1C5938] text-[#A1C1B0] border-b border-[#246B44]">
                  <th className="p-4 font-bold"># RANK</th>
                  <th className="p-4 font-bold">BUILDER / HANDLE</th>
                  <th className="p-4 font-bold">TRACK</th>
                  <th className="p-4 font-bold">VIEWS</th>
                  <th className="p-4 font-bold text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#246B44]/50 text-[#FBFBF9]">
                {radarItems.map((item) => (
                  <tr key={item.rank} className="hover:bg-[#1C5938]/40 transition-colors">
                    <td className="p-4 font-bold text-[#E5FE47]">
                      {item.rank === 1 ? '🥇 01' : item.rank === 2 ? '🥈 02' : item.rank === 3 ? '🥉 03' : `0${item.rank}`}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-[#FBFBF9]">{item.name}</div>
                      <div className="text-xs text-[#A1C1B0]">{item.handle}</div>
                    </td>
                    <td className="p-4">
                      <span className="bg-[#0F3822] text-[#E5FE47] px-2 py-1 rounded border border-[#246B44] text-[11px]">
                        {item.track}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-[#E5FE47]">{item.views}</td>
                    <td className="p-4 text-right">
                      <a
                        href="https://twitter.com/search?q=%23FrameInGoa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#E5FE47] hover:underline"
                      >
                        View Post <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-[#123E25] text-center font-mono text-xs text-[#A1C1B0] border-t border-[#246B44]">
            Posts tracked via hashtag <code className="text-[#E5FE47]">#FrameInGoa</code> on X & Farcaster. Updated hourly.
          </div>
        </div>
      </div>
    </section>
  );
};
