<template>
  <div class="video-list" v-if="videoList.length>0">
    <i-video v-for="(item, index) in videoList" :key="index" :video="item"></i-video>
  </div>
</template>

<script>
import IVideo from '../video/i-video'
export default {
  name: 'video-list',
  components: {IVideo},
  props: {
    videoList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
  .video-list{
    /*margin-top: .3rem;*/
  }
</style>
