<template>
    <div class="list-wrapper">
      <up-list :up="list_data.up"></up-list>
      <video-list :videoList="list_data.video"></video-list>
    </div>
</template>

<script>
import UpList from './up-list'
import VideoList from '../video/video-list'
export default {
  name: 'list',
  components: {VideoList, UpList},
  props: {
    list_data: {
      type: Object,
      default: function () {
        return {}
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .list-wrapper{
    padding: .15rem .28rem;
  }
</style>
