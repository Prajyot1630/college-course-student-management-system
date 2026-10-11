import { useParams, Link } from 'react-router-dom';

export default function CourseDetails({ courses, students }) {
  const { id } = useParams();
  const course = courses.find(c => c.id === id);

  if (!course) {
    return (
      <div className="page not-found">
        <h2>🚫 Course Not Found</h2>
        <p>No course exists with this ID. The record may have been deleted.</p>
        <Link to="/courses" className="btn btn-primary">← Back to Courses</Link>
      </div>
    );
  }

  // Students enrolled in this course
  const enrolledStudents = students.filter(s => s.course === course.courseName);

  return (
    <div className="page detail-page">
      <Link to="/courses" className="back-link">
        <span className="back-arrow">←</span> Back to Courses List
      </Link>

      <div className="detail-card course-profile-card">
        <div className="course-header-banner">
          <div className="course-code-emblem">{course.courseCode}</div>
          <div className="course-header-meta">
            <div className="course-title-badge-row">
              <h2>{course.courseName}</h2>
              <span className={`status-badge ${course.active ? 'status-active' : 'status-inactive'}`}>
                <span className="status-dot"></span>
                {course.active ? 'Active Curriculum' : 'Inactive Course'}
              </span>
            </div>
            <p className="course-subtitle">
              Instructed by <strong>{course.faculty}</strong> • Academic Weightage: <strong>{course.credits} Credits</strong>
            </p>
          </div>
        </div>

        <div className="detail-grid">
          <div className="detail-item">
            <span className="label">Course Code</span>
            <span className="value font-mono">{course.courseCode}</span>
          </div>
          <div className="detail-item">
            <span className="label">Course Name</span>
            <span className="value">{course.courseName}</span>
          </div>
          <div className="detail-item">
            <span className="label">Lead Faculty</span>
            <span className="value">👨‍🏫 {course.faculty}</span>
          </div>
          <div className="detail-item">
            <span className="label">Credit Hours</span>
            <span className="value">{course.credits} Credits</span>
          </div>
          <div className="detail-item">
            <span className="label">Current Status</span>
            <span className={`status-badge ${course.active ? 'status-active' : 'status-inactive'}`}>
              <span className="status-dot"></span>
              {course.active ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div className="detail-item">
            <span className="label">Total Enrollment</span>
            <span className="value highlight-number">{enrolledStudents.length} Students Enrolled</span>
          </div>
        </div>

        <div className="enrolled-section">
          <div className="enrolled-header">
            <h3>👨‍🎓 Enrolled Students ({enrolledStudents.length})</h3>
            <span className="enrolled-subtitle">Undergraduate students registered in this subject</span>
          </div>
          {enrolledStudents.length === 0 ? (
            <p className="empty-state">No students are currently enrolled in this course.</p>
          ) : (
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Enrollment</th>
                    <th>Semester</th>
                    <th>Attendance Status</th>
                    <th>Quick Action</th>
                  </tr>
                </thead>
                <tbody>
                  {enrolledStudents.map((s) => {
                    const initials = s.name
                      ? s.name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
                      : 'ST';
                    return (
                      <tr key={s.id} className="enrolled-student-row">
                        <td className="cell-student-name">
                          <div className="student-info-flex">
                            <span className="student-avatar">{initials}</span>
                            <Link to={`/students/${s.id}`} className="student-link">
                              {s.name}
                            </Link>
                          </div>
                        </td>
                        <td>
                          <span className="code-pill">{s.enrollmentNumber}</span>
                        </td>
                        <td>
                          <span className="sem-pill">Sem {s.semester}</span>
                        </td>
                        <td>
                          <span className="attendance-badge status-eligible">
                            <span className="status-dot"></span>
                            {s.attendance}%
                          </span>
                        </td>
                        <td>
                          <Link to={`/students/${s.id}`} className="btn btn-view" title="View Full Details">
                            <span>Profile ↗</span>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
