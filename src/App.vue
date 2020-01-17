<template>
  <div id="app">
    <keep-alive>
      <router-view :key="key"/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    key () {
      return this.$route.name ? this.$route.name + new Date() : this.$route + new Date()
    }
  }
}
</script>

<style>
html, body{
  margin: 0;
  height: 100%;
}
#app {
  background: #f4f4f4;
  height: 100%;
}
</style>
