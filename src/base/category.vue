<template>
    <div class="category-main">
      <div class="category-wrapper">
        <div class="category" ref="category">
          <div :class="'category-item '+ (nowActive === index ? 'active': '')" v-for="(item, index) in category" :key="index" @click="clickCategory(item, index)">
            <span>{{item.tname || item}}</span>
          </div>
        </div>
        <div v-if="openPanel" class="category-switch" @click="showPanel">
          <img src="../common/img/down.png"/>
        </div>
      </div>
      <div :class="'panel-wrapper ' + (isShowPanel?'ani':'')">
        <div class="panel">
          <div :class="'panel-item '+ (nowActive === index ? 'active': '')" v-for="(item, index) in category" :key="index" @click="clickCategory(item, index)">
            <span>{{item.tname}}</span>
          </div>
        </div>
        <img @click="showPanel" class="icon-up" src="../common/img/up.png"/>
      </div>
    </div>
</template>

<script>
export default {
  name: 'category',
  props: {
    category: {
      type: Array,
      default: function () {
        return []
      }
    },
    openPanel: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      nowActive: 0,
      isShowPanel: false
    }
  },
  methods: {
    showPanel () {
      this.isShowPanel = !this.isShowPanel
    },
    clickCategory (data, index) {
      this.nowActive = index
      if (this.isShowPanel) {
        this.isShowPanel = false
      }
      if (!index) {
        // 首页
        this.setScroll(0)
        this.$emit('clickCategory')
      } else {
        let offsetLeft = document.getElementsByClassName('category-item')[index - 1].offsetLeft + 25
        this.setScroll(offsetLeft)
        this.$emit('clickCategory', data)
      }
    },
    setScroll (endP) {
      let scrollLeft = document.getElementsByClassName('category')[0].scrollLeft || 0
      let millis = 0
      if (endP > scrollLeft) {
        for (let i = scrollLeft; i <= endP; i += 10) {
          i = i > endP ? endP : i
          this.setAni(i, millis)
          millis++
        }
      } else {
        // 回滚
        for (let i = scrollLeft; i >= 0; i -= 10) {
          i = i < 0 ? 0 : i
          this.setAni(i, millis)
          millis++
        }
      }
    },
    setAni (left, millis) {
      setTimeout(() => {
        this.$refs.category.scrollTo(left, 100)
      }, 10 * millis) // 不加10 * millis，他们是一起出来的，因为他把每循环当成一个函数放到队列里了，然后时间都是1000，所以一起出来的。
    }
  }
}
</script>

<style scoped lang="scss">
  .category-main{
    width: 100%;
    height: .83rem;
    background: #fff;
    position: fixed;
    top: 0.88rem;
    z-index: 1001;
  }
  .category-wrapper{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding-left: 0.48rem;
    position: relative;
    background: #fff;
  }
  .category{
    display: flex;
    overflow-x: scroll;
    white-space: nowrap;
    align-items: center;
    height: 100%;
    width: 90%;
    transition: all 1s;
    .category-item{
      /*min-width: 0.641rem;*/
      text-align: center;
      margin-right: 0.75rem;
      display: inline-block;
      font-size: 0.28rem;
      padding: 0.15rem 0;
      -webkit-box-sizing: content-box;
      -moz-box-sizing: content-box;
      box-sizing: content-box;
      color: #757575;
    }
    .active{
      color: #fb7299;
      border-bottom: .04rem solid #fb7299;
    }
  }
  .category-switch{
    padding: 0.15rem 0.2rem 0.2rem;
    img{
      width: 0.4rem;
      height: 0.4rem;
      display: block;
    }
  }
  .panel{
    display: flex;
    flex-wrap: wrap;
    padding-top: 0.15rem;
    .panel-item{
      width: 20%;
      height: 0.6rem;
      line-height: 0.6rem;
      text-align: center;
      color: #757575;
      font-size: 0.28rem;
      padding: 0.15rem 0;
    }
    .active{
      color: #fb7299;
      border-bottom: .04rem solid #fb7299;
    }
  }
  .panel-wrapper{
    position: relative;
    transform: translateY(-8rem);
    transition: transform .4s;
    z-index: 2;
    background: #fff;
    top: -.83rem;
  }
  .icon-up{
    padding: .15rem 0;
    margin: 0 auto;
    width: 0.35rem;
    height: 0.35rem;
    display: block;
  }
  .ani{
    transform: translateY(0);
  }
</style>
