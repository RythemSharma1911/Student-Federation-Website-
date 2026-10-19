import React, { useState, useEffect } from 'react';
import { verifyAdminAccess, fetchAdminSubmissions, updateAdminStatus, createAdminNotice } from '../lib/api';
import { 
  ShieldAlert, 
  UserCheck, 
  Lightbulb, 
  MessageSquare, 
  Bell, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  Unlock, 
  RefreshCw, 
  Eye, 
  ChevronRight,
  Filter,
  Plus
} from 'lucide-react';

export const AdminPortalPage: React.FC = () => {
  const [passkey, setPasskey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('sfb_admin_auth') === 'true';
  });
  const [activeTab, setActiveTab] = useState<'reports' | 'memberships' | 'suggestions' | 'messages' | 'newNotice'>('reports');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  // New Notice form state
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeDate, setNoticeDate] = useState(new Date().toISOString().split('T')[0]);
  const [noticeCategory, setNoticeCategory] = useState('Cyber Awareness');
  const [noticeSummary, setNoticeSummary] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticePinned, setNoticePinned] = useState(false);
  const [noticeSuccess, setNoticeSuccess] = useState(false);

  const storedKey = sessionStorage.getItem('sfb_admin_key') || '';

  const loadSubmissions = async (key: string) => {
    if (!key) return;
    setIsLoading(true);
    try {
      const res = await fetchAdminSubmissions(key);
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && storedKey) {
      loadSubmissions(storedKey);
    }
  }, [isAuthenticated, storedKey]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const keyToTest = passkey.trim();
    if (!keyToTest) {
      setLoginError('Password is required. Please enter the leadership password.');
      return;
    }
    const isValid = await verifyAdminAccess(keyToTest);
    if (isValid) {
      setIsAuthenticated(true);
      sessionStorage.setItem('sfb_admin_auth', 'true');
      sessionStorage.setItem('sfb_admin_key', keyToTest);
      loadSubmissions(keyToTest);
    } else {
      setLoginError('Invalid access password. Access denied.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('sfb_admin_auth');
    sessionStorage.removeItem('sfb_admin_key');
    setData(null);
  };

  const handleStatusChange = async (collectionName: string, id: string, newStatus: string) => {
    try {
      await updateAdminStatus(storedKey, collectionName, id, newStatus);
      loadSubmissions(storedKey);
    } catch (e) {
      alert('Could not update status.');
    }
  };

  const handleCreateNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim() || !noticeSummary.trim()) return;

    try {
      await createAdminNotice(storedKey, {
        title: noticeTitle,
        publicationDate: noticeDate,
        category: noticeCategory,
        shortDescription: noticeSummary,
        fullContent: noticeContent,
        isPinned: noticePinned
      });
      setNoticeSuccess(true);
      setNoticeTitle('');
      setNoticeSummary('');
      setNoticeContent('');
      loadSubmissions(storedKey);
      setTimeout(() => setNoticeSuccess(false), 4000);
    } catch {
      alert('Failed to publish notice.');
    }
  };

  const firestoreConsoleUrl = "https://console.firebase.google.com/project/deft-catcher-sgbcx/firestore/databases/ai-studio-studentsfederati-d26bb1a1-9ce0-44d9-808f-7edbc6482769/data";

  if (!isAuthenticated) {
    return (
      <div className="pt-28 pb-20 min-h-[85vh] flex items-center justify-center bg-[#F8F4EC] px-4">
        <div className="bg-white p-8 sm:p-10 rounded-xl shadow-xl border border-[#E4DCCE] max-w-md w-full space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-[#651D32] text-white rounded-xl flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-6 h-6 text-[#E4CEA4]" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-[#181719]">
              Leadership Access Portal
            </h1>
            <p className="text-xs text-stone-600">
              Restricted management console for authorized caseworkers and leadership review.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="passkey" className="block text-xs font-bold uppercase tracking-wider text-[#181719] mb-1.5">
                Secret Access Password
              </label>
              <input
                id="passkey"
                type="password"
                required
                placeholder="Enter password"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                className="w-full px-4 py-3 bg-[#F8F4EC] border border-[#E4DCCE] rounded-lg text-sm text-[#181719] focus:ring-2 focus:ring-[#651D32] focus:outline-none font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#651D32] hover:bg-[#3D101E] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4 text-[#C5A36A]" />
              <span>Unlock Leadership Desk</span>
            </button>
          </form>

          <div className="pt-4 border-t border-stone-100 text-center">
            <a
              href={firestoreConsoleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#651D32] hover:underline font-semibold"
            >
              <span>Open Firebase Cloud Console Directly</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-[#F8F4EC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Portal Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 pt-4 border-b border-[#E4DCCE]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#651D32] mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Confidential Leadership Console</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#181719]">
              Submissions & Grievances Desk
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={firestoreConsoleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider bg-white hover:bg-stone-50 border border-[#E4DCCE] rounded text-stone-700 hover:text-[#651D32] flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <span>Firebase Cloud Console</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => loadSubmissions(storedKey)}
              disabled={isLoading}
              className="p-2 bg-white hover:bg-stone-50 border border-[#E4DCCE] rounded text-stone-700 shadow-sm cursor-pointer"
              title="Refresh submissions"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-2 text-xs font-bold uppercase tracking-wider bg-stone-200 hover:bg-stone-300 text-stone-800 rounded cursor-pointer"
            >
              Exit
            </button>
          </div>
        </div>

        {/* Stats Strip */}
        {data?.stats && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 my-6">
            <button
              onClick={() => setActiveTab('reports')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                activeTab === 'reports' ? 'bg-[#651D32] text-white border-[#651D32] shadow-md' : 'bg-white border-[#E4DCCE] hover:border-stone-400'
              }`}
            >
              <span className="text-[11px] uppercase tracking-wider font-semibold opacity-80 block">Issue Reports</span>
              <span className="font-serif text-2xl font-bold">{data.stats.totalReports}</span>
            </button>

            <button
              onClick={() => setActiveTab('memberships')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                activeTab === 'memberships' ? 'bg-[#651D32] text-white border-[#651D32] shadow-md' : 'bg-white border-[#E4DCCE] hover:border-stone-400'
              }`}
            >
              <span className="text-[11px] uppercase tracking-wider font-semibold opacity-80 block">Applications</span>
              <span className="font-serif text-2xl font-bold">{data.stats.totalMemberships}</span>
            </button>

            <button
              onClick={() => setActiveTab('suggestions')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                activeTab === 'suggestions' ? 'bg-[#651D32] text-white border-[#651D32] shadow-md' : 'bg-white border-[#E4DCCE] hover:border-stone-400'
              }`}
            >
              <span className="text-[11px] uppercase tracking-wider font-semibold opacity-80 block">Ideas / Suggestions</span>
              <span className="font-serif text-2xl font-bold">{data.stats.totalSuggestions}</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                activeTab === 'messages' ? 'bg-[#651D32] text-white border-[#651D32] shadow-md' : 'bg-white border-[#E4DCCE] hover:border-stone-400'
              }`}
            >
              <span className="text-[11px] uppercase tracking-wider font-semibold opacity-80 block">Inquiries</span>
              <span className="font-serif text-2xl font-bold">{data.stats.totalMessages}</span>
            </button>

            <button
              onClick={() => setActiveTab('newNotice')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                activeTab === 'newNotice' ? 'bg-[#651D32] text-white border-[#651D32] shadow-md' : 'bg-white border-[#E4DCCE] hover:border-stone-400'
              }`}
            >
              <span className="text-[11px] uppercase tracking-wider font-semibold opacity-80 block">Publish Notice</span>
              <span className="font-serif text-2xl font-bold flex items-center gap-1">
                <Plus className="w-5 h-5" /> Add
              </span>
            </button>
          </div>
        )}

        {/* Tab 1: Issue Reports */}
        {activeTab === 'reports' && (
          <div className="bg-white rounded-xl border border-[#E4DCCE] shadow-sm overflow-hidden">
            <div className="p-4 bg-stone-50 border-b border-[#E4DCCE] flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold text-[#181719] flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-600" />
                <span>Student Grievance Reports ({data?.reports?.length || 0})</span>
              </h2>
              <span className="text-xs text-stone-500">Confidential / Anonymous Records</span>
            </div>

            {(!data?.reports || data.reports.length === 0) ? (
              <div className="p-12 text-center text-sm text-stone-500">No issue reports logged yet.</div>
            ) : (
              <div className="divide-y divide-stone-100">
                {data.reports.map((report: any) => (
                  <div key={report.id} className="p-6 space-y-3 hover:bg-stone-50/50 transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-2 py-0.5 bg-red-100 text-red-800 font-bold uppercase rounded">
                          {report.category}
                        </span>
                        <span className="font-mono text-stone-400">ID: {report.id}</span>
                        <span>·</span>
                        <span className="text-stone-500">{new Date(report.created_at).toLocaleString()}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="text-stone-500 font-medium">Status:</span>
                        <select
                          value={report.status || 'received'}
                          onChange={(e) => handleStatusChange('issue_reports', report.id, e.target.value)}
                          className="px-2 py-1 bg-white border border-stone-300 rounded text-xs font-semibold cursor-pointer"
                        >
                          <option value="received">Received</option>
                          <option value="under_review">Under Review</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </div>
                    </div>

                    {report.short_title && (
                      <h3 className="font-serif text-base font-bold text-[#181719]">{report.short_title}</h3>
                    )}

                    <div className="p-3.5 bg-stone-50 rounded-lg text-sm text-[#181719] leading-relaxed whitespace-pre-wrap">
                      {report.description}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600 pt-1">
                      <div>
                        <span className="font-semibold">Type: </span>
                        <span>{report.is_anonymous ? '🔒 100% Anonymous' : 'Identified'}</span>
                      </div>
                      {!report.is_anonymous && report.submitter_name && (
                        <div>
                          <span className="font-semibold">Name: </span>
                          <span>{report.submitter_name}</span>
                        </div>
                      )}
                      {!report.is_anonymous && report.submitter_email && (
                        <div>
                          <span className="font-semibold">Email: </span>
                          <span className="font-mono">{report.submitter_email}</span>
                        </div>
                      )}
                      {!report.is_anonymous && report.submitter_phone && (
                        <div>
                          <span className="font-semibold">Phone: </span>
                          <span>{report.submitter_phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Membership Applications */}
        {activeTab === 'memberships' && (
          <div className="bg-white rounded-xl border border-[#E4DCCE] shadow-sm overflow-hidden">
            <div className="p-4 bg-stone-50 border-b border-[#E4DCCE] flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold text-[#181719] flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-[#651D32]" />
                <span>Membership Applications ({data?.memberships?.length || 0})</span>
              </h2>
            </div>

            {(!data?.memberships || data.memberships.length === 0) ? (
              <div className="p-12 text-center text-sm text-stone-500">No applications received yet.</div>
            ) : (
              <div className="divide-y divide-stone-100">
                {data.memberships.map((app: any) => (
                  <div key={app.id} className="p-6 space-y-3 hover:bg-stone-50/50 transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 className="font-serif text-base font-bold text-[#181719]">{app.full_name}</h3>
                        <p className="text-xs text-stone-500">{app.email} · {app.school_college} ({app.city})</p>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="text-stone-500 font-medium">Review:</span>
                        <select
                          value={app.status || 'pending'}
                          onChange={(e) => handleStatusChange('membership_applications', app.id, e.target.value)}
                          className="px-2 py-1 bg-white border border-stone-300 rounded text-xs font-semibold cursor-pointer"
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="accepted">Accepted</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {Array.isArray(app.areas_of_interest) && app.areas_of_interest.map((i: string) => (
                        <span key={i} className="px-2 py-0.5 bg-[#651D32]/10 text-[#651D32] rounded text-[11px] font-semibold">
                          {i}
                        </span>
                      ))}
                    </div>

                    {app.why_join && (
                      <p className="text-xs text-stone-700 bg-stone-50 p-2.5 rounded italic">
                        "{app.why_join}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Student Suggestions */}
        {activeTab === 'suggestions' && (
          <div className="bg-white rounded-xl border border-[#E4DCCE] shadow-sm overflow-hidden">
            <div className="p-4 bg-stone-50 border-b border-[#E4DCCE] flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold text-[#181719] flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-600" />
                <span>Student Ideas & Suggestions ({data?.suggestions?.length || 0})</span>
              </h2>
            </div>

            {(!data?.suggestions || data.suggestions.length === 0) ? (
              <div className="p-12 text-center text-sm text-stone-500">No suggestions submitted yet.</div>
            ) : (
              <div className="divide-y divide-stone-100">
                {data.suggestions.map((sug: any) => (
                  <div key={sug.id} className="p-6 space-y-2.5 hover:bg-stone-50/50 transition-colors">
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span className="font-semibold text-[#651D32] uppercase">{sug.category}</span>
                      <span>{new Date(sug.created_at).toLocaleDateString()}</span>
                    </div>

                    <h3 className="font-serif text-base font-bold text-[#181719]">{sug.title}</h3>
                    <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-wrap">{sug.description}</p>
                    
                    {(sug.submitter_name || sug.submitter_email) && (
                      <p className="text-xs text-stone-500 pt-1">
                        By: {sug.submitter_name || 'Anonymous'} {sug.submitter_email ? `(${sug.submitter_email})` : ''}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Contact Inquiries */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-xl border border-[#E4DCCE] shadow-sm overflow-hidden">
            <div className="p-4 bg-stone-50 border-b border-[#E4DCCE] flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold text-[#181719] flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <span>General Contact Messages ({data?.messages?.length || 0})</span>
              </h2>
            </div>

            {(!data?.messages || data.messages.length === 0) ? (
              <div className="p-12 text-center text-sm text-stone-500">No contact messages received yet.</div>
            ) : (
              <div className="divide-y divide-stone-100">
                {data.messages.map((msg: any) => (
                  <div key={msg.id} className="p-6 space-y-2 hover:bg-stone-50/50 transition-colors">
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span className="font-bold text-[#181719]">{msg.subject}</span>
                      <span>{new Date(msg.created_at).toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                    <p className="text-xs text-stone-500">
                      From: {msg.name || 'Anonymous'} {msg.email ? `(${msg.email})` : ''}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Publish New Official Notice */}
        {activeTab === 'newNotice' && (
          <div className="bg-white p-8 rounded-xl border border-[#E4DCCE] shadow-sm max-w-2xl mx-auto space-y-6">
            <div className="space-y-1">
              <h2 className="font-serif text-xl font-bold text-[#181719] flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#651D32]" />
                <span>Publish Official Notice</span>
              </h2>
              <p className="text-xs text-stone-500">
                Publishes a verified circular directly to the public Notices board.
              </p>
            </div>

            {noticeSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 rounded flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Notice successfully published to the live notice board!</span>
              </div>
            )}

            <form onSubmit={handleCreateNotice} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#181719] mb-1">
                  Notice Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Schedule for District Collegiate Grievance Assemblies"
                  value={noticeTitle}
                  onChange={(e) => setNoticeTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8F4EC] border border-[#E4DCCE] rounded text-sm text-[#181719] focus:ring-2 focus:ring-[#651D32] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#181719] mb-1">
                    Publication Date
                  </label>
                  <input
                    type="date"
                    value={noticeDate}
                    onChange={(e) => setNoticeDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F8F4EC] border border-[#E4DCCE] rounded text-sm text-[#181719] focus:ring-2 focus:ring-[#651D32] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#181719] mb-1">
                    Category
                  </label>
                  <select
                    value={noticeCategory}
                    onChange={(e) => setNoticeCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F8F4EC] border border-[#E4DCCE] rounded text-sm text-[#181719] focus:ring-2 focus:ring-[#651D32] focus:outline-none"
                  >
                    <option value="Cyber Awareness">Cyber Awareness</option>
                    <option value="Student Welfare">Student Welfare</option>
                    <option value="Education">Education</option>
                    <option value="General">General</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#181719] mb-1">
                  Short Description / Summary *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Brief synopsis visible in the bulletin card..."
                  value={noticeSummary}
                  onChange={(e) => setNoticeSummary(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8F4EC] border border-[#E4DCCE] rounded text-sm text-[#181719] focus:ring-2 focus:ring-[#651D32] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#181719] mb-1">
                  Full Notice Content (Optional)
                </label>
                <textarea
                  rows={4}
                  placeholder="Comprehensive announcement text, guidelines, or details..."
                  value={noticeContent}
                  onChange={(e) => setNoticeContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8F4EC] border border-[#E4DCCE] rounded text-sm text-[#181719] focus:ring-2 focus:ring-[#651D32] focus:outline-none leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="pinCheck"
                  checked={noticePinned}
                  onChange={(e) => setNoticePinned(e.target.checked)}
                  className="h-4 w-4 rounded text-[#651D32]"
                />
                <label htmlFor="pinCheck" className="text-xs text-stone-700 cursor-pointer">
                  Pin to top of public board (Priority Announcement)
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#651D32] hover:bg-[#3D101E] text-white font-bold text-xs uppercase tracking-wider rounded shadow transition-colors cursor-pointer"
              >
                Publish Notice Live
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
