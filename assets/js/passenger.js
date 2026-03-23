/**
 * GO BUS - PASSENGER PAGE LOGIC
 */

const PROMOS = { GOBUS10: 10, SAVE20: 20, WELCOME15: 15, STUDENT5: 5 };

function applyPromo() {
  const code = $('#promo-inp').val().trim().toUpperCase();
  const $msg = $('#promo-msg');
  
  if (PROMOS[code]) {
    S.promo = PROMOS[code];
    $msg.show().text(`✅ تم تطبيق الخصم! وفّرت ${S.promo} ج.م`).css('color', '#1EB10D');
    toast(`🎉 كود صحيح! خصم ${S.promo} ج.م`);
  } else {
    $msg.show().text('❌ كود غير صحيح').css('color', '#E73327');
  }
  saveState();
}

function proceedCheckout() {
  const fn = $('#p-fn').val().trim();
  const ln = $('#p-ln').val().trim();
  const ph = $('#p-ph').val().trim();
  const nid = $('#p-nid').val().trim();
  
  if (!fn || !ph || !nid) {
    toast('⚠️ أدخل الاسم ورقم الهاتف والمحفظة الوطنية');
    return;
  }
  
  S.passenger = { firstName: fn, lastName: ln, phone: ph, nid: nid };
  saveState();
  navigate('checkout');
}

$(function() {
  if (!S.seats || !S.seats.length) navigate('seats');
  
  // Fill from state if exists
  if (S.passenger) {
    $('#p-fn').val(S.passenger.firstName);
    $('#p-ln').val(S.passenger.lastName);
    $('#p-ph').val(S.passenger.phone);
    $('#p-nid').val(S.passenger.nid);
  }
});
