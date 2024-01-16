import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import { publicRoutes, privateRoutes } from './router/routes';
import DefaultLayout from './layout/DefaultLayout';
import PrivateLayout from './layout/PrivateLayout';
import ProtectedRoute from './components/ProtectedRoute';

import './App.scss';

function App() {
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
