<template>
    <div class="recommend">
      <div class="recommend-type" v-for="(item, index) in recomList" :key="index" v-if="item.data.length > 0">
        <i-video class="recommend-type-item" v-for="(itm, idx) in item.data" :key="idx" :video="itm" v-if="itm.type === 'video'"></i-video>
      </div>
    </div>
</template>

<script>
import IVideo from '../../i-video'
export default {
  name: 'recommend',
  components: {IVideo},
  props: {
    recomList: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>
