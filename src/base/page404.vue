<template>
    <div class="page-404">
      <img class="img" src="../common/img/404.png"/>
      <button class="back" @click="back">返回上一页</button>
    </div>
</template>

<script>
export default {
  name: 'page404',
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="scss">
  .page-404{
    height: 100%;
    background: #fff;
    img{
      width: 100%;
    }
    .back{
      display: inline-block;
      line-height: 35px;
      vertical-align: middle;
      text-align: center;
      background: #00a1d6;
      color: #fff;
      border-radius: 4px;
      font-size: 14px;
      transition: 0.2s;
      cursor: pointer;
      padding: 0 15px;
      float: none;
      border: none;
      margin: 0 auto;
      position: absolute;
      top: 25%;
      left: 50%;
      transform: translateX(-50%);
    }
    button{outline: none;} // 去掉点击按钮出现的黄边
  }
</style>
