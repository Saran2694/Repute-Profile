import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { supabase } from '../supabaseClient';

const Inquiries = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .neq('subject', 'Service Inquiry')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (messages.length === 0) {
      alert("No data to export");
      return;
    }

    const headers = ["Date", "Name", "Email", "Phone", "Subject", "Service", "Message"];
    const csvRows = [
      headers.join(","),
      ...messages.map(m => {
        let dateStr = 'N/A';
        if (m.created_at) {
          const d = new Date(m.created_at);
          const day = String(d.getDate()).padStart(2, '0');
          const month = String(d.getMonth() + 1).padStart(2, '0');
          const year = d.getFullYear();
          dateStr = `${day}-${month}-${year}`;
        }
        return [
          `"${dateStr}"`,
          `"${m.name || ''}"`,
          `"${m.email || ''}"`,
          `"${m.phone || ''}"`,
          `"${(m.subject || '').replace(/"/g, '""')}"`,
          `"${(m.service || '').replace(/"/g, '""')}"`,
          `"${(m.message || '').replace(/"/g, '""')}"`
        ].join(",");
      })
    ];

    const csvContent = csvRows.join("\n");
    const blob = new Blob(["\ufeff", csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `client_inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        const { error } = await supabase.from('contacts').delete().eq('id', id);
        if (error) throw error;
        fetchMessages();
      } catch (err) {
        console.error('Error deleting message:', err);
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
        .admin-table td { padding: 15px 20px; border-bottom: 1px solid #334155; color: #f8fafc; vertical-align: top; }
        .msg-cell { max-width: 300px; font-size: 0.9rem; color: #cbd5e1; line-height: 1.5; }
        .delete-btn { color: #f87171; border: none; background: none; cursor: pointer; font-weight: 600; padding: 5px 10px; border-radius: 6px; transition: 0.2s; }
        .delete-btn:hover { background: rgba(248, 113, 113, 0.1); }
        .refresh-btn { background: #e10600; color: white; border: none; padding: 12px 24px; border-radius: 12px; cursor: pointer; fontWeight: 700; transition: 0.3s; }
        .refresh-btn:hover { background: #c00500; transform: translateY(-2px); }

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
        <div className="page-header">
          <div>
            <h1 className="page-title">Inquiries</h1>
            <p style={{ color: '#94a3b8', marginTop: '8px' }}>Manage messages sent from the Contact page.</p>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button className="export-btn" onClick={() => handleExport()}>
              Export Data
            </button>
            <button onClick={fetchMessages} className="refresh-btn">Refresh Messages</button>
          </div>
        </div>

        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Subject & Service</th>
                <th>Message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>Loading messages...</td></tr>
              ) : messages.length === 0 ? (
                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>No messages found.</td></tr>
              ) : (
                messages.map((m) => (
                  <tr key={m.id}>
                    <td>{new Date(m.created_at).toLocaleDateString()}</td>
                    <td style={{ fontWeight: 700 }}>{m.name}</td>
                    <td>
                      <div style={{ fontSize: '0.85rem' }}>{m.email}</div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{m.phone}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{m.subject}</div>
                      <div style={{ fontSize: '0.75rem', color: '#e10600' }}>{m.service}</div>
                    </td>
                    <td className="msg-cell">{m.message}</td>
                    <td>
                      <button className="delete-btn" onClick={() => handleDelete(m.id)}>Delete</button>
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

export default Inquiries;
