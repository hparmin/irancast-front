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
        768: {
            items: 1
        },
        992: {
            items: 3
        },
        1000: {
            items: 3
        }
    },
    navText: ['<span class="fa-solid fa-arrow-right"></span>', '<span class="fa-solid fa-arrow-left"></span>']
})

$('#comment-slider2').owlCarousel({
    loop: true,
    margin: 0,
    nav: true,
    rtl: true,
    responsiveRefreshRate: 100,
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 1
        },
        992: {
            items: 3
        },
        1000: {
            items: 3
        }
    },
    navText: ['<span class="fa-solid fa-arrow-right"></span>', '<span class="fa-solid fa-arrow-left"></span>']
})
//کد های بخش faq:
document.addEventListener('DOMContentLoaded', function() {
    const theHeadElements = document.querySelectorAll('.the-head');

    theHeadElements.forEach(head => {
        const parentFaq = head.parentElement; // .each-faq
        const content = head.nextElementSibling; // .the-content
        const icon = head.querySelector('i');
        // انتخاب svg: اگر کلاس مخصوص داشتی از اون استفاده می‌کنیم، در غیر اینصورت هر svg داخل head.
        const svg = head.querySelector('.faq-each-svg') || head.querySelector('svg');

        // ***** تنظیم اولیه (فقط در صورتی که استایل‌ها تنظیم نشده باشند) *****
        // محتوا
        content.style.overflow = 'hidden';
        content.style.transition = content.style.transition || 'opacity 300ms ease, max-height 300ms ease';
        // اگر از قبل باز نیست، بسته قرار بدیم
        if (!parentFaq.classList.contains('active')) {
            content.style.display = 'none';
            content.style.opacity = '0';
            content.style.maxHeight = '0';
        } else {
            // اگر به صورت دستی در HTML کلاس active داشتیم، حالت باز را تنظیم کن
            content.style.display = 'block';
            content.style.opacity = '1';
            content.style.maxHeight = content.scrollHeight + 'px';
        }

        // svg
        if (svg) {
            svg.style.transition = svg.style.transition || 'opacity 300ms ease, transform 300ms ease';
            if (!parentFaq.classList.contains('active')) {
                svg.style.opacity = '0';
                svg.style.visibility = 'hidden';
                svg.style.transform = 'translateY(10px)';
            } else {
                svg.style.visibility = 'visible';
                svg.style.opacity = '1';
                svg.style.transform = 'translateY(20)';
            }
        }

        // آیکون
        if (icon) {
            icon.style.transition = icon.style.transition || 'transform 300ms ease';
            icon.style.transformOrigin = icon.style.transformOrigin || '50% 50%';
            icon.style.transform = parentFaq.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
        }

        // ***** کلیک روی head *****
        head.addEventListener('click', function() {
            const isOpen = parentFaq.classList.contains('active');

            // ---------- آکاردئون: بستن بقیه آیتم‌های باز ----------
            document.querySelectorAll('.each-faq.active').forEach(otherFaq => {
                if (otherFaq === parentFaq) return; // آیتمِ فعلی را نِبُند
                otherFaq.classList.remove('active');

                const otherContent = otherFaq.querySelector('.the-content');
                const otherIcon = otherFaq.querySelector('.the-head i');
                const otherSvg = otherFaq.querySelector('.faq-each-svg') || otherFaq.querySelector('svg');

                if (otherContent) {
                    otherContent.style.opacity = '0';
                    otherContent.style.maxHeight = '0';
                    // بعد از پایان transition، display:none بذار
                    setTimeout(() => { otherContent.style.display = 'none'; }, 300);
                }
                if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                if (otherSvg) {
                    otherSvg.style.opacity = '0';
                    otherSvg.style.transform = 'translateY(20px)';
                    setTimeout(() => { otherSvg.style.visibility = 'hidden'; }, 300);
                }
            });

            // ---------- حالا آیتم فعلی را باز یا ببند ----------
            if (!isOpen) {
                parentFaq.classList.add('active');

                // نمایش محتوا و تعیین maxHeight براساس scrollHeight برای انیمیشن دقیق
                content.style.display = 'block';
                // فورس رِفلوی مرورگر تا transition کار کنه
                void content.offsetHeight;
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';

                // svg نمایش
                if (svg) {
                    svg.style.visibility = 'visible';
                    void svg.offsetHeight;
                    svg.style.opacity = '1';
                    svg.style.transform = 'translateY(10)';
                }

                // آیکون بچرخد
                if (icon) icon.style.transform = 'rotate(180deg)';
            } else {
                parentFaq.classList.remove('active');

                // بستن محتوا
                content.style.opacity = '0';
                content.style.maxHeight = '0';
                setTimeout(() => { content.style.display = 'none'; }, 300);

                // svg مخفی
                if (svg) {
                    svg.style.opacity = '0';
                    svg.style.transform = 'translateY(20px)';
                    setTimeout(() => { svg.style.visibility = 'hidden'; }, 300);
                }

                // آیکون برگردد
                if (icon) icon.style.transform = 'rotate(0deg)';
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // کد زیر باعث میشه تا اگر داخل تگ ال آی، یو ال بود، یک اسپن با کلاس فلش به انتهای تگ h2 اضافه بشه
    const listItems = document.querySelectorAll("li");

    listItems.forEach(li => {
        const hasUL = li.querySelector("ul");
        const h2 = li.querySelector("ul.mobile>li>ul li h2");

        if (hasUL && h2) {
            // اگر هنوز span اضافه نشده بود، اضافه کن
            if (!h2.querySelector(".sub-menu-arrow")) {
                const span = document.createElement("span");
                span.className = "sub-menu-arrow fa-solid fa-angle-down";
                h2.appendChild(span);
            }
        }
    });

    // کد زیر باعث باز و بسته شدن زیر منوی ها میشن:
    $('.header-content-top a.has-submenu').click(function (e) {
        e.preventDefault();
        $(this).next("ul").slideToggle();
        $(this).find('i').toggleClass('active');
        // چرخش فلش منوی اصلی
        $(this).find('.sub-menu-arrow').toggleClass('rotated');
    });

    $('.irancast-header .header-content-top .container>ul.mobile>li>ul li h2').click(function () {
        $(this).next("div").slideToggle();
        $(this).find('.sub-menu-arrow').toggleClass('rotated');
    });
});


// کد زیر باعث باز شدن منوی همبرگری مشود:
$(document).ready(function () {
    $('.hamburgar-menu-div').click(function () {
        $('.irancast-header .header-content-top .container>ul.mobile').toggleClass('menu-open');
    });
});
// کد های زیر باعث باز و بسته شدن زیر منو های منوی همبرگری میشن:
jQuery(document).ready(function($){
    $('.archive-page .archive-side .rest-side .categories .each-cat .up-cat').on('click', function(){
        $(this).toggleClass('active'); // هم رنگ تغییر می‌کنه هم اسپن می‌چرخه
        $(this).next('.all-taxes').slideToggle(300);
    });
});




// کدهای مخصوص باز و بسته شدن سایدبار صفحات مختلف
document.addEventListener('DOMContentLoaded', () => {
    // --- سایدبار صفحه آرشیو اپیزودها ---
    const archiveAside = document.querySelector('.archive-page .archive-side');
    const archiveHandle = document.querySelector('.archive-page .archive-side .handle');
    if (archiveAside && archiveHandle) {
        archiveHandle.addEventListener('click', () => archiveAside.classList.toggle('open'));
    }

    // --- سایدبار داشبورد ---
    const dashAside = document.querySelector('.iarncast-dashboard .container .dashboard-sidebar');
    const dashHandle = document.querySelector('.iarncast-dashboard .container .dashboard-sidebar .handle');
    if (dashAside && dashHandle) {
        dashHandle.addEventListener('click', () => dashAside.classList.toggle('open'));
    }

    // --- سایدبار صفحه سینگل اپیزود ---
    const singleAside = document.querySelector('.single-episode-sidebar');
    const singleHandle = document.querySelector('.single-episode-sidebar .handle');
    if (singleAside && singleHandle) {
        singleHandle.addEventListener('click', () => singleAside.classList.toggle('open'));
    }
});






//  دستورات زیر باعث میشن تا هر کدام از ردیف های صفحه orders به ده درصد رنگ اصلی و ده درصد رنگ اصلی دوم در بیام
document.addEventListener('DOMContentLoaded', () => {
    // کانتینر مورد نظر (fallback به document در صورت نبودن)
    const container = document.querySelector('.dashboard-content .content .my-downloads') || document;

    // انتخاب دقیق ردیف‌های سفارش (مطابق ساختاری که فرستادی)
    const rows = Array.from(container.querySelectorAll('.row'));
    if (!rows.length) return; // اگر ردیفی نبود کاری نمیکنیم

    // تلاش برای گرفتن مقدار یک CSS variable از چند جای ممکن
    function getCssVar(varName) {
        varName = varName.startsWith('--') ? varName : `--${varName}`;
        // اول کانتینر رو چک کن چون ممکنه متغیر در همون scope تعریف شده باشه
        let v = getComputedStyle(container).getPropertyValue(varName).trim();
        if (v) return v;
        // بعد ریشه
        v = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
        if (v) return v;
        // بعد body به عنوان fallback
        return getComputedStyle(document.body).getPropertyValue(varName).trim();
    }

    // هر رشته رنگی که CSS قبول میکنه رو بگیره و به rgba(r,g,b,alpha) تبدیل کنه
    function colorStringToRgbaWithAlpha(colorStr, alpha) {
        if (!colorStr) return '';
        colorStr = colorStr.trim();

        // استفاده از عنصر موقت تا مرورگر خودش رنگ رو normalize کنه
        const tmp = document.createElement('div');
        tmp.style.color = colorStr;
        tmp.style.display = 'none';
        document.body.appendChild(tmp);
        const computed = getComputedStyle(tmp).color; // مثال: "rgb(255, 0, 0)" یا "rgba(255, 0, 0, 0.5)"
        document.body.removeChild(tmp);

        const m = computed.match(/rgba?\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)(?:\s*,\s*([0-9.]+))?\s*\)/);
        if (m) {
            const r = parseInt(m[1], 10);
            const g = parseInt(m[2], 10);
            const b = parseInt(m[3], 10);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }

        // اگر همه چیز شکست خورد و colorStr قالب hex داشت، هندل کن (خیلی بعید ولی امنه)
        const hexMatch = colorStr.replace(/\s+/g, '').match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
        if (hexMatch) {
            let hex = hexMatch[1];
            if (hex.length === 3) hex = hex.split('').map(h => h + h).join('');
            const r = parseInt(hex.slice(0, 2), 16);
            const g = parseInt(hex.slice(2, 4), 16);
            const b = parseInt(hex.slice(4, 6), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }

        return '';
    }

    // گرفتن متغیرها (با fallback رنگ نمونه اگر متغیر موجود نبود)
    const mainVar = getCssVar('--maincolor') || '#DA2F37';
    const secondVar = getCssVar('--secondmaincolor') || '#000';

    const mainRgba = colorStringToRgbaWithAlpha(mainVar, 0.1) || colorStringToRgbaWithAlpha('#DA2F37', 0.1);
    const secondRgba = colorStringToRgbaWithAlpha(secondVar, 0.1) || colorStringToRgbaWithAlpha('#000', 0.1);

    // اعمال رنگ‌ها: ایندکس 0 (اول) -> odd در CSS (nth-child(odd))، پس idx%2===0 => main
    rows.forEach((row, idx) => {
        const bg = (idx % 2 === 0) ? mainRgba : secondRgba;
        if (bg) row.style.backgroundColor = bg;
    });

    // اگر می‌خوای بعداً دوباره اعمالش کنی (مثلاً بعد از تغییر متغیرها)، از این تابع استفاده کن:
    // applyStripedBackgrounds();
    function applyStripedBackgrounds() {
        const updatedMain = colorStringToRgbaWithAlpha(getCssVar('--maincolor') || mainVar, 0.1);
        const updatedSecond = colorStringToRgbaWithAlpha(getCssVar('--secondmaincolor') || secondVar, 0.1);
        rows.forEach((row, idx) => {
            row.style.backgroundColor = (idx % 2 === 0) ? (updatedMain || mainRgba) : (updatedSecond || secondRgba);
        });
    }

    // (اختیاری) اگر پنل ادمین باعث میشه متغیرها runtime تغییر کنن و بخوای خودکار آپدیت بشه،
    // می‌تونی یک MutationObserver یا event listener اضافه کنی که applyStripedBackgrounds رو صدا بزنه.
});








