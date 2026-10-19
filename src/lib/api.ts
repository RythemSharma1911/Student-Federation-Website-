import type { 
  IssueReportInput, 
  MembershipInput, 
  StudentSuggestionInput, 
  ContactMessageInput, 
  Notice, 
  SubmissionResponse 
} from '../types';

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'notice-01',
    title: 'Advisory on Digital Safety & Student Privacy in Academic Groups',
    publicationDate: '2026-03-24',
    shortDescription: 'Guidance for school and collegiate students on preventing unauthorized group invites, impersonation accounts, and digital privacy best practices.',
    fullContent: 'The Students Federation of Bikaner urges all students to exercise heightened caution regarding unofficial academic chat groups, unverified download links, and impersonation profiles. Never share OTPs, credentials, or personal identification in public online forums. If you observe malicious behavior targeting students, use our confidential reporting channel.',
    category: 'Cyber Awareness',
    isPinned: true,
    isPublished: true,
    documentName: 'Digital_Safety_Advisory_SFB.txt'
  },
  {
    id: 'notice-02',
    title: 'Announcement on Student Welfare & Grievance Representation',
    publicationDate: '2026-02-15',
    shortDescription: 'Collective initiative to assemble common academic concerns and infrastructural requirements across Bikaner district institutions.',
    fullContent: 'Our student welfare working collective is compiling institutional feedback concerning library access hours, laboratory equipment availability, and campus transportation. Students may voice suggestions directly through the Share an Idea portal.',
    category: 'Student Welfare',
    isPinned: false,
    isPublished: true,
  }
];

/**
 * Submit Issue Report via Server Proxy (No client API keys exposed)
 */
export async function submitIssueReport(input: IssueReportInput): Promise<SubmissionResponse> {
  try {
    const res = await fetch('/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: data.error || 'Server rejected the report.',
        persistedToCloud: false,
        error: data.error
      };
    }

    return {
      success: true,
      submissionId: data.submissionId,
      message: data.message || 'Your report has been submitted successfully.',
      persistedToCloud: true
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Network error';
    return {
      success: false,
      message: 'Could not contact secure backend server. Please verify your connection.',
      persistedToCloud: false,
      error: msg
    };
  }
}

/**
 * Submit Membership Application via Server Proxy
 */
export async function submitMembershipApplication(input: MembershipInput): Promise<SubmissionResponse> {
  try {
    const res = await fetch('/api/membership', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: data.error || 'Application rejected.',
        persistedToCloud: false,
        error: data.error
      };
    }

    return {
      success: true,
      submissionId: data.submissionId,
      message: data.message || 'Your application has been received.',
      persistedToCloud: true
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Network error';
    return {
      success: false,
      message: 'Connection failed when submitting application.',
      persistedToCloud: false,
      error: msg
    };
  }
}

/**
 * Submit Student Suggestion via Server Proxy
 */
export async function submitStudentSuggestion(input: StudentSuggestionInput): Promise<SubmissionResponse> {
  try {
    const res = await fetch('/api/suggestions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: data.error || 'Idea could not be saved.',
        persistedToCloud: false,
        error: data.error
      };
    }

    return {
      success: true,
      submissionId: data.submissionId,
      message: data.message || 'Your suggestion has been recorded.',
      persistedToCloud: true
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Network error';
    return {
      success: false,
      message: 'Failed to connect to idea repository.',
      persistedToCloud: false,
      error: msg
    };
  }
}

/**
 * Submit Contact Message via Server Proxy
 */
export async function submitContactMessage(input: ContactMessageInput): Promise<SubmissionResponse> {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: data.error || 'Message failed to deliver.',
        persistedToCloud: false,
        error: data.error
      };
    }

    return {
      success: true,
      submissionId: data.submissionId,
      message: data.message || 'Your message has been securely recorded.',
      persistedToCloud: true
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Network error';
    return {
      success: false,
      message: 'Unable to reach contact server.',
      persistedToCloud: false,
      error: msg
    };
  }
}

/**
 * Fetch Official Notices
 */
export async function fetchNotices(): Promise<Notice[]> {
  try {
    const res = await fetch('/api/notices');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map(item => ({
          id: item.id,
          title: item.title,
          publicationDate: item.publication_date,
          shortDescription: item.short_description,
          fullContent: item.full_content,
          category: item.category || 'General',
          isPinned: Boolean(item.is_pinned),
          isPublished: Boolean(item.is_published),
          documentName: item.document_name
        }));
      }
    }
  } catch (e) {
    console.warn('Fallback to baseline notices', e);
  }
  return INITIAL_NOTICES;
}

// ====================================================================
// EXECUTIVE ADMIN CLIENT METHODS
// ====================================================================

export async function verifyAdminAccess(key: string, email?: string): Promise<boolean> {
  try {
    const res = await fetch('/api/admin/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, email })
    });
    const data = await res.json();
    return Boolean(data.authorized);
  } catch {
    return false;
  }
}

export async function fetchAdminSubmissions(key: string) {
  const res = await fetch('/api/admin/all-submissions', {
    headers: { 'Authorization': `Bearer ${key}` }
  });
  if (!res.ok) throw new Error('Unauthorized');
  return res.json();
}

export async function updateAdminStatus(key: string, collectionName: string, id: string, status: string) {
  const res = await fetch('/api/admin/status', {
    method: 'PATCH',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}` 
    },
    body: JSON.stringify({ collectionName, id, status })
  });
  return res.json();
}

export async function createAdminNotice(key: string, noticeData: any) {
  const res = await fetch('/api/admin/notices', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}` 
    },
    body: JSON.stringify(noticeData)
  });
  return res.json();
}
