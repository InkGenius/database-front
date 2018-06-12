<template>
 <div id="app">
    <div v-if="loginStatus">
      <!-- 导航栏 -->
      <myHead></myHead>
      <div id="mainApp">
        <keep-alive>
          <router-view  v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <!-- 这里不会被keepalive -->
        <router-view  v-if="!$route.meta.keepAlive"></router-view>
      </div>
    </div>
    <div v-else>
      <login></login>
    </div>
</div>
</template>

<script>
import myHead from './components/Header'
import login from './components/Login'

export default {
  components: {
    myHead,
    login
  },
  created () {
    // var session = this.$cookie.get('sessionID')
    // if (session) {
      this.$store.commit('login')
    // }
  },
  computed: {
    loginStatus: {
      get: function () {
        return this.$store.state.islogIn
      },
      set: function () {}
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
