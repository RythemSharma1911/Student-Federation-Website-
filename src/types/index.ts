export type NavigationPage = 
  | 'home'
  | 'about'
  | 'report-an-issue'
  | 'membership'
  | 'notices'
  | 'our-team'
  | 'share-an-idea'
  | 'contact'
  | 'privacy-policy'
  | 'terms'
  | 'admin';

export interface IssueReportInput {
  category: 'Cyberbullying' | 'Online Blackmail' | 'Fake Accounts or Impersonation' | 'Online Harassment' | 'Other Student-Related Concerns';
  shortTitle?: string;
  description: string;
  isAnonymous: boolean;
  submitterName?: string;
  submitterEmail?: string;
  submitterPhone?: string;
  privacyAcknowledged: boolean;
}

export interface MembershipInput {
  fullName: string;
  email: string;
  schoolCollege: string;
  city: string;
  areasOfInterest: string[];
  whyJoin?: string;
  privacyAcknowledged: boolean;
}

export interface StudentSuggestionInput {
  title: string;
  category: 'Education' | 'Student Welfare' | 'Cyber Awareness' | 'Events & Activities' | 'Community Initiatives' | 'Other';
  description: string;
  submitterName?: string;
  submitterEmail?: string;
  privacyAcknowledged: boolean;
}

export interface ContactMessageInput {
  name?: string;
  email?: string;
  subject: string;
  message: string;
  privacyAcknowledged: boolean;
}

export interface Notice {
  id: string;
  title: string;
  publicationDate: string;
  shortDescription: string;
  fullContent?: string;
  category: string;
  isPinned: boolean;
  isPublished: boolean;
  documentUrl?: string;
  documentName?: string;
}

export interface SubmissionResponse {
  success: boolean;
  message: string;
  submissionId?: string;
  persistedToCloud: boolean;
  error?: string;
}
