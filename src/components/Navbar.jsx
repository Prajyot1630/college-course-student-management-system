import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="brand-icon">
            <span>🎓</span>
          </div>
          <div className="brand-text">
            <h1 className="brand-main-title">Course & Student Management System</h1>
            <span className="navbar-subtitle">Central Academic Operations & Records</span>
          </div>
        </div>
        <ul className="navbar-links">
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              <span className="nav-icon">📊</span>
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/students" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              <span className="nav-icon">👨‍🎓</span>
              <span>Students</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/courses" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              <span className="nav-icon">📚</span>
              <span>Courses</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
