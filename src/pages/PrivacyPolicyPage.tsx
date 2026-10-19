import React from 'react';
import { ShieldCheck, Lock, EyeOff, Server, FileText } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 bg-[#F8F4EC]">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#651D32]/10 border border-[#651D32]/20 text-[#651D32] rounded text-xs font-bold uppercase tracking-wider mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Institutional Transparency</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#181719] tracking-tight">
          Privacy Policy
        </h1>
        <div className="w-16 h-0.5 mx-auto my-4 bg-[#651D32]" />
        
        <p className="text-xs font-mono uppercase tracking-widest text-[#77716E]">
          Effective Date: October 2026 · Students Federation of Bikaner
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-xl shadow-sm border border-[#E4DCCE] space-y-8 text-sm text-[#181719]/85 leading-relaxed">
        
        {/* Intro */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-[#181719]">
            1. Overview & Commitment to Student Privacy
          </h2>
          <p>
            The Students Federation of Bikaner ("SFB", "we", "us") is an independent student collective movement in Bikaner, Rajasthan. We operate this digital platform to support students, raise cyber awareness, receive grievances, and encourage constructive participation.
          </p>
          <p>
            We take student confidentiality with the highest seriousness. We minimize data collection by default and never sell, trade, or monetize any student information.
          </p>
        </section>

        {/* What info we collect */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-[#181719]">
            2. Information We Collect and What Is Optional
          </h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>
              <strong>Issue Reports (Private):</strong> Students may report concerns including cyberbullying, blackmail, impersonation, or harassment. You can choose between:
              <ul className="list-circle pl-5 mt-1 space-y-1">
                <li><em>Anonymous Submission:</em> Requires only the category and incident description. No name, email, phone number, or academic institution is collected.</li>
                <li><em>Identified Submission:</em> Name, email, and optional phone number are collected solely if you request personalized follow-up guidance.</li>
              </ul>
            </li>
            <li>
              <strong>Membership Applications:</strong> We collect your full name, email address, school or college name, city, areas of interest, and optional statement of motivation.
            </li>
            <li>
              <strong>Student Suggestions (Share an Idea):</strong> Requires an idea title, category, and description. Submitter name and email are strictly optional.
            </li>
            <li>
              <strong>Contact Inquiries:</strong> Subject and message are required. Name and email are optional unless you request an answer.
            </li>
          </ul>
        </section>

        {/* Technical Limits of Anonymity */}
        <section className="space-y-3 p-4 bg-stone-50 rounded-lg border border-stone-200">
          <h2 className="font-serif text-lg font-bold text-[#181719] flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-[#651D32]" />
            <span>3. How Anonymous Reporting Works & Technical Limits</span>
          </h2>
          <p>
            When you select anonymous reporting, the application does not prompt for or save your name or contact details. We do not attach submitter IP addresses to report records in our database.
          </p>
          <p className="text-xs text-stone-600">
            <strong>Important Technical Note:</strong> While our application does not record identifying data, absolute anonymity on the internet cannot be mathematically guaranteed. Standard internet routing, cloud server infrastructure, DNS providers, or network security firewalls may independently record basic connection logs. Students on institutional or shared school computers are advised to use private/incognito browsing windows.
          </p>
        </section>

        {/* Storage and Access Control */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-[#181719]">
            4. Storage, Cloud Security Rules, and Access Control
          </h2>
          <p>
            Data submitted to this platform is stored in dedicated Firebase Cloud Firestore collections secured with cloud security rules:
          </p>
          <ul className="space-y-1.5 list-disc pl-5 text-xs text-stone-700">
            <li>Public visitors have permission to <em>create</em> submissions, but <strong>zero permission to read, query, or enumerate</strong> reports, applications, or contact messages.</li>
            <li>Submissions are never displayed on public feeds, search engines, or open community dashboards.</li>
            <li>Access is restricted solely to authorized, confidential caseworkers within our collective for assessment and support.</li>
          </ul>
        </section>

        {/* Data Retention */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-[#181719]">
            5. Retention & User Rights
          </h2>
          <p>
            We retain grievance reports only for as long as needed to provide guidance or establish aggregate safety trends. If you submitted an identified report or application and wish to request its correction or deletion, you may contact our privacy liaison.
          </p>
        </section>

        {/* Third-Party Services */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-[#181719]">
            6. Third-Party Services & Infrastructure
          </h2>
          <p>
            The platform utilizes Google Cloud Firebase for enterprise cloud storage, standard containerized hosting, and typography delivery via Google Fonts. When external links (such as to our official Instagram) are clicked, you are subject to the privacy terms of those respective platforms.
          </p>
        </section>

        {/* Cookies */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-[#181719]">
            7. Cookies & Analytics
          </h2>
          <p>
            We do not use advertising trackers, commercial cookies, or cross-site tracking pixels. Browser local session storage is used strictly for technical presentation state (such as remembering that the opening animation has completed during your current session).
          </p>
        </section>

        {/* Privacy Contact */}
        <section className="space-y-3 pt-4 border-t border-stone-200">
          <h2 className="font-serif text-xl font-bold text-[#181719]">
            8. Contacting Us Regarding Privacy
          </h2>
          <p>
            If you have questions, concerns, or requests regarding this Privacy Policy or your submitted data, you can reach out through our official <a href="#contact" className="text-[#651D32] font-semibold underline">Contact Form</a> or via our verified Instagram account:
          </p>
          <div className="p-3 bg-stone-100 rounded font-mono text-xs text-stone-800 break-all select-all">
            @students_federation_bkn
          </div>
        </section>

      </div>
    </div>
  );
};
