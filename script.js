let videoStream = document.querySelector('video')
let recordCont = document.querySelector('.record-cont')
let recordBtn = document.querySelector('.record-btn')
let captureCont = document.querySelector('.capture-cont')
let captureBtn = document.querySelector('.capture-btn')
let timer = document.querySelector('.timer-cont')
let recorder;
let chunks = []
let recorderFlag = false
let gallaryBtn = document.querySelector('.gallery-btn')

let counter = 0
let hours = 0
let minutes = 0
let seconds = 0


let constraints = {
    video : true,
    audio : true
}

navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
        videoStream.srcObject = stream

        recorder = new MediaRecorder(stream)

        recorder.addEventListener('start' , ()=> {
            chunks = []
        })

        recorder.addEventListener('dataavailable',e=>{
            chunks.push(e.data)
            if(recorderFlag)
                startTimer()
        })

        recorder.addEventListener('stop',()=>{
            let blob = new Blob(chunks , {type : 'video/mp4'})
            if(db)
            {
                let dbTransaction = db.transaction('data' , 'readwrite')
                let objStore = dbTransaction.objectStore('data')
                let videoData = {id:`vid${shortid()}` , data: blob}
                objStore.add(videoData)
            }
        })

})

recordCont.addEventListener('click',()=>{
    if(!recorder) return

    recorderFlag = !recorderFlag

    if(recorderFlag){
        recorder.start()
        startTimer()
        recordBtn.classList.add('record-btn-anim')
    }
    else
    {
        recorder.stop()
        recordBtn.classList.remove('record-btn-anim')
        stopTimer()
    }
})

function startTimer()
{
    timerID = setInterval(() => {
        counter++;
        hours = Math.floor( counter/3600 )
        minutes = Math.floor(( counter%3600 ) / 60)
        seconds = counter%60
        hours = (hours<10)?'0'+String(hours):String(hours)
        minutes = (minutes<10)?'0'+String(minutes):String(minutes)
        seconds = (seconds<10)?'0'+String(seconds):String(seconds)
        timer.innerHTML = hours+':'+minutes+':'+seconds
    }, 1000);
}

function stopTimer(){
    clearInterval(timerID)
    timer.innerHTML = '00:00:00'
}


captureCont.addEventListener('click',e=>{
    captureBtn.classList.add('capture-btn-anim')
    let canvas = document.createElement('canvas')
    canvas.height = videoStream.videoHeight;
    canvas.width = videoStream.videoWidth;

    canvas.getContext('2d').drawImage(videoStream,0,0,canvas.width,canvas.height)
    let URL = canvas.toDataURL()
    if(db)
    {
        let dbTransaction = db.transaction('data' , 'readwrite')
        let dataStore = dbTransaction.objectStore('data')
        let imageData = {id : `img${shortid()}` , data : URL}
        dataStore.add(imageData)
    }
    setTimeout(()=>{
        captureBtn.classList.remove('capture-btn-anim')
    } , 500)
})


gallaryBtn.onclick = ()=>{
    location.assign('./gallery.html')
}