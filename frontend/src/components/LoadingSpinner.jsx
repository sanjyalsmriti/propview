import './LoadingSpinner.css';

function LoadingSpinner({ label = 'Loading...' }) {
  return (
    <div className="loading-spinner-wrap" role="status" aria-live="polite">
      <span className="loading-spinner" aria-hidden />
      <span className="loading-spinner-label">{label}</span>
    </div>
  );
}

export default LoadingSpinner;
