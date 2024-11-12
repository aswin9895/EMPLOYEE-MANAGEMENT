import commonAPI from "./commonAPI"
import SERVER_URL from "./SERVER_URL"

// upload userdetails called by add component
export const userDetailsAddAPI =async (user) => {
    return await commonAPI("POST",`${SERVER_URL}/allUsers`,user)
}

// get userdetails on home
export const userDetailsGetAPI =async () => {
    return await commonAPI("GET",`${SERVER_URL}/allUsers`,"")
}

// delete user call by home
export const deleteUserAPI = async (id) => {
    return await commonAPI("DELETE",`${SERVER_URL}/allUsers/${id}`,{})  
}

// delete user call by home
export const updateUserAPI = async (id,updatedUserDetails) => {
    return await commonAPI("PUT",`${SERVER_URL}/allUsers/${id}`,updatedUserDetails)  
}

// getSingleUserAPI called by edit 
export const getSingleUserAPI =async (id) => {
    return await commonAPI("GET",`${SERVER_URL}/allUsers/${id}`,"")
}