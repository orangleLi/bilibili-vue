<template>
    <div class="category-list">
      <div class="category-list-item" v-for="(item, index) in categoryList" :key="index">
        <div class="type-name" v-if="item[0]">{{item[0].typename}}</div>
        <rank :ranking="item"></rank>
      </div>
    </div>
</template>

<script>
import Rank from '../home/rank'
export default {
  name: 'category-list',
  components: {Rank},
  props: {
    categoryList: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .type-name{
    color: $color51;
    font-size: $size30;
    padding: .15rem 0.24rem;
    background: #fff;
  }
</style>
