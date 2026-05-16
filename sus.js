(function() {
  var QUESTIONS = [
    {num:'Q1',text:'I would like to use this system frequently.',avg:4.55,type:'pos'},
    {num:'Q2',text:'I found the system unnecessarily complex.',avg:2.95,type:'neg'},
    {num:'Q3',text:'I thought the system was easy to use.',avg:4.55,type:'pos'},
    {num:'Q4',text:'I would need support of a technical person to use this system.',avg:3.00,type:'neg'},
    {num:'Q5',text:'The various functions in this system were well integrated.',avg:4.60,type:'pos'},
    {num:'Q6',text:'There was too much inconsistency in this system.',avg:2.40,type:'neg'},
    {num:'Q7',text:'Most people would learn to use this system very quickly.',avg:4.50,type:'pos'},
    {num:'Q8',text:'I found the system very cumbersome to use.',avg:2.25,type:'neg'},
    {num:'Q9',text:'I felt very confident using the system.',avg:4.55,type:'pos'},
    {num:'Q10',text:'I needed to learn a lot before I could get going with this system.',avg:3.10,type:'neg'}
  ];

  var RESPONDENTS = [
    {age:21,gender:'Female',course:'BSED-Filipino 3A',exp:'Yes',freq:'Weekly',sus:47.5},
    {age:21,gender:'Female',course:'BSED-Filipino 3A',exp:'No',freq:'Daily',sus:100},
    {age:29,gender:'Female',course:'BSOA-3D',exp:'No',freq:'Daily',sus:47.5},
    {age:20,gender:'Male',course:'BSED-FIL.3A',exp:'No',freq:'Daily',sus:97.5},
    {age:23,gender:'Female',course:'BSED3A-FIL',exp:'No',freq:'Daily',sus:75},
    {age:21,gender:'Female',course:'BSED-Filipino 3A',exp:'No',freq:'Never',sus:70},
    {age:21,gender:'Female',course:'BSED-FILIPINO 3A',exp:'No',freq:'Never',sus:80},
    {age:21,gender:'Male',course:'BSED-Filipino 3A',exp:'Yes',freq:'Daily',sus:62.5},
    {age:18,gender:'Male',course:'BSA 1A',exp:'Yes',freq:'Daily',sus:100},
    {age:18,gender:'Female',course:'BSA 1A',exp:'Yes',freq:'Daily',sus:100},
    {age:19,gender:'Female',course:'BSA 1A',exp:'Yes',freq:'Daily',sus:70},
    {age:21,gender:'Female',course:'BSED-FIL3A',exp:'No',freq:'Daily',sus:82.5},
    {age:21,gender:'Female',course:'BSED-FIL 3A',exp:'No',freq:'Daily',sus:67.5},
    {age:21,gender:'Female',course:'BSMATH 3A',exp:'No',freq:'Daily',sus:52.5},
    {age:18,gender:'Female',course:'BSEd ENG 1A',exp:'No',freq:'Daily',sus:52.5},
    {age:24,gender:'Male',course:'BSOA3A',exp:'No',freq:'Daily',sus:75},
    {age:23,gender:'Male',course:'BSSE-2A',exp:'Yes',freq:'Daily',sus:70},
    {age:21,gender:'Female',course:'BSECON 3A',exp:'Yes',freq:'Daily',sus:52.5},
    {age:22,gender:'Female',course:'BSECON 3A',exp:'No',freq:'Daily',sus:85},
    {age:23,gender:'Male',course:'BSOA2A',exp:'No',freq:'Daily',sus:65}
  ];

  var SUS_SCORES = RESPONDENTS.map(function(r){return r.sus;});

  var LIKES = [
    'Easy to understand and use — will help fur parents take care of their pets.',
    'Simple and convenient to use. Contents are easy to understand and buttons are easy to navigate.',
    'Transactions for home visits and clinic services for pets are now fast and efficient.',
    'Allows fur parents to check schedules digitally and contact the doctor without a physical clinic visit.',
    'Eye-catching layout design. Easy to use, convenient and helpful for fur parents.',
    'It is convenient to use and the features are well-organized.',
    'The system is well integrated and clean, with icons and a color palette that is pleasing to the eyes.',
    'Efficient and helpful for pet owners; the features are accurate for a veterinary system.'
  ];

  var SUGGESTIONS = [
    {icon:'🛒', text:'Add an online pet store feature for food, vitamins, and other pet necessities.'},
    {icon:'📱', text:'Ensure the system is fully accessible and responsive on mobile devices.'},
    {icon:'📅', text:'Add appointment reminders via SMS or email, online payment options, and a digital health record for pets.'},
    {icon:'🎨', text:'Consider a minimalist style with fewer navigation items, focused on core features like appointment booking.'},
    {icon:'📋', text:'Provide recommendations for food, medication, or vitamins based on the most recent consultation.'}
  ];

  function gradeColor(s) {
    if(s>=80) return {bg:'#E1F5EE',color:'#085041',label:'Excellent'};
    if(s>=68) return {bg:'#E6F1FB',color:'#0C447C',label:'Good'};
    if(s>=51) return {bg:'#FAEEDA',color:'#633806',label:'Marginal'};
    return {bg:'#FCEBEB',color:'#501313',label:'Poor'};
  }

  /* Build question rows */
  function buildQRows(elId, filter) {
    var el = document.getElementById(elId);
    if(!el) return;
    var items = filter === 'all' ? QUESTIONS : QUESTIONS.filter(function(q){return q.type===filter;});
    el.innerHTML = items.map(function(q) {
      var isPos = q.type==='pos';
      var pct = isPos ? (q.avg/5*100) : ((5-q.avg)/5*100);
      var barColor = isPos ? '#1D9E75' : '#D85A30';
      var scoreColor = isPos ? '#0F6E56' : '#993C1D';
      return '<div class="sus-q-row">' +
        '<span class="sus-q-num">' + q.num + '</span>' +
        '<span class="sus-q-text">' + q.text + '</span>' +
        '<span class="sus-q-type ' + q.type + '">' + (isPos?'Positive':'Negative') + '</span>' +
        '<div class="sus-q-bar-wrap"><div class="sus-q-bar" style="width:' + pct.toFixed(1) + '%;background:' + barColor + '"></div></div>' +
        '<span class="sus-q-score" style="color:' + scoreColor + '">' + q.avg.toFixed(2) + '</span>' +
        '</div>';
    }).join('');
  }
  buildQRows('susQAll','all');
  buildQRows('susQPos','pos');
  buildQRows('susQNeg','neg');

  /* Tab switch */
  window.susSwitchTab = function(tab, btn) {
    document.querySelectorAll('.sus-q-tab').forEach(function(b){b.classList.remove('active');});
    document.querySelectorAll('.sus-q-panel').forEach(function(p){p.classList.remove('active');});
    btn.classList.add('active');
    document.getElementById('sus-tab-' + tab).classList.add('active');
  };

  /* Respondent table */
  var tbody = document.getElementById('susRespBody');
  if(tbody) {
    tbody.innerHTML = RESPONDENTS.map(function(r,i) {
      var g = gradeColor(r.sus);
      return '<tr>' +
        '<td style="color:#9ca3af;font-size:0.78rem">' + (i+1) + '</td>' +
        '<td>' + r.age + '</td>' +
        '<td>' + r.gender + '</td>' +
        '<td style="font-size:0.78rem">' + r.course + '</td>' +
        '<td>' + r.exp + '</td>' +
        '<td>' + r.freq + '</td>' +
        '<td style="font-weight:600">' + r.sus + '</td>' +
        '<td><span class="sus-badge" style="background:' + g.bg + ';color:' + g.color + '">' + g.label + '</span></td>' +
        '</tr>';
    }).join('');
  }

  /* Likes */
  var likesGrid = document.getElementById('susLikesGrid');
  if(likesGrid) {
    likesGrid.innerHTML = LIKES.map(function(l,i) {
      return '<div class="sus-quote-card"><p>' + l + '</p><div class="qmeta">Respondent ' + (i+1) + '</div></div>';
    }).join('');
  }

  /* Suggestions */
  var suggestList = document.getElementById('susSuggestList');
  if(suggestList) {
    suggestList.innerHTML = SUGGESTIONS.map(function(s) {
      return '<div class="sus-suggest-item"><div class="sus-suggest-icon">' + s.icon + '</div><div class="sus-suggest-text">' + s.text + '</div></div>';
    }).join('');
  }

  /* Charts — wait for Chart.js to be ready */
  function initCharts() {
    if(typeof Chart === 'undefined') { setTimeout(initCharts, 100); return; }

    /* Gauge */
    var gc = document.getElementById('susGaugeEl');
    if(gc) {
      var ctx = gc.getContext('2d');
      var cx=130, cy=138, r=105, score=72.625;
      var endAngle = Math.PI + (score/100)*Math.PI;
      ctx.beginPath(); ctx.arc(cx,cy,r,Math.PI,2*Math.PI);
      ctx.lineWidth=16; ctx.strokeStyle='#f3f4f6'; ctx.stroke();
      var gr = ctx.createLinearGradient(cx-r,cy,cx+r,cy);
      gr.addColorStop(0,'#e74c3c'); gr.addColorStop(0.38,'#f39c12');
      gr.addColorStop(0.65,'#1D9E75'); gr.addColorStop(1,'#085041');
      ctx.beginPath(); ctx.arc(cx,cy,r,Math.PI,endAngle);
      ctx.lineWidth=16; ctx.strokeStyle=gr; ctx.lineCap='round'; ctx.stroke();
      var px=cx+r*Math.cos(endAngle), py=cy+r*Math.sin(endAngle);
      ctx.beginPath(); ctx.arc(px,py,8,0,2*Math.PI);
      ctx.fillStyle='#085041'; ctx.fill();
    }

    /* Distribution */
    var distEl = document.getElementById('susDistChart');
    if(distEl) {
      new Chart(distEl, {
        type:'bar',
        data:{
          labels: SUS_SCORES.map(function(_,i){return 'R'+(i+1);}),
          datasets:[{
            label:'SUS Score',
            data: SUS_SCORES,
            backgroundColor: SUS_SCORES.map(function(s){return s>=68?'#1D9E75':'#D85A30';}),
            borderRadius:4, borderSkipped:false
          }]
        },
        options:{
          responsive:true, maintainAspectRatio:false,
          plugins:{legend:{display:false}},
          scales:{
            y:{min:0,max:110,grid:{color:'rgba(0,0,0,0.04)'},ticks:{font:{size:10},callback:function(v){return v<=100?v:null;}}},
            x:{grid:{display:false},ticks:{font:{size:9}}}
          }
        }
      });
    }

    /* Radar */
    var radarEl = document.getElementById('susRadarChart');
    if(radarEl) {
      new Chart(radarEl,{
        type:'radar',
        data:{
          labels: QUESTIONS.map(function(q){return q.num;}),
          datasets:[{
            label:'Avg Score', data: QUESTIONS.map(function(q){return q.avg;}),
            backgroundColor:'rgba(29,158,117,0.10)', borderColor:'#1D9E75',
            pointBackgroundColor: QUESTIONS.map(function(q){return q.type==='pos'?'#1D9E75':'#D85A30';}),
            pointBorderColor:'#fff', pointRadius:5, borderWidth:2
          }]
        },
        options:{
          responsive:true, maintainAspectRatio:false,
          plugins:{legend:{display:false}},
          scales:{r:{min:1,max:5,ticks:{stepSize:1,font:{size:10}},grid:{color:'rgba(0,0,0,0.06)'},pointLabels:{font:{size:11}}}}
        }
      });
    }

    /* Gender */
    var genderEl = document.getElementById('susGenderChart');
    if(genderEl) {
      new Chart(genderEl,{type:'doughnut',data:{labels:['Female','Male'],datasets:[{data:[14,6],backgroundColor:['#534AB7','#9FE1CB'],borderWidth:0,hoverOffset:4}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},cutout:'65%'}});
    }

    /* Experience */
    var expEl = document.getElementById('susExpChart');
    if(expEl) {
      new Chart(expEl,{type:'doughnut',data:{labels:['No experience','Has experience'],datasets:[{data:[13,7],backgroundColor:['#1D9E75','#D85A30'],borderWidth:0,hoverOffset:4}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},cutout:'65%'}});
    }

    /* Frequency */
    var freqEl = document.getElementById('susFreqChart');
    if(freqEl) {
      new Chart(freqEl,{type:'doughnut',data:{labels:['Daily','Weekly','Never'],datasets:[{data:[17,1,2],backgroundColor:['#534AB7','#BA7517','#888780'],borderWidth:0,hoverOffset:4}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},cutout:'65%'}});
    }

    /* Age */
    var ageEl = document.getElementById('susAgeChart');
    if(ageEl) {
      new Chart(ageEl,{
        type:'bar',
        data:{labels:['18','19','20','21','22','23','24','29'],datasets:[{label:'Respondents',data:[3,1,1,9,1,3,1,1],backgroundColor:'#534AB7',borderRadius:6,borderSkipped:false}]},
        options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{min:0,max:10,grid:{color:'rgba(0,0,0,0.04)'},ticks:{font:{size:10},stepSize:2}},x:{grid:{display:false},ticks:{font:{size:11}}}}}
      });
    }
  }

  if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCharts);
  } else {
    initCharts();
  }
})();
