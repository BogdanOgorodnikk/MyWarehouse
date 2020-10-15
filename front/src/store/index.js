import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import warehouse from './warehouse'
import user from './user'
import product from './product'
import order from './order'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  getters: {
    error: s => s.error
  },
  actions: {
  },
  modules: {
    auth,
    warehouse,
    user,
    product,
    order
  },
  plugins: [createPersistedState()]
})
