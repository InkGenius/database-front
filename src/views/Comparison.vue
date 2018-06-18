<template lang="html">
  <div class="dashboard">
    <div class="container">
      <div>
        <el-row>
          <el-col :span="12">
            <div class="query_time" style="width: 100%;height:400px;"></div>
          </el-col>
          <el-col :span="12">
            <el-table :data="tableData" border stripe style="width: 100%;margin-top:50px">
              <el-table-column
                prop="query"
                label="查询方式"
                header-align = "center"
                min-width="180">
              </el-table-column>
              <el-table-column
                prop="time"
                label="查询时间"
                header-align = "center"
                min-width="180">
              </el-table-column>
              <el-table-column
                prop="cpu"
                label="cpu"
                header-align = "center"
                min-width="180">
              </el-table-column>
              <el-table-column
                prop="memory"
                label="内存消耗"
                header-align = "center"
                min-width="180">
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-row>
          <el-col :span="12"><div class="cpu_useage" style="width: 100%;height:400px;"></div></el-col>
          <el-col :span="12"><div class="memory_useage" style="width: 100%;height:400px;"></div></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import echarts from 'echarts'
export default {
  data () {
    return {
      loading: true,
      queryTimeChart: '',
      cpuUseageChart: '',
      memoryUseageChart: '',
      tableData: [{
        query: '实验1',
        time: '12',
        cpu: '59%',
        memory: '100'
      }, {
        query: '实验2',
        time: '12',
        cpu: '59%',
        memory: '100'
      }, {
        query: '实验3',
        time: '12',
        cpu: '59%',
        memory: '100'
      }]
    }
  },
  methods: {
    init () {
      window.addEventListener('resize', function () {
        this.queryTimeChart.resize()
        this.cpuUseageChart.resize()
        this.memoryUseageChart.resize()
      }.bind(this))
    },
    getQueryTimeChartOption () {
      var option = {
        title: {
          text: '查询时间对比'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['Mysql', 'Hive']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['查询1', '查询2', '查询3', '查询4', '查询5', '查询6', '查询7', '查询8', '查询9', '查询10']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Mysql',
            type: 'bar',
            data: [320, 332, 301, 320, 332, 301, 320, 332, 301, 120]
          },
          {
            name: 'Hive',
            type: 'bar',
            data: [120, 132, 101, 320, 332, 301, 320, 332, 301, 320]
          }
        ]
      }
      return option
    },
    getMemoryUseageChartOption () {
      var option = {
        title: {
          text: '内存使用对比'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['Mysql', 'Hive']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['查询1', '查询2', '查询3', '查询4', '查询5', '查询6', '查询7', '查询8', '查询9', '查询10']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Mysql',
            type: 'bar',
            data: [30, 33, 31, 30, 32, 1, 30, 32, 1, 10]
          },
          {
            name: 'Hive',
            type: 'bar',
            data: [30, 32, 30, 32, 32, 1, 30, 32, 31, 20]
          }
        ]
      }
      return option
    },
    getCpuUseageChartOption () {
      var option = {
        title: {
          text: 'cpu使用对比'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['Mysql', 'Hive']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['查询1', '查询2', '查询3', '查询4', '查询5', '查询6', '查询7', '查询8', '查询9', '查询10']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Mysql',
            type: 'bar',
            data: [20, 332, 301, 320, 332, 301, 320, 332, 301, 12]
          },
          {
            name: 'Hive',
            type: 'bar',
            data: [32, 33, 31, 32, 32, 1, 32, 332, 30, 12]
          }
        ]
      }
      return option
    }
  },
  computed: {
  },
  mounted () {
    this.queryTimeChart = echarts.init(document.querySelector('.query_time'))
    this.queryTimeChart.setOption(this.getQueryTimeChartOption())

    this.cpuUseageChart = echarts.init(document.querySelector('.cpu_useage'))
    this.cpuUseageChart.setOption(this.getCpuUseageChartOption())

    this.memoryUseageChart = echarts.init(document.querySelector('.memory_useage'))
    this.memoryUseageChart.setOption(this.getMemoryUseageChartOption())
    this.init()
  },
  components: {
  }
}

</script>
<style>
  .container{
    width:90%;
    margin:60px auto 30px 155px;
    text-align: center;
  }
</style>
