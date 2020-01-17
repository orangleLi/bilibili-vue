<template>
  <div class="reply-box" v-if="replies">
    <div class="reply clamp" v-for="(item, index) in replies" :key="index">
      <span class="reply-user">{{item.member.uname}}</span>: <span class="reply-content">{{item.content.message}}</span>
    </div>
    <span @click="commontDetail()" class="rcount" v-if="rcount > 0">共{{rcount}}条回复<i class="iconfont icon-right"></i></span>
  </div>
</template>

<script>
export default {
  name: 'reply',
  props: {
    rcount: {
      type: Number,
      default: 0
    },
    replies: {
      type: Array,
      default: function () {
        return []
      }
    },
    rpid: {
      type: Number,
      default: 0
    },
    oid: {
      type: Number,
      default: 0
    }
  },
  methods: {
    commontDetail () {
      this.$emit('commontDetail', {
        rpid: this.rpid,
        oid: this.oid
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .reply-box{
    /*margin-top: .2rem;*/
    padding: .15rem .3rem;
    background: #f4f4f6;
    .reply{
      .reply-user{
        font-size: $size26;
        color: #23798f;
      }
      .reply-content{
        font-size: $size26;
        color: $color-gray;
      }
    }
    .rcount{
      font-size: $size24;
      color: #23798f;
      .icon-right{
        font-size: $size24;
      }
    }
  }
</style>
