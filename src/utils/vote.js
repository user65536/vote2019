import ajax from './_ajax'

const host = "http://result.eolinker.com/Cd3uNIt2f3c1f80117d47fc916e8ce8d799404697481ae5?uri="

const apiAddr = {
  login: '/api/login',
  logout: '/api/logout',
  checkLogin: '/api/checkLogin',
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
        if (typeof response === 'string') {
          reject('系统错误:JSON needed')
        }
        resolve(response)
      }).catch(reject)
    })
  },
  checkLogin() {
    return new Promise((resolve, reject) => {
      ajax({
        url: apiAddr.checkLogin_f,
        method: 'GET'
      }).then(({loginState}) => {resolve(loginState)})
        .catch(reject)
    })
  }
}

