import alertStore from '../store/alert'

export default {
  showAlert (title) {
    const action = {
      type: 'SHOW_ALERT',
      value: title
    }
    alertStore.dispatch(action)
  }
}