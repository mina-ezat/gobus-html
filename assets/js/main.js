/**
 * GO BUS - MAIN LOGIC
 * Common functions, state management, and navigation
 */

const S = {
  pax: 1,
  seats: [],
  seatPrice: 95,
  promo: 0,
  trip: null,
  timerSec: 600,
  timerIv: null,
};

// Initialize State from LocalStorage
function initApp() {
  const saved = localStorage.getItem('gobus_state');
  if (saved) {
    const data = JSON.parse(saved);
    Object.assign(S, data);
  }
}

function saveState() {
  localStorage.setItem('gobus_state', JSON.stringify(S));
}

function clearState() {
  localStorage.removeItem('gobus_state');
}

// Navigation for MPA
function navigate(page) {
  saveState();
  window.location.href = page + (page.endsWith('.html') ? '' : '.html');
}

// Toast System
function toast(msg, duration = 3000) {
  let $t = $('#toast');
  if (!$t.length) {
    $('body').append('<div id="toast"></div>');
    $t = $('#toast');
  }
  $t.text(msg).addClass('show');
  setTimeout(() => $t.removeClass('show'), duration);
}

// Loader System
function loader(show) {
  let $l = $('#loader');
  if (!$l.length) {
    $('body').append('<div id="loader"><div class="spin"></div><p style="color:#fff;font-weight:700;font-size:14px;margin:0">جاري التحميل…</p></div>');
    $l = $('#loader');
  }
  $l.css('display', show ? 'flex' : 'none');
}

// Formatting
function pad(n) { return String(n).padStart(2, '0'); }

// OTP Timer (Shared)
let resendTimer = null;
function startResendTimer(btnId, timerId, spanId) {
  let time = 60;
  const $btn = $(btnId);
  const $timer = $(timerId);
  const $span = $(spanId);
  
  $btn.hide();
  $timer.show();
  $span.text(time);
  
  resendTimer = setInterval(() => {
    time--;
    $span.text(time);
    if (time <= 0) {
      clearInterval(resendTimer);
      $btn.show();
      $timer.hide();
    }
  }, 1000);
}

// Event Listeners for common elements
$(function() {
  initApp();
  
  // Example: Smooth scroll for anchors
  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    const target = $(this.hash);
    if (target.length) {
      $('html, body').animate({ scrollTop: target.offset().top - 80 }, 800);
    }
  });
});
