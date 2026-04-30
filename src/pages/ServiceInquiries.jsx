import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { supabase } from '../supabaseClient';

const ServiceInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('subject', 'Service Inquiry')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (err) {
      console.error('Error fetching service inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);
      if (error) throw error;
      setInquiries(inquiries.filter(inq => inq.id !== id));
    } catch (err) {
      alert('Error deleting inquiry');
    }
  };

  return (
    <>
      <Sidebar />
      <div className="admin-main-content">
        <header className="admin-header-flex">
          <div>
            <h1 className="dashboard-title">Service Inquiries</h1>
            <p className="dashboard-subtitle">Manage inquiries from specialized service pages</p>
          </div>
          <button className="refresh-btn" onClick={fetchInquiries}>
            Refresh Data
          </button>
        </header>

        <div className="admin-card-table">
          {loading ? (
            <div className="loading-state">Loading inquiries...</div>
          ) : inquiries.length === 0 ? (
            <div className="empty-state">No inquiries found.</div>
          ) : (
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Service</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Website</th>
                  <th>Message</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq) => (
                  <tr key={inq.id}>
                    <td>{new Date(inq.created_at).toLocaleDateString()}</td>
                    <td><span className={`badge-pill ${(inq.service || 'default').toLowerCase().replace(/\s/g, '-')}`}>{inq.service}</span></td>
                    <td className="bold">{inq.name}</td>
                    <td>{inq.email}</td>
                    <td><a href={inq.phone} target="_blank" rel="noreferrer" className="table-link">{inq.phone || '-'}</a></td>
                    <td className="message-cell">{inq.message}</td>
                    <td>
                      <button className="delete-icon-btn" onClick={() => deleteInquiry(inq.id)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

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

        .admin-header-flex {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 40px;
        }

        .dashboard-title {
          font-size: 2.5rem;
          font-weight: 900;
          color: #f8fafc;
          margin: 0;
          letter-spacing: -1px;
        }

        .dashboard-subtitle {
          color: #94a3b8;
          margin-top: 8px;
          font-weight: 500;
        }

        .refresh-btn {
          background: #334155;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .refresh-btn:hover {
          background: #475569;
          transform: translateY(-2px);
        }

        .admin-card-table {
          background: rgba(30, 41, 59, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px;
          padding: 30px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
          overflow-x: auto;
        }

        .modern-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .modern-table th {
          padding: 16px;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #94a3b8;
          border-bottom: 2px solid rgba(255,255,255,0.1);
        }

        .modern-table td {
          padding: 20px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          font-size: 0.95rem;
          color: #cbd5e1;
        }

        .bold { font-weight: 700; color: #f8fafc; }

        .badge-pill {
          padding: 4px 12px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
        }

        .badge-pill.brand-creatives { background: rgba(239, 68, 68, 0.2); color: #f87171; }
        .badge-pill.web-development { background: rgba(34, 197, 94, 0.2); color: #4ade80; }
        .badge-pill.e-commerce { background: rgba(234, 179, 8, 0.2); color: #fbbf24; }
        .badge-pill.mobile-development { background: rgba(59, 130, 246, 0.2); color: #60a5fa; }

        .message-cell {
          max-width: 300px;
          line-height: 1.5;
          color: #94a3b8;
        }

        .table-link {
          color: #e10600;
          text-decoration: none;
          font-weight: 600;
        }

        .delete-icon-btn {
          background: transparent;
          border: none;
          color: #ef4444;
          cursor: pointer;
          opacity: 0.6;
          transition: all 0.2s;
        }

        .delete-icon-btn:hover {
          opacity: 1;
          transform: scale(1.1);
        }

        .loading-state, .empty-state {
          padding: 60px;
          text-align: center;
          color: #94a3b8;
          font-weight: 600;
        }
      `}</style>
    </>
  );
};

export default ServiceInquiries;
