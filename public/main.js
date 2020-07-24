const inputbox = document.querySelector(".input-box");
inputbox.addEventListener("keypress", (event) => {
    if (event.keyCode == 13) {
        get_recordingId(inputbox.value);
        inputbox.value = "";
    }
});

const get_recordingId = (url) => {
    const regex = /&recordingId=([0-9]*)/;
    let recordingId = url.match(regex);
    if(recordingId){
        recordingId = recordingId[1];
        getDownloadLink(recordingId);
    }
    else{
        let songDescription = document.querySelector(".song-description");
        songDescription.innerHTML= "Enter a Valid URL"
    }
};

const getDownloadLink = (recordingId) => {
    let downloadBtn = document.querySelector(".btn");
    downloadBtn.style.display = "block";
    let requestUrl = "https://static.starmakerstudios.com/production/uploading/recordings/" + recordingId + "/master.mp4";
    let xhr = new XMLHttpRequest();
    xhr.open("GET", requestUrl);
    xhr.responseType = "blob";

    xhr.onload = function () {
        saveFile(this.response, recordingId+'.mp3'); 
    };
    xhr.send();
};

function saveFile(blob, fileName)
{
    let downloadBtn = document.querySelector(".btn");
    downloadBtn.style.display = "block";

    let url = window.URL.createObjectURL(blob);
    downloadBtn.href = url;
    downloadBtn.download = fileName;
}
