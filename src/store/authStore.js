import { defineStore } from 'pinia'
import useLocalStorage from '../composables/useLocalStorage'
import axios from 'axios'
import { getCurrentDateTime } from '../shared/dateAndTime'

export const useAuthStore = defineStore('auth', {
  state() {
    return {
      user: useLocalStorage.read('user')
        ? useLocalStorage.read('user')
        : {
            id: '',
            token: '',
            isLogin: false,
            isAdmin: false
          },
      users: []
    }
  },
  actions: {
    async getAllUsers() {
      let users = null
      let response = await axios.get('/data/users.json', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response) {
        users = response.data
      }
      this.users = users
    },
    async getUserById(id) {
      let userById = null

      let users = this.users

      if (users) {
        let data = users.filter((user) => user.id === id)
        userById = data ? data[0] : null
      }

      return userById
    },
    async signIn(router, email, password) {
      let userData = null
      let users = this.users
      try {
        if (users) {
          let data = users.filter((user) => user.email === email && user.password === password)
          userData = data ? data[0] : null
        }

        this._storeAndSignIn(router, userData)
      } catch (error) {
        console.error(error)
        throw new Error(error.message)
      }
    },
    _storeAndSignIn(router, userData) {
      if (userData) {
        this.user = {
          id: userData.id,
          token: 'hgvbngjhbjknkbjhbbbkn',
          isLogin: true,
          isAdmin: userData.role === 'admin' ? true : false
        }
        useLocalStorage.write('user', this.user)
        router.push({ name: 'dashboard' })
      } else {
        throw new Error('Incorrect user email or password')
      }
    },
    signOut(router) {
      this.user = {
        id: '',
        token: '',
        isLogin: false,
        isAdmin: false
      }
      localStorage.removeItem('user')
      router.push({ name: 'sign_in' })
    },
    async registerUser(router, userData) {
      try {
        let users = this.users
        if (users) {
          const foundUser = users.find((obj) => obj.email === userData.email)
          if (foundUser) {
            throw new Error('Email already exists')
          }
          const maxId = users.reduce((max, obj) => (obj.id > max ? obj.id : max), users[0].id)
          let newData = {
            id: maxId,
            ...userData,
            role: 'user',
            created_at: getCurrentDateTime(),
            updated_at: getCurrentDateTime()
          }
          this.users.push(newData)
          this._storeAndSignIn(router, newData)
        }
      } catch (error) {
        throw new Error(error.message)
      }
    }
  }
})
