# Students Federation of Bikaner (SFB)
**"For People. For Education. For Change."**

Official digital platform of the Students Federation of Bikaner — an independent student collective movement in Bikaner, Rajasthan dedicated to student support, cyber awareness, educational access, and constructive action.

---

## 🏛️ Brand & Identity Specifications
- **Motto**: *"For People. For Education. For Change."*
- **Hero Headline**: *"A Generation That Speaks. A Movement That Acts."*
- **Emblem**: The authentic circular seal featuring the student raising a fist of solidarity with backpack and books, Bikaner Junagarh Fort with desert camel silhouette, soaring eagle, and white dove of peace with olive branch.
- **Top Inscription**: *"SOCIALIST • PEACEFUL • REVOLUTIONALIST"*
- **Bottom Inscription**: *"FOR PEOPLE • FOR EDUCATION • FOR CHANGE"*
- **Color Palette**:
  - Deep Maroon: `#651D32`
  - Dark Maroon: `#3D101E`
  - Warm Ivory: `#F8F4EC`
  - Sandstone Gold: `#C5A36A`
  - Charcoal: `#181719`
- **Anonymity Principle**: In adherence to the federation constitution, all founders, presidents, and leadership members operate anonymously as a unified collective. No personal biographies or photographs are published.

---

## 🔒 Security & Firebase Firestore Backend

The application is fully wired to Google Cloud **Firebase Firestore** with hardened Attribute-Based Access Control security rules deployed in `firestore.rules`:

### Collections:
1. `issue_reports`: Stores confidential student reports (anonymous or identified). **Public users can ONLY create; read/delete is strictly restricted to authorized administrators.**
2. `membership_applications`: Stores student volunteer & membership submissions in pending review status.
3. `notices`: Stores official public advisories and circulars with search and download capability.
4. `student_suggestions`: Stores student ideas and feedback privately.
5. `contact_messages`: Stores general public communications.

### Configuration
Live credentials are loaded directly via `firebase-applet-config.json` managed through AI Studio Fax RPC.

---

## 📱 Pages & Features
- **Cinematic Opening Experience**: A skippable, accessible, gold-and-maroon atmospheric intro with the official SFB insignia.
- **Home (`/`)**: Purpose, 4 action pillars (Student Support, Cyber Awareness, Education & Welfare, Student Participation), latest advisories, and Instagram highlight.
- **About Us (`/#about`)**: Editorial story, mission, vision, values, and collective identity.
- **Report an Issue (`/#report-an-issue`)**: 100% anonymous or identified confidential grievance intake for cyberbullying, blackmail, impersonation, or campus harassment.
- **Become a Member (`/#membership`)**: Application portal for student volunteers with interest selection and validation.
- **Official Notices (`/#notices`)**: Searchable official bulletin board with text advisory download.
- **Our Team (`/#our-team`)**: Collective movement architecture respecting 100% leadership anonymity.
- **Share an Idea (`/#share-an-idea`)**: Suggestion intake for improving campus life and digital education.
- **Contact (`/#contact`)**: Inquiries form and official Instagram link (`@students_federation_bkn`).
- **Privacy Policy (`/#privacy-policy`)**: Detailed technical disclosure of data handling, limits of anonymity, and retention.
- **Terms & Disclaimer (`/#terms`)**: Rules of use, emergency non-service disclosures, and grievance scopes.
