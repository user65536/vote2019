const defaultStore = {
  voteLeft: ''
}

export default (store=defaultStore, action) => {
  const newStore = JSON.parse(JSON.stringify(store))
  switch(action.type) {
    case 'RENEW_VOTE_NUM': 
      newStore.voteLeft = action.value;
      return newStore
    default :
      return store
  }
}