import React, { useEffect, useState } from 'react'
import Add from '../components/Add'
import { deleteUserAPI, updateUserAPI, userDetailsGetAPI } from '../services/allAPI'
import { Link } from 'react-router-dom'


const Home = () => {

  // state for holding data from api called
  const [users, setUsers] = useState([])


  useEffect(() => {
    getuserdetails()
  }, [])

  // getuserdetails
  const getuserdetails = async () => {
    try {
      const response = await userDetailsGetAPI()
      // console.log(response);
      setUsers(response.data)
      getuserdetails()
    } catch (error) {
      console.log(error);

    }
  }
  // console.log(users);

  // deleteUser
  const deleteUser = async (id) => {
    await deleteUserAPI(id)
    getuserdetails()
  }




  return (
    <div style={{ paddingTop: "70px" }}>
      <div className='p-5 container'><Add /></div>
      <>
        {users.length > 0 ?
          <table className='container-fluid bg-light  table shadow pt-5'>
            <thead className=''>
              <td className="fw-bold py-3 ps-2 text-dark">#</td>
              <td className="fw-bold py-3 ps-2 text-dark">ID</td>
              <td className="fw-bold py-3 ps-2 text-dark">Name</td>
              <td className="fw-bold py-3 ps-2 text-dark">Email</td>
              <td className="fw-bold py-3 ps-2 text-dark">Status</td>
              <td className="fw-bold py-3 ps-2 text-dark">...</td>
            </thead>
            {users.length > 0 &&
              users?.map((eUser, index) => (
                <tbody key={users?.id} className='pt-5'>
                  <td className="text-dark pt-5 ps-2">{index + 1}</td>
                  <td className="text-dark pt-5 ps-2">{eUser?.uID}</td>
                  <td className="text-dark pt-5 ps-2">{eUser?.uName}</td>
                  <td className="text-dark pt-5 ps-2">{eUser?.email}</td>
                  <td className="text-dark pt-5 ps-2">{eUser?.status}</td>
                  <td className="text-dark pt-5">
                    <Link className='bg-transparent' to={`/${eUser?.id}/edit`}><button className='p-1 me-2 btn rounded text-center fw-bold bg-warning text-light'><i class="fa-solid fa-pen-to-square"></i></button></Link>
                    <button onClick={() => deleteUser(eUser?.id)} className='p-1 btn rounded text-center fw-bold bg-danger text-light '><i class="fa-solid fa-trash"></i></button>
                  </td>
                </tbody>
              ))
            }
          </table>
          :
          <div className='fs-1  fw-bolder text-danger d-flex justify-content-center align-items-center'>No Users To Display!!!</div>

        }
      </>
    </div>
  )
}

export default Home