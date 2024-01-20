//Private Layout
import PrivateLayout from '../../layout/PrivateLayout';
import LoginPage from '../../pages/LoginPage';
import LockPage from '../../pages/LockPage';

//Layouts
import Home from '../../pages/Home';
import NotFound from '../../pages/NotFound';
import Products from '../../pages/Products';
import ProductEdit from '../../pages/ProductEdit/ProductEdit';
import Post from '../../pages/Post/Post';
import PointOfSale from '../../pages/PointOfSale/PointOfSale';
import Categories from '../../pages/Categories/Categories';
import CalendarPage from '../../pages/CalendarPage';
import AccountPage from '../../pages/AccountPage';
import Stores from '../../pages/Stores';

//Public routes
const publicRoutes = [
  { path: '/', component: Home },
  { path: '/products', component: Products },
  { path: '/products-edit', component: ProductEdit },
  { path: '/post', component: Post },
  { path: '/point-of-sale', component: PointOfSale },
  { path: '/categories', component: Categories },
  { path: '/calendar', component: CalendarPage },
  { path: '/account', component: AccountPage },
  { path: '/stores', component: Stores },
];

const privateRoutes = [
  { path: '*', component: NotFound, layout: PrivateLayout },
  { path: '/login', component: LoginPage, layout: PrivateLayout },
  { path: '/lock', component: LockPage, layout: PrivateLayout },
];

export { publicRoutes, privateRoutes };
