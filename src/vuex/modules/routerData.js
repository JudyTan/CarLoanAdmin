import {defaultRouter,addRouter} from '@/router/index'
import http from '../../http'
import store from '../index'
import Layout from '@/views/layout/layout'
const _import = require('@/router/_import_' + process.env.NODE_ENV)//获取组件的方法
const routerData = {
  state: {
    routers: [],
    addRouters: []
  },
  mutations: {
    setRouters: (state, routers) => {
      console.log("给state的addrouter赋值啦"+routers)
      state.addRouters = routers  // 保存动态路由用来addRouter
      state.routers = defaultRouter.concat(routers) // 所有有权限的路由表，用来生成菜单列表
    }

  },
  actions: {
    newRoutes ({commit}, role) {
      //  通过递归路由表，删除掉没有权限的路由
      function eachSelect (routers, userRole) {
        for (let j = 0; j < routers.length; j++) {
          if (routers[j].meta && routers[j].meta.role.length && routers[j].meta.role.indexOf(userRole) === -1) {
            routers.splice(j, 1)
            j = j !== 0 ? j - 1 : j
          }
          if (routers[j].component) {
            if (routers[j].component === 'Layout') {//Layout组件特殊处理
              console.log(routers[j].component)
              routers[j].component = Layout
            } else {
              console.log("route.component")
              console.log(routers[j].component)
              console.log(routers[j].path)
              console.log(routers[j].name)
              console.log('@/views/article' +routers[j].path)
              routers[j].component = _import(routers[j].component)
            }
          }
          if (routers[j].children && routers[j].children.length) {
            routers[j].children=eachSelect(routers[j].children, userRole)
          }
        }

        return routers;
      }
      // 拷贝这个数组是因为做权限测试的时候可以从低级切回到高级角色，仅限演示，正式开发时省略这步直接使用 addRouter
      // 仅限演示
      // let newArr = [...addRouter]
      // eachSelect(newArr, role)
      // commit('setRouters', newArr)
      // 正式开发
      //动态查找
      eachSelect(store.getters.addRouters, role)
      console.log("====="+store.getters.addRouters)
      console.log(store.getters.addRouters)
      commit('setRouters', store.getters.addRouters)
    },

    loadAddRouters({commit}, role){
      let url='auth/user/routers';
      let addRouter;
      http.fetchPost(url,store.getters.info.role).then((response)=>{
        addRouter= response.data.data;

        console.log("*********************************************************");
        console.log(addRouter.toString());
        store.commit('setRouters', addRouter)
        store.dispatch('newRoutes', store.getters.info.role)
      })
    }

  }
}

export default routerData
