import React, { useEffect, useState } from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { getSingleUserAPI, updateUserAPI, userDetailsGetAPI } from '../services/allAPI';
import { useNavigate, useParams } from 'react-router-dom';


const Edit = () => {

    const { uid } = useParams()
    // console.log(uid);
    const navigate = useNavigate()
    const [user, setuser] = useState({
        uID: "", uName: "", email: "", status: "Active"
    })

    const [unameInvalid, setUnameInvalid] = useState(false)
    const [emailInvalid, setEmailInvalid] = useState(false)



    // fetch user based on id when loading page
    useEffect(() => {
        fetchuser()
    }, [])

    // fetch user
    const fetchuser = async () => {
        try {
            const response = await getSingleUserAPI(uid)
            const fetchedUser = response.data
            console.log(fetchedUser);
            if (fetchedUser) {
                if (fetchedUser.id == uid) {
                    setuser({
                        uID: fetchedUser.uID,
                        uName: fetchedUser.uName || "",
                        email: fetchedUser.email || "",
                        status: fetchedUser.status === 'Inactive' ? 'Inactive' : 'Active',
                    })
                }
            }
        } catch (error) {
            console.log(error);
        }
    }


    const usernameValidation = (inputTag) => {
        const { name, value } = inputTag
        setuser({ ...user, uName: value })
        if (user.uName) {
            !!value.match(/^[A-Za-zÀ-ÿ'.-]+(?: [A-Za-zÀ-ÿ'.-]+)*$/) ? setUnameInvalid(false) : setUnameInvalid(true)
        }
    }
    const emailValidation = async (inputTag) => {
        const { name, value } = inputTag
        setuser({ ...user, email: value })
        if (user.email) {
            !!value.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/) ? setEmailInvalid(false) : setEmailInvalid(true)
        }
    }
    const statusValidation = (inputTag) => {
        const { name, value } = inputTag
        setuser({ ...user, status: value })

    }

    // handleSubmit   
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { uName, email } = user;
        // Basic form validation
        if (uName && email) {
            try {
                await updateUserAPI(uid, user);
                alert('Employee updated successfully!');
                navigate('/');
                // await userDetailsGetAPI()
            } catch (err) {
                alert('Error updating employee');
                console.error('Error:', err);
            }
        } else {
            alert('Please fill out all required fields');
        }
    };

    // handleCancel
    const handleCancel = () => {
        navigate('/');
    }

    return (
        <div style={{ paddingTop: "100px" }} className=''>
            <>
                <div style={{ height: "85vh" }} className='container d-flex justify-content-center align-items-center flex-column'>
                    <div style={{ width: "500px" }} className='border p-5 rounded bg-secondary'>

                        {/* username */}
                        <FloatingLabel className='mt-2 w-100' controlId="floatingUsername" label="UserName">
                            <Form.Control onChange={e => usernameValidation(e.target)} value={user?.uName} name='userName' type="text" placeholder="UserName" />
                        </FloatingLabel>
                        {unameInvalid && <div className='fw-bolder text-danger'>*Invalid UserName</div>}

                        {/* email */}
                        <FloatingLabel className='mt-2 w-100' controlId="floatingEmail" label="Email">
                            <Form.Control onChange={e => emailValidation(e.target)} value={user?.email} name='email' type="text" placeholder="Email" />
                        </FloatingLabel>
                        {emailInvalid && <div className='fw-bolder text-danger'>*Invalid Email</div>}
                        {/* {existingEmail && <div className='fw-bolder text-danger'>*User with same EmailId alredy exists!!!</div>} */}

                        {/* status dropdown */}
                        <select onChange={e => statusValidation(e.target)} value={user?.status} className='mt-2 w-100 text-center p-3 rounded' name="status" id="">
                            <option selected hidden disabled>Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        <div className='mt-4 d-flex justify-content-center align-items-center'>
                            <Button onClick={handleCancel} variant="dark" className='fw-bolder me-3'>
                                Cancel
                            </Button>
                            <Button disabled={unameInvalid || emailInvalid} onClick={handleSubmit} className='fw-bolder' variant="light">Submit</Button>
                        </div>
                    </div>
                </div>
            </>
        </div>
    )
}

export default Edit