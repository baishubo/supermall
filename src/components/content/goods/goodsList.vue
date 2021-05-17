<template>
  <div class="goods">

    <goods-list-item v-for="(item) in goods" :key="item.id" :goodsItem="item" />

     
    <!-- {{item}} -->

  </div>
</template>

<script>
import GoodsListItem from './goodsListItem.vue';

export default {
  components: {GoodsListItem},
  props: {
    goods:{
      type: Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
    };
  },
};
</script>
<style  scoped>
.goods{
  width: 100%;
  text-align: center;
  padding: 10px;
  font-size: 12px;
  display: flex;
  flex-wrap: wrap;
}
</style>