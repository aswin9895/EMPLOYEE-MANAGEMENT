import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div style={{position:"fixed",width:"100%"}} className='d-flex justify-content-between'>
      <div  className='bg-warning w-100  p-3 '>
        <Link className='d-flex align-items-center' style={{textDecoration:"none"}} to={'/'}>
        <i className="fa-regular fa-user pe-2 fs-5 text-light fw-bolder"></i>
        <h3 className="text-light fw-bolder">Employee Management</h3>
        </Link>
      </div>
    </div>
  )
}

export default Header