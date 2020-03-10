<template>
    <div class="mask" v-if="isShow">
      <div class="container">
        <div class="contentGroup">
          <div class="title">{{title}}</div>
          <div class="content">{{content}}</div>
        </div>
        <div class="buttonGroup lineBorderBefore">
          <div v-if="showCancel" class="cancel lineBorderRight" :style="'color: ' + cancelColor + ';'" @click.prevent.stop="cancelClick">{{cancelText}}</div>
          <div class="confirm" :style="'color: ' + confirmColor + ';'" @click.prevent.stop="confirmClick">{{confirmText}}</div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'wxModal',
  data () {
    return {
      isShow: false,
      title: '提示',
      content: '点击确认',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000',
      confirmText: '确认',
      confirmColor: '#ff6a0b',
      cancelCallback: null,
      confirmCallback: null
    }
  },
  methods: {
    showModal (obj) {
      let that = this
      that.isShow = true
      if (obj) {
        that.title = obj.title
        that.content = obj.content
        that.showCancel = obj.showCancel === undefined || obj.showCancel === true
        that.cancelText = obj.cancelText || that.cancelText
        that.cancelColor = obj.cancelColor || that.cancelColor
        that.confirmText = obj.confirmText || that.confirmText
        that.confirmColor = obj.confirmColor || that.confirmColor
        if (that.showCancel) {
          that.cancelCallback = obj.cancelClick
        }
        that.confirmCallback = obj.confirmClick
      }
    },
    cancelClick (callback) {
      let that = this
      that.isShow = false
      that.cancelCallback && that.cancelCallback()
    },
    confirmClick (callback) {
      let that = this
      that.isShow = false
      that.confirmCallback && that.confirmCallback()
    }
  }
}
</script>

<style scoped>
  .mask{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1001;
  }
  .container{
    width: 300px;
    height: auto;
    background-color: #fff;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    background-clip: padding-box;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding-top: 10px;
  }
  .contentGroup{
    padding: 0 15px;
    text-align: center;
  }
  .title{
    font-size: 0.3rem;
  }
  .content{
    font-size: 0.27rem;
    color: rgb(153,153,153);
    padding: 0.2rem 0;
  }
  .buttonGroup{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 39px;
    /*border-top: 1px solid rgb(229,229,230);*/
    overflow: hidden;
    position: relative;
  }
  .cancel{
    color: #000;
    width: 50%;
    text-align: center;
    height: 40px;
    line-height: 40px;
    position: relative;
  }
  .confirm{
    color: #ff6a0b;
    text-align: center;
    flex: 1;
    height: 40px;
    line-height: 40px;
  }

</style>
