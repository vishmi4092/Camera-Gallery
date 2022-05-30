let videoCont = document.querySelector('.video-cont')
let imageCont = document.querySelector('.image-cont')

setTimeout(()=>{
    if(db)
{
    let dbTransaction = db.transaction('data' , 'readwrite')
    let dataStore = dbTransaction.objectStore('data')
    let dataRequest = dataStore.getAll()
    dataRequest.onsuccess = (e)=>{
    let allData = dataRequest.result
    allData.forEach(x => {
           let newElement = document.createElement('div')
           if(x.id.slice(0,3)=='vid')
            {
                newElement.innerHTML= `<div class="data-cont" id=${x.id}>
                                            <div class="data-btn-cont">
                                                 <span class="material-symbols-outlined download-btn">
                                                   file_download
                                                </span>
                                                 <span class="material-symbols-outlined delete-btn">
                                                    delete
                                                </span>
                                            </div>
                                            <div class="data">
                                                <video loop src="${URL.createObjectURL(x.data)}"></video>
                                            </div>
                                        </div>`
            videoCont.appendChild(newElement)

            }
            if(x.id.slice(0,3)=='img')
            {
                newElement.innerHTML= `<div class="data-cont" id=${x.id}>
                                            <div class="data-btn-cont">
                                                 <span class="material-symbols-outlined download-btn">
                                                   file_download
                                                </span>
                                                 <span class="material-symbols-outlined delete-btn">
                                                    delete
                                                </span>
                                            </div>
                                            <div class="data">
                                                <img src="${x.data}"></img>
                                            </div>
                                        </div>` 
            imageCont.appendChild(newElement)

            }
            
        });
    }
}
},100)

setTimeout(() => {
    downloadButtons = document.querySelectorAll('.download-btn')
    downloadButtons.forEach(x=>{
        x.addEventListener('click',()=>{
            let a = document.createElement('a')
            a.download = x.parentElement.parentElement.id
            if(a.download.slice(0,3)=='img')
                 a.href = x.parentElement.parentElement.querySelector('img').getAttribute('src')
            else
                a.href = x.parentElement.parentElement.querySelector('video').getAttribute('src')
            a.click()
        })
    })
    deleteButtons = document.querySelectorAll('.delete-btn')
    deleteButtons.forEach(x=>{
        x.addEventListener('click',()=>{
            let dbTransaction = db.transaction('data','readwrite')
            let dataStore = dbTransaction.objectStore('data')
            dataStore.delete(`${x.parentElement.parentElement.id}`)
            x.parentElement.parentElement.remove()
        })
    })
}, 300);
