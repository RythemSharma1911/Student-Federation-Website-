import React, { useState } from 'react';
import { submitContactMessage } from '../lib/api';
import type { ContactMessageInput, SubmissionResponse } from '../types';
import { 
  MessageSquare, 
  Instagram, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  Lock, 
  ShieldCheck,
  ExternalLink,
  Users
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [privacyAcknowledged, setPrivacyAcknowledged] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResponse | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!subject.trim() || !message.trim()) {
      setFormError('Please enter both a subject and your message.');
      return;
    }

    if (!privacyAcknowledged) {
      setFormError('Please check the privacy acknowledgement.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitContactMessage({
        name: name.trim() || undefined,
        email: email.trim() || undefined,
        subject,
        message,
        privacyAcknowledged
      });

      if (response.success) {
        setSubmissionResult(response);
      } else {
        setFormError(response.message || 'Unable to store message.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Connection failed';
      setFormError(`Transmission error: ${msg}. Your entered text is preserved.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setPrivacyAcknowledged(false);
    setSubmissionResult(null);
    setFormError(null);
  };

  return (
    <div className="pt-24 pb-20 bg-[#F8F4EC]">
      
      {/* Editorial Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#651D32]/10 border border-[#651D32]/20 text-[#651D32] rounded text-xs font-bold uppercase tracking-wider mb-4">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>General Inquiries</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#181719] tracking-tight">
          Contact the Federation
        </h1>
        <div className="w-16 h-0.5 mx-auto my-4 bg-[#651D32]" />
        
        <p className="text-base sm:text-lg text-[#181719]/80 max-w-2xl mx-auto leading-relaxed">
          Reach out for general federation inquiries, institutional collaborations, or public questions.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Official Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Instagram Card - Prominent */}
            <div className="bg-gradient-to-br from-[#250812] to-[#3D101E] text-white p-6 sm:p-8 rounded-xl shadow-md border border-[#C5A36A]/30 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#651D32] to-[#C5A36A] flex items-center justify-center text-white shadow-lg">
                <Instagram className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#E4CEA4] block mb-1">
                  Primary Social Channel
                </span>
                <h2 className="font-serif text-xl font-bold text-white">
                  Official Instagram
                </h2>
                <p className="text-xs text-white/75 mt-1 font-mono">
                  @students_federation_bkn
                </p>
              </div>

              <p className="text-xs text-white/80 leading-relaxed">
                Direct messages, public updates, and event bulletins are regularly coordinated via our verified Instagram presence.
              </p>

              <div>
                <a
                  href="https://www.instagram.com/students_federation_bkn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 text-xs font-bold tracking-wider uppercase text-[#181719] bg-[#C5A36A] hover:bg-[#E4CEA4] rounded flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <span>Follow on Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Direct Intake Desk Info */}
            <div className="bg-white p-6 rounded-xl border border-[#E4DCCE] shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#651D32]">
                <ShieldCheck className="w-4 h-4" />
                <span>Direct In-App Intake</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Messages submitted through this portal are directly recorded in our secure cloud repository and reviewed by our coordination team.
              </p>
              <p className="text-[11px] text-stone-500 italic">
                In accordance with our privacy policies, no personal leadership telephone numbers or private addresses are published.
              </p>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            {submissionResult ? (
              <div className="bg-white p-8 sm:p-10 rounded-xl shadow-md border border-emerald-200 text-center space-y-5 animate-in fade-in duration-300">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h2 className="font-serif text-2xl font-bold text-[#181719]">
                    Message Recorded
                  </h2>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    {submissionResult.message}
                  </p>
                </div>

                <div className="p-3.5 bg-stone-50 rounded border border-stone-200 text-xs text-stone-600 space-y-1 text-left">
                  <span className="font-semibold text-stone-800 block">Operation Status:</span>
                  <p>• Database Record: <strong>Successfully Stored</strong> in private Firestore collection <code className="font-mono text-[11px] bg-stone-100 px-1 py-0.5 rounded">contact_messages</code>.</p>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#651D32] bg-[#F8F4EC] hover:bg-[#EEE7D7] rounded border border-[#C5A36A]/40 transition-colors cursor-pointer inline-flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Send Another Message</span>
                  </button>
                </div>
              </div>
            ) : (
              <form 
                onSubmit={handleSubmit}
                className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-[#E4DCCE] space-y-5"
              >
                {formError && (
                  <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contactName" className="block text-xs font-bold uppercase tracking-wider text-[#181719] mb-1.5">
                      Your Name <span className="text-stone-400 font-normal lowercase">(optional)</span>
                    </label>
                    <input
                      id="contactName"
                      type="text"
                      placeholder="e.g. Student / Supporter"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#F8F4EC] border border-[#E4DCCE] rounded-lg text-sm text-[#181719] focus:ring-2 focus:ring-[#651D32] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="contactEmail" className="block text-xs font-bold uppercase tracking-wider text-[#181719] mb-1.5">
                      Your Email <span className="text-stone-400 font-normal lowercase">(if reply needed)</span>
                    </label>
                    <input
                      id="contactEmail"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#F8F4EC] border border-[#E4DCCE] rounded-lg text-sm text-[#181719] focus:ring-2 focus:ring-[#651D32] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contactSubject" className="block text-xs font-bold uppercase tracking-wider text-[#181719] mb-1.5">
                    Subject <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="contactSubject"
                    type="text"
                    placeholder="Subject of your message"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-[#F8F4EC] border border-[#E4DCCE] rounded-lg text-sm text-[#181719] focus:ring-2 focus:ring-[#651D32] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="contactMessage" className="block text-xs font-bold uppercase tracking-wider text-[#181719] mb-1.5">
                    Message <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="contactMessage"
                    rows={4}
                    placeholder="Write your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-[#F8F4EC] border border-[#E4DCCE] rounded-lg text-sm text-[#181719] focus:ring-2 focus:ring-[#651D32] focus:outline-none leading-relaxed"
                  />
                </div>

                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    id="privacyAckContact"
                    type="checkbox"
                    checked={privacyAcknowledged}
                    onChange={(e) => setPrivacyAcknowledged(e.target.checked)}
                    required
                    className="mt-1 h-4 w-4 rounded border-stone-300 text-[#651D32] focus:ring-[#651D32] cursor-pointer"
                  />
                  <label htmlFor="privacyAckContact" className="text-xs text-stone-600 leading-relaxed cursor-pointer">
                    I acknowledge that my message will be processed in accordance with the SFB privacy policy. <span className="text-red-600">*</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 text-xs font-bold tracking-wider uppercase text-white bg-[#651D32] hover:bg-[#3D101E] active:scale-[0.99] rounded-lg shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#C5A36A]" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
