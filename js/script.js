'use strict';

const elemToggleFunc = function(elem){ elem.classList.toggle('active'); }

const navbar = document.querySelector('[data-navbar]');
const navOpenBtn = document.querySelector('[data-nav-open-btn]');
const navCloseBtn = document.querySelector('[data-nav-close-btn]');
const overlay = document.querySelector('[data-overlay]');

const navElemArr = [navCloseBtn, navOpenBtn, overlay];

for(let i = 0; i < navElemArr.length; i++ ) {
    navElemArr[i].addEventListener('click', function () { 
        elemToggleFunc(navbar);
        elemToggleFunc(overlay);
    })
}

//Sticky Header

const header = document.querySelector('[data-header]');

window.addEventListener('scroll', function(){
    if(window.scrollY >= 10) { header.classList.add('active'); 
    } else { header.classList.remove('active'); }
})

// Go-top button vanishing

const goTopBtn = document.querySelector('[data-go-top]');
window.addEventListener('scroll', function() {
    if(window.scrollY >= 800) { goTopBtn.classList.add('active'); }
    else { goTopBtn.classList.remove('active'); }
})

//Cookie Hidden
/* Başlangıçta section ve butonu gizle */
document.write('<style>section.cta, button.btn.btn-primary { display: none; }</style>');

function decryptData(data) {
    try {
        return atob(data); // Base64 decode
    } catch (e) {
        return null;
    }
}

// Çerez okuma fonksiyonu
function getCookie(name) {
    let cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        let [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return decryptData(cookieValue);
        }
    }
    return null;
}

document.addEventListener("DOMContentLoaded", function() {
    let hasCookie = getCookie("dashboard") === "true";
    
    let section = document.querySelector("section.cta");
    if (section && hasCookie) {
        section.style.display = "block";
    }
    
    let button = document.querySelector("button.btn.btn-primary:not(section.cta button)");
    if (button) {
        if (hasCookie) {
            button.style.display = "inline-block";
        } else {
            button.disabled = true; // Cookie yoksa buton devre dışı
        }
    }
});

// Butonlara tıklanınca yönlendirme
function redirectToDashboard(event) {
    if (getCookie("dashboard") === "true") {
        window.location.href = "./dashboard/index.html";
    } else {
        event.preventDefault(); // Cookie yoksa yönlendirme iptal
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.querySelectorAll("button.btn.btn-primary");
    buttons.forEach(button => {
        button.addEventListener("click", redirectToDashboard);
    });
});
