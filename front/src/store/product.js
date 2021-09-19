import axios from 'axios'

export default {
    actions: {
        async createProduct({commit}, {id, title, count, characteristic, price}) {
            try {
                const response = await axios.post(`http://localhost:8081/api/product/${id}`,{
                    title,
                    count, 
                    characteristic, 
                    price
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateProduct({commit}, {id, title, count, characteristic, price}) {
            try {
                const response = await axios.put(`http://localhost:8081/api/product/${id}`,{
                    title,
                    count, 
                    characteristic, 
                    price
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateProductNumber({commit}, {id, count}) {
            try {
                const response = await axios.put(`http://localhost:8081/api/product/number/${id}`,{
                    count
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}