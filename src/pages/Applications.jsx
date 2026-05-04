import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { supabase } from '../supabaseClient';

const Applications = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  // --- TEMPORARY DIAGNOSTIC TEST ---
  useEffect(() => {
    const fetchApps = async () => {
      const { data, error } = await supabase
        .from('applications')
        .select('*');

      console.log("--- APPLICATIONS TEST ---");
      console.log("DATA:", data);
      console.log("ERROR:", error);
    };

    fetchApps();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApps(data || []);
    } catch (err) {
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (apps.length === 0) {
      alert("No data to export");
      return;
    }

    const headers = ["Date", "Candidate Name", "Email", "Mobile", "Job Role", "Service Type", "Source", "Resume URL"];
    const csvRows = [
      headers.join(","),
      ...apps.map(a => {
        let dateStr = 'N/A';
        if (a.created_at) {
          const d = new Date(a.created_at);
          const day = String(d.getDate()).padStart(2, '0');
          const month = String(d.getMonth() + 1).padStart(2, '0');
          const year = d.getFullYear();
          dateStr = `${day}-${month}-${year}`;
        }
        return [
          `"${dateStr}"`,
          `"${a.first_name || ''} ${a.last_name || ''}"`.trim(),
          `"${a.email || ''}"`,
          `"${a.mobile || ''}"`,
          `"${a.selected_job || ''}"`,
          `"${a.service_type || ''}"`,
          `"${a.source || ''}"`,
          `"${a.resume_url || ''}"`
        ].join(",");
      })
    ];

    const csvContent = csvRows.join("\n");
    const blob = new Blob(["\ufeff", csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `applications_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        const { error } = await supabase.from('applications').delete().eq('id', id);
        if (error) throw error;
        fetchApplications();
      } catch (err) {
        console.error('Error deleting application:', err);
      }
    }
  };

  return (
    <>
      <style>{`
        .admin-main-content { 
          margin-left: 260px; 
          min-height: 100vh; 
          background-color: #0f172a; 
          padding: 40px; 
          font-family: 'Inter', sans-serif; 
          animation: pageEntrance 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }

        @keyframes pageEntrance {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .page-header { margin-bottom: 30px; display: flex; justify-content: space-between; align-items: flex-end; }
        .page-title { font-size: 1.8rem; font-weight: 800; color: #ffffff; margin: 0; }
        .table-container { background: #1e293b; border-radius: 20px; border: 1px solid #334155; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
        .admin-table { width: 100%; border-collapse: collapse; }
        .admin-table th { padding: 15px 20px; text-align: left; font-size: 0.75rem; text-transform: uppercase; color: #94a3b8; border-bottom: 1px solid #334155; letter-spacing: 1px; }
        .admin-table td { padding: 15px 20px; border-bottom: 1px solid #334155; color: #f8fafc; }
        .resume-link { display: inline-block; padding: 8px 16px; background: #e10600; color: white; text-decoration: none; border-radius: 10px; font-size: 0.8rem; font-weight: 700; transition: 0.3s; }
        .resume-link:hover { background: #c00500; transform: translateY(-1px); }
        .delete-btn { color: #f87171; border: none; background: none; cursor: pointer; font-weight: 600; padding: 5px 10px; border-radius: 6px; transition: 0.2s; }
        .delete-btn:hover { background: rgba(248, 113, 113, 0.1); }
        .refresh-btn { background: #334155; color: white; border: none; padding: 12px 24px; border-radius: 12px; cursor: pointer; fontWeight: 700; transition: 0.3s; }
        .refresh-btn:hover { background: #475569; }

        .export-btn {
          background: #10b981;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 700;
          transition: 0.3s;
        }

        .export-btn:hover {
          background: #059669;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
        }
      `}</style>

      <Sidebar />
      <div className="admin-main-content">
        <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 className="page-title">Applications</h1>
            <p style={{ color: '#64748b', marginTop: '8px' }}>Review and manage resumes submitted by job seekers.</p>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button className="export-btn" onClick={() => handleExport()}>
              Export Data
            </button>
            <button onClick={fetchApplications} className="refresh-btn">Refresh Applications</button>
          </div>
        </div>

        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Candidate Name</th>
                <th>Contact Info</th>
                <th>Application Details</th>
                <th>Resume</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>Loading applications...</td></tr>
              ) : apps.length === 0 ? (
                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>No applications yet.</td></tr>
              ) : (
                apps.map((a) => (
                  <tr key={a.id}>
                    <td>{new Date(a.created_at).toLocaleDateString()}</td>
                    <td style={{ fontWeight: 700 }}>{a.first_name} {a.last_name}</td>
                    <td>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{a.email}</div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{a.mobile}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: '#e10600' }}>{a.selected_job}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                        {a.service_type} | {a.source}
                      </div>
                    </td>
                    <td>
                      {a.resume_url ? (
                        <a href={a.resume_url} target="_blank" rel="noreferrer" className="resume-link">View Resume ↗</a>
                      ) : (
                        <span style={{ color: '#94a3b8' }}>No Resume</span>
                      )}
                    </td>
                    <td>
                      <button className="delete-btn" onClick={() => handleDelete(a.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Applications;
