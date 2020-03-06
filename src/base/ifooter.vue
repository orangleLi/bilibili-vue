<template>
    <div class="ifooter">
      <div class="footer" v-for="(item, index) in tabBar" :key="index" :class="active === item.text ? 'active': ''" @click="Nav(item.pagePath)">
        <i class="iconfont icon" :class="item.icon"></i>
        <span>{{item.text}}</span>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ifooter',
  props: {
    active: {
      type: String,
      value: ''
    }
  },
  data () {
    return {
      tabBar: [
        {
          pagePath: '/',
          text: '主页',
          icon: 'icon-shouye'
        },
        {
          pagePath: '/Channel',
          text: '频道',
          icon: 'icon-menu1'
        }
      ]
    }
  },
  methods: {
    Nav (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped lang="scss">
  .ifooter{
    position: fixed;
    width: 100%;
    bottom: 0;
    padding: .1rem 0;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    .footer{
      flex: 1;
      font-size: $size22;
      color: $color51;
      font-weight: bold;
      .icon{
        display: block;
      }
      &.active{
        @include theme-main-color($theme-pink);
      }
    }
    &:after{
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 200%;
      border-top:1px solid #e6e6e6;
      height: 200%;
      -webkit-transform-origin: left top;
      transform-origin: left top;
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
      pointer-events: none; /* 防止点击触发 */
      box-sizing: border-box;
    }
  }
</style>
