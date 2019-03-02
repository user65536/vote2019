import alertStore from '../store/alert'

export default {
  showAlert (title) {
    const action = {
      type: 'SHOW_ALERT',
      value: title
    }
    alertStore.dispatch(action)
  },
  getStrLength(str) {
    const len = str.length
    let charLength = 0
    for(let i = 0; i < len; i ++) {
      charLength += (str.charCodeAt(i) > 255 ? 1 : 0.5)
    }
    return charLength
  }
}