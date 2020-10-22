<template>
    <Loader v-if="loader" />
    <div class="container" v-else-if="user.isAdmin && !loader">
        <div class="userlist">
            <div class="general__box-head">
                <div class="general__item-head userlist__index">
                    №
                </div>
                <div class="general__item-head">
                    Логин
                </div>
                <div class="general__item-head">
                    Имя
                </div>
                <div class="general__item-head">
                    Телефон
                </div>
                <div class="general__item-head userlist__check">
                    Роль адміна
                </div>
                <div class="general__item-head userlist__check">
                    Подтв-ердить
                </div>
                <div class="general__item-head userlist__check">
                    Заблок-ировать
                </div>
            </div>
            <div class="general__box userlist__box" v-for="(todo, index) in todos.slice().reverse()" :key="todo.id">
                <div class="general__item userlist__item userlist__index">
                    {{index}}
                </div>
                <div class="general__item userlist__item">
                    {{todo.email}}
                </div>
                <div class="general__item userlist__item">
                    {{todo.name}}
                </div>
                <div class="general__item userlist__item">
                    {{todo.phone}}
                </div>
                <div class="general__item userlist__item userlist__check">
                    <input @click="updateusers(todo.id, !todo.isAdmin, todo.allow, todo.ban)" type="checkbox" class="checkbox" :checked="todo.isAdmin">
                </div>
                <div class="general__item userlist__item userlist__check">
                    <input @click="updateusers(todo.id, todo.isAdmin, !todo.allow, todo.ban)" type="checkbox" class="checkbox" :checked="todo.allow">
                </div>
                <div class="general__item userlist__item userlist__check">
                    <input @click="updateusers(todo.id, todo.isAdmin, todo.allow, !todo.ban)" type="checkbox" class="checkbox" :checked="todo.ban">
                </div>
            </div>
        </div>
    </div>
    <h1 v-else class="userlist-error">
        Произошла ошибка
    </h1>
</template>

<script>
import Loader from '@/components/app/Loader.vue'
import axios from 'axios'

export default {
    data: () =>({
        loader: true,
        todos: [],
        id: '',
        email: '',
        name: '',
        phone: '',
        isAdmin: '',
        allow: '',
        ban: ''
    }),
    mounted() {
        this.getUserList()
    },
    methods: {
        async getUserList () {
            try {   
                const result = await axios.get('/api/allusers')
                this.todos = result.data
                this.loader = false
            } catch (e) {
                alert('Сбой в системе')
            }
        },
        async updateusers(id, isAdmin, allow, ban) {
            const formData = {
                id,
                isAdmin,
                allow,
                ban
            }
            try {
                await this.$store.dispatch('updateusers', formData)
                this.getUserList()
            } catch (e) {
                alert('Ошибка')
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
    .userlist {
        margin: 30px 0px;
    }
    .userlist__box:hover {
        background: rgba(0,0,0, 0.3);
    }
    .userlist__index {
        width: 20%;
    }
    .userlist__check {
        width: 30%;
    }
    .userlist-error {
        text-align: center;
        margin-top: 50px;
        font-size: 20px;
    }
</style>