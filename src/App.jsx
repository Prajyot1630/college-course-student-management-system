import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import StudentDetails from './pages/StudentDetails';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import { initialStudents, initialCourses } from './data/initialData';
import { loadFromStorage, saveToStorage } from './utils/storage';
import './styles/style.scss';

function AppContent({ students, setStudents, courses, setCourses }) {
  const location = useLocation();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <div key={location.pathname} className="page-transition-wrapper">
          <Routes location={location}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={<Dashboard students={students} courses={courses} />}
            />
            <Route
              path="/students"
              element={
                <Students
                  students={students}
                  setStudents={setStudents}
                  courses={courses}
                />
              }
            />
            <Route
              path="/students/:id"
              element={<StudentDetails students={students} />}
            />
            <Route
              path="/courses"
              element={<Courses courses={courses} setCourses={setCourses} students={students} />}
            />
            <Route
              path="/courses/:id"
              element={<CourseDetails courses={courses} students={students} />}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  const [students, setStudents] = useState(() => {
    const loaded = loadFromStorage('college_students', null) || loadFromStorage('gsfc_students', null);
    if (!loaded) return initialStudents;
    // Sanitize any residual emails from previous session
    return loaded.map((s) => ({
      ...s,
      email: typeof s.email === 'string' ? s.email.replace('@gsfc.edu.in', '@college.edu') : s.email,
    }));
  });
  const [courses, setCourses] = useState(() =>
    loadFromStorage('college_courses', null) || loadFromStorage('gsfc_courses', initialCourses)
  );

  // Persist to localStorage whenever data changes
  useEffect(() => {
    saveToStorage('college_students', students);
  }, [students]);

  useEffect(() => {
    saveToStorage('college_courses', courses);
  }, [courses]);

  return (
    <BrowserRouter>
      <AppContent
        students={students}
        setStudents={setStudents}
        courses={courses}
        setCourses={setCourses}
      />
    </BrowserRouter>
  );
}
