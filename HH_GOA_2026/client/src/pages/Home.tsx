import React from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { NoticeBoard } from '@/components/NoticeBoard';
import { GeneratorStudio } from '@/components/GeneratorStudio';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0F3822] text-[#FBFBF9]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <NoticeBoard />
        <GeneratorStudio />
      </main>
      <Footer />
    </div>
  );
}
