import { db } from "../js/script.js"; // Firestore bağlantısını içe aktar
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

console.log("alpern");
// Firestore'dan 'music' koleksiyonundaki verileri çek
async function fetchLyrics() {
    try {
        const querySnapshot = await getDocs(collection(db, "music"));
        if (querySnapshot.empty) {
            console.log("No matching documents.");
            return;
        }
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log("Document data:", data); // Hata ayıklama mesajı
            if (data.lyrics) {
                displayLyrics(data.lyrics);
            } else {
                console.log("No lyrics found in document:", doc.id); // Hata ayıklama mesajı
            }
        });
    } catch (error) {
        console.error("Error fetching lyrics:", error); // Hata ayıklama mesajı
    }
}

// Lyrics'i sayfaya ekle
function displayLyrics(lyrics) {
    console.log("Displaying lyrics:", lyrics); // Hata ayıklama mesajı
    const pTag = document.createElement("p");
    pTag.textContent = lyrics;
    document.body.appendChild(pTag);
}

// Sayfa yüklendiğinde çalıştır
document.addEventListener("DOMContentLoaded", fetchLyrics);

console.log("music.js loaded"); // Hata ayıklama mesajı