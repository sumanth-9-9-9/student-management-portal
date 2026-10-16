'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const LS={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch{return d}},
  set(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch{return false}},
  del(k){try{localStorage.removeItem(k)}catch{}}};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const NP='Not provided';

/* ---------- Sample data: replace these values to show another student ---------- */
const DEFAULT={title:'Mr.',firstName:'ANGERI',lastName:'SUMANTH',dob:'2005-12-08',gender:'Male',father:'ANGERI MUNI REDDY',mother:'ANGERI TEJOVATHI',address:'',city:'Tirupati District',state:'Andhra Pradesh',country:'India',email:'',mobile:'',status:'Active',admNo:'MBU20233879',admYear:'2023–2024',roll:'23102A010159',school:'School of Computing',dept:'Artificial Intelligence and Machine Learning',sem:'VII Semester',course:'B.Tech. - Computer Science and Engineering (Artificial Intelligence and Machine Learning)',univ:'Mohan Babu University',plan:'Regular',standing:'',classification:'',discount:'',intake:'',validity:'',acYear:'2026–2027'};
const SUBJECTS=[['Machine Learning',88],['Deep Learning',92],['Natural Language Processing',81],['Cloud Computing',76],['Big Data Analytics',85]];
const ASSIGN=[
 {id:1,t:'Deep Learning Lab Report',c:'Deep Learning',due:'2026-10-18',s:'In Progress'},
 {id:2,t:'NLP Mini Project Proposal',c:'Natural Language Processing',due:'2026-10-22',s:'Pending'},
 {id:3,t:'Cloud Deployment Exercise',c:'Cloud Computing',due:'2026-10-25',s:'Pending'},
 {id:4,t:'ML Model Evaluation Sheet',c:'Machine Learning',due:'2026-10-12',s:'Submitted'},
 {id:5,t:'Big Data Case Study',c:'Big Data Analytics',due:'2026-11-02',s:'Pending'}];
const ANN=[
 {t:'Mid-semester exams begin 26 Oct',cat:'Exams',d:'2026-10-14',b:'Hall tickets are available under Exam Schedules.'},
 {t:'Library hours extended',cat:'General',d:'2026-10-13',b:'The library stays open until 9 PM on weekdays.'},
 {t:'Hackathon registrations open',cat:'Events',d:'2026-10-10',b:'Teams of up to four can register through the Projects page.'},
 {t:'Fee payment reminder',cat:'Finance',d:'2026-10-08',b:'Semester VII fees are due by 31 October.'}];
const PLACEMENTS=[
 {company:'Microsoft',role:'Software Development Engineer (AI/ML)',lpa:'28.5',clearedRounds:'4 / 4 Rounds Cleared',rounds:['Online Assessment (DSA)','Technical Round 1 (System & Algorithms)','Technical Round 2 (ML Architecture)','Leadership & HR Fit'],status:'Offer Accepted'},
 {company:'Amazon Web Services',role:'Applied AI Scientist',lpa:'24.0',clearedRounds:'3 / 3 Rounds Cleared',rounds:['Coding Assessment','Cloud & ML Systems Design','Bar Raiser Technical Interview'],status:'Offer Extended'},
 {company:'Oracle',role:'Application Engineer - Autonomous DB',lpa:'18.2',clearedRounds:'3 / 3 Rounds Cleared',rounds:['Aptitude & Coding Round','Data Structures & SQL','Director Technical Interview'],status:'Offer Extended'},
 {company:'Qualcomm',role:'Machine Learning Edge Engineer',lpa:'14.5',clearedRounds:'3 / 3 Rounds Cleared',rounds:['Technical Screening','Embedded ML Architecture','Managerial & HR Discussion'],status:'Offer Extended'}];
const DAYS=['Mon','Tue','Wed','Thu','Fri','Sat'];
const TT=[['ML','DL','NLP','Cloud','Big Data','Lab'],['DL','NLP','ML','Big Data','Cloud','Lab'],['Cloud','ML','Lab','DL','NLP','Seminar'],['Big Data','Lab','DL','ML','Cloud','—']];
const SLOTS=['9:00','10:00','11:15','1:30'];
const G={ // generic demo pages: key:[title,icon,description,columns,rows]
 institution:['My Institution','building-columns','Your university and campus details.',['Item','Details'],[['University','Mohan Babu University'],['School','School of Computing'],['Campus','Tirupati, Andhra Pradesh'],['Registrar office','Mon–Sat, 9:30 AM–4:30 PM']]],
 messages:['Messages','envelope','Messages from faculty and the office.',['From','Subject','Date'],[['Prof. Rao','Project review slot','14 Oct 2026'],['Exam Cell','Hall ticket released','13 Oct 2026'],['Placement Cell','Resume workshop','11 Oct 2026']]],
 exams:['Exam Schedules','file-pen','Upcoming examinations.',['Course','Date','Time','Hall'],[['Machine Learning','26 Oct 2026','10:00 AM','A-204'],['Deep Learning','28 Oct 2026','10:00 AM','A-204'],['Cloud Computing','31 Oct 2026','2:00 PM','B-110'],['NLP','03 Nov 2026','10:00 AM','A-101']]],
 reports:['Reports','chart-column','Academic reports.',['Report','Period','Status'],[['Progress report','Semester VI','Available'],['Attendance report','Semester VII','Available'],['Conduct certificate','2026','On request']]],
 assessments:['Assessments','clipboard-check','Internal assessment marks (demo).',['Course','Quiz','Mid','Lab','Total / 40'],[['Machine Learning','8','16','9','33'],['Deep Learning','9','17','9','35'],['Cloud Computing','7','14','8','29']]],
 holidays:['Holidays','umbrella-beach','Academic calendar holidays.',['Holiday','Date'],[['Diwali','08 Nov 2026'],['Karthika Pournami','24 Nov 2026'],['Christmas','25 Dec 2026'],['Sankranti','14 Jan 2027']]],
 content:['Teaching Content','chalkboard-user','Lecture material by course.',['Course','Material','Type'],[['Machine Learning','Unit 4 Slides','PDF'],['Deep Learning','CNN Lecture Notes','PDF'],['Cloud Computing','Docker Walkthrough','Video']]],
 services:['Services','gears','Campus services.',['Service','Contact','Status'],[['Bus pass','Transport desk','Active'],['Hostel','Warden office','Not applied'],['ID card reissue','Admin office','Available']]],
 billing:['Billing','receipt','Fee summary (demo figures).',['Item','Amount (₹)','Status'],[['Tuition fee, Sem VII','95,000','Due 31 Oct'],['Exam fee','2,500','Paid'],['Library fee','1,000','Paid']]],
 counselling:['Student Counselling','comments','Counselling sessions.',['Counsellor','Date','Mode'],[['Dr. Lakshmi','20 Oct 2026','In person'],['Career guidance cell','27 Oct 2026','Online']]],
 clearance:['Clearance','circle-check','No-dues clearance by department.',['Department','Status'],[['Library','Cleared'],['Hostel','Not applicable'],['Accounts','Pending'],['Laboratory','Cleared']]],
 feedback:['Feedback','star','Course feedback windows.',['Course','Faculty','Closes'],[['Machine Learning','Prof. Rao','30 Oct 2026'],['Cloud Computing','Dr. Meena','30 Oct 2026']]],
 gallery:['Gallery','images','Campus event albums.',['Album','Photos','Date'],[['Tech Fest 2026','48','Sep 2026'],['Convocation','120','Aug 2026'],['Sports Day','64','Feb 2026']]],
 projects:['Projects','diagram-project','Your projects.',['Project','Guide','Stage'],[['Sentiment analysis for regional text','Prof. Rao','Review 1'],['Smart attendance with face detection','Dr. Meena','Proposal']]],
 results:['Final Results','trophy','Previous semester results (demo).',['Semester','SGPA','Result'],[['I','8.1','Pass'],['II','8.3','Pass'],['III','8.5','Pass'],['IV','8.4','Pass'],['V','8.6','Pass'],['VI','8.7','Pass']]],
 reeval:['Re-Evaluation','rotate','Re-evaluation requests.',['Course','Semester','Status'],[['Operating Systems','Semester IV','Closed, marks unchanged']]],
 examreg:['Exam Course Registration','pen-to-square','Registered courses for the coming exams.',['Course','Code','Status'],[['Machine Learning','AI701','Registered'],['Deep Learning','AI702','Registered'],['Cloud Computing','CS703','Registered']]],
 docs:['Document Records','folder-open','Your documents.',['Document','Issued','Status'],[['Bonafide certificate','12 Aug 2026','Issued'],['Marks memo, Sem VI','30 Jun 2026','Issued'],['Transfer certificate','—','Not requested']]],
 alumni:['Alumni Fee','graduation-cap','Alumni association membership.',['Plan','Fee (₹)','Status'],[['Lifetime membership','5,000','Available after graduation']]],
 eduverse:['Adiyogi Eduverse','globe','Learning platform links (demo).',['Resource','Type'],[['Self-paced courses','Library'],['Virtual labs','Lab'],['Discussion forums','Community']]]};
const NAV=[['dashboard','Dashboard','gauge'],['institution'],['profile','My Profile','user'],['messages'],['attendance','Attendance','calendar-check'],['assignments','Assignments','book'],['exams'],['reports'],['assessments'],['holidays'],['timetable','Timetable','table-cells'],['content'],['leave','Leave','person-walking-arrow-right'],['services'],['billing'],['counselling'],['clearance'],['announcements','Announcements','bullhorn'],['feedback'],['gallery'],['projects'],['results'],['reeval'],['examreg'],['docs'],['alumni'],['eduverse']]
 .map(([k,l,i])=>G[k]?{k,l:G[k][0],i:G[k][1]}:{k,l,i});
const FIELDS=[
 ['Personal details'],
 ['title','Title','select',['Mr.','Ms.','Mrs.','Dr.'],1],['firstName','First name','text',0,1],['lastName','Last name','text',0,1],
 ['dob','Date of birth','date',0,1],['gender','Gender','select',['Male','Female','Other'],1],['father',"Father's name",'text'],['mother',"Mother's name",'text'],
 ['address','Address','text'],['city','City','text',0,1],['state','State','text',0,1],['country','Country','text',0,1],
 ['email','Email','email'],['mobile','Mobile number','tel'],
 ['Academic details'],
 ['status','Student status','select',['Active','Inactive','Graduated','On leave'],1],['admNo','Admission number','text',0,1],['admYear','Admission year','text',0,1],['roll','Roll number','text',0,1],
 ['school','School','text'],['dept','Department','text',0,1],['sem','Semester','select',['I','II','III','IV','V','VI','VII','VIII'].map(s=>s+' Semester'),1],['course','Course name','text',0,1],
 ['univ','University','text',0,1],['plan','Curriculum plan','text'],['standing','Academic standing','text'],['classification','Academic classification','text'],
 ['discount','Discount category','text'],['intake','Intake','text'],['validity','Program validity date','date']];

/* ---------- State ---------- */
let P={...DEFAULT,...LS.get('sp_profile',{})};
let photo=LS.get('sp_photo',null);
let assign=LS.get('sp_assign',ASSIGN);
let leaves=LS.get('sp_leaves',[]);
let pending=null,page='dashboard';
const fullName=()=>`${P.firstName||''} ${P.lastName||''}`.trim();
const val=v=>v&&String(v).trim()?esc(v):`<span style="opacity:.6">${NP}</span>`;
const fmtD=d=>d?new Date(d+'T00:00:00').toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}):'';
const initials=()=>(((P.firstName?.[0]||'')+(P.lastName?.[0]||'')).toUpperCase())||'S';
const att=()=>Math.round(SUBJECTS.reduce((a,s)=>a+s[1],0)/SUBJECTS.length);
const tbl=(c,r)=>`<div class="tw"><table><thead><tr>${c.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${r.map(x=>`<tr>${x.map(y=>`<td>${y}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const pill=s=>`<span class="pill ${/Submitted|Present|Approved|Accepted|Extended/.test(s)?'ok':/Absent|Rejected/.test(s)?'bad':'warn'}">${s}</span>`;

/* ---------- Toast and modals ---------- */
function toast(m,t=''){const e=document.createElement('div');e.className='toast '+t;e.textContent=m;$('#toasts').append(e);setTimeout(()=>e.remove(),3200)}
const openM=id=>{const m=$('#'+id);m.classList.add('open');m.setAttribute('aria-hidden','false')};
const closeM=id=>{const m=$('#'+id);m.classList.remove('open');m.setAttribute('aria-hidden','true')};
$$('.modal').forEach(m=>m.addEventListener('mousedown',e=>{if(e.target===m){m.id==='photoModal'?cancelPhoto():closeM(m.id)}}));

/* ---------- Avatar and photo ---------- */
function avatar(isSm=false){return (photo?`<img src="${photo}" alt="${esc(fullName())} profile photo">`:initials())+(isSm?'':`<button class="cam" data-act="upload" aria-label="${photo?'Change':'Upload'} profile photo"><i class="fa-solid fa-camera"></i></button>`)}
function bind(){$$('[data-avatar]').forEach(e=>e.innerHTML=avatar(e.classList.contains('sm')));$$('[data-bind=fullName]').forEach(e=>e.textContent=fullName())}
function pickFile(){$('#file').click()}
$('#file').addEventListener('change',e=>{
  const f=e.target.files[0];e.target.value='';if(!f)return;
  const ok=['image/jpeg','image/png','image/webp'].includes(f.type)||/\.(jpe?g|png|webp)$/i.test(f.name);
  if(!ok)return toast('Unsupported file. Choose a JPG, PNG or WEBP image.','error');
  if(f.size>5*1024*1024)return toast('Image is larger than 5 MB. Choose a smaller photo.','error');
  if(pending)URL.revokeObjectURL(pending.url);
  pending={file:f,url:URL.createObjectURL(f)};
  $('#prevImg').src=pending.url;$('#photoErr').textContent='';openM('photoModal');
});
function cancelPhoto(){if(pending)URL.revokeObjectURL(pending.url);pending=null;$('#prevImg').removeAttribute('src');$('#photoErr').textContent='';closeM('photoModal')}
function compress(src,max,q){return new Promise((res,rej)=>{const im=new Image();im.onload=()=>{const k=Math.min(1,max/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',q))};im.onerror=()=>rej();im.src=src})}
async function savePhoto(){
  if(!pending)return;
  try{
    let d=await compress(pending.url,640,.85);
    if(!LS.set('sp_photo',d)){d=await compress(pending.url,320,.6);if(!LS.set('sp_photo',d))throw 0}
    photo=d;cancelPhoto();bind();render();toast('Profile photo saved');
  }catch{$('#photoErr').textContent='Could not save this photo. Browser storage may be full, or the image is unreadable. Try a smaller image.'}
}
function removePhoto(){if(confirm('Remove your profile photo?')){photo=null;LS.del('sp_photo');bind();render();toast('Photo removed')}}

/* ---------- Pages ---------- */
function photoBtns(){return `<div class="btns"><button class="btn glass" data-act="upload"><i class="fa-solid fa-upload"></i>${photo?'Change Photo':'Upload Photo'}</button>${photo?'<button class="btn glass" data-act="remove"><i class="fa-solid fa-trash"></i>Remove Photo</button>':''}</div>`}
function profileCard(){return `<section class="card hero"><div class="avwrap"><div class="av" data-avatar></div>${photoBtns()}</div>
<div class="meta"><h1>${esc(fullName())}</h1><span class="badge">${esc(P.status)}</span>
<div class="kv"><div><small>Admission no.</small>${val(P.admNo)}</div><div><small>Roll no.</small>${val(P.roll)}</div><div><small>Semester</small>${val(P.sem)}</div><div><small>Academic year</small>${val(P.acYear)}</div><div style="grid-column:1/-1"><small>Department</small>${val(P.dept)}</div></div>
<div class="btns" style="justify-content:flex-start"><button class="btn glass" data-act="edit"><i class="fa-solid fa-pen"></i>Edit Profile</button><button class="btn glass" data-act="copy"><i class="fa-solid fa-copy"></i>Copy admission no.</button><button class="btn glass" data-act="download"><i class="fa-solid fa-download"></i>Download profile</button></div></div></section>`}
const pages={
dashboard(){
 const pend=assign.filter(a=>a.s!=='Submitted');
 return `<h1>Welcome back, ${esc(P.firstName?(P.firstName[0].toUpperCase()+P.firstName.slice(1).toLowerCase()):'Student')}</h1><p class="lead">${esc(P.univ)} · ${esc(P.acYear)} (demo data where not supplied)</p>
 ${profileCard()}<div style="height:16px"></div>
 <div class="stats">
  <div class="card stat"><i class="fa-solid fa-calendar-check"></i><div><b>${att()}%</b><small>Attendance</small></div></div>
  <div class="card stat"><i class="fa-solid fa-book"></i><div><b>${pend.length}</b><small>Pending assignments</small></div></div>
  <div class="card stat"><i class="fa-solid fa-briefcase"></i><div><b>4 Offers</b><small>Max 28.5 LPA</small></div></div>
  <div class="card stat"><i class="fa-solid fa-trophy"></i><div><b>8.5</b><small>CGPA (demo)</small></div></div>
 </div>
 <div class="grid">
  <section class="card span12">
   <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:14px">
    <div>
     <h2 style="margin:0"><i class="fa-solid fa-briefcase" style="color:var(--ind);margin-right:8px"></i>Campus Placements & Offers</h2>
     <small style="color:var(--mut)">4 company offers received · Cleared advanced interview rounds · Highest package: <b style="color:var(--ok)">28.5 LPA</b></small>
    </div>
    <button class="btn glass" data-act="download-placement" aria-label="Download placement offers file"><i class="fa-solid fa-file-arrow-down"></i>Download Placement File</button>
   </div>
   ${tbl(['Company & Role','Package (LPA)','Rounds Cleared','Offer Status'],PLACEMENTS.map(p=>[
    `<b>${p.company}</b><br><small style="color:var(--mut)">${p.role}</small>`,
    `<span style="font-weight:800;color:var(--ok);font-size:1.05rem">₹ ${p.lpa} LPA</span>`,
    `<div><b>${p.clearedRounds}</b><br><small style="color:var(--mut)">${p.rounds.join(' · ')}</small></div>`,
    pill(p.status)
   ]))}
  </section>
  <section class="card span7"><h2>Attendance by course</h2><div class="bars">${SUBJECTS.map(s=>`<div class="bar"><b>${s[1]}%</b><i data-h="${s[1]}"></i><small>${s[0].split(' ').map(w=>w[0]).join('')}</small></div>`).join('')}</div></section>
  <section class="card span5"><h2>Academic progress</h2>${[['Credits earned','132 / 160',82],['Semester syllabus covered','',64],['Assignments submitted',`${assign.length-pend.length} / ${assign.length}`,Math.round((assign.length-pend.length)/assign.length*100)]].map(p=>`<div style="display:flex;justify-content:space-between"><span>${p[0]}</span><b>${p[1]||p[2]+'%'}</b></div><div class="prog"><i data-w="${p[2]}"></i></div>`).join('')}</section>
  <section class="card span8"><h2>Weekly timetable</h2>${tbl(['Time',...DAYS],SLOTS.map((t,i)=>[t,...TT[i]]))}</section>
  <section class="card span4"><h2>Quick actions</h2><div class="quick"><button class="btn ghost" data-go="leave"><i class="fa-solid fa-paper-plane"></i>Apply leave</button><button class="btn ghost" data-go="assignments"><i class="fa-solid fa-list-check"></i>Assignments</button><button class="btn ghost" data-act="edit"><i class="fa-solid fa-pen"></i>Edit profile</button><button class="btn ghost" data-go="billing"><i class="fa-solid fa-receipt"></i>Fees</button></div></section>
  <section class="card span6"><h2>Recent announcements<a class="pill" data-go="announcements" style="cursor:pointer">View all</a></h2><ul class="list">${ANN.slice(0,3).map(a=>`<li><div><b>${a.t}</b><small>${a.b}</small></div><small>${fmtD(a.d)}</small></li>`).join('')}</ul></section>
  <section class="card span6"><h2>Upcoming deadlines</h2><ul class="list">${[...pend].sort((a,b)=>a.due.localeCompare(b.due)).map(a=>`<li><div><b>${a.t}</b><small>${a.c}</small></div><div>${fmtD(a.due)}<br>${pill(a.s)}</div></li>`).join('')||'<li>All caught up. No pending assignments.</li>'}</ul></section>
 </div>`},
profile(){
 const d=(l,v,w)=>`<div class="${w?'wide':''}"><small>${l}</small>${val(v)}</div>`;
 return `<h1>My Profile</h1><p class="lead">Personal and academic details.</p>${profileCard()}<div style="height:16px"></div>
 <div class="grid"><section class="card span6"><h2>Personal details</h2><div class="details">${d('Title',P.title)}${d('Gender',P.gender)}${d('First name',P.firstName)}${d('Last name',P.lastName)}${d('Date of birth',fmtD(P.dob))}${d("Father's name",P.father)}${d("Mother's name",P.mother)}${d('Email',P.email)}${d('Mobile',P.mobile)}${d('City',P.city)}${d('State',P.state)}${d('Country',P.country)}${d('Address',P.address,1)}</div></section>
 <section class="card span6"><h2>Academic details</h2><div class="details">${d('University',P.univ,1)}${d('School',P.school)}${d('Admission year',P.admYear)}${d('Department',P.dept,1)}${d('Course',P.course,1)}${d('Semester',P.sem)}${d('Curriculum plan',P.plan)}${d('Academic standing',P.standing)}${d('Classification',P.classification)}${d('Discount category',P.discount)}${d('Intake',P.intake)}${d('Program validity',fmtD(P.validity))}</div></section></div>`},
attendance(){
 const recs=[];for(let i=0;i<18;i++)recs.push([`2026-10-${String(1+i).padStart(2,'0')}`,SUBJECTS[i%5][0],i%6===4?'Absent':'Present']);
 return `<h1>Attendance</h1><p class="lead">Overall ${att()}% (demo records).</p><section class="card"><div class="filters"><select id="fSub" aria-label="Course"><option value="">All courses</option>${SUBJECTS.map(s=>`<option>${s[0]}</option>`).join('')}</select><select id="fSt" aria-label="Status"><option value="">All statuses</option><option>Present</option><option>Absent</option></select></div><div id="attOut"></div></section>`},
assignments(){return `<h1>Assignments</h1><p class="lead">Change a status as you work. It is saved in this browser.</p><section class="card">${tbl(['Assignment','Course','Due','Status'],assign.map(a=>[`<b>${a.t}</b>`,a.c,fmtD(a.due),`<select data-asg="${a.id}" aria-label="Status for ${esc(a.t)}">${['Pending','In Progress','Submitted'].map(o=>`<option ${o===a.s?'selected':''}>${o}</option>`).join('')}</select>`]))}</section>`},
timetable(){return `<h1>Timetable</h1><p class="lead">Weekly class schedule.</p><section class="card">${tbl(['Time',...DAYS],SLOTS.map((t,i)=>[t,...TT[i]]))}</section>`},
leave(){return `<h1>Leave</h1><p class="lead">Apply for leave. Requests are stored in this browser only.</p><div class="grid"><section class="card span5"><h2>New application</h2><form id="leaveForm" novalidate>
 <div class="fld"><label>Leave type<select name="type"><option>Medical</option><option>Personal</option><option>Academic event</option></select></label></div><br>
 <div class="fld"><label>From<input type="date" name="from"></label><div class="err"></div></div>
 <div class="fld"><label>To<input type="date" name="to"></label><div class="err"></div></div>
 <div class="fld"><label>Reason<textarea name="reason" placeholder="At least 10 characters"></textarea></label><div class="err"></div></div>
 <button class="btn" type="submit" style="width:100%"><i class="fa-solid fa-paper-plane"></i>Submit application</button></form></section>
 <section class="card span7"><h2>Your applications</h2>${leaves.length?tbl(['Type','Dates','Status'],leaves.map(l=>[l.type,`${fmtD(l.from)} to ${fmtD(l.to)}`,pill('Pending')])):'<p class="lead" style="margin:0">No applications yet. Submit one using the form.</p>'}</section></div>`},
announcements(){return `<h1>Announcements</h1><p class="lead">Search or filter by category.</p><section class="card"><div class="filters"><input id="aq" type="search" placeholder="Search announcements" aria-label="Search announcements"><select id="ac" aria-label="Category"><option value="">All categories</option>${[...new Set(ANN.map(a=>a.cat))].map(c=>`<option>${c}</option>`).join('')}</select></div><ul class="list" id="aOut"></ul></section>`}
};
Object.keys(G).forEach(k=>pages[k]=()=>{const g=G[k];return `<h1>${g[0]}</h1><p class="lead">${g[2]} (demo data)</p><section class="card">${tbl(g[3],g[4])}</section>`});

/* ---------- Page wiring ---------- */
function render(){
 $('#view').innerHTML=pages[page]();bind();
 requestAnimationFrame(()=>{$$('[data-h]').forEach(e=>e.style.height=e.dataset.h+'%');$$('[data-w]').forEach(e=>e.style.width=e.dataset.w+'%')});
 if(page==='attendance'){const f=()=>{const recs=[];for(let i=0;i<18;i++)recs.push([`2026-10-${String(1+i).padStart(2,'0')}`,SUBJECTS[i%5][0],i%6===4?'Absent':'Present']);const s=$('#fSub').value,t=$('#fSt').value,r=recs.filter(x=>(!s||x[1]===s)&&(!t||x[2]===t));$('#attOut').innerHTML=r.length?tbl(['Date','Course','Status'],r.map(x=>[fmtD(x[0]),x[1],pill(x[2])])):'<p>No records match these filters.</p>'};$('#fSub').onchange=$('#fSt').onchange=f;f()}
 if(page==='announcements'){const f=()=>{const q=$('#aq').value.trim().toLowerCase(),c=$('#ac').value,r=ANN.filter(a=>(!c||a.cat===c)&&(a.t+' '+a.b).toLowerCase().includes(q));$('#aOut').innerHTML=r.map(a=>`<li><div><b>${a.t}</b><small>${a.b}</small></div><div><span class="pill">${a.cat}</span><br><small>${fmtD(a.d)}</small></div></li>`).join('')||'<li>No announcements match your search.</li>'};$('#aq').oninput=$('#ac').onchange=f;f()}
 if(page==='leave')$('#leaveForm').onsubmit=submitLeave;
 $$('[data-asg]').forEach(s=>s.onchange=()=>{assign.find(a=>a.id==s.dataset.asg).s=s.value;LS.set('sp_assign',assign);toast('Assignment marked '+s.value)});
}
function go(k){if(!pages[k])k='dashboard';page=k;history.replaceState(null,'','#'+k);$$('#nav a').forEach(a=>a.classList.toggle('on',a.dataset.go===k));closeDrawer();$('#bellMenu').classList.remove('open');render();window.scrollTo(0,0)}
const closeDrawer=()=>{$('#side').classList.remove('open');document.body.classList.remove('drawer')};
$('#nav').innerHTML=NAV.map(n=>`<a data-go="${n.k}" tabindex="0" role="link"><i class="fa-solid fa-${n.i}"></i><span>${n.l}</span></a>`).join('');

/* ---------- Leave form ---------- */
function submitLeave(e){e.preventDefault();const f=e.target,v=Object.fromEntries(new FormData(f));let ok=true;
 const bad=(n,m)=>{const el=f.elements[n]||f[n];const w=el.closest('.fld');w.classList.add('bad');w.querySelector('.err').textContent=m;ok=false};
 $$('.fld',f).forEach(w=>{w.classList.remove('bad');const x=w.querySelector('.err');if(x)x.textContent=''});
 if(!v.from)bad('from','Choose a start date.');if(!v.to)bad('to','Choose an end date.');
 if(v.from&&v.to&&v.to<v.from)bad('to','End date must be on or after the start date.');
 if((v.reason||'').trim().length<10)bad('reason','Enter a reason of at least 10 characters.');
 if(!ok)return;leaves.unshift(v);LS.set('sp_leaves',leaves);toast('Leave application submitted');render()}

/* ---------- Edit profile ---------- */
function openEdit(){
 let h='<div class="fs">';
 FIELDS.forEach(f=>{if(f.length===1){h+=`<h4>${f[0]}</h4>`;return}
  const [k,l,t,o,r]=f,v=esc(P[k]||'');
  h+=`<div class="fld"><label>${l}${r?' *':''}${t==='select'?`<select name="${k}">${o.map(x=>`<option ${x===P[k]?'selected':''}>${x}</option>`).join('')}</select>`:`<input name="${k}" type="${t}" value="${v}" ${t==='tel'?'inputmode="numeric"':''} autocomplete="off">`}</label><div class="err"></div></div>`});
 $('#editFields').innerHTML=h+'</div>';openM('editModal');
}
$('#editForm').addEventListener('submit',e=>{e.preventDefault();const f=e.target,d={};let ok=true;
 FIELDS.filter(x=>x.length>1).forEach(([k,l,t,o,r])=>{const el=f.elements[k]||f[k];const w=el.closest('.fld'),v=el.value.trim();let m='';
  if(r&&!v)m=`${l} is required.`;
  else if(t==='email'&&v&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))m='Enter a valid email address.';
  else if(t==='tel'&&v&&!/^[+]?[\d\s-]{10,16}$/.test(v))m='Enter a 10 to 13 digit mobile number.';
  else if(t==='tel'&&v&&!/^[+]?\d{10,13}$/.test(v.replace(/[\s-]/g,'')))m='Enter a 10 to 13 digit mobile number.';
  else if(k==='dob'&&v&&new Date(v)>new Date())m='Date of birth cannot be in the future.';
  w.classList.toggle('bad',!!m);w.querySelector('.err').textContent=m;if(m)ok=false;d[k]=v});
 if(!ok){toast('Fix the highlighted fields.','error');return}
 P={...P,...d};if(!LS.set('sp_profile',P))toast('Saved for this session only. Browser storage is full.','error');
 closeM('editModal');render();toast('Profile updated')});

/* ---------- Search (Ctrl+K) ---------- */
const ACTS=[['Edit profile','pen',()=>openEdit()],['Toggle light/dark theme','moon',()=>toggleTheme()],['Download placement offers file','file-arrow-down',()=>downloadPlacement()],['Download profile as text','download',()=>download()],['Copy admission number','copy',()=>copyAdm()]];
function searchList(){const q=$('#q').value.trim().toLowerCase(),it=[...NAV.map(n=>[n.l,n.i,()=>go(n.k)]),...ACTS].filter(x=>x[0].toLowerCase().includes(q));
 $('#results').innerHTML=it.map((x,i)=>`<li data-i="${i}" class="${i?'':'sel'}"><i class="fa-solid fa-${x[1]}"></i>${x[0]}</li>`).join('')||'<li>No results. Try a different word.</li>';
 $$('#results li[data-i]').forEach(li=>li.onclick=()=>{closeM('searchModal');it[li.dataset.i][2]()});return it}
function openSearch(){$('#q').value='';searchList();openM('searchModal');setTimeout(()=>$('#q').focus(),50)}
$('#q').addEventListener('input',searchList);
$('#q').addEventListener('keydown',e=>{if(e.key==='Enter'){const it=searchList();if(it[0]){closeM('searchModal');it[0][2]()}}});

/* ---------- Misc actions ---------- */
function toggleTheme(){const d=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=d;LS.set('sp_theme',d);$('#themeIcon').className='fa-solid fa-'+(d==='dark'?'sun':'moon')}
function copyAdm(){const t=P.admNo;(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).catch(()=>{const a=document.createElement('textarea');a.value=t;document.body.append(a);a.select();document.execCommand('copy');a.remove()}).finally(()=>toast('Admission number copied'))}
function download(){const L=[['Name',fullName()],['University',P.univ],['Status',P.status],['Admission No.',P.admNo],['Roll No.',P.roll],['Semester',P.sem],['Academic Year',P.acYear],['School',P.school],['Department',P.dept],['Course',P.course],['DOB',fmtD(P.dob)],['Gender',P.gender],["Father's Name",P.father],["Mother's Name",P.mother],['City',P.city],['State',P.state],['Country',P.country],['Email',P.email],['Mobile',P.mobile]];
 const b=new Blob([L.map(x=>`${x[0]}: ${x[1]||NP}`).join('\n')],{type:'text/plain'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=`${P.admNo||'student'}-profile.txt`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000);toast('Profile downloaded')}
function downloadPlacement(){
 const L=[
  '================================================================',
  '                 MOHAN BABU UNIVERSITY - PLACEMENT CELL         ',
  '                STUDENT CAMPUS PLACEMENT DOSSIER (2026-2027)    ',
  '================================================================',
  '',
  `Student Name    : ${fullName()}`,
  `Admission No.   : ${P.admNo}`,
  `Roll No.        : ${P.roll}`,
  `Department      : ${P.dept}`,
  `Course          : ${P.course}`,
  `Academic Year   : ${P.acYear}`,
  '',
  '----------------------------------------------------------------',
  '                     CAMPUS PLACEMENT OFFERS (4)                ',
  '----------------------------------------------------------------',
  ...PLACEMENTS.map((p,i)=>[
   `[Offer #${i+1}] ${p.company.toUpperCase()}`,
   `Role            : ${p.role}`,
   `Package (LPA)   : ₹ ${p.lpa} LPA`,
   `Rounds Cleared  : ${p.clearedRounds}`,
   `Rounds Details  : ${p.rounds.join(' -> ')}`,
   `Offer Status    : ${p.status}`,
   ''
  ].join('\n')),
  '----------------------------------------------------------------',
  'Total Offers Received : 4',
  'Highest CTC Package   : 28.5 LPA (Microsoft)',
  'Average CTC Package   : 21.3 LPA',
  'Placement Status      : Placed & Offer Accepted',
  'Verification Authority: University Training & Placement Cell',
  '================================================================'
 ];
 const b=new Blob([L.join('\n')],{type:'text/plain'}),a=document.createElement('a');
 a.href=URL.createObjectURL(b);
 a.download=`${P.admNo||'student'}-placement-offers.txt`;
 document.body.appendChild(a);
 a.click();
 a.remove();
 setTimeout(()=>URL.revokeObjectURL(a.href),1000);
 toast('Placement file downloaded');
}

/* ---------- Global events ---------- */
const A={upload:pickFile,remove:removePhoto,edit:openEdit,copy:copyAdm,download,'download-placement':downloadPlacement,search:openSearch,theme:toggleTheme,
 'photo-save':savePhoto,'photo-cancel':cancelPhoto,'edit-cancel':()=>closeM('editModal'),
 drawer:()=>{$('#side').classList.add('open');document.body.classList.add('drawer')},
 collapse:()=>{const c=document.body.classList.toggle('collapsed');LS.set('sp_collapsed',c)},
 bell:()=>$('#bellMenu').classList.toggle('open')};
document.addEventListener('click',e=>{
 const el=e.target.closest('[data-go],[data-act]');
 if(el){
  if(el.dataset.act&&A[el.dataset.act]){e.stopPropagation();return A[el.dataset.act]()}
  if(el.dataset.go)return go(el.dataset.go);
 }
 if(!e.target.closest('.dd-wrap'))$('#bellMenu').classList.remove('open')});
$('#overlay').onclick=closeDrawer;
$('#nav').addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.dataset.go)go(e.target.dataset.go)});
document.addEventListener('keydown',e=>{
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openSearch()}
 if(e.key==='Escape'){$$('.modal.open').forEach(m=>m.id==='photoModal'?cancelPhoto():closeM(m.id));closeDrawer()}});
window.addEventListener('resize',()=>{if(innerWidth>768)closeDrawer()});

/* ---------- Init ---------- */
$('#today').textContent=new Date().toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
const th=LS.get('sp_theme',matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');
document.documentElement.dataset.theme=th;$('#themeIcon').className='fa-solid fa-'+(th==='dark'?'sun':'moon');
if(LS.get('sp_collapsed',false))document.body.classList.add('collapsed');
go(location.hash.slice(1)||'dashboard');
