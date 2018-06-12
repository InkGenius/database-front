<template>
  <div>
    <el-menu :router="true" :default-active="$route.path" style="background-color: #fff;position: fixed;" class="top-container" mode="horizontal" >
      <div class="nva-title">数据仓库与大数据实验</div>
      <el-menu-item style="height: 50px;line-height: 50px;" v-for="(item, index) in items" :key="index" :index="'/'+item.ad" >{{item.name}}</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    return {
      items: [{name: '文章活跃数据', ad: ''}, {name: '周报', ad: 'report'}, {name: '性能对比', ad: 'comparison'}]
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  .top-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    background-color: #fff;
    z-index: 100;
    font-family: "Microsoft Yahei", sans-serif;
  }
  .custom-item{
    height: 50px;
    line-height: 50px;
  }
  .nva-title{
    float:left;
    height: 50px;
    line-height: 50px;
    position: relative;
    font-size: 20px;
    margin:0px 10px;
  }
  .nva-sign{
    float:right;
    height: 50px;
    line-height: 50px;
    position: relative;
    font-size: 18px;
    margin:0px 10px;
  }
  .nva-sign .simulaiton-sign{
    margin-right: 5px;
  }
  .simulaiton-on{
    margin: 5px;
  }
</style>
