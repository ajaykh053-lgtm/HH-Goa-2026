import React, { useState, useRef, useEffect, useId } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Upload, Download, Share2, Sparkles, RefreshCw, Terminal, Move, ZoomIn } from 'lucide-react';
import { toast } from 'sonner';

export const GeneratorStudio: React.FC = () => {
  const nameInputId = useId();
  const roleInputId = useId();
  const locationInputId = useId();

  const [name, setName] = useState('Alex Rivers');
  const [role, setRole] = useState('AI Engineer & Fullstack Hacker');
  const [location, setLocation] = useState('Bengaluru, India');
  const [track, setTrack] = useState('AI & Agents');
  const [themeStyle, setThemeStyle] = useState('classic');
  const [builderId, setBuilderId] = useState('#HHG-2026-042');
  const [photoUrl, setPhotoUrl] = useState<string>('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80');

  // New photo adjustment controls
  const [photoZoom, setPhotoZoom] = useState<number>(100); // 50% to 200%
  const [photoOffsetX, setPhotoOffsetX] = useState<number>(0); // -100 to 100 px
  const [photoOffsetY, setPhotoOffsetY] = useState<number>(0); // -100 to 100 px

  const [canvasDataUrl, setCanvasDataUrl] = useState<string | null>(null);

  // Generate random builder ID on mount
  useEffect(() => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    setBuilderId(`#HHG-2026-${randomNum}`);
  }, []);

  // Handle photo upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image size should be less than 10MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoUrl(event.target.result as string);
          setPhotoZoom(100);
          setPhotoOffsetX(0);
          setPhotoOffsetY(0);
          toast.success('Photo uploaded successfully! Use sliders to adjust fit.');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Preset avatar samples
  const sampleAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
  ];

  // Render canvas to generate high-res ID Card PNG
  const generateCanvasImage = (): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const width = 1000;
      const height = 1250; // Portrait card format 4:5
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve('');
        return;
      }

      // 1. Background Fill based on theme
      let bgGradient;
      if (themeStyle === 'classic') {
        bgGradient = ctx.createLinearGradient(0, 0, 0, height);
        bgGradient.addColorStop(0, '#0F3822');
        bgGradient.addColorStop(1, '#082012');
      } else if (themeStyle === 'neon') {
        bgGradient = ctx.createLinearGradient(0, 0, width, height);
        bgGradient.addColorStop(0, '#0a0a0a');
        bgGradient.addColorStop(1, '#0F3822');
      } else if (themeStyle === 'sunset') {
        bgGradient = ctx.createLinearGradient(0, 0, 0, height);
        bgGradient.addColorStop(0, '#1E1B4B');
        bgGradient.addColorStop(0.5, '#0F3822');
        bgGradient.addColorStop(1, '#311026');
      } else {
        bgGradient = ctx.createLinearGradient(0, 0, 0, height);
        bgGradient.addColorStop(0, '#F5F5F0');
        bgGradient.addColorStop(1, '#E2E8DF');
      }

      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Decorative pattern / border frame
      const isLight = themeStyle === 'light';
      ctx.strokeStyle = '#246B44';
      ctx.lineWidth = 12;
      ctx.strokeRect(40, 40, width - 80, height - 80);

      // Inner subtle border
      ctx.strokeStyle = isLight ? '#CBD5E1' : '#1C5938';
      ctx.lineWidth = 3;
      ctx.strokeRect(56, 56, width - 112, height - 112);

      // 3. Header branding
      ctx.fillStyle = isLight ? '#0F3822' : '#E5FE47';
      ctx.font = 'bold 36px "Bebas Neue", sans-serif';
      ctx.fillText('HACKER HOUSE GOA 2026', 80, 120);

      ctx.fillStyle = isLight ? '#64748B' : '#A1C1B0';
      ctx.font = 'bold 20px "JetBrains Mono", monospace';
      ctx.fillText('GOA, INDIA · 28-31 OCT 2026', 80, 155);

      // 4. Draw Avatar Photo with circular/rounded mask and zoom/offset support
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.save();
        const avatarX = 80;
        const avatarY = 190;
        const avatarSize = 340;
        const radius = 24;

        // Rounded rect for avatar
        ctx.beginPath();
        ctx.roundRect(avatarX, avatarY, avatarSize, avatarSize, radius);
        ctx.clip();

        // Calculate zoom and offset
        const zoomMultiplier = photoZoom / 100;
        const imgAspect = img.width / img.height;
        let drawW = avatarSize * zoomMultiplier;
        let drawH = (avatarSize / imgAspect) * zoomMultiplier;

        if (imgAspect > 1) {
          drawW = avatarSize * imgAspect * zoomMultiplier;
          drawH = avatarSize * zoomMultiplier;
        } else {
          drawW = avatarSize * zoomMultiplier;
          drawH = (avatarSize / imgAspect) * zoomMultiplier;
        }

        const offsetX = avatarX + (avatarSize - drawW) / 2 + photoOffsetX * 2;
        const offsetY = avatarY + (avatarSize - drawH) / 2 + photoOffsetY * 2;

        ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
        ctx.restore();

        // Avatar Border frame
        ctx.strokeStyle = '#E5FE47';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.roundRect(avatarX, avatarY, avatarSize, avatarSize, radius);
        ctx.stroke();

        // 5. Side Badge / Stamp (#FrameInGoa)
        ctx.save();
        ctx.translate(width - 180, 240);
        ctx.rotate(0.15);
        ctx.fillStyle = '#E5FE47';
        ctx.strokeStyle = '#0F3822';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.roundRect(-80, -35, 160, 70, 12);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#0F3822';
        ctx.font = 'bold 22px "Bebas Neue", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('#FrameInGoa', 0, 8);
        ctx.restore();

        // 6. Name and Role details section
        const detailsY = 600;
        ctx.fillStyle = isLight ? '#0F3822' : '#FBFBF9';
        ctx.font = 'bold 52px "Playfair Display", serif';
        ctx.textAlign = 'left';
        ctx.fillText(name || 'Anonymous Hacker', 80, detailsY);

        ctx.fillStyle = '#E5FE47';
        ctx.font = 'bold 24px "JetBrains Mono", monospace';
        ctx.fillText(role || 'Builder & Researcher', 80, detailsY + 45);

        // Metadata grid (Track, Location, ID)
        const metaY = 700;
        ctx.fillStyle = isLight ? '#1E293B' : '#15472E';
        ctx.beginPath();
        ctx.roundRect(80, metaY, width - 160, 180, 16);
        ctx.fill();
        ctx.strokeStyle = '#246B44';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Metadata Text
        ctx.fillStyle = isLight ? '#94A3B8' : '#A1C1B0';
        ctx.font = '16px "JetBrains Mono", monospace';
        ctx.fillText('BUILDER TRACK', 120, metaY + 45);
        ctx.fillText('LOCATION', 420, metaY + 45);
        ctx.fillText('BUILDER ID', 720, metaY + 45);

        ctx.fillStyle = isLight ? '#0F3822' : '#FBFBF9';
        ctx.font = 'bold 22px "JetBrains Mono", monospace';
        ctx.fillText(track, 120, metaY + 85);
        ctx.fillText(location, 420, metaY + 85);
        ctx.fillText(builderId, 720, metaY + 85);

        // Secondary badges row
        ctx.fillStyle = '#E5FE47';
        ctx.font = 'bold 16px "JetBrains Mono", monospace';
        ctx.fillText('✓ VERIFIED BUILDER', 120, metaY + 135);
        ctx.fillText('🌴 1:47 PM STUDIO', 420, metaY + 135);
        ctx.fillText('🚀 GOA 2026', 720, metaY + 135);

        // 7. Footer Bar & Barcode
        const footerY = 940;
        ctx.fillStyle = isLight ? '#E2E8DF' : '#123C24';
        ctx.fillRect(80, footerY, width - 160, 160);
        ctx.strokeStyle = '#246B44';
        ctx.strokeRect(80, footerY, width - 160, 160);

        ctx.fillStyle = isLight ? '#0F3822' : '#FBFBF9';
        ctx.font = 'bold 24px "Bebas Neue", sans-serif';
        ctx.fillText('SCAN TO VERIFY ON HHGOA.COM', 120, footerY + 50);

        ctx.fillStyle = isLight ? '#64748B' : '#A1C1B0';
        ctx.font = '16px "JetBrains Mono", monospace';
        ctx.fillText('Generated instantly via HH Goa Frame Studio.', 120, footerY + 85);
        ctx.fillText('Share your creation on X with #FrameInGoa', 120, footerY + 115);

        // Draw dummy barcode representation inside bounds
        ctx.fillStyle = isLight ? '#0F3822' : '#E5FE47';
        for (let i = 0; i < 24; i++) {
          const w = (i % 3 === 0) ? 6 : 2;
          ctx.fillRect(660 + i * 8, footerY + 35, w, 80);
        }

        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = () => {
        resolve(canvas.toDataURL('image/png'));
      };
      img.src = photoUrl;
    });
  };

  // Update canvas preview on any change
  useEffect(() => {
    generateCanvasImage().then((url) => {
      setCanvasDataUrl(url);
    });
  }, [name, role, location, track, themeStyle, builderId, photoUrl, photoZoom, photoOffsetX, photoOffsetY]);

  // Handle Download
  const handleDownload = () => {
    if (!canvasDataUrl) return;
    const link = document.createElement('a');
    link.download = `HH-Goa-2026-Builder-ID-${name.replace(/\s+/g, '-')}.png`;
    link.href = canvasDataUrl;
    link.click();
    toast.success('ID Card downloaded successfully! 🎉');
  };

  // Handle Share to X (Twitter)
  const handleShareTwitter = () => {
    const tweetText = encodeURIComponent(
      `Just generated my official Builder ID for Hacker House Goa 2026! 🌴☀️ Ready to hack by the beach with amazing builders.\n\nJoin me at hhgoa.com #FrameInGoa #HHGoa2026`
    );
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(twitterUrl, '_blank');
    toast.success('Opening Twitter share intent!');
  };

  return (
    <section id="generator-section" className="py-20 px-4 bg-[#0F3822] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E5FE47]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C5938] border border-[#246B44] text-[#E5FE47] text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" /> BUILDER ID CARD GENERATOR
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#E5FE47] mb-3">
            Build Your HH Goa 2026 ID
          </h2>
          <p className="text-[#A1C1B0] max-w-xl mx-auto text-sm sm:text-base">
            Instant generation. No login wall. Upload your photo, adjust framing with zoom & pan, and download your verified badge instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form & Photo Adjusters */}
          <div className="lg:col-span-6 bg-[#15472E] border border-[#246B44] rounded-2xl p-6 sm:p-8 shadow-2xl">
            <h3 className="text-xl font-serif font-bold text-[#E5FE47] mb-6 flex items-center gap-2">
              <Terminal className="w-5 h-5" /> Hacker Details & Photo Framing
            </h3>

            <div className="space-y-5">
              {/* Photo Upload */}
              <div>
                <Label className="text-xs font-mono text-[#A1C1B0] uppercase tracking-wider mb-2 block">
                  1. Upload Your Photo (JPG, PNG, HEIC)
                </Label>
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-[#E5FE47] shrink-0 bg-[#0F3822]">
                    <img src={photoUrl} alt="Avatar preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#1C5938] hover:bg-[#246B44] border border-[#246B44] text-[#FBFBF9] font-mono text-xs cursor-pointer transition-all">
                      <Upload className="w-4 h-4 text-[#E5FE47]" />
                      <span>Choose Photo / Selfie</span>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                    <p className="text-[11px] text-[#A1C1B0] mt-1 font-mono">Supports portrait, landscape, off-center crops.</p>
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-[11px] font-mono text-[#A1C1B0]">Presets:</span>
                  {sampleAvatars.map((url, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setPhotoUrl(url);
                        setPhotoZoom(100);
                        setPhotoOffsetX(0);
                        setPhotoOffsetY(0);
                      }}
                      className="w-8 h-8 rounded-full overflow-hidden border border-[#246B44] hover:border-[#E5FE47] transition-all"
                    >
                      <img src={url} alt={`Preset ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo Adjustment Controls */}
              <div className="p-4 rounded-xl bg-[#0F3822] border border-[#246B44] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#E5FE47] font-bold flex items-center gap-1.5">
                    <ZoomIn className="w-3.5 h-3.5" /> Adjust Photo Framing
                  </span>
                  <button
                    onClick={() => {
                      setPhotoZoom(100);
                      setPhotoOffsetX(0);
                      setPhotoOffsetY(0);
                      toast.success('Photo framing reset');
                    }}
                    className="text-[11px] font-mono text-[#A1C1B0] hover:text-[#E5FE47] underline"
                  >
                    Reset
                  </button>
                </div>

                {/* Zoom Slider */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-[#A1C1B0] mb-1">
                    <span>Zoom Scale</span>
                    <span>{photoZoom}%</span>
                  </div>
                  <Slider
                    value={[photoZoom]}
                    min={50}
                    max={250}
                    step={5}
                    onValueChange={(val) => setPhotoZoom(val[0])}
                    className="py-1"
                  />
                </div>

                {/* Offset X */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-[#A1C1B0] mb-1">
                    <span>Horizontal Pan (X)</span>
                    <span>{photoOffsetX}px</span>
                  </div>
                  <Slider
                    value={[photoOffsetX]}
                    min={-120}
                    max={120}
                    step={2}
                    onValueChange={(val) => setPhotoOffsetX(val[0])}
                    className="py-1"
                  />
                </div>

                {/* Offset Y */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-[#A1C1B0] mb-1">
                    <span>Vertical Pan (Y)</span>
                    <span>{photoOffsetY}px</span>
                  </div>
                  <Slider
                    value={[photoOffsetY]}
                    min={-120}
                    max={120}
                    step={2}
                    onValueChange={(val) => setPhotoOffsetY(val[0])}
                    className="py-1"
                  />
                </div>
              </div>

              {/* Name */}
              <div>
                <Label htmlFor={nameInputId} className="text-xs font-mono text-[#A1C1B0] uppercase tracking-wider mb-1.5 block">
                  2. Full Name / Hacker Handle
                </Label>
                <Input
                  id={nameInputId}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Rivers"
                  className="bg-[#0F3822] border-[#246B44] text-[#FBFBF9] focus:border-[#E5FE47] font-mono text-sm h-11"
                />
              </div>

              {/* Stack / Role */}
              <div>
                <Label htmlFor={roleInputId} className="text-xs font-mono text-[#A1C1B0] uppercase tracking-wider mb-1.5 block">
                  3. Stack / Role / Title
                </Label>
                <Input
                  id={roleInputId}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. AI Engineer & Fullstack Hacker"
                  className="bg-[#0F3822] border-[#246B44] text-[#FBFBF9] focus:border-[#E5FE47] font-mono text-sm h-11"
                />
              </div>

              {/* Builder Track & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-mono text-[#A1C1B0] uppercase tracking-wider mb-1.5 block">
                    4. Builder Track
                  </Label>
                  <Select value={track} onValueChange={setTrack}>
                    <SelectTrigger className="bg-[#0F3822] border-[#246B44] text-[#FBFBF9] font-mono text-sm h-11">
                      <SelectValue placeholder="Select track" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#15472E] border-[#246B44] text-[#FBFBF9]">
                      <SelectItem value="AI & Agents">🤖 AI & Agents</SelectItem>
                      <SelectItem value="Rust & Solana">🦀 Rust & Solana</SelectItem>
                      <SelectItem value="Smart Contracts">⚡ Smart Contracts</SelectItem>
                      <SelectItem value="Design & Frontend">🎨 Design & Frontend</SelectItem>
                      <SelectItem value="ZK & Cryptography">🔐 ZK & Cryptography</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor={locationInputId} className="text-xs font-mono text-[#A1C1B0] uppercase tracking-wider mb-1.5 block">
                    5. Location
                  </Label>
                  <Input
                    id={locationInputId}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Bengaluru, India"
                    className="bg-[#0F3822] border-[#246B44] text-[#FBFBF9] focus:border-[#E5FE47] font-mono text-sm h-11"
                  />
                </div>
              </div>

              {/* Theme Style */}
              <div>
                <Label className="text-xs font-mono text-[#A1C1B0] uppercase tracking-wider mb-1.5 block">
                  6. Card Theme Style
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => setThemeStyle('classic')}
                    className={`py-2 px-3 rounded-lg font-mono text-xs border transition-all ${
                      themeStyle === 'classic' ? 'bg-[#E5FE47] text-[#0F3822] font-bold border-[#E5FE47]' : 'bg-[#0F3822] text-[#A1C1B0] border-[#246B44]'
                    }`}
                  >
                    Classic
                  </button>
                  <button
                    onClick={() => setThemeStyle('neon')}
                    className={`py-2 px-3 rounded-lg font-mono text-xs border transition-all ${
                      themeStyle === 'neon' ? 'bg-[#E5FE47] text-[#0F3822] font-bold border-[#E5FE47]' : 'bg-[#0F3822] text-[#A1C1B0] border-[#246B44]'
                    }`}
                  >
                    Dark Neon
                  </button>
                  <button
                    onClick={() => setThemeStyle('sunset')}
                    className={`py-2 px-3 rounded-lg font-mono text-xs border transition-all ${
                      themeStyle === 'sunset' ? 'bg-[#E5FE47] text-[#0F3822] font-bold border-[#E5FE47]' : 'bg-[#0F3822] text-[#A1C1B0] border-[#246B44]'
                    }`}
                  >
                    Sunset
                  </button>
                  <button
                    onClick={() => setThemeStyle('light')}
                    className={`py-2 px-3 rounded-lg font-mono text-xs border transition-all ${
                      themeStyle === 'light' ? 'bg-[#E5FE47] text-[#0F3822] font-bold border-[#E5FE47]' : 'bg-[#0F3822] text-[#A1C1B0] border-[#246B44]'
                    }`}
                  >
                    Cream
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Preview & Actions */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="sticky top-24 w-full max-w-md flex flex-col items-center">
              <div className="w-full bg-[#15472E] border-2 border-[#246B44] rounded-2xl p-4 shadow-2xl relative">
                <div className="absolute top-3 right-3 bg-[#E5FE47] text-[#0F3822] font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                  LIVE PREVIEW
                </div>

                <div className="w-full rounded-xl overflow-hidden shadow-lg border border-[#246B44] bg-[#0F3822] aspect-[4/5] flex items-center justify-center">
                  {canvasDataUrl ? (
                    <img src={canvasDataUrl} alt="Generated ID Card Preview" className="w-full h-full object-contain" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-[#A1C1B0]">
                      <RefreshCw className="w-6 h-6 animate-spin text-[#E5FE47]" />
                      <span className="font-mono text-xs">Generating ID Card...</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Button
                    onClick={handleDownload}
                    className="bg-[#E5FE47] text-[#0F3822] hover:bg-[#d4f332] font-mono font-bold text-xs py-5 shadow-lg"
                  >
                    <Download className="w-4 h-4 mr-2" /> DOWNLOAD PNG
                  </Button>
                  <Button
                    onClick={handleShareTwitter}
                    className="bg-[#1C5938] hover:bg-[#246B44] text-[#FBFBF9] border border-[#246B44] font-mono font-bold text-xs py-5 shadow-lg"
                  >
                    <Share2 className="w-4 h-4 mr-2 text-[#E5FE47]" /> SHARE TO X
                  </Button>
                </div>

                <div className="mt-3 text-center">
                  <span className="text-[11px] font-mono text-[#A1C1B0]">
                    Tag <code className="text-[#E5FE47]">#FrameInGoa</code> on X to get featured!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
