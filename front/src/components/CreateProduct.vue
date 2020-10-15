<template>
    <div class="create-product">
        <div class="container">
            <h3 class="create-product__headline">Создать продукт</h3>
            <form class="create-product__form" @submit="createProduct">
                <input type="text" class="input create-product__input" placeholder="Название"
                v-model="title"
                :class="{invalid: $v.title.$dirty && !$v.title.required}"
                >
                <input type="text" class="input create-product__input" placeholder="Количество"
                v-model="count"
                :class="{invalid: $v.count.$dirty && !$v.count.minValue}"
                >
                <input type="text" class="input create-product__input" placeholder="Характеристика"
                v-model="characteristic"
                :class="{invalid: $v.characteristic.$dirty && !$v.characteristic.required}"
                >
                <input type="text" class="input create-product__input" placeholder="Цена"
                v-model="price"
                :class="{invalid: $v.price.$dirty && !$v.price.minValue}"
                >
                <button type="submit" class="button create-product__button">Создать</button>
            </form>
        </div>
    </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'
export default {
    data: () => ({
        title: '',
        count: '',
        characteristic: '',
        price: ''
    }),
    validations: {
        title: {required},
        count: {minValue: minValue(1)},
        characteristic: {required},
        price: {minValue: minValue(1)}
    },
    methods: {
        async createProduct() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            const formData = {
                id: this.$route.params.url,
                title: this.title,
                count: this.count,
                characteristic: this.characteristic,
                price: this.price
            }
            try {
                await this.$store.dispatch('createProduct',formData)
                this.title = '',
                this.count = '',
                this.characteristic = '',
                this.price = ''
            } catch (e) {
                alert('Произошел сбой')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .create-product {
        margin: 30px 0px;
    }
    .create-product__input {
        margin-left: 15px;
        &:first-child {
            margin-left: 0px;
        }
    }
    .create-product__button {
        margin-left: 15px;
    }
    .create-product__headline {
        margin-bottom: 15px;
        font-size: 20px;
    }
</style>