import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 是否正常显示，小图为正常状态
    normalDisplay: true,
    // 放大图的位置，0表示不放大，取值为1，2，3，4
    enlargeIndex: 0,
    // 指标选择对话框的显示状态
    chartSeletorVisible: false,
    snapshotVisible: false,
    snapshotId: -1,
    structuralModifyIndex: false,
    // 指标选择框中选中的最新值
    chartSeletorSelected: 'communicationCapacity',
    // 四个空白图中点击添加指标的图位置，0表示没有
    blankPlusClickIndex: 0,
    // 四个位置要显示的图组件,空图为blankPlus，0位置不用
    blankPlusComponent: 'blankPlus',
    chartComponent: 'chart',
    positionDeploy: [
      {},
      {'component': 'blankPlus', 'label': '', 'name': ''},
      {'component': 'blankPlus', 'label': '', 'name': ''},
      {'component': 'blankPlus', 'label': '', 'name': ''},
      {'component': 'blankPlus', 'label': '', 'name': ''}],
    indexInfo: [],
    islogIn: false
  },
  mutations: {
    // vuex 内mutation 方法不可以同级互相调用
    login (state) {
      state.islogIn = true
    },
    // 放大图为全屏，index 为位置索引
    enlarge (state, index) {
      state.normalDisplay = false
      state.enlargeIndex = index
    },
    // 缩小图为四方格图
    normal (state) {
      state.normalDisplay = true
      state.enlargeIndex = 0
    },
    // 删除图
    deleteChart (state, index) {
      var position = state.positionDeploy[index]
      var oldGraph = position.label

      Vue.set(position, 'component', state.blankPlusComponent)
      Vue.set(position, 'label', '')
      Vue.set(position, 'name', '')

      state.indexInfo.forEach(obj => {
        obj.sub.forEach(secObj => {
          secObj.sub.forEach(leaf => {
            if (leaf.metric === oldGraph) {
              leaf.selected = false
            }
          })
        })
      })
    },
    showChartSeletor (state, index) {
      state.chartSeletorVisible = true
      state.blankPlusClickIndex = index
    },
    hideChartSeletor (state) {
      state.chartSeletorVisible = false
    },
    showSnapshot (state, id) {
      state.snapshotVisible = true
      state.snapshotId = id
    },
    hideSnapshot (state) {
      state.snapshotVisible = false
    },
    // 添加监控图
    addChart (state, selectedGraph) {
      var position = state.positionDeploy[state.blankPlusClickIndex]
      var oldGraph = position.label
      Vue.set(position, 'component', state.chartComponent)
      Vue.set(position, 'label', selectedGraph)
      state.indexInfo.forEach(obj => {
        obj.sub.forEach(secObj => {
          secObj.sub.forEach(leaf => {
            if (leaf.metric === selectedGraph) {
              leaf.selected = true
              Vue.set(position, 'name', leaf.name)
            }
            if (leaf.metric === oldGraph) {
              leaf.selected = false
            }
          })
        })
      })
    },
    // 添加监控图
    addCookieChart (state, { index, selectedGraph }) {
      var position = state.positionDeploy[index]
      var oldGraph = position.label
      Vue.set(position, 'component', state.chartComponent)
      Vue.set(position, 'label', selectedGraph)
      state.indexInfo.forEach(obj => {
        obj.sub.forEach(secObj => {
          secObj.sub.forEach(leaf => {
            if (leaf.metric === selectedGraph) {
              leaf.selected = true
              Vue.set(position, 'name', leaf.name)
            }
            if (leaf.metric === oldGraph) {
              leaf.selected = false
            }
          })
        })
      })
    },
    modifyIndex (state) {
      state.structuralModifyIndex = !state.structuralModifyIndex
    },
    initIndexInfo (state, info) {
      state.indexInfo = info
    }
  }
})
export default store
