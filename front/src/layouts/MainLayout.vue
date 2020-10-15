<template>
    <div v-if="isAuth && user.allow && !user.ban">
        <Header />
        <Nav />
        <main>
            <router-view />
        </main>
    </div>
    <div v-else>
        <h1 v-if="!isAuth" class="notauth">Вы не прошли авторизацию!
            <router-link to="/signin">Нажмите для авторизации</router-link>
        </h1>
        <h1 v-else-if="!user.allow" class="notauth">Ваш аккаунт еще не подтвердили, ожидайте!
        </h1>
        <h1 v-else class="notauth">Ваш аккаунт был заблокирован!
        </h1>
    </div>
</template>

<script>
import Header from '../components/app/Header'
import Nav from '../components/app/Nav'
export default {
    name: 'main-layout',
    components: {
        Header,
        Nav
    },
    computed: {
        isAuth() {
            return this.$store.state.auth.isAuth
        },
        user() {
            return this.$store.state.auth.newuser.user
        }
    }
    
}
</script>

<style lang="scss">
    .notauth {
        text-align: center;
        font-size: 16px;
        margin-top: 200px;
    }
</style>