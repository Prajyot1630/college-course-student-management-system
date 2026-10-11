import { useParams, Link } from 'react-router-dom';
import { getAttendanceStatus, getAttendanceClass } from '../utils/attendance';

export default function StudentDetails({ students }) {
  const { id } = useParams();
  const student = students.find(s => s.id === id);

  if (!student) {
    return (
      <div className="page not-found">
        <h2>🚫 Student Not Found</h2>
        <p>No student exists with this ID. The record may have been deleted.</p>
        <Link to="/students" className="btn btn-primary">← Back to Students</Link>
      </div>
    );
  }

  const status = getAttendanceStatus(student.attendance);
  const statusClass = getAttendanceClass(student.attendance);

  const initials = student.name
    ? student.name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
    : 'ST';

  return (
    <div className="page detail-page">
      <Link to="/students" className="back-link">
        <span className="back-arrow">←</span> Back to Students List
      </Link>

      <div className="detail-card student-profile-card">
        <div className="student-header-banner">
          <div className="student-profile-avatar-large">{initials}</div>
          <div className="student-header-meta">
            <div className="student-title-badge-row">
              <h2>{student.name}</h2>
              <span className={`attendance-badge ${statusClass}`}>
                <span className="status-dot"></span>
                {student.attendance}% — {status}
              </span>
            </div>
            <p className="student-subtitle">
              <span className="code-pill">{student.enrollmentNumber}</span> • {student.course} • Semester {student.semester}
            </p>
          </div>
        </div>

        <div className="detail-grid">
          <div className="detail-item">
            <span className="label">Enrollment Number</span>
            <span className="value font-mono">{student.enrollmentNumber}</span>
          </div>
          <div className="detail-item">
            <span className="label">Institutional Email</span>
            <span className="value">{student.email}</span>
          </div>
          <div className="detail-item">
            <span className="label">Enrolled Course</span>
            <span className="value">{student.course}</span>
          </div>
          <div className="detail-item">
            <span className="label">Current Semester</span>
            <span className="value">Semester {student.semester}</span>
          </div>
          <div className="detail-item">
            <span className="label">Gender</span>
            <span className="value">{student.gender}</span>
          </div>
          <div className="detail-item">
            <span className="label">Attendance Standing</span>
            <div className="attendance-gauge-wrap">
              <span className={`attendance-badge ${statusClass}`}>
                <span className="status-dot"></span>
                {student.attendance}% ({status})
              </span>
              <div className="detail-attendance-bar">
                <div
                  className={`bar-fill ${statusClass}`}
                  style={{ width: `${student.attendance}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {student.subjects && student.subjects.length > 0 && (
          <div className="subjects-section">
            <div className="subjects-header">
              <h3>📝 Course Examination Results</h3>
              <span className="subjects-subtitle">Continuous internal and practical evaluations</span>
            </div>
            <div className="subjects-card-grid">
              {student.subjects.map((sub, idx) => (
                <div key={idx} className="subject-result-card">
                  <div className="subject-card-top">
                    <span className="subject-name">{sub.name}</span>
                    <span className="subject-score">{sub.marks}%</span>
                  </div>
                  <div className="subject-progress-track">
                    <div
                      className="subject-progress-fill"
                      style={{
                        width: `${sub.marks}%`,
                        backgroundColor:
                          sub.marks >= 75 ? '#10b981' : sub.marks >= 60 ? '#f59e0b' : '#ef4444',
                      }}
                    ></div>
                  </div>
                  <div className="subject-card-footer">
                    <span>Performance Grade</span>
                    <span className="grade-pill">
                      {sub.marks >= 85 ? 'Grade A+' : sub.marks >= 75 ? 'Grade A' : sub.marks >= 60 ? 'Grade B' : 'Grade C'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
