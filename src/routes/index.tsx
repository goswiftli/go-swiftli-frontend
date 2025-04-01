import { RouterProvider, createBrowserRouter } from 'react-router';

import { RoutesList } from './RouteList';

const router = createBrowserRouter([...RoutesList]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
