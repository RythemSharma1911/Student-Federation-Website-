import React, { useState } from 'react';
import type { Notice } from '../types';
import { 
  Bell, 
  Download, 
  FileText, 
  Calendar, 
  Pin, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface NoticesPageProps {
  notices: Notice[];
}

export const NoticesPage: React.FC<NoticesPageProps> = ({ notices }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedNoticeId, setExpandedNoticeId] = useState<string | null>(null);

  const categories = ['All', ...Array.from(new Set(notices.map((n) => n.category)))];

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch = 
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (notice.fullContent && notice.fullContent.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || notice.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort pinned first, then by date descending
  const sortedNotices = [...filteredNotices].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime();
  });

  const toggleExpand = (id: string) => {
    setExpandedNoticeId(expandedNoticeId === id ? null : id);
  };

  const handleDownloadNotice = (notice: Notice) => {
    const content = `=====================================================
STUDENTS FEDERATION OF BIKANER
OFFICIAL NOTICE & ADVISORY
=====================================================

Title: ${notice.title}
Date of Publication: ${notice.publicationDate}
Category: ${notice.category}
Status: Verified Official Bulletin

-----------------------------------------------------
SUMMARY:
${notice.shortDescription}

-----------------------------------------------------
FULL CONTENT:
${notice.fullContent || notice.shortDescription}

=====================================================
Students Federation of Bikaner
"For People. For Education. For Change."
Official Handle: @students_federation_bkn
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${notice.title.replace(/[^a-zA-Z0-9]/g, '_')}_SFB.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-24 pb-20 bg-[#F8F4EC]">
      
      {/* Editorial Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#651D32]/10 border border-[#651D32]/20 text-[#651D32] rounded text-xs font-bold uppercase tracking-wider mb-4">
          <Bell className="w-3.5 h-3.5" />
          <span>Official Public Board</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#181719] tracking-tight">
          Notices & Announcements
        </h1>
        <div className="w-16 h-0.5 mx-auto my-4 bg-[#651D32]" />
        
        <p className="text-base sm:text-lg text-[#181719]/80 max-w-2xl mx-auto leading-relaxed">
          Official bulletins, student safety advisories, and public announcements issued by the Students Federation of Bikaner.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Search & Filter Toolbar */}
        <div className="bg-white p-4 rounded-xl border border-[#E4DCCE] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search advisories & notices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#F8F4EC] border border-[#E4DCCE] rounded-lg text-xs text-[#181719] focus:ring-2 focus:ring-[#651D32] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#651D32] text-white shadow-sm'
                    : 'bg-[#F8F4EC] text-stone-600 hover:text-stone-900 border border-[#E4DCCE]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Notices Listing */}
        {sortedNotices.length === 0 ? (
          <div className="bg-white p-12 rounded-xl border border-[#E4DCCE] text-center space-y-3">
            <Bell className="w-12 h-12 text-stone-300 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-[#181719]">
              No Notices Found
            </h3>
            <p className="text-sm text-stone-600 max-w-md mx-auto">
              No official notices have been published yet or match your search criteria. Please check back for updates.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedNotices.map((notice) => {
              const isExpanded = expandedNoticeId === notice.id;

              return (
                <article
                  key={notice.id}
                  className={`bg-white rounded-xl border transition-all overflow-hidden ${
                    notice.isPinned
                      ? 'border-[#C5A36A] shadow-md ring-1 ring-[#C5A36A]/20'
                      : 'border-[#E4DCCE] shadow-sm hover:border-stone-300'
                  }`}
                >
                  <div className="p-6 sm:p-8">
                    
                    {/* Header Row: Category, Date, Pinned Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 mb-3">
                      <div className="flex items-center gap-2">
                        {notice.isPinned && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#C5A36A]">
                            <Pin className="w-3.5 h-3.5 fill-[#C5A36A]" />
                            <span>Pinned Notice</span>
                          </span>
                        )}
                        {notice.isPinned && <span>·</span>}
                        <span className="font-semibold text-[#651D32] uppercase tracking-wider">
                          {notice.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-stone-500 font-mono text-xs">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{notice.publicationDate}</span>
                      </div>
                    </div>

                    {/* Notice Title */}
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#181719] mb-3 leading-snug">
                      {notice.title}
                    </h2>

                    {/* Short Description */}
                    <p className="text-sm sm:text-base text-[#181719]/80 leading-relaxed mb-4">
                      {notice.shortDescription}
                    </p>

                    {/* Expanded Content View */}
                    {isExpanded && notice.fullContent && (
                      <div className="mt-4 pt-4 border-t border-stone-200 text-sm text-[#181719]/85 space-y-3 leading-relaxed animate-in fade-in duration-200 bg-stone-50 p-4 rounded-lg">
                        <div className="font-semibold text-xs uppercase tracking-wider text-[#651D32]">
                          Full Bulletin Content:
                        </div>
                        <p>{notice.fullContent}</p>
                      </div>
                    )}

                    {/* Actions: Read More & Download */}
                    <div className="mt-6 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {notice.fullContent && (
                          <button
                            onClick={() => toggleExpand(notice.id)}
                            className="text-xs font-bold uppercase tracking-wider text-[#651D32] hover:text-[#3D101E] flex items-center gap-1 cursor-pointer"
                          >
                            <span>{isExpanded ? 'Collapse Notice' : 'Read Full Notice'}</span>
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => handleDownloadNotice(notice)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#181719] hover:text-[#651D32] bg-[#F8F4EC] hover:bg-[#EEE7D7] rounded border border-[#E4DCCE] transition-colors cursor-pointer"
                        title="Download official text advisory"
                      >
                        <Download className="w-3.5 h-3.5 text-[#C5A36A]" />
                        <span>Download Advisory</span>
                      </button>
                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
