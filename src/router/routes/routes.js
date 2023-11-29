//Private Layout
import PrivateLayout from "../../Layout/PrivateLayout";
import LoginPage from "../../pages/LoginPage";

//Layouts
import Home from "../../pages/Home";
import NotFound from "../../pages/NotFound";
import Products from "../../pages/Products";
import ProductEdit from "../../pages/ProductEdit/ProductEdit";

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
