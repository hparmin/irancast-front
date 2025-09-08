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
    initializePlayers(); // Initialize players after DOM is loaded
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

// Initialize all players
function initializePlayers() {
    const players = document.querySelectorAll('.custom-player');

    players.forEach(player => {
        const playPauseBtn = player.querySelector('.play-pause');
        const audio = player.querySelector('audio');
        const progressContainer = player.querySelector('.progress-container');
        const progress = player.querySelector('.progress');
        const currentTimeEl = player.querySelector('.current');
        const durationEl = player.querySelector('.duration');
        const volumeControl = player.querySelector('.volume');
        const volumeIcon = player.querySelector('.fa-volume-high');

        // Pause other players when one starts playing
        audio.addEventListener('play', () => {
            players.forEach(otherPlayer => {
                if (otherPlayer !== player) {
                    const otherAudio = otherPlayer.querySelector('audio');
                    if (!otherAudio.paused) {
                        otherAudio.pause();
                        const otherPlayBtn = otherPlayer.querySelector('.play-pause');
                        otherPlayBtn.classList.remove("fa-pause");
                        otherPlayBtn.classList.add("fa-play");
                    }
                }
            });
        });

        // Play / Pause
        playPauseBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playPauseBtn.classList.remove("fa-play");
                playPauseBtn.classList.add("fa-pause");
            } else {
                audio.pause();
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

        // Volume control
        function updateVolumeBackground() {
            const value = volumeControl.value * 100;
            volumeControl.style.background =
                `linear-gradient(to right, white 0%, white ${value}%, transparent ${value}%, transparent 100%)`;
        }

        volumeControl.addEventListener('input', () => {
            audio.volume = volumeControl.value;
            updateVolumeBackground();

            // Update volume icon based on volume level
            if (audio.volume === 0) {
                volumeIcon.classList.remove('fa-volume-high');
                volumeIcon.classList.add('fa-volume-xmark');
            } else {
                volumeIcon.classList.remove('fa-volume-xmark');
                volumeIcon.classList.add('fa-volume-high');
            }
        });

        // Volume icon click (mute/unmute)
        volumeIcon.addEventListener('click', () => {
            if (audio.muted || audio.volume === 0) {
                audio.muted = false;
                if (audio.volume === 0) audio.volume = 1;
                volumeControl.value = audio.volume;
                updateVolumeBackground();
                volumeIcon.classList.remove('fa-volume-xmark');
                volumeIcon.classList.add('fa-volume-high');
            } else {
                audio.muted = true;
                volumeControl.value = 0;
                updateVolumeBackground();
                volumeIcon.classList.remove('fa-volume-high');
                volumeIcon.classList.add('fa-volume-xmark');
            }
        });

        // Initialize volume background
        updateVolumeBackground();
    });
}

// دستور زیر باعث میشه که پاراگراف تعیین شده، 4 کلمه در خط اول داشته باشه و مابقی کلمات به خط بعد برن. (برای عدم تداخل متن و شیپ)
document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".card-desc-p-limit");

    elements.forEach(function (el) {
        const words = el.innerText.trim().split(/\s+/);

        if (words.length <= 5) {
            el.innerHTML = `<span>${words.join(" ")}</span>`;
        } else {
            const firstLine = words.slice(0, 5).join(" ");
            const rest = words.slice(5).join(" ");
            el.innerHTML = `<span>${firstLine}</span><br><span>${rest}</span>`;
        }
    });
});


//comment sliders:
$('#comment-slider').owlCarousel({
    loop: true,
    margin: 0,
    nav: true,
    rtl: true,
    responsiveRefreshRate: 100,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 3
        }
    },
    navText: ['<span class="fa-solid fa-arrow-right"></span>', '<span class="fa-solid fa-arrow-left"></span>']
})


