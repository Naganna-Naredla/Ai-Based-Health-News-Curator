import { FaSpinner } from 'react-icons/fa';

function LoadingSpinner() {
  return (
    <div className="spinner">
      <FaSpinner style={{ fontSize: '24px' }} />
    </div>
  );
}

export default LoadingSpinner;