<template>
    <div>
        <UsersList />
    </div>
</template>

<script>
import UsersList from '../components/UserList'
export default {
    name: 'AllUsers',
    components: {
        UsersList
    },
}
</script>