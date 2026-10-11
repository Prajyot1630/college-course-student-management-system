import { useState, useEffect } from 'react';

const emptyStu = {
  name: '',
  enrollmentNumber: '',
  email: '',
  course: '',
  semester: '',
  gender: '',
  attendance: '',
};

export default function StudentForm({ courses, onSave, editingStudent, onCancel }) {
  const [form, setForm] = useState(emptyStu);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  // Load editing student values into form
  useEffect(() => {
    if (editingStudent) {
      setForm({
        name: editingStudent.name || '',
        enrollmentNumber: editingStudent.enrollmentNumber || '',
        email: editingStudent.email || '',
        course: editingStudent.course || '',
        semester: editingStudent.semester?.toString() || '',
        gender: editingStudent.gender || '',
        attendance: editingStudent.attendance?.toString() || '',
      });
      setErrors({});
      setSuccessMsg('');
    } else {
      setForm(emptyStu);
    }
  }, [editingStudent]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error for that field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Student name is required.';
    if (!form.enrollmentNumber.trim()) errs.enrollmentNumber = 'Enrollment number is required.';
    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email.';
    if (!form.course) errs.course = 'Please select a course.';
    if (!form.semester) errs.semester = 'Please select a semester.';
    if (!form.gender) errs.gender = 'Please select a gender.';
    if (form.attendance === '') {
      errs.attendance = 'Attendance is required.';
    } else {
      const att = Number(form.attendance);
      if (isNaN(att) || att < 0 || att > 100) {
        errs.attendance = 'Attendance must be between 0 and 100.';
      }
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

    const studentData = {
      ...form,
      semester: Number(form.semester),
      attendance: Number(form.attendance),
    };

    const result = onSave(studentData, editingStudent?.id);
    if (result?.error) {
      setErrors({ enrollmentNumber: result.error });
      return;
    }

    setSuccessMsg(editingStudent ? 'Student updated successfully!' : 'Student added successfully!');
    if (!editingStudent) setForm(emptyStu);
    setErrors({});
    setTimeout(() => setSuccessMsg(''), 3000);
  }

  function handleCancel() {
    setForm(emptyStu);
    setErrors({});
    setSuccessMsg('');
    if (onCancel) onCancel();
  }

  return (
    <form className="student-form" onSubmit={handleSubmit} noValidate>
      <h3>{editingStudent ? '✏️ Edit Student' : '➕ Add New Student'}</h3>

      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="name">Student Name *</label>
          <input
            type="text" id="name" name="name"
            value={form.name} onChange={handleChange}
            placeholder="Enter student name"
          />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="enrollmentNumber">Enrollment Number *</label>
          <input
            type="text" id="enrollmentNumber" name="enrollmentNumber"
            value={form.enrollmentNumber} onChange={handleChange}
            placeholder="e.g. ENR251"
            disabled={!!editingStudent}
          />
          {errors.enrollmentNumber && <span className="form-error">{errors.enrollmentNumber}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email" id="email" name="email"
            value={form.email} onChange={handleChange}
            placeholder="student@college.edu"
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="course">Course *</label>
          <select id="course" name="course" value={form.course} onChange={handleChange}>
            <option value="">-- Select Course --</option>
            {courses.map(c => (
              <option key={c.id} value={c.courseName}>{c.courseName}</option>
            ))}
          </select>
          {errors.course && <span className="form-error">{errors.course}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="semester">Semester *</label>
          <select id="semester" name="semester" value={form.semester} onChange={handleChange}>
            <option value="">-- Select --</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
              <option key={s} value={s}>Semester {s}</option>
            ))}
          </select>
          {errors.semester && <span className="form-error">{errors.semester}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender *</label>
          <select id="gender" name="gender" value={form.gender} onChange={handleChange}>
            <option value="">-- Select --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <span className="form-error">{errors.gender}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="attendance">Attendance (%) *</label>
          <input
            type="number" id="attendance" name="attendance"
            value={form.attendance} onChange={handleChange}
            min="0" max="100" placeholder="0 - 100"
          />
          {errors.attendance && <span className="form-error">{errors.attendance}</span>}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingStudent ? '💾 Update Student' : '➕ Add Student'}
        </button>
        {editingStudent && (
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            ✖ Cancel
          </button>
        )}
      </div>
    </form>
  );
}
