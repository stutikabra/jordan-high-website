const allImages = document.querySelectorAll('img');

const sections = document.querySelectorAll('.section');

const fadeElements = document.querySelectorAll('.fade-in');

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  const message = document.getElementById("form-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // stop page reload
    message.style.display = "block";
    form.reset();
  });
});

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target); // optional: stop observing after fade-in
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => fadeObserver.observe(el));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

window.addEventListener('load', () => {
  const heroSection = document.querySelector('.hero');
  const heroText = document.querySelector('.hero-text');

  // fade in overlay first
  heroSection.classList.add('visible');

  // fade in text after overlay finishes (1.5s)
  setTimeout(() => {
    heroText.classList.add('visible');
  }, 1000);
});

allImages.forEach(img => {
  img.style.cursor = 'pointer';

  img.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.classList.add('img-overlay');


    const fullImg = document.createElement('img');
    fullImg.src = img.src;
    fullImg.classList.add('full-img');


    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.classList.add('close-btn');


    overlay.appendChild(fullImg);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);


    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      overlay.remove();
    });


    overlay.addEventListener('click', () => {
      overlay.remove();
    });

    fullImg.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });
});