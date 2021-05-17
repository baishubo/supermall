<template>
  <div class="home-swiper">
    <swiper>
      <swiper-item v-for="item in banners" :key="item.id">
        <img :src="item.image" @load="imageLoad" >
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
  name: 'HomeSwiper',
  components: {Swiper,SwiperItem},
  props: {
    banners:{
      type: Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      isLoad: false
    };
  },
  methods:{
    //homeSwoper =>home
    imageLoad(){
      if(!this.isLoad){
        this.$emit('swiperImageLoad');
        this.isLoad = true
      }
    }
  }

};
</script>
<style  scoped>
</style>