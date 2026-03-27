import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.msg;
      setError(
        msg ||
          (err.code === 'ERR_NETWORK' ? 'Cannot reach server' : 'Something went wrong')
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        {error && <p className="auth-error">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={submitting}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={submitting}
        />
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={submitting}
        />
        <button type="submit" disabled={submitting}>
          {submitting ? 'Creating account...' : 'Register'}
        </button>
        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
