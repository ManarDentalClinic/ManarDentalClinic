/* ===========================
   DOM Elements
   =========================== */
const navbar = document.getElementById('navbar');
const modalOverlay = document.getElementById('modalOverlay');
const closeModalBtn = document.getElementById('closeModal');
const openModalBtns = document.querySelectorAll('.open-modal');
const portfolioGrid = document.getElementById('portfolioGrid');

/* ===========================
   Navbar scroll effect
   =========================== */
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ===========================
   Modal open / close
   =========================== */
openModalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

closeModalBtn.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
    closeModal();
  }
});

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

/* ===========================
   Dynamic portfolio image loader
   Tries images/1.jpg, images/2.jpg, ... until one fails to load.
   =========================== */
function loadPortfolioImages() {
  let index = 1;

  function tryLoad() {
    const img = new Image();
    img.src = `images/${index}.jpg`;

    img.onload = () => {
      const card = document.createElement('div');
      card.className = 'portfolio-card fade-in';

      const cardImg = document.createElement('img');
      cardImg.src = img.src;
      cardImg.alt = `عمل رقم ${index}`;
      cardImg.loading = 'lazy';

      card.appendChild(cardImg);
      portfolioGrid.appendChild(card);

      observer.observe(card);

      index++;
      tryLoad();
    };

    img.onerror = () => {
      if (index === 1) {
        portfolioGrid.closest('.section').style.display = 'none';
      }
    };
  }

  tryLoad();
}

/* ===========================
   Fade-in on scroll (Intersection Observer)
   =========================== */
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px',
});

fadeEls.forEach(el => observer.observe(el));

loadPortfolioImages();
