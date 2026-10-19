import React, { useState } from 'react';
import { submitIssueReport } from '../lib/api';
import type { IssueReportInput, SubmissionResponse } from '../types';
import { 
  ShieldAlert, 
  Lock, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Info, 
  RotateCcw, 
  Send,
  EyeOff,
  UserCheck
} from 'lucide-react';

export const ReportAnIssuePage: React.FC = () => {
  const [category, setCategory] = useState<IssueReportInput['category']>('Cyberbullying');
  const [shortTitle, setShortTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [submitterName, setSubmitterName] = useState('');
  const [submitterEmail, setSubmitterEmail] = useState('');
  const [submitterPhone, setSubmitterPhone] = useState('');
  const [privacyAcknowledged, setPrivacyAcknowledged] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResponse | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!description.trim()) {
      setFormError('Please enter a description of the concern.');
      return;
    }

    if (!privacyAcknowledged) {
      setFormError('You must acknowledge that you have reviewed the privacy and emergency disclosure.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitIssueReport({
        category,
        shortTitle,
        description,
        isAnonymous,
        submitterName: isAnonymous ? undefined : submitterName,
        submitterEmail: isAnonymous ? undefined : submitterEmail,
        submitterPhone: isAnonymous ? undefined : submitterPhone,
        privacyAcknowledged
      });

      if (response.success) {
        setSubmissionResult(response);
      } else {
        setFormError(response.message || 'Failed to submit report. Please try again.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setFormError(`Transmission error: ${msg}. Your entered details have been preserved.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForNewReport = () => {
    setCategory('Cyberbullying');
    setShortTitle('');
    setDescription('');
    setIsAnonymous(true);
    setSubmitterName('');
    setSubmitterEmail('');
    setSubmitterPhone('');
    setPrivacyAcknowledged(false);
    setSubmissionResult(null);
    setFormError(null);
  };

  return (
    <div className="pt-24 pb-20 bg-[#F8F4EC]">
      
      {/* Page Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 border border-red-200 text-red-900 rounded text-xs font-bold uppercase tracking-wider mb-4">
          <Lock className="w-3.5 h-3.5 text-red-700" />
          <span>Private & Confidential Channel</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#181719] tracking-tight">
          Speak Up. Your Concern Matters.
        </h1>
        <div className="w-16 h-0.5 mx-auto my-4 bg-[#651D32]" />
        
        <p className="text-base sm:text-lg text-[#181719]/80 max-w-2xl mx-auto leading-relaxed">
          If you are experiencing or have witnessed a student-related concern, you can share the 
          details through this private reporting form.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Safety & Emergency Disclosure Box */}
        <div className="mb-8 p-5 bg-amber-50 rounded-xl border border-amber-200 text-xs sm:text-sm text-amber-950 flex items-start gap-3.5 shadow-sm">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1.5 leading-relaxed">
            <span className="font-bold text-amber-900 block">
              Important Safety & Emergency Notice:
            </span>
            <p>
              The Students Federation of Bikaner is a student support collective, <strong>not a law-enforcement agency, court, or emergency service</strong>.
            </p>
            <p className="text-xs text-amber-900/90">
              For immediate threats to physical safety, severe violence, or imminent danger, please contact local emergency authorities (112 / police) immediately. Submitting a report here does not guarantee legal representation, formal police inquiry, or immediate removal of external third-party content.
            </p>
          </div>
        </div>

        {/* SUCCESS VIEW */}
        {submissionResult ? (
          <div className="bg-white p-8 sm:p-12 rounded-xl shadow-md border border-emerald-200 text-center space-y-6 animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#181719]">
                Report Submitted
              </h2>
              <p className="text-sm sm:text-base text-stone-700 max-w-lg mx-auto leading-relaxed">
                {submissionResult.message}
              </p>
            </div>

            {submissionResult.submissionId && (
              <div className="p-3 bg-stone-50 rounded border border-stone-200 text-xs font-mono text-stone-600 max-w-md mx-auto">
                Reference ID: {submissionResult.submissionId}
              </div>
            )}

            <div className="text-xs text-stone-500 border-t border-stone-100 pt-4 max-w-md mx-auto space-y-1">
              <p className="font-medium text-stone-700">Confidential Storage:</p>
              <p>
                Stored securely in private Firestore collection <code className="font-mono text-[11px] bg-stone-100 px-1 py-0.5 rounded">issue_reports</code> with cloud security rules.
              </p>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleResetForNewReport}
                className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#651D32] bg-[#F8F4EC] hover:bg-[#EEE7D7] rounded border border-[#C5A36A]/40 transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Submit Another Concern</span>
              </button>
            </div>
          </div>
        ) : (
          /* REPORTING FORM */
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

            {/* Field 1: Category */}
            <div>
              <label htmlFor="category" className="block text-xs font-bold uppercase tracking-wider text-[#181719] mb-2">
                Category of Concern <span className="text-red-600">*</span>
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as IssueReportInput['category'])}
                className="w-full px-4 py-3 bg-[#F8F4EC] border border-[#E4DCCE] rounded-lg text-sm text-[#181719] focus:ring-2 focus:ring-[#651D32] focus:outline-none transition-colors cursor-pointer"
                required
              >
                <option value="Cyberbullying">Cyberbullying</option>
                <option value="Online Blackmail">Online Blackmail</option>
                <option value="Fake Accounts or Impersonation">Fake Accounts or Impersonation</option>
                <option value="Online Harassment">Online Harassment</option>
                <option value="Other Student-Related Concerns">Other Student-Related Concerns</option>
              </select>
            </div>

            {/* Field 2: Short Title */}
            <div>
              <label htmlFor="shortTitle" className="block text-xs font-bold uppercase tracking-wider text-[#181719] mb-2">
                Short Title <span className="text-stone-400 font-normal lowercase">(optional)</span>
              </label>
              <input
                id="shortTitle"
                type="text"
                placeholder="Brief summary of the incident or concern"
                value={shortTitle}
                onChange={(e) => setShortTitle(e.target.value)}
                maxLength={100}
                className="w-full px-4 py-3 bg-[#F8F4EC] border border-[#E4DCCE] rounded-lg text-sm text-[#181719] placeholder:text-stone-400 focus:ring-2 focus:ring-[#651D32] focus:outline-none"
              />
            </div>

            {/* Field 3: Description */}
            <div>
              <label htmlFor="description" className="block text-xs font-bold uppercase tracking-wider text-[#181719] mb-2">
                Description of the Concern <span className="text-red-600">*</span>
              </label>
              <textarea
                id="description"
                rows={5}
                placeholder="Please provide details regarding what happened, when it occurred, platforms or contexts involved, and any specific safety considerations. Do not include passwords or financial account numbers."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#F8F4EC] border border-[#E4DCCE] rounded-lg text-sm text-[#181719] placeholder:text-stone-400 focus:ring-2 focus:ring-[#651D32] focus:outline-none leading-relaxed"
              />
            </div>

            {/* Field 4: Reporting Preference */}
            <div className="pt-2 pb-2 border-t border-b border-stone-200">
              <span className="block text-xs font-bold uppercase tracking-wider text-[#181719] mb-3">
                Reporting Preference <span className="text-red-600">*</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setIsAnonymous(true)}
                  className={`p-3.5 rounded-lg border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    isAnonymous 
                      ? 'border-[#651D32] bg-[#651D32]/5 ring-1 ring-[#651D32]' 
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <EyeOff className={`w-5 h-5 shrink-0 mt-0.5 ${isAnonymous ? 'text-[#651D32]' : 'text-stone-400'}`} />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#181719] block">
                      Submit Anonymously
                    </span>
                    <span className="text-[11px] text-stone-500 block mt-0.5">
                      No name, email, or phone required. Complete privacy.
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setIsAnonymous(false)}
                  className={`p-3.5 rounded-lg border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    !isAnonymous 
                      ? 'border-[#651D32] bg-[#651D32]/5 ring-1 ring-[#651D32]' 
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <UserCheck className={`w-5 h-5 shrink-0 mt-0.5 ${!isAnonymous ? 'text-[#651D32]' : 'text-stone-400'}`} />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#181719] block">
                      Submit With Contact Info
                    </span>
                    <span className="text-[11px] text-stone-500 block mt-0.5">
                      Provides details if follow-up guidance is requested.
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Identified Fields (Shown ONLY when identified option is selected) */}
            {!isAnonymous && (
              <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 space-y-4 animate-in fade-in duration-200">
                <span className="text-xs font-semibold text-stone-700 block">
                  Contact Information (Only shared with authorized confidential caseworkers):
                </span>

                <div>
                  <label htmlFor="submitterName" className="block text-xs font-bold uppercase tracking-wider text-[#181719] mb-1">
                    Your Name
                  </label>
                  <input
                    id="submitterName"
                    type="text"
                    placeholder="e.g. Student Name"
                    value={submitterName}
                    onChange={(e) => setSubmitterName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E4DCCE] rounded-lg text-sm text-[#181719] focus:ring-2 focus:ring-[#651D32] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="submitterEmail" className="block text-xs font-bold uppercase tracking-wider text-[#181719] mb-1">
                      Email Address <span className="text-stone-400 font-normal lowercase">(for follow-up)</span>
                    </label>
                    <input
                      id="submitterEmail"
                      type="email"
                      placeholder="student@example.com"
                      value={submitterEmail}
                      onChange={(e) => setSubmitterEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E4DCCE] rounded-lg text-sm text-[#181719] focus:ring-2 focus:ring-[#651D32] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="submitterPhone" className="block text-xs font-bold uppercase tracking-wider text-[#181719] mb-1">
                      Phone Number <span className="text-stone-400 font-normal lowercase">(optional)</span>
                    </label>
                    <input
                      id="submitterPhone"
                      type="tel"
                      placeholder="+91..."
                      value={submitterPhone}
                      onChange={(e) => setSubmitterPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E4DCCE] rounded-lg text-sm text-[#181719] focus:ring-2 focus:ring-[#651D32] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Explanation & Technical Transparency */}
            <div className="p-4 bg-stone-50 rounded-lg text-xs text-stone-600 space-y-2 border border-stone-200">
              <span className="font-bold text-[#181719] block">
                Privacy Disclosure & Limits of Anonymity:
              </span>
              <p className="leading-relaxed">
                Anonymous submissions do not require any identifying details. We do not deliberately store 
                IP addresses with your submission record. However, standard web hosting infrastructure and network routing 
                may process baseline technical security logs. We recommend using private browsing if you are on a shared public terminal.
              </p>
              <p className="text-[11px] text-stone-500">
                Reports are kept private, never published to feeds or community indexes, and accessed exclusively by designated confidential team members.
              </p>
            </div>

            {/* Checkbox: Privacy Acknowledgement */}
            <div className="flex items-start gap-3 pt-2">
              <input
                id="privacyAck"
                type="checkbox"
                checked={privacyAcknowledged}
                onChange={(e) => setPrivacyAcknowledged(e.target.checked)}
                required
                className="mt-1 h-4 w-4 rounded border-stone-300 text-[#651D32] focus:ring-[#651D32] cursor-pointer"
              />
              <label htmlFor="privacyAck" className="text-xs text-stone-700 leading-relaxed cursor-pointer">
                I have read and understand the privacy disclosure, and I acknowledge that the Students Federation of Bikaner is a student advocacy collective and not an emergency response service. <span className="text-red-600">*</span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 text-xs sm:text-sm font-bold tracking-wider uppercase text-white bg-[#651D32] hover:bg-[#3D101E] active:scale-[0.99] rounded-lg shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Submitting Securely...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#C5A36A]" />
                    <span>Submit Private Report</span>
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
