import MainPage from './pages/MainPage/Container';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <MainPage></MainPage>
    </ErrorBoundary>
  );
}
