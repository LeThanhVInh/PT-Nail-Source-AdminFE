//Layouts HeaderOnly

//Layouts
import Home from "../../components/Home";
import NotFound from "../../components/NotFound";

//Public routes
const publicRoutes = [
  { path: "/", component: Home },

  // { path: "/cart", component: Cart, layout: HeaderOnly },
  { path: "*", component: NotFound },
];

const privateRoutes = [
  //   { path: "/cart", component: Cart, layout: HeaderOnly },
  //   { path: "/admin", component: AdminPage, layout: HeaderOnly },
];

export { publicRoutes, privateRoutes };
