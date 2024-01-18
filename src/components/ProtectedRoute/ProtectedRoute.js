import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../providers/custom-hooks/useAuth';
import config from '../../router/config';

import { auth } from '../../firebase';
import Loader from '../Loader';

export default function ProtectedRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setLogin] = useState(false);
  const [colorLoader, setColorLoader] = useState('#fff');

  // const { currentUser } = useAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await user.getIdToken().then((token) => {
          if (token !== '') {
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
      // Update the user state
      // setLogin(user);
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [isLogin]);

  if (!isLogin && isLoading) return <Loader colorLoader={colorLoader} isLoading={isLoading} />;
  else if (!isLogin && !isLoading) return <Navigate to={config.routes.login} />;

  return children;
  // return currentUser ? children : <Navigate to={config.routes.login} />;
}
