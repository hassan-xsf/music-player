const songsList = {
    0: {
        name : "Song 1",
        artist : "Ali",
        logo : "https://i.scdn.co/image/ab67616d00001e02ba03ff79dad25f7c3542382f",
        link : "https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3",
    
    },
    1: {
        name : "Song 2",
        artist : "Bhai",
        logo : "https://i.scdn.co/image/ab67616d00001e02ba03ff79dad25f7c3542382f",
        link : "https://commondatastorage.googleapis.com/codeskulptor-assets/Evillaugh.ogg",
    },
    2: {
        name : "Song 3",
        artist : "Shera",
        logo : "https://i.scdn.co/image/ab67616d00001e02ba03ff79dad25f7c3542382f",
        link : "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3",
    }
}

loadSongsList();

function loadSongsList() {
    const pageContains = 8;
    let songNames = [];
    let songArtists = [];
    let songLinks = [];
    let songLogo = [];
    let count = 0;
    for(const i in songsList) {
        songNames[count] = songsList[i].name;
        songArtists[count] = songsList[i].artist;
        songLinks[count] = songsList[i].link;
        songLogo[count] = songsList[i].logo;
        count++;    
    }
    for(const i of songNames) {
        console.log(i)
    }
}
function updateSongsPage(page = 0) {

}