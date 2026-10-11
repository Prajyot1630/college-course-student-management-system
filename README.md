# 🎓 College Course & Student Management System

**Advanced Web Technology (AWT) Practical Project**

A complete, browser-based College Course & Student Management System built with React. The application supports full CRUD operations for students and courses, search/filter capabilities, attendance tracking with visual status indicators, and persistent data storage using localStorage.

---

## 🛠️ Technologies Used

| Technology        | Purpose                                    |
| ----------------- | ------------------------------------------ |
| React 18          | UI library with hooks and component model  |
| Vite 5            | Fast development server and build tool     |
| React Router DOM  | Client-side routing (5 routes)             |
| Sass/SCSS         | Styling with variables, nesting, mixins    |
| localStorage      | Browser data persistence                   |
| JavaScript (ES6+) | Application logic (no TypeScript)          |

---

## ✅ Implemented Features

### Dashboard (`/dashboard`)
- Four dynamic statistic cards: Total Students, Total Courses, Active Courses, Average Attendance
- Statistics derived from live data — update automatically on add/delete
- Recent Students section with clickable links to student details
- Responsive card grid layout

### Student Management (`/students`)
- **Add** new students with full form validation
- **Edit** existing students (form pre-populates with current values)
- **Delete** students with confirmation dialog
- **Search** by name, enrollment number, or email
- **Filter** by course using dropdown
- Structured data table with attendance status badges
- Unique enrollment number enforcement

### Course Management (`/courses`)
- **Add** new courses with validation and duplicate code prevention
- **Delete** courses with confirmation
- **Search** by course code or name
- **Filter** by active/inactive status
- View course details with enrolled student list

### Attendance Rules (Conditional Rendering)
- **>= 75%**: ✅ Eligible (green badge)
- **60%–74%**: ⚠️ Warning (amber badge)
- **< 60%**: 🚫 Detained (red badge)
- Detained condition checked first to prevent threshold overlap
- Boundaries verified: 59% → Detained, 60% → Warning, 74% → Warning, 75% → Eligible

### Modern UI & Animation Enhancements
- **Modern Typography**: Styled with Google Fonts (`Plus Jakarta Sans` for clean, professional SaaS look and `JetBrains Mono` for enrollment codes and metrics).
- **Subtle Page Transitions**: Keyframe-driven page fade-in and smooth upward translation (`pageFadeIn`) on navigation changes.
- **Glassmorphic Navigation**: Frosted glass sticky header (`backdrop-filter`) with active pill nav indicators and university branding crest.
- **Micro-interactions & Cards**:
  - Live pulsing status indicator dots (`pulseGlow`) on metrics and status badges.
  - Staggered card entrance animations and hover elevations with subtle border glows.
  - Interactive Attendance Compliance breakdown bar showing proportional distribution.
  - Animated subject score progress bars on student profiles.
  - Responsive action buttons with smooth active scale effects.

### Data Persistence
- All student and course data persists in `localStorage`
- Safe JSON parsing with fallback to initial seed data
- Application remains functional after browser refresh

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation bar with active route highlighting
│   ├── DashboardCard.jsx   # Reusable stat card (React.memo)
│   ├── StudentCard.jsx     # Student table row (React.memo)
│   ├── StudentForm.jsx     # Add/Edit student form with validation
│   └── CourseCard.jsx      # Course table row (React.memo)
├── pages/
│   ├── Dashboard.jsx       # Dashboard with stats and recent students
│   ├── Students.jsx        # Student list with CRUD, search, filter
│   ├── StudentDetails.jsx  # Individual student detail view
│   ├── Courses.jsx         # Course list with add, delete, search, filter
│   └── CourseDetails.jsx   # Individual course detail view
├── data/
│   └── initialData.js      # Seed data: 250 students, 18 courses
├── utils/
│   ├── attendance.js       # Attendance status helper functions
│   └── storage.js          # localStorage read/write helpers
├── styles/
│   └── style.scss          # Complete SCSS styles
├── App.jsx                 # Root component with routes and state
└── main.jsx                # React DOM entry point
```

---

## 🚀 Installation & Running

### Prerequisites
- Node.js (v16 or later)
- npm

### Steps

```bash
# 1. Clone the repository
git clone <repository-url>
cd college-course-student-management-system

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser (default: http://localhost:5173)
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🗺️ Routes

| Route            | Component         | Description                              |
| ---------------- | ----------------- | ---------------------------------------- |
| `/dashboard`     | Dashboard.jsx     | Overview with stats and recent students  |
| `/students`      | Students.jsx      | Student list with CRUD operations        |
| `/students/:id`  | StudentDetails.jsx| Individual student details with subjects |
| `/courses`       | Courses.jsx       | Course list with add, delete, search     |
| `/courses/:id`   | CourseDetails.jsx | Course details with enrolled students    |

The root path `/` redirects to `/dashboard`. Invalid student/course IDs show a "Not Found" message with navigation back.

---

## ⚡ React.memo() and useMemo() — Performance Optimization

### React.memo()

**Components using React.memo():**
- `DashboardCard` — Prevents re-rendering when the card's props (title, value, icon, color) haven't changed. Since the dashboard has 4 cards and only the changed statistic needs re-rendering, this avoids unnecessary DOM updates for the other 3 cards.
- `StudentCard` — Each row in the student table is memoized. When searching or filtering, only newly visible/hidden rows re-render. Editing one student doesn't cause all 250 rows to re-render.
- `CourseCard` — Same benefit as StudentCard, applied to the course table rows.

### useMemo()

**Locations using useMemo():**
- `Dashboard.jsx` — `stats` array is memoized: dashboard statistics (total students, courses, active courses, average attendance) are recalculated only when the `students` or `courses` arrays change, not on every render.
- `Dashboard.jsx` — `recentStudents` is memoized to avoid re-slicing the array on every render.
- `Students.jsx` — `filteredStudents` is memoized: the searched + filtered student list is derived only when `students`, `search`, or `courseFilter` changes. Without this, filtering 250 records would run on every keystroke AND every unrelated state change.
- `Students.jsx` — `courseNames` for the filter dropdown is memoized.
- `Courses.jsx` — `filteredCourses` is memoized: searched + status-filtered course list recomputes only when `courses`, `search`, or `statusFilter` changes.

### Why Memoization Helps

1. **Avoids redundant computation**: Filtering and searching arrays of 250 students on every render is wasteful. `useMemo()` ensures these derived lists recompute only when their dependencies change.
2. **Prevents unnecessary re-renders**: `React.memo()` on table row components means that when one student is edited, the other 249 rows skip re-rendering because their props haven't changed.
3. **Better user experience**: Typing in the search box triggers frequent re-renders. With `useMemo()`, only the filtering logic runs — not the entire component tree's computation.

---

## 📋 Attendance Rules

The attendance status is determined by this logic (Detained checked first):

```javascript
if (attendance < 60)  → "Detained"   // Red badge
if (attendance < 75)  → "Warning"    // Amber badge
if (attendance >= 75) → "Eligible"   // Green badge
```

| Attendance | Status   |
| ---------- | -------- |
| 59%        | Detained |
| 60%        | Warning  |
| 74%        | Warning  |
| 75%        | Eligible |
| 100%       | Eligible |

---

## 📊 Initial Data

- **250 students** with synthetic names, enrollment numbers, and subject marks
- **18 courses** (15 active, 3 inactive)
- **Average attendance: 82%** (computed exactly across all 250 students)
- Includes the 3 required courses: BCS101 (Web Tech), BCS102 (DBMS), BCS103 (AI)
- Demo student: Rahul Sharma (ENR250) with Web Tech 85%, DBMS 90%, AI 78%

---

## 📝 License
 
This project is created for educational purposes as part of Advanced Web Technology (AWT) practical coursework.
