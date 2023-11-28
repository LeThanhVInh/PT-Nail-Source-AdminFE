//Private Layout
import PrivateLayout from "../../Layout/PrivateLayout";
import LoginPage from "../../components/pages/LoginPage";

//Layouts
import Home from "../../components/pages/Home";
import NotFound from "../../components/pages/NotFound";
import Products from "../../components/pages/Products";
import ProductEdit from "../../components/pages/ProductEdit/ProductEdit";

//Public routes
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/products", component: Products },
  { path: "/products-edit", component: ProductEdit },
];

const privateRoutes = [
  { path: "*", component: NotFound, layout: PrivateLayout },
  { path: "/login", component: LoginPage, layout: PrivateLayout },
];

export { publicRoutes, privateRoutes };
