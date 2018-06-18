<template lang="html">
  <div>
    <div>
      <el-menu default-active="1" class="el-menu-vertical-demo"  background-color="#545c64"
      text-color="#fff" active-text-color="#ffd04b"  @select="handleSelect">
        <el-submenu index="1">
          <template slot="title">
            <span>1-10周</span>
          </template>
            <el-menu-item v-for="index in 10" :key="index" :index="index+ ''">第{{index}}周</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <span slot="title">11-20周</span>
          </template>
          <el-menu-item v-for="index in 20" v-if='index > 10' :key="index" :index="index + ''">第{{index}}周</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <span slot="title">21-30周</span>
          </template>
          <el-menu-item v-for="index in 30" v-if='index > 20' :key="index" :index="index + ''">第{{index}}周</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <span slot="title">31-40周</span>
          </template>
          <el-menu-item v-for="index in 40" v-if='index > 30' :key="index" :index="index + ''">第{{index}}周</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <span slot="title">41-50周</span>
          </template>
          <el-menu-item v-for="index in 50" v-if='index > 40' :key="index" :index="index + ''">第{{index}}周</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">
            <span slot="title">51-53周</span>
          </template>
          <el-menu-item v-for="index in 53" v-if='index > 50' :key="index" :index="index + ''">第{{index}}周</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  <div class="container">
    <span class="week_head">第{{weekNumner}}周-周报</span>
    <div>
      <el-row>
        <el-col :span="24"><div class="top-title">一周内各小时用户活跃（行为）的期望和标准差</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="user_statistics" style="width: 100%;height:400px;"></div>
        </el-col>
        <el-col :span="12">
          <el-table :data="tableData" border stripe style="width: 100%;margin-top:50px">
            <el-table-column
              prop="userBehavior"
              label="用户行为"
              header-align = "center"
              min-width="180">
            </el-table-column>
            <el-table-column
              prop="expectation"
              label="期望"
              header-align = "center"
              min-width="180">
            </el-table-column>
            <el-table-column
              prop="variance"
              label="方差"
              header-align = "center"
              min-width="180">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row>
        <el-col :span="24"><div class="top-title">用户每天活跃小时统计</div></el-col>
      </el-row>
      <div class="user_active" style="width: 100%;height:500px;"></div>
    </div>

    <div>
      <el-row>
        <el-col :span="24"><div class="top-title">最活跃的前10用户和领域</div></el-col>
      </el-row>

      <el-row>
        <el-col :span="12"><div class="user_top10" style="width: 100%;height:400px;"></div></el-col>
        <el-col :span="12"><div class="field_top10" style="width: 100%;height:400px;"></div></el-col>
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
      userTop10Chart: '',
      userActiveChart: '',
      fieldTop10Chart: '',
      userStatisticsChart: '',
      tableData: [],
      weekNumner: ''
    }
  },
  methods: {
    // TODO:动态获取周报，使用keyPath作为查询id
    handleSelect (key, index) {
      this.getWeekReport(key)
    },
    init () {
      window.addEventListener('resize', function () {
        this.userTop10Chart.resize()
        this.userActiveChart.resize()
        this.fieldTop10Chart.resize()
        this.userStatisticsChart.resize()
      }.bind(this))
    },
    getUserActiveChartOption (dates, hotHours, coldHours) {
      var option = {
        title: {
          text: '用户每天活跃小时统计'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['用户活跃最热小时', '用户活跃最冷小时']
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
          data: dates
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '用户活跃最热小时',
            type: 'line',
            data: hotHours
          },
          {
            name: '用户活跃最冷小时',
            type: 'line',
            data: coldHours
          }
        ]
      }
      return option
    },
    getUserTop10Option (userIds, scores) {
      var option = {
        title: {
          text: '最活跃的前10名用户'
        },
        xAxis: {
          type: 'category',
          data: userIds
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: scores,
          type: 'bar'
        }]
      }
      return option
    },
    getFieldTop10Option (domains, scores) {
      var option = {
        title: {
          text: '最活跃的前10领域'
        },
        xAxis: {
          type: 'category',
          data: domains
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: scores,
          type: 'bar'
        }]
      }
      return option
    },
    getUserStatisticsChartOption (behaviorKeys, expectations, variances) {
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['期望', '方差']
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
            data: behaviorKeys
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '期望',
            type: 'bar',
            data: expectations
          },
          {
            name: '方差',
            type: 'bar',
            data: variances
          }
        ]
      }
      return option
    },
    getWeekReport (weekID) {
      this.weekNumner = weekID + ''
      var url = window.g.SERVER_HOST + '/user/report/' + weekID
      axios.get(url, {
      }).then((res) => {
        var behaviors = res.data.behaviors
        var behaviorKeys = []
        var expectations = []
        var variances = []
        behaviors.forEach(obj => {
          behaviorKeys.push(obj.userBehavior)
          expectations.push(obj.expectation)
          variances.push(obj.variance)
          this.userStatisticsChart.setOption(this.getUserStatisticsChartOption(behaviorKeys, expectations, variances))
          this.tableData = behaviors
        })

        var hours = res.data.hours
        var dates = []
        var hotHours = []
        var coldHours = []
        hours.forEach(obj => {
          dates.push(obj.date)
          hotHours.push(obj.hotHour)
          coldHours.push(obj.coldHour)
          this.userActiveChart.setOption(this.getUserActiveChartOption(dates, hotHours, coldHours))
          this.tableData = behaviors
        })

        var topUsers = res.data.topUser
        var userIds = []
        var scores = []
        topUsers.forEach(obj => {
          userIds.push(obj.key)
          scores.push(obj.score)
          this.userTop10Chart.setOption(this.getUserTop10Option(userIds, scores))
        })

        var topDomains = res.data.topDomain
        var domains = []
        var domainScores = []
        topDomains.forEach(obj => {
          domains.push(obj.key)
          domainScores.push(obj.score)
          this.fieldTop10Chart.setOption(this.getFieldTop10Option(domains, scores))
        })
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  computed: {
  },
  mounted () {
    this.userActiveChart = echarts.init(document.querySelector('.user_active'))
    this.userTop10Chart = echarts.init(document.querySelector('.user_top10'))
    this.fieldTop10Chart = echarts.init(document.querySelector('.field_top10'))
    this.userStatisticsChart = echarts.init(document.querySelector('.user_statistics'))
    this.init()
    this.getWeekReport(1)
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
  .top-title {
    font-size: 18px;
    text-align: center;
    line-height: 36px;
    background: #99a9bf;
    border-radius: 4px;
    min-height: 36px;
    margin:30px auto 30px auto;
  }
  .el-menu-vertical-demo{
    position: fixed;
    top: 50px;
    left: 0;
    width: 150px;
    height: 100%;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    background-color: #fff;
    z-index: 100;
    font-family: "Microsoft Yahei", sans-serif;
  }
  .el-submenu .el-menu-item {
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    min-width: 100px;
  }
  .week_head{
    font-size: 30px;
  }
</style>
