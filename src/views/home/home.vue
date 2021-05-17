<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
          <tab-control :titles="['流行','新款','精选']" 
        @tebClick="tebClick" 
        ref="tabControl1"
        class="istab-control"  v-show="isTabFixed" />    
    <BSscroll class="a" ref="scroll" 
              :probeType="3" @contentScroll="contentScroll"
              :pull-up-load="true" 
              @pullingUp="loadMore">
      <template> 
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
        <home-recommend-view :recommends="recommends" />
        <feature-view />
        <tab-control :titles="['流行','新款','精选']" 
        @tebClick="tebClick" 
        ref="tabControl2" />
        <goods-list-item :goods="showGoods" />
      </template>
    </BSscroll>
    <!-- .native 只有当我们监听组件原生时间 ，必须加上native才能监听 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  
  </div>

</template>

<script>


import HomeSwiper from './childcomps/HomeSwiper'
import HomeRecommendView from './childcomps/HomeRecommendView.vue'
import FeatureView from './childcomps/FeatureView.vue'
//可复用
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsListItem from 'components/content/goods/goodsList'
import BSscroll from 'components/common/scroll/scroll'
import BackTop from 'components/content/backTop/BackTop.vue'

//网络请求
import {getHomeMultidata ,getHomeGoods} from 'network/home'
// console.log(NavBar);


export default {
  name: 'Home',
  data () {
    return {
      banners: [],
      recommends: [],
      goods:{
        'syn':{page:0,list: []},
        'new':{page:0,list: []},
        'sell':{page:0,list: []},
      },
      currentType: 'syn',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
   components: {
    HomeSwiper,
    HomeRecommendView, 
    FeatureView,

    NavBar,
    TabControl,
    GoodsListItem,
    BSscroll,
      BackTop
    },
   created(){
    this.getHomeMultidata()
    this.getHomeGoods('syn')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
   
   },
   mounted(){
      // 3.监听item图片加载完成 通过事件总线接受goodsListItem =>home
    this.$bus.$on('itemImageLoad',() =>{
      // console.log('-------');
      this.$refs.scroll.refresh()
    })
    // console.log(this.$refs.tabControl.$el.offsetTop);
   },
   computed:{
     showGoods(){
       return this.goods[this.currentType].list
     }
   },
   activated(){
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
   },
   deactivated(){
     this.saveY = this.$refs.scroll.getScrollY()
   },
   methods:{
     swiperImageLoad(){
        // console.log(this.$refs.tabControl.$el.offsetTop);
       this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
     },
     /**
     * 事件监听相关的方法
     */
      tebClick(index){
        // switch(index){
        //   case 0:
        //     this.currentType = 'syn'
        //   break;
        //   case 1:
        //     this.currentType = 'new'
        //   break;
        //   case 2:
        //     this.currentType = 'sell'
        //   break;
        // }
        // console.log(index);
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
        // console.log(this.$refs.tabControl1);
        this.currentType = Object.keys(this.goods)[index]
      

      },
      //返回到顶部
      backClick(){
        // console.log("backClick");
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      //子组件发送监听滚动的位置
      contentScroll(position){
        // console.log(position);
        //判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000
        //决定tabControl是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      //上拉加载更多
      loadMore(){
        console.log('上拉加载更多');
        this.getHomeGoods(this.currentType)
      },
     /** 
     *  网络请求相关的方法
     */
     getHomeMultidata(){
       getHomeMultidata()
       .then(res => {
          //  console.log(res);
         this.banners = res.data.data.banner.list
         this.recommends = res.data.data.recommend.list
       })
     },
     getHomeGoods(type){ 
       let page = this.goods[type].page + 1
       getHomeGoods(page ,type)
       .then(res =>{
         this.goods[type].list.push(...res.data)
        //  this.goods[type].list.concat(...res.data) 这个结果不会显示到vue插件里 惰性的
         this.goods[type].page += 1
         this.$refs.scroll.finishPullup()

        // console.log(this.$refs.tabControl.$el.offsetTop);

       })
     }
   }

}
</script>

<style scoped>

 .istab-control{
   position: fixed;
   top: 42px;
   left: 0;
   right: 0;
   z-index: 1;
   background: #fff;
 }
  .a{
  height: calc(100vh - 49px);
  /* height: 400px; */
  width: 100%;
  position: relative;
  overflow: hidden;
  /* top: 100px; */
   
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    /* position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 2; */
  }

</style>
