<template>
    <div>
        <CreateProduct v-if="user.isAdmin" />
        <ProductTable />
    </div>
</template>

<script>
import CreateProduct from '../components/CreateProduct'
import ProductTable from '../components/ProductTable'
export default {
    name: 'Town',
    components: {
        CreateProduct,
        ProductTable,
    },
    computed: {
        user() {
            return this.$store.state.auth.newuser.user
        }
    }
}
</script>