<template>
    <div class="container" v-if="user.isAdmin">
        <form class="createwarehouse__form" @submit.prevent="CreateWarehouse">
            <input class="input createwarehouse__input"
            type="text"
            placeholder="Город"
            v-model="town"
            :class="{invalid: $v.town.$dirty && !$v.town.required}"
            >
            <small 
            class="helper-text__invalid"
            v-if="$v.town.$dirty && !$v.town.required"
            >Поле город не должно быть пустым</small>
            <input class="input createwarehouse__input"
            type="text"
            placeholder="Район"
            v-model="region"
            :class="{invalid: $v.region.$dirty && !$v.region.required}"
            >
            <small 
            class="helper-text__invalid"
            v-if="$v.region.$dirty && !$v.region.required"
            >Поле район не должно быть пустым</small>
            <input class="input createwarehouse__input"
            type="text" 
            placeholder="Цена аренды"
            v-model="rent"
            :class="{invalid: $v.rent.$dirty && !$v.rent.required}"
            >
            <small 
            class="helper-text__invalid"
            v-if="$v.rent.$dirty && !$v.rent.required"
            >Поле цены аренды не должно быть пустым</small>

            <button type="submit" class="button createwarehouse__button">
                Создать
            </button>
        </form>
    </div>
    <div v-else class="container">
        <h1 class="createwarehouse-error">Произошла ошибка</h1>
    </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
    data: () => ({
        town: '',
        region: '',
        rent: ''
    }),
    validations: {
        town: {required},
        region: {required},
        rent: {required}
    },
    methods: {
        async CreateWarehouse() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            const formData = {
                town: this.town,
                region: this.region,
                rent: this.rent
            }
            try {
                await this.$store.dispatch('createwarehouse',formData)
                this.town = '',
                this.region = '',
                this.rent = ''
            } catch (e) {
                alert('Произошла ошибка')
            }
        }
    },
    computed: {
        user() {
            return this.$store.state.auth.newuser.user
        }
    }
}
</script>

<style lang="scss" scoped>
    .createwarehouse__form {
        margin: 30px 0px;
    }
    .createwarehouse__input {
        display: block;
        margin: 15px auto;
        width: 500px;
    }
    .createwarehouse__button {
        display: block;
        margin: 12px auto 0px;
        width: 500px;
    }
    .createwarehouse-error {
        text-align: center;
        margin-top: 50px;
        font-size: 20px;
    }
</style>