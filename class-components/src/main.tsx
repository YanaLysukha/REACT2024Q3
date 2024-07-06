import ReactDOM from 'react-dom/client';
import './index.css';
import Container from './components/Container/Container';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<ErrorBoundary><Container></Container></ErrorBoundary>);
