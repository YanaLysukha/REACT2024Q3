import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from '../App';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Details from '../components/Details/Details';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="item/:itemId" element={<Details></Details>}></Route>
      </Route>
      <Route path="*" element={<ErrorPage />}></Route>
    </>,
  ),
);

export default router;
