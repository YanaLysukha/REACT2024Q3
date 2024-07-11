import Container from './components/Container/Container';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <Container></Container>
    </ErrorBoundary>
  );
}
