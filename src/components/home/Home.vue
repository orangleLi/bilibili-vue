<template>
    <div class="home">
      <div class="m-bottom">
        <i-header :defaultWord="defaultWord" @searchClick="searchClick"></i-header>
        <category :category="category" @clickCategory="clickCategory"></category>
        <div class="occupy"></div>
        <rotation-chart v-show="!isCategory" :banner="banner"></rotation-chart>
        <rank v-show="!isCategory" :ranking="ranking"></rank>
        <category-list :categoryList="categoryList"></category-list>
      </div>
      <ifooter :active="'主页'"></ifooter>
    </div>
</template>

<script>
import Category from '../../base/category'
import Search from '../../base/search'
import RotationChart from '../../base/rotationChart'
import Rank from './rank'
import IHeader from './iheader'
import {search} from '../../api/search.js'
import Ifooter from '../../base/ifooter'
import CategoryList from '../category/category-list'

export default {
  name: 'Home',
  mixins: [search],
  components: {CategoryList, Ifooter, IHeader, Rank, RotationChart, Search, Category},
  data () {
    return {
      category: [],
      banner: [],
      ranking: [],
      categoryList: [],
      isCategory: false,
      defaultWord: ''
    }
  },
  created () {
    this.getCategoty()
    this.getBanner()
    this.getRanking()
  },
  mounted () {
    this.getDefault().then(res => {
      this.defaultWord = res
    })
  },
  methods: {
    async getCategoty () {
      let category = await this.$get('/category')
      if (category.code === 0) {
        this.category = category.data.catagory
      }
    },
    async getBanner () {
      let banner = await this.$get('/banner')
      if (banner.code === 0) {
        this.banner = banner.data
      }
    },
    async getRanking () {
      this.$alert.showLoading({
        title: '加载中...'
      })
      let ranking = await this.$get('/ranking')
      if (ranking.code === 0) {
        this.ranking = ranking.data.list
      }
      this.$alert.hideLoading()
    },
    setList (video, detail) {
      let newDetail = {}
      for (let key in video) {
        if (detail.hasOwnProperty(key)) {
          newDetail[key] = detail[key]
        }
      }
      return newDetail
    },
    async clickCategory (data) {
      this.$alert.showLoading({
        title: '加载中...'
      })
      if (data) {
        let main = await this.getRegion(data.id)
        let arr = data.ids.reduce((total, cur, index) => {
          total.push(this.getRegion(data.ids[index]))
          return total
        }, [])
        Promise.all(arr).then(res => {
          res.unshift(main)
          this.$set(this, 'categoryList', res)
          this.isCategory = true
          this.$alert.hideLoading()
        }).catch(err => {
          console.log(err)
          this.$alert.hideLoading()
        })
      } else {
        this.$alert.hideLoading()
        this.isCategory = false
      }
    },
    async getRegion (id) {
      let main = await this.$get('/region', {
        rid: id,
        day: 7
      })
      return main.data
    },
    searchClick () {
      this.$router.push('/Search')
    }
  }
}
</script>

<style scoped lang="scss">
  .m-bottom{
    margin-bottom: $m-bottom;
  }
</style>
