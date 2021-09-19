import axios from 'axios'

export default {
    state: {
        newuser: {},
        isAuth: false
    },
    mutations: {
        SET_USER(state,/* payload*/) {
            // state.newuser = payload
            state.isAuth = true
        },
        LOGOUT(state) {
            localStorage.removeItem('token')
            state.newuser = {}
            state.isAuth = false
        }
    },
    actions: {
        async register({dispatch, commit},{email,password,phone,name}){
            try {
               const response = await axios.post('http://localhost:9000/api/register',{
                    email,
                    password,
                    name,
                    phone
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async login({dispatch, commit},{email,password}){
            try {
                // const response = await axios.post('http://localhost:9000/api/login',{
                //     email,
                //     password
                // })
                // localStorage.setItem('token', response.data.token)
                commit('SET_USER' /*, response.data*/)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async logout({dispatch, commit}){
            try {
                commit('LOGOUT')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async auth({commit}) {
            try {
                const response = await axios.get('http://localhost:9000/api/auth',
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
                )
                localStorage.setItem('token', response.data.token)
                commit('SET_USER', response.data)
            } catch (e) {
                localStorage.removeItem('token')
            }
        }
    }
}