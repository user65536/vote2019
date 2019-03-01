const defaultStore = {
  text: ''
}

export default (store=defaultStore, action) => {
  const newStore = JSON.parse(JSON.stringify(store))
  switch(action.type) {
    case 'SHOW_ALERT': 
      newStore.text = action.value;
      return newStore
    default :
      return store
  }
}