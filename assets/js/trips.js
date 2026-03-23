/**
 * GO BUS - TRIPS PAGE LOGIC
 */

const TRIPS_DATA = [
  {t:'٠٦:٠٠ ص', a:'٠٩:٠٠ ص', p:75, s:22, cl:'Economy', wi:false, ml:false},
  {t:'٠٨:٠٠ ص', a:'١١:٠٠ ص', p:95, s:4, cl:'Super Jet', wi:true, ml:false},
  {t:'١٠:٣٠ ص', a:'٠١:٣٠ م', p:85, s:0, cl:'VIP', wi:true, ml:true },
  {t:'١٢:٠٠ م', a:'٠٣:٠٠ م', p:75, s:18, cl:'Economy', wi:false, ml:false},
  {t:'٠٢:٠٠ م', a:'٠٥:٠٠ م', p:95, s:6, cl:'Super Jet', wi:true, ml:false},
  {t:'٠٥:٠٠ م', a:'٠٨:٠٠ م', p:85, s:28, cl:'Super Jet', wi:true, ml:true },
  {t:'٠٨:٠٠ م', a:'١١:٠٠ م', p:75, s:12, cl:'Economy', wi:false, ml:false},
  {t:'١١:٠٠ م', a:'٠٢:٠٠ ص', p:65, s:9, cl:'Economy', wi:false, ml:false},
];

function buildTrips() {
  const from = S.fromCity || 'القاهرة';
  const to = S.toCity || 'الاسكندرية';
  const date = S.goDate || 'العرض';
  const pax = S.pax || 1;
  const count = TRIPS_DATA.filter(t => t.s > 0).length;

  $('#trips-lbl').text(`${from} ← ${to} | ${date} | ${pax} مسافر`);
  $('#trip-count-val').text(count);

  let h = '';
  TRIPS_DATA.forEach((t, i) => {
    const full = t.s === 0;
    const badge = full
      ? '<span class="seats-badge empty">محجوز كامل</span>'
      : t.s <= 5
        ? `<span class="seats-badge low">آخر ${t.s} مقاعد!</span>`
        : `<span class="seats-badge ok">${t.s} مقعد متاح</span>`;

    h += `
    <div class="trip-card ${full ? 'full' : ''} mb-4" onclick="${full ? '' : `pickTrip(${i})`}">
      <div class="flex items-center gap-6">
        <div class="text-right flex-1">
          <div class="text-2xl font-black text-navy">${t.t}</div>
          <div class="text-xs text-gray-400 mt-0.5">${from}</div>
        </div>
        <div class="flex-1 text-center">
          <div class="relative border-t-2 border-dashed border-gray-200 mx-3">
            <i class="fa fa-bus absolute top-[-11px] left-1/2 -translate-x-1/2 bg-white px-1.5 text-primary text-sm"></i>
          </div>
          <div class="text-[11px] text-gray-400 mt-2 font-bold">٣ ساعات</div>
        </div>
        <div class="text-left flex-1">
          <div class="text-2xl font-black text-navy">${t.a}</div>
          <div class="text-xs text-gray-400 mt-0.5">${to}</div>
        </div>
        <div class="border-r border-gray-100 pr-5 text-right flex-shrink-0">
          <div class="text-[26px] font-black text-primary">${t.p}<span class="text-sm font-bold"> ج</span></div>
          <div class="text-[11px] text-gray-400">/مسافر</div>
        </div>
      </div>
      <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="trip-class-tag">${t.cl}</span>
          ${t.wi ? '<span class="amenity"><i class="fa fa-wifi text-blue-400"></i> WiFi</span>' : ''}
          ${t.ml ? '<span class="amenity"><i class="fa fa-utensils text-green-400"></i> وجبة</span>' : ''}
          <span class="amenity"><i class="fa fa-snowflake text-blue-300"></i> تكييف</span>
        </div>
        ${badge}
      </div>
    </div>`;
  });
  $('#trips-list').html(h);
}

function pickTrip(i) {
  S.trip = TRIPS_DATA[i];
  saveState();
  navigate('seats');
}

$(function() {
  buildTrips();
});
