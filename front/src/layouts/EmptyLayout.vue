<template>
    <div>
        <EmptyHeader />
        <main>
            <router-view />
        </main>
    </div>
</template>

<script>
import EmptyHeader from '../components/app/EmptyHeader'
export default {
    name: 'empty-layout',
    components: {
        EmptyHeader
    }
}
</script>