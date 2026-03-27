import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const handleLogout = async () => {
    setError('');
    setBusy(true);
    try {
      await logout();
    } catch (e) {
      const msg = e.response?.data?.msg;
      setError(
        msg ||
          (e.code === 'ERR_NETWORK' ? 'Cannot reach server' : 'Logout failed. Try again.')
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-brand">Buyer Portal</span>
        {error && <span className="navbar-error">{error}</span>}
      </div>
      <div className="navbar-right">
        <span className="navbar-user">{user?.name}</span>
        <span className="navbar-role">{user?.role}</span>
        <button
          type="button"
          onClick={handleLogout}
          className="navbar-logout"
          disabled={busy}
        >
          {busy ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
