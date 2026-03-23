/**
 * GO BUS - TRIPS PAGE LOGIC
 */

const TRIPS_DATA = [
  {t:'٠٧:٣٥ م', a:'١٠:٣٥ م', p:120, s:14, cl:'Aero Class', wi:true, ml:true, dur:'٣ ساعات'},
  {t:'٠٩:١٥ م', a:'١٢:١٥ ص', p:140, s:8,  cl:'VIP Class', wi:true, ml:true, dur:'٣ ساعات'},
  {t:'١١:٠٠ م', a:'٠٢:٠٠ ص', p:110, s:22, cl:'Economy', wi:false, ml:false, dur:'٣ ساعات'},
  {t:'٠١:٠٠ ص', a:'٠٤:٠٠ ص', p:120, s:5,  cl:'Aero Class', wi:true, ml:false, dur:'٣ ساعات'},
];

const DATES = [
  {day:'الجمعة', date:'١٤ يوليو'},
  {day:'السبت', date:'١٥ يوليو'},
  {day:'الأحد', date:'١٦ يوليو'},
  {day:'الأثنين', date:'١٧ يوليو'},
  {day:'الثلاثاء', date:'١٨ يوليو'},
  {day:'الأربعاء', date:'١٩ يوليو'},
];

function buildTrips() {
  const from = S.fromCity || 'القاهرة';
  const to = S.toCity || 'الاسكندرية';
  const pax = S.pax || 1;

  $('#from-to-badge').text(`${from} ↔ ${to}`);
  $('#s-pax').text(`${pax} مسافر`);
  $('#s-go-route').text(`${from} - عبد المنعم رياض`);
  $('#s-go-date').text(S.goDate || '١٤ يوليو ٢٠٢٤');
  
  // Build Date Tabs
  let dh = '';
  DATES.forEach((d, i) => {
    dh += `
      <div class="date-bubble ${i === 2 ? 'active' : ''}" onclick="selectDate(this)">
        <div class="day">${d.day}</div>
        <div class="date">${d.date}</div>
      </div>`;
  });
  $('#date-tabs-go').html(dh);

  // Build Trips
  let th = '';
  TRIPS_DATA.forEach((t, i) => {
    th += `
    <div class="trip-item">
      <div class="main-row">
        <!-- START: DEPARTURE (RIGHT) -->
        <div class="trip-info-start">
           <div class="time-val">${t.t}</div>
           <div class="loc-val">${from}<br>عبد المنعم رياض</div>
        </div>

        <!-- CENTER: TIMELINE -->
        <div class="center-timeline">
           <span class="cls-tag">${t.cl}</span>
           <span class="text-[10px] font-bold text-gray-300 mb-1">${t.dur}</span>
           <div class="arrow-track"></div>
           <div class="flex gap-4 text-[11px] text-gray-300 justify-center mt-2">
              ${t.wi ? '<i class="fa fa-wifi"></i>' : ''}
              ${t.ml ? '<i class="fa fa-utensils"></i>' : ''}
              <i class="fa fa-snowflake"></i>
           </div>
        </div>

        <!-- END: ARRIVAL (MIDDLE) -->
        <div class="trip-info-end">
           <div class="time-val">${t.a}</div>
           <div class="loc-val">${to}<br>محرم بك</div>
        </div>

        <!-- PRICING & ACTION (LEFT) -->
        <div class="side-pricing">
           <div class="text-[10px] font-bold text-gray-400 mb-1">سعر التذكرة تبدأ من</div>
           <div class="flex items-baseline gap-1">
              <span class="price-val">EGP ${t.p}.٠٠</span>
              <span class="text-[10px] font-bold text-gray-300">/مسافر</span>
           </div>
           <button class="pick-btn" onclick="pickTrip(${i})">أختار الرحلة <i class="fa fa-chevron-left mr-1 text-[8px]"></i></button>
           <div class="text-[10px] font-bold text-success text-center mt-2">متاح ${t.s} مقعد</div>
        </div>
      </div>

      <div class="bg-[#F8FAFC] px-10 py-3 border-t border-gray-50 flex items-center justify-between">
         <div class="flex gap-6 text-[10px] font-bold text-gray-400">
            <span>رقم الرحلة: ٨٨٧</span>
            <span>عدد المحطات: ٢</span>
         </div>
         <span class="text-[10px] font-black text-primary cursor-pointer hover:underline">خط سير الرحلة <i class="fa fa-chevron-down ml-1"></i></span>
      </div>
    </div>`;
  });
  $('#trips-list-go').html(th);
}

function pickTrip(i) {
  S.trip = TRIPS_DATA[i];
  saveState();
  $('#s-total').text(`EGP ${S.trip.p * (S.pax || 1)}.٠٠`);
  toast('تم اختيار رحلة الذهاب ✅');
}

function confirmBooking() {
  if(!S.trip) {
    toast('⚠️ يرجى اختيار رحلة أولاً');
    return;
  }
  navigate('seats');
}

function selectDate(el) {
  $('.date-bubble').removeClass('active');
  $(el).addClass('active');
  toast('جارِ تحديث الرحلات للموعد الجديد...');
}

$(function() {
  buildTrips();
});
