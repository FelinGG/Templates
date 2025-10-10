// --- FETCH TEMPLATES ---
fetch('templates.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('template-list');
    data.forEach(template => {
      const card = document.createElement('div');
      card.classList.add('template-card');
      card.innerHTML = `
        <img src="${template.thumbnail}" alt="${template.name}">
        <h3>${template.name}</h3>
        <p>${template.description}</p>
        <a href="${template.link}" target="_blank">View Template</a>
      `;
      container.appendChild(card);
    });

    const cards = document.querySelectorAll('.template-card');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
      });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
  });

// --- TYPING EFFECT FOR MULTIPLE PHRASES ---
const phrases = [
  "Modern, minimalist and fully responsive",
  "Elegant, fast and easy to customize",
  "Designed with passion, ready to use"
];

const typingElement = document.getElementById("typing-text");
let phraseIndex = 0;
let charIndex = 0;
let typingDelay = 80;
let erasingDelay = 40;
let newPhraseDelay = 1500;

function smoothScrollTo(targetY, duration = 600) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  const startTime = performance.now();

  function step(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    window.scrollTo(0, startY + diff * easeInOutQuad(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  function easeInOutQuad(t) {
    return t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t;
  }

  requestAnimationFrame(step);
}

// Wybieramy wszystkie linki wewnętrzne zaczynające się od #
const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault(); // blokujemy domyślne przewijanie
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const targetPosition = target.offsetTop; // pozycja sekcji
      smoothScrollTo(targetPosition, 800); // 800ms animacji
    }
  });
});


// Add span for cursor
typingElement.innerHTML = '<span id="typed"></span><span id="cursor">|</span>';
const typedSpan = document.getElementById('typed');
const cursor = document.getElementById('cursor');

function typePhrase() {
  cursor.style.opacity = '1';
  if(charIndex < phrases[phraseIndex].length){
    typedSpan.textContent += phrases[phraseIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typePhrase, typingDelay);
  } else {
    cursor.style.opacity = '0';
    setTimeout(erasePhrase, newPhraseDelay);
  }
}

function erasePhrase() {
  cursor.style.opacity = '1';
  if(charIndex > 0){
    typedSpan.textContent = phrases[phraseIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erasePhrase, erasingDelay);
  } else {
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typePhrase, typingDelay);
  }
}

window.addEventListener("load", () => {
  setTimeout(typePhrase, 500);
});

// --- FALLING LEAVES ---
const leavesContainer = document.querySelector('.falling-leaves');

const leafImages = [
  'assets/addons/leaf1.png',
  'assets/addons/leaf2.png',
  'assets/addons/leaf3.png'
];

for(let i = 0; i < 30; i++) {
  const leaf = document.createElement('img');
  leaf.src = leafImages[Math.floor(Math.random() * leafImages.length)];
  
  leaf.style.left = Math.random() * 100 + 'vw';
  
  const size = 20 + Math.random() * 50;
  leaf.style.width = size + 'px';
  
  const duration = 5 + Math.random() * 15;
  leaf.style.animationDuration = duration + 's';
  
  leaf.style.animationDelay = Math.random() * duration + 's';
  
  leaf.style.top = '-50px';
  
  leavesContainer.appendChild(leaf);
}
