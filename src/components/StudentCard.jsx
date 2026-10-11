import React from 'react';
import { Link } from 'react-router-dom';
import { getAttendanceStatus, getAttendanceClass } from '../utils/attendance';

const StudentCard = React.memo(function StudentCard({ student, onEdit, onDelete }) {
  const status = getAttendanceStatus(student.attendance);
  const statusClass = getAttendanceClass(student.attendance);

  // Student initials for modern avatar
  const initials = student.name
    ? student.name
        .split(' ')
        .map(part => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'ST';

  return (
    <tr className="student-row">
      <td className="cell-student-name">
        <div className="student-info-flex">
          <span className="student-avatar">{initials}</span>
          <span className="student-full-name">{student.name}</span>
        </div>
      </td>
      <td>
        <span className="code-pill">{student.enrollmentNumber}</span>
      </td>
      <td className="cell-email">{student.email}</td>
      <td>
        <span className="course-pill">{student.course}</span>
      </td>
      <td>
        <span className="sem-pill">Sem {student.semester}</span>
      </td>
      <td>
        <span className={`attendance-badge ${statusClass}`}>
          <span className="status-dot"></span>
          {student.attendance}% — {status}
        </span>
      </td>
      <td className="action-buttons">
        <Link to={`/students/${student.id}`} className="btn btn-view" title="View Details">
          <span className="action-icon">👁</span>
          <span className="btn-label-mobile">View</span>
        </Link>
        <button onClick={() => onEdit(student)} className="btn btn-edit" title="Edit Student">
          <span className="action-icon">✏️</span>
          <span className="btn-label-mobile">Edit</span>
        </button>
        <button onClick={() => onDelete(student.id)} className="btn btn-delete" title="Delete Student">
          <span className="action-icon">🗑️</span>
          <span className="btn-label-mobile">Delete</span>
        </button>
      </td>
    </tr>
  );
});

export default StudentCard;
