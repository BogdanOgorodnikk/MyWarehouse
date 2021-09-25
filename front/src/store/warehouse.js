import axios from 'axios'

export default {
    actions: {
        async createwarehouse({commit},{town, region, rent}){
            try {
               const response = await axios.post('/api/warehouse',{
                    town,
                    region,
                    rent
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updatewarehouse({commit},{id,town, region, rent}) {
            try {
                const response = await axios.put(`/api/warehouse/${id}`,{
                     town,
                     region,
                     rent
                 })
             } catch (e) {
                 commit('setError', e)
                 throw e
             }
        }
    }
}