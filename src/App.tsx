import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { Root } from './routes/Root';
import { Error } from './routes/Error';
import { Scene } from './components/Scene';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
  },
]);

const App = () => { 
  return (
    <RouterProvider router={router} />
  );
};

export default App;
