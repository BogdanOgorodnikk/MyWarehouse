import axios from 'axios'

export default {
    mutations: {
        LOGOUT(state) {
            localStorage.removeItem('token')
            state.newuser = {}
            state.isAuth = false
        }
    },
    actions: {
        async updateaccount({commit},{id, email, password, name, phone}) {
            try {
                const response = await axios.put(`/api/useredit/${id}`,{
                     email,
                     password,
                     name,
                     phone
                 })
                 commit('LOGOUT')
             } catch (e) {
                 commit('setError', e)
                 throw e
             }
        },
        async updateusers({commit}, {id, isAdmin, allow, ban}) {
            try {
                const response = await axios.put(`/api/allusers/${id}`, {
                    isAdmin,
                    allow,
                    ban
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}