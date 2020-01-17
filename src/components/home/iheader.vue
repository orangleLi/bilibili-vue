<template>
  <div class="header">
    <img class="icon-img" src="../../common/img/menu.png"/>
    <div class="user"><img src="../../common/img/user_no_login.png"/></div>
    <div class="search">
      <img class="icon-search" src="../../common/img/icon_search.png"/>
      <div class="search-box" @click="searchClick">{{defaultWord}}</div>
    </div>
    <img class="icon-img" src="../../common/img/game.png"/>
    <img class="icon-img" src="../../common/img/download.png"/>
    <img class="icon-img" src="../../common/img/envelope.png"/>
  </div>
</template>

<script>
export default {
  name: 'iheader',
  props: {
    defaultWord: {
      type: String,
      value: ''
    }
  },
  methods: {
    searchClick () {
      this.$emit('searchClick')
    }
  }
}
</script>

<style scoped lang="scss">
  .header{
    position: fixed;
    top: 0;
    width: 100%;
    padding: 0.13rem 0;
    height: 0.62rem;
    display: flex;
    background-color: #fb7299;
    align-items: center;
    justify-content: space-between;
    z-index: 1002;
    .icon-img{
      width: 0.45rem;
      height: 0.45rem;
      display: block;
      &:nth-of-type(1) {
        margin-left: -0.1rem;
      }
      &:nth-last-of-type(1) {
        margin-right: 0.24rem;
      }
    }
    .user{
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      width: 0.7rem;
      height: 0.7rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .search{
    height: 0.48rem;
    background: rgba(230,104,141,0.5);
    border-radius: .512rem;
    margin-right: .3rem;
    padding: 0 .22rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 2.2rem;
    .search-box{
      width: 100%;
      font-size: 0.24rem;
      color: #d7bfbf;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    img{
      width: 0.25rem;
      height: 0.25rem;
      &.icon-search{
        margin-right: .08rem;
      }
      &.icon-del{
        margin-left: .08rem;
      }
    }
  }
</style>
