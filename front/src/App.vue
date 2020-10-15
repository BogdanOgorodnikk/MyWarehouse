<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import MainLayout from '../src/layouts/MainLayout';
import EmptyLayout from '../src/layouts/EmptyLayout';

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout) + '-layout'
    }
  },
  components: {
    MainLayout,
    EmptyLayout
  }
  
}
</script>

<style lang="scss">
@import 'assets/style/index.css';
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
</style>