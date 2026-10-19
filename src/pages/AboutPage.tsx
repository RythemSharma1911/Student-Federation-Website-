import React from 'react';
import { OfficialEmblem } from '../components/OfficialEmblem';
import type { NavigationPage } from '../types';
import fortImg from '../assets/images/bikaner_sandstone_hero_1792348303028.jpg';
import movementImg from '../assets/images/collective_movement_1792348302729.jpg';
import { 
  GraduationCap, 
  Users2, 
  Scale, 
  Eye, 
  HeartHandshake, 
  Sparkles, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const values = [
    {
      title: 'Education',
      desc: 'Advancing access to quality academic resources, transparent institutional dialogue, and empowering youth through critical inquiry.',
      icon: <GraduationCap className="w-5 h-5 text-[#C5A36A]" />
    },
    {
      title: 'Unity',
      desc: 'Uniting students across various disciplines, schools, and colleges under a shared vision of mutual protection and solidarity.',
      icon: <Users2 className="w-5 h-5 text-[#C5A36A]" />
    },
    {
      title: 'Responsibility',
      desc: 'Upholding strict ethical responsibility, maintaining absolute privacy for reporting students, and avoiding sensationalism.',
      icon: <Scale className="w-5 h-5 text-[#C5A36A]" />
    },
    {
      title: 'Awareness',
      desc: 'Educating students on cyber safety, preventing digital extortion, and cultivating responsible online citizenship.',
      icon: <Eye className="w-5 h-5 text-[#C5A36A]" />
    },
    {
      title: 'Student Welfare',
      desc: 'Addressing genuine student hardships, campus welfare concerns, and mental well-being with empathy and confidentiality.',
      icon: <HeartHandshake className="w-5 h-5 text-[#C5A36A]" />
    },
    {
      title: 'Constructive Action',
      desc: 'Channeling student voice into positive, structured problem-solving rather than hollow protest or political factionalism.',
      icon: <Sparkles className="w-5 h-5 text-[#C5A36A]" />
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-[#F8F4EC]">
      
      {/* Editorial Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-[#651D32] block mb-2">
          Editorial & Manifesto
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#181719] tracking-tight">
          About the Federation
        </h1>
        <div className="w-16 h-0.5 mx-auto my-4 bg-[#651D32]" />
        <p className="text-base sm:text-lg text-[#181719]/80 max-w-2xl mx-auto leading-relaxed">
          For People. For Education. For Change.
        </p>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Section A: Our Story */}
        <section className="bg-white p-8 sm:p-12 rounded-xl shadow-sm border border-[#E4DCCE]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#651D32] block">
                Section I · Foundation
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#181719]">
                Our Story
              </h2>
              <p className="text-sm sm:text-base text-[#181719]/80 leading-relaxed">
                The Students Federation of Bikaner was formed as a student-focused collective dedicated 
                to encouraging awareness, constructive participation, education, and student welfare across 
                the Bikaner region.
              </p>
              <p className="text-sm sm:text-base text-[#181719]/80 leading-relaxed">
                Recognizing that students frequently encounter challenges—ranging from academic distress 
                to online exploitation—without a reliable, unbiased channel to turn to, the Federation 
                emerged to provide a dignified civic sanctuary. We operate as an independent civic body, 
                free from partisan interests, dedicated solely to the best interests of the student body.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-lg overflow-hidden border border-[#E4DCCE] shadow-md">
                <img
                  src={fortImg}
                  alt="Bikaner Architecture"
                  referrerPolicy="no-referrer"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section B & C: Mission and Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-[#3D101E] text-white p-8 rounded-xl shadow-md border border-[#C5A36A]/20 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E4CEA4] block">
              Section II · Purpose
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#F8F4EC]">
              Our Mission
            </h2>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A36A] mt-2 shrink-0" />
                <span>Encourage active and informed student participation in educational life.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A36A] mt-2 shrink-0" />
                <span>Provide a private, confidential channel for students to report grievances without fear of retribution.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A36A] mt-2 shrink-0" />
                <span>Promote comprehensive cyber awareness and digital safety among students.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A36A] mt-2 shrink-0" />
                <span>Support educational and student-welfare initiatives across local colleges and schools.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A36A] mt-2 shrink-0" />
                <span>Collect student suggestions and foster constructive community dialogue.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-[#E4DCCE] space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#651D32] block">
              Section III · Aspiration
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#181719]">
              Our Vision
            </h2>
            <p className="text-sm sm:text-base text-[#181719]/80 leading-relaxed">
              We envision an educational community in which every student feels heard, informed, 
              respected, and encouraged to participate positively.
            </p>
            <p className="text-sm sm:text-base text-[#181719]/80 leading-relaxed">
              In this environment, institutions and peers work cooperatively, digital environments 
              are safeguarded from malicious harm, and every student possesses the resources and 
              confidence to shape a brighter academic future.
            </p>
          </div>

        </div>

        {/* Section D: Our Values */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#651D32] block mb-1">
              Guiding Principles
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#181719]">
              Our Values
            </h2>
            <div className="w-12 h-0.5 mx-auto mt-2 bg-[#651D32]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div 
                key={v.title}
                className="bg-white p-6 rounded-lg border border-[#E4DCCE] shadow-sm hover:border-[#651D32]/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#F8F4EC] border border-[#C5A36A]/40 flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#181719] mb-2">
                  {v.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#181719]/75 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section E: Our Identity */}
        <section className="bg-gradient-to-br from-[#250812] to-[#3D101E] text-white p-8 sm:p-12 rounded-xl shadow-xl border border-[#C5A36A]/30">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="shrink-0">
              <OfficialEmblem size="lg" />
            </div>
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E4CEA4] block">
                The Principle of Anonymity
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Our Collective Identity
              </h2>
              <p className="text-sm text-white/85 leading-relaxed">
                The Students Federation of Bikaner operates strictly as a collective movement. 
                In keeping with our founding ethos, all organizers, volunteers, and coordination 
                members maintain anonymity.
              </p>
              <p className="text-sm text-white/80 leading-relaxed">
                By removing individual personalities, egos, and public credit from the equation, 
                the federation prevents personal bias, protects organizers from external pressures, 
                and ensures that our focus remains entirely on the welfare of the students we serve.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('our-team')}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C5A36A] hover:text-[#E4CEA4] cursor-pointer"
                >
                  <span>Explore the Collective Structure</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
