import React from 'react'
import styles from "./HeaderText.module.css";
import Image from 'next/image';
import { HeaderTextProps } from '@/types/types';
const HeaderText = ({text,icon}:HeaderTextProps) => {
  return (
    <div className={styles.wrapper} style={{
        flex:1
    }}>
      <p className={styles.text}>{text}</p>
      {icon && (
      <Image src={icon || ""} alt="helpicon" height={16} width={16}/>
    )}
    </div>
  )
}

export default HeaderText
