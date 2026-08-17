/* ---------------- shared avatars ---------------- */
const EMOJIS = ['😀','😊','🙂','👍','🙏','✅','❌','⚠️','🎉','👀','💬','📎','🕐','📌','🙌','🤝','😅','😬','🔧','💡','📸','🖥️','🔒','✨'];
const COMMAND_TEXTS = {
  restart: "Let’s get your lockdown browser restarted — go ahead and reopen it from your desktop shortcut.",
  verifyid: "Before we continue, I need to verify your student ID on file.",
  greeting: "Hi! Thanks for reaching out — I’m here to help."
};
const PEOPLE = {
  jordan:  {initials:'JL', color:'#cd4c15', bg:'#fae0d1', name:'Jordan Lee', role:'student'},
  priya:   {initials:'PN', color:'#1d4ed8', bg:'#dbeafe', name:'Priya Nair', role:'instructor'},
  marcus:  {initials:'MW', color:'#0c0a09', bg:'#e8e4e3', name:'Marcus Webb', role:'unknown'},
  alex:    {initials:'AR', color:'#92400e', bg:'#fef3c7', name:'Alex Rivera', role:'admin'},
  dana:    {initials:'DO', color:'#166534', bg:'#dcfce7', name:'Dana Ortiz', role:'admin'},
  victoria:{initials:'VB', color:'#6d28d9', bg:'#ede9fe', name:'Victoria Bryan', role:'admin'},
  jordank: {initials:'JK', color:'#be185d', bg:'#fce7f3', name:'Jordan Kim', role:'admin'},
  agent:   {initials:'A', color:'#fff', bg:'#c70036', name:'Support Agent', role:'admin'},
};
function avatar(key, size){
  const p = PEOPLE[key];
  return '<div class="avatar-circle" style="width:'+size+'px;height:'+size+'px;background:'+p.bg+';color:'+p.color+';font-size:'+(size*0.38)+'px">'+p.initials+'</div>';
}
function roleAvatar(role, replied){
  // Replying doesn't recolor the avatar — it stays the sender's role colour;
  // only the glyph swaps to the reply arrow, per the Figma inbox spec.
  const icon = replied ? I('reply',16) : Ifill('messageCircle',16);
  return '<div class="role-avatar role-'+role+'">'+icon+'</div>';
}
function roleBadge(role){
  if(role==='admin') return '<span class="badge badge-admin">Administrator</span>';
  if(role==='instructor') return '<span class="badge badge-instructor">Instructor</span>';
  if(role==='student') return '<span class="badge badge-student">Student</span>';
  return '<span class="badge" style="background:#e8e4e3;color:#403e3f;">Unknown</span>';
}

/* ---------------- chrome builders ---------------- */
function sidenav(active){
  // Nav destinations swap glyph style with state: solid when selected, outlined
  // otherwise. Search is an action rather than a destination, so it never fills.
  const item = (key,icon,dot) => {
    const on = active===key;
    return `<button class="nav-icon-btn${on?' active':''}" data-page-icon="${key}" title="${key}"
      aria-current="${on?'page':'false'}">${on?Isolid(icon,20):I(icon,20)}${dot?`<span class="nav-dot"></span>`:''}</button>`;
  };
  return `
  <div class="sidenav">
    <div class="sidenav-top">
      <div class="sidenav-mark">EH</div>
      <hr class="sidenav-divider"/>
      ${item('inbox','inbox',true)}
      ${item('knowledge','book')}
      ${item('reports','bar')}
      ${item('contacts','users')}
    </div>
    <div class="sidenav-bottom">
      <hr class="sidenav-divider solid"/>
      <button class="nav-icon-btn" title="Search">${I('search',20)}</button>
      ${item('settings','settings')}
      <div class="avatar-dot" title="Your profile"><span class="unread-dot"></span></div>
    </div>
  </div>`;
}

function knowledgeNav(active){
  const link = (key,label,icon) => `<button class="nav-item clickable${active===key?' active':''}" data-page="${key}">
      <span class="left">${I(icon,18)}<span>${label}</span></span>${active===key?'':''}${I('chevronRight',10)}</button>`;
  return `<div class="secondary-nav">
    <div class="secondary-nav-header"><h2>Knowledge</h2></div>
    <ul class="nav-list" style="gap:2px;">
      <li>${link('knowledge-sources','Sources','grid')}</li>
      <li>${link('knowledge-content','Content','book')}</li>
      <li>${link('knowledge-articles','Articles','fileText')}</li>
      <li><a class="nav-item" href="#" onclick="return false;"><span class="left">${I('external','18')}<span>Help Center</span></span>${I('external',14)}</a></li>
    </ul>
  </div>`;
}

function reportsNav(active){
  const item = (key,label,icon,count) => `<button class="nav-item clickable${active===key?' active':''}" data-page="${key}">
      <span class="left">${I(icon,18)}<span>${label}</span></span>${count!==undefined?`<span class="count">${count}</span>`:''}</button>`;
  return `<div class="secondary-nav">
    <div class="secondary-nav-header"><h2>Reports</h2><button class="icon-btn-circle">${I('plus',14)}</button></div>
    <ul class="nav-list">
      <li>${item('reports-overview','Overview','grid')}</li>
      <li>${item('reports-all','All reports','bar',31)}</li>
      <li><span class="nav-item">${'<span class="left">'+I('fileText',18)+'<span>Your reports</span></span>'}<span class="count">0</span></span></li>
      <li><span class="nav-item">${'<span class="left">'+I('heart',18)+'<span>Your favorites</span></span>'}${I('chevronRight',10)}</span></li>
      <li class="nav-empty">No reports added</li>
      <li><span class="nav-item">${'<span class="left">'+I('msgSquare',18)+'<span>Conversation topics</span></span>'}${I('chevronRight',10)}</span></li>
      <li><span class="nav-item">${'<span class="left">'+I('filter',18)+'<span>Saved filters</span></span>'}</span></li>
      <li><span class="nav-item">${'<span class="left">'+I('download',18)+'<span>Dataset export</span></span>'}</span></li>
      <li><span class="nav-item">${'<span class="left">'+I('calClock',18)+'<span>Manage schedules</span></span>'}</span></li>
    </ul>
    <div class="nav-divider"></div>
    <ul class="nav-list">
      <li class="nav-folder">${I('folder',18)}<span>AI &amp; Automation</span></li>
      <li>${item('reports-ai-assist','AI Assist','bar').replace('nav-item clickable','nav-child clickable').replace('class="nav-item clickable','class="nav-child clickable')}</li>
      <li class="nav-folder">${I('folder',18)}<span>Proctoring</span></li>
      <li>${item('reports-flagged-sessions','Flagged Sessions','bar').replace(/nav-item/g,'nav-child')}</li>
      <li>${item('reports-room-scan','Room Scan Failures','bar').replace(/nav-item/g,'nav-child')}</li>
    </ul>
  </div>`;
}

function contactsNav(){
  return `<div class="secondary-nav">
    <div class="secondary-nav-header"><h2>Contacts</h2>${I('sliders',18)}</div>
    <ul class="nav-list">
      <li class="nav-group-label">People${I('chevronRight',10)}</li>
      <li><span class="nav-child">All contacts<span class="count">46</span></span></li>
      <li><span class="nav-child">Students<span class="count">31</span></span></li>
      <li><span class="nav-child">Instructors<span class="count">9</span></span></li>
      <li><span class="nav-child active">Administrators<span class="count">6</span></span></li>
      <li class="nav-section-gap"></li>
      <li class="nav-group-label">Institutions${I('chevronRight',10)}</li>
      <li class="nav-section-gap"></li>
      <li class="nav-group-label">Conversations</li>
    </ul>
  </div>`;
}

function settingsNav(active){
  if(active==='general'){
    const item = (label,active2) => `<span class="nav-child${active2?' active':''}">${label}</span>`;
    return `<div class="secondary-nav">
      <div class="secondary-nav-header"><h2>Settings</h2></div>
      <ul class="nav-list">
        <li><button class="nav-item clickable" data-page="settings-home">Home</button></li>
        <li><span class="nav-item">Workspace${I('chevronRight',10)}</span></li>
        ${item('General',true)}
        ${item('Teammates')}
        ${item('Workspace owners')}
        ${item('Office hours')}
        ${item('Security')}
        ${item('Multilingual')}
        <li><span class="nav-item">Subscription${I('chevronRight',10)}</span></li>
        <li><span class="nav-item">Institutions${I('chevronRight',10)}</span></li>
        <li><span class="nav-item">Personal${I('chevronRight',10)}</span></li>
      </ul>
    </div>`;
  }
  return `<div class="secondary-nav">
    <div class="secondary-nav-header"><h2>Settings</h2></div>
    <ul class="nav-list">
      <li><button class="nav-item clickable active" data-page="settings-home">Home</button></li>
      <li><span class="nav-item">Workspace${I('chevronRight',10)}</span></li>
      <li><span class="nav-item">Subscription${I('chevronRight',10)}</span></li>
      <li><span class="nav-item">Channels${I('chevronRight',10)}</span></li>
      <li><span class="nav-item">Inbox${I('chevronRight',10)}</span></li>
      <li><span class="nav-item">AI &amp; Automation${I('chevronRight',10)}</span></li>
      <li><span class="nav-item">Integrations${I('chevronRight',10)}</span></li>
      <li><span class="nav-item">Data &amp; Privacy${I('chevronRight',10)}</span></li>
      <li><span class="nav-item">Help Center${I('chevronRight',10)}</span></li>
      <li><span class="nav-item">Institutions${I('chevronRight',10)}</span></li>
      <li><span class="nav-item">Personal${I('chevronRight',10)}</span></li>
    </ul>
  </div>`;
}

/* ---------------- mini chart helpers ---------------- */
// Every chart draws itself in on mount (CSS keyframes, see components.css) and
// carries invisible per-index hit targets so a shared delegated handler in
// app.js can show a hover tooltip + crosshair — see initChartTooltip().
function chartHit(x0, cw, h, cx, cyList, i, tip){
  return `<rect class="chart-hit" x="${x0.toFixed(1)}" y="0" width="${cw.toFixed(1)}" height="${h}" fill="transparent"
    data-cx="${cx}" data-cy='[${cyList.join(',')}]' data-i="${i}" data-tip='${tip.replace(/'/g,'&#39;')}'/>`;
}
function lineChart(points, w, h, color, labels, seriesName, unit){
  const step = w/(points.length-1);
  const max = Math.max(...points), min=0;
  const norm = v => h - ((v-min)/(max-min||1))*h;
  const pts = points.map((v,i)=> (i*step).toFixed(1)+','+norm(v).toFixed(1)).join(' ');
  const area = `0,${h} ${pts} ${w},${h}`;
  const name = seriesName || 'Value';
  let hits = '';
  for(let i=0;i<points.length;i++){
    const cx = (i*step).toFixed(1), cy = norm(points[i]).toFixed(1);
    const tip = JSON.stringify({label:labels&&labels[i], entries:[{color, name, value:points[i]+(unit||'')}]});
    const x0 = Math.max(0, i*step-step/2);
    const cw = (i===0||i===points.length-1) ? step/2 : step;
    hits += chartHit(x0, cw, h, cx, [cy], i, tip);
  }
  return `<svg class="mini-chart" viewBox="0 0 ${w} ${h}" width="100%" height="${h}" preserveAspectRatio="none" style="display:block;overflow:visible;">
    <line x1="0" y1="0" x2="${w}" y2="0" stroke="#e8e4e3" stroke-width="1"/>
    <line x1="0" y1="${h/2}" x2="${w}" y2="${h/2}" stroke="#e8e4e3" stroke-width="1"/>
    <line x1="0" y1="${h}" x2="${w}" y2="${h}" stroke="#e8e4e3" stroke-width="1"/>
    <polygon class="chart-area" points="${area}" fill="${color}" opacity=".12"/>
    <polyline class="chart-line" points="${pts}" fill="none" stroke="${color}" stroke-width="2.5" pathLength="100"/>
    <circle class="chart-dot-ping" cx="${w}" cy="${norm(points[points.length-1])}" r="4" fill="${color}"/>
    <circle class="chart-dot" cx="${w}" cy="${norm(points[points.length-1])}" r="4" fill="${color}"/>
    <line class="chart-crosshair" x1="0" y1="0" x2="0" y2="${h}"/>
    <circle class="chart-hover-dot" data-series="0" r="4" fill="${color}" cx="-10" cy="-10"/>
    ${hits}
  </svg>`;
}
function multiLineChart(series, w, h, labels){
  const step = w/(series[0].data.length-1);
  const max = Math.max(...series.flatMap(s=>s.data));
  const norm = v => h - (v/(max||1))*h;
  let out = `<svg class="mini-chart" viewBox="0 0 ${w} ${h}" width="100%" height="${h}" preserveAspectRatio="none" style="display:block;overflow:visible;">
    <line x1="0" y1="0" x2="${w}" y2="0" stroke="#e8e4e3" stroke-width="1"/>
    <line x1="0" y1="${h/2}" x2="${w}" y2="${h/2}" stroke="#e8e4e3" stroke-width="1"/>
    <line x1="0" y1="${h}" x2="${w}" y2="${h}" stroke="#e8e4e3" stroke-width="1"/>`;
  series.forEach((s,si)=>{
    const pts = s.data.map((v,i)=> (i*step).toFixed(1)+','+norm(v).toFixed(1)).join(' ');
    out += `<polyline class="chart-line" points="${pts}" fill="none" stroke="${s.color}" stroke-width="${s.width||2}" pathLength="100" style="--delay:${(si*0.12).toFixed(2)}s"/>`;
  });
  // Only the lead series gets the live pulse — restraint over decorating every line.
  const lead = series[0];
  const leadCy = norm(lead.data[lead.data.length-1]);
  out += `<circle class="chart-dot-ping" cx="${w}" cy="${leadCy}" r="3.5" fill="${lead.color}"/>
    <circle class="chart-dot" cx="${w}" cy="${leadCy}" r="3.5" fill="${lead.color}"/>
    <line class="chart-crosshair" x1="0" y1="0" x2="0" y2="${h}"/>`;
  series.forEach((s,si)=>{
    out += `<circle class="chart-hover-dot" data-series="${si}" r="3.5" fill="${s.color}" cx="-10" cy="-10"/>`;
  });
  const n = series[0].data.length;
  for(let i=0;i<n;i++){
    const cx = (i*step).toFixed(1);
    const cys = series.map(s=>norm(s.data[i]).toFixed(1));
    const entries = series.map(s=>({color:s.color, name:s.name||'Series', value:s.data[i]}));
    const tip = JSON.stringify({label:labels&&labels[i], entries});
    const x0 = Math.max(0, i*step-step/2);
    const cw = (i===0||i===n-1) ? step/2 : step;
    out += chartHit(x0, cw, h, cx, cys, i, tip);
  }
  out += `</svg>`;
  return out;
}
function barChart(values, w, h, color, max, seriesName, labels){
  max = max || Math.max(...values);
  const gap = 10, n = values.length, bw = (w-gap*(n-1))/n;
  const name = seriesName || 'Value';
  let bars='';
  values.forEach((v,i)=>{
    const bh = (v/max)*h;
    const x = i*(bw+gap);
    const isMax = v===max;
    const fill = isMax?'var(--bar-alert)':color;
    const tip = JSON.stringify({label:labels&&labels[i], entries:[{color:fill, name, value:v}]});
    bars += `<rect class="chart-bar" x="${x.toFixed(1)}" y="${(h-bh).toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(bh,2).toFixed(1)}" rx="2" fill="${fill}"
      style="--delay:${(i*0.045).toFixed(3)}s" data-tip='${tip.replace(/'/g,'&#39;')}'/>`;
  });
  return `<svg class="mini-chart" viewBox="0 0 ${w} ${h}" width="100%" height="${h}" preserveAspectRatio="none" style="display:block;">${bars}</svg>`;
}
const WEEKS = ['May 18','May 25','Jun 1','Jun 8','Jun 15','Jun 22','Jun 29','Jul 6','Jul 13','Jul 20','Jul 27','Aug 3'];
function xAxis(labels){ return `<div class="chart-xaxis">${labels.map(l=>`<span>${l}</span>`).join('')}</div>`; }
