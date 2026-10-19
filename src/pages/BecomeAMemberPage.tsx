import React, { useState } from 'react';
import { submitMembershipApplication } from '../lib/api';
import type { MembershipInput, SubmissionResponse } from '../types';
import confetti from 'canvas-confetti';
import { 
  UserPlus, 
  CheckCircle2, 
  AlertTriangle, 
  Send, 
  RotateCcw, 
  ShieldCheck,
  BookOpen,
  Sparkles,
  HeartHandshake
} from 'lucide-react';

export const BecomeAMemberPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [schoolCollege, setSchoolCollege] = useState('');
  const [city, setCity] = useState('Bikaner');
  const [areasOfInterest, setAreasOfInterest] = useState<string[]>(['General Membership']);
  const [whyJoin, setWhyJoin] = useState('');
  const [privacyAcknowledged, setPrivacyAcknowledged] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResponse | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const interestOptions = [
    'General Membership',
    'Volunteer for Events',
    'Cyber Awareness',
    'Education & Student Welfare'
  ];

  const toggleInterest = (option: string) => {
    if (areasOfInterest.includes(option)) {
      if (areasOfInterest.length > 1) {
        setAreasOfInterest(areasOfInterest.filter((item) => item !== option));
      }
    } else {
      setAreasOfInterest([...areasOfInterest, option]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!fullName.trim() || !email.trim() || !schoolCollege.trim() || !city.trim()) {
      setFormError('Please fill out all required fields.');
      return;
    }

    if (!privacyAcknowledged) {
      setFormError('Please accept the membership and privacy acknowledgement.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitMembershipApplication({
        fullName,
        email,
        schoolCollege,
        city,
        areasOfInterest,
        whyJoin,
        privacyAcknowledged
      });

      if (response.success) {
        setSubmissionResult(response);
        // Trigger subtle celebration confetti
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#651D32', '#C5A36A', '#F8F4EC']
          });
        } catch {
          // ignore if canvas not supported
        }
      } else {
        setFormError(response.message || 'Application could not be saved.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown connection error';
      setFormError(`Submission interrupted: ${msg}. Your entered details remain safe in the form.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setSchoolCollege('');
    setCity('Bikaner');
    setAreasOfInterest(['General Membership']);
    setWhyJoin('');
    setPrivacyAcknowledged(false);
    setSubmissionResult(null);
    setFormError(null);
  };

  return (
    <div className="pt-24 pb-20 bg-[#F8F4EC]">
      
      {/* Editorial Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#651D32]/10 border border-[#651D32]/20 text-[#651D32] rounded text-xs font-bold uppercase tracking-wider mb-4">
          <UserPlus className="w-3.5 h-3.5" />
          <span>Student Application</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#181719] tracking-tight">
          Find Your Place in the Movement.
        </h1>
        <div className="w-16 h-0.5 mx-auto my-4 bg-[#651D32]" />
        
        <p className="text-base sm:text-lg text-[#181719]/80 max-w-2xl mx-auto leading-relaxed">
          Apply to participate in student-focused initiatives, awareness activities, education, and community support.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {submissionResult ? (
          <div className="bg-white p-8 sm:p-12 rounded-xl shadow-md border border-[#C5A36A]/40 text-center space-y-6 animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-[#651D32]/10 text-[#651D32] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#181719]">
                Application Received
              </h2>
              <p className="text-sm sm:text-base text-stone-700 max-w-lg mx-auto leading-relaxed">
                {submissionResult.message}
              </p>
            </div>

            <div className="p-4 bg-[#F8F4EC] rounded-lg border border-[#E4DCCE] text-xs text-stone-600 max-w-md mx-auto text-left space-y-2">
              <p className="font-semibold text-[#181719]">What Happens Next?</p>
              <p>
                Applications are reviewed through our collective student committee. Your submission is securely recorded with status: <strong>Pending Review</strong>.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#651D32] bg-[#F8F4EC] hover:bg-[#EEE7D7] rounded border border-[#C5A36A]/40 transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Submit Another Application</span>
              </button>
            </div>
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit}
            className="bg-white p-6 sm:p-10 rounded-xl shadow-md border border-[#E4DCCE] space-y-6"
          >
            {formError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-xs sm:text-sm text-red-800 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            {/* Field 1: Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-[#181719] mb-2">
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="e.g. Aarav Sharma"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#F8F4EC] border border-[#E4DCCE] rounded-lg text-sm text-[#181719] focus:ring-2 focus:ring-[#651D32] focus:outline-none"
              />
            </div>

            {/* Field 2: Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#181719] mb-2">
                Email Address <span className="text-red-600">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#F8F4EC] border border-[#E4DCCE] rounded-lg text-sm text-[#181719] focus:ring-2 focus:ring-[#651D32] focus:outline-none"
              />
            </div>

            {/* Field 3 & 4: School/College & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="schoolCollege" className="block text-xs font-bold uppercase tracking-wider text-[#181719] mb-2">
                  School or College <span className="text-red-600">*</span>
                </label>
                <input
                  id="schoolCollege"
                  type="text"
                  placeholder="e.g. Govt Dungar College, Bikaner"
                  value={schoolCollege}
                  onChange={(e) => setSchoolCollege(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-[#F8F4EC] border border-[#E4DCCE] rounded-lg text-sm text-[#181719] focus:ring-2 focus:ring-[#651D32] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-xs font-bold uppercase tracking-wider text-[#181719] mb-2">
                  City <span className="text-red-600">*</span>
                </label>
                <input
                  id="city"
                  type="text"
                  placeholder="e.g. Bikaner"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-[#F8F4EC] border border-[#E4DCCE] rounded-lg text-sm text-[#181719] focus:ring-2 focus:ring-[#651D32] focus:outline-none"
                />
              </div>
            </div>

            {/* Field 5: Areas of Interest */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#181719] mb-2">
                Areas of Interest <span className="text-stone-400 font-normal lowercase">(select all that apply)</span> <span className="text-red-600">*</span>
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {interestOptions.map((opt) => {
                  const isChecked = areasOfInterest.includes(opt);
                  return (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => toggleInterest(opt)}
                      className={`p-3 rounded-lg border text-left text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer ${
                        isChecked 
                          ? 'border-[#651D32] bg-[#651D32]/10 text-[#651D32] ring-1 ring-[#651D32]' 
                          : 'border-[#E4DCCE] bg-[#F8F4EC] text-stone-700 hover:border-stone-400'
                      }`}
                    >
                      <span>{opt}</span>
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center border text-[10px] ${
                        isChecked ? 'bg-[#651D32] text-white border-[#651D32]' : 'border-stone-300'
                      }`}>
                        {isChecked && '✓'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Field 6: Why Join */}
            <div>
              <label htmlFor="whyJoin" className="block text-xs font-bold uppercase tracking-wider text-[#181719] mb-2">
                Why would you like to join? <span className="text-stone-400 font-normal lowercase">(optional short response)</span>
              </label>
              <textarea
                id="whyJoin"
                rows={3}
                placeholder="Tell us what motivates you to get involved or any specific skills you wish to contribute."
                value={whyJoin}
                onChange={(e) => setWhyJoin(e.target.value)}
                maxLength={500}
                className="w-full px-4 py-3 bg-[#F8F4EC] border border-[#E4DCCE] rounded-lg text-sm text-[#181719] focus:ring-2 focus:ring-[#651D32] focus:outline-none"
              />
            </div>

            {/* Data Minimization Note */}
            <div className="p-4 bg-stone-50 rounded-lg text-xs text-stone-600 space-y-1 border border-stone-200">
              <span className="font-bold text-[#181719] block">
                Ethical Data Minimization:
              </span>
              <p className="leading-relaxed">
                We never ask for government identity documents, Aadhaar numbers, residential street addresses, or passwords. Your application is saved securely in our protected Firebase Firestore database with strict security rules.
              </p>
            </div>

            {/* Field 7: Privacy Acknowledgement */}
            <div className="flex items-start gap-3 pt-2">
              <input
                id="privacyAckMember"
                type="checkbox"
                checked={privacyAcknowledged}
                onChange={(e) => setPrivacyAcknowledged(e.target.checked)}
                required
                className="mt-1 h-4 w-4 rounded border-stone-300 text-[#651D32] focus:ring-[#651D32] cursor-pointer"
              />
              <label htmlFor="privacyAckMember" className="text-xs text-stone-700 leading-relaxed cursor-pointer">
                I agree to the Students Federation of Bikaner privacy terms and understand that application submission does not grant automatic membership status until reviewed by the collective. <span className="text-red-600">*</span>
              </label>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#181719] bg-gradient-to-r from-[#E4CEA4] via-[#C5A36A] to-[#D4B681] hover:brightness-110 active:scale-[0.99] rounded-lg shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Recording Application...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#181719]" />
                    <span>Submit Membership Application</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
