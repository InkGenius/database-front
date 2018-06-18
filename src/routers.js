// 定义路由组件
// require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
const Article = resolve => {
  require.ensure(['./views/Article.vue'], () => {
    resolve(require('./views/Article.vue'))
  })
}

const Report = resolve => {
  require.ensure(['./views/Report.vue'], () => {
    resolve(require('./views/Report.vue'))
  })
}

const Comparison = resolve => {
  require.ensure(['./views/Comparison.vue'], () => {
    resolve(require('./views/Comparison.vue'))
  })
}

// 定义路由
const routers = [{
  path: '/',
  name: 'home',
  component: Article,
  meta: {keepAlive: true}
}, {
  path: '/article',
  name: 'article',
  component: Article,
  meta: {keepAlive: true}
}, {
  path: '/report',
  name: 'report',
  component: Report,
  meta: {keepAlive: false}
}, {
  path: '/comparison',
  name: 'comparison',
  component: Comparison,
  meta: {keepAlive: false}
}]

export default routers
