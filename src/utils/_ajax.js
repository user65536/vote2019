
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


function _ajax({
  url='#',
  method='GET',
  async=true,
  timeout=6000,
  dataType='text',
  data=null,
  headers={},
  onprogress= () => {},
  onuploadprogress= () => {},
  xhr= new XMLHttpRequest()
}) {
  // return promise对象
  return new Promise(function (resolve, reject) {
    xhr.open(method, url, async);
    xhr.timeout = timeout;
    // 设置请求头
    for (const key in headers) {
      xhr.setRequestHeader(key, headers[key]);
    }
    // 注册xhr对象事件
    xhr.responseType = dataType;
    xhr.onprogress = onprogress;
    xhr.onuploadprogress = onuploadprogress;
    // 开始注册事件
    // 请求成功
    xhr.onloadend = function () {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        try {
          resolve(JSON.parse(xhr.response))
        } catch (e) {
          resolve(xhr.response);
        }
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
      xhr.send(data);
    } catch (error) {
      reject({
        errorType: "send_error",
        error: error
      });
    }
  });
}


// 调用示例
// _ajax({
//   url: 'http://localhost:3000/suc',
//   async: true,
//   onprogress: function (evt) {
//     console.log(evt.position / evt.total);
//   },
//   dataType: 'text/json'
// }).then(
//   function (xhr) {
//     console.log(xhr.response);
//   },
//   function (e) {
//     console.log(JSON.stringify(e))
//   });

export default _ajax