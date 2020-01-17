<template>
    <div>
      <div class="partition-box">
        <div class="title">
          <span class="all">全部分区（{{partition.length}}）</span>
          <div class="hide" @click="transPartition">
            <span>{{hidePartition ? '展开' : '收起'}}分区</span><img :class="hidePartition ? '' :'totate'" src="../../common/img/down.png"/>
          </div>
        </div>
        <div v-show="!hidePartition">
          <div class="partition">
            <div class="partition-item" v-for="(item, index) in partition" :key="index">
              <img :src="item.icon"/>
              <span>{{item.tname}}</span>
            </div>
          </div>
          <div class="hide footer" @click="transPartition">
            <span>{{hidePartition ? '展开' : '收起'}}分区</span><img :class="hidePartition ? '' :'totate'" src="../../common/img/down.png"/>
          </div>
        </div>
      </div>
      <ifooter :active="'频道'"></ifooter>
    </div>
</template>

<script>
import Ifooter from '../../base/ifooter'

export default {
  name: 'channel',
  components: {Ifooter},
  data () {
    return {
      partition: [],
      hidePartition: false
    }
  },
  created () {
    this.getPartition()
  },
  methods: {
    async getPartition () {
      let partition = await this.$get('/partition')
      if (partition.code === 0) {
        this.partition = partition.data
      }
    },
    transPartition () {
      this.hidePartition = !this.hidePartition
    }
  }
}
</script>

<style scoped lang="scss">
  .partition-box{
    margin-bottom: $m-bottom;
    background: #fff;
    .title{
      padding: .2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .all{
        color: $color51;
        font-size: $size30;
        font-weight: bold;
      }
    }
    .hide{
      color: $color-gray;
      font-size: $size20;
      img{
        width: .3rem;
        height: .3rem;
        margin-left: .05rem;
        vertical-align: sub;
        &.totate{
          transform: rotate(180deg);
        }
      }
      &.footer{
        margin-top: .3rem;
        text-align: center;
      }
    }
    .partition{
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .partition-item{
        width: 25%;
        text-align: center;
        img{
          width: 1rem;
          height: 1rem;
          display: block;
          margin: 0 auto;
        }
        span{
          font-size: $size26;
          color: $color-gray;
        }
      }
    }
  }
</style>
