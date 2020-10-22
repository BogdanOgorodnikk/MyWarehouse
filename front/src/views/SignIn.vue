<template>
    <div class="signup">
        <div class="container">
            <h1 class="signup__headline">Авторизация</h1>
            <div v-if="err.length" class="error signup__error">{{err}}</div>
            <form class="signup__form" @submit.prevent="SignIn">
                <input type="text"
                class="input signup__input" 
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
                class="input signup__input" 
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

                <button class="button signup__button" type="submit">Войти</button>
            </form>
            <h3 class="signup__link">
                Ещё нету аккаунта?
                <router-link class="signup__link--in" to="/signup">Зарегистрироваться</router-link>
            </h3>
            <div class="opinion"></div>
        </div>
    </div>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
export default {
    name: 'SignIn',
    data: () => ({
        email: '',
        password: '',
        errors: '',
        err: ''
    }),
    validations: {
        email: {email, required},
        password: {required, minLength: minLength(6)}
    },
    methods: {
        async SignIn() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            const formData = {
                email: this.email,
                password: this.password
            }
            try {
                await this.$store.dispatch('login',formData)
                this.$router.push('/')
            } catch (e) {
                this.err = 'Данные введены не верно'
                setTimeout(() => this.err = '', 5000);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .signup__headline {
        text-align: center;
        margin-top: 50px;
        color: #fff;
        font-weight: 400;
    }
    .signup__form {
        margin: 50px 0px 30px;
    }
    .signup__input {
        display: block;
        margin: 15px auto;
        width: 500px;
    }
    .signup__button {
        display: block;
        margin: 12px auto 0px;
        width: 500px;
    }
    .signup__link {
        text-align: center;
        font-size: 16px;
        font-weight: 400;
    }
    .signup__link--in {
        text-decoration: none;
        color: #83d6de;
    }
    .opinion {
        position: absolute;
        background: rgba(0, 0, 0, 0.7);
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: -1;
    }
    .signup__error {
        left: 43%;
    }
</style>