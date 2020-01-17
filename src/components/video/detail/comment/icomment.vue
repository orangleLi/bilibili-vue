<template>
    <div class="comment" ref="comment">
      <div class="notice" v-if="reply.notice && showNotice && !showCoDetail">
        <img src="../../../../common/img/horn.png"/>
        <span>{{reply.notice.title}}</span>
        <img class="close" src="../../../../common/img/close.png" @click="closeNotice"/>
      </div>
      <div class="reply-wrapper" v-if="!showCoDetail">
        <div class="sort-rule">
          <span>热门评论</span>
          <div class="rule" @click="setRules">
            <i class="iconfont icon-menu"></i>
            <span>{{sort === 2 ? '按热度' : '按时间'}}</span>
          </div>
        </div>
        <div class="reply-box" v-if="reply">
          <div class="reply-item row" v-for="(item, index) in reply" :key="index">
            <div class="user-box">
              <icomment-term :item="item">
                <div class="reply">
                  <reply :rcount="item.rcount" :replies="item.replies" :rpid="item.rpid" :oid="item.oid" @commontDetail="commontDetail"></reply>
                </div>
              </icomment-term>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import CommentDetail from './comment-detail'
import IcommentTerm from './icomment-term'
import Reply from './reply'
export default {
  name: 'icomment',
  components: {IcommentTerm, CommentDetail, Reply},
  props: {
    oid: {
      type: String,
      default: ''
    },
    showCoDetail: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      sort: 2, // 2 按热度 0 按时间
      reply: {},
      allReply: {},
      showNotice: true,
      pn: 1,
      isLoading: false,
      isFinished: false
    }
  },
  created () {
    this.getReply(this.pn)
  },
  mounted () {
    this.$refs.comment.addEventListener('scroll', this.onScroll)
  },
  watch: {
    deep: true,
    allReply: function (newVal) {
      this.reply = newVal[this.sort]
    }
  },
  methods: {
    async getReply (pn) {
      if (this.isLoading || this.isFinished) return
      this.isLoading = true
      let reply = await this.$get('/reply', {
        type: 1,
        oid: this.oid,
        sort: this.sort,
        ps: 20,
        pn: pn
      })
      this.isLoading = false
      let data = JSON.parse(JSON.stringify(this.allReply))
      if (!data[this.sort]) {
        data[this.sort] = []
      }
      if (!reply.data.replies) {
        this.isFinished = true
      } else {
        data[this.sort].push(...reply.data.replies)
        this.$set(this, 'allReply', data)
      }
    },
    async commontDetail (data) {
      this.$emit('commontDetail', data)
    },
    setRules () {
      this.sort = this.sort === 2 ? 0 : 2
      let reply = this.allReply[this.sort]
      if (reply) {
        this.$set(this, 'reply', reply)
      } else {
        this.getReply()
      }
    },
    closeNotice () {
      this.showNotice = false
    },
    // 上拉加载更多
    onScroll () {
      let that = this
      if (that.isLoading || this.isFinished) return
      let scrollHeight = document.getElementsByClassName('reply-box')[0].scrollHeight
      let scrollTop = this.$refs.comment.scrollTop
      if (scrollHeight - scrollTop <= 700) {
        // 加载更多操作
        if (!this.isLoading) {
          that.pn++
          this.getReply(this.pn)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">

  .notice{
    background: #fdf2d6;
    color: #ca9144;
    font-size: $size26;
    height: .75rem;
    display: flex;
    align-items: center;
    padding: 0 .2rem;
    position: relative;
    img{
      width: .3rem;
      height: .3rem;
    }
    span{
      margin-left: .15rem;
    }
    .close{
      position: absolute;
      right: .2rem;
    }
  }
  .reply-wrapper{
    padding: .2rem;
    .sort-rule{
      display: flex;
      justify-content: space-between;
      &>span{
        color: $color51;
        font-size: $size26;
      }
      .rule{
        color: $color-gray;
        font-size: $size24;
        .iconfont{
          vertical-align: middle;
        }
      }
    }
    .reply-box{
      margin-top: .2rem;
      .reply-item{
        padding: .2rem 0;
        .user-box{
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
</style>
