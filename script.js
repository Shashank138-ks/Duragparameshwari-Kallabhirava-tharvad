// Scroll to top visibility
window.addEventListener('scroll', () => {
  const btn = document.getElementById('scrollTop');
  btn.classList.toggle('visible', window.scrollY > 400);
});

// Donation form submit
function submitDonation() {
  const name    = document.getElementById('donorName').value.trim();
  const contact = document.getElementById('donorContact').value.trim();
  const seva    = document.getElementById('donorSeva').value;
  const amount  = document.getElementById('donorAmount').value.trim();

  if (!name || !contact || !seva) {
    showNotification('🙏 Please fill in Name, Contact and Seva type.');
    return;
  }

  const msg = `🙏 Seva request received!\n\nName: ${name}\nSeva: ${seva}${amount ? '\nAmount: ₹' + amount : ''}\n\nMay the Goddess bless you abundantly.`;
  showNotification(msg);

  // Reset
  document.getElementById('donorName').value = '';
  document.getElementById('donorContact').value = '';
  document.getElementById('donorSeva').value = '';
  document.getElementById('donorAmount').value = '';
  document.getElementById('donorMsg').value = '';
}

function showNotification(msg) {
  const n = document.getElementById('notification');
  n.textContent = msg;
  n.classList.add('show');
  setTimeout(() => n.classList.remove('show'), 5000);
}

// Fade-in sections on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.timing-card, .festival-item, .gallery-item, .about-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  observer.observe(el);
});
