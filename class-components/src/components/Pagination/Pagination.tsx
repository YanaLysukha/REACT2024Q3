import { useMemo } from 'react';
import styles from './style.module.css';
import { useNavigateMethods } from '../../hooks/useNavigateMethods';
import { useLocation, useNavigate } from 'react-router-dom';

const TOTAL_PAGES = 10;

const Pagination: React.FC = () => {
  const pages = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);

  const { getPageValue } = useNavigateMethods();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentPage = useMemo(() => getPageValue(), [getPageValue]);

  const handlePageChange = (page: number) => {
    navigate(`${pathname}?page=${page}`);
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {'<'}
      </button>
      {pages.map((page) => (
        <button
          className={styles.button}
          key={page}
          onClick={() => handlePageChange(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}
      <button
        className={styles.button}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === TOTAL_PAGES}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
