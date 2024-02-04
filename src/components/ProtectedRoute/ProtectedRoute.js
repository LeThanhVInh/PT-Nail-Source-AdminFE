import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { privateRoutes } from '../../router/routes';
import { auth } from '../../firebase';
import AuthAPI from '../../api/Auth';

import { saveAuthUserData } from '../../providers/features/userSetting/userSettingSlice';

import Loader from '../Loader';

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setLogin] = useState(false);
  const [isAllowed, setAllow] = useState(false);

  const checkRoute = useSelector((state) => state.userSetting.authUserData);

  const currentURL = location.pathname;

  function checkUrl(url, allowedRoute) {

    let validRoutes = [];
    if (allowedRoute === null || allowedRoute.length === 0) {
      validRoutes = checkRoute?.AllowedScreens?.map((item) => item.RouteLink);
    } else {
      validRoutes = allowedRoute?.AllowedScreens?.map((item) => item.RouteLink);
    }

    if (validRoutes) {
      const isIncluded = validRoutes.includes(url);
      if (isIncluded) {
        setAllow(true);
      } else {
        setAllow(false);
      }
    } else {
      setAllow(false);
    }

    setLogin(true);
    setIsLoading(false);
  }

  useEffect(() => {
    setAllow(false);
    if (checkRoute !== null) {
      checkUrl(currentURL, null); //check khi url thay doi tu browser
    }
    // eslint-disable-next-line
  }, [location]);

  async function checkToken() {
    const tokenResult = await AuthAPI.CheckToken();
    if (tokenResult !== null) {
      dispatch(saveAuthUserData(tokenResult));
      checkUrl(currentURL, tokenResult);
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await user.getIdToken().then((token) => {
          if (token.trim() !== '') {
            checkToken();
          } else {
            setIsLoading(false);
            setLogin(false);
            setAllow(false);
          }
        });
      } else {
        setIsLoading(false);
        setLogin(false);
        setAllow(false);
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loader colorLoader="#fff" isLoading={isLoading} />;
  } else if (!isLoading && ((!isLogin && !isAllowed) || (!isLogin && isAllowed))) {
    return <Navigate to={privateRoutes.Login.path} state={{ prevUrl: location.pathname }} />;
  } else if (!isLoading && isLogin && !isAllowed) {
    return navigate(privateRoutes.NotFound.path);
  } else if (!isLoading && isLogin && isAllowed) {
    return children;
  } else {
    return <Navigate to={privateRoutes.NotFound.path} replace />;
  }
}
