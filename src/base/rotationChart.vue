<template>
  <div class="swiper-box">
    <swiper v-if="banner.length>1" :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="item in banner" :key="item.id">
        <img class="onlyOneImg" :src='item.pic' @click="toLink(item.url)">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'rotationChart',
  props: {
    banner: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      swiperCurrent: 0,
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
        speed: 1200,
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  methods: {
    toLink (url) {
      window.location.href = url
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style scoped>
  .swiper-box{
    background: #fff;
  }
  .swiper-container{
    margin: 0 0.24rem;
    height: 2.2rem;
    padding: 0;
    border-radius: 0.16rem;
    box-shadow: 0px 4px 16px #eee;
    background-color: #eee;
  }
  .swiper-wrapper{
    margin: 0;
    padding: 0;
  }
  .swiper-container .onlyOneImg{
    display: block;
    width: 100%;
    height: 100%;
  }
  .swiper-pagination{
    width: auto;
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0,0,0,.5);
    padding: 0.03rem 0.15rem;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
  }
  .swiper-container >>> .swiper-pagination-bullet {
    width: 5px;
    height: 5px;
    background: #fff;
    opacity: 1;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }
  .swiper-container >>> .swiper-pagination-bullet-active {
    background: #de698c;
  }
  .swiper-container-horizontal >>> .swiper-pagination-bullets .swiper-pagination-bullet{
    margin: 0 3px;
  }
</style>
