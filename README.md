# Digital Literacy & Cyber Safety Awareness in Rural Communities
**Community Service Project (CSP) — Industry-Grade Full-Stack Web Application**

---

## 🌟 Project Overview
GramSuraksha is a dedicated, full-stack digital empowerment platform built for rural communities. With smartphone adoption rapidly rising across rural villages, citizens are often targeted by cyber criminals through fake loan apps, lottery frauds, OTP scams, and electricity disconnection threats.

This platform bridges the rural digital divide by providing:
1. **Smartphone Literacy & App Permission Essentials**
2. **Secure Digital Payments & UPI Simulation (The Golden Rule: Never enter PIN to receive money)**
3. **Official Online Government Services Access (DigiLocker, PM-Kisan, UMANG)**
4. **Cyber Safety Education, Scam Defense & Interactive Quiz**
5. **Real-Time Grassroots Survey Collection & Awareness Rating**
6. **Community Helpdesk & National Cyber Crime Helpline (1930) Integration**
7. **Secure Administrator Control Panel with Real MongoDB Analytics**

---

## 🛠️ Technology Stack

### **Frontend**
- **React.js (Vite)** — Fast, component-driven reactive UI
- **React Router (v6)** — Single Page Application navigation
- **Lucide Icons** — Modern, accessible SVG icon library
- **Custom CSS3 Design System**:
  - Theme: Navy Blue (`#0B192C`), Royal Blue (`#1e40af`), Pure White (`#ffffff`), Cyan Glow (`#00f2fe`)
  - Glassmorphism (`backdrop-filter: blur(14px)`, translucent frosted glass borders)
  - 3D hover elevations, smooth keyframe animations, responsive drawer navigation
  - Professional typography (Outfit & Plus Jakarta Sans)

### **Backend**
- **Node.js & Express.js** — Modular RESTful API server
- **JSON Web Tokens (JWT)** — Stateless secure authentication
- **Bcrypt.js** — Industry-standard salted password hashing
- **CORS** — Cross-Origin Resource Sharing enabled

### **Database & Data Resilience**
- **MongoDB & Mongoose ODM** — Schemas with strict validation for `Users`, `Surveys`, `Contacts`, and `Articles`
- **Dual-Mode Data Resilience Engine**:
  - Automatically connects to live MongoDB (local or Atlas via `MONGODB_URI`).
  - If MongoDB is not yet running, seamlessly falls back to a persistent JSON store (`server/data/local_db.json`) without any crashes or downtime, allowing instant plug-and-play testing!

---

## 📂 Project Architecture

```
digital-literacy-cyber-safety/
├── client/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── context/
│       │   └── AuthContext.jsx
│       ├── services/
│       │   └── api.js
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   ├── AuthModal.jsx
│       │   └── ProtectedRoute.jsx
│       └── pages/
│           ├── Home.jsx
│           ├── About.jsx
│           ├── DigitalLiteracy.jsx
│           ├── CyberSafety.jsx
│           ├── AwarenessResources.jsx
│           ├── CommunitySurvey.jsx
│           ├── ContactUs.jsx
│           └── AdminDashboard.jsx
├── server/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── .env.example
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Survey.js
│   │   ├── Contact.js
│   │   └── Article.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── surveyController.js
│   │   ├── contactController.js
│   │   ├── articleController.js
│   │   └── dashboardController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── surveyRoutes.js
│   │   ├── contactRoutes.js
│   │   ├── articleRoutes.js
│   │   └── dashboardRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   └── seed/
│       └── seedData.js
├── package.json
└── README.md
```

---

## 🚀 Step-by-Step Setup & Run Instructions

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (included with Node.js)
- **MongoDB** (Optional: local MongoDB community server or MongoDB Atlas cloud URI. If not installed, the app automatically runs on persistent local storage).

---

### 2. Running the Backend Server

Open your first terminal window and navigate to the `server` folder:

```bash
cd C:\Users\sathw\.gemini\antigravity\scratch\digital-literacy-cyber-safety\server
node server.js
```

You will see:
```text
======================================================
  DIGITAL LITERACY & CYBER SAFETY AWARENESS PLATFORM  
  Community Service Project (CSP) - Backend Server   
======================================================
 Server active on port: 5000
 API Health Check: http://localhost:5000/api/health
 Default Admin: admin@community.org | Pass: admin123
======================================================
```

---

### 3. Running the React Frontend

Open a second terminal window and navigate to the `client` folder:

```bash
cd C:\Users\sathw\.gemini\antigravity\scratch\digital-literacy-cyber-safety\client
npm.cmd run dev
```

Open your browser at:
👉 **`http://localhost:3000`**

---

## 🔑 Default Administrator Credentials
The database is auto-seeded with default admin credentials so you can log in right away:

- **Email:** `admin@community.org`
- **Password:** `admin123`
- *(Tip: In the Sign-In modal, there is also a 1-click button **"Fill Admin Demo Credentials"** for instant testing!)*

---

## 🧪 Testing All Application Modules

1. **Home Page (`/`)**:
   - Check real-time field stats aggregated from the database.
   - Test the interactive **"Is It A Scam?"** scenario checker.
   - Click the emergency 1930 helpline badges.

2. **Digital Literacy (`/digital-literacy`)**:
   - Switch between **Smartphone Essentials**, **UPI & Digital Payments**, and **Government Portals**.
   - Test the **Interactive UPI Simulator**: Choose *Pay* (requires PIN) vs *Receive* (NO PIN EVER!).

3. **Cyber Safety (`/cyber-safety`)**:
   - Review the breakdown of rural cyber threats (loan apps, disconnection scams, SIM swap).
   - Take the **Interactive Cyber Awareness Quiz** (5 questions) with instant scoring and explanation.

4. **Awareness Resources (`/resources`)**:
   - Search articles by keyword (e.g. "UPI", "loan", "DigiLocker").
   - Filter by categories using pill buttons.
   - Click any card to open the **Full Article Modal** with key takeaways and print option.

5. **Community Survey (`/survey`)**:
   - Fill out the realistic survey form (demographics, smartphone usage, fraud experience).
   - Submit to calculate your dynamic **Digital Awareness Score (0-100)** saved directly to MongoDB.

6. **Contact Us (`/contact`)**:
   - Submit an inquiry or workshop request.
   - View emergency numbers and expandable community FAQs.

7. **Admin Dashboard (`/admin`)**:
   - Sign in with `admin@community.org` / `admin123`.
   - **Overview Tab:** View database stats, demographic distribution bars, and barrier charts.
   - **Surveys Tab:** Search and view detailed survey submissions.
   - **Articles Tab:** Publish, edit, and delete educational articles.
   - **Inquiries Tab:** Update inquiry statuses (`New` → `In Review` → `Resolved`) or delete messages.
