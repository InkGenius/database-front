<template>
<div class="chart-warp">
  <div>
    <el-row class="search-area">
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="4">
        <div class="block">
          <el-date-picker v-model="period" type="daterange" :default-value = "startDate" format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </div>
      </el-col>
      <el-col :span="4">
        <el-select v-model="domain" filterable placeholder="请选择">
          <el-option v-for="item in domainOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-button icon="el-icon-search" circle @click="query()"></el-button>
      </el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
  </div>
  <div class="main" style="width: 100%;height:500px;"></div>
</div>
</template>

<script>
import echarts from 'echarts'
import axios from 'axios'
export default {
  data () {
    return {
      myChart: {},
      option: {},
      startDate: '',
      url: window.g.SERVER_HOST + '/user/active',
      domainUrl: window.g.SERVER_HOST + '/article/domain',
      period: '',
      domain: '',
      domainOptions: {}
    }
  },
  components: {
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
    query () {
      console.log(this.period)
      axios.post(this.url, {
        startDate: this.period[0],
        endDate: this.period[1],
        domain: this.domain
      }).then((res) => {
        var dates = []
        var views = []
        var publishs = []
        var comments = []

        res.data.forEach(obj => {
          dates.push(obj.date)
          views.push(obj.view)
          publishs.push(obj.publish)
          comments.push(obj.comment)
        })
        this.option = this.getChartOption(dates, views, publishs, comments)
        this.myChart.setOption(this.option)
      }).catch(function (error) {
        console.log(error)
      })
    },
    getChartOption (dates, views, publishs, comments) {
      var option = {
        title: {
          text: this.domain + '--文章活跃数据'
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
          data: dates
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '发表文章数',
            type: 'line',
            data: publishs
          },
          {
            name: '浏览文章数',
            type: 'line',
            data: views
          },
          {
            name: '评论文章数',
            type: 'line',
            data: comments
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
    this.init()
    axios.get(this.domainUrl, {
    }).then((res) => {
      var temp = {}
      this.domainOptions = []
      res.data.forEach(obj => {
        temp.label = obj
        temp.value = obj
        this.domainOptions.push(temp)
      })
      console.log(this.domainOptions)
    }).catch(function (error) {
      console.log(error)
    })
    this.startDate = new Date()
    this.startDate.setFullYear(2015, 0, 1)
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

.search-area{
  margin-top:100px;
  margin-bottom: 20px;
}

 /* .el-row {
    margin-bottom: 20px;
  } */
  .el-col {
    border-radius: 4px;
    margin-right: 10px;
  }
  /* .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  } */
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
