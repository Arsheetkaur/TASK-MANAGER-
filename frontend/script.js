// Smooth scroll to section when clicking nav links
document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Sticky navbar on scroll
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.navbar');
    header.classList.toggle('sticky', window.scrollY > 80);
  });
  
  // Dropdown menu on hover (for desktop)
  const dropdown = document.querySelector('.dropdown');
  const menu = document.querySelector('.dropdown-menu');
  
  dropdown.addEventListener('mouseenter', () => {
    menu.style.display = 'block';
    menu.classList.add('fadeIn');
  });
  dropdown.addEventListener('mouseleave', () => {
    menu.classList.remove('fadeIn');
    menu.style.display = 'none';
  });
  
  // Newsletter form submission
  document.querySelector('.subscribe-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    if (email) {
      alert`(Thanks for subscribing, ${email.split('@')[0]}!);
      this.reset()`;
    }
  });