import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import { publicRoutes, privateRoutes } from './router/routes';
import DefaultLayout from './layout/DefaultLayout';
import PrivateLayout from './layout/PrivateLayout';
import ProtectedRoute from './components/ProtectedRoute';
import './App.scss';

import { auth } from './firebase';
import config from './router/config';
import Loader from './components/Loader';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setLogin] = useState('');
  const [colorLoader, setColorLoader] = useState('#fff');

  // function timeout(delay) {
  //   return new Promise((res) => setTimeout(res, delay));

  // }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setIsLoading(true);
      // await timeout(60000);

      if (user) {
        user.getIdToken().then((token) => {
          setLogin(token);
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
        <Navigate to={config.routes.login} />;
      }

      // Update the user state
      // setLogin(user);
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  console.log(isLogin);

  if (isLoading) return <Loader colorLoader={colorLoader} isLoading={isLoading} />;

  return (
    <div className="App">
      <Router>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Page />
                    </Layout>
                  </ProtectedRoute>
                }
              />
            );
          })}

          {privateRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = PrivateLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  // <PrivateRoute>
                  <Layout>
                    <Page />
                  </Layout>
                  // </PrivateRoute>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
