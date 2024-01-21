import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './router/routes';
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import DefaultLayout from './layout/DefaultLayout';
import PrivateLayout from './layout/PrivateLayout';
import ProtectedRoute from './components/ProtectedRoute';
import './App.scss';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
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

function App() {
  return (
    // <div className="App">
    //   <Router>
    //     <Routes>
    //       {publicRoutes.map((route, index) => {
    //         const Page = route.component;
    //         let Layout = DefaultLayout;
    //         if (route.layout) {
    //           Layout = route.layout;
    //         } else if (route.layout === null) {
    //           Layout = Fragment;
    //         }
    //         return (
    //           <Route
    //             key={index}
    //             path={route.path}
    //             element={
    //               <ProtectedRoute>
    //                 <Layout>
    //                   <Page />
    //                 </Layout>
    //               </ProtectedRoute>
    //             }
    //           />
    //         );
    //       })}

    //       {privateRoutes.map((route, index) => {
    //         const Page = route.component;
    //         let Layout = PrivateLayout;
    //         if (route.layout) {
    //           Layout = route.layout;
    //         } else if (route.layout === null) {
    //           Layout = Fragment;
    //         }
    //         return (
    //           <Route
    //             key={index}
    //             path={route.path}
    //             element={
    //               <Layout>
    //                 <Page />
    //               </Layout>
    //             }
    //           />
    //         );
    //       })}
    //     </Routes>
    //   </Router>
    // </div>
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
