import SearchBar from './components/SearchBar/SearchBar';
import ReactDOM from 'react-dom/client';
import './index.css';
import ListView from './components/ListView/ListView';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <>
    <SearchBar></SearchBar>
    <ListView></ListView>
  </>,
);
