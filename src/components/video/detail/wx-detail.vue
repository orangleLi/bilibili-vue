<template>
    <div class="video-detail">
      <div class="fixed-box">
        <div class="video_box" @click="transShowOpera" ref="videoBox" >
          <video muted class="video_demo" id="video_demo" src="/static/video/32/Jay.mp4" x5-video-player-type="h5" x5-video-player-fullscreen="true" :x5-video-orientation="isHScreen ? 'landscape': 'portraint'"
                 webkit-playsinline="true"
                 x-webkit-airplay="true"
                 playsinline="true"
                 x5-playsinline></video>
        </div>
        <div class="play_btn Js_playBtn Js-autoHeight" ref="playBtn" @click="transShowOpera">
          <div class="network-not-wifi" v-if="!isWifi">
            <div class="not-wifi-info">
              <span>正在使用非WIFI网络</span>
              <div class="continue-play" @click.stop.prevent="setIsWifi">
                <i class="iconfont icon-play1"></i>
                <span>继续播放</span>
              </div>
            </div>
          </div>
          <div class="opera-i top-box" v-show="isShowOpera">
            <div class="title-info">
              <div @click.stop.prevent="back">
                <i class="iconfont icon-back"></i>
              </div>
              <div class="video-title clamp-1"><span>{{detail.title}}</span></div>
              <div class="video-time"><span>16:26</span></div>
            </div>
            <div  @click.stop.prevent="menu">
              <i class="iconfont icon-menu"></i>
              <div v-show="isHScreen" class="h-screen-opera">quanp</div>
            </div>
          </div>
          <div class="opera-i bottom-box" v-show="isWifi && isShowOpera">
            <div @click.stop.prevent="setPlay">
              <i :class="'iconfont ' + (isPlay ? 'icon-pause' : 'icon-play1')"></i>
            </div>
            <div class="progress-bar">
              <div class="progress" ref="progressBar">
                <div class="play-finish finished" :style="'width: ' + setPlayWidth() + '%;'"></div>
                <div class="play-finish now-finish"></div>
                <img @touchmove="onTouchMove" ref="progressBtn" class="progress-btn" src="../../../common/img/bilibili-line.png"
                     :style="'transform: translate(' + setPlayWidth(true) + 'px, -50%);'"/>
              </div>
              <div class="progress-time">
                <span v-html="setDuration((currentTime.toFixed(0)) + '')"></span>/<span v-html="setDuration('231')"></span>
              </div>
            </div>
            <div @click.stop.prevent="onHScreen">
              <i class="iconfont icon-quanping"></i>
            </div>
          </div>
          <div class="opera-i menu-set-box" ref="menuBox" v-show="menuBox">
            <div>开启弹幕</div>
            <div>弹幕设置</div>
            <div class="double-speed-box">
              <span @click.stop.prevent="transSpeedModal" ref="speed">倍速</span>
              <div class="double-speed" v-show="speedModal" @click.stop.prevent="setSpeed">
                <span>0.5</span>
                <span>1</span>
                <span>1.5</span>
                <span>2</span>
              </div>
            </div>
          </div>
          <div class="opera-i dm-box" ref="dmBox"></div>
        </div>
        <div class="intor-title" v-if="!showReplyDetail" v-show="!isHScreen">
          <div :class="'item ' + (swiperCurrent === 0 ? 'active' : '')" @click="switchTagClick(0)">简介</div>
          <div :class="'item ' + (swiperCurrent === 1 ? 'active' : '')" @click="switchTagClick(1)">评论</div>
          <div class="item" @click="toSendDm">点我发弹幕</div>
        </div>
        <div v-show="!isHScreen" class="intor-title reply-detail" v-else>
          <span>评论详情</span>
          <i class="iconfont icon-close" @click="closeReplyDetail"></i>
        </div>
      </div>
      <div v-show="!isHScreen" class="occupy" ref="occupy"></div>
      <div class="video-play-info" v-show="!showReplyDetail && !isHScreen">
        <swiper :options="swiperOption" ref="mySwiper" class="swiper-box">
          <swiper-slide class="blurb-slide" id="blurb">
            <!--简介-->
            <blurb class="blurb" :mid="mid + ''" :aid="aid + ''" :detail="detail"></blurb>
          </swiper-slide>
          <swiper-slide class="comment-slide" id="comment">
            <!--评论-->
            <icomment class="icomment" :oid="aid + ''" @commontDetail="commontDetail" :showCoDetail="showReplyDetail"></icomment>
          </swiper-slide>
        </swiper>
      </div>
      <comment-detail v-show="!isHScreen" :showCoDetail="showReplyDetail" ref="commentDetail"></comment-detail>
      <send-dm ref="dmComponent" :top="top" v-if="showDm" @close="showDm = !showDm" @send="send"></send-dm>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import Blurb from './blurb/blurb'
import Icomment from './comment/icomment'
import CommentDetail from './comment/comment-detail'
import sendDm from '../../../base/sendDM'
import {getNetworkType, setDuration} from '../../../common/js/util'

// import flvjs from 'flv.js'
export default {
  name: 'wx-detail',
  data () {
    return {
      swiperCurrent: 0,
      swiperOption: {
        autoplay: false,
        speed: 600,
        on: {
          slideChangeTransitionStart: () => {
            let swiper = this.$refs.mySwiper.swiper
            let i = swiper.realIndex
            this.switchTag(i)
          }
        }
      },
      aid: '',
      mid: '',
      detail: {},
      replyDetail: {},
      showReplyDetail: false,
      isPlay: false, // 是否播放视频
      isHScreen: false, // 是否横屏
      currentTime: 0, // 视频当前已播放的时长(秒)
      isShowOpera: false, // 显示进度条操作框
      isWifi: false, // 是否为wifi环境
      progressBarW: 0, // 进度条宽度,
      menuBox: false,
      speedModal: false,
      dm: [],
      dmIsIn: false,
      r: 1080 / 1920,
      showDm: false, // 是否显示发送弹幕框
      top: 0
    }
  },
  created () {
    this.aid = this.$route.query.aid
    this.mid = this.$route.query.mid
  },
  activated () {
    this.videoObj.currentTime = 0
    this.videoObj.load()
  },
  deactivated () {
    if (!this.dmTimer) return
    this.dmTimer.forEach(item => {
      clearInterval(item)
    })
    this.$destroy('wx-detail')
  },
  mounted () {
    // if (flvjs.isSupported()) {
    //   let videoElement = document.getElementById('video_demo')
    //   let flvPlayer = flvjs.createPlayer({
    //     type: 'flv',
    //     url: 'http://upos-hz-mirrorks3u.acgvideo.com/upgcxcode/88/97/77589788/77589788-1-32.flv?e=ig8euxZM2rNcNbRz7WdVhoM1hzUVhwdEto8g5X10ugNcXBlqNCNEto8g5gNvNE3DN0B5tZlqNxTEto8BTrNvN05fqx6S5ahE9IMvXBvE2ENvNCImNEVEK9GVqJIwqa80WXIekXRE9IB5QK==&uipk=5&nbs=1&deadline=1579431541&gen=playurl&os=ks3u&oi=1877347901&trid=b5a883718c704c4186694520b245a56au&platform=android&upsig=9fb19a45ae941a4824d3b6b1f55156fa&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&mid=0'
    //   })
    //   flvPlayer.attachMediaElement(videoElement)
    //   // flvPlayer._mediaElement.getAttribute('src').replace('http://192.168.5.197:8080', 'https://www.bilibili.com')
    //   // blob:http://192.168.5.197:8080/17e648d2-f3b4-41fa-9012-063b9e9d9289
    //   // blob:https://www.bilibili.com/81174792-a5e9-4f85-81bb-ff424ccca92b
    //   // blob:https://www.bilibili.com/191ccd0e-e822-4c7c-84aa-e80e94d0c787
    //   // blob:https://www.bilibili.com/cc71244d-f9ff-4fb1-b7d3-a51ed72d2523
    //   // let src = videoElement.getAttribute('src').replace('http://192.168.5.197:8080', 'https://www.bilibili.com')
    //   flvPlayer._mediaElement.setAttribute('src', 'blob:https://www.bilibili.com/c4ac4fbe-e08b-4ebf-aff7-fbc39578f257')
    //   flvPlayer._mediaElement.setAttribute('currentSrc', 'blob:https://www.bilibili.com/c4ac4fbe-e08b-4ebf-aff7-fbc39578f257')
    //   // flvPlayer._msectl._mediaSourceObjectURL = flvPlayer._msectl._mediaSourceObjectURL.replace('http://192.168.5.197:8080', 'https://www.bilibili.com')
    //   this.flvPlayer = flvPlayer
    //   console.log(flvPlayer)
    //   // console.log(flvPlayer)
    //   // flvPlayer.load()
    //   // flvPlayer.play()
    // }
    this.getDetail()
    this.dmInit()
    this.getDm()
    this.videoObj = document.getElementById('video_demo')
    this.init()
    let network = getNetworkType() === 'wifi'
    this.isWifi = network
    if (network) {
      this.isShowOpera = true
    }
  },
  methods: {
    // 根据当前已播放设置进度条
    setPlayWidth (tag) {
      if (tag && this.$refs.progressBar) {
        let progressBarW = this.$refs.progressBar.clientWidth // 获取进度条总长度 单位px
        this.progressBarW = this.progressBarW < progressBarW ? progressBarW : this.progressBarW
        return (this.currentTime / this.videoDuration) * this.progressBarW - (15 / 2).toFixed(2)
      } else {
        return ((this.currentTime * 100 / this.videoDuration)).toFixed(2)
      }
    },
    // 获取已当前播放时间,单位秒
    getPlayed () {
      if (this.isPlay) {
        this.currentTime = this.videoObj.currentTime
      }
      window.requestAnimationFrame(this.getPlayed)
    },
    // 播放/暂停
    setPlay () {
      this.isPlay = !this.isPlay
      if (this.isPlay) {
        this.videoObj.play()
        if (this.dmIsIn) {
          this.dmRunningSet('running')
        } else {
          this.playDm()
        }
        this.videoDuration = this.videoObj.duration // 记录视频总长 以秒计
        window.requestAnimationFrame(this.getPlayed)
      } else {
        this.videoObj.pause()
        this.dmRunningSet('paused')
      }
    },
    playDm () {
      this.dmTimer = []
      this.dm.forEach((item, index) => {
        let time = setTimeout(() => {
          this.send(item)
        }, index * 1000)
        this.dmTimer.push(time)
      })
      this.dmIsIn = true
    },
    dmRunningSet (state) {
      let dmObj = document.getElementsByClassName('dm-ani')
      Array.from(dmObj).forEach(item => {
        item.style.animationPlayState = state
      })
      if (state === 'paused' && this.dmTimer) {
        this.dmTimer.forEach(item => {
          clearInterval(item)
        })
      }
    },
    transShowOpera () {
      this.menuBox = false
      let now = Date.now()
      if (now - this.dblClick < 400) {
        // 双击  双击还是会触发一次单击的
        this.dblClick = 0
        this.isShowOpera = true
        this.setPlay()
      } else {
        // 单击
        this.dblClick = now
        this.isShowOpera = !this.isShowOpera
      }
    },
    setIsWifi () {
      this.isShowOpera = true
      this.isWifi = true
      this.setPlay()
    },
    // 横屏事件
    onHScreen () {
      this.videoBox = this.$refs.videoBox
      if (this.isHScreen) {
        this.recoveryHScreen()
      } else {
        this.isHScreen = true
        if (getNetworkType() === 'other') {
          this.setRotate(this.$refs.videoBox)
          this.$refs.playBtn.style.zIndex = 2
          this.setRotate(this.$refs.playBtn)
        } else {
          // 微信同层播放处理
          this.videoObj.style.width = window.screen.height + 'px'
          this.videoObj.style.height = window.screen.width + 'px'
          this.videoObj.style.objectFit = 'fill'
        }
      }
    },
    setRotate (obj) {
      this.width = document.body.clientWidth
      this.height = document.body.clientHeight
      this.diff = (this.height - this.width) / 2
      obj.style.width = this.height + 'px'
      obj.style.height = this.width + 'px'
      obj.style.transform = `translate(${-this.diff}px, ${this.diff}px) rotate(90deg)`
    },
    recoveryHScreen () {
      // 恢复竖屏
      this.isHScreen = false
      if (getNetworkType() === 'other') {
        this.videoBox.style.width = '100%'
        this.videoBox.style.height = 'auto'
        this.videoBox.style.transform = ''
        this.videoBox.style.objectFit = 'contain'
        this.$refs.playBtn.style.width = 'auto'
        this.$refs.playBtn.style.height = window.innerWidth * this.r + 'px'
        this.$refs.playBtn.style.transform = ''
      } else {
        // alert('恢复')
      }
    },
    onTouchMove (e) {
      this.isPlay = true
      let diffLeft = 0
      if (this.isHScreen) {
        diffLeft = e.targetTouches[0].clientY - this.$refs.progressBar.offsetLeft
      } else {
        diffLeft = e.targetTouches[0].clientX - this.$refs.progressBar.offsetLeft
      }
      let nowTime = (diffLeft / this.progressBarW) * this.videoDuration
      this.videoObj.currentTime = nowTime
      this.$refs.progressBtn.style.transform = `translate(${diffLeft}px, -50%)`
      this.videoObj.play()
    },
    back () {
      if (this.isHScreen) {
        this.recoveryHScreen()
      } else {
        this.$router.back()
      }
    },
    menu () {
      // 菜单操作
      this.menuBox = !this.menuBox
      // if (this.menuBox) {
      //   this.$refs.menuBox.style.height = '0'
      // } else {
      //   this.$refs.menuBox.style.height = '.8rem'
      // }
    },
    transSpeedModal () {
      this.speedModal = !this.speedModal
    },
    setSpeed (e) {
      let speed = e.target.innerText - 0
      this.videoObj.playbackRate = speed
      if (speed === 1) {
        this.$refs.speed.innerHTML = '正常'
      } else {
        this.$refs.speed.innerHTML = 'X' + speed
      }
      this.transSpeedModal()
    },
    async getDetail () {
      let detail = await this.$get('/detail', {
        aid: this.aid
      })
      this.detail = detail.data
    },
    dmInit () {
      let box = this.$refs.dmBox
      for (let i = 0; i < 10; i++) {
        let item = document.createElement('div')
        item.style.top = (i * 20) + 'px'
        box.appendChild(item)
      }
    },
    send (txt, color, fontsize) {
      if (!this.$refs.dmBox) return
      if (!txt) {
        this.$alert.showToast({
          title: '没有内容',
          icon: 'none'
        })
      }
      let channelI = Math.floor(Math.random() * 10)
      this.$refs.dmBox.childNodes[channelI].innerHTML = `<span class="dm-ani" style="color: ${color};font-size: ${fontsize}px;">${txt}</span>`
      this.$store.commit('setHistoryDm', {
        dm: txt,
        color,
        fontsize
      })
    },
    async getDm () {
      let dm = await this.$get('/dm', {
        aid: this.aid
      })
      this.dm = dm.data
    },
    async getRecommend () {
      let recommend = await this.$get('/recommend', {
        aid: this.aid
      })
      console.log(recommend)
    },
    toSendDm () {
      this.showDm = !this.showDm
      // this.$nextTick(() => {
      this.top = document.getElementsByClassName('fixed-box')[0].clientHeight + 'px'
      // })
    },
    switchTag (realIndex) {
      this.swiperCurrent = realIndex
    },
    switchTagClick (realIndex) {
      this.swiperCurrent = realIndex
      this.$refs.mySwiper.swiper.slideTo(realIndex, 500, false)
    },
    async commontDetail (data) {
      this.showReplyDetail = !this.showReplyDetail
      this.$refs.commentDetail.commontDetail(data, this.showReplyDetail)
    },
    setDuration (duration) {
      return setDuration(duration)
    },
    closeReplyDetail () {
      this.showReplyDetail = false
    },
    init: function () {
      var t = this
      t.wxFn()
      t.autoFn()
    },
    wxFn: function () {
      var t = this
      this.videoObj.addEventListener('x5videoenterfullscreen', function () {
        t.fullVideoCcFn()
      })
      // this.videoObj.addEventListener('x5videoexitfullscreen', function () {
      //   document.getElementsByClassName('video_box')[0].style.display = 'none'
      // })
      window.onresize = function () {
        t.fullVideoCcFn()
      }
      this.videoObj.style['object-position'] = '0px 0px'
      // document.getElementsByClassName('Js_playBtn')[0].addEventListener('click', function () {
      //   t.startPlayFn()
      // })
    },
    fullVideoCcFn: function () {
      this.videoObj.style.width = screen.width + 'px'
      this.videoObj.style.height = screen.height + 'px'
    },
    autoFn: function () {
      var h = window.innerWidth
      var h2 = h * this.r
      document.getElementsByClassName('Js_playBtn')[0].style.height = h2 + 'px'
      this.$refs.occupy.style.paddingTop = document.getElementsByClassName('fixed-box')[0].clientHeight + 'px'
    }
  },
  components: {
    CommentDetail,
    Icomment,
    Blurb,
    swiper,
    swiperSlide,
    sendDm
  }
}
</script>

<style lang="scss">
  .video-detail{
    background: transparent;
    height: 100%;
  }
  .fixed-box{
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1001;
  }
  *{
    padding:0px;
    margin:0px;
    list-style: none;
  }
  .video_box{
    width:100%;
    /*display: none;*/
    position: absolute;
    z-index: 1;
  }
  .video_demo{
    width:100%;
    background: none;
  }
  .play_btn{
    /*background:#000000 url(images/play.png) no-repeat center;*/
    background-size:15% auto;
    position: relative;
    background: #000;
    /*background: rgba(0,0,0,.2);*/
    /*z-index: 2;*/
  }
  .trigger{
    display: flex;
    position: relative;
    z-index: 2;
  }
  .trigger li{
    width:50%;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    text-align: center;
    border-bottom:2px solid #dddddd;
  }
  .trigger li.current{
    border-bottom-color: #017CD2;
    color: #017CD2;
    font-weight: bold;
  }
  .pannel{
    padding:20px;
    position: relative;
    z-index: 2;
  }
  .pannel .list_box{
    display: none;
  }
  .pannel .list_box.current{
    display: block;
  }
  .network-not-wifi{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    text-align: center;
    font-size: $size28;
    z-index: 2001;
    .continue-play{
      width: 2.2rem;
      margin: .15rem auto;
      background: rgba(53, 53, 53, 0.6);
      padding: .08rem 0;
      font-size: $size26;
      -webkit-border-radius: .08rem;
      -moz-border-radius: .08rem;
      border-radius: .08rem;
    }
  }
  .opera-i{
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    left:0;
    right: 0;
    padding: 0 .15rem;
    color: #fff;
    z-index: 2002;
  }
  .title-info{
    display: flex;
    .video-title{
      font-size: $size28;
      height: .36rem;
      overflow: hidden;
      width: 45%;
    }
    .video-time{
      font-size: $size28;
      margin-left: .15rem;
    }
  }
  .top-box{
    position: absolute;
    top: .15rem;
    .iconfont{
      font-size: .44rem;
    }
  }
  .bottom-box{
    bottom: .3rem;
  }
  .menu-set-box{
    bottom: 0;
    background: rgba(0, 0, 0, .6);
    height: .8rem;
    font-size: $size28;
    /*transform: translateY(1rem);*/
    /*transition: height .4s;*/
    .double-speed-box{
      position: relative;
      .double-speed{
        position: absolute;
        right: 0;
        bottom: 25px;
        background: rgba(0, 0, 0, .6);
        padding: .15rem;
        line-height: .45rem;
        text-align: center;
      }
    }
  }
  .dm-box{
    height: 100%;
    font-size: $size26;
    z-index: 2000;
    & > div{
      position: absolute;
      width: 100%;
      height: 25px;
      & > span{
        position: absolute;
        right: -300px;
        animation: move 15s
      }
    }
  }
  @keyframes move{
    100%{
      transform: translateX(-1000px);
    }
  }
  .progress-bar{
    width: 100%;
    display: flex;
    align-items: center;
    margin: 0 .2rem;
    .progress{
      width: 80%;
      height: 3px;
      background: rgba(0 ,0, 0, .3);
      margin-right: .2rem;
      position: relative;
      display: flex;
      .play-finish{
        height: 100%;
      }
      .finished{
        @include background-main-color($theme-pink);
      }
    }
    .progress-btn{
      position: absolute;
      font-size: 15px;
      @include theme-main-color($theme-pink);
      top: 50%;
      left: 0;
      transform: translate(-4px, -50%);
    }
    .progress-time{
      flex: 1;
      font-size: 14px;
    }
  }

  .occupy{
    padding-top: calc(180px + .66rem);
  }
  .video-play-info{
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    background: #fff;
  }
  .swiper-container{
    height: 100%;
  }
  .blurb, .icomment{
    position: fixed;
    overflow-y: scroll;
    overflow-x: hidden;
    height: 100%;
  }
  .blurb{
    width: auto;
  }
  .icomment{
    width: 100%;
  }
  .swiper-slide{height:800px} /* 随意指定一个height值即可 */
  .swiper-slide-active { height:auto}
  .intor-title{
    height: .66rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: $size26;
    box-shadow: 0 2px 6px #e5e5e5;
    background: #fff;
    .item{
      margin: 0 .5rem;
    }
    .active{
      @include theme-main-color($theme-pink);
      padding: .15rem;
      @include theme-border-color($theme-pink);
      border-bottom: 0.03rem solid;
    }
  }
  .reply-detail{
    justify-content: space-between;
    padding: 0 .2rem;
    color: $color51;
    .icon-close{
      font-size: $size28;
    }
  }
</style>
