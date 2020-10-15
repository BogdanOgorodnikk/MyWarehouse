<template>
    <div class="container">
        <div class="account">
            <form class="account__form" @submit.prevent="EditAccount">
                <input type="text"
                class="input account__input" 
                placeholder="Email"
                v-model="email"
                :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
                >
                <small 
                class="helper-text__invalid"
                v-if="$v.email.$dirty && !$v.email.required"
                >Поле Email не должно быть пустым!</small>
                <small 
                class="helper-text__invalid"
                v-else-if="$v.email.$dirty && !$v.email.email"
                >Введите коректный Email!</small>
                <input type="password" 
                class="input account__input" 
                placeholder="Пароль"
                v-model="password"
                :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
                >
                <small class="helper-text__invalid"
                v-if="$v.password.$dirty && !$v.password.required"
                >Поле пароля не должно быть пустым!</small>
                <small class="helper-text__invalid"
                v-else-if="$v.password.$dirty && !$v.password.minLength"
                >Минимально количество символов {{$v.password.$params.minLength.min}} штук! Сейчас он: {{password.length}}</small>
                <input type="text" 
                class="input account__input" 
                placeholder="Имя"
                v-model="name"
                :class="{invalid: $v.name.$dirty && !$v.name.required}"
                >
                <small class="helper-text__invalid"
                v-if="$v.name.$dirty && !$v.name.required"
                >Введите ваше имя</small>
                <input type="text" 
                class="input account__input" 
                placeholder="Номер телефона"
                v-model="phone"
                :class="{invalid: ($v.phone.$dirty && !$v.phone.required) || ($v.phone.$dirty && !$v.phone.minLength)}"
                >
                <small class="helper-text__invalid"
                v-if="$v.phone.$dirty && !$v.phone.required"
                >
                    Введите ваш номер телефона
                </small>
                <small class="helper-text__invalid"
                v-else-if="$v.phone.$dirty && !$v.phone.minLength"
                >Длина номера телефона {{$v.phone.$params.minLength.min}} штук! Сейчас он: {{phone.length}}</small>

                <button class="button account__button" type="submit">Изменить</button>
            </form>
        </div>
    </div>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
export default {
    data: () => ({
        id: '',
        email: '',
        password: '',
        name: '',
        phone: ''
    }),
    validations: {
        email: {email, required},
        password: {required, minLength: minLength(6)},
        name: {required},
        phone: {required, minLength: minLength(10)}
    },
    mounted() {
        this.getAccount()
    },
    methods: {
        getAccount() {
            this.id = this.$store.state.auth.newuser.user.id
            this.email = this.$store.state.auth.newuser.user.email
            this.name = this.$store.state.auth.newuser.user.name
            this.phone = this.$store.state.auth.newuser.user.phone
        },
        async EditAccount() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            const formData = {
                id: this.id,
                email: this.email,
                password: this.password,
                name: this.name,
                phone: this.phone
            }

            try {
                await this.$store.dispatch('updateaccount',formData)
                this.$router.push('/signin')
            } catch (e) {}
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
    .account {
        margin: 30px 0px;
    }
    .account__input {
        display: block;
        margin: 15px auto;
        width: 500px;
    }
    .account__button {
        display: block;
        margin: 12px auto 0px;
        width: 500px;
    }
</style>