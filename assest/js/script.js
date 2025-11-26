// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Floating animations for profile badges
const floatingBadges = document.querySelectorAll('.floating-badge');
floatingBadges.forEach((badge, index) => {
  gsap.to(badge, {
    y: gsap.utils.random(-20, 20),
    x: gsap.utils.random(-10, 10),
    rotation: gsap.utils.random(-5, 5),
    duration: gsap.utils.random(3, 5),
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: index * 0.2
  });
});

// Hero text animation
gsap.from('.hero-text', {
  opacity: 0,
  y: 30,
  duration: 0.8,
  stagger: 0.2,
  ease: 'power3.out'
});

// Stats Counter Animation (Unlocking the section)
gsap.utils.toArray('.counter').forEach(counter => {
  const target = parseFloat(counter.getAttribute('data-target'));
  const rawObj = { val: 0 };

  gsap.to(rawObj, {
    val: target,
    duration: 2.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: counter,
      start: 'top 85%',
    },
    onUpdate: function () {
      let formatted;
      if (target >= 1000000) {
        formatted = (rawObj.val / 1000000).toFixed(1) + 'M+';
      } else if (target >= 1000) {
        formatted = Math.floor(rawObj.val / 1000) + 'k+';
      } else {
        formatted = Math.floor(rawObj.val) + '+';
      }
      // Clean up .0 for millions if needed, but toFixed(1) is okay for now.
      // Actually let's make it cleaner:
      if (formatted.endsWith('.0M+')) {
        formatted = formatted.replace('.0M+', 'M+');
      }

      counter.innerText = formatted;
    }
  });
});

// Stats cards appearance
gsap.from('.stat-card', {
  opacity: 0,
  y: 50,
  duration: 0.8,
  stagger: 0.2,
  scrollTrigger: {
    trigger: '#stats-section',
    start: 'top 80%'
  }
});

// About/Mission items animation
const aboutItems = document.querySelectorAll('.about-item');
if (aboutItems.length > 0) {
  gsap.from(aboutItems, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.1,
    scrollTrigger: {
      trigger: '#about',
      start: 'top 75%'
    }
  });
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Mobile Menu & Lenis
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('mobileToggle');
  const menu = document.getElementById('mobileMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
    // Close on link click (improves UX)
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => menu.classList.add('hidden'));
    });
  }

  const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    smoothTouch: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -80 });
      }
    });
  });
});
