# VisionTrack UI Kit - Complete Frontend Implementation

A professional React-based admin dashboard for employee attendance tracking with AI-powered facial recognition, fully integrated with Django REST Framework backend.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [Usage Guide](#usage-guide)
- [API Integration](#api-integration)
- [Component Documentation](#component-documentation)
- [Development Guidelines](#development-guidelines)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## 🎯 Project Overview

**VisionTrack UI Kit** is a comprehensive attendance management system that combines modern web technologies with facial recognition capabilities. It provides role-based access control for both administrators and employees, enabling seamless attendance marking through real-time face detection.

### Key Objectives:
- **Real-time Face Detection**: Capture and verify employee faces using face-api.js
- **Role-Based Access**: Separate dashboards for admin and employee portals
- **Attendance Automation**: One-click attendance marking with facial verification
- **Historical Tracking**: Complete attendance history with date/time records
- **Modern UI/UX**: Professional design using shadcn/ui components and Tailwind CSS

---

## ✨ Features

### 1. **Authentication & Authorization**
- JWT-based login system with email verification
- Role-based access control (Admin/Employee roles)
- Automatic role-based redirection after login
- Secure logout with session cleanup
- Token management in localStorage and cookies

### 2. **Face Verification & Recognition**
- Real-time face detection using face-api.js (TinyFaceDetector)
- Live camera preview with AI overlay effects
- Visual feedback with detection indicators
- Face mesh visualization on captured images
- Automatic employee profile retrieval from backend
- Three verification states:
  - **Loading**: Checking employee status
  - **Verified**: Employee already registered
  - **Not Verified**: First-time registration required

### 3. **Attendance Tracking**
- **Standalone Attendance Page** (`/attendance`)
  - Real-time camera feed without layout wrapper
  - Automatic face detection and submission
  - One-click attendance marking
  - Multi-user support (camera ready for next employee)
  - No confirmation step (streamlined UX)
- **Attendance History**
  - Complete attendance logs table
  - Date and time records
  - Attendance status display
  - Verification check before displaying history

### 4. **Admin Dashboard** (`/admin`)
- Employee management interface
- Attendance reports and analytics
- Role-based sidebar navigation
- Responsive admin layout with user info display
- Dashboard metrics and monitoring

### 5. **Employee Dashboard** (`/employee`)
- Personal attendance history
- Face verification status
- Employee profile information
- Attendance logs table
- Quick attendance access link

### 6. **UI/UX Components**
- **shadcn/ui Library**: 40+ pre-built components
  - Cards, Buttons, Tables, Dialogs, Dropdowns, etc.
  - Form components with validation
  - Toast notifications for user feedback
- **Responsive Design**
  - Mobile-first approach
  - Adaptive layouts for all screen sizes
  - Dark theme with gradient styling
- **Navigation**
  - Main navbar with attendance link
  - Role-based sidebar menus
  - Breadcrumb navigation

### 7. **API Integration**
- Centralized API configuration (`src/config/api.ts`)
- Service layer architecture for API calls
- JWT token management
- Error handling with custom ApiError class
- Base64 image encoding for face capture
- Five integrated backend endpoints

### 8. **Additional Features**
- Employee name display (auto-fetched from backend)
- Back button navigation to home page
- Loading states and error messages
- Toast notifications for success/error feedback
- Removed all Lovable platform dependencies

---

## 🛠️ Technology Stack

### Frontend
- **React 18.3** - UI framework
- **TypeScript 5.8** - Type-safe development
- **Vite 5.4** - Build tool and dev server
- **React Router 6.30** - Client-side routing
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **face-api.js** - Facial recognition library
- **Recharts 2.15** - Data visualization
- **Zod 3.25** - Runtime type validation
- **React Hook Form 7.61** - Form management

### Backend (Django REST Framework)
- **Python 3.x**
- **Django 3.x+**
- **Django REST Framework**
- **SimpleJWT** - JWT authentication
- **PostgreSQL/MySQL** - Database
- **Face Recognition Libraries**:
  - deepface
  - face-recognition
  - face-api (Python bindings)

### Development Tools
- **ESLint 9.32** - Code linting
- **TypeScript ESLint** - TS linting
- **PostCSS 8.5** - CSS processing
- **Autoprefixer 10.4** - CSS vendor prefixes

---

## 📁 Project Structure

```
visiontrack-ui-kit-main/
├── src/
│   ├── components/
│   │   ├── AdminLayout.tsx          # Admin portal layout wrapper
│   │   ├── EmployeeLayout.tsx       # Employee portal layout wrapper
│   │   ├── Navbar.tsx               # Main navigation bar
│   │   ├── NavLink.tsx              # Navigation link component
│   │   └── ui/                      # shadcn/ui components (40+)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── table.tsx
│   │       └── [other components]
│   ├── pages/
│   │   ├── login.tsx                # Login page
│   │   ├── Index.tsx                # Landing page
│   │   ├── Landing.tsx              # Hero landing
│   │   ├── AdminDashboard.tsx       # Admin portal
│   │   ├── EmployeeDashboard.tsx    # Employee portal
│   │   ├── Attendance.tsx           # Attendance marking page
│   │   ├── Employees.tsx            # Employee list (admin)
│   │   ├── Reports.tsx              # Attendance reports
│   │   ├── ActivateAccount.tsx      # Email verification
│   │   ├── ResetPasswordConfirm.tsx # Password reset
│   │   └── NotFound.tsx             # 404 page
│   ├── services/
│   │   ├── authService.ts           # Authentication API calls
│   │   ├── employeeService.ts       # Employee API calls
│   │   ├── attendanceService.ts     # Attendance API calls
│   │   ├── faceService.ts           # Face recognition API calls
│   │   └── reportService.ts         # Reports API calls
│   ├── config/
│   │   └── api.ts                   # API configuration & endpoints
│   ├── types/
│   │   └── models.ts                # TypeScript interfaces
│   ├── hooks/
│   │   ├── use-toast.ts             # Toast notification hook
│   │   └── use-mobile.tsx           # Mobile detection hook
│   ├── lib/
│   │   └── utils.ts                 # Utility functions
│   ├── App.tsx                      # Main app component
│   ├── main.tsx                     # Entry point
│   └── index.css                    # Global styles
├── public/
│   ├── models/                      # Face-api ML models
│   ├── favicon.ico
│   └── robots.txt
├── vite.config.ts                   # Vite configuration
├── tailwind.config.ts               # Tailwind CSS config
├── tsconfig.json                    # TypeScript configuration
├── package.json                     # Dependencies
├── README.md                        # Project README
└── DETAILED_README.md              # This file
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+ and npm 9+
- Python 3.8+ with pip
- PostgreSQL or MySQL
- Git

### Frontend Setup

1. **Clone the repository:**
```bash
git clone https://github.com/Muhammad-Bilal-77/visiontrack-ui-kit.git
cd visiontrack-ui-kit
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```
The app will be available at `http://localhost:8080`

4. **Build for production:**
```bash
npm run build
```

### Backend Setup

1. **Clone Django backend:**
```bash
git clone [your-django-backend-repo]
cd visiontrack-backend
```

2. **Create virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Run migrations:**
```bash
python manage.py migrate
```

5. **Start development server:**
```bash
python manage.py runserver
```
Backend will run on `http://localhost:8000`

---

## ⚙️ Configuration

### API Configuration (`src/config/api.ts`)

Update the API base URL to match your Django backend:

```typescript
const API_BASE_URL = 'http://127.0.0.1:8000';

export const API_ENDPOINTS = {
  // Authentication
  LOGIN: `${API_BASE_URL}/auth/login/`,
  USER_ROLE: `${API_BASE_URL}/core/api/user-role/`,
  
  // Employee
  EMPLOYEE_CHECK: `${API_BASE_URL}/core/api/employees/check/`,
  EMPLOYEE_UPLOAD: `${API_BASE_URL}/core/api/employees/upload/`,
  
  // Attendance
  MARK_ATTENDANCE: `${API_BASE_URL}/core/api/mark-attendance/`,
  ATTENDANCE_HISTORY: `${API_BASE_URL}/core/api/employees/attendance-history/`,
};
```

### Environment Variables

Create `.env` file in root:
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_API_TIMEOUT=30000
VITE_JWT_TOKEN_KEY=auth_token
```

---

## 📖 Usage Guide

### For Employees

1. **Login**
   - Navigate to `/login`
   - Enter email and password
   - System redirects to `/employee` dashboard

2. **View Dashboard**
   - See personal attendance history
   - Check face verification status
   - Access quick attendance link

3. **Mark Attendance**
   - Click "Attendance" in navbar
   - Allow camera access
   - Position face in frame
   - Wait for "Face Detected" status
   - Click "Mark Attendance"
   - System auto-submits and shows result

### For Admins

1. **Login**
   - Navigate to `/login`
   - Use admin credentials
   - System redirects to `/admin` dashboard

2. **Manage Employees**
   - View all employees list
   - Check face verification status
   - Monitor attendance records

3. **View Reports**
   - Access attendance analytics
   - Filter by date range
   - Export reports if available

---

## 🔗 API Integration

### Authentication Flow

```
User Login (email, password)
        ↓
/auth/login/ (Django)
        ↓
Returns JWT Token
        ↓
Store in localStorage
        ↓
GET /core/api/user-role/
        ↓
Redirect to /admin or /employee
```

### Face Verification Flow

```
Employee Access Dashboard
        ↓
POST /core/api/employees/check/ (with email)
        ↓
Check if face encoding exists
        ↓
If No: Show "Verification Required"
If Yes: Show "Already Verified"
        ↓
User Captures Face
        ↓
POST /core/api/employees/upload/ (with image)
        ↓
Backend: Run face recognition
        ↓
Store face encoding in database
        ↓
Mark as verified ✓
```

### Attendance Marking Flow

```
User Clicks "Mark Attendance"
        ↓
Camera captures face frame
        ↓
POST /core/api/mark-attendance/ (with base64 image)
        ↓
Backend: Extract face encoding
        ↓
Compare with registered employees
        ↓
Match Found:
  ├─ Create attendance record
  ├─ Return success message
  └─ Toast: "Attendance marked!"
Match Not Found:
  └─ Toast: "Face not recognized"
        ↓
GET /core/api/employees/attendance-history/
        ↓
Display in history table
```

### API Endpoints Reference

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| POST | `/auth/login/` | User login | No |
| GET | `/core/api/user-role/` | Get user role | JWT |
| POST | `/core/api/employees/check/` | Check employee status | JWT |
| POST | `/core/api/employees/upload/` | Upload face for verification | JWT |
| POST | `/core/api/mark-attendance/` | Mark attendance | JWT |
| POST | `/core/api/employees/attendance-history/` | Get attendance logs | JWT |

---

## 🧩 Component Documentation

### AdminLayout (`src/components/AdminLayout.tsx`)
**Purpose**: Layout wrapper for admin pages with role-based access control

**Props**:
```typescript
interface AdminLayoutProps {
  children: ReactNode;
}
```

**Features**:
- Role verification on mount
- Redirects non-admins to login
- Sidebar navigation
- User info display in header
- Logout functionality

**Usage**:
```tsx
<AdminLayout>
  <AdminDashboard />
</AdminLayout>
```

### EmployeeLayout (`src/components/EmployeeLayout.tsx`)
**Purpose**: Layout wrapper for employee pages

**Features**: Similar to AdminLayout but for employee role

### Navbar (`src/components/Navbar.tsx`)
**Purpose**: Main navigation bar

**Features**:
- VisionTrack logo
- Attendance button
- Login/Get Started buttons
- Responsive mobile menu

---

## 👨‍💻 Development Guidelines

### Code Style
- Follow TypeScript strict mode
- Use React functional components with hooks
- Name components with PascalCase
- Use camelCase for variables and functions
- Use UPPERCASE for constants

### Component Structure
```tsx
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface ComponentProps {
  title: string;
  onAction: () => void;
}

export const MyComponent: React.FC<ComponentProps> = ({ 
  title, 
  onAction 
}) => {
  const [state, setState] = useState(false);

  useEffect(() => {
    // Setup
    return () => {
      // Cleanup
    };
  }, []);

  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={onAction}>Action</Button>
    </div>
  );
};

export default MyComponent;
```

### Adding New Pages

1. Create file in `src/pages/YourPage.tsx`
2. Add route in `src/App.tsx`
3. Add to navigation if needed
4. Use appropriate layout wrapper

### Adding New Components

1. Create folder in `src/components/YourComponent/`
2. Create `index.tsx` with component
3. Export from `src/components/index.ts` (if applicable)
4. Use in pages

---

## 📦 Deployment

### Production Build

```bash
npm run build
```

Creates optimized `dist/` folder for production.

### Deployment Options

**1. Vercel (Recommended)**
```bash
npm install -g vercel
vercel login
vercel
```

**2. Netlify**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

**3. Traditional Hosting**
- Build: `npm run build`
- Upload `dist/` folder to web server
- Configure server to route all requests to `index.html`
- Set API_BASE_URL to production Django server

### Environment Setup for Production
```env
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_API_TIMEOUT=30000
```

---

## 🐛 Troubleshooting

### Common Issues

**1. "Camera not accessible"**
- Check browser camera permissions
- Ensure HTTPS on production (required for camera API)
- Clear browser cache and retry

**2. "Face not detected"**
- Ensure good lighting
- Position face directly at camera
- Check if models are loaded (`console.log` in browser)
- Try moving closer to camera

**3. "API connection failed"**
- Verify Django backend is running
- Check `API_BASE_URL` in `src/config/api.ts`
- Check CORS settings in Django backend
- Verify JWT token is valid

**4. "Attendance already marked"**
- Check attendance history
- Wait for next day or contact admin
- Verify time constraints if any

**5. "Face recognition not working"**
- Ensure face encoding exists in database
- Run face verification first on employee dashboard
- Check backend face recognition models
- Review backend logs for errors

### Debug Mode

Enable verbose logging:
```typescript
// In api.ts
const DEBUG = true;

if (DEBUG) {
  console.log('API Call:', endpoint, payload);
  console.log('Response:', response);
}
```

---

## 🤝 Contributing

### How to Contribute

1. Fork the repository
2. Create feature branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'feat: Add YourFeature'`
4. Push to branch: `git push origin feature/YourFeature`
5. Submit Pull Request

### Commit Message Format

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Code style changes
refactor: Code refactoring
test: Add tests
chore: Update dependencies
```

---

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

---

## 📞 Support & Contact

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact: [your-email@example.com]
- Documentation: See README.md

---

## 🙏 Acknowledgments

- **shadcn/ui** for excellent component library
- **face-api.js** for facial recognition capabilities
- **Tailwind CSS** for utility-first styling
- **React Router** for robust routing
- **Django REST Framework** for powerful backend APIs

---

## 📝 Changelog

### Version 1.0.0 (December 5, 2025)
- ✅ Complete frontend implementation
- ✅ Face verification system
- ✅ Attendance tracking
- ✅ Admin & Employee dashboards
- ✅ Django backend integration
- ✅ Role-based access control
- ✅ Real-time face detection

---

**Last Updated**: December 5, 2025  
**Maintained By**: Muhammad Bilal  
**Repository**: https://github.com/Muhammad-Bilal-77/visiontrack-ui-kit
