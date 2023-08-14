import axios from 'axios';
const API_URL = 'https://beyond-vr.herokuapp.com/auth/'

//login user
const login = async(userData)=>{
    console.log(userData);
    const response =  await axios.post(API_URL + 'login', userData)
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    console.log(response.data)
    return response.data
}
//logout
// const logout = async(userData)=>{
//     localStorage.removeItem('user')
//  }
const authService = {
    login,
    // logout
}
export default authService;