<template>
    <div class="setting-box">
        <div class="opera-left">
            <div v-for="(item, index) in opera" :key="index"
            @click="clickOpera(index)"
            :class="'opera-left-item ' + (activeIndex === index ? 'active' : '')">{{item}}</div>
        </div>
        <div class="opera-panel">
            <div class="used-phrase phrase" v-show="activeIndex === 0">
                <div class="used-phrase-item" v-for="(item, index) in usedPhrase" :key="index" @click="setContent(item)">{{item}}</div>
            </div>
            <div class="font-size-color-panel" v-show="activeIndex === 1">
                <div class="color-panel font-size-color-panel-item">
                    <div class="color-item" v-for="(item, index) in color" :key="index" :style="getStyle(item)" @click="setColor(item)"></div>
                </div>
                <div class="font-size-panel font-size-color-panel-item">
                    <div class="font-size-item" v-for="(item, index) in fontSize" :key="index" :style="getFontSize(item.size)" @click="setSize(item)">{{item.title}}</div>
                </div>
            </div>
            <div class="history-panel phrase" v-show="activeIndex === 2">
                <div class="used-phrase-item" v-for="(item, index) in historyDm" :key="index" @click="setHistory(item)">{{item.dm}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      opera: ['常用语', '字体', '历史'],
      color: ['#FF0000', '#FF6600', '#FFCC00', '#44BB44', '#0066FF', '#0000FF', '#9900FF', '#BB8C44'],
      fontSize: [
        {
          title: '小',
          size: 14
        },
        {
          title: '中',
          size: 16
        },
        {
          title: '大',
          size: 18
        }
      ],
      activeIndex: 0,
      usedPhrase: ['弹幕护体', '请收下我的膝盖', '前方高能预警', '非战斗人员请撤离', 'QAQ画质感人'],
      historyPanel: ['前方高能预警']
    }
  },
  computed: mapState([
    'historyDm'
  ]),
  methods: {
    setColor (color) {
      this.$emit('setColor', color)
    },
    setSize (fontsize) {
      this.$emit('setSize', fontsize.size)
    },
    setContent (content) {
      this.$emit('setContent', content)
    },
    setHistory (history) {
      this.$emit('setHistory', history)
    },
    clickOpera (index) {
      this.activeIndex = index
    },
    getStyle (color) {
      return `background: ${color};`
    },
    getFontSize (fontSize) {
      return `font-size: ${fontSize}px;`
    }
  }
}
</script>
<style scoped lang="scss">
    .setting-box{
        border-radius: 5px;
        float: right;
        margin-top: 0.3rem;
        margin-right: .3rem;
        display: flex;
        // align-items: center;
        color: #fff;
        background: rgba(58, 68, 69, 0.5);
    }
    .opera-left{
        font-size: .26rem;
    }
    .opera-left-item{
        height: .6rem;
        line-height: .6rem;
        padding: .15rem;
    }
    .active{
        background: rgba(58, 68, 69, 0.7);
    }
    .opera-panel{
        padding: 0 .15rem;
        min-width: 2.5rem;
        background: rgba(58, 68, 69, 0.5);
        .font-size-panel{
            margin-top: .3rem;
        }
        .font-size-color-panel{
            margin-top: .6rem;
        }
        .font-size-color-panel-item{
            display: flex;
            .color-item{
                width: 15px;
                height: 15px;
            }
            .font-size-item{
                flex: 1;
            }
        }
    }
    .used-phrase-item{
        height: .65rem;
        line-height: .65rem;
        font-size: .22rem;
        border-bottom: 1px solid #9e9b9b;
    }
    .phrase{
        overflow-y: scroll;
        max-height: 2.7rem;
    }
</style>
