import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/contacts")
      .then(res => res.json())
      .then(data => setContacts(data))
      .catch(err => console.log(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin');
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Client Dashboard</h1>
        <button onClick={handleLogout} style={{ padding: '8px 16px', background: '#ff4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Logout</button>
      </div>

      <table border="1" width="100%" style={{ marginTop: '30px', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th style={{ padding: '12px' }}>Name</th>
            <th style={{ padding: '12px' }}>Email</th>
            <th style={{ padding: '12px' }}>Subject</th>
            <th style={{ padding: '12px' }}>Message</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(item => (
            <tr key={item._id}>
              <td style={{ padding: '12px' }}>{item.name}</td>
              <td style={{ padding: '12px' }}>{item.email}</td>
              <td style={{ padding: '12px' }}>{item.subject}</td>
              <td style={{ padding: '12px' }}>{item.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}