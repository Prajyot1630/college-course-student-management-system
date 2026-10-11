import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import DashboardCard from '../components/DashboardCard';
import { getAttendanceStatus, getAttendanceClass } from '../utils/attendance';

export default function Dashboard({ students, courses }) {
  // useMemo: derive dashboard statistics only when students or courses change
  const stats = useMemo(() => {
    const totalStudents = students.length;
    const totalCourses = courses.length;
    const activeCourses = courses.filter(c => c.active).length;
    const avgAttendance =
      totalStudents > 0
        ? Math.round(students.reduce((sum, s) => sum + s.attendance, 0) / totalStudents)
        : 0;

    return [
      { title: 'Total Students', value: totalStudents, icon: '👨‍🎓', color: 'card-blue' },
      { title: 'Total Courses', value: totalCourses, icon: '📚', color: 'card-green' },
      { title: 'Active Courses', value: activeCourses, icon: '✅', color: 'card-purple' },
      { title: 'Average Attendance', value: `${avgAttendance}%`, icon: '📊', color: 'card-orange' },
    ];
  }, [students, courses]);

  // Recent students: last 5 added
  const recentStudents = useMemo(() => students.slice(-5).reverse(), [students]);

  // Calculate attendance health distribution
  const attendanceBreakdown = useMemo(() => {
    let eligible = 0;
    let warning = 0;
    let detained = 0;
    students.forEach((s) => {
      if (s.attendance < 60) detained++;
      else if (s.attendance < 75) warning++;
      else eligible++;
    });
    return { eligible, warning, detained };
  }, [students]);

  return (
    <div className="page dashboard-page">
      <div className="dashboard-hero-card">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            Academic Management & Records Portal
          </div>
          <h2 className="hero-title">Academic Administration Dashboard</h2>
          <p className="hero-subtitle">
            Overview of student enrollments, active curriculum courses, and departmental attendance compliance.
          </p>
        </div>
        <div className="hero-quick-actions">
          <Link to="/students" className="btn btn-primary hero-btn">
            <span>➕ Manage Students</span>
          </Link>
          <Link to="/courses" className="btn btn-secondary hero-btn">
            <span>📚 Explore Courses</span>
          </Link>
        </div>
      </div>

      <div className="dashboard-cards">
        {stats.map((stat) => (
          <DashboardCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      <div className="attendance-health-strip">
        <div className="health-header">
          <div>
            <h4>Attendance Compliance Overview</h4>
            <span className="health-subtitle">Real-time status calculated against 60% and 75% thresholds</span>
          </div>
          <div className="health-legend">
            <span className="legend-item legend-eligible">
              <span className="legend-dot"></span> Eligible (≥75%): <strong>{attendanceBreakdown.eligible}</strong> ({Math.round((attendanceBreakdown.eligible / (students.length || 1)) * 100)}%)
            </span>
            <span className="legend-item legend-warning">
              <span className="legend-dot"></span> Warning (60–74%): <strong>{attendanceBreakdown.warning}</strong> ({Math.round((attendanceBreakdown.warning / (students.length || 1)) * 100)}%)
            </span>
            <span className="legend-item legend-detained">
              <span className="legend-dot"></span> Detained (&lt;60%): <strong>{attendanceBreakdown.detained}</strong> ({Math.round((attendanceBreakdown.detained / (students.length || 1)) * 100)}%)
            </span>
          </div>
        </div>
        <div className="health-progress-bar">
          <div
            className="bar-segment bar-eligible"
            style={{ width: `${(attendanceBreakdown.eligible / (students.length || 1)) * 100}%` }}
            title={`Eligible: ${attendanceBreakdown.eligible}`}
          ></div>
          <div
            className="bar-segment bar-warning"
            style={{ width: `${(attendanceBreakdown.warning / (students.length || 1)) * 100}%` }}
            title={`Warning: ${attendanceBreakdown.warning}`}
          ></div>
          <div
            className="bar-segment bar-detained"
            style={{ width: `${(attendanceBreakdown.detained / (students.length || 1)) * 100}%` }}
            title={`Detained: ${attendanceBreakdown.detained}`}
          ></div>
        </div>
      </div>

      <div className="recent-section">
        <div className="section-header-row">
          <div>
            <h3>Recent Students</h3>
            <p className="section-subtitle">Latest registered students across various university branches</p>
          </div>
          <Link to="/students" className="link view-all-link">
            View All Students ({students.length}) →
          </Link>
        </div>
        {recentStudents.length === 0 ? (
          <p className="empty-state">No students found. Add students from the Students page.</p>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Enrollment</th>
                  <th>Course</th>
                  <th>Attendance</th>
                  <th>Quick Action</th>
                </tr>
              </thead>
              <tbody>
                {recentStudents.map((s) => {
                  const initials = s.name
                    ? s.name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
                    : 'ST';
                  const status = getAttendanceStatus(s.attendance);
                  const statusClass = getAttendanceClass(s.attendance);

                  return (
                    <tr key={s.id} className="recent-student-row">
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
                        <span className="course-pill">{s.course}</span>
                      </td>
                      <td>
                        <span className={`attendance-badge ${statusClass}`}>
                          <span className="status-dot"></span>
                          {s.attendance}% — {status}
                        </span>
                      </td>
                      <td>
                        <Link to={`/students/${s.id}`} className="btn btn-view" title="View Full Details">
                          <span>View Profile ↗</span>
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
  );
}
