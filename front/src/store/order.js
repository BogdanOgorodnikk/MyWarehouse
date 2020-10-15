import axios from 'axios'

export default {
    actions: {
        async createOrder({commit}, {warehouse, owner, product, title, count, price, recipient_city, data, number}) {
            if(count > number) {
                alert('error')
            } else {
                try {
                    const response = await axios.post(`/api/order/${warehouse}/${owner}/${product}`,{
                        title,
                        count, 
                        price, 
                        recipient_city,
                        data
                    })
                } catch (e) {
                    commit('setError', e)
                    throw e
                }
            }
        },
        async updateOrderStatus({commit}, {id, status, product, counts}) {
            try {
                const response = await axios.put(`/api/order/${id}/${product}`,{
                    status,
                    counts
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}