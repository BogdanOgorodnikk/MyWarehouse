<template>
    <Loader v-if="loader" />
    <div v-else class="container">
        <div class="order">
            <div class="general__box-head order__box">
                <div class="general__item-head order__item order__index">
                    №
                </div>
                <div class="general__item-head order__item">
                    Дата
                </div>
                <div class="general__item-head order__item">
                    Назва
                </div>
                <div class="general__item-head order__item">
                    Количество
                </div>
                <div class="general__item-head order__item">
                    Цена
                </div>
                <div class="general__item-head order__item">
                    Сумма
                </div>
                <div class="general__item-head order__item">
                    Статус
                </div>  
                <div class="general__item-head order__item">
                    Город отправителя
                </div>
                <div class="general__item-head order__item">
                    Город получателя
                </div>
                <div v-if="user.isAdmin" class="general__item-head order__item order__check">
                    Раз-реш
                </div>
                <div v-if="user.isAdmin" class="general__item-head order__item order__check">
                    Отк-аз
                </div>
            </div>
            <div class="general__box order__box" v-for="(order, index) in orders" :key="order.id">
                <div class="general__item order__item order__index">
                    {{index}}
                </div>
                <div class="general__item order__item">
                    {{order.data}}
                </div>
                <div class="general__item order__item">
                    {{order.title}}
                </div>
                <div class="general__item order__item">
                    {{order.count}}
                </div>
                <div class="general__item order__item">
                    {{order.price}}
                </div>
                <div class="general__item order__item">
                    {{order.count * order.price}}
                </div>
                <div v-if="order.status == 0" class="general__item order__item edit">
                    Ожидается 
                </div>  
                <div v-if="order.status == 1" class="general__item order__item agree">
                    Подтверждено
                </div>  
                <div v-if="order.status == 2" class="general__item order__item delete">
                    Отказано
                </div>  
                <div class="general__item order__item" v-for="town in towns" :key="town.town_id" v-if="town.id == order.warehouse_id">
                    {{town.town}}
                </div>
                <div class="general__item order__item">
                    {{order.recipient_city}}
                </div>
                <div v-if="user.isAdmin" class="general__item order__item order__check">
                    <input type="checkbox" class="checkbox" @click="updateStatus(order.id, 1, order.product_id)" :checked="order.status == 1"> 
                </div>
                <div v-if="user.isAdmin" class="general__item order__item order__check">
                    <input type="checkbox" class="checkbox" @click="updateStatus(order.id, 2, order.product_id, order.count)" :checked="order.status == 2">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from '@/components/app/Loader.vue'
import axios from 'axios'

export default {
    data: () => ({
        loader: true,
        orders: [],
        id: '',
        title: '',
        count: '',
        price: '',
        status: '',
        recipient_city: '',
        data: '',
        status: '',
        warehouse_id: '',
        towns: [],
    }),
    mounted() {
        this.getOrders()
    },
    methods: {
        async getOrders() {
            try {
                if(this.$store.state.auth.newuser.user.isAdmin) {
                    const result = await axios.get('/api/orders')                    
                    this.orders = result.data.order
                    this.towns = result.data.warehouse
                    this.loader = false
                } 
                else {
                    const result = await axios.get(`/api/orders/${this.$store.state.auth.newuser.user.id}`)                  
                    this.orders = result.data.order
                    this.towns = result.data.warehouse
                    this.loader = false
                }
            } catch (e) {
                alert('Сбой в системе')
            }
        },
        async updateStatus(id, status, product, count) {
            const formData = {
                id: id,
                status,
                product: product,
                counts: count
            }
            try  {
                await this.$store.dispatch('updateOrderStatus', formData)
                this.getOrders()
            } catch (e) {
                alert('Произошла ошибка')
            }
        }
    },
    computed: {
        user() {
            return this.$store.state.auth.newuser.user
        }
    },
    components: {
        Loader
  }
}
</script>

<style lang="scss" scoped>
    .order {
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .order__index {
        width: 20%;
    }
    .order__check {
        width: 30%;
    }
</style>