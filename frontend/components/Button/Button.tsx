import React from 'react'
import styles from "./button.module.css"
import { ButtonProp } from '@/types/types'
const Button = ({text,onclick,classname,disabled}:ButtonProp) => {
  return (
  <button className={classname ? classname : styles.button} onClick={onclick}
  
disabled={disabled}
  >
{text}
  </button>
  )
}

export default Button
