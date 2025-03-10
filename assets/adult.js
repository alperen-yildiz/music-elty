// Firebase bağlantısı için gerekli modülleri içe aktar
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Firebase yapılandırma bilgileri
const firebaseConfig = {
    apiKey: "AIzaSyD9NMbri848d7aVY0J-Nbf51DG0LOLchk8",
    authDomain: "musicelty.firebaseapp.com",
    projectId: "musicelty",
    storageBucket: "musicelty.firebasestorage.app",
    messagingSenderId: "525623631313",
    appId: "1:525623631313:web:18de8d7f7b50c95a29d4f0",
    measurementId: "G-GBHVQ3T161"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM elemanlarını seç
const songList = document.getElementById("songList");
const albumCover = document.getElementById("albumCover");
const songTitle = document.getElementById("songTitle");
const artistName = document.getElementById("artistName");
const lyricsBox = document.getElementById("lyricsBox");
const audioPlayer = document.getElementById("audioPlayer");
const playPauseButton = document.getElementById("playPauseButton");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const playPauseIcon = document.getElementById("playPauseIcon");

let currentSongIndex = 0;
let songs = [];

// Firestore'dan şarkıları çek
async function fetchSongs() {
    try {
        const querySnapshot = await getDocs(collection(db, "music"));
        songs = querySnapshot.docs.map(doc => ({
            title: doc.data().title,
            artist: doc.data().artist,
            lyrics: doc.data().lyrics,
            albumArt: doc.data().albumArt,
            audioSrc: doc.data().audioSrc
        }));
        renderSongList();
        if (songs.length > 0) loadSong(0);
    } catch (error) {
        console.error("Firestore'dan veri çekilirken hata oluştu: ", error);
    }
}

// Şarkı listesini ekrana render et
function renderSongList() {
    songList.innerHTML = "";
    songs.forEach((song, index) => {
        const songItem = document.createElement("div");
        songItem.textContent = `${song.title} - ${song.artist}`;
        songItem.classList.add("song-item");
        songItem.addEventListener("click", () => loadSong(index));
        songList.appendChild(songItem);
    });
}

// Şarkıyı yükle
function loadSong(index) {
    const song = songs[index];
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
    lyricsBox.textContent = song.lyrics;
    albumCover.src = song.albumArt;
    audioPlayer.src = song.audioSrc;
    currentSongIndex = index;
}

// Kontrol butonlarına event listener ekle
// Play/Pause button functionality moved to muzik.js
prevButton.addEventListener("click", () => {
    if (currentSongIndex > 0) {
        loadSong(currentSongIndex - 1);
        audioPlayer.play();
    }
});
nextButton.addEventListener("click", () => {
    if (currentSongIndex < songs.length - 1) {
        loadSong(currentSongIndex + 1);
        audioPlayer.play();
    }
});

// Sayfa yüklendiğinde şarkıları çek
document.addEventListener("DOMContentLoaded", fetchSongs);