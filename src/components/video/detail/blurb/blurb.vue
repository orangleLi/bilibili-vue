<template>
  <div class="detail-info" v-if="detail && stat">
    <div class="author-info">
      <div class="author" v-if="detail.owner">
        <img :src="detail.owner.face"/>
        <div class="info">
          <span class="a-name">{{detail.owner.name}}</span>
          <span class="fans" v-html="play(stat.follower) + '粉丝'"></span>
        </div>
      </div>
      <div class="opera">
        <button class="follow">关注</button>
      </div>
    </div>
    <div class="title-info" @click="transTitle">
      <span :class="'title ' + (showTitle ? '' : 'clamp-1')">{{detail.title}}</span>
      <img :class="'down ' + (showTitle ? 'rotate' : '')" src="../../../../common/img/down.png"/>
    </div>
    <div class="play-info" v-if="detail.stat">
                <span>
                  <img src="../../../../common/img/play1.png"/>
                  <span  v-html="play(detail.stat.view)"></span>
                </span>
      <span>
                  <img src="../../../../common/img/video_review1.png"/>
                  <span v-html="play(detail.stat.danmaku)"></span>
                </span>
      <span v-html="_dataTrans(detail.pubdate)"></span>
      <span>AV{{detail.aid}}</span>
    </div>
    <transition-group name="intro-tag">
      <div v-show="showTitle" class="forbidden" key="0">
        <img src="../../../../common/img/forbidden.png"/>
        <span>未经作者授权禁止转载</span>
      </div>
      <div class="desc" v-if="desc && showTitle" key="1">{{desc}}</div>
    </transition-group>
    <div class="opera-box" v-if="statVideo">
      <div class="opera">
        <img src="../../../../common/img/icon_fav.png"/>
        <span>{{statVideo.like ? play(statVideo.like) : '点赞'}}</span>
      </div>
      <div class="opera">
        <img src="../../../../common/img/icon_un_fav.png"/>
        <span>{{statVideo.dislike ? play(statVideo.dislike) : '不喜欢'}}</span>
      </div>
      <div class="opera">
        <img src="../../../../common/img/icon_coin.png"/>
        <span>{{statVideo.coin ? play(statVideo.coin) : '投币'}}</span>
      </div>
      <div class="opera">
        <img src="../../../../common/img/icon_collect.png"/>
        <span>{{statVideo.favorite ? play(statVideo.favorite) : '收藏'}}</span>
      </div>
      <div class="opera">
        <img src="../../../../common/img/icon_share.png"/>
        <span>{{statVideo.share ? play(statVideo.share) : '分享'}}</span>
      </div>
    </div>
    <div class="tags-box" ref="tagsBox">
      <div :class="'tags ' + (showTag ? 'hide' : '')">
        <div class="tags-item" v-for="(item, index) in tags" :key="index">
          <img v-if="index < 3" src="../../../../common/img/icon_tag.png" />
          <span :class="index < 3 ? 'active' : ''">{{item.tag_name}}</span>
        </div>
      </div>
      <div class="all-tags" @click="transTag">
        <div class="tag-num" v-if="tags.length && !showTag">共{{tags.length}}个</div>
        <img :class="'down ' + (showTag ? 'rotate' : '')" src="../../../../common/img/down.png"/>
      </div>
    </div>
    <recommend :recomList="recomList"></recommend>
  </div>
</template>

<script>
import {dataTrans, play} from '../../../../common/js/util'
import Recommend from './recommend'
export default {
  name: 'blurb',
  components: {Recommend},
  props: {
    mid: {
      type: String,
      default: ''
    },
    aid: {
      type: String,
      default: ''
    },
    detail: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      showTitle: false,
      showTag: false,
      stat: {},
      statVideo: {},
      tags: [],
      reply: {},
      desc: '',
      recomList: []
    }
  },
  created () {
    this.getStat()
    this.getStatVideo()
    this.getDesc()
    this.getTags()
  },
  methods: {
    async getDesc () {
      let desc = await this.$get('/desc', {
        aid: this.aid
      })
      this.desc = desc.data
    },
    async getTags () {
      let tags = await this.$get('/tags', {
        aid: this.aid
      })
      let res = tags.data.sort((val1, val2) => {
        let s = val2['likes'] - val1['likes']
        if (!s) {
          s = val2['tag_id'] - val1['tag_id']
        }
        return s
      })
      this.tags = res
      this.getSearch(this.tags[0].tag_name)
    },
    async getStat () {
      let stat = await this.$get('/stat', {
        vmid: this.mid
      })
      this.stat = stat.data
    },
    async getStatVideo () {
      let statVideo = await this.$get('/statVideo', {
        aid: this.aid
      })
      this.statVideo = statVideo.data
    },
    async getRecommend () {
      // let recommend = await this.$get('/recommend', {
      //   aid: this.aid
      // })
      // console.log(this.recomList)
    },
    async getSearch (valKey) {
      let search = await this.$get('/search', {
        keyword: valKey,
        page: 1,
        pagesize: 20,
        search_type: 'all',
        order: 'totalrank'
      })
      this.recomList = search.data.result
    },
    transTitle () {
      this.showTitle = !this.showTitle
    },
    play (num) {
      return play(num)
    },
    transTag () {
      this.showTag = !this.showTag
    },
    _dataTrans (timestamps) {
      return dataTrans(timestamps, '-')
    }
  }
}
</script>

<style scoped lang="scss">
  .detail-info{
    padding: .3rem;
    width: 100%;
    box-sizing: border-box;
  }
  .author-info{
    display: flex;
    margin: 0 0 .3rem 0;
    justify-content: space-between;
    align-items: center;
    .author{
      display: flex;
      align-items: center;
      img{
        width: .7rem;
        height: .7rem;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
      }
      .info{
        margin-left: .15rem;
        .a-name{
          font-size: $size26;
          height: $size26;
          color: $color51;
          display: block;
          margin-bottom: .05rem;
        }
        .fans{
          font-size: 12px;
          color: $color-gray;
        }
      }
    }
  }
  .title-info{
    font-size: $size28;
    color: $color51;
    display: flex;
    justify-content: space-between;
    .title{
      flex: 1;
      transition: all 2s ease;
      &.clamp-1{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
    }
    .down{
      width: .4rem;
      height: .4rem;
      margin: 0 .15rem;
      &.rotate{
        transform: rotate(180deg);
      }
    }
  }
  .play-info{
    font-size: 12px;
    color: $color-gray;
    margin-top: .05rem;
    span{
      margin-right: .15rem;
    }
    img{
      width: .3rem;
      height: .3rem;
      vertical-align: sub;
    }
  }
  .forbidden{
    font-size: 12px;
    color: $color-gray;
    margin-top: .1rem;
    img{
      width: .3rem;
      height: .3rem;
      vertical-align: text-top;
    }
  }
  /*.intro-tag-enter-active, .intro-tag-leave-active{
      transition: all .5s;
    }
  .intro-tag-enter, .intro-tag-leave-to{
    -webkit-transform: translateY(-100px);
    -moz-transform: translateY(-100px);
    -ms-transform: translateY(-100px);
    -o-transform: translateY(-100px);
    transform: translateY(-100px);
    opacity: 0;
  }*/
  .desc{
    font-size: $size24;
    white-space: pre-wrap;
    margin-top: .15rem;
    color: $color-gray;
  }
  .opera-box{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: .3rem 0;
    .opera{
      flex: 1;
      text-align: center;
      img{
        width: .5rem;
        height: .5rem;
        display: block;
        margin: 0 auto;
      }
      span{
        font-size: $size22;
        color: $color-gray;
      }
    }
  }
  .tags-box{
    display: flex;
    position: relative;
    .tags{
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      font-size: $size22;
      color: $color-gray;
      height: .6rem;
      overflow: hidden;
      width: 90%;
      &.hide{
        height: auto;
        width: 98%;
      }
      .tags-item{
        display: flex;
        align-items: center;
        padding: 0 .2rem;
        height: .6rem;
        line-height: .6rem;
        background: #eee;
        -webkit-border-radius: .4rem;
        -moz-border-radius: .4rem;
        border-radius: .4rem;
        margin-right: .2rem;
        margin-bottom: .15rem;
        img{
          width: .25rem;
          height: .25rem;
          margin-right: .05rem;
        }
        span.active{
          color: $theme;
        }
      }
    }
    .all-tags{
      font-size: $size22;
      color: $color-gray;
      display: flex;
      justify-content: flex-end;
      transform: translateY(.1rem);
      position: absolute;
      right: -.3rem;
      .tag-num{
        width: 100%;
      }
      .down{
        width: .4rem;
        height: .4rem;
        margin: 0 .15rem;
        &.rotate{
          transform: rotate(180deg);
        }
      }
    }
  }
</style>
