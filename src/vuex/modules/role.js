import store from '../index'
import router from '../../router/index'
import https from '../../http'
export default {
  state: {
    info: ''  // 每次刷新都要通过token请求个人信息来筛选动态路由
  },
  mutations: {
    getInfo (state, token) {
      // 省略 axios 请求代码 通过 token 向后台请求用户权限等信息，这里用假数据赋值
      // let params ={'username': 'admin', 'password': 'admin123', 'rememberMe': 'true','isMobile':'1'}

      console.log("this is role.js");
      // store.getters.username;
      // https.fetchPost('/login',params).then( data=> {
      //   this.base.token = data.data.token
      //   console.log("this.base.tokenthis.base.token",this.base.token)
      //   // this.indexPost2(this.rres)
      // })
      state.info = {
        role: 'superAdmin',
        permissions: '超级管理员'
      }
      sessionStorage.setItem('info', JSON.stringify(store.getters.info))
    },
    setRole (state, options) {  // 切换角色，测试权限管理
      state.info = {
        role: options.role,
        permissions: options.permissions
      }
      sessionStorage.setItem('info', JSON.stringify(store.getters.info));
      store.dispatch('newRoutes', options.role)
      router.addRoutes(store.getters.addRouters)

    }
  },
  actions: {
    getInfo ({commit}, token) {
      commit('getInfo', token)
    },
    setRole ({commit}, options){
      // 权限测试
      commit('setRole', options)
    }
  }
}
