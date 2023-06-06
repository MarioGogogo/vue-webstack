import axios from 'axios';
import { Loading, Message } from 'element-ui';
const LoadingInstance = {
  _target: null, // 保存Loading实例
  _count: 0,
};

function myAxios(axiosConfig, customOptions) {
  const service = axios.create({
    baseURL: 'http://127.0.0.1:7001',
    //baseURL: 'http://43.134.241.119:7001', // 设置统一的请求前缀
    timeout: 3000, // 设置统一的超时时长
  });
  // 自定义配置
  let custom_options = Object.assign(
    {
      error_message_show: true, // 是否开启接口错误信息展示，默认为true
      repeat_request_cancel: true, // 是否开启取消重复请求, 默认为 true
      return_result_format: true, // 是否开启返回结果格式化
      loading: false, // 是否开启loading层效果, 默认为true 开启状态
    },
    customOptions
  );
  /************* 请求拦截  响应拦截   *************/
  service.interceptors.request.use(
    (config) => {
      removePending(config);
      custom_options.repeat_request_cancel && addPending(config);
      // 创建loading实例
      if (custom_options.loading) {
        LoadingInstance._count++;
        if (LoadingInstance._count === 1) {
          LoadingInstance._target = Loading.service();
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  service.interceptors.response.use(
    (response) => {
      removePending(response.config);
      custom_options.loading && closeLoading(custom_options); // 关闭loading
      //参数转换只返回data
      return custom_options.return_result_format ? response.data : response;
    },
    (error) => {
      console.log('%c Line:51 👾 error', 'font-size:18px;color:#ffffff;background:#666699', error);
      error.config && removePending(error.config);
      custom_options.loading && closeLoading(custom_options);
      // 关闭loading
      console.log('%c Line:55 🙄 关闭loading', 'font-size:18px;color:#ffffff;background:#10ac84');
      custom_options.error_message_show && httpErrorStatusHandle(error); // 处理错误状态码
      return Promise.reject(error);
    }
  );
  /****************** 请求拦截  响应拦截   *************/

  return service(axiosConfig); //返回的是一个Promise对象哦。
}

const pendingMap = new Map();
/**
 * 生成每个请求唯一的键
 * @param {*} config
 * @returns string
 */
function getPendingKey(config) {
  let { url, method, params, data } = config;
  if (typeof data === 'string') {
    return [url, method, JSON.stringify(params), data].join('&');
  } else {
    return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&');
  } // response里面返回的config.data是个字符串对象
}

/**
 * 储存每个请求唯一值, 也就是cancel()方法, 用于取消请求
 * @param {*} config
 */
function addPending(config) {
  const pendingKey = getPendingKey(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingMap.has(pendingKey)) {
        pendingMap.set(pendingKey, cancel);
      }
    });
}

/**
 * 删除重复的请求
 * @param {*} config
 */
function removePending(config) {
  const pendingKey = getPendingKey(config);
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey);
    cancelToken(pendingKey);
    pendingMap.delete(pendingKey);
  }
}

/**
 * 关闭Loading层实例
 * @param {*} _options
 */
function closeLoading(_options) {
  console.log('%c Line:103 🔥🔥🔥 请求次数', 'font-size:18px;color:#ffffff;background:#6666CC', LoadingInstance._count);
  if (_options.loading && LoadingInstance._count > 0) LoadingInstance._count--;
  if (LoadingInstance._count === 0) {
    LoadingInstance._target.close();
    LoadingInstance._target = null;
  }
}

/**
 * 处理异常
 * @param {*} error
 */
function httpErrorStatusHandle(error) {
  // 处理被取消的请求
  if (axios.isCancel(error)) return console.error('请求的重复请求：' + error.message);
  let message = '';
  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        message = '接口重定向了！';
        break;
      case 400:
        message = '参数不正确！';
        break;
      case 401:
        message = '您未登录，或者登录已经超时，请先登录！';
        break;
      case 403:
        message = '您没有权限操作！';
        break;
      case 404:
        message = `请求地址出错: ${error.response.config.url}`;
        break; // 在正确域名下
      case 408:
        message = '请求超时！';
        break;
      case 409:
        message = '系统已存在相同数据！';
        break;
      case 500:
        message = '服务器内部错误！';
        break;
      case 501:
        message = '服务未实现！';
        break;
      case 502:
        message = '网关错误！';
        break;
      case 503:
        message = '服务不可用！';
        break;
      case 504:
        message = '服务暂时无法访问，请稍后再试！';
        break;
      case 505:
        message = 'HTTP版本不受支持！';
        break;
      default:
        message = '异常问题，请联系管理员！';
        break;
    }
  }
  if (error.message.includes('timeout')) message = '网络请求超时！';
  if (error.message.includes('Network')) message = window.navigator.onLine ? '服务端异常！' : '您断网了！';

  Message({
    type: 'error',
    message,
  });
}

export default myAxios;
