
import { loadHome } from './home.js';
import { loadAbout } from './about.js';

window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').style.display = 'none';
    //handleRoute();
  }, 2000);
});

// 🔁 handle route change
function handleRoute() {
  const hash = window.location.hash;
  clearBlast();
  if (hash === '#about') {
    loadAbout();
  } else {
    loadHome();
    initBlastAbout();
  }
}

window.addEventListener('hashchange', () => {
  handleRoute();
  console.log('HASH CHANGE FIRED');
});

window.addEventListener('pageshow', () => {
  handleRoute();
  console.log('PAGESHOW FIRED');
});

const btn = document.getElementById('aboutBtn');

function clearBlast() {
  document.querySelectorAll('.blast-letter').forEach(el => el.remove());
}

function initBlastAbout() {
 const btn = document.getElementById('aboutBtn');

  // show button after typing ends (you already did this)
  // then attach click
  btn.addEventListener('click', () => aboutBlast(btn));
}

function aboutBlast(btn) {
  const rect = btn.getBoundingClientRect();
  const text = btn.innerText;

  btn.style.visibility = 'hidden';

  // pick random letter index
  const targetIndex = Math.floor(Math.random() * text.length);

  for (let i = 0; i < text.length; i++) {
    const span = document.createElement('span');
    span.innerText = text[i];
    span.className = 'blast-letter';

    // 👉 starting position
    const startX = rect.left + i * 14;
    const startY = rect.top;

    span.style.left = startX + 'px';
    span.style.top = startY + 'px';

    // span.style.left = rect.left + i * 14 + 'px';
    // span.style.top = rect.top + 'px';

    // ✅ ADD IT HERE (inside loop)
    span.style.setProperty('--start-x', startX + 'px');
    span.style.setProperty('--start-y', startY + 'px');

    if (i === targetIndex) {
      // 🎯 this letter goes to center
      span.classList.add('to-center');
    } else {
      // 💥 random explosion
      const x = (Math.random() - 0.5) * 500 + 'px';
      const y = (Math.random() - 0.5) * 500 + 'px';

      span.style.setProperty('--x', x);
      span.style.setProperty('--y', y);
    }

    document.body.appendChild(span);

    // remove exploded letters
    if (i !== targetIndex) {
      setTimeout(() => span.remove(), 800);
    } else {
      // when center animation ends → load about
      span.addEventListener('animationend', () => {
        window.location.hash = 'about';
        handleRoute();
        span.remove();
      });
    }
  }
};