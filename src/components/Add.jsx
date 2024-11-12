import React, { useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { userDetailsAddAPI, userDetailsGetAPI } from '../services/allAPI';


const Add = () => {

    // modal 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // userdetails
    const [userDetails, setUserDetails] = useState({
        uID: "", uName: "", email: "", status: ""
    })
    // console.log(userDetails);

    // inputValidation
    const [uIDInvalid, setUIDInvalid] = useState(false)
    const [unameInvalid, setUnameInvalid] = useState(false)
    const [emailInvalid, setEmailInvalid] = useState(false)

    const userIDValidation = async (inputTag) => {
        const { name, value } = inputTag
        if (value) {
            setUserDetails({ ...userDetails, uID: value })
            if (userDetails.uID) {
                !!value.match(/^\d+$/) ? setUIDInvalid(false) : setUIDInvalid(true)
            }
        }
    }
    const usernameValidation = (inputTag) => {
        const { name, value } = inputTag
        setUserDetails({ ...userDetails, uName: value })
        if (userDetails.uName) {
            !!value.match(/^[A-Za-zÀ-ÿ'.-]+(?: [A-Za-zÀ-ÿ'.-]+)*$/) ? setUnameInvalid(false) : setUnameInvalid(true)
        }
    }
    const emailValidation = async (inputTag) => {
        const { name, value } = inputTag
        if (value) {
                setUserDetails({ ...userDetails, email: value })
                if (userDetails.email) {
                    !!value.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/) ? setEmailInvalid(false) : setEmailInvalid(true)
                }
            }
        }

    // submitButton
    const handleSubmit = async () => {
        const { uID, uName, email, status } = userDetails
        if (uID && uName && email && status) {
            const response = await userDetailsGetAPI()
            const data = response.data
            // console.log(data);
            const existingUser = data?.find(item => item.uID == uID)
            const existingEmail = data?.find(item => item.email == email)
            if (existingUser) {
                alert("User With Same Id Already Exists!!!")
            }else if (existingEmail) {
                alert("User With Same Email Already Exists!!!")
            }else {
                // alert("api call")
                try {
                    const response = await userDetailsAddAPI(userDetails)
                    // console.log(response.data);
                    if (response.status >= 200 && response.status < 300) {
                        handleClose()
                        setUserDetails({ ...userDetails, uID: "", uName: "", email: "", status: "" })
                        alert("User Added Successfully!!!")
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        } else {
            alert("Please fill The Details Completely!!!")
        }
    }


    return (
        <div>
            <h1 className='fw-bolder'>Add New Employee <span onClick={handleShow} className='btn fs-3 rounded-circle bg-warning'><i class="fa-solid fa-plus"></i></span></h1>

            {/* modal */}
            <Modal size='lg' centered show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header className='bg-secondary' closeButton>
                    <Modal.Title className='fw-bolder text-light'>Add New Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-secondary'>
                    {/* userId */}
                    <FloatingLabel className='mt-2' controlId="floatingUserId" label="UserId">
                        <Form.Control name='uId' onChange={e => userIDValidation(e.target)} type="text" placeholder="UserID" />
                    </FloatingLabel>
                    {uIDInvalid && <div className='fw-bolder text-danger'>*Invalid UserID</div>}
                    {/* username */}
                    <FloatingLabel className='mt-2' controlId="floatingUsername" label="UserName">
                        <Form.Control name='uName' onChange={e => usernameValidation(e.target)} type="text" placeholder="UserName" />
                    </FloatingLabel>
                    {unameInvalid && <div className='fw-bolder text-danger'>*Invalid UserName</div>}
                    {/* email */}
                    <FloatingLabel className='mt-2' controlId="floatingEmail" label="Email">
                        <Form.Control name='eMail' onChange={e => emailValidation(e.target)} type="text" placeholder="Email" />
                    </FloatingLabel>
                    {emailInvalid && <div className='fw-bolder text-danger'>*Invalid Email</div>}
                    {/* status dropdown */}
                    <select onChange={e => setUserDetails({ ...userDetails, status: e.target.value })} className='mt-2 w-100 text-center p-3 rounded' name="" id="">
                        <option selected hidden disabled value="">Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </Modal.Body>
                <Modal.Footer className='bg-secondary'>
                    <Button variant="dark" className='fw-bolder' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button disabled={uIDInvalid || unameInvalid || emailInvalid} onClick={handleSubmit} className='fw-bolder' variant="light">Submit</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Add