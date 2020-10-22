<template>
    <div class="signup">
        <div class="container">
            <h1 class="signup__headline">Регистрация</h1>
            <div v-if="err.length" class="error signup__error">{{err}}</div>
            <form class="signup__form" @submit.prevent="SignUp">
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
                <input type="password" 
                    class="input signup__input" 
                    placeholder="Подтвердите пароль"
                    v-model="confirmpassword"
                    :class="{invalid: !$v.confirmpassword.sameAsPassword}"
                >
                <small class="helper-text__invalid"
                v-if="!$v.confirmpassword.sameAsPassword"
                >
                Пароль не совпал
                </small>
                <input type="text"
                    class="input signup__input" 
                    placeholder="Имя"
                    v-model="name"
                    :class="{invalid: $v.name.$dirty && !$v.name.required}"
                >
                <small class="helper-text__invalid"
                v-if="$v.name.$dirty && !$v.name.required"
                >Введите ваше имя</small>
                <input type="text" 
                    class="input signup__input" 
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
                <button class="button signup__button" type="submit">Зарегистрироваться</button>
            </form>
            <h3 class="signup__link">
                У вас уже есть аккаунт?
                <router-link class="signup__link--in" to="/signin">Войти</router-link>
            </h3>
            <div class="opinion"></div>
        </div>
    </div>
</template>

<script>
import {email, required, minLength,sameAs} from 'vuelidate/lib/validators'
import axios from 'axios'
export default {
    name: 'SignUp',
    data: () => ({
        email: '',
        password: '',
        confirmpassword: '',
        name: '',
        phone: '',
        err: ''
    }),
    validations: {
        email: {email, required},
        password: {required, minLength: minLength(6)},
        confirmpassword: {sameAsPassword: sameAs('password')},
        name: {required},
        phone: {required, minLength: minLength(10)}
    },
    methods: {
        async SignUp() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            const formData = {
                email: this.email,
                password: this.password,
                name: this.name,
                phone: this.phone
            }

            try {
                await this.$store.dispatch('register',formData)
                this.$router.push('/signin')
            } catch (e) {
                this.err = 'Данный аккаунт занят'
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