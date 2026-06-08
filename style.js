// ── TAB TOGGLE (mobile) ──
function showTab(tab) {
  var isForm = (tab === 'form');
  document.getElementById('panel-form').classList.toggle('hidden', !isForm);
  document.getElementById('panel-preview').classList.toggle('hidden', isForm);
  document.querySelectorAll('.tab-btn').forEach(function(b, i) {
    b.classList.toggle('active', (i === 0) === isForm);
  });
}
 
// ── MONTHS ──
var selectedMonths = [];
function toggleMonth(el) {
  var m = el.getAttribute('data-month');
  var idx = selectedMonths.indexOf(m);
  if (idx === -1) {
    selectedMonths.push(m);
    el.classList.add('selected');
  } else {
    selectedMonths.splice(idx, 1);
    el.classList.remove('selected');
  }
  // Sort in calendar order
  var order = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  selectedMonths.sort(function(a,b){ return order.indexOf(a)-order.indexOf(b); });
  document.getElementById('monthHint').textContent =
    selectedMonths.length ? selectedMonths.join(', ') : 'Koi month nahi chuna';
  update();
}
 
// ── HELPERS ──
function fmt(n) {
  return parseFloat(n||0).toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2});
}
function g(id) { return parseFloat(document.getElementById(id).value||0); }
function fmtDate(d) {
  if (!d) return '';
  var p = d.split('-');
  return p[2]+'/'+p[1]+'/'+p[0];
}
var ones = ['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve',
  'Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'];
var tens = ['','','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];
function n2w(n) {
  n = Math.round(n);
  if (n===0) return 'Zero';
  if (n<20) return ones[n];
  if (n<100) return tens[Math.floor(n/10)]+(n%10?' '+ones[n%10]:'');
  if (n<1000) return ones[Math.floor(n/100)]+' Hundred'+(n%100?' '+n2w(n%100):'');
  if (n<100000) return n2w(Math.floor(n/1000))+' Thousand'+(n%1000?' '+n2w(n%1000):'');
  if (n<10000000) return n2w(Math.floor(n/100000))+' Lakh'+(n%100000?' '+n2w(n%100000):'');
  return n2w(Math.floor(n/10000000))+' Crore'+(n%10000000?' '+n2w(n%10000000):'');
}
 
function calc() {
  var total = g('fee')+g('fine')+g('prev')-g('conc');
  var dues = total-g('paid');
  document.getElementById('total_disp').textContent = fmt(total);
  document.getElementById('dues_disp').textContent = fmt(dues);
  update();
}
 
function hasData() {
  return document.getElementById('sname').value.trim() ||
         document.getElementById('recno').value.trim() ||
         document.getElementById('fee').value.trim();
}
 
function update() {
  if (!hasData()) {
    document.getElementById('preview').innerHTML =
      '<div class="empty-state"><svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" stroke-width="1.2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg><p>Form bharein — receipt yahan dikhegi</p></div>';
    return;
  }
 
  var fee=g('fee'), fine=g('fine'), prev=g('prev'), conc=g('conc'), paid=g('paid');
  var total=fee+fine+prev-conc, dues=total-paid;
  var recno=document.getElementById('recno').value||'—';
  var rdate=fmtDate(document.getElementById('rdate').value);
  var sname=document.getElementById('sname').value||'—';
  var fname=document.getElementById('fname').value||'—';
  var admno=document.getElementById('admno').value||'—';
  var cls=document.getElementById('cls').value||'—';
  var sec=document.getElementById('sec').value||'—';
  var roll=document.getElementById('roll').value||'—';
  var mode=document.getElementById('mode').value||'—';
  var monthStr = selectedMonths.length ? selectedMonths.join(', ') : '—';
  var words = 'Rupees '+n2w(Math.round(paid))+' Only.';
 
  document.getElementById('preview').innerHTML =
    '<div class="receipt">'+
    '<div class="r-header"><div class="r-head-inner">'+
      '<div class="r-logo"><img src="1.jpg" alt="GUV" onerror="this.parentElement.innerHTML=\'GUV\'"></div>'+
      '<div><p class="r-school-name">Gyanodaya Uchch Vidyalaya</p>'+
      '<p class="r-school-addr">Lakshmeswar Nagar, Hajipur (Vaishali)</p>'+
      '<p class="r-school-contact">guv.hajipur@gmail.com &nbsp;|&nbsp; 9199977736, 9931102464</p></div>'+
    '</div></div>'+
    '<div class="r-title-bar"><span>Fee Receipt</span></div>'+
    '<div class="r-info-grid">'+
      '<div class="r-ic"><div class="r-il">Receipt No.</div><div class="r-iv">'+recno+'</div></div>'+
      '<div class="r-ic"><div class="r-il">Date</div><div class="r-iv">'+rdate+'</div></div>'+
      '<div class="r-ic"><div class="r-il">Student Name</div><div class="r-iv">'+sname+'</div></div>'+
      '<div class="r-ic"><div class="r-il">Adm. No.</div><div class="r-iv">'+admno+'</div></div>'+
      '<div class="r-ic"><div class="r-il">Father\'s Name</div><div class="r-iv">'+fname+'</div></div>'+
      '<div class="r-ic"><div class="r-il">Payment Mode</div><div class="r-iv">'+mode+'</div></div>'+
      '<div class="r-ic"><div class="r-il">Class / Section / Roll</div><div class="r-iv">'+cls+'-'+sec+' / '+roll+'</div></div>'+
      '<div class="r-ic"><div class="r-il">Month(s)</div><div class="r-iv" style="font-size:11px;word-break:break-word">'+monthStr+'</div></div>'+
    '</div>'+
    '<table class="r-table">'+
      '<thead><tr><th>Collected By</th><th>Fee Head</th><th>Amount (Rs.)</th></tr></thead>'+
      '<tbody>'+
        '<tr><td style="color:#6b7280;font-size:11px">GUV</td><td>Tuition Fee</td><td>'+fmt(fee)+'</td></tr>'+
        '<tr class="r-sec-lbl"><td colspan="3">Summary</td></tr>'+
        '<tr><td></td><td>Total Fee</td><td>'+fmt(fee)+'</td></tr>'+
        '<tr><td></td><td>Late Fine</td><td>'+fmt(fine)+'</td></tr>'+
        '<tr><td></td><td>Previous Dues</td><td>'+fmt(prev)+'</td></tr>'+
        '<tr><td></td><td>Concession</td><td>&minus; '+fmt(conc)+'</td></tr>'+
        '<tr class="r-row-total"><td></td><td>Total Amount</td><td>'+fmt(total)+'</td></tr>'+
        '<tr class="r-row-paid"><td></td><td>&#10003; Paid</td><td>'+fmt(paid)+'</td></tr>'+
        '<tr class="r-row-dues"><td></td><td>&#9888; Balance Dues</td><td>'+fmt(dues)+'</td></tr>'+
      '</tbody>'+
    '</table>'+
    '<div class="r-inwords">Amount in words: <strong>'+words+'</strong></div>'+
    '<div class="r-notes"><strong style="color:#374151">Notes:</strong><br>'+
      '1. Cheque subject to realization. Rs. 500/- extra for cheque dishonour.<br>'+
      '2. Fee receipt and fee card both should be kept safely.<br>'+
      '3. Please verify all entries carefully.</div>'+
    '<div class="r-sig-row"><div><div class="r-sig-line"></div><div class="r-sig-lbl">Authorised Signature</div></div></div>'+
    '</div>';
}