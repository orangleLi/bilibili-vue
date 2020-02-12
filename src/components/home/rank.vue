<template>
    <div class="ranking">
      <div class="ranking-item" v-for="(item, index) in ranking" :key="index" @click="detail(item.aid, item.mid)">
        <div class="main-box">
          <img v-lazy="item.pic"/>
          <div class="play-info">
            <div class="play-info-item">
              <img src="../../common/img/play.png"/>
              <span v-html="play(item.play)"></span>
            </div>
            <div class="play-info-item">
              <img src="../../common/img/video_review.png"/>
              <span>{{item.video_review}}</span>
            </div>
          </div>
        </div>
        <div class="title" v-html="item.title"></div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'rank',
  props: {
    ranking: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    play (num) {
      return num < 10000 ? num : (num / 10000).toFixed(1) + '万'
    },
    detail (aid, mid) {
      this.$router.push({
        path: '/AV' + aid,
        query: {
          aid,
          mid
        }
      })
      // window.location.href = `https://www.bilibili.com/video/av${aid}`
    }
  }
}
</script>

<style scoped lang="scss">
  .ranking{
    display: flex;
    flex-wrap: wrap;
    padding: .15rem 0.24rem;
    overflow: hidden;
    justify-content: space-between;
    background: #fff;
    .ranking-item{
      width: 50%;
      margin-bottom: 0.32rem;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      &:nth-of-type(2n) {
        padding-left: .2rem;
      }
      .main-box{
        width: 100%;
        height: 2.12rem;
        position: relative;
        img{
          width: 100%;
          height: 100%;
          display: block;
          -webkit-border-radius: 0.12rem;
          -moz-border-radius: 0.12rem;
          border-radius: 0.12rem;
        }
        .play-info{
          position: absolute;
          width: 100%;
          display: flex;
          align-items: center;
          bottom: 5%;
          padding: 0 0.16rem;
          .play-info-item{
            display: flex;
            align-items: center;
            &:nth-of-type(2) {
              margin-left: .29rem;
            }
            img{
              width: 0.32rem;
              height: 0.32rem;
              display: block;
            }
            span{
              text-align: left;
              font-size: .22rem;
              color: #fff;
              line-height: .28rem;
              margin-left: 0.12rem;
            }
          }
        }
      }
      .title{
        margin-top: 0.1rem;
        height: 0.641rem;
        overflow: hidden;
        font-size: .26rem;
        color: #212121;
        letter-spacing: 0;
        line-height: .32rem;
        text-align: left;
        & >>> .keyword {
          font-style: normal;
        }
      }
    }
  }
</style>
