import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Details from '../components/Details/Details';
import MainPage from '../pages/MainPage/MainPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainPage />}>
        <Route path="item/:itemId" element={<Details />}></Route>
      </Route>
      <Route path="*" element={<ErrorPage />}></Route>
    </>,
  ),
);

export default router;
