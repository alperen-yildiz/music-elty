// Get DOM elements
const audioPlayer = document.getElementById('audioPlayer');
const muteButton = document.getElementById('muteButton');
const playPauseButton = document.getElementById('playPauseButton');
const playPauseIcon = document.getElementById('playPauseIcon');
const progressBar = document.querySelector('.progress-bar');
const progressFill = document.getElementById('progressFill');
const progressHandle = document.querySelector('.progress-handle');
const currentTimeElement = document.getElementById('currentTime');
const durationElement = document.getElementById('duration');

// Initialize mute state
let isMuted = false;
let isDragging = false;

// Toggle mute function
function toggleMute() {
    isMuted = !isMuted;
    audioPlayer.muted = isMuted;
    
    if (isMuted) {
        muteButton.querySelector('i').className = 'fa-solid fa-volume-xmark';
        muteButton.classList.add('muted');
    } else {
        muteButton.querySelector('i').className = 'fa-solid fa-volume-high';
        muteButton.classList.remove('muted');
    }
}

// Play/Pause toggle function
function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseIcon.className = "fa-solid fa-pause";
    } else {
        audioPlayer.pause();
        playPauseIcon.className = "fa-solid fa-play";
    }
}

// Format time in minutes and seconds
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Update progress bar
function updateProgress() {
    if (audioPlayer.duration && !isDragging) {
        const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressFill.style.width = `${progressPercent}%`;
        progressHandle.style.left = `${progressPercent}%`;
        currentTimeElement.textContent = formatTime(audioPlayer.currentTime);
        durationElement.textContent = formatTime(audioPlayer.duration);
    }
}

// Set progress bar position when user clicks on it
function setProgress(e) {
    const rect = progressBar.getBoundingClientRect();
    const width = rect.width;
    const clickX = e.clientX - rect.left;
    const duration = audioPlayer.duration;
    
    audioPlayer.currentTime = (clickX / width) * duration;
}

// Handle drag start
function startDrag(e) {
    isDragging = true;
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
    drag(e); // Update position immediately
}

// Handle dragging
function drag(e) {
    if (isDragging) {
        const rect = progressBar.getBoundingClientRect();
        const width = rect.width;
        let clickX = e.clientX - rect.left;
        
        // Constrain within the progress bar
        clickX = Math.max(0, Math.min(width, clickX));
        
        const progressPercent = (clickX / width) * 100;
        progressFill.style.width = `${progressPercent}%`;
        progressHandle.style.left = `${progressPercent}%`;
        
        // Update time display while dragging
        const newTime = (clickX / width) * audioPlayer.duration;
        currentTimeElement.textContent = formatTime(newTime);
    }
}

// Handle drag end
function stopDrag(e) {
    if (isDragging) {
        const rect = progressBar.getBoundingClientRect();
        const width = rect.width;
        let clickX = e.clientX - rect.left;
        
        // Constrain within the progress bar
        clickX = Math.max(0, Math.min(width, clickX));
        
        audioPlayer.currentTime = (clickX / width) * audioPlayer.duration;
        isDragging = false;
        
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDrag);
    }
}

// Add event listeners
muteButton.addEventListener('click', toggleMute);
playPauseButton.addEventListener('click', togglePlayPause);

// Add event listeners for progress bar
progressBar.addEventListener('click', setProgress);
progressHandle.addEventListener('mousedown', startDrag);

// Update progress as audio plays
audioPlayer.addEventListener('timeupdate', updateProgress);

// Set duration display when metadata is loaded
audioPlayer.addEventListener('loadedmetadata', () => {
    durationElement.textContent = formatTime(audioPlayer.duration);
    currentTimeElement.textContent = '0:00';
    progressFill.style.width = '0%';
    progressHandle.style.left = '0%';
});