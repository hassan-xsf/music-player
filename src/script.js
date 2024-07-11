const songsList = {
    0: {
        name: "Cheques - Still Rollin",
        artist: "Shubh",
        logo: "https://i.scdn.co/image/ab67616d00001e021a8c4618eda885a406958dd0",
        link: "https://cdnsongs.com/music/data/Punjabi/202305/Still_Rollin/128/Cheques.mp3",

    },
    1: {
        name: "Baari 2",
        artist: "Bilal Saeed , Momuna Mustehesan",
        logo: "https://i.scdn.co/image/ab67616d00001e02145093e357e458a15fc7f242",
        link: "https://cdn.jattpendu.com/download/128k-dyxxm/Uchiyaan-Dewaraan-(Baari-2).mp3",
    },
    2: {
        name: "Sunniyan Sunniyan",
        artist: "Juss",
        logo: "https://i.scdn.co/image/ab67616d00001e0275a0429b40af0e83780b58e3",
        link: "https://cdn.jattpendu.com/download/128k-wsibe/Suniyan-Suniyan.mp3",
    },
    3: {
        name: "Ehsaan Tera Hoga Mujhpr",
        artist: "Sanam",
        logo: "https://i.scdn.co/image/ab67616d00001e02935a85fe2c3cc0e91543461b",
        link: "https://ghantalele.com/uploads/files/data-72/35649/Ehsan%20Tera%20Hoga%20Mujh%20Par_192(Ghantalele.com).mp3",
    },
    4: {
        name: "Aaoge Tum Kabhi",
        artist: "The Local Train",
        logo: "https://i.scdn.co/image/ab67616d00001e028e001d2d4b55039b545d047e",
        link: "https://cdn.jattpendu.com/download/128k-aqwur/Aaoge-Tum-Kabhi.mp3",
    },
    5: {
        name: "O' Mere Dil Ke Chain",
        artist: "Sanam",
        logo: "https://i.scdn.co/image/ab67616d00001e027d75fb1f269e77ed8c3e0e7a",
        link: "https://audio.jukehost.co.uk/3cNDxr9bUe6hjlit8ofYhnjKRnAQYndN",
    },
    6: {
        name: "Rang Lageya",
        artist: "Mohit Chauhan",
        logo: "https://i.scdn.co/image/ab67616d00001e021dda544f66f0eef95f7168ee",
        link: "https://audio.jukehost.co.uk/X0ZmLdlShYPC5RTqdBgGahzfQp5v2BsU",
    },
    7: {
        name: "Ranjhana",
        artist: "A.R Rehman",
        logo: "https://i.scdn.co/image/ab67616d00001e02a00249b8bf77312ec156dd4b",
        link: "https://audio.jukehost.co.uk/FTL427oWQGIdmgeSoeqyFKcU8qgl5sXW",
    },
    8: {
        name: "Circles",
        artist: "Post Malone",
        logo: "https://i.scdn.co/image/ab67616d00001e029478c87599550dd73bfa7e02",
        link: "https://cdn.bazehits.com/uploads/music/2024/04/Post-Malone-Circles-(Bazehits).mp3?_=1",
    },
    9: {
        name: "O' Meri Laila",
        artist: "Atif Aslam",
        logo: "https://i.scdn.co/image/ab67616d00001e02fc8c4535825cdc0bcafde19a",
        link: "https://audio.jukehost.co.uk/uccDr3iWW7K6ppRsT3IX9VwjCwenCyt9",
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

let promises = [];

let logoText = ["Dynamic audio player" , "Made by Hassan :)" , "Created using Tailwind CSS , Javacsript"]
let logoCurrent = 0;
let logoTextPos = 0;
let logoPause = false;

setInterval(() => {
    if(!logoPause)
    {
        const ele = document.querySelector(".adv")
        const text = logoText[logoCurrent];
        ele.innerText = text.slice(0, logoTextPos);
        logoTextPos++;
        if(logoTextPos > logoText[logoCurrent].length)
        {
            logoCurrent = logoCurrent+1 > logoText.length-1 ? 0 : logoCurrent+1;
            logoTextPos = 0;
            logoPause = true;
            setTimeout(() => {
                logoPause = false;
            } , 2000)
        }
    }
} , 100)

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
    document.querySelector(".song-list").classList.add("animate-pulse")
    document.querySelector(".side-bar").classList.add("animate-pulse")
    await loadSongsList();
    updateSongsPage();
    UpdateSecondMenu(0)
    document.querySelector(".song-list").classList.remove("animate-pulse")
    document.querySelector(".side-bar").classList.remove("animate-pulse")
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
                    <img class = "rounded-lg w-8 sm:w-16" src = "${songLogo[i]}">
                    <div class = "flex flex-col gap-1">
                        <span class = "text-xs text-white font-bold sm:text-sm">${songNames[i]}</span>
                        <span class = "text-[0.5rem] text-white font-light sm:text-xs">By ${songArtist[i]}</span>
                    </div>
                </div>
                <div class = "absolute right-1 top-1 flex flex-col gap-1 items-center justify-center xl:flex-row xl:gap-10 xl:right-12 xl:top-6">
                    <span class = "text-white text-[0.5rem] sm:text-sm">${secondsToFancyTime(songDuration[i])}</span>
                    <img class = "w-[50%] sm:w-[100%]" src = "https://i.ibb.co/Cv6Bjjz/heart-light.png">
                </div>
            </div>
        `
            document.querySelector(".song-list").innerHTML += innerSongHTML;
        }
    }
    document.querySelector(".song-list").innerHTML += 
    `<div class = "flex justify-center items-center gap-5 order-last">
        <div class = "flex gap-5 justify-center items-center">
            <div class = "select-none md:hover:scale-110 next-btn cursor-pointer py-2 px-4 max-w-4xl rounded-md bg-gray-100 bg-opacity-15 text-white flex items-center gap-5">
                <span class = "font-bold text-sm sm:text-xl">NEXT</span>
                <img class = "w-6 " src = "https://i.ibb.co/TWdHNc0/nextwhite.png">
            </div>
            <div class = "select-none md:hover:scale-110 prev-btn cursor-pointer py-2 px-4 max-w-4xl rounded-md bg-gray-100 bg-opacity-15 text-white flex items-center gap-5">
                <img class = "w-6" src = "https://i.ibb.co/9tJJmWP/previouswhite.png">
                <span class = "font-bold text-sm sm:text-xl">PREVIOUS</span>
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
        document.querySelector(".play-song").src = "https://i.ibb.co/rtz1rNr/playicon.png";
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
    document.querySelector(".play-song").src = "https://i.ibb.co/HNWkdgm/pauseicon.png";
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
    <div class = "flex mx-auto flex-col">
        <div class = "flex flex-row justify-center items-center lg:flex-col lg:justify-normal">
            <div class="w-1/2 lg:max-w-md lg:w-full flex items-center justify-center ">
                <img class = "w-5/6 h-auto object-contain rounded-md border-black border-2" src = "${songLogo[i]}">
            </div>
        </div>
        <div class = "flex flex-col gap-1 lg:gap-15">
            <div class = "flex flex-col gap-2 mt-4 ml-5 justify-start">
                <span class = "self-start md:text-xl lg:text-2xl text-white font-bold">${songNames[i]}</span>
                <span class = "text-xs lg:text-sm text-white font-light">By ${songArtist[i]}</span>
            </div>
            <div class = "flex flex-col gap-2">
            <div class = "flex justify-center items-center gap-5">
                <img class = "previous-song h-8 cursor-pointer lg:h-10" src = "https://i.ibb.co/RTN3bXD/songprevious.png">
                <img class = "play-song w-12 cursor-pointer lg:w-16" src = "https://i.ibb.co/rtz1rNr/playicon.png">
                <img class = "next-song h-8 cursor-pointer lg:h-10" src = "https://i.ibb.co/30VLj4c/songnext.png">
            </div>
                <div class = "flex justify-center gap-3 text-white items-center">
                    <span class = "curr-time text-xs lg:text-base">0:00</span>
                    <input class = "audiobar transparent h-[10px] w-[70%] [&::-webkit-slider-thumb]:w-[50px] cursor-pointer appearance-auto accent-white " type = "range" min = "0" max = ${songDuration[i]} value = "0">
                    <span class = "tott-time text-xs lg:text-base">${secondsToFancyTime(songDuration[i])}</span>
                </div>
                <div class = "flex -mt-2 flex-row justify-center items-center sm:mt-1 sm:flex-col xl:flex-row lg:mt-5">
                    <div class = "flex flex-nowrap">
                        <label class = "select-none">
                        <input type="checkbox" class="accent-black autoplay" ${autoPlay ? "checked" : "unchecked"}> <span class = "text-white text-xs lg:text-base">Autoplay</span>
                        </label>
                    </div>
                    <div class = "flex justify-center items-center text-white gap-4 xl:justify-end">
                        <span class = "volText text-xs lg:text-base">VOL. ${volume}%</span>
                        <input class = "volBar transparent h-[10px] w-[30%]  cursor-pointer appearance-auto accent-white " type = "range" min = "0" max = "100" value = "${volume}">
                    </div>
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
