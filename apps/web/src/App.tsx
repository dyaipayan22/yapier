import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '@/pages/Home';
import HeaderLayout from '@/components/layout/HeaderLayout';
import Dashboard from './pages/Dashboard';
import AuthLayout from './components/layout/AuthLayout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import CreateZap from './pages/CreateZap';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <HeaderLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'zap/create',
        element: <CreateZap />,
      },
    ],
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
