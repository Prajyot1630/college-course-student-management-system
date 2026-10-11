import { useState, useMemo } from 'react';
import CourseCard from '../components/CourseCard';

const emptyCourse = {
  courseCode: '',
  courseName: '',
  faculty: '',
  credits: '',
  active: true,
};

export default function Courses({ courses, setCourses }) {
  const [form, setForm] = useState(emptyCourse);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showForm, setShowForm] = useState(false);

  // useMemo: derive filtered + searched course list
  const filteredCourses = useMemo(() => {
    let result = courses;

    if (statusFilter === 'active') {
      result = result.filter(c => c.active);
    } else if (statusFilter === 'inactive') {
      result = result.filter(c => !c.active);
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        c =>
          c.courseCode.toLowerCase().includes(q) ||
          c.courseName.toLowerCase().includes(q)
      );
    }

    return result;
  }, [courses, search, statusFilter]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  }

  function validate() {
    const errs = {};
    if (!form.courseCode.trim()) errs.courseCode = 'Course code is required.';
    if (!form.courseName.trim()) errs.courseName = 'Course name is required.';
    if (!form.faculty.trim()) errs.faculty = 'Faculty name is required.';
    if (!form.credits || isNaN(form.credits) || Number(form.credits) < 1) {
      errs.credits = 'Enter valid credits (1 or more).';
    }
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    // Check duplicate course code
    if (courses.some(c => c.courseCode.toUpperCase() === form.courseCode.trim().toUpperCase())) {
      setErrors({ courseCode: 'A course with this code already exists.' });
      return;
    }

    const newCourse = {
      id: 'c' + Date.now(),
      courseCode: form.courseCode.trim().toUpperCase(),
      courseName: form.courseName.trim(),
      faculty: form.faculty.trim(),
      credits: Number(form.credits),
      active: form.active,
    };

    setCourses(prev => [...prev, newCourse]);
    setForm(emptyCourse);
    setErrors({});
    setSuccessMsg('Course added successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  }

  function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(prev => prev.filter(c => c.id !== id));
    }
  }

  return (
    <div className="page courses-page">
      <div className="page-header-row">
        <div>
          <h2>📚 Course Management</h2>
          <p className="page-header-subtitle">
            Curriculum directory, faculty allocation, credit evaluation, and active syllabus status
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(prev => !prev)}
        >
          {showForm ? '✖ Close Course Form' : '➕ Add New Course'}
        </button>
      </div>

      {showForm && (
        <form className="student-form" onSubmit={handleSubmit} noValidate>
          <h3>➕ Add New Course</h3>

          {successMsg && <div className="alert alert-success">{successMsg}</div>}

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="courseCode">Course Code *</label>
              <input
                type="text" id="courseCode" name="courseCode"
                value={form.courseCode} onChange={handleChange}
                placeholder="e.g. BCS119"
              />
              {errors.courseCode && <span className="form-error">{errors.courseCode}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="courseName">Course Name *</label>
              <input
                type="text" id="courseName" name="courseName"
                value={form.courseName} onChange={handleChange}
                placeholder="Enter course name"
              />
              {errors.courseName && <span className="form-error">{errors.courseName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="faculty">Faculty *</label>
              <input
                type="text" id="faculty" name="faculty"
                value={form.faculty} onChange={handleChange}
                placeholder="e.g. Dr. Smith"
              />
              {errors.faculty && <span className="form-error">{errors.faculty}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="credits">Credits *</label>
              <input
                type="number" id="credits" name="credits"
                value={form.credits} onChange={handleChange}
                min="1" max="6" placeholder="1-6"
              />
              {errors.credits && <span className="form-error">{errors.credits}</span>}
            </div>

            <div className="form-group form-checkbox">
              <label>
                <input
                  type="checkbox" name="active"
                  checked={form.active} onChange={handleChange}
                />
                Active Course
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">➕ Add Course</button>
          </div>
        </form>
      )}

      <div className="list-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search by code or name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="">All Status</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>
      </div>

      <div className="list-summary-bar">
        <span className="summary-text">
          Showing <strong>{filteredCourses.length}</strong> of <strong>{courses.length}</strong> courses
          <span className="summary-tags">
            <span className="badge-chip chip-active">{courses.filter(c => c.active).length} Active</span>
            <span className="badge-chip chip-inactive">{courses.filter(c => !c.active).length} Inactive</span>
          </span>
        </span>
        {(search || statusFilter) && (
          <button
            className="btn-clear-filter"
            onClick={() => {
              setSearch('');
              setStatusFilter('');
            }}
          >
            ✕ Reset Filters
          </button>
        )}
      </div>

      {filteredCourses.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📚</div>
          <h3>No courses match your query</h3>
          <p>Try modifying your search query or selecting "All Status".</p>
          <button
            className="btn btn-secondary empty-reset-btn"
            onClick={() => {
              setSearch('');
              setStatusFilter('');
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
                <th>Code</th>
                <th>Course Name</th>
                <th>Faculty</th>
                <th>Credits</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map(c => (
                <CourseCard key={c.id} course={c} onDelete={handleDelete} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
