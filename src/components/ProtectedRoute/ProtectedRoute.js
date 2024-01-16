import { Navigate } from 'react-router-dom';
import useAuth from '../../custom-hooks/useAuth';
import config from '../../router/config';
import { auth } from '../../firebase';

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to={config.routes.login} />;
}
