import { useState, useMemo, useCallback } from 'react';
import StudentForm from '../components/StudentForm';
import StudentCard from '../components/StudentCard';

export default function Students({ students, setStudents, courses }) {
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // useMemo: derive filtered + searched student list
  const filteredStudents = useMemo(() => {
    let result = students;

    if (courseFilter) {
      result = result.filter(s => s.course === courseFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        s =>
          s.name.toLowerCase().includes(q) ||
          s.enrollmentNumber.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q)
      );
    }

    return result;
  }, [students, search, courseFilter]);

  // Unique course names for filter dropdown
  const courseNames = useMemo(() => {
    return [...new Set(students.map(s => s.course))].sort();
  }, [students]);

  function handleSave(formData, editId) {
    if (editId) {
      // Update existing student
      setStudents(prev =>
        prev.map(s =>
          s.id === editId
            ? { ...s, ...formData }
            : s
        )
      );
      setEditingStudent(null);
      setShowForm(false);
      return {};
    } else {
      // Check duplicate enrollment number
      if (students.some(s => s.enrollmentNumber === formData.enrollmentNumber)) {
        return { error: 'This enrollment number already exists.' };
      }

      const newStudent = {
        ...formData,
        id: 's' + Date.now(),
        subjects: [
          { name: 'Web Technology', marks: Math.floor(Math.random() * 41) + 60 },
          { name: 'DBMS', marks: Math.floor(Math.random() * 41) + 60 },
          { name: 'Artificial Intelligence', marks: Math.floor(Math.random() * 41) + 60 },
        ],
      };
      setStudents(prev => [...prev, newStudent]);
      return {};
    }
  }

  function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(prev => prev.filter(s => s.id !== id));
      if (editingStudent?.id === id) {
        setEditingStudent(null);
        setShowForm(false);
      }
    }
  }

  function handleEdit(student) {
    setEditingStudent(student);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleCancelEdit() {
    setEditingStudent(null);
    setShowForm(false);
  }

  return (
    <div className="page students-page">
      <div className="page-header-row">
        <div>
          <h2>👨‍🎓 Student Management</h2>
          <p className="page-header-subtitle">
            Directory of enrolled university students with academic standing and attendance tracking
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setShowForm(prev => !prev);
            if (editingStudent) setEditingStudent(null);
          }}
        >
          {showForm || editingStudent ? '✖ Close Student Form' : '➕ Register New Student'}
        </button>
      </div>

      {(showForm || editingStudent) && (
        <StudentForm
          courses={courses}
          onSave={handleSave}
          editingStudent={editingStudent}
          onCancel={handleCancelEdit}
        />
      )}

      <div className="list-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search by name, enrollment, or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <select value={courseFilter} onChange={e => setCourseFilter(e.target.value)}>
            <option value="">All Courses</option>
            {courseNames.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="list-summary-bar">
        <span className="summary-text">
          Showing <strong>{filteredStudents.length}</strong> of <strong>{students.length}</strong> students
        </span>
        {(search || courseFilter) && (
          <button
            className="btn-clear-filter"
            onClick={() => {
              setSearch('');
              setCourseFilter('');
            }}
          >
            ✕ Reset Filters
          </button>
        )}
      </div>

      {filteredStudents.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3>No students match your query</h3>
          <p>No student records matched "{search}" in selected course filter.</p>
          <button
            className="btn btn-secondary empty-reset-btn"
            onClick={() => {
              setSearch('');
              setCourseFilter('');
            }}
          >
            Clear Search & Filters
          </button>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Enrollment</th>
                <th>Email</th>
                <th>Course</th>
                <th>Sem</th>
                <th>Attendance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(s => (
                <StudentCard
                  key={s.id}
                  student={s}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
