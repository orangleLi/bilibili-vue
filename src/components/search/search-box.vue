<template>
    <div class="search-box">
      <search ref="search" @search="searchByKey" @clearVal="clearVal" @clearList="clearList" :val="val"></search>
      <div class="occupy"></div>
      <hotword :hotword="hotword" @search="search" v-if="show_module_list.length === 0"></hotword>
      <search-list :show_module_list="show_module_list" :list_data="list_data" v-else></search-list>
    </div>
</template>

<script>
import Search from '../../base/search'
import Hotword from '../../base/hotword'
import SearchList from './search-list'
export default {
  name: 'search-box',
  components: {SearchList, Hotword, Search},
  data () {
    return {
      hotword: [],
      show_module_list: [],
      list_data: {
        result: [],
        up: [],
        video: []
      },
      val: ''
    }
  },
  mounted () {
    this.getHotword()
  },
  methods: {
    search (val) {
      this.val = val
      this.$refs.search.searchByKey(val)
    },
    clearVal () {
      this.val = ''
    },
    clearList (val) {
      this.val = val
      this.$set(this, 'show_module_list', [])
    },
    async getHotword () {
      let hotword = await this.$get('/hotword')
      if (hotword.code === 0) {
        this.hotword = hotword.list
      }
    },
    searchByKey (data) {
      let showModuleList = []
      let video = []
      let up = []
      data.result.forEach(item => {
        let title = this.setTitle(item.result_type)
        if (title) {
          if (item.result_type === 'video') {
            showModuleList.unshift({
              tname: `${title}`
            })
            video.push(...item.data)
          } else {
            let numResults = item.data.length
            showModuleList.push({
              tname: `${title}(${numResults > 99 ? '99+' : numResults})`
            })
            if (item.result_type === 'bili_user') {
              up.push(...item.data)
            }
          }
        }
      })
      this.show_module_list = showModuleList
      this.list_data.result = data.result
      this.list_data.video = video
      this.list_data.up = up
    },
    setTitle (title) {
      let res = ''
      switch (title) {
        case 'video' :
          res = '综合'
          break
        case 'media_bangumi' :
          res = '番剧'
          break
        case 'bili_user' :
          res = 'UP主'
          break
        case 'media_ft' :
          res = '影视'
          break
      }
      return res
    }
  }
}
</script>

<style scoped>
  .search-box{
    background: #fff;
  }
  .occupy{
    position: relative;
    width: 100%;
    margin: auto;
    padding-top: 0.87rem;
  }
</style>
