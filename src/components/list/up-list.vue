<template>
  <div class="up-list" v-if="up.length > 0">
    <div class="up" v-for="(item, index) in up" :key="index">
      <div class="bili-user-info">
        <div class="bili-user">
          <div class="head-img">
            <img class="upic" :src="item.upic"/>
            <img class="lightning" src="../../common/img/lightning.png"/>
          </div>
          <div class="bili-info">
            <div class="level">
              <span>{{item.uname}}</span>
              <img :src="require('../../common/img/ic_user_level_' + item.level + '.png')"/>
            </div>
            <div class="fans">
              <span v-html="setFans(item.fans)"></span>
              <span class="video-num">视频{{item.videos}}</span>
            </div>
            <div class="desc">
              <span>{{item.official_verify.desc}}</span>
            </div>
          </div>
        </div>
        <div class="opera">
          <button class="follow">关注</button>
        </div>
      </div>
      <div class="bili-up-video">
        <i-video :video="item.res[0]" :oneself="true"></i-video>
        <div class="all-video row" v-if="item.res.length > 0">查看全部{{item.res.length}}个视频></div>
      </div>
    </div>
  </div>
</template>

<script>
import IVideo from '../video/i-video'
export default {
  name: 'up-list',
  components: {IVideo},
  props: {
    up: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  mounted () {
  },
  methods: {
    setFans (fans) {
      return `粉丝${fans > 9999 ? (fans / 10000).toFixed(1) + '万' : fans}`
    }
  }
}
</script>

<style scoped lang="scss">
  .bili-user-info{
    display: flex;
    justify-content: space-between;
    .bili-user{
      display: flex;
      .head-img{
        position: relative;
        .upic{
          width: 1.3rem;
          height: 1.3rem;
          display: block;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;
        }
        .lightning{
          position: absolute;
          right: 0;
          bottom: 0;
          width: 15px;
          height: 15px;
          display: block;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;
          border: .01rem solid #fff;
        }
      }
      .bili-info{
        margin-left: .3rem;
        .level{
          color: #333;
          img{
            width: .4rem;
            height: .4rem;
          }
        }
        .fans{
          color: #999;
          font-size: .22rem;
          margin-top: .12rem;
          .video-num{
            margin-left: .15rem;
          }
        }
        .desc{
          color: #999;
          font-size: .22rem;
          margin-top: .12rem;
        }
      }
    }
    .opera{
      .follow{
        background: $theme-bg;
        border: none;
        color: #fff;
        padding: .05rem .18rem;
        font-size: .26rem;
        -webkit-border-radius: .05rem;
        -moz-border-radius: .05rem;
        border-radius: .05rem;
        display: flex;
        align-items: center;
        &::before{
          content: '+';
          font-size: .36rem;
          line-height: .36rem;
          margin-right: .06rem;
          /*font-weight: bold;*/
        }
      }
    }
  }
  .bili-up-video{
    .all-video{
      color: $theme;
      font-size: $size20;
      text-align: center;
      padding: .15rem 0 .3rem 0;
    }
  }
</style>
