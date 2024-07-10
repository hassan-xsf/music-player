const songsList = {
    0: {
        name: "Song 1",
        artist: "Ali",
        logo: "https://i.scdn.co/image/ab67616d00001e02ba03ff79dad25f7c3542382f",
        link: "https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3",

    },
    1: {
        name: "Song 2",
        artist: "Bhai",
        logo: "https://i.scdn.co/image/ab67616d00001e02ba03ff79dad25f7c3542382f",
        link: "https://commondatastorage.googleapis.com/codeskulptor-assets/Evillaugh.ogg",
    },
    2: {
        name: "Song 3",
        artist: "Shera",
        logo: "https://i.scdn.co/image/ab67616d00001e02ba03ff79dad25f7c3542382f",
        link: "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3",
    },
    3: {
        name: "Song 4",
        artist: "Shera",
        logo: "https://i.scdn.co/image/ab67616d00001e02ba03ff79dad25f7c3542382f",
        link: "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3",
    },
    4: {
        name: "Song 5",
        artist: "Shera",
        logo: "https://i.scdn.co/image/ab67616d00001e02ba03ff79dad25f7c3542382f",
        link: "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3",
    },
    5: {
        name: "Song 6",
        artist: "Shera",
        logo: "https://i.scdn.co/image/ab67616d00001e02ba03ff79dad25f7c3542382f",
        link: "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3",
    },
    6: {
        name: "Song 7",
        artist: "Shera",
        logo: "https://i.scdn.co/image/ab67616d00001e02ba03ff79dad25f7c3542382f",
        link: "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3",
    },
    7: {
        name: "Song 8",
        artist: "Shera",
        logo: "https://i.scdn.co/image/ab67616d00001e02ba03ff79dad25f7c3542382f",
        link: "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3",
    },
    8: {
        name: "Song 9",
        artist: "Shera",
        logo: "https://i.scdn.co/image/ab67616d00001e02ba03ff79dad25f7c3542382f",
        link: "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3",
    },
    9: {
        name: "Song 10",
        artist: "Shera",
        logo: "https://i.scdn.co/image/ab67616d00001e02ba03ff79dad25f7c3542382f",
        link: "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3",
    },
}
let totalSongs = 0;
let songNames = [];
let songArtist = [];
let songLinks = [];
let songLogo = [];
let songDuration = [];
let currentPage = 1;
let lastClickTime = 0;
let currentAudio = null;
let autoPlay = true;
let volume = 100;

async function loadSongsList() {
    const pageContains = 8;
    let count = 0;
    const promises = [];

    for (const i in songsList) {
        songNames[count] = songsList[i].name;
        songArtist[count] = songsList[i].artist;
        songLinks[count] = songsList[i].link;
        songLogo[count] = songsList[i].logo;

        const songObject = new Audio(songsList[i].link);
        const promise = new Promise((resolve) => {
            const currentCount = count;
            songObject.addEventListener("loadeddata", () => {
                songDuration[currentCount] = songObject.duration;
                resolve();
            });
        });

        promises.push(promise);
        count++;
    }

    totalSongs = count;
    console.log(`Loaded ${totalSongs} songs`);

    await Promise.all(promises);
}

async function main() {
    await loadSongsList();
    updateSongsPage();
    UpdateSecondMenu(0)
}

findPossiblePages = () => Math.ceil(totalSongs/7)

main().catch(console.error);
function secondsToFancyTime(duration) {
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;

    let ret = "";  
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
  
    return ret;
}

function updateSongsPage(page = 1) {

    // pauseSong(1)
    let ll = page == 1 ? 0 : (page-1)*7;
    let ul = ll + 7;
    currentPage = page;

    document.querySelector(".song-list").innerHTML = "";
    for (let i = ll; i < ul; i++) {
        if (songNames[i]) {
            const innerSongHTML = `
            <div class = "box-${i} boxes bg-gray-100 bg-opacity-15 rounded-md flex relative hover:bg-opacity-10 cursor-pointer">
                <div class = "flex flex-row gap-2 items-center justify-start ml-3">
                    <img class = "rounded-lg w-16" src = "${songLogo[i]}">
                    <div class = "flex flex-col gap-1">
                        <span class = "text-sm text-white font-bold">${songNames[i]}</span>
                        <span class = "text-xs text-white font-light">By ${songArtist[i]}</span>
                    </div>
                </div>
                <div class = "absolute right-12 top-6 flex gap-10 items-center justify-center">
                    <span class = "text-white text-sm">${secondsToFancyTime(songDuration[i])}</span>
                    <img src = "../assets/heart-light.png">
                </div>
            </div>
        `
            document.querySelector(".song-list").innerHTML += innerSongHTML;
        }
    }
    document.querySelector(".song-list").innerHTML += 
    `<div class = "flex justify-center items-center max-w-4xl gap-5 order-last">
        <div class = "flex gap-5 justify-center items-center">
            <div class = "md:hover:scale-110 next-btn cursor-pointer py-2 px-4 w-w-[60%] rounded-md bg-gray-100 bg-opacity-15 text-white flex items-center gap-5">
                <span class = "font-bold">NEXT</span>
                <img class = "w-6 " src = "../assets/nextwhite.png">
            </div>
            <div class = "md:hover:scale-110 prev-btn cursor-pointer py-2 px-4 w-[60%] rounded-md bg-gray-100 bg-opacity-15 text-white flex items-center gap-5">
                <img class = "w-6" src = "../assets/previouswhite.png">
                <span class = "font-bold">PREVIOUS</span>
            </div>
        </div>
    </div>`;
    document.querySelector(".next-btn").addEventListener("click" , () => {
        const time = new Date().getTime();
        if(time-lastClickTime > 1100) {
            if(currentPage < findPossiblePages()) {
                updateSongsPage(currentPage+1);
                lastClickTime = time;
            }
        }
        
        
    })
    document.querySelector(".prev-btn").addEventListener("click" , () => {
        const time = new Date().getTime();
        if(time-lastClickTime > 1100) {
            if(currentPage > 1) {
                updateSongsPage(currentPage-1);
                lastClickTime = time;
            }
        }
    })
    
    
    // UpdateSecondMenu(currentPage == 1 ? 0 : (currentPage-1)* 7) -- risk IF SECOND MENU STARTS FRICKIN UP

    const ele = document.querySelectorAll(".boxes")
    ele.forEach((e) => {
        const id = findIDbyElement(e);
        e.addEventListener("click" , () => {
            playSong(id, true)
        });
    })
}
function pauseSong(reset = 1) {
    if(currentAudio) {
        currentAudio.pause();
        if(reset == 1) {
            currentAudio.currentTime = 0;
            currentAudio = null;
        }
        document.querySelector(".play-song").src = "../assets/playicon.png";
    }
}
function playSong(id = -1, forced = false) {
    pauseSong(0);
    if(!currentAudio || forced) {
        const songObject = new Audio(songLinks[id]);
        currentAudio = songObject;
        UpdateSecondMenu(id)
        songObject.addEventListener("loadeddata", () => {
            songObject.play();
        });
        songObject.addEventListener('timeupdate', () => {
            document.querySelector(".audiobar").value = songObject.currentTime;
            document.querySelector(".curr-time").innerText = secondsToFancyTime(songObject.currentTime)
            document.querySelector(".tott-time").innerText = secondsToFancyTime(songObject.duration)
            
        });
        songObject.addEventListener('ended', () => {
            if(autoPlay) {
                if(id < totalSongs-1) {
                    pauseSong(1);
                    playSong(+id+1, true)
                }
                else {
                    pauseSong(1)
                    playSong(0,true)
                }


            }
            else {
                pauseSong(1);
            }
        });
    }
    else {
        currentAudio.play();
    }
    document.querySelector(".play-song").src = "../assets/pauseicon.png";
    currentAudio.volume = volume / 100;
}
function findIDbyElement(ele) {
    let val = -1;
    if(document.body.contains(ele)) {

        const boxArr = Array.from(ele.classList).find(c => c.startsWith("box-"))
        const value = boxArr.split("-");
        val = value[1]
    }
    return val;
}
function UpdateSecondMenu(i) {
    if(!songNames[i]) return false;
    document.querySelector(".side-bar").innerHTML = "";
    const secondMenuHTML = `
    <div class = "flex flex-col items-center">
        <div class="w-full max-w-xs md:max-w-sm lg:max-w-md flex items-center justify-center ">
            <img class = "w-5/6 h-auto object-contain rounded-md border-black border-2" src = "${songLogo[i]}">
        </div>
    </div>
    <div class = "flex flex-col gap-24">
        <div class = "flex flex-col gap-2 mt-4 ml-5 justify-start">
            <span class = "self-start text-2xl text-white font-bold">${songNames[i]}</span>
            <span class = "text-sm text-white font-light">By ${songArtist[i]}</span>
        </div>
        <div class = "flex flex-col gap-2">
        <div class = "flex justify-center items-center gap-5">
            <img class = "previous-song -10 h-10 cursor-pointer" src = "../assets/songprevious.png">
            <img class = "play-song w-16 cursor-pointer" src = "../assets/playicon.png">
            <img class = "next-song w-10 h-10 cursor-pointer" src = "../assets/songnext.png">
        </div>
            <div class = "flex justify-center gap-3 text-white items-center">
                <span class = "curr-time">0:00</span>
                <input class = "audiobar transparent h-[10px] w-[70%] [&::-webkit-slider-thumb]:w-[50px] cursor-pointer appearance-auto accent-white " type = "range" min = "0" max = ${songDuration[i]} value = "0">
                <span class = "tott-time">${secondsToFancyTime(songDuration[i])}</span>
            </div>
            <div class = "flex mt-16 flex-col justify-center items-center xl:flex-row">
                <div class = "flex flex-nowrap">
                    <label class = "select-none">
                    <input type="checkbox" class="accent-black autoplay" ${autoPlay ? "checked" : "unchecked"}> <span class = "text-white">Autoplay</span>
                    </label>
                </div>
                <div class = "flex justify-center items-center text-white gap-4 xl:justify-end">
                    <span class = "volText">VOL. ${volume}%</span>
                    <input class = "volBar transparent h-[10px] w-[30%]  cursor-pointer appearance-auto accent-white " type = "range" min = "0" max = "100" value = "${volume}">
                </div>
            </div>
        </div>
    </div>`



    document.querySelector(".side-bar").innerHTML += secondMenuHTML;

    document.querySelector(".next-song").addEventListener('click', () => {
        const time = new Date().getTime();
        if(time-lastClickTime > 1000) 
        {
            if(i < totalSongs-1) {  
                pauseSong(1);
                playSong(+i+1, true) // UNARY PLUS OPERATOR CONVERTS I TO NUMBER
                lastClickTime = time;
            }
            else {
                pauseSong(1);
                playSong(0, true) // UNARY PLUS OPERATOR CONVERTS I TO NUMBER
                lastClickTime = time;            
            }
        }


    });

    document.querySelector(".previous-song").addEventListener('click', () => {
        const time = new Date().getTime();
        if(time-lastClickTime > 1000) 
        {
            if(i > 0) 
            {
                pauseSong(1);
                playSong(i-1, true)
                lastClickTime = time;
            }
        }
    });
    document.querySelector(".volBar").addEventListener('input', (e) => {
        volume = document.querySelector(".volBar").value;
        document.querySelector(".volText").innerText = `VOL ${volume}%`;
        if(currentAudio) {
            currentAudio.volume = volume/100;
        }
    });

    let slider = document.querySelector(".audiobar");
    slider.addEventListener('input', (e) => {
        if(!currentAudio) {
            e.preventDefault();
            slider.value = 0;
        }
        else {
            currentAudio.currentTime = slider.value;
        }
    });
    document.querySelector(".autoplay").addEventListener('change', (e) => {
        autoPlay = e.target.checked ? true : false;
    });
    document.querySelector(".play-song").addEventListener("click" , () => {
        if(!currentAudio) {
            playSong(i , true);
        }
        if(currentAudio.paused) playSong()
        else pauseSong(0);
    })
}
