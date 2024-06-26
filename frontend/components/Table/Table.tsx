"use client"
import React, { useEffect, useState } from 'react';
import styles from "./Table.module.css";
import HeaderText from '../HeaderText/HeaderText';
import Image from 'next/image';
import Pagination from '../pagination/Pagination';
import { TableProps, TableResponseData } from '@/types/types';

import { useAuthContext } from '@/hooks/useAuthContext';
import { getUserData } from '@/hooks/getUsersData';
import Link from 'next/link';

const Table = ({ onClick, triggerFetch }: TableProps) => {
  const [small, setSmall] = useState(false);
  const { user } = useAuthContext();
  const { token } = user ?? { token: null };

  // Effect to handle resizing and update small state for responsive design
  useEffect(() => {
    const handleResize = () => {
      const mediaQuery700px = window.matchMedia('(max-width: 700px)');
      const mediaQuery1000px = window.matchMedia('(max-width: 1000px)');
      setSmall(mediaQuery700px.matches || mediaQuery1000px.matches);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [data, setData] = useState<TableResponseData | any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    // Fetch data when token changes
    if (token) {
      const fetchData = async () => {
        const response = await getUserData({ token });
        setData(response);
      };
      fetchData();
    }
  }, [token]);

  // Trigger fetching data when triggerFetch changes
  if (triggerFetch) {
    if (token) {
      (async () => {
        const response = await getUserData({ token });
        setData(response);
      })();
    }
  }

  // Function to handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate start and end indexes for pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = data.slice(startIndex, endIndex);

  // Function to handle clicking on a table row
  const handleClick = (link: string) => {
    onClick(link);
  };

  return (
    <div className={styles.table}>
      <div className={styles.TableHeader}>
        {!small && (
          <>
            <HeaderText text="Name" />
            <HeaderText text="Description" icon="/Help.svg" />
          </>
        )}
        <HeaderText text='Shortened URL' />
      </div>

      {currentPageData.map((item: any) => (
        <div
          key={item.id}
          className={styles.TableBody}
         
        >
          {!small && (
            <>
              <div className={styles.name}>{item.name}</div>
              <div className={styles.desc}>{item.description}</div>
            </>
          )}
          <div className={styles.shortened}>
          <Link href={`http://localhost:3333/api/${item.shortened_url}`} legacyBehavior>
              <a target="_blank" rel="noopener noreferrer" className={styles.shortenedText}>
                http://localhost:3333/api/{item.shortened_url}
              </a>
            </Link>
           
            <Image src="/bodyLink.svg" alt='linkicon' height={18} width={18} />
          </div>
        </div>
      ))}

      <div>
        <Pagination
          dataLength={data.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Table;
