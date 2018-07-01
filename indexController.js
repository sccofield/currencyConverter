const openDatabase = () =>{
  console.log('database here')
  if(!navigator.serviceWorker){
    return Promise.resolve();
  }
  return idb.open('converter', 1, (upgradeDb) => {
    let store = upgradeDb.createObjectStore('rates', {
      keyPath: 'id'
    })
    store.createIndex('rates')
  })
}
openDatabase();