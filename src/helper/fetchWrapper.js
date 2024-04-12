import axios from 'axios'
import { useAuthStore } from '@/stores'

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE')
}

function request(method) {
  return (url, body) => {
    const requestOptions = {
      method,
      headers: authHeader(url)
    }
    if (body) {
      requestOptions.headers['Content-Type'] = 'application/json'
      requestOptions.data = body
    }
    return axios(url, requestOptions).then(handleResponse).catch(handleError)
  }
}

// helper functions

function authHeader(url) {
  // return auth header with jwt if user is logged in and request is to the api url
  const { user } = useAuthStore()
  const isLoggedIn = !!user?.token
  const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL)
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${user.token}` }
  } else {
    return {}
  }
}

function handleResponse(response) {
  const data = response.data
  if (!response.status || response.status < 200 || response.status >= 300) {
    const { user, logout } = useAuthStore()
    if ([401, 403].includes(response.status) && user) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      logout()
    }
    const error = (data && data.message) || response.statusText
    return Promise.reject(error)
  }
  return data
}

function handleError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return Promise.reject(error.response.data || error.response.statusText)
  } else if (error.request) {
    // The request was made but no response was received
    return Promise.reject('No response received')
  } else {
    // Something happened in setting up the request that triggered an Error
    return Promise.reject(error.message || 'Request failed')
  }
}
