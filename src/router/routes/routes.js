//Private Layout
import PrivateLayout from "../../layout/PrivateLayout";
import LoginPage from "../../pages/LoginPage";
import LockPage from "../../pages/LockPage";

//Layouts
import Home from "../../pages/Home";
import NotFound from "../../pages/NotFound";
import Products from "../../pages/Products";
import ProductEdit from "../../pages/ProductEdit/ProductEdit";
import Post from "../../pages/Post/Post";

//Public routes
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/products", component: Products },
  { path: "/products-edit", component: ProductEdit },
  { path: "/post", component: Post },
];

const privateRoutes = [
  { path: "*", component: NotFound, layout: PrivateLayout },
  { path: "/login", component: LoginPage, layout: PrivateLayout },
  { path: "/lock", component: LockPage, layout: PrivateLayout },
];

export { publicRoutes, privateRoutes };
