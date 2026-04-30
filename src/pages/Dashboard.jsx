import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { supabase } from '../supabaseClient';

const Dashboard = () => {
  const [stats, setStats] = useState({ 
    portfolioCount: 0, 
    careerCount: 0, 
    inquiryCount: 0,
    applicationCount: 0,
    lastUser: 'Repute01' 
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { count: portCount, error: portErr } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true });
        
        console.log('projects count:', portCount, 'error:', portErr);
        
        const { count: carCount, error: carErr } = await supabase
          .from('job_openings')
          .select('*', { count: 'exact', head: true });

        console.log('careers count:', carCount, 'error:', carErr);

        const { count: inqCount } = await supabase
          .from('contacts')
          .select('*', { count: 'exact', head: true });

        const { count: appCount } = await supabase
          .from('applications')
          .select('*', { count: 'exact', head: true });
 
         setStats({ 
           portfolioCount: portCount || 0, 
           careerCount: carCount || 0, 
           inquiryCount: inqCount || 0,
           applicationCount: appCount || 0,
           lastUser: 'Repute01' 
         });
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <>
      <style>{`
        .admin-main-content {
          margin-left: 260px;
          min-height: 100vh;
          background-color: #0f172a;
          padding: 60px 40px;
          font-family: 'Inter', system-ui, sans-serif;
          color: #f8fafc;
          animation: pageEntrance 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }

        @keyframes pageEntrance {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .dashboard-header {
          margin-bottom: 60px;
        }

        .dashboard-title {
          font-size: 3.5rem;
          color: #f8fafc;
          font-weight: 900;
          margin: 0;
          letter-spacing: -2px;
          line-height: 1;
        }

        .dashboard-subtitle {
          color: #94a3b8;
          font-size: 1.1rem;
          margin-top: 12px;
          font-weight: 500;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
        }

        .stat-card {
          background: rgba(30, 41, 59, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 10px 40px rgba(0, 0, 0, 0.2);
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          text-align: center;
        }

        .stat-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
          border-color: rgba(255,255,255,0.2);
          background: rgba(30, 41, 59, 0.9);
        }

        .stat-label {
          color: #94a3b8;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 20px;
          display: block;
        }

        .stat-value {
          font-size: 4.5rem;
          font-weight: 900;
          color: #f8fafc;
          line-height: 1;
          letter-spacing: -3px;
        }

        .stat-value.highlight {
          background: linear-gradient(135deg, #e10600 0%, #a30400 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      <Sidebar />
      <div className="admin-main-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard Overview</h1>
          <p className="dashboard-subtitle">Welcome back to the Repute Admin Panel</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Portfolio Projects</div>
            <div className="stat-value highlight">{stats.portfolioCount}</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-label">Total Career Posts</div>
            <div className="stat-value">{stats.careerCount}</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">New Inquiries</div>
            <div className="stat-value">{stats.inquiryCount}</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Job Applications</div>
            <div className="stat-value">{stats.applicationCount}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
