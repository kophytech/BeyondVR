import axios from 'axios';
const API_URL = 'https://beyond-vr.herokuapp.com/admin/'


// /admin/teacher/:teacherID?school=schoolID
const getStats = async (token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL);
    return response.data
}
const getSchool = async (token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'school/', config );
    return response.data
}
const getClass = async (token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'classes/', config );
    console.log(response.data)
    return response.data
}
const getCourse = async (token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'courses/', config);
    console.log(response.data)
    return response.data
}
const getStudent = async (token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'students/', config);
    console.log(response.data)
    return response.data
}

const adminService = {
    getStats, getSchool, getClass, getCourse, getStudent
}

export default adminService;