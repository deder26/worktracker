import axios from 'axios'
import { getCurrentDateTime } from '../shared/dateAndTime'
async function signIn(user_login_info) {
  let userData = null
  try {
    let response = await axios.get('/data/users.json', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response) {
      let data = response.data.filter(
        (user) => user.email === user_login_info.email && user.password === user_login_info.password
      )
      userData = data ? data[0] : null
    }
  } catch (error) {
    throw new Error('error')
  }

  return userData
}

function signOut(user) {
  user.value = {
    id: '',
    token: '',
    isLogin: false,
    isAdmin: false
  }
  localStorage.removeItem('userInfo')
}

async function registerUser(userData) {
  let userResponse = {
    success: true,
    msg: '',
    data: []
  }
  try {
    let response = await axios.get('/data/users.json', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response) {
      const foundUser = response.data.find((obj) => obj.email === userData.email)
      if (foundUser) {
        throw new Error('Email already exists')
      }
      const maxId = response.data.reduce(
        (max, obj) => (obj.id > max ? obj.id : max),
        response.data[0].id
      )
      let newData = {
        id: maxId,
        ...userData,
        role: 'user',
        created_at: getCurrentDateTime(),
        updated_at: getCurrentDateTime()
      }
      userResponse.data = newData
    }
  } catch (error) {
    userResponse.success = false
    userResponse.msg = error.message
  }
  return userResponse
}

const authSerVices = {
  signIn,
  signOut,
  registerUser
}

export default authSerVices
