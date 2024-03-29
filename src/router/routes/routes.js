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
import POSDevices from '../../pages/POSDevices';
import Discounts from '../../pages/Discounts';
import Taxes from '../../pages/Taxes';
import CustomTranslation from '../../pages/CustomTranslation/CustomTranslation';

const publicRoutes = {
  Home: { name: 'Home', key: 'Home', path: '/', component: Home },
  Products: { name: 'Products', key: 'Products', path: '/products', component: Products },
  ProductEdit: { name: 'ProductEdit', key: 'ProductEdit', path: '/products-edit', component: ProductEdit },
  Post: { name: 'Post', key: 'Post', path: '/post', component: Post },
  PointOfSale: { name: 'PointOfSale', key: 'PointOfSale', path: '/point-of-sale', component: PointOfSale },
  Calendar: { name: 'CalendarPage', key: 'CalendarPage', path: '/calendar', component: CalendarPage },
  Account: { name: 'AccountPage', key: 'AccountPage', path: '/account', component: AccountPage },
  Stores: { name: 'Stores', key: 'Stores', path: '/stores', component: Stores },
  POSDevices: { name: 'POSDevices', key: 'POSDevices', path: '/posdevices', component: POSDevices },
  Categories: { name: 'Categories', key: 'Categories', path: '/categories-product', component: Categories },
  Discounts: { name: 'Discounts', key: 'Discounts', path: '/discounts', component: Discounts },
  Taxes: { name: 'Taxes', key: 'Taxes', path: '/taxes', component: Taxes },
  CustomTranslation: {
    name: 'CustomTranslation',
    key: 'CustomTranslation',
    path: '/uilanguages',
    component: CustomTranslation,
  },
};

const privateRoutes = {
  NotFound: { name: 'NotFound', key: 'NotFound', path: '*', component: NotFound, layout: PrivateLayout },
  Login: { name: 'Login', key: 'Login', path: '/login', component: LoginPage, layout: PrivateLayout },
  Lock: { name: 'Lock', key: 'Lock', path: '/lock', component: LockPage, layout: PrivateLayout },
};

export { publicRoutes, privateRoutes };
