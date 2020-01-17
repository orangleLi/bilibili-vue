<template>
  <div class="video" @click="detail(video.aid, video.mid)">
    <div class="video-img">
      <img class="pic" :src="video.pic"/>
      <span class="duration" v-html="setDuration(video.duration)"></span>
    </div>
    <div class="video-info">
      <div class="title clamp" v-html="video.title"></div>
      <div class="play-info">
        <span class="up-name">{{video.author}}</span>
        <div class="put-date" v-if="oneself" v-html="setDate(video.pubdate)"></div>
        <div class="play">
          <div class="play-info-item">
            <img src="../../common/img/play1.png"/>
            <span v-html="play(video.play)"></span>
          </div>
          <div class="play-info-item">
            <img src="../../common/img/video_review1.png"/>
            <span v-html="play(video.video_review || video.dm)"></span>
          </div>
          <img class="menu-r" src="../../common/img/menu-r.png"/>
        </div>
        <span class="play-large" v-if="video.play > 500000 && !oneself">播放量较多</span>
      </div>
    </div>
  </div>
</template>

<script>
import {dataTrans, play, setDuration} from '../../common/js/util'

export default {
  name: 'i-video',
  props: {
    video: {
      type: Object,
      default: function () {
        return {}
      }
    },
    oneself: {
      type: Boolean,
      default: false
    },
    column: {
      type: Number,
      default: 1
    }
  },
  mounted () {
  },
  methods: {
    play (num) {
      return play(num)
    },
    setDate (timestamp) {
      return dataTrans(timestamp) + '投递'
    },
    setDuration (duration) {
      return setDuration(duration)
    },
    detail (aid, mid) {
      this.$router.push({
        path: '/Detail/AV' + aid,
        query: {
          aid,
          mid
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .video{
    display: flex;
    padding: .2rem 0;
    height: 1.8rem;
    position: relative;
    .video-img{
      position: relative;
      .pic{
        width: 2.8rem;
        height: 100%;
      }
      .duration{
        position: absolute;
        color: #fff;
        font-size: $size22;
        bottom: .08rem;
        right: .08rem;
      }
    }
    .video-info{
      margin-left: .2rem;
      position: relative;
      .title{
        font-size: $size26;
        color: $color51;
        & >>> .keyword {
          color: $theme;
          font-style: normal;
        }
      }
      .up-name{
        color: $color-gray;
        font-size: $size24;
      }
      .play-info{
        color: $color-gray;
        font-size: $size24;
        position: absolute;
        width: 100%;
        bottom: 5%;
        .play{
          display: flex;
          align-items: center;
          margin: .05rem 0;
          .menu-r{
            position: absolute;
            right: 0;
            width: .26rem;
          }
        }
        .play-large{
          background: #fc8b51;
          color: #fff;
          padding: 0 .05rem;
          font-size: $size20;
          -webkit-border-radius: .05rem;
          -moz-border-radius: .05rem;
          border-radius: .05rem;
          margin-top: .05rem;
        }
        .put-date{
          font-size: .16rem;
          margin-bottom: .05rem;
        }
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
            line-height: .28rem;
            margin-left: 0.12rem;
          }
        }
      }
    }
  }
</style>
