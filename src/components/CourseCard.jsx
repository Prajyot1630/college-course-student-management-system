import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = React.memo(function CourseCard({ course, onDelete }) {
  return (
    <tr className="course-row">
      <td>
        <span className="code-pill code-pill-primary">{course.courseCode}</span>
      </td>
      <td className="cell-course-name">
        <span className="course-title">{course.courseName}</span>
      </td>
      <td className="cell-faculty">
        <span className="faculty-badge">👨‍🏫 {course.faculty}</span>
      </td>
      <td>
        <span className="credit-pill">{course.credits} Credits</span>
      </td>
      <td>
        <span className={`status-badge ${course.active ? 'status-active' : 'status-inactive'}`}>
          <span className="status-dot"></span>
          {course.active ? 'Active' : 'Inactive'}
        </span>
      </td>
      <td className="action-buttons">
        <Link to={`/courses/${course.id}`} className="btn btn-view" title="View Course Details">
          <span className="action-icon">👁</span>
          <span className="btn-label-mobile">View</span>
        </Link>
        <button onClick={() => onDelete(course.id)} className="btn btn-delete" title="Delete Course">
          <span className="action-icon">🗑️</span>
          <span className="btn-label-mobile">Delete</span>
        </button>
      </td>
    </tr>
  );
});

export default CourseCard;
