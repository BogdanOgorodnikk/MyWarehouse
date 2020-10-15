<template>
    <div class="modal-product" v-if="isOpen" @click.self="RemoveModal">
        <form class="modal-product__form" @submit.prevent="createOrder">
            <h3 class="modal-product__form--headline">Оформление заказа</h3>
            <label class="modal-product__form--label"><span class="modal-product__form--span">Название: {{title}}</span> </label>
            <label class="modal-product__form--label"><span class="modal-product__form--span">Характеристика: {{characteristic}}</span> </label>
            <label class="modal-product__form--label"><span class="modal-product__form--span">Цена: {{price}}</span> </label>
            <label class="modal-product__form--label"><span class="modal-product__form--span">Количество: </span> 
                <input type="number"
                 class="input modal-product__form--input"
                  v-model.number="count"
                  :class="{invalid: $v.count.$dirty && !$v.count.minValue}"
                  >
            </label>
            <label class="modal-product__form--label"><span class="modal-product__form--span">Город получателя: </span> 
                <input type="text"
                 class="input modal-product__form--input"
                  v-model="recipient_city"
                  :class="{invalid: $v.recipient_city.$dirty}"
                  >
            </label>
            <label class="modal-product__form--label"><span class="modal-product__form--span">Сумма: {{count * price}}</span> </label>
            <div class="modal-product__form--block">
                <button type="submit" class="button modal-produtc__form--button">Сделать заказ</button>
                <button @click="RemoveModal" class="button modal-produtc__form--button">Отмена</button>
            </div>
        </form>
    </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'

export default {
    props: ['isOpen', 'title', 'price', 'number', 'characteristic', 'id'],
    data: () => ({
        count: 1,
        recipient_city: '',
        date: new Date()
    }),
    validations: {
        count: {required, minValue: minValue(1)},
        recipient_city: {required}
    },
    methods: {
        async createOrder() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            const formData = {
                warehouse: this.$route.params.url,
                owner: this.$store.state.auth.newuser.user.id,
                product: this.id,
                title: this.title,
                count: this.count, 
                price: this.price, 
                recipient_city: this.recipient_city,
                data: this.date,
                number: this.number
            }
            const pith = {
                id: this.id,
                count: this.number - this.count
            }
            try {
                
                await this.$store.dispatch('createOrder',formData)
                await this.$store.dispatch('updateProductNumber',pith)
                this.RemoveModal()
            } catch (e) {
                alert('Произошел сбой')
            }
        },
        RemoveModal() {
            this.isOpen = !this.isOpen
            this.$emit('Cancel', this.isOpen)
        },
    }
}
</script>

<style lang="scss" scoped>
    .modal-product {
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
    }
    .modal-product__form {
        position: absolute;
        top: 38%;
        left: 38%;
        width: 350px;
        background: #fff;
        border-radius: 8px;
    }
    .modal-product__form--headline {
        text-align: center;
        margin-top: 10px;
        font-weight: 500;
    }
    .modal-product__form--label {
        display: block;
        font-weight: 400;
        font-size: 16px;
        padding: 5px;
        margin-left: 10px;
    }
    .modal-product__form--span {
        font-weight: 500;
    }
    .modal-product__form--input {
        width: 80px;
        padding: 5px;
        margin-left: 10px;
    }
    .modal-produtc__form--button {
        margin: 20px 0px 20px 20px;
    }
    .modal-product__form--block :first-child {
        margin-left: 60px;
    }
    .modal-product__form--block :last-child {
        background: #e51f1f;
    }
</style>