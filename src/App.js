import { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './router/routes';
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import DefaultLayout from './layout/DefaultLayout';
import PrivateLayout from './layout/PrivateLayout';
import ProtectedRoute from './components/ProtectedRoute';
import './App.scss';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {Object.keys(publicRoutes).map((keyName) => {
        const route = publicRoutes[keyName];
        const Page = route.component;
        let Layout = DefaultLayout;
        if (route.layout) {
          Layout = route.layout;
        } else if (route.layout === null) {
          Layout = Fragment;
        }
        return (
          <Route
            key={route.key}
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

      {Object.keys(privateRoutes).map((keyName) => {
        const route = privateRoutes[keyName];
        const Page = route.component;
        let Layout = PrivateLayout;
        if (route.layout) {
          Layout = route.layout;
        } else if (route.layout === null) {
          Layout = Fragment;
        }
        return (
          <Route
            key={route.key}
            path={route.path}
            element={
              <Layout>
                <Page />
              </Layout>
            }
          />
        );
      })}
    </>,
  ),
);

export default function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
