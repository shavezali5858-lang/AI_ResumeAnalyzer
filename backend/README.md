# 🤖 AI Resume Analyzer

An AI-powered resume analysis platform that helps users evaluate their resumes against a specific target job role. Users can upload their resume, select a target position, and receive structured insights to understand how well their resume matches the requirements of the role.

---

## 🚀 Features

* 🔐 User Registration & Login
* 📧 Email OTP Verification
* 🔑 Forgot & Reset Password
* 🍪 Secure Session-Based Authentication
* 📄 PDF Resume Upload
* 📑 Resume Text Extraction
* 🎯 Target Job Position Selection
* 🤖 AI/ATS-Style Resume Analysis
* 🔒 Protected API Routes
* 👤 User-Specific Resume Data
* 📱 Responsive User Interface
* 🌐 RESTful API Architecture

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* REST APIs

### Database

* MongoDB
* Mongoose

### Authentication & Security

* Express Session
* HTTP-only Cookies
* Password Hashing
* OTP Verification

### Other Technologies

* Multer – Resume/File Upload
* Nodemailer – Email & OTP
* PDF Parser – Resume Text Extraction

---


### live link demo 
 link -> https://ai-resume-analyzer-nx5g.onrender.com/
 ---

## 📂 Project Structure

```text
AI-Resume-Analyzer/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🔄 Application Flow

```text
Register
   ↓
Email OTP Verification
   ↓
Login
   ↓
Dashboard
   ↓
Upload Resume
   ↓
Select Target Position
   ↓
Resume Text Extraction
   ↓
AI/ATS Analysis
   ↓
View Analysis Results
```

---

## 📄 Resume Upload

The application allows users to upload PDF resumes.

The backend uses **Multer** to handle file uploads and validates the uploaded file before storing its information.

The resume text is then extracted from the PDF and processed for analysis.

---

## 🔐 Authentication Flow

The application uses session-based authentication.

```text
User Login
    ↓
Credentials Validation
    ↓
Session Created
    ↓
HTTP-only Cookie
    ↓
Protected API Requests
    ↓
Authenticated User
```

Passwords are securely hashed before being stored in the database.

Email verification is handled using a one-time OTP sent through Nodemailer.

---

## 🎯 Resume Analysis

The user selects a target position such as:

```text
Full Stack Developer
Backend Developer
Frontend Developer
Software Developer
```

The resume is then evaluated against the selected position to provide useful insights such as:

* Resume-job relevance
* Skills matching
* Missing skills
* Resume strengths
* Areas for improvement
* ATS-style suggestions

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ai-resume-analyzer.git
```

### 2. Navigate to the project

```bash
cd ai-resume-analyzer
```

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Install frontend dependencies

```bash
cd ../frontend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=8000

MONGO_URI=your_mongodb_connection_string

SESSION_SECRET=your_session_secret

EMAIL_USER=your_email
EMAIL_PASS=your_email_password

AI_API_KEY=your_ai_api_key
```

> Never commit your `.env` file or API keys to GitHub.

---

## ▶️ Running the Project

### Start Backend

```bash
cd backend
npm start
```

Backend will run on:

```
http://localhost:8000
```

### Start Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

The frontend will run on the URL provided by Vite.

---

## 🧪 API Features

The backend provides REST APIs for:

| Feature         | Method | Purpose                     |
| --------------- | ------ | --------------------------- |
| Register        | POST   | Create a new account        |
| Login           | POST   | Authenticate user           |
| Verify OTP      | POST   | Verify email                |
| Forgot Password | POST   | Request password reset      |
| Reset Password  | POST   | Update password             |
| Logout          | POST   | Destroy session             |
| Upload Resume   | POST   | Upload PDF resume           |
| Analyze Resume  | POST   | Analyze uploaded resume     |
| Get User Data   | GET    | Retrieve user-specific data |

---

## 🔒 Security

The project implements several security practices:

* Password hashing
* HTTP-only authentication cookies
* Protected routes
* User ownership validation
* Environment variables for secrets
* File type validation
* File size restrictions
* Input validation

---


## 🎯 Future Improvements

* [ ] More advanced ATS scoring
* [ ] Job description comparison
* [ ] Resume keyword optimization
* [ ] AI-generated improvement suggestions
* [ ] Multiple resume versions
* [ ] Resume templates
* [ ] Downloadable analysis reports
* [ ] Job recommendation system
* [ ] Resume section-by-section analysis

---

## 📚 What I Learned

This project helped me practice and understand:

* Full-stack application development
* REST API development
* Authentication & authorization
* Session management
* Email OTP systems
* Password reset workflows
* File uploads with Multer
* PDF text extraction
* MongoDB database design
* Protected routes
* Frontend-backend integration
* Handling user-specific data
* Building responsive interfaces

---

## 👨‍💻 Author

**Shavez Ali**

Built as a full-stack project to practice modern web development and AI-powered application development.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.
