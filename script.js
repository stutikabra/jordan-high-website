const allImages = document.querySelectorAll('img');

const sections = document.querySelectorAll('.section');

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

allImages.forEach(img => {
  img.style.cursor = 'pointer'; // change cursor

  img.addEventListener('click', () => {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.classList.add('img-overlay');

    // Create full-size image
    const fullImg = document.createElement('img');
    fullImg.src = img.src;
    fullImg.classList.add('full-img');

    // Create close button
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.classList.add('close-btn');

    // Append everything
    overlay.appendChild(fullImg);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);

    // Click close button to remove overlay
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent overlay click
      overlay.remove();
    });

    // Also click overlay (outside image) to close
    overlay.addEventListener('click', () => {
      overlay.remove();
    });

    // Prevent clicking the image itself from closing
    fullImg.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });
});