/**
 * GO BUS - CHECKOUT PAGE LOGIC
 */

function selPay(m) {
  $('.pay-opt').removeClass('active');
  $('.pay-opt input[type=radio]').prop('checked', false);
  $(`#pm-${m}`).addClass('active');
  $(`#pm-${m} input[type=radio]`).prop('checked', true);
  
  $('#card-fields').css('display', m === 'card' ? 'flex' : 'none');
  $('#wallet-fields').css('display', m === 'wallet' ? 'block' : 'none');
}

function fmtCard(el) {
  let v = el.value.replace(/\s/g, '').replace(/\D/g, '');
  let p = [];
  for (let i = 0; i < v.length; i += 4) p.push(v.substring(i, i + 4));
  el.value = p.join(' ');
}

function completePay() {
  loader(true);
  setTimeout(() => {
    loader(false);
    navigate('ticket');
  }, 2000);
}

$(function() {
  if (!S.passenger) navigate('passenger');
  
  const price = S.trip ? S.trip.p : 95;
  const count = S.seats.length;
  const subtotal = price * count;
  const total = subtotal - S.promo;
  
  $('#co-name').text(`${S.passenger.firstName} ${S.passenger.lastName}`);
  $('#co-dt').text(S.goDate || '—');
  $('#co-tm').text(S.trip ? S.trip.t : '—');
  $('#co-seat').text(S.seats.join(', '));
  $('#co-price').text(`${subtotal} ج.م`);
  $('#co-disc').text(S.promo ? `-${S.promo} ج.م` : '٠ ج.م');
  $('#co-total').text(`${total} ج.م`);
  
  // Default to card
  selPay('card');
});
