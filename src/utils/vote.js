import ajax from './_ajax'

const host = "http://result.eolinker.com/Cd3uNIt2f3c1f80117d47fc916e8ce8d799404697481ae5?uri="

const apiAddr = {
  login: '/api/login',
  logout: '/api/logout',
  checkLogin: '/api/checkLogin',
  getRemainVOte: '/api/getRemainVOte',
  getProjectList: '/api/projectList',
  getProjectDetail: '/api/project',
  getCaptcha: '/api/captcha',
  voteNow: '/api/vote'
}
for (let [k, v] of Object.entries(apiAddr) ) {
  apiAddr[k] = `${host}${v}`
  apiAddr[`${k}_f`] = `${host}${v}&resultType=failure`
}

export default {
  login ({username, password}) {
    return new Promise((resolve, reject) => {
      ajax({
        url: apiAddr.login,
        method: 'POST',
        data: {username, password}
      }).then(response => {
        // if (typeof response === 'string') {
        //   reject('系统错误:JSON needed')
        // }
        resolve(response)
      }).catch(() => {
        reject("网络错误")
      })
    })
  },
  checkLogin () {
    return new Promise((resolve, reject) => {
      ajax({
        url: apiAddr.checkLogin,
        method: 'GET'
      }).then(({loginState, id}) => {resolve({state: loginState, id})})
        .catch(() => {
          reject("网络错误")
        })
    })
  },
  getVoteLeft () {
    return new Promise((resolve, reject) => {
      ajax({
        url: apiAddr.getRemainVOte,
        method: 'GET'
      }).then( (res) => {
        if(res.state) {
          resolve(parseInt(res.remain))
        } else {
          reject("查询票数失败")
        }
      }).catch( () => {
        reject("网络错误")
      })
    })
  },
  logout () {
    return new Promise ((resolve, reject) => {
      ajax({
        url: apiAddr.logout,
        method: 'POST'
      }).then((res) => {
        if(res.state) {
          resolve(true)
        } else {
          reject("登出失败")
        }
      }).catch(() => {
        reject("网络错误")
      })
    })
  },
  getProjectList (category) {
    return new Promise((resolve, reject) => {
      ajax({
        url: apiAddr.getProjectList + '/{category}',
        method: 'GET'
      }).then( res => {
        if(res.list) {
          resolve(res.list)
        } else {
          reject("查询失败")
        }
      }).catch(() => {reject("网络错误")})
    })
  },
  getProjectDetail (id) {
    return new Promise((resolve, reject) => {
      ajax({
        url: apiAddr.getProjectDetail + '/{project}',
        method: 'GET'
      }).then((res) => {
        if(res.state) {
          resolve(res.list)
        } else {
          reject("404")
        }
      }).catch(() => {
        reject("网络错误")
     })
    })
  },
  getCaptcha () {
    return new Promise((resolve, reject) => {
      ajax({
        url: apiAddr.getCaptcha,
        method: 'GET'
      }).then((res) => {
        resolve(res)
      }).catch( () => {
        reject("验证码获取失败")
      })
    })
  },
  voteNow ({id, captcha}) {
    return new Promise((resolve, reject) => {
      ajax({
        url: apiAddr.voteNow,
        method: 'POST',
        data: {
          captcha: captcha,
          project: id
        }
      }).then((res) => {
        let result = {
          "expired": "激活时间超时",
          "no more vote": "无票可投",
          "wrong code": "验证码错误",
        }
        if(res.state) {
          resolve("投票成功")
        } else {
          reject(result[res.msg] ? result[res.msg] : "服务忙")
        }
      }).catch(() => {
        reject("投票失败")
      })
    })
  }

}

