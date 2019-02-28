
/**
 * 首先，可能会使用到的xhr方法或者说属性
 * onloadstart // 开始发送时触发
 * onloadend   // 发送结束时触发，无论成功不成功
 * onload      // 得到响应
 * onprogress  // 从服务器上下载数据，每50ms触发一次
 * onuploadprogress // 上传到服务器的回调
 * onerror     // 请求错误时触发
 * onabort     // 调用abort时候触发
 * status      // 返回状态码
 * setRequestHeader // 设置请求头
 * responseType // 请求传入的数据
 */

// 默认的ajax参数
let ajaxDefaultOptions = {
  url: '#', // 请求地址，默认为空
  method: 'GET', // 请求方式，默认为GET请求
  async: true, // 请求同步还是异步，默认异步
  timeout: 0, // 请求的超时时间
  dataType: 'text', // 请求的数据格式，默认为text
  data: null, // 请求的参数，默认为空
  headers: {}, // 请求头，默认为空
  onprogress: function () {}, // 从服务器下载数据的回调
  onuploadprogress: function () {}, // 处理上传文件到服务器的回调
  xhr: null // 允许函数外部创建xhr传入，但是必须不能是使用过的
};

function _ajax(paramOptions) {
  let options = {};
  for (const key in ajaxDefaultOptions) {
    options[key] = ajaxDefaultOptions[key];
  }
  // 如果传入的是否异步与默认值相同，就使用默认值，否则使用传入的参数
  options.async = paramOptions.async === ajaxDefaultOptions.async ? ajaxDefaultOptions.async : paramOptions.async;
  // 判断传入的method是否为GET或者POST,否则传入GET 或者可将判断写在promise内部，reject出去
  options.method = paramOptions.method ? ("GET" || "POST") : "GET";
  // 如果外部传入xhr，否则创建一个
  let xhr = options.xhr || new XMLHttpRequest();
  // return promise对象
  return new Promise(function (resolve, reject) {
    xhr.open(options.method, options.url, options.async);
    xhr.timeout = options.timeout;
    // 设置请求头
    for (const key in options.headers) {
      xhr.setRequestHeader(key, options.headers[key]);
    }
    // 注册xhr对象事件
    xhr.responseType = options.dataType;
    xhr.onprogress = options.onprogress;
    xhr.onuploadprogress = options.onuploadprogress;
    // 开始注册事件
    // 请求成功
    xhr.onloadend = function () {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        resolve(xhr);
      } else {
        reject({
          errorType: "status_error",
          xhr: xhr
        });
      }
    };
    // 请求超时
    xhr.ontimeout = function () {
      reject({
        errorType: "timeout_error",
        xhr: xhr
      });
    }
    // 请求错误
    xhr.onerror = function () {
      reject({
        errorType: "onerror",
        xhr: xhr
      });
    }
    // abort错误(未明白，只知道是三种异常中的一种)
    xhr.onabort = function () {
      reject({
        errorType: "onabort",
        xhr: xhr
      });
    }
    // 捕获异常
    try {
      xhr.send(options.data);
    } catch (error) {
      reject({
        errorType: "send_error",
        error: error
      });
    }
  });
}


// 调用示例
_ajax({
  url: 'http://localhost:3000/suc',
  async: true,
  onprogress: function (evt) {
    console.log(evt.position / evt.total);
  },
  dataType: 'text/json'
}).then(
  function (xhr) {
    console.log(xhr.response);
  },
  function (e) {
    console.log(JSON.stringify(e))
  });