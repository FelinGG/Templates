// ---------- BACKGROUND DOTS ----------
const dotsContainer = document.getElementById('background-dots');
for (let i = 0; i < 30; i++) {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  dot.style.width = `${Math.random() * 20 + 5}px`;
  dot.style.height = dot.style.width;
  dot.style.left = `${Math.random() * 100}%`;
  dot.style.top = `${Math.random() * 100}%`;
  dot.style.animationDuration = `${Math.random() * 15 + 5}s`;
  dotsContainer.appendChild(dot);
}

// ---------- ABOUT SECTION FADE-IN ----------
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

observer.observe(document.querySelector('.about-container'));

// ---------- CONFIGURATION ----------
const profileType = "developer"; 
// możliwe wartości: "developer", "photographer", "videographer", "mixed"

// ---------- AUTO-SECTION HANDLER ----------
document.addEventListener("DOMContentLoaded", () => {
  const webSection = document.getElementById("projects-web");
  const photoSection = document.getElementById("projects-photo");
  const videoSection = document.getElementById("projects-video");

  // Ukryj wszystkie
  [webSection, photoSection, videoSection].forEach(sec => {
    if (sec) sec.classList.add("hidden");
  });

  // Pokaż właściwe
  switch (profileType) {
    case "developer":
      webSection.classList.remove("hidden");
      break;
    case "photographer":
      photoSection.classList.remove("hidden");
      break;
    case "videographer":
      videoSection.classList.remove("hidden");
      break;
    case "mixed":
      photoSection.classList.remove("hidden");
      videoSection.classList.remove("hidden");
      break;
    default:
      console.warn("⚠️ Unknown profile type, nothing shown.");
  }

  // Po 200ms dodaj klasę show (dla animacji fade-in nagłówków)
  setTimeout(() => {
    document.querySelectorAll('.project-category:not(.hidden)').forEach(sec => {
      sec.classList.add('show');
    });
  }, 200);

  // Dodaj ikony / tryby
  document.querySelectorAll('.project-item').forEach(item => {
    if (profileType === "developer") {
      const icon = document.createElement('i');
      icon.className = 'fa-solid fa-arrow-up-right-from-square hover-icon';
      item.appendChild(icon);
    } else if (profileType === "photographer" || profileType === "videographer") {
      item.classList.add('media-mode');
    }
  });
});

const form = document.getElementById('contactForm');

form.addEventListener('submit', e => {
  e.preventDefault();
  const button = form.querySelector('button');

  // fade out
  button.style.transition = 'opacity 0.6s ease';
  button.style.opacity = '0.3';

  setTimeout(() => {
    // zmiana tekstu
    button.innerHTML = "Sent! <i class='fa-solid fa-check'></i>";
    // fade in
    button.style.opacity = '1';
  }, 600);

  // przywrócenie domyślnego stanu po 2.5s
  setTimeout(() => {
    button.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
    form.reset();
  }, 2500);
});




