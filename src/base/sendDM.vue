<template>
    <div class="send-dm">
        <div class="opera-box" :style="'top: ' + top">
          <div class="input-box">
            <input v-model="dm" placeholder="发个友善的弹幕见证下" :style="'color: ' + this.color + ';font-size: ' + fontsize + 'px;'">
            <i class="iconfont icon-zhifeiji" @click="send"></i>
          </div>
          <setting-send-dm @setColor="setColor" @setSize="setSize" @setContent="setContent"></setting-send-dm>
        </div>
        <div :style="'top: ' + top" class="mask" @click="close"></div>
    </div>
</template>
<script>
import settingSendDm from './setting-send-dm'
export default {
  props: {
    top: {
      type: String,
      default: '0px'
    }
  },
  data () {
    return {
      dm: '',
      color: '',
      fontsize: 14
    }
  },
  methods: {
    setColor (color) {
      this.color = color
    },
    setSize (fontsize) {
      this.fontsize = fontsize
    },
    setContent (content) {
      this.dm = content
    },
    // getStyle () {
    //   return `font-size: ${this.fontsize}px; color: ${this.color};`
    // },
    close () {
      this.$emit('close')
    },
    send () {
      this.$emit('send', this.dm, this.color, this.fontsize)
      this.close()
    }
  },
  components: {settingSendDm}
}
</script>
<style lang="scss" scoped>
    .opera-box{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 2001;
        .input-box{
          background: #fff;
          padding: 0.3rem;
          display: flex;
          justify-content: space-between;
          input{
            flex: 1;
            border-radius: 5px;
            outline: none;
          }
        }
    }
    .icon-zhifeiji{
      font-size: 0.5rem;
      color: $theme;
      margin-left: 0.3rem;
    }
    .mask{
      position: fixed;
      top: 0;
      z-index: 2000;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
    }
</style>
