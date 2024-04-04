import axios from 'axios'

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
    throw Error('error')
  }

  return userData
}

function signOut(user) {
  localStorage.removeItem('userInfo')
  user.value = {
    id: '',
    token: '',
    isLogin: false,
    isAdmin: false
  }
}

const authSerVices = {
  signIn,
  signOut
}

export default authSerVices
