//Private Layout
import PrivateLayout from "../../Layout/PrivateLayout";
import LoginPage from "../../components/LoginPage";

//Layouts
import Home from "../../components/Home";
import NotFound from "../../components/NotFound";
import Table from "../../components/Table";

//Public routes
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/table", component: Table },
];

const privateRoutes = [
  { path: "*", component: NotFound, layout: PrivateLayout },
  { path: "/login", component: LoginPage, layout: PrivateLayout },
];

export { publicRoutes, privateRoutes };
