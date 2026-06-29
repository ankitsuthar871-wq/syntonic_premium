import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = "https://syntonic-backend.onrender.com";

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem('isAdmin', 'true');
        window.location.href = '/dashboard';
      } else {
        alert('Wrong password, try again.');
      }
    } catch (err) {
      console.log(err);
      alert('Something went wrong. Try again.');
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
      <form onSubmit={handleLogin} style={{ padding: '40px', background: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <h2>Admin Login</h2>
        <input 
          type="password" 
          placeholder="Enter Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', width: '200px', borderRadius: '8px', border: '1px solid #ccc', margin: '20px 0', display: 'block' }}
        />
        <button type="submit" style={{ padding: '10px 20px', background: '#C9A96E', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Login</button>
      </form>
    </div>
  );
}