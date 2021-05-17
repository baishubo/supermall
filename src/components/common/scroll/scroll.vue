<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  components: {},
  props: {
    probeType:{
      type : Number,
      default: 0,
    },
    pullUpLoad:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll:null
    };
  },
  mounted(){

    //创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      probeType: this.probeType ,
      pullUpLoad: this.pullUpLoad,
      disableTouch: false
    }),
        // console.log(this.scroll);
    //监听滚动位置
    this.scroll.on('scroll',(position) =>{
      this.$emit('contentScroll', position);
    })
    //监听上拉加载更多
    this.scroll.on('pullingUp',() =>{
      //发送到父组件
      this.$emit('pullingUp');
    })
  },
  methods:{
    //返回顶部
    scrollTo(x=0 ,y=0 ,time = 300){
      this.scroll.scrollTo(x, y, time)
    },
    //监听到上拉 进行初始化
    finishPullup(){
      this.scroll.finishPullUp()
    },
    //：重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
    refresh(){
      this.scroll.refresh()
    },
    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    }
  }
};
</script>
<style  scoped>

</style>