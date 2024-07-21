import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './Layout';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
