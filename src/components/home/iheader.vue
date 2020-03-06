<template>
  <div class="header">
    <img class="icon-img" src="../../common/img/menu.png"/>
    <div class="user"><img src="../../common/img/bilibili.png"/></div>
    <div class="search">
      <img class="icon-search" src="../../common/img/icon_search.png"/>
      <div class="search-box" @click="searchClick">{{defaultWord}}</div>
    </div>
    <i class="iconfont icon-tiaosebantubiao set-color" @click="changeTheme"></i>
    <i class="iconfont icon-lishijilu"></i>
    <i class="iconfont icon-shoucang"></i>
    <!--<img class="icon-img" src="../../common/img/download.png"/>-->
    <!--<img class="icon-img" src="../../common/img/envelope.png"/>-->
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
    },
    changeTheme () {
      this.$router.push('/Theme')
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
    @include background-main-color($theme-pink);
    /*background-color: #fb7299;*/
    align-items: center;
    justify-content: space-between;
    z-index: 1002;
    .iconfont{
      color: #fff;
      font-size: .45rem;
    }
    .icon-shoucang{
      margin-right: .15rem;
    }
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
      background: #eee;
      img{
        width: 20px;
        height: 20px;
        display: block;
        padding: 0.1rem;
      }
    }
  }
  .search{
    height: 0.48rem;
    background: #fffcfc;
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
