import ajax from './_ajax'
import img from '../static/bupt5.jpg'

const config = {
  mock: false
}

const host = config.mock ? 'https://result.eolinker.com/Cd3uNIt2f3c1f80117d47fc916e8ce8d799404697481ae5?uri=' : '' ;

const apiAddr = {
  login: '/api/login',
  logout: '/api/logout',
  checkLogin: '/api/checkLogin',
  getRemainVote: '/api/getRemainVote',
  getProjectList: '/api/projectList',
  getProjectDetail: '/api/project',
  getCaptcha: '/api/captcha',
  voteNow: '/api/vote',
  getVoteRecord: '/api/voteRecord',
  getTotalVote: '/api/totalVote',
  getImage: '/image',
  search: '/api/searchProjectList'
}
for (let [k, v] of Object.entries(apiAddr) ) {
  apiAddr[k] = `${host}${v}`
}

function forMatData(data) {
  let formData = new FormData()
  for(let [k,v] of Object.entries(data)) {
    formData.append(k, v)
  }
  return formData
}

export default {
  login ({username, password}) {
    return new Promise((resolve, reject) => {
      ajax({
        url: apiAddr.login,
        method: 'POST',
        data: forMatData({username, password})
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
        url: apiAddr.getRemainVote,
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
        method: 'GET'
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
    if(category === '0') {
      category = ''
    } else {
      category = `/${category}`
    }
    return new Promise((resolve, reject) => {
      ajax({
        url: config.mock ? `${apiAddr.getProjectList}/{category}` : `${apiAddr.getProjectList}${category}`,
        method: 'GET'
      }).then( res => {
        if(res.list) {
          res.list.forEach((project, index) => {
            project.imgSrc = project.img ? `${apiAddr.getImage}/${project.id}/${project.img}` : img
            // project.imgSrc = `${apiAddr.getImage}/${project.id}/${project.img}`            
          })
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
        url: config.mock ? `${apiAddr.getProjectDetail}/{id}` : apiAddr.getProjectDetail + `/${id}`,
        method: 'GET'
      }).then((res) => {
        if(res.state) {
          res.list.imgSrc =  res.list.img ? `${apiAddr.getImage}/${res.list.id}/${res.list.img}` : img
          // res.list.imgSrc = `${apiAddr.getImage}/${res.list.id}/${res.list.img}`          
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
    // return new Promise((resolve, reject) => {
    //   ajax({
    //     url: apiAddr.getCaptcha,
    //     method: 'GET'
    //   }).then((res) => {
    //     resolve(res)
    //   }).catch( () => {
    //     reject("验证码获取失败")
    //   })
    // })
    if(config.mock) {
      return Promise.resolve(`https://www.meansky.cn/picture/code.png`)
    } else {
      return Promise.resolve(`${apiAddr.getCaptcha}?code=${Math.round(Math.random()*10000000)}`)
    }
  },
  voteNow ({id, captcha}) {
    return new Promise((resolve, reject) => {
      ajax({
        url: apiAddr.voteNow,
        method: 'POST',
        data: forMatData({
          captcha: captcha,
          project: id
        })
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
  },
  getVoteRecord () {

    return new Promise((resolve, reject) => {
      ajax({
        url: apiAddr.getVoteRecord,
        method: 'GET'
      }).then(res => {
        if(res.state) {
          res.list.sort((a,b) => b.voteNumber - a.voteNumber).forEach((project, index) => {
            project.rank = index + 1
          })
          resolve(res.list)
        } else {
          reject("返回state false")
        }
      }).catch(() => {
        reject("请求失败")
      })
    })
  },
  getTotalVote () {
    return new Promise ((resolve, reject) => {
      ajax({
        url: apiAddr.getTotalVote,
        method: 'GET'
      }).then(res => {
        if(res.state && /^[0-9]+$/.test(res.total)) {
          resolve(res.total.toString())
        } else {
          reject("返回数据不符合规范")
        }
      }).catch(() => {
        reject("请求失败")
      })
    })
  },
  search (word) {
    return new Promise((resolve, reject) => {
      ajax({
        url: apiAddr.search,
        method: 'POST',
        data: forMatData({word})
      }).then(res => {
        if(res.state) {
          res.pList.forEach((project, index) => {
            project.imgSrc = project.img ? `${apiAddr.getImage}/${project.id}/${project.img}` : img
          })
          resolve(res.pList)
        } else {
          reject("搜索失败")
        }
      }).catch(() => {
        reject("网络错误")
      })
    })
  }
}

