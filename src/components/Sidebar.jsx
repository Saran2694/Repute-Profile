import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuth');
    navigate('/adminpage');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { path: '/dashboard/inquiries', label: 'Inquiries', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { path: '/dashboard/service-inquiries', label: 'Service Inquiries', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { path: '/dashboard/applications', label: 'Applications', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { path: '/dashboard/master-cms', label: 'Website CMS', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' }
  ];

  return (
    <>
      <style>{`
        .admin-sidebar {
          width: 260px;
          background: #0f172a;
          color: white;
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          display: flex;
          flex-direction: column;
          padding: 40px 24px;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          z-index: 50;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
        }

        .admin-sidebar::-webkit-scrollbar {
          width: 4px;
        }

        .admin-sidebar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }


        .admin-logo-container {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 48px;
        }

        .admin-logo {
          width: 36px;
          height: 36px;
          background: white;
          padding: 6px;
          border-radius: 10px;
          object-fit: contain;
        }

        .admin-logo-text {
          font-size: 1.1rem;
          font-weight: 800;
          letter-spacing: -0.5px;
          color: #ffffff;
        }

        .admin-nav {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex-grow: 1;
        }

        .admin-nav-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 16px;
          border-radius: 12px;
          color: #94a3b8;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .admin-nav-item:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.05);
          transform: translateX(8px);
        }

        .admin-nav-item.active {
          background: linear-gradient(135deg, #e10600 0%, #a30400 100%);
          color: white;
          box-shadow: 0 10px 20px rgba(225, 6, 0, 0.3);
          transform: scale(1.02);
          animation: activePulse 2s infinite;
        }

        @keyframes activePulse {
          0% { box-shadow: 0 10px 20px rgba(225, 6, 0, 0.3); }
          50% { box-shadow: 0 10px 30px rgba(225, 6, 0, 0.5); }
          100% { box-shadow: 0 10px 20px rgba(225, 6, 0, 0.3); }
        }

        .admin-nav-icon {
          width: 18px;
          height: 18px;
          opacity: 0.8;
          transition: transform 0.3s ease;
        }

        .admin-nav-item:hover .admin-nav-icon {
          transform: rotate(15deg) scale(1.2);
        }

        .admin-nav-item.active .admin-nav-icon {
          opacity: 1;
        }

        .admin-logout-btn {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 12px;
          color: #ef4444;
          background: rgba(239, 68, 68, 0.05);
          border: 1px solid rgba(239, 68, 68, 0.1);
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 700;
          transition: all 0.3s ease;
          width: 100%;
        }

        .admin-logout-btn:hover {
          background: #ef4444;
          color: white;
          transform: translateY(-2px);
        }
      `}</style>

      <div className="admin-sidebar">
        <div className="admin-logo-container">
          <img src="/logo.png" alt="Repute" className="admin-logo" />
          <span className="admin-logo-text">Admin Panel</span>
        </div>

        <nav className="admin-nav">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} className={`admin-nav-item ${isActive ? 'active' : ''}`}>
                <svg className="admin-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button onClick={handleLogout} className="admin-logout-btn">
          <svg className="admin-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;
