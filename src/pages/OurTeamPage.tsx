import React from 'react';
import { OfficialEmblem } from '../components/OfficialEmblem';
import type { NavigationPage } from '../types';
import movementImg from '../assets/images/collective_movement_1792348302729.jpg';
import shieldImg from '../assets/images/student_support_shield_1792348302683.jpg';
import { 
  Users2, 
  ShieldCheck, 
  GraduationCap, 
  Scale, 
  Lock, 
  HeartHandshake, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface OurTeamPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const OurTeamPage: React.FC<OurTeamPageProps> = ({ onNavigate }) => {
  const standForItems = [
    { title: 'Education', desc: 'Promoting critical literacy, academic access, and transparent student governance.' },
    { title: 'Unity', desc: 'Fostering shared solidarity among students regardless of background or institution.' },
    { title: 'Awareness', desc: 'Proactively educating youth regarding digital hygiene, privacy, and cyber threats.' },
    { title: 'Responsibility', desc: 'Acting with rigorous ethics, strict confidentiality, and measured prudence.' },
    { title: 'Student Welfare', desc: 'Standing up for students facing institutional friction, bullying, or intimidation.' },
    { title: 'Constructive Action', desc: 'Transforming legitimate grievances into organized, tangible positive change.' }
  ];

  return (
    <div className="pt-24 pb-20 bg-[#F8F4EC]">
      
      {/* Editorial Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#651D32]/10 border border-[#651D32]/20 text-[#651D32] rounded text-xs font-bold uppercase tracking-wider mb-4">
          <Users2 className="w-3.5 h-3.5" />
          <span>The Anonymous Collective</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#181719] tracking-tight">
          One Collective. One Purpose.
        </h1>
        <div className="w-16 h-0.5 mx-auto my-4 bg-[#651D32]" />
        
        <p className="text-base sm:text-lg text-[#181719]/80 max-w-2xl mx-auto leading-relaxed">
          Built around a shared commitment to education, student welfare, awareness, and constructive action.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Section A: A Collective Movement */}
        <section className="bg-white p-8 sm:p-12 rounded-xl shadow-sm border border-[#E4DCCE]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#651D32] block">
                Philosophy of Leadership
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#181719]">
                A Movement Without Personal Vanity
              </h2>
              <div className="w-12 h-0.5 bg-[#651D32]" />
              
              <p className="text-sm sm:text-base text-[#181719]/80 leading-relaxed">
                Traditional student bodies frequently turn into stepping stones for personal ambition, 
                political posturing, and individual prestige. The Students Federation of Bikaner is 
                founded upon an entirely different principle: <strong>complete collective anonymity</strong>.
              </p>

              <p className="text-sm sm:text-base text-[#181719]/80 leading-relaxed">
                Our founders, coordinators, caseworkers, and volunteers do not publish their names, 
                personal photographs, or personal social media profiles. We believe that true student 
                service requires zero self-aggrandizement. The work speaks for itself, and the safety 
                of every student remains our solitary priority.
              </p>

              <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-600 flex items-start gap-3">
                <Lock className="w-4 h-4 text-[#651D32] shrink-0 mt-0.5" />
                <span>
                  By maintaining collective anonymity, our members operate without fear of institutional 
                  reprisal, and students seeking help know their concerns are held by an impartial collective rather than individual gatekeepers.
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-[#250812] rounded-lg border border-[#C5A36A]/30 text-center text-white">
              <OfficialEmblem size="lg" className="mb-4" />
              <h3 className="font-serif text-lg font-bold text-[#F8F4EC] mb-1">
                The SFB Seal
              </h3>
              <p className="text-xs text-[#C5A36A] uppercase tracking-wider mb-4">
                Emblem of Sovereign Student Solidarity
              </p>
              <p className="text-xs text-white/70 italic leading-relaxed">
                "Not one name above another; all united for Bikaner's student community."
              </p>
            </div>

          </div>
        </section>

        {/* Section B: What We Stand For */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#651D32] block mb-1">
              Core Tenets
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#181719]">
              What We Stand For
            </h2>
            <div className="w-12 h-0.5 mx-auto mt-2 bg-[#651D32]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {standForItems.map((item) => (
              <div 
                key={item.title}
                className="bg-white p-6 rounded-lg border border-[#E4DCCE] shadow-sm hover:border-[#651D32]/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#3D101E] flex items-center justify-center mb-4 text-[#E4CEA4]">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#181719] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#181719]/75 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section C: Our Approach */}
        <section className="bg-gradient-to-br from-[#3D101E] to-[#250812] text-white p-8 sm:p-12 rounded-xl shadow-xl border border-[#C5A36A]/30">
          <div className="max-w-3xl mx-auto space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E4CEA4] block">
              Methodology & Ethics
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Our Approach
            </h2>
            <p className="text-sm sm:text-base text-white/85 leading-relaxed">
              We approach every issue with four rigorous pillars:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C5A36A] block mb-1">
                  1. Empathetic Listening
                </span>
                <p className="text-xs text-white/75 leading-relaxed">
                  Every concern submitted is received with serious attention, never trivialized or dismissed.
                </p>
              </div>

              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C5A36A] block mb-1">
                  2. Strict Privacy
                </span>
                <p className="text-xs text-white/75 leading-relaxed">
                  Reports never appear in public feeds, social media, or public directories.
                </p>
              </div>

              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C5A36A] block mb-1">
                  3. Responsible Guidance
                </span>
                <p className="text-xs text-white/75 leading-relaxed">
                  We clarify limits, avoid making false legal promises, and guide victims toward safe solutions.
                </p>
              </div>

              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C5A36A] block mb-1">
                  4. Constructive Action
                </span>
                <p className="text-xs text-white/75 leading-relaxed">
                  We direct student energy into building educational campaigns and peer awareness networks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section D: Working Toward Change */}
        <section className="bg-white p-8 sm:p-12 rounded-xl border border-[#E4DCCE] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="rounded-lg overflow-hidden border border-[#E4DCCE] shadow-md">
                <img
                  src={movementImg}
                  alt="Students advancing together"
                  referrerPolicy="no-referrer"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#651D32] block">
                Collective Future
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#181719]">
                Working Toward Change
              </h2>
              <p className="text-sm text-[#181719]/80 leading-relaxed">
                Change does not require figureheads; it requires consistent, principled action. 
                Whether organizing digital safety awareness in schools, publishing verified notices, 
                or reviewing institutional grievances, our collective operates smoothly because each 
                volunteer serves the mission, not their personal brand.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('membership')}
                  className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#651D32] hover:bg-[#3D101E] rounded transition-colors cursor-pointer"
                >
                  Apply to Join the Collective
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#181719] hover:text-[#651D32] transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
