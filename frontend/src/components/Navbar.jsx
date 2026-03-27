import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <span className="navbar-brand">Buyer Portal</span>
      <div className="navbar-right">
        <span className="navbar-user">{user?.name}</span>
        <span className="navbar-role">{user?.role}</span>
        <button onClick={logout} className="navbar-logout">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
