<template>
  <div class="recommend">
     <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
       <a :href="item.link">
         <img :src="item.image">
         <div>{{item.title}}</div>
       </a>
     </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    recommends:{
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
.recommend{
  display: flex;
  text-align: center;
  font-size: 12px;
  width: 100%;
  padding: 20px 0;
  border-bottom: 12px solid #eee;
   /* justify-content: space-around; */
   flex-wrap: wrap;
}
.recommend-item{
  flex: 1;
}
.recommend-item img{
  width: 65px;
  height: 65px;
}
</style>