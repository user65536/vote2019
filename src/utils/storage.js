// import page from './page'

export default {
  setProjectList ({list, group, searchValue}) {
    let storage = JSON.stringify({
      list,
      group,
      searchValue
    })
    sessionStorage.setItem('pageListInfo', storage)
  },
  getProjectList () {
    let listInfo = sessionStorage.getItem('pageListInfo')
    if(listInfo) {
      try {
        return JSON.parse(listInfo)
      } catch (e) {
        console.log('别改storage')
        return false
      }
    } else {
      return null
    }
  },
  getScrollTop () {
    let top = sessionStorage.getItem('scrollTop')
    if(top) {
      return parseInt(top)
    } else {
      return false
    }
  },
  setScrollTop(top) {
    sessionStorage.setItem('scrollTop', top)
  }
}