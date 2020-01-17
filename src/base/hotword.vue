<template>
    <div class="hotword-wrapper">
      <div class="hotword-box">
        <span class="title">大家都在搜</span>
        <div class="hotword">
          <div class="word" v-for="(item, index) in hotword" :key="index" @click="search(item.keyword)">{{item.keyword}}</div>
        </div>
      </div>
      <div class="history-box">
        <div class="history">
          <div class="history-item"><span class="history-title">历史纪录</span></div>
          <div class="history-item row" v-for="(item, index) in history" :key="index" @click="search(item)">
            <img src="../common/img/history.png"/>
            <span>{{item}}</span>
          </div>
          <div v-if="history.length > 0" class="history-clear" @click="clearHistory"><span>清除历史记录</span></div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'hotword',
  props: {
    hotword: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      history: []
    }
  },
  mounted () {
    let history = JSON.parse(localStorage.getItem('history')) || []
    this.history = Array.reverse(history)
  },
  methods: {
    search (val) {
      this.$emit('search', val)
    },
    clearHistory () {
      this.history = []
      localStorage.removeItem('history')
    }
  }
}
</script>

<style scoped lang="scss">
  .hotword-wrapper{
    padding-top: .32rem;
  }
  .hotword-box{
    margin-left: .25rem;
    margin-right: .07rem;
  }
  .title{
    color: #999;
    line-height: .28rem;
    font-size: .28rem;
  }
  .hotword{
    display: flex;
    flex-wrap: wrap;
    margin-bottom: .32rem;
  }
  .word{
    padding: .19rem .24rem;
    margin-top: .24rem;
    margin-right: .17rem;
    border: .02rem solid #ccc;
    border-radius: .32rem;
    font-size: .26rem;
    line-height: .26rem;
    color: #505050;
    text-align: center;
  }
  .history-box{
    border-top: .2rem solid #f4f4f4;
    padding-right: .07rem;
  }
  .history-item{
    display: flex;
    align-items: center;
    height: .88rem;
    margin-left: .25rem;
    &:nth-of-type(1) {
      border: none;
    }
    img{
      width: .32rem;
      height: .32rem;
      display: block;
      margin-right: .18rem;
    }
    span{
      width: 5.61rem;
      overflow: hidden;
      font-size: .28rem;
      line-height: .88rem;
      color: #505050;
      text-align: left;
    }
    .history-title{
      color: #999;
    }
  }
  .history-clear{
    text-align: center;
    color: #999;
    font-size: .28rem;
    line-height: .92rem;
    height: .88rem;
    margin-left: 0;
  }
</style>
