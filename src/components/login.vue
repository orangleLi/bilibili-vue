<template>
    <div>login</div>
</template>

<script>
export default {
  name: 'login',
  created () {
    localStorage.setItem('Flag', 'isLogin')
  }
}
</script>

<style scoped>

</style>
