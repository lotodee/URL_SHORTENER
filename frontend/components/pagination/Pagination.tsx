import React, { useState, useEffect } from 'react';
import styles from "./Pagination.module.css"
import Image from 'next/image';
import { PaginationProps } from '@/types/types';



// interface PaginationProps {
//   dataLength: number;
//   itemsPerPage: number;
//   currentPage: number;
//   onPageChange: (page: number) => void;
// }

const Pagination = ({
  dataLength,
  itemsPerPage,
  currentPage,
  onPageChange,
}:PaginationProps) => {



    const [small, setSmall] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        const mediaQuery = window.matchMedia('(max-width: 700px)');
        setSmall(mediaQuery.matches);
      };
  
      handleResize();
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);



  const [totalPages, setTotalPages] = useState(1);
  const [pageNumbers, setPageNumbers] = useState<(number | string)[]>([]);

  useEffect(() => {
    const pages = Math.ceil(dataLength / itemsPerPage);
    setTotalPages(pages);

    const numbers = Array.from({ length: pages }, (_, i) => i + 1);
    setPageNumbers(getPageNumbersWithEllipsis(numbers, currentPage));
  }, [dataLength, itemsPerPage, currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const getPageNumbersWithEllipsis = (numbers: number[], currentPage: number): (number | string)[] => {
    if (numbers.length <= 7) {
      return numbers;
    }

    const pageNumbers: (number | string)[] = [];
    const firstThree = numbers.slice(0, 3);
    const lastThree = numbers.slice(-3);

    if (currentPage <= 3) {
      pageNumbers.push(...firstThree, '. . .', ...lastThree);
    } else if (currentPage >= numbers.length - 2) {
      pageNumbers.push(firstThree[0], '. . .', ...lastThree);
    } else {
      pageNumbers.push(firstThree[0], '. . .', currentPage - 1, currentPage, currentPage + 1, '...', lastThree[0]);
    }

    return pageNumbers;
  };

  return (
    <div className={styles.paginationController}  >
        
        <div className={styles.previous} onClick={handlePreviousPage}>
        <Image src="/arrow-left.svg" alt='arrow' height={20} width={20}/>
        <button onClick={handlePreviousPage} disabled={currentPage === 1} className={styles.prevBtn}>
        Previous
      </button>
      
        </div>

 <div className={styles.numbers}>
        {small ? (
          <p className={styles.smallControllerText}>
            <span className={styles.span}>Page</span> {currentPage} <span className={styles.span}>of</span> {totalPages}
          </p>
        ) : (
          pageNumbers.map((page, index) => (
            typeof page === 'number' ? (
              <button
                key={index}
                onClick={() => handlePageClick(page)}
                className={currentPage === page ? styles.active : styles.inactive}
              >
                {page}
              </button>
            ) : (
              <span key={index} className={styles.ellipsis}>
                {page}
              </span>
            )
          ))
        )}
      </div>
     
<div className={styles.next} onClick={handleNextPage}>

      <button onClick={handleNextPage} disabled={currentPage === totalPages} className={styles.nextBtn}>
        Next
      </button>
      <Image src="/arrow-right.svg" alt='arrow' height={20} width={20}/>
      </div>
    </div>
  );
};

export default Pagination;