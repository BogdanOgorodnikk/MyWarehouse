<template>
    <div class="product-table">
        <div class="container">
            <h2 class="product-table__headline">Товар на складе</h2>
            <form v-if="editOpen" class="product-table__update" @submit.prevent="updateProduct">
                <h3 class="product-table__update--headline">Редактирование товара</h3>
                <input type="text" class="input product-table__update--input" placeholder="Название" v-model="title">
                <input type="text" class="input product-table__update--input" placeholder="Характеристика" v-model="characteristic">
                <input type="text" class="input product-table__update--input" placeholder="Количество" v-model="count">
                <input type="text" class="input product-table__update--input" placeholder="Цена" v-model="price">
                <input type="submit" class="button product-table__update--button" value="Изменить">
            </form>
            <div class="product-table__box">
                <div class="product-table__item" v-for="product in products" :key="product.id">
                    <h3 class="product-table__item--text"><span class="product-table__item--span">Название:</span> <span>{{product.title}}</span></h3>
                    <h3 class="product-table__item--text product-table__item--text-character"><span class="product-table__item--span">Характеристика:</span> <span>{{product.characteristic}}</span></h3>
                    <h3 class="product-table__item--text"><span class="product-table__item--span">Количество:</span> <span>{{product.count}}</span></h3>
                    <h3 class="product-table__item--text"><span class="product-table__item--span">Цена:</span> <span>{{product.price}}</span></h3>
                    <h3 class="product-table__item--order" @click.prevent="openModal(product.id, product.title, product.characteristic, product.price, product.count)">Заказать</h3>
                    <h3 v-if="user.isAdmin" class="product-table__item--edit edit" @click.prevent="editProduct(product.id, product.title, product.characteristic, product.price, product.count)">Изменить</h3>
                    <h3 v-if="user.isAdmin" class="product-table__item--delete delete" @click.prevent="deleteProduct(product.id)">Удалить</h3>
                </div>
            </div>
        </div>
        <ModalProduct v-if="isOpen" 
        :isOpen="isOpen" 
        @Cancel="ChangeIsOpen" 
        :title="title" 
        :price="price" 
        :number="count" 
        :characteristic="characteristic"
        :id="id" />
    </div>
</template>

<script>
import ModalProduct from '../components/ModalProduct'
import axios from 'axios'

export default {
    data: () => ({
        products: [],
        id: '',
        title: '',
        characteristic: '',
        count: '',
        price: '',
        warehouse_id: '',
        isOpen: false,
        editOpen: false
    }),   
    mounted() {
        this.getProducts()
    },
    methods: {
        ChangeIsOpen(data) {
            this.isOpen = data
            this.getProducts()
        },
        async getProducts() {
            try {   
                const result = await axios.get(`/api/products/${this.$route.params.url}`)
                this.products = result.data
            } catch (e) {
                alert('Сбой в системе')
            }
        },
        openModal(id, title, characteristic, price, count) {
            this.isOpen = !this.isOpen
            this.id = id
            this.title = title
            this.characteristic = characteristic
            this.price = price
            this.count = count
        },
        editProduct(id, title, characteristic, price, count) {
            this.id = id
            this.title = title
            this.characteristic = characteristic
            this.price = price
            this.count = count
            this.editOpen = !this.editOpen
        },
        async updateProduct() {
            const formData = {
                id: this.id,
                title: this.title,
                count: this.count,
                characteristic: this.characteristic,
                price: this.price
            }

            try {
                await this.$store.dispatch('updateProduct',formData)
                this.title = '',
                this.count = '',
                this.characteristic = '',
                this.price = ''
                this.editOpen = !this.editOpen
                this.getProducts()
            } catch (e) {
                alert('Произошел сбой')
            }
        },
        async deleteProduct(id) {
            if(this.$store.state.auth.newuser.user.isAdmin) {
                try {
                    await axios.delete(`/api/product/${id}`)
                    this.getProducts()
                }
                catch (e) {
                    alert('Данный елемент не найден')
                }
            }
        }
    },
    computed: {
        user() {
            return this.$store.state.auth.newuser.user
        }
    },
    components: {
        ModalProduct
    }
}
</script>

<style lang="scss" scoped>
    .product-table__headline {
        text-align: center;
        margin-bottom: 20px;
        margin-top: 20px;
    }
    .product-table__update {
        margin-bottom: 20px;
    }
    .product-table__update--headline {
        margin-bottom: 10px;
    }
    .product-table__update--input {
        margin-right: 15px;
    }
    .product-table__box {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 30px;
    }
    .product-table__item {
        width: 300px;
        margin: 10px;
        border: 4px solid #1dabb8;
        border-radius: 4px;
    }
    .product-table__item--text {
        padding: 5px;
        border-top: 2px solid #1dabb8;
        font-weight: 400;
        font-size: 16px;
    }
    .product-table__item--text-character {
        height: 48px;
        overflow: hidden;
    }
    .product-table__item--span {
        font-weight: 700;
    }
    .product-table__item--order {
        padding: 5px;
        font-weight: 400;
        font-size: 16px;
        border-top: 2px solid #1dabb8;
        background: #00a814;
        cursor: pointer;
        &:hover {
            color: #fff;
        }
    }
    .product-table__item--edit, .product-table__item--delete {
        padding: 5px;
        font-weight: 400;
        font-size: 16px;
    }
</style>