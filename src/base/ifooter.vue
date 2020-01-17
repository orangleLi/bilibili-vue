<template>
    <div class="ifooter">
      <div class="footer" v-for="(item, index) in tabBar" :key="index" @click="Nav(item.pagePath)">
        <img v-if="item.text === active" :src="item.selectedIconPath"/>
        <img v-else :src="item.iconPath"/>
        <span :class="item.text === active ? 'active' : ''">{{item.text}}</span>
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
          iconPath: require('@/common/img/icon_index.png'),
          selectedIconPath: require('@/common/img/icon_index_s.png')
        },
        {
          pagePath: '/Channel',
          text: '频道',
          iconPath: require('@/common/img/icon_menu.png'),
          selectedIconPath: require('@/common/img/icon_menu_s.png')
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
    height: 1rem;
    bottom: 0;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    .footer{
      flex: 1;
      img{
        width: .5rem;
        height: .5rem;
        display: block;
        margin: 0 auto;
      }
      span{
        font-size: $size22;
        color: $color51;
        &.active{
          color: $theme;
        }
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
