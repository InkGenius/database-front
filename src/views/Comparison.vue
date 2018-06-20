<template lang="html">
  <div class="dashboard">
    <div class="container">
      <div>
        <el-row>
          <el-col :span="12">
            <div class="query_time" style="width: 100%;height:400px;"></div>
          </el-col>
          <el-col :span="12">
            <el-table :data="mysqlTableData" border stripe style="width: 100%;margin-top:50px">
              <el-table-column
                prop="name"
                label="名称"
                header-align = "center"
                min-width="150">
              </el-table-column>
              <el-table-column
                prop="method"
                label="查询方式"
                header-align = "center"
                min-width="150">
              </el-table-column>
              <el-table-column
                prop="time"
                label="查询时间"
                header-align = "center"
                min-width="150">
              </el-table-column>
              <el-table-column
                prop="cpu"
                label="cpu"
                header-align = "center"
                min-width="150">
              </el-table-column>
              <el-table-column
                prop="memory"
                label="内存消耗"
                header-align = "center"
                min-width="150">
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-row>
          <el-col :span="12"><div class="cpu_useage" style="width: 100%;height:400px;"></div></el-col>
           <el-col :span="12">
            <el-table :data="hiveTableData" border stripe style="width: 100%;margin-top:50px">
              <el-table-column
                prop="name"
                label="名称"
                header-align = "center"
                min-width="150">
              </el-table-column>
              <el-table-column
                prop="method"
                label="查询方式"
                header-align = "center"
                min-width="150">
              </el-table-column>
              <el-table-column
                prop="time"
                label="查询时间"
                header-align = "center"
                min-width="150">
              </el-table-column>
              <el-table-column
                prop="cpu"
                label="cpu"
                header-align = "center"
                min-width="150">
              </el-table-column>
              <el-table-column
                prop="memory"
                label="内存消耗"
                header-align = "center"
                min-width="150">
              </el-table-column>
            </el-table>
          </el-col>
          </el-row>
        <el-row>
          <el-col :span="24"><div class="memory_useage" style="width: 100%;height:400px;"></div></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import echarts from 'echarts'
export default {
  data () {
    return {
      loading: true,
      queryTimeChart: '',
      cpuUseageChart: '',
      memoryUseageChart: '',
      hiveTableData: [],
      mysqlTableData: []
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
    getQueryTimeChartOption (hiveTimes, mysqlTimes) {
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
            data: mysqlTimes
          },
          {
            name: 'Hive',
            type: 'bar',
            data: hiveTimes
          }
        ]
      }
      return option
    },
    getMemoryUseageChartOption (hiveMemorys, mysqlMemorys) {
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
            data: mysqlMemorys
          },
          {
            name: 'Hive',
            type: 'bar',
            data: hiveMemorys
          }
        ]
      }
      return option
    },
    getCpuUseageChartOption (hiveCpus, mysqlCpus) {
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
            data: mysqlCpus
          },
          {
            name: 'Hive',
            type: 'bar',
            data: hiveCpus
          }
        ]
      }
      return option
    },
    getQueryComparison () {
      var url = window.g.SERVER_HOST + '/user/comparison'
      axios.get(url, {
      }).then((res) => {
        var hives = res.data.hive
        this.hiveTableData = hives
        var hiveTimes = []
        var hiveCpus = []
        var hiveMemorys = []
        var hivaNames = []
        hives.forEach(obj => {
          hiveTimes.push(obj.time)
          hiveCpus.push(obj.cpu)
          hiveMemorys.push(obj.memory)
          hivaNames.push(obj.name)
        })

        var mysqls = res.data.mysql
        this.mysqlTableData = mysqls
        var mysqlTimes = []
        var mysqlCpus = []
        var mysqlMemorys = []
        var mysqlNames = []
        mysqls.forEach(obj => {
          mysqlTimes.push(obj.time)
          mysqlCpus.push(obj.cpu)
          mysqlMemorys.push(obj.memory)
          mysqlNames.push(obj.name)
        })
        this.queryTimeChart.setOption(this.getQueryTimeChartOption(hiveTimes, mysqlTimes))
        this.cpuUseageChart.setOption(this.getCpuUseageChartOption(hiveCpus, mysqlCpus))
        this.memoryUseageChart.setOption(this.getMemoryUseageChartOption(hiveMemorys, mysqlMemorys))
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  computed: {
  },
  mounted () {
    this.queryTimeChart = echarts.init(document.querySelector('.query_time'))
    this.cpuUseageChart = echarts.init(document.querySelector('.cpu_useage'))
    this.memoryUseageChart = echarts.init(document.querySelector('.memory_useage'))
    this.getQueryComparison()
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
