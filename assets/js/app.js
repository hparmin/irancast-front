
// دستورات زیر تمام اعداد سایت رو به فارسی تبدیل میکنن:
function convertNumbersToFarsi(element) {
    if (!element) element = document.body;

    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    let node;
    while (node = walker.nextNode()) {
        node.nodeValue = node.nodeValue.replace(/\d/g, function(digit) {
            return '۰۱۲۳۴۵۶۷۸۹'[digit];
        });
    }
}
// اجرا روی کل صفحه بعد از لود شدن
document.addEventListener("DOMContentLoaded", function() {
    convertNumbersToFarsi(document.body);
});
// برای محتوای داینامیک
new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                convertNumbersToFarsi(node);
            }
        });
    });
}).observe(document.body, { childList: true, subtree: true });

// کد های بخش پلیر:
const player = document.querySelector('.custom-player');
const playPauseBtn = player.querySelector('.play-pause');
const audio = player.querySelector('audio');
const progressContainer = player.querySelector('.progress-container');
const progress = player.querySelector('.progress');
const currentTimeEl = player.querySelector('.current');
const durationEl = player.querySelector('.duration');
const volumeControl = player.querySelector('.volume');

// تبدیل مستقیم عدد به فارسی
function toFarsiNumber(num) {
    return num.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
}

// Format time mm:ss
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${toFarsiNumber(minutes)}:${toFarsiNumber(seconds)}`;
}

// Play / Pause
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        // playPauseBtn.textContent = '⏸️';
        playPauseBtn.classList.remove("fa-play");
        playPauseBtn.classList.add("fa-pause");
    } else {
        audio.pause();
        // playPauseBtn.textContent = '▶️';
        playPauseBtn.classList.remove("fa-pause");
        playPauseBtn.classList.add("fa-play");
    }
});

// Update progress
audio.addEventListener('timeupdate', () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${percent}%`;
    currentTimeEl.textContent = formatTime(audio.currentTime);
});

// Set duration
audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
});

// Seek
progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
});
// Volume
volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
});

// بخش ولوم:
function updateVolumeBackground() {
    const value = volumeControl.value * 100; // درصد
    volumeControl.style.background =
        `linear-gradient(to right, white 0%, white ${value}%, transparent ${value}%, transparent 100%)`;
}

volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
    updateVolumeBackground();
});
// اجرای اولیه
updateVolumeBackground();


const volumeIcon = player.querySelector('.fa-volume-high'); // یا هر i که گذاشتی

volumeIcon.addEventListener('click', () => {
    if (audio.muted || audio.volume === 0) {
        // صدا رو برگردون
        audio.muted = false;
        if (audio.volume === 0) audio.volume = 1; // اگر قبلاً صفر بود
        volumeControl.value = audio.volume;
        updateVolumeBackground();

        // تغییر کلاس آیکون
        volumeIcon.classList.remove('fa-volume-xmark');
        volumeIcon.classList.add('fa-volume-high');
    } else {
        // mute کن
        audio.muted = true;
        volumeControl.value = 0;
        updateVolumeBackground();

        // تغییر کلاس آیکون
        volumeIcon.classList.remove('fa-volume-high');
        volumeIcon.classList.add('fa-volume-xmark');
    }
});



