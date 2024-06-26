"use client";
import React, { useState, useEffect } from 'react';
import styles from "./Navbar.module.css";
import NavIcons from '../NabarIcons/NavIcons';
import { useLogout } from '@/hooks/useLogout';
import Link from 'next/link';

const Navbar = () => {
  const {logout} = useLogout()
const handleLogout = () =>{
  logout()
}
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

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navbarContainer}>
        <p className={styles.logoText}>PLACEHOLDER</p>
        <div className={styles.navbarRight}>
          <div className={styles.combinedIcon}>
            <NavIcons src='/searchIcon.svg' />
            {!small && (
            <NavIcons src='/bellIcon.svg' />
          )}
         
          <NavIcons src='/LogoutIcon.svg' onclick={handleLogout} />
          
           
          </div>
          {!small && (
          <NavIcons src='/Avatar.svg' />
          )}
        </div>
      </div>

    </div>
  );
};

export default Navbar;