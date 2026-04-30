import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validCredentials = {
    'Repute01': 'Repute@001',
    'Repute02': 'Repute@002',
    'Repute03': 'Repute@003',
    'Repute04': 'Repute@004'
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Try Supabase Auth first
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username.includes('@') ? username : `${username}@repute.com`, // Auto-fallback to email format
        password: password,
      });

      if (error) {
        // Fallback for legacy local testing if Supabase isn't set up yet
        if (validCredentials[username] && validCredentials[username] === password) {
          localStorage.setItem('isAdminAuth', 'true');
          navigate('/dashboard');
          return;
        }
        throw error;
      }

      if (data.user) {
        localStorage.setItem('isAdminAuth', 'true');
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Invalid Username or Password');
    }
  };

  return (
    <>
      <style>{`
        .admin-login-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          /* Elegant premium background with dark overlay */
          background-image: linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.85)), url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          padding: 20px;
          font-family: 'Inter', system-ui, sans-serif;
        }

        .admin-glass-card {
          width: 100%;
          max-width: 420px;
          /* Glassmorphism properties exactly as requested */
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 24px;
          padding: 48px 32px;
          box-shadow: 0 24px 48px rgba(0, 0, 0, 0.25);
          text-align: center;
          /* Entrance Animation */
          animation: fadeUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .admin-logo {
          height: 48px;
          display: inline-block;
          margin-bottom: 24px;
        }

        .admin-title {
          color: #ffffff;
          font-size: 1.4rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          margin-bottom: 40px;
        }

        .admin-input {
          width: 100%;
          padding: 16px 24px;
          border-radius: 50px;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
          box-sizing: border-box;
          margin-bottom: 20px;
        }

        .admin-input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        .admin-input:focus {
          border-color: rgba(255, 255, 255, 0.8);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.15);
        }

        .admin-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #e10600 0%, #a30400 100%);
          color: #ffffff;
          border: none;
          border-radius: 50px;
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          margin-top: 12px;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
          box-shadow: 0 8px 24px rgba(225, 6, 0, 0.3);
        }

        .admin-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(225, 6, 0, 0.45);
        }

        .admin-btn:active {
          transform: translateY(0);
        }

        .admin-error {
          color: #ff6b6b;
          font-size: 0.95rem;
          font-weight: 500;
          margin-bottom: 20px;
          animation: shake 0.4s ease-in-out;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
      `}</style>

      <div className="admin-login-wrapper">
        <div className="admin-glass-card">
          <img 
            src="/logo.png" 
            alt="Repute Logo" 
            className="admin-logo"
          />
          
          <h2 className="admin-title">Repute Admin Login</h2>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column' }}>
            {error && (
              <div className="admin-error">
                {error}
              </div>
            )}
            
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="admin-input"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input"
              required
            />
            <button
              type="submit"
              className="admin-btn"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
