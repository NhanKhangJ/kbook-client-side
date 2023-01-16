import { Copyright } from '@mui/icons-material'
import { Link, Typography } from '@mui/material'
import React from 'react'

const CopyRight = () => {
  return (
    <div>
     <div style={{display:'flex', justifyContent:'space-around', margin:'2rem'}}>
        <Link href='https://github.com/NhanKhangJ' target="_blank"  underline='hover'>
            GitHub
        </Link>
        <Link href='https://www.linkedin.com/in/nhan-khang-le-6905b4228/' target="_blank" underline='hover'>
            Linkedn
        </Link>
        <Link href='https://nhankhangleportfolio.onrender.com/' target="_blank" underline='hover'>
            Portfolio
        </Link>
     </div>
     <div style={{display:'flex' ,justifyContent:'center', alignItems:'center'}}>
        <Typography variant='subtitle2'>
          Nhan Khang Le <Copyright fontSize='sm' /> 2023
        </Typography>
     </div>
    </div>
  )
}

export default CopyRight