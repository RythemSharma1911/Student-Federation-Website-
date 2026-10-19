import React from 'react';
import { FileText, AlertTriangle, ShieldCheck, Scale } from 'lucide-react';

export const TermsAndDisclaimerPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 bg-[#F8F4EC]">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#651D32]/10 border border-[#651D32]/20 text-[#651D32] rounded text-xs font-bold uppercase tracking-wider mb-4">
          <Scale className="w-3.5 h-3.5" />
          <span>Institutional Terms</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#181719] tracking-tight">
          Terms of Use & Disclaimer
        </h1>
        <div className="w-16 h-0.5 mx-auto my-4 bg-[#651D32]" />
        
        <p className="text-xs font-mono uppercase tracking-widest text-[#77716E]">
          Effective Date: October 2026 · Students Federation of Bikaner
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-xl shadow-sm border border-[#E4DCCE] space-y-8 text-sm text-[#181719]/85 leading-relaxed">
        
        {/* Appropriate Use */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-[#181719]">
            1. Purpose and Appropriate Use of the Platform
          </h2>
          <p>
            This website is provided by the Students Federation of Bikaner ("SFB") for the positive, educational benefit of students. Users agree to access the platform in good faith, and to respect fellow students, educators, and institutional members.
          </p>
          <p>
            You agree not to use the platform to transmit defamatory content, upload malicious computer code, execute automated spam submissions, harass volunteers, or impair the website's technical availability.
          </p>
        </section>

        {/* Not an Emergency Service */}
        <section className="space-y-3 p-5 bg-amber-50 rounded-lg border border-amber-200">
          <div className="flex items-center gap-2 text-amber-900 font-bold font-serif text-lg">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
            <span>2. Essential Safety Disclaimer — Not an Emergency Service</span>
          </div>
          <p className="text-amber-950 font-medium">
            The Students Federation of Bikaner is an independent student advocacy and awareness collective. <strong>We are NOT a law-enforcement agency, police department, judiciary, or medical/crisis emergency dispatch.</strong>
          </p>
          <p className="text-xs text-amber-900/90 leading-relaxed">
            If you or someone you know is in immediate physical danger, facing violence, experiencing severe self-harm crisis, or subject to imminent criminal threats, please dial emergency services (112 or local police) immediately. Do not rely on this website for emergency rescue or immediate physical protection.
          </p>
        </section>

        {/* Submissions & Truthfulness */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-[#181719]">
            3. Responsibilities of Submitting Users
          </h2>
          <p>
            Users who submit issue reports, membership forms, suggestions, or contact messages must provide accurate, truthful information to the best of their knowledge.
          </p>
          <p>
            Knowingly submitting fabricated accusations, spamming the intake system, or attempting to defame other students through fraudulent reports is strictly forbidden. While we respect anonymity, systematically abusive submissions may result in technical blocking or intake restriction.
          </p>
        </section>

        {/* No Guarantee of Investigation or Outcome */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-[#181719]">
            4. Scope of Support & No Guarantee of Outcomes
          </h2>
          <p>
            Submitting a grievance report to SFB does not create a formal attorney-client relationship, does not guarantee legal action, and does not ensure that external third-party digital platforms (e.g., social networks) will remove content or enforce penalties.
          </p>
          <p>
            Our volunteer collective evaluates concerns to offer moral support, digital safety guidance, peer advocacy, or redirection to appropriate institutional counseling channels where feasible.
          </p>
        </section>

        {/* Membership Application Review */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-[#181719]">
            5. Membership Applications
          </h2>
          <p>
            Submitting an application form on the "Become a Member" page does not automatically grant formal membership, credentialing, or voting authorization. All applications are received in pending status and reviewed by the collective in accordance with internal criteria and regional initiative capacity.
          </p>
        </section>

        {/* Official Notices */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-[#181719]">
            6. Official Bulletins & Publication Validity
          </h2>
          <p>
            Official notices published on the Notices page reflect information accurate as of their stated publication date. Academic schedules, administrative advisories, and cyber recommendations may evolve; visitors should always verify current university and institutional circulars.
          </p>
        </section>

        {/* Third-Party Links */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-[#181719]">
            7. External Channels & Third-Party Platforms
          </h2>
          <p>
            Links to external services, including our official Instagram (<a href="https://www.instagram.com/students_federation_bkn/" target="_blank" rel="noopener noreferrer" className="text-[#651D32] underline font-medium">@students_federation_bkn</a>), are provided for convenience. We are not responsible for the availability, privacy practices, or algorithmic content delivery of third-party platforms.
          </p>
        </section>

        {/* Contact */}
        <section className="space-y-3 pt-4 border-t border-stone-200">
          <h2 className="font-serif text-xl font-bold text-[#181719]">
            8. Questions Regarding Terms
          </h2>
          <p>
            For questions or inquiries regarding these Terms and Disclaimer, submit a message via the <a href="#contact" className="text-[#651D32] font-semibold underline">Contact Form</a> or message us on Instagram:
          </p>
          <div className="p-3 bg-stone-100 rounded font-mono text-xs text-stone-800 break-all select-all">
            @students_federation_bkn
          </div>
        </section>

      </div>
    </div>
  );
};
