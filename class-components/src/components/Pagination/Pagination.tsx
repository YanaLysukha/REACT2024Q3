import styles from './style.module.css';

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.wrapper}>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        {'<'}
      </button>
      {pages.map((page) => (
        <button key={page} onClick={() => onPageChange(page)} disabled={page === currentPage}>
          {page}
        </button>
      ))}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
