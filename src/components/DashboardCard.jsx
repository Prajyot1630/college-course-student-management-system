import React from 'react';

const metaSubtitles = {
  'Total Students': 'Enrolled Cohort',
  'Total Courses': 'Curriculum Catalog',
  'Active Courses': 'Running This Term',
  'Average Attendance': 'Campus Benchmark',
};

const DashboardCard = React.memo(function DashboardCard({ title, value, icon, color }) {
  const subtitle = metaSubtitles[title] || 'Live Record';

  return (
    <div className={`dashboard-card ${color || ''}`}>
      <div className="dashboard-card-header">
        <div className="dashboard-card-icon-box">{icon}</div>
        <span className="card-live-indicator" title="Live System Metric">
          <span className="live-dot"></span>
          <span className="live-text">Live</span>
        </span>
      </div>
      <div className="dashboard-card-info">
        <h3 className="dashboard-card-value">{value}</h3>
        <p className="dashboard-card-title">{title}</p>
      </div>
      <div className="dashboard-card-footer">
        <span className="card-subtitle-pill">{subtitle}</span>
      </div>
    </div>
  );
});

export default DashboardCard;
