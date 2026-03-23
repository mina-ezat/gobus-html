/**
 * GO BUS - SEATS PAGE LOGIC
 */

const TAKEN = [3, 7, 10, 14, 18, 22, 25, 29, 33, 37, 41];
const LADIES = [4, 5, 6];

function buildSeats() {
  let h = '', n = 1;
  for (let r = 0; r < 11; r++) {
    h += '<div class="flex items-center justify-center gap-3 mb-3">';
    h += mkSeat(n++); h += mkSeat(n++);
    h += `<div class="w-8 text-center font-bold text-gray-200 text-[10px] leading-tight flex-shrink-0">${pad(r + 1)}</div>`;
    h += mkSeat(n++); h += mkSeat(n++);
    h += '</div>';
  }
  // Back row
  h += '<div class="flex items-center justify-center gap-3 mt-4 pt-4 border-t border-gray-50">';
  for (let i = 0; i < 5; i++) h += mkSeat(n++);
  h += '</div>';
  $('#seat-map').html(h);
}

function mkSeat(n) {
  const isTaken = TAKEN.includes(n);
  const isLadies = LADIES.includes(n);
  const status = isTaken ? 'taken' : isLadies ? 'ladies' : 'avail';
  return `<div class="seat ${status}" data-n="${n}" onclick="clickSeat(this, ${n})">${n}</div>`;
}

function clickSeat(el, n) {
  const $e = $(el);
  if ($e.hasClass('taken')) return;
  
  if ($e.hasClass('sel')) {
    $e.removeClass('sel').addClass(LADIES.includes(n) ? 'ladies' : 'avail');
    S.seats = S.seats.filter(s => s !== n);
  } else {
    if (S.seats.length >= S.pax) {
      toast(`⚠️ اختار ${S.pax} مقاعد فقط`);
      return;
    }
    $e.removeClass('avail ladies').addClass('sel');
    S.seats.push(n);
  }
  updateSummary();
}

function updateSummary() {
  const price = S.trip ? S.trip.p : 95;
  const count = S.seats.length;
  
  $('#s-seats').text(count ? S.seats.join(', ') : '—');
  $('#s-total').text(count ? `${count * price} ج.م` : '٠ ج.م');
  
  const $btn = $('#btn-continue');
  const ok = count >= S.pax;
  $btn.prop('disabled', !ok).toggleClass('opacity-50 grayscale', !ok).toggleClass('cursor-not-allowed', !ok);
}

function startTimer() {
  S.timerIv = setInterval(() => {
    S.timerSec--;
    if (S.timerSec <= 0) {
      clearInterval(S.timerIv);
      toast('⏰ انتهى وقت الحجز');
      navigate('trips');
    }
    const m = Math.floor(S.timerSec / 60), s = S.timerSec % 60;
    $('#timer-txt').text(`${pad(m)}:${pad(s)}`);
    if (S.timerSec <= 120) $('#timer-box').addClass('urgent border-red-200 bg-red-50 text-red-600');
  }, 1000);
}

$(function() {
  if (!S.trip) navigate('trips');
  
  $('#s-time').text(S.trip.t || '٠٨:٠٠ ص');
  $('#s-cls').text(S.trip.cl || 'Super Jet');
  $('#s-date').text(S.goDate || 'العرض');
  $('#s-pax').text(`${S.pax} مسافر`);
  
  buildSeats();
  updateSummary();
  startTimer();
});

function goPassenger() {
  saveState();
  navigate('passenger');
}
