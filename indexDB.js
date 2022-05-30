let openRequest = indexedDB.open('galleryDB')
let db;
openRequest.addEventListener('success' , ()=>{
    console.log('DB Success');
    db = openRequest.result;
})

openRequest.addEventListener('error' , ()=>{
    console.log('Error !');
})

openRequest.addEventListener('upgradeneeded' , ()=>{
    console.log('DB Upgraded');
    db = openRequest.result

    let dataStore = db.createObjectStore('data' , {keyPath: 'id'})
})