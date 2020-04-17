<template>
    <div class="theme">
      <div class="header">
        <i class="iconfont icon-back" @click="back"></i>
        <span>主题颜色</span>
      </div>
      <div class="title">主题颜色</div>
      <div class="theme-list">
        <div class="theme-item" v-for="(item, index) in theme" :key="index" @click="changeTheme(item.name, item.color, index)">
          <div class="left">
            <div class="color-block" :style="'background: ' + item.color"></div>
            <span>{{item.text}}</span>
          </div>
          <i v-show="index === nowIndex" class="iconfont icon-duigou_huabanfuben"></i>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'theme',
  data () {
    return {
      nowIndex: 0,
      theme: [
        {
          'color': '#fb7299',
          'text': '少女粉',
          'name': 'theme-pink'
        },
        {
          'color': '#2d2d2d',
          'text': '夜间模式',
          'name': 'theme-dark'
        },
        {
          'color': '#f34336',
          'text': '姨妈红',
          'name': 'theme-red'
        },
        {
          'color': '#fdc107',
          'text': '咸蛋黄',
          'name': 'theme-yellow'
        },
        {
          'color': '#8bc24a',
          'text': '草苗绿',
          'name': 'theme-green'
        },
        {
          'color': '#2095f2',
          'text': '胖次蓝',
          'name': 'theme-blue'
        },
        {
          'color': '#9d27b4',
          'text': '基佬紫',
          'name': 'theme-purple'
        }
      ]
    }
  },
  // computed: mapState([
  //   'color'
  // ]),
  mounted () {
    let color = this.$store.state.color || this.theme[this.nowIndex]
    this.nowIndex = this.theme.findIndex((element) => (element.color === color))
  },
  methods: {
    // ...mapMutations({
    //   setColors: 'setColors'
    // }),
    back () {
      this.$router.back()
    },
    changeTheme (name, color, index) {
      this.nowIndex = index
      this.$store.commit('setColors', color)
      // this.setColors(color)
      window.document.documentElement.setAttribute('background-main-color', name)
      window.document.documentElement.setAttribute('theme-main-color', name)
      window.document.documentElement.setAttribute('theme-border-color', name)
    }
  }
}
</script>

<style scoped lang="scss">
  .header{
    height: 1rem;
    line-height: 1rem;
    font-size: .32rem;
    color: #fff;
    @include background-main-color($theme-pink);
    padding-left: .15rem;
  }
  .title{
    color: #878585;
    font-size: .26rem;
    margin: .15rem;
  }
  .theme-list{
    background: #fff;
  }
  .theme-item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .2rem 0;
    margin: 0 .15rem;
    border-bottom: .01rem solid #eee;
    .left{
      display: flex;
      span{
        font-size: .3rem;
      }
    }
    .color-block{
      width: .4rem;
      height: .4rem;
      margin-right: .15rem;
    }
    .iconfont{
      color: $theme-pink;
    }
  }
</style>
