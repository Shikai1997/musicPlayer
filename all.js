//dom
let audio = document.querySelector('#audio');
let time = document.querySelector('.time');
let settime = document.querySelector('.song_bar');
let playbtn = document.querySelector('.fa-play');
let song_time = document.querySelector('.song_time');
let song_name = document.querySelector('.song_name');
let song = document.querySelector('#song');
let musicListBtn = document.querySelector('.fa-align-justify');
let musicList = document.querySelector('.musicList');
let repeat = document.querySelector('.fa-retweet');
let player = document.querySelector('.player');
let next = document.querySelector('.fa-forward');
let prev = document.querySelector('.fa-backward');
//監聽
playbtn.addEventListener('click', Playstatus);
audio.addEventListener("play", getDuration);
musicListBtn.addEventListener('click', Liststatus);
repeat.addEventListener('click', changeType);
musicList.addEventListener('click', selectmusic);
next.addEventListener('click', nextmusic);
prev.addEventListener('click', prevmusic);

//播放
function play() {
    playbtn.className = "";
    playbtn.className = "fas fa-pause";
    audio.play();
    song_name.innerText = song.title;
}

//暫停
function pause() {
    playbtn.className = "";
    playbtn.className = "fas fa-play";
    audio.pause();
}
//播放狀態
function Playstatus() {
    if (playbtn.className == "fas fa-play") {
        play();
    } else {
        pause();
    }
}
//轉換時間
function formatSecond(secs) {
    let h = Math.floor(secs / 3600);
    let min = Math.floor((secs - (h * 3600)) / 60);
    let sec = parseInt(secs - (h * 3600) - (min * 60));
    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;
    return min + ":" + sec;
}

//更新時間
function getDuration() {
    durationTime = formatSecond(audio.duration);
    currentTime = formatSecond(audio.currentTime);
    song_time.innerText = currentTime + "/" + durationTime;
    time.style.width = Math.floor(audio.currentTime / audio.duration * 100) + "%";
    if (audio.currentTime <= audio.duration && playbtn.className == "fas fa-pause") {
        //自動換下一首
        if (audio.currentTime == audio.duration) {
            nextmusic();
        }
        setTimeout("getDuration()", 100);
    };
}

//打開清單
function openList() {
    musicListBtn.className = "fas fa-align-justify open";
    musicList.style.transform = "translateY(404px)";
}
//收合清單
function closeList() {
    musicListBtn.className = "";
    musicListBtn.className = "fas fa-align-justify";
    musicList.style.transform = "";
}
//清單狀態
function Liststatus() {
    if (musicListBtn.className == "fas fa-align-justify open") {
        closeList();
    } else {
        openList();
    }
}

//音樂狀態  是否循環
function changeType() {
    if (repeat.className == "fas fa-retweet red") {
        repeat.className = "";
        repeat.className = "fas fa-retweet";

    } else {
        repeat.className = "";
        repeat.className = "fas fa-retweet red";
        audio.loop = true;
    }
}

//下一首
function nextmusic() {
    let nowmusic = song.title;
    for (let i = 0; i < musicList.children.length; i++) {
        if (nowmusic == musicList.children[i].innerText) {
            if (i == musicList.children.length - 1) {
                song.src = musicList.children[0].title;
                song.title = musicList.children[0].innerText;
                song_name.innerText = musicList.children[0].innerText;
                Load();
                play();
            } else {
                song.src = musicList.children[i + 1].title;
                song.title = musicList.children[i + 1].innerText;
                song_name.innerText = musicList.children[i + 1].innerText;
                Load();
                play();
            }

        }
    }
}
//上一首

function prevmusic() {
    let nowmusic = song.title;
    for (let i = 0; i < musicList.children.length; i++) {
        if (nowmusic == musicList.children[i].innerText) {
            if (i == 0) {
                song.src = musicList.children[musicList.children.length - 1].title;
                song.title = musicList.children[musicList.children.length - 1].innerText;
                song_name.innerText = musicList.children[musicList.children.length - 1].innerText;
                Load();
                play();
            } else {
                song.src = musicList.children[i - 1].title;
                song.title = musicList.children[i - 1].innerText;
                song_name.innerText = musicList.children[i - 1].innerText;
                Load();
                play();
            }

        }
    }
}


//使用bar調時間
settime.addEventListener("click", function(evnt) {
    let a = evnt.offsetX / 272;
    audio.currentTime = audio.duration * a;
    play();
});

//切換音樂
function selectmusic(e) {

    song.src = e.target.title;
    song.title = e.target.innerText;
    song_name.innerText = song.title;
    Load();
    console.log(audio.readyState)
    setTimeout(() => {
        console.log(audio.readyState)
        play();
    }, 100);


}

//load
function Load() {
    audio.load();
    closeList();
}