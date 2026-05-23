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
  const msg     = document.getElementById('donorMsg').value.trim();

  if (!name || !contact || !seva) {
    showNotification('🙏 Please fill in Name, Contact and Seva type.');
    return;
  }

  // Show a sending message
  showNotification('Sending your request...');

  // Use FormSubmit.co AJAX API
  fetch("https://formsubmit.co/ajax/ksshashank123@gmail.com", {
    method: "POST",
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      _subject: "New Seva Request from Temple Website!",
      Name: name,
      Contact: contact,
      Seva: seva,
      Amount: amount ? `₹${amount}` : "Not specified",
      Message: msg || "No message provided."
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success === "true" || data.success === true) {
      showNotification('🙏 Seva request sent successfully! May the Goddess bless you.');
      // Reset form
      document.getElementById('donorName').value = '';
      document.getElementById('donorContact').value = '';
      document.getElementById('donorSeva').value = '';
      document.getElementById('donorAmount').value = '';
      document.getElementById('donorMsg').value = '';
    } else {
      // For the first time, FormSubmit requires activation
      showNotification('⚠️ Action Required: Please check your email (ksshashank123@gmail.com) to activate the form!');
    }
  })
  .catch(error => {
    console.error(error);
    showNotification('❌ Error sending request. Please try again.');
  });
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
