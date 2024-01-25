import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { privateRoutes } from '../../router/routes';

import { auth } from '../../firebase';
import Loader from '../Loader';

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await user.getIdToken().then((token) => {
          if (token !== '') {
            // console.log('Bearer', token);
            setIsLoading(false);
            setLogin(true);
          } else {
            setIsLoading(false);
            setLogin(false);
          }
        });
      } else {
        setIsLoading(false);
        setLogin(false);
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [isLogin]);

  if (!isLogin && isLoading) return <Loader colorLoader="#fff" isLoading={isLoading} />;
  else if (!isLogin && !isLoading)
    return <Navigate to={privateRoutes.Login.path} state={{ prevUrl: location.pathname }} />;

  return children;
  // return currentUser ? children : <Navigate to={config.routes.login} />;
}
