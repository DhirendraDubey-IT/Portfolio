# Dhirendra Dubey — 3D Cinematic Portfolio & Personal Digital Universe

Production-ready, full-stack personal 3D portfolio website for **Dhirendra Dubey**, B.Tech Information Technology student at SR Group of Institutions (SRGI), Lucknow.

---

## 1. Installation

Clone or open the repository in your environment:

```bash
git clone <repo-url>
cd dhirendra-portfolio
npm install
```

---

## 2. Frontend Setup

The frontend is built with:
- **React 19** + **Vite 6**
- **Three.js** (WebGL 3D space, interactive particle fields, holographic frame, reactive orbital rings)
- **Tailwind CSS v4** (Dark cinematic glassmorphism, responsive editorial layout)
- **Motion / Framer Motion** (Smooth transitions and interactions)
- **Lucide React** (Crisp vector icons)

All client code resides under `/src`.

---

## 3. Backend Setup

The backend is built with:
- **Node.js** + **Express.js**
- **Helmet** (Security headers)
- **CORS** (Configured cross-origin resource sharing)
- **Mongoose / MongoDB** (Persistent contact inquiries with graceful in-memory fallback)
- **Input Validation** (Name, email format, subject, and length bounds)
- **Centralized Error Handling** (Formatted JSON error responses)

API Endpoints:
- `POST /api/contact` - Submits a contact inquiry (saves to MongoDB/memory store)
- `GET /api/contact/messages` - Retrieves recent contact messages
- `GET /api/health` - Health check status endpoint (`{"status":"ok"}`)

---

## 4. MongoDB Setup

1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or run MongoDB locally.
2. Obtain your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.mongodb.net/dhirendra_portfolio?retryWrites=true&w=majority
   ```
3. Set `MONGODB_URI` in `.env` (required for persistent MongoDB connection).
4. If `MONGODB_URI` is not provided during preview, an in-memory fallback store is used so the contact form works without interruption during development.

---

## 5. Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000

# MONGODB_URI: Required for persistent MongoDB connection
MONGODB_URI=

# CLIENT_URL: Optional during development.
# If left empty, current development and AI Studio preview origins are allowed automatically.
# Set this to your live domain when deploying to production.
CLIENT_URL=
```

---

## 6. Development Commands

Start the full-stack dev server (starts Express backend + Vite dev middleware):
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

Lint and verify TypeScript types:
```bash
npm run lint
```

---

## 7. Production Build

Build the optimized client bundle:
```bash
npm run build
```

The output will be created in `/dist`.

---

## 8. Deployment

Run the production full-stack server:
```bash
npm run start
```
The server serves the compiled `/dist` frontend assets while serving the `/api/*` endpoints.

---

## 9. How to Replace Profile Photo

1. Place your new portrait image file in `/src/assets/images/` or `/public/`.
2. In `/src/data/portfolioData.ts`, update `personalInfo.photoUrl` to point to your new file path or import it directly.
3. The 3D holographic frame and orbital rings will automatically render your new photo.

---

## 10. How to Replace Resume

1. Place your updated resume file in `/public/resume-dhirendra-dubey.pdf`.
2. The portfolio includes both an in-app interactive Resume viewer modal and a direct PDF download trigger.
3. You can also edit the resume fields in `/src/data/portfolioData.ts` to reflect updated experiences, hackathons, or grades.

---

## 11. How to Update Portfolio Content

All personal data, projects, educational background, certifications, and skills are centrally organized in `/src/data/portfolioData.ts`:
- **Personal Info**: Name, title, email, LinkedIn, location
- **Education**: B.Tech IT, SRGI Lucknow, Class 12, Class 10
- **Skills**: Programming, Web Development, Database, AI/Cybersecurity, Tools
- **Projects**: Data Shield AI (with interactive shield visualizer) and Fake News & Phishing URL Detection (with live URL threat analyzer)
- **Experience**: Zenith Marketing Agency (E-Commerce Manager), InAmigos Foundation (Content Writer)
- **Achievements**: Awards, medals, hackathon rankings, reasoning & aptitude honors
- **Certifications**: HP LIFE certifications with dates and verification IDs
- **Interests**: Coding, Cooking, Reading, Poetry & Article Writing
- **Languages**: Hindi (High Proficiency), English (Intermediate)
