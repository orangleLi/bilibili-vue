<template>
  <div class="user-info">
    <img class="avatar" :src="item.member.avatar"/>
    <div class="main-box">
      <div class="main">
        <div class="user">
          <div class="level">
            <span>{{item.member.uname}}</span>
            <img :src="require('../../../../common/img/ic_user_level_' + item.member.level_info.current_level + '.png')"/>
          </div>
          <div class="data" v-html="_dataTrans(item.ctime)">{{item.ctime}}</div>
        </div>
        <div class="opera">
          <button class="follow">关注</button>
        </div>
      </div>
      <div class="message">{{item.content.message}}</div>
      <div class="iconfont-box">
        <span><i class="iconfont icon-icon_fav"></i>{{play(item.like) || ''}}</span>
        <span><i class="iconfont icon-icon_un_fav"></i></span>
        <span><i class="iconfont icon-icon_share"></i></span>
        <span><i class="iconfont icon-message2"></i></span>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {dataTrans, play} from '../../../../common/js/util'
export default {
  name: 'icomment-term',
  props: {
    item: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    play (num) {
      return play(num)
    },
    _dataTrans (timestamps) {
      return dataTrans(timestamps, '-')
    }
  }
}
</script>

<style scoped lang="scss">

  .user-info{
    display: flex;
    justify-content: space-between;
    width: 100%;
    .avatar{
      width: .75rem;
      height: .75rem;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      transform: translateY(.2rem);
    }
    .main-box{
      margin-left: .2rem;
      width: 85%;
      .main{
        display: flex;
        justify-content: space-between;
        .user{
          font-size: $size22;
          color: $color-gray;
          .data{
            margin-top: .05rem;
          }
          .level{
            color: #333;
            font-size: $size26;
            img{
              width: .4rem;
              height: .4rem;
              vertical-align: sub;
            }
          }
        }
        .follow{
          background: transparent;
          color: $theme;
        }
      }
      .message{
        font-size: $size28;
        color: $color51;
        margin-top: .15rem;
        white-space: pre-wrap;
        word-break: break-all;
      }
      .iconfont-box{
        color: $color-gray;
        font-size: $size22;
        padding-top: .15rem;
        margin-bottom: .2rem;
        &>span{
          margin-right: .15rem;
          .iconfont{
            margin-right: .05rem;
          }
        }
      }
    }
  }
</style>
