import axios from 'axios'

const API = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const verifyToken = async (idToken, phone) => {
  return await API.post('/auth/verify-token', { idToken, phone })
}

export const registerUser = async (userData) => {
  return await API.post('/auth/register', userData)
}