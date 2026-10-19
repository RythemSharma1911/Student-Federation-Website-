import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDocs, 
  collection, 
  query, 
  where, 
  orderBy,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Firebase configuration securely on the server
let firebaseConfig: Record<string, string> = {};
const configPath = path.resolve(__dirname, 'firebase-applet-config.json');

if (fs.existsSync(configPath)) {
  try {
    firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch (err) {
    console.error('Error reading firebase-applet-config.json:', err);
  }
}

// Initialize server-side Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Security: Prevent any direct client access to server configuration, credentials, or secrets
app.use((req, res, next) => {
  const sensitivePatterns = [
    'firebase-applet-config.json',
    'firebase-blueprint.json',
    'firestore.rules',
    '.env',
    'metadata.json',
    'package.json',
    'tsconfig.json'
  ];
  const lowerUrl = req.path.toLowerCase();
  for (const pattern of sensitivePatterns) {
    if (lowerUrl.includes(pattern)) {
      return res.status(403).json({ error: 'Access forbidden: Internal configuration files are protected.' });
    }
  }
  next();
});

// In-memory rate limiting to prevent spam on public endpoints
const submissionTimestamps: Record<string, number[]> = {};
function rateLimitMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 10;

  if (!submissionTimestamps[ip]) {
    submissionTimestamps[ip] = [];
  }
  submissionTimestamps[ip] = submissionTimestamps[ip].filter(t => now - t < windowMs);

  if (submissionTimestamps[ip].length >= maxRequests) {
    return res.status(429).json({ error: 'Too many requests. Please wait a minute before submitting again.' });
  }

  submissionTimestamps[ip].push(now);
  next();
}

function generateSafeId(prefix: string): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${prefix}_${timestamp}_${randomStr}`;
}

// ====================================================================
// PUBLIC API ROUTES (Server-side proxy: no keys exposed to browser)
// ====================================================================

// 1. Submit an Issue Report
app.post('/api/reports', rateLimitMiddleware, async (req, res) => {
  try {
    const { 
      category, 
      shortTitle, 
      description, 
      isAnonymous, 
      submitterName, 
      submitterEmail, 
      submitterPhone, 
      privacyAcknowledged 
    } = req.body;

    if (!category || !description || typeof description !== 'string' || !description.trim()) {
      return res.status(400).json({ error: 'Category and description are required.' });
    }

    if (!privacyAcknowledged) {
      return res.status(400).json({ error: 'Privacy acknowledgement is required.' });
    }

    const reportId = generateSafeId('rep');
    const docData = {
      category: String(category).trim().slice(0, 100),
      short_title: shortTitle ? String(shortTitle).trim().slice(0, 150) : null,
      description: String(description).trim().slice(0, 5000),
      is_anonymous: Boolean(isAnonymous),
      submitter_name: isAnonymous ? null : (submitterName ? String(submitterName).trim().slice(0, 100) : null),
      submitter_email: isAnonymous ? null : (submitterEmail ? String(submitterEmail).trim().slice(0, 100) : null),
      submitter_phone: isAnonymous ? null : (submitterPhone ? String(submitterPhone).trim().slice(0, 30) : null),
      privacy_acknowledged: true,
      status: 'received',
      created_at: new Date().toISOString()
    };

    await setDoc(doc(db, 'issue_reports', reportId), docData);

    return res.json({
      success: true,
      submissionId: reportId,
      message: 'Your report has been submitted successfully. Thank you for coming forward. Please remember that this platform is not an emergency service.'
    });
  } catch (error: unknown) {
    console.error('Server error storing report:', error);
    return res.status(500).json({ error: 'Secure server failed to record report. Please try again.' });
  }
});

// 2. Submit Membership Application
app.post('/api/membership', rateLimitMiddleware, async (req, res) => {
  try {
    const { fullName, email, schoolCollege, city, areasOfInterest, whyJoin, privacyAcknowledged } = req.body;

    if (!fullName || !email || !schoolCollege || !city) {
      return res.status(400).json({ error: 'All primary contact fields are required.' });
    }

    if (!privacyAcknowledged) {
      return res.status(400).json({ error: 'Privacy agreement is required.' });
    }

    const applicationId = generateSafeId('app');
    const docData = {
      full_name: String(fullName).trim().slice(0, 120),
      email: String(email).trim().slice(0, 120),
      school_college: String(schoolCollege).trim().slice(0, 150),
      city: String(city).trim().slice(0, 100),
      areas_of_interest: Array.isArray(areasOfInterest) ? areasOfInterest.map(a => String(a).slice(0, 50)) : ['General Membership'],
      why_join: whyJoin ? String(whyJoin).trim().slice(0, 1000) : null,
      privacy_acknowledged: true,
      status: 'pending',
      created_at: new Date().toISOString()
    };

    await setDoc(doc(db, 'membership_applications', applicationId), docData);

    return res.json({
      success: true,
      submissionId: applicationId,
      message: 'Your membership application has been received. Thank you for your interest in the Students Federation of Bikaner.'
    });
  } catch (error: unknown) {
    console.error('Server error storing membership:', error);
    return res.status(500).json({ error: 'Failed to record application on secure server.' });
  }
});

// 3. Submit Student Suggestion (Share an Idea)
app.post('/api/suggestions', rateLimitMiddleware, async (req, res) => {
  try {
    const { title, category, description, submitterName, submitterEmail, privacyAcknowledged } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ error: 'Title, category, and description are required.' });
    }

    if (!privacyAcknowledged) {
      return res.status(400).json({ error: 'Privacy acknowledgement is required.' });
    }

    const suggestionId = generateSafeId('idea');
    const docData = {
      title: String(title).trim().slice(0, 150),
      category: String(category).trim().slice(0, 80),
      description: String(description).trim().slice(0, 3000),
      submitter_name: submitterName ? String(submitterName).trim().slice(0, 100) : null,
      submitter_email: submitterEmail ? String(submitterEmail).trim().slice(0, 120) : null,
      privacy_acknowledged: true,
      status: 'submitted',
      created_at: new Date().toISOString()
    };

    await setDoc(doc(db, 'student_suggestions', suggestionId), docData);

    return res.json({
      success: true,
      submissionId: suggestionId,
      message: 'Your idea has been recorded. Thank you for contributing to our collective student vision.'
    });
  } catch (error: unknown) {
    console.error('Server error storing suggestion:', error);
    return res.status(500).json({ error: 'Failed to record suggestion.' });
  }
});

// 4. Submit Contact Message
app.post('/api/contact', rateLimitMiddleware, async (req, res) => {
  try {
    const { name, email, subject, message, privacyAcknowledged } = req.body;

    if (!subject || !message) {
      return res.status(400).json({ error: 'Subject and message are required.' });
    }

    if (!privacyAcknowledged) {
      return res.status(400).json({ error: 'Privacy acknowledgement is required.' });
    }

    const messageId = generateSafeId('msg');
    const docData = {
      name: name ? String(name).trim().slice(0, 100) : null,
      email: email ? String(email).trim().slice(0, 120) : null,
      subject: String(subject).trim().slice(0, 150),
      message: String(message).trim().slice(0, 3000),
      privacy_acknowledged: true,
      created_at: new Date().toISOString()
    };

    await setDoc(doc(db, 'contact_messages', messageId), docData);

    return res.json({
      success: true,
      submissionId: messageId,
      message: 'Your message has been securely recorded. Thank you for reaching out.'
    });
  } catch (error: unknown) {
    console.error('Server error storing contact message:', error);
    return res.status(500).json({ error: 'Failed to record message on server.' });
  }
});

// 5. Fetch Notices (Public published circulars)
app.get('/api/notices', async (req, res) => {
  try {
    const q = query(collection(db, 'notices'), where('is_published', '==', true));
    const snapshot = await getDocs(q);
    const notices: any[] = [];
    snapshot.forEach(docSnap => {
      notices.push({ id: docSnap.id, ...docSnap.data() });
    });
    return res.json(notices);
  } catch (error) {
    return res.json([]);
  }
});

// ====================================================================
// EXECUTIVE ADMIN API (For seemavinay1920@gmail.com)
// ====================================================================

// Simple secure session token for the executive portal
const ADMIN_ACCESS_KEY = process.env.ADMIN_KEY || 'sfb_lead_2026';

app.post('/api/admin/verify', (req, res) => {
  const { key, email } = req.body;
  const authorizedEmails = ['seemavinay1920@gmail.com'];

  if ((email && authorizedEmails.includes(email.toLowerCase())) || key === ADMIN_ACCESS_KEY) {
    return res.json({ authorized: true, role: 'executive_officer' });
  }
  return res.status(401).json({ error: 'Unauthorized access. Only official leadership may access submissions.' });
});

app.get('/api/admin/all-submissions', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${ADMIN_ACCESS_KEY}` && !req.headers['x-admin-key']) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }

  try {
    const [reportsSnap, membershipsSnap, suggestionsSnap, messagesSnap, noticesSnap] = await Promise.all([
      getDocs(collection(db, 'issue_reports')),
      getDocs(collection(db, 'membership_applications')),
      getDocs(collection(db, 'student_suggestions')),
      getDocs(collection(db, 'contact_messages')),
      getDocs(collection(db, 'notices'))
    ]);

    const reports: any[] = [];
    reportsSnap.forEach(d => reports.push({ id: d.id, ...d.data() }));

    const memberships: any[] = [];
    membershipsSnap.forEach(d => memberships.push({ id: d.id, ...d.data() }));

    const suggestions: any[] = [];
    suggestionsSnap.forEach(d => suggestions.push({ id: d.id, ...d.data() }));

    const messages: any[] = [];
    messagesSnap.forEach(d => messages.push({ id: d.id, ...d.data() }));

    const notices: any[] = [];
    noticesSnap.forEach(d => notices.push({ id: d.id, ...d.data() }));

    return res.json({
      stats: {
        totalReports: reports.length,
        totalMemberships: memberships.length,
        totalSuggestions: suggestions.length,
        totalMessages: messages.length,
        totalNotices: notices.length
      },
      reports: reports.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
      memberships: memberships.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
      suggestions: suggestions.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
      messages: messages.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
      notices
    });
  } catch (error: unknown) {
    console.error('Error fetching admin data:', error);
    return res.status(500).json({ error: 'Failed to retrieve records.' });
  }
});

// Update issue report or membership status
app.patch('/api/admin/status', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${ADMIN_ACCESS_KEY}` && !req.headers['x-admin-key']) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }

  const { collectionName, id, status } = req.body;
  if (!collectionName || !id || !status) {
    return res.status(400).json({ error: 'Missing parameters.' });
  }

  try {
    await updateDoc(doc(db, collectionName, id), { status });
    return res.json({ success: true, id, status });
  } catch (err: unknown) {
    return res.status(500).json({ error: 'Failed to update status.' });
  }
});

// Add new official notice
app.post('/api/admin/notices', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${ADMIN_ACCESS_KEY}` && !req.headers['x-admin-key']) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }

  const { title, publicationDate, shortDescription, fullContent, category, isPinned } = req.body;
  if (!title || !shortDescription) {
    return res.status(400).json({ error: 'Title and short description are required.' });
  }

  try {
    const noticeId = generateSafeId('not');
    const noticeData = {
      title: String(title).trim().slice(0, 200),
      publication_date: publicationDate || new Date().toISOString().split('T')[0],
      short_description: String(shortDescription).trim().slice(0, 500),
      full_content: fullContent ? String(fullContent).trim().slice(0, 10000) : null,
      category: category || 'General',
      is_pinned: Boolean(isPinned),
      is_published: true,
      created_at: new Date().toISOString()
    };

    await setDoc(doc(db, 'notices', noticeId), noticeData);
    return res.json({ success: true, noticeId });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to publish notice.' });
  }
});

// ====================================================================
// VITE CLIENT MIDDLEWARE / PRODUCTION STATIC SERVER
// ====================================================================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Students Federation of Bikaner full-stack server running on http://localhost:${PORT}`);
  });
}

startServer();
