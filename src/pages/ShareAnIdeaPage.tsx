import React, { useState } from 'react';
import { submitStudentSuggestion } from '../lib/api';
import type { StudentSuggestionInput, SubmissionResponse } from '../types';
import confetti from 'canvas-confetti';
import { 
  Lightbulb, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  Lock,
  Sparkles
} from 'lucide-react';

export const ShareAnIdeaPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<StudentSuggestionInput['category']>('Education');
  const [description, setDescription] = useState('');
  const [submitterName, setSubmitterName] = useState('');
  const [submitterEmail, setSubmitterEmail] = useState('');
  const [privacyAcknowledged, setPrivacyAcknowledged] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResponse | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const categories: StudentSuggestionInput['category'][] = [
    'Education',
    'Student Welfare',
    'Cyber Awareness',
    'Events & Activities',
    'Community Initiatives',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!title.trim() || !description.trim()) {
      setFormError('Please provide both an idea title and description.');
      return;
    }

    if (!privacyAcknowledged) {
      setFormError('Please review and check the privacy acknowledgement.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitStudentSuggestion({
        title,
        category,
        description,
        submitterName: submitterName.trim() || undefined,
        submitterEmail: submitterEmail.trim() || undefined,
        privacyAcknowledged
      });

      if (response.success) {
        setSubmissionResult(response);
        try {
          confetti({
            particleCount: 40,
            spread: 55,
            origin: { y: 0.7 },
            colors: ['#651D32', '#C5A36A', '#F8F4EC']
          });
        } catch {
          // ignore
        }
      } else {
        setFormError(response.message || 'Unable to store suggestion.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Connection failed';
      setFormError(`Transmission error: ${msg}. Your entered draft is preserved.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setTitle('');
    setCategory('Education');
    setDescription('');
    setSubmitterName('');
    setSubmitterEmail('');
    setPrivacyAcknowledged(false);
    setSubmissionResult(null);
    setFormError(null);
  };

  return (
    <div className="pt-24 pb-20 bg-[#F8F4EC]">
      
      {/* Editorial Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#651D32]/10 border border-[#651D32]/20 text-[#651D32] rounded text-xs font-bold uppercase tracking-wider mb-4">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Student Voice</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#181719] tracking-tight">
          Every Meaningful Change Begins With an Idea.
        </h1>
        <div className="w-16 h-0.5 mx-auto my-4 bg-[#651D32]" />
        
        <p className="text-base sm:text-lg text-[#181719]/80 max-w-2xl mx-auto leading-relaxed">
          Share a suggestion that could improve student life, education, digital awareness, or student welfare.
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
                Idea Recorded
              </h2>
              <p className="text-sm sm:text-base text-stone-700 max-w-lg mx-auto leading-relaxed">
                {submissionResult.message}
              </p>
            </div>

            <p className="text-xs text-stone-500 max-w-md mx-auto">
              Your suggestion has been securely stored in Firebase Firestore with strict access rules. Submitted ideas are evaluated internally by our working groups and are never published publicly without review.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#651D32] bg-[#F8F4EC] hover:bg-[#EEE7D7] rounded border border-[#C5A36A]/40 transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Submit Another Suggestion</span>
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

            {/* Field 1: Idea Title */}
            <div>
              <label htmlFor="ideaTitle" className="block text-xs font-bold uppercase tracking-wider text-[#181719] mb-2">
                Idea Title <span className="text-red-600">*</span>
              </label>
              <input
                id="ideaTitle"
                type="text"
                placeholder="e.g. Free Campus Digital Security Workshops"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#F8F4EC] border border-[#E4DCCE] rounded-lg text-sm text-[#181719] focus:ring-2 focus:ring-[#651D32] focus:outline-none"
              />
            </div>

            {/* Field 2: Category */}
            <div>
              <label htmlFor="ideaCategory" className="block text-xs font-bold uppercase tracking-wider text-[#181719] mb-2">
                Category <span className="text-red-600">*</span>
              </label>
              <select
                id="ideaCategory"
                value={category}
                onChange={(e) => setCategory(e.target.value as StudentSuggestionInput['category'])}
                className="w-full px-4 py-3 bg-[#F8F4EC] border border-[#E4DCCE] rounded-lg text-sm text-[#181719] focus:ring-2 focus:ring-[#651D32] focus:outline-none cursor-pointer"
                required
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Field 3: Idea Description */}
            <div>
              <label htmlFor="ideaDesc" className="block text-xs font-bold uppercase tracking-wider text-[#181719] mb-2">
                Idea Description <span className="text-red-600">*</span>
              </label>
              <textarea
                id="ideaDesc"
                rows={4}
                placeholder="Explain what practical steps could be taken, who would benefit, and how this could improve student life or welfare in Bikaner."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#F8F4EC] border border-[#E4DCCE] rounded-lg text-sm text-[#181719] focus:ring-2 focus:ring-[#651D32] focus:outline-none leading-relaxed"
              />
            </div>

            {/* Optional Fields: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-200">
              <div>
                <label htmlFor="optName" className="block text-xs font-bold uppercase tracking-wider text-[#181719] mb-1">
                  Your Name <span className="text-stone-400 font-normal lowercase">(optional)</span>
                </label>
                <input
                  id="optName"
                  type="text"
                  placeholder="Anonymous or Your Name"
                  value={submitterName}
                  onChange={(e) => setSubmitterName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8F4EC] border border-[#E4DCCE] rounded-lg text-sm text-[#181719] focus:ring-2 focus:ring-[#651D32] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="optEmail" className="block text-xs font-bold uppercase tracking-wider text-[#181719] mb-1">
                  Your Email <span className="text-stone-400 font-normal lowercase">(optional)</span>
                </label>
                <input
                  id="optEmail"
                  type="email"
                  placeholder="name@example.com"
                  value={submitterEmail}
                  onChange={(e) => setSubmitterEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8F4EC] border border-[#E4DCCE] rounded-lg text-sm text-[#181719] focus:ring-2 focus:ring-[#651D32] focus:outline-none"
                />
              </div>
            </div>

            {/* Privacy Checkbox */}
            <div className="flex items-start gap-3 pt-2">
              <input
                id="privacyAckIdea"
                type="checkbox"
                checked={privacyAcknowledged}
                onChange={(e) => setPrivacyAcknowledged(e.target.checked)}
                required
                className="mt-1 h-4 w-4 rounded border-stone-300 text-[#651D32] focus:ring-[#651D32] cursor-pointer"
              />
              <label htmlFor="privacyAckIdea" className="text-xs text-stone-700 leading-relaxed cursor-pointer">
                I understand that my idea will be reviewed privately by the federation and will not be published publicly without editorial consent. <span className="text-red-600">*</span>
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
                  <span>Saving Suggestion...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#C5A36A]" />
                    <span>Submit Your Idea</span>
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
