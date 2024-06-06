import React from 'react'
import styles from "./AuthInput.module.css"
import Image from 'next/image'
import { AuthProps } from '@/types/types'


const AuthInput = ({labelText ,placeholderText,icon,onchange,type,value,onclick}:AuthProps) => {
  return (
    <div className={styles.mainAuthWrapper}>
      <p className={styles.labelText}>{labelText}</p>
      <div className={styles.input_container}>
      <input className={styles.input} type={type} value={value} onChange={onchange}  placeholder={placeholderText} />
      <Image src={icon} alt='icon' width={20} height={20} className={styles.icon} onClick={onclick}/>
      </div>
     
    </div>
  )
}

export default AuthInput
