<template>
    <div class="container" v-if="user.isAdmin">
        <div class="profit">
            <div class="general__box-head profit__box-head">
                <div class="general__item-head profir__item-head profit__index">
                    №
                </div>
                <div class="general__item-head profir__item-head">
                    Назва склада
                </div>
                <div class="general__item-head profir__item-head">
                    Сумма
                </div>
            </div>
            <div class="general__box profit__box" v-for="(town, index) in towns" :key="town.id">
                <div class="general__item profir__item profit__index">
                    {{index}}
                </div>
                <div class="general__item profir__item">
                    {{town.town}}
                </div>
                <div class="general__item profir__item">
                    {{town.profit}}
                </div>
            </div>
        </div>
    </div>
    <h1 v-else class="userlist-error">
        Произошла ошибка
    </h1>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Profit',
    data: () => ({
        towns: []
    }),
    mounted() {
        this.getProfits()
    },
    methods: {
        async getProfits() {
            const result = await axios.get('/api/profits')
            this.towns = result.data[0]
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
    .profit {
        margin: 30px 0px;
    }
    .profit__index {
        width: 20%;
    }
    .userlist-error {
        text-align: center;
        margin-top: 50px;
        font-size: 20px;
    }
</style>