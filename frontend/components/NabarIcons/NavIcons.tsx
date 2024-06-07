import { NavIconProps } from '@/types/types'
import Image from 'next/image'
import React from 'react'

const NavIcons = ({src,onclick}:NavIconProps) => {
  return (
   <Image src={src} alt='icon' height={40} width={40} onClick={onclick} style={{cursor:`pointer`}}/>
  )
}

export default NavIcons
