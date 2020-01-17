<template>
    <div class="comment-detail" v-show="showCoDetail" ref="commentDetail">
      <div class="root-reply">
        <icomment-term :item="root" v-if="root"></icomment-term>
      </div>
      <div class="reply-box">
        <div class="reply-num">相关回复共{{count}}条</div>
        <div class="row" v-for="(item, index) in replyList" :key="index" v-show="replyList.length">
          <icomment-term :item="item"></icomment-term>
        </div>
      </div>
    </div>
</template>

<script>
import IcommentTerm from './icomment-term'
export default {
  name: 'comment-detail',
  components: {IcommentTerm},
  props: {
    showCoDetail: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      root: null,
      count: 0,
      replyList: [],
      pn: 1,
      isLoading: false,
      isFinished: false,
      oid: '',
      rpid: ''
    }
  },
  methods: {
    async GetReplyDetail (pn) {
      if (this.isLoading || this.isFinished) return
      this.isLoading = true
      let replyDetail = await this.$get('/replyDetail', {
        pn: pn,
        type: 1,
        oid: this.oid,
        ps: 20,
        root: this.rpid
      })
      this.root = replyDetail.data.root
      this.count = replyDetail.data.page.count
      this.$set(this, 'replyList', replyDetail.data.replies)
      this.isLoading = false
    },
    async commontDetail (data) {
      this.oid = data.oid
      this.rpid = data.rpid
      this.$refs.commentDetail.addEventListener('scroll', this.onScroll)
      this.GetReplyDetail(this.pn)
    },
    // 上拉加载更多
    onScroll () {
      let that = this
      if (that.isLoading || this.isFinished) return
      let scrollHeight = this.$refs.commentDetail.scrollHeight
      let scrollTop = this.$refs.commentDetail.scrollTop
      if (scrollHeight - scrollTop <= 700) {
        // 加载更多操作
        if (!this.isLoading) {
          that.pn++
          this.GetReplyDetail(this.pn)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .comment-detail{
    position: fixed;
    overflow-y: scroll;
    overflow-x: hidden;
    width: 100%;
    height: 100%;
    background: #fff;
  }
  .root-reply{
    padding: .2rem;
  }
  .reply-box{
    padding: .2rem;
    border-top: .2rem solid #eee;
    margin-bottom: 240px;
    .reply-num{
      font-size: $size24;
      color: $color-gray;
      margin-bottom: .15rem;
    }
  }
</style>
