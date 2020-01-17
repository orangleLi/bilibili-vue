<template>
    <div class="search-list">
      <category :category="show_module_list" :openPanel="false" v-if="show_module_list.length>0"></category>
      <div class="sort row">
        <div :class="'sort-item ' + (sortIndex===index?'active':'')" v-for="(item, index) in sort" :key="index">{{item}}</div>
      </div>
      <list :list_data="list_data"></list>
    </div>
</template>

<script>
import Category from '../../base/category'
import List from '../list/list'
export default {
  name: 'search-list',
  components: {List, Category},
  props: {
    show_module_list: {
      type: Array,
      default: function () {
        return []
      }
    },
    list_data: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      sortIndex: 0,
      sort: ['默认排序', '播放多', '新发布', '弹幕多']
    }
  }
}
</script>

<style scoped lang="scss">
  .search-list{
    .sort{
      height: .8rem;
      margin: 0 .44rem;
      box-shadow: 0 0 0 0 #ccc;
      font-size: .26rem;
      line-height: .58rem;
      text-align: center;
      color: $color-gray;
      display: flex;
      align-items: center;
      justify-content: space-between;
      /*border-bottom: .01rem solid #eee;*/
      .sort-item{
        flex: 1;
      }
      .active{
        color: #fb7299;
      }
    }
  }
</style>
