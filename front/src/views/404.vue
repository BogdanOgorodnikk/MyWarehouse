<template>
    <div class="container">
        <h1 class="notfound">
            Данная страница не найдена.
            <router-link to='/'>Вернутся на главную страницу </router-link>
        </h1>
    </div>
</template>

<style lang="scss" scoped>
    .notfound {
        text-align: center;
        font-size: 16px;
        margin-top: 100px;
    }
</style>