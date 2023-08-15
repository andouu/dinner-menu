import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { Root } from './routes/Root';
import { Error } from './routes/Error';
import { Recipes } from './routes/Recipes';
import { CostBreakdown } from './routes/CostBreakdown';
import { Breakfast } from './components/Breakfast';
import { Lunch } from './components/Lunch';
import { Dinner } from './components/Dinner';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        path: 'menu/breakfast',
        element: <Breakfast />,
      },
      {
        path: 'menu/lunch',
        element: <Lunch />,
      },
      {
        path: 'menu/dinner',
        element: <Dinner />,
      },
      {
        path: 'recipes',
        element: <Recipes />,
      },
      {
        path: 'costBreakdown',
        element: <CostBreakdown />,
      }
    ]
  },
]);

const App = () => { 
  return (
    <RouterProvider router={router} />
  );
};

export default App;
