<template>
    <div class="search-main">
      <div class="search-wrapper">
        <div class="search">
          <img class="icon-search" src="../common/img/icon_search.png"/>
          <input class="search-box" v-model="valKey" @input="onInput" @focus="onFocus" @keyup="onKeyUp" :placeholder="defaultWord" />
          <img v-if="valKey.length > 0" class="icon-del" src="../common/img/icon_del.png" @click="clear"/>
        </div>
        <div class="cancel" @click="cancel">取消</div>
      </div>
      <div class="suggest-box" v-show="suggestBoxPanel">
        <div class="mask" @click="transSuggestBoxPanel"></div>
        <div class="suggest">
          <div class="suggest-item" v-for="(item, index) in suggest" :key="index" v-html="item.name" @click="suggestClick(item.value)"></div>
        </div>
      </div>
    </div>
</template>

<script>
import {search} from '../api/search.js'
export default {
  name: 'search',
  mixins: [search],
  props: {
    val: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      suggest: [],
      suggestBoxPanel: false,
      defaultWord: '',
      valKey: this.val
    }
  },
  watch: {
    val (val) {
      this.valKey = val
    }
  },
  mounted () {
    this.getDefault().then(res => {
      this.defaultWord = res
    })
  },
  methods: {
    searchClick () {
      this.$emit('searchClick')
    },
    onInput () {
      if (this.valKey) {
        this.debounce(this.handle, 200, this.valKey)
      } else {
        this.$set(this, 'suggest', [])
        this.suggestBoxPanel = false
      }
    },
    onFocus () {
      if (this.valKey) {
        this.onInput()
      }
      if (this.suggest.length > 0) {
        this.suggestBoxPanel = true
      }
    },
    /*
    ** 关键字搜索
    */
    async handle (valKey) {
      let suggest = await this.$get('/suggest', {
        term: valKey,
        func: 'suggest',
        suggest_type: 'accurate',
        sub_type: 'tag',
        main_ver: 'v1',
        bangumi_acc_num: 3,
        special_acc_num: 0,
        upuser_acc_num: 0,
        highlight: undefined,
        tag_num: 10,
        rnd: 0.8653553813790418,
        _: 1577772761861
      })
      if (suggest.code === 0) {
        this.suggestBoxPanel = true
        if (suggest.result.tag && suggest.result.tag.length > 0) {
          this.$set(this, 'suggest', suggest.result.tag)
        } else {
          this.suggest = []
        }
      }
    },
    async searchByKey (valKey) {
      let history = JSON.parse(localStorage.getItem('history')) || []
      if (!history.includes(valKey)) {
        history.push(valKey)
      }
      localStorage.setItem('history', JSON.stringify(history))
      let search = await this.$get('/search', {
        keyword: valKey,
        page: 1,
        pagesize: 20,
        search_type: 'all',
        order: 'totalrank'
      })
      this.suggestBoxPanel = false
      if (search.code === 0) {
        this.$emit('search', search.data)
      }
    },
    transSuggestBoxPanel () {
      this.suggestBoxPanel = !this.suggestBoxPanel
    },
    /**
     * 防抖
     */
    debounce (func, delay, text) {
      clearTimeout(func.timeoutId)
      func.timeoutId = setTimeout(function () {
        /* eslint-disable */
        func.call(null, text)
        /* eslint-disable */
      }, delay)
    },
    onKeyUp (e) {
      if (e.keyCode === 13) {
        this.searchByKey(this.valKey)
      } else {
        this.$emit('clearList', this.valKey)
      }
    },
    suggestClick (name) {
      this.valKey = name
      this.searchByKey(name)
    },
    cancel () {
      this.clear()
      this.$router.back()
    },
    clear () {
      this.$emit('clearVal')
      this.$emit('clearList')
      this.$set(this, 'suggest', [])
      this.suggestBoxPanel = false
    }
  }
}
</script>

<style scoped lang="scss">
  .search-main{
    position: fixed;
    top: 0;
    z-index: 2001;
    width: 100%;
  }
  .search-wrapper{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: .22rem;
    @include background-main-color($theme-pink);
  }
  .search{
    margin: .14rem 0;
    height: .6rem;
    display: flex;
    align-items: center;
    position: relative;
    .search-box{
      height: 100%;
      font-size: .26rem;
      border: none;
      border-radius: .3rem;
      background-color: #fff;
      color: #333;
      outline: none;
      padding-left: .7rem;
      padding-right: 2.3rem;
      &::-webkit-input-placeholder {
        color: #999;
      }
    }
    img{
      width: .24rem;
      height: .24rem;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      &.icon-search{
        left: .24rem;
      }
      &.icon-del{
        right: .08rem;
      }
    }
  }
  .cancel{
    margin: .14rem 0;
    color: #fff;
    font-size: .28rem;
    line-height: .28rem;
    flex: 1;
    text-align: center;
  }
  .suggest-box{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1001;
    .suggest{
      position: absolute;
      top: 0;
      width: 100%;
      background: #fff;
      .suggest-item{
        margin-left: 3.2%;
        height: .88rem;
        line-height: .88rem;
        border-bottom: .01rem solid #ccc;
        & >>> .suggest_high_light {
          @include theme-main-color($theme-pink);
          font-style: normal;
        }
      }
    }
    .mask{
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.23);
    }
  }
</style>
