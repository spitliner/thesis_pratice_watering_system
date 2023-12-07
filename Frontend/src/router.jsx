import { Suspense, lazy } from 'react';
import BaseLayout from './layouts/BaseLayout';
import AuthRouteProvider from './middleware/AuthRouteProvider';
import SuspenseLoader from './components/SuspenseLoader';

const Loader = (Component) => (props) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

//import pages
const Home = Loader(lazy(() => import('./pages/Home/_id')));
const Login = Loader(lazy(() => import('./pages/Login/_id')));
const Register = Loader(lazy(() => import('./pages/Register/_id')));
const Schedules = Loader(lazy(() => import('./pages/Schedules/_id')));
const Add = Loader(lazy(() => import('./pages/Schedules/components/Add')));
const Device = Loader(lazy(() => import('./pages/Device/_id')));
const Profile = Loader(lazy(() => import('./pages/Profile/_id')));
const Report = Loader(lazy(() => import('./pages/Report/_id')));

const routes = [
  //Inside NavBar and AppBar layout
  {
    path: '/',
    element: (
      <AuthRouteProvider>
        <BaseLayout />
      </AuthRouteProvider>
    ),
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: '/schedules',
        element: <Schedules />
      },
      {
        path: '/schedules/add',
        element: <Add />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/device',
        element: <Device />
      },
      {
        path: '/report',
        element: <Report />
      }
    ]
  },
  //No NavBar and AppBar
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '*',
    element: 'Địa chỉ không tồn tại'
  }
];
export default routes;
// export default AppRouter;
