<template>
  
    <div class="tab-bar-item" @click="itemClick">
      <div v-if="!isActive">
        <slot name="item-icon" ></slot>
      </div>
      <div v-else>
        <slot  name="item-icon-active" ></slot>
      </div>
      <div :style="activestyle">
        <slot name="item-text"></slot>
      </div>
    </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor:{
      type: String,
      default: 'red'
    }
  },
  data() {
    return {
      // isActive : true,
    };
  },
  methods:{
    itemClick(){
      this.$router.replace(this.path).catch(err=>{})
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activestyle(){  //如果isActive为活跃状态 则赋值给style
      return this.isActive ? {color: this.activeColor} : {}
    }
  },

};
</script>
<style  scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
    margin-top: 4px;
  }
  .tab-bar-item img{
    width: 22px;
    height: 22px;
    vertical-align: middle;

  }

</style>