<template>
<div class="chart-warp">
  <div class="main" style="width: 100%;height:500px;">dsdfasd</div>
</div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      myChart: {},
      option: {},
      interval: {},
      oldChartId: {},
      socket: {}
    }
  },
  created () {
  },
  methods: {
    // 表格自适应窗口
    init () {
      window.addEventListener('resize', function () {
        this.myChart.resize()
      }.bind(this))
    },
    getChartOption () {
      var option = {
        title: {
          text: '文章活跃数据'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['发表文章数', '浏览文章数', '评论文章数']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2018-6-6', '2018-6-7', '2018-6-8', '2018-6-9', '2018-6-10', '2018-6-11', '2018-6-12']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '发表文章数',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '浏览文章数',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '评论文章数',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
          }
        ]
      }
      return option
    }
  },
  updated: function () {
  },
  mounted () {
    var position = '.main'
    var target = document.querySelector(position)
    this.myChart = echarts.init(target)
    this.option = this.getChartOption()
    this.myChart.setOption(this.option)
    this.init()
  },
  destroyed: function () {
  }
}
</script>

<style>
#main{
   width:100%;
   height:100%;
}
</style>
