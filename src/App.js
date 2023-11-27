// import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Fragment } from "react";

import { publicRoutes, privateRoutes } from "./router/routes";

import DefaultLayout from "./Layout/DefaultLayout";
import PrivateLayout from "./Layout/PrivateLayout";

function App() {
  return (
    <>
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
                  <Layout>
                    <Page />
                  </Layout>
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
    </>
  );
}

export default App;
