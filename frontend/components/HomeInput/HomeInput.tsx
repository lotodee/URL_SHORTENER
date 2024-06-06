import React from 'react'
import styles from "./HomeInput.module.css"
import { HomeInputs } from '@/types/types'
const HomeInput = ({label ,placeholderText , httpText,value,onchange}:HomeInputs) => {
  return (
    <div className={styles.inputWrapper}>
      <p className={styles.labelText}>{label}</p>
       <div className={styles.inputContainer}
       style={{backgroundColor : httpText ? "transparent" : "rgba(234, 236, 240, 1)"}}
       >
        {httpText && (
        <div className={styles.http}>{httpText}</div>
      )}
        <input type="text" placeholder={placeholderText}  className={styles.input} value={value} onChange={onchange}
        style={{backgroundColor:httpText ? "transparent" :"rgba(234, 236, 240, 1)"}}
        />
       </div>
    </div>
  )
}

export default HomeInput
