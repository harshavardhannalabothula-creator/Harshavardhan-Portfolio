// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  // Add slight delay for outline
  cursorOutline.animate({
    left: `${posX}px`,
    top: `${posY}px`
  }, { duration: 500, fill: "forwards" });
});

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, input, textarea');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorOutline.style.width = '60px';
    cursorOutline.style.height = '60px';
    cursorOutline.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
  });
  el.addEventListener('mouseleave', () => {
    cursorOutline.style.width = '40px';
    cursorOutline.style.height = '40px';
    cursorOutline.style.backgroundColor = 'transparent';
  });
});

// Mobile Menu Toggle
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.querySelector('.nav-links');

if(menuIcon) {
  menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Sticky Navbar & Active Link
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  // Sticky Navbar
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active Link Highlighting
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(li => {
    li.classList.remove('active');
    if (li.getAttribute('href') === `#${current}`) {
      li.classList.add('active');
    }
  });
});

// Dark/Light Theme Toggle
const themeBtn = document.getElementById('theme-btn');
const htmlElement = document.documentElement;

// Check local storage
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  htmlElement.setAttribute('data-theme', currentTheme);
  themeBtn.innerHTML = currentTheme === 'light' ? '<i class="bx bx-moon"></i>' : '<i class="bx bx-sun"></i>';
}

themeBtn.addEventListener('click', () => {
  let theme = htmlElement.getAttribute('data-theme');
  if (theme === 'light') {
    htmlElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    themeBtn.innerHTML = '<i class="bx bx-sun"></i>';
  } else {
    htmlElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    themeBtn.innerHTML = '<i class="bx bx-moon"></i>';
  }
});

// Typewriter Effect
const texts = ["Frontend Developer", "Web Designer", "UI/UX Enthusiast", "Creative Coder"];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';
const typingElement = document.querySelector('.typing-text');

function type() {
  if(!typingElement) return;

  if (count === texts.length) {
    count = 0;
  }
  currentText = texts[count];
  letter = currentText.slice(0, ++index);

  typingElement.textContent = letter;
  
  if (letter.length === currentText.length) {
    count++;
    index = 0;
    setTimeout(type, 2000); // Pause before next text
  } else {
    setTimeout(type, 100);
  }
}
document.addEventListener("DOMContentLoaded", type);

// Scroll Reveal
function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}
window.addEventListener("scroll", reveal);
// Trigger once on load
reveal();

// Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filterValue = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Skill Progress Bars Animation on Scroll
const skillBars = document.querySelectorAll('.skill-progress');
function fillBars() {
  skillBars.forEach(bar => {
    const barTop = bar.getBoundingClientRect().top;
    if (barTop < window.innerHeight - 50) {
      const width = bar.getAttribute('data-width');
      bar.style.width = width;
    }
  });
}
window.addEventListener('scroll', fillBars);
fillBars();

// Form Validation simple
const contactForm = document.getElementById('contact-form');
if(contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! This is a placeholder action.');
    contactForm.reset();
  });
}

// HTML5 Canvas Particle Background
const canvas = document.getElementById("particle-canvas");
if(canvas) {
  const ctx = canvas.getContext("2d");
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particlesArray;

  class Particle {
    constructor(x, y, directionX, directionY, size, color) {
      this.x = x;
      this.y = y;
      this.directionX = directionX;
      this.directionY = directionY;
      this.size = size;
      this.color = color;
    }
    // Method to draw individual particle
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
    // Check particle position, update position
    update() {
      if (this.x > canvas.width || this.x < 0) {
        this.directionX = -this.directionX;
      }
      if (this.y > canvas.height || this.y < 0) {
        this.directionY = -this.directionY;
      }
      this.x += this.directionX;
      this.y += this.directionY;
      this.draw();
    }
  }

  function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
      let size = (Math.random() * 2) + 1;
      let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
      let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
      let directionX = (Math.random() * 1) - 0.5;
      let directionY = (Math.random() * 1) - 0.5;
      let color = 'rgba(59, 130, 246, 0.4)';
      
      particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
  }

  function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
    }
    connectParticles();
  }

  function connectParticles() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + 
                       ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
        if (distance < (canvas.width/7) * (canvas.height/7)) {
          opacityValue = 1 - (distance/20000);
          ctx.strokeStyle = `rgba(59, 130, 246, ${opacityValue})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    initParticles();
  });

  initParticles();
  animateParticles();
}
