import axios from 'axios'
import qs from 'qs'
import {Message} from 'element-ui'
import store from './vuex'

axios.defaults.timeout = 5000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';        //配置请求头
axios.defaults.baseURL = '';   //配置接口地址
// 是否允许跨域
axios.defaults.withCredentials=true;
// axios初始化：延迟时间，主路由地址
let instance = axios.create({
  // baseURL: 'http://192.168.102.44:8088/',
  baseURL: 'http://localhost:8080/',
  timeout: 10000,
  withCredentials: false
});
// POST传参序列化(添加请求拦截器)
instance.interceptors.request.use((config) => {
  //在发送请求之前做某件事
  // let pathname = config.url;
  // let token = store.getters.token
  // if(pathname !== "auth/user/login" ){
  //   config.headers.Authorization ='Bearer ' + token;
  // }

  if(config.method  === 'post'){
    config.data = qs.stringify(config.data);
  }
  return config;
},(error) =>{
  console.log('错误的传参')
  return Promise.reject(error);
});

//返回状态判断(添加响应拦截器)
instance.interceptors.response.use((res) =>{
  //对响应数据做些事
  let code=res.data.code;
  if(code!=200){

    return false
  }
  // if(!res.data.success){
  //   return Promise.resolve(res);
  // }

    return Promise.resolve(res);

  // return res;
}, (error) => {
  console.log('网络异常')
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '错误请求';
        break;
      case 401:
        error.message = '未授权，请重新登录';
        break;
      case 403:
        error.message = '拒绝访问';
        break;
      case 404:
        error.message = '请求错误,未找到该资源';
        break;
      case 405:
        error.message = '请求方法未允许';
        break;
      case 408:
        error.message = '请求超时';
        break;
      case 500:
        error.message = '服务器端出错';
        break;
      case 501:
        error.message = '网络未实现';
        break;
      case 502:
        error.message = '网络错误';
        break;
      case 503:
        error.message = '服务不可用';
        break;
      case 504:
        error.message = '网络超时';
        break;
      case 505:
        error.message = 'http版本不支持该请求';
        break;
      default:
        error.message = `连接错误${error.response.status}`;
    }
    Message.error(error.message);
    return Promise.reject(error);
  }

});

//返回一个Promise(发送post请求)
export function fetchPost(url, params) {
  return new Promise((resolve, reject) => {
    instance.post(url, params)
      .then(response => {
        resolve(response);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}
////返回一个Promise(发送get请求)
export function fetchGet(url, param) {
  return new Promise((resolve, reject) => {
    instance.get(url, {params: param})
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export default {
  fetchPost,
  fetchGet,
}
