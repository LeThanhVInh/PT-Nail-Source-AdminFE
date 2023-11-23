//Layouts
import Home from "../../components/Home";
import NotFound from "../../components/NotFound";
import Table from "../../components/Table";

//Public routes
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/table", component: Table },
  { path: "*", component: NotFound },
];

const privateRoutes = [
  //   { path: "/cart", component: Cart, layout: HeaderOnly },
  //   { path: "/admin", component: AdminPage, layout: HeaderOnly },
];

export { publicRoutes, privateRoutes };
