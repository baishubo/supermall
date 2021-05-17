<template>
  <div class="goodListItem" @click="itemClick">
    <img :src="goodsItem.goodsLogo" alt="goodsItem.goodsName" @load="imageLoad">
    <p>{{goodsItem.goodsName}}</p>
    <span class="price">{{goodsItem.goodsOldPrice}}</span>
    <span class="collect">{{goodsItem.goodsFav}}</span>
    <!-- <img src="../../../assets/img/common/collect.svg"> -->
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    goodsItem:{
      type: Object,
      default(){
        return{}
      }
    }
  },
  data() {
    return {
    };
  },
  methods:{
    imageLoad(){
      //事件总线$bus   =>home
      this.$bus.$emit('itemImageLoad');
    },
    itemClick(){
      this.$router.push('/detail/'+this.goodsItem.goodsId)
    }
  }
};
</script>
<style  scoped>
.goodListItem p{
  display:block;
  width: 100%;

    white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

}
.goodListItem span.price{
    color: var(--color-high-text);
}
.goodListItem span.collect::before{
content: " ";
/* display: block; */
height: 10px;
width: 10px;
background: url('../../../assets/img/common/collect.svg') no-repeat;
background-size: 100%;
display: inline-block;
margin-left: 10px;
}
.goodListItem {
  width: 50%;
  flex: 1;
  padding: 0 8px;
  
}
.goodListItem img{
  width: 100%;
  border-radius: 12px;
}
</style>