/* ================= PAGE CONTENT ================= */

/* ---------- Knowledge: Sources ---------- */
function pageKnowledgeSources(){
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div><h1>Sources</h1></div>
      <div class="topbar-actions">
        <button class="btn">Operator</button>
        <button class="btn">Learn &#8964;</button>
        <button class="btn btn-primary">+ New content</button>
      </div>
    </div>
  </div>
  <div class="tabs-row">
    <div class="tab active">All sources</div>
    <div class="tab">AI Agent</div>
    <div class="tab">Copilot</div>
    <div class="tab">Help Center</div>
  </div>
  <div class="scroll-body">
    <div>
      <h3 style="font-size:16px;font-weight:600;letter-spacing:-.02em;margin-bottom:16px;">Optimize your content for AI Assist, Copilot, and Help Center</h3>
      <div style="display:flex;gap:16px;flex-wrap:wrap;">
        <div class="source-card">
          <div class="source-thumb" style="background:#bfeacb;">
            <span class="wordmark" style="font-size:22px;color:#2f7549;">BAB Help</span>
          </div>
          <div class="source-body">
            <div class="source-title-row"><strong>Help Center</strong><span class="status-pill" style="background:#bfeacb;color:#2f7549;">Live</span></div>
            <p class="source-desc">Students and instructors use your knowledge to find accurate answers themselves.</p>
            <div class="link-line" style="color:var(--green);">Set up now ${I('arrowUpRight',14)}</div>
          </div>
        </div>
        <div class="source-card">
          <div class="source-thumb" style="background:#bfe6ea;color:#0c4a6e;">${I('bot',40)}</div>
          <div class="source-body">
            <div class="source-title-row"><strong>AI Assist</strong><span class="status-pill" style="background:var(--unread);color:var(--muted);">Not live</span></div>
            <p class="source-desc">AI Assist uses your knowledge to generate accurate answers for students, instructors, and administrators.</p>
            <div class="link-line" style="color:var(--green);">Set up now ${I('arrowUpRight',14)}</div>
          </div>
        </div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:16px;">
      <div>
        <h3>Public articles</h3>
        <p style="font-size:13px;color:var(--muted);margin-top:4px;">Let AI Assist and Copilot use public articles from your Help Center.</p>
      </div>
      <div class="source-list">
        <div class="source-row">
          <div class="source-left">
            <span class="source-status-dot" style="background:var(--green-text);"></span>
            <span class="wordmark" style="font-size:16px;">EH</span>
            <strong>Company Help Center</strong>
          </div>
          <span style="color:var(--muted);font-size:13px;">1 article</span>
          <button class="btn">Add article</button>
        </div>
        <div style="height:1px;background:var(--border);"></div>
        <div class="source-row">
          <div class="source-left">
            <span class="source-status-dot" style="background:var(--green-text);"></span>
            <div class="service-mark" style="background:#03363d;">Z</div>
            <strong>Zendesk</strong>
          </div>
          <span style="color:var(--muted);font-size:13px;">Not set up</span>
          <button class="btn">Sync or Import</button>
        </div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:16px;">
      <div>
        <h3>Internal articles</h3>
        <p style="font-size:13px;color:var(--muted);margin-top:4px;">Give AI Assist and Copilot internal knowledge only available to you and your team.</p>
      </div>
      <div class="source-list">
        <div class="source-row">
          <div class="source-left">
            <span class="source-status-dot" style="background:var(--green-text);"></span>
            <div class="service-mark" style="background:#1f2e47;"></div>
            <strong>Agent Runbooks</strong>
          </div>
          <span style="color:var(--muted);font-size:13px;">1 article</span>
          <button class="btn">Add article</button>
        </div>
      </div>
    </div>
  </div>`;
}

/* ---------- Knowledge: Content ---------- */
function pageKnowledgeContent(){
  const row = (icon, name, type, usedIn, edited, author) => `
    <tr>
      <td class="strong"><span style="display:inline-flex;align-items:center;gap:8px;">${I(icon,16)}${name}</span></td>
      <td>${type}</td><td>${usedIn}</td><td>${edited}</td><td>${author}</td>
    </tr>`;
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div><h1>Content</h1></div>
      <div class="topbar-actions"><button class="btn btn-primary">+ Create content</button></div>
    </div>
  </div>
  <div class="filter-row bordered">
    <button class="btn">${I('search',13)} Search content</button>
    <button class="btn">All types</button>
    <button class="btn">Folders</button>
  </div>
  <div class="scroll-body">
    <div class="card">
      <table>
        <thead><tr><th>Name</th><th>Type</th><th>Used in</th><th>Last edited</th><th>Author</th></tr></thead>
        <tbody>
          ${row('folder','Restart Lockdown Browser','Folder','AI Assist, Copilot','Aug 12, 2026','Victoria Bryan')}
          ${row('fileText','Camera &amp; mic permissions','Article','Help Center, AI Assist','Aug 10, 2026','Victoria Bryan')}
          ${row('fileText','Room scan troubleshooting','Article','Help Center, Copilot','Aug 9, 2026','Jordan Kim')}
          ${row('folder','Exam accommodation policy','Folder','AI Assist, Help Center','Aug 5, 2026','Victoria Bryan')}
          ${row('msgSquare','Standard greeting','Snippet','AI Assist, Copilot','Jul 30, 2026','Jordan Kim')}
          ${row('fileText','Extension conflict checklist','Article','Copilot','Jul 22, 2026','Victoria Bryan')}
        </tbody>
      </table>
    </div>
  </div>`;
}

/* ---------- Knowledge: Articles ---------- */
function pageKnowledgeArticles(){
  const row = (title, status, collection, views, updated) => `
    <tr>
      <td class="strong">${title}</td>
      <td><span class="status-pill ${status==='Published'?'status-live':'status-notlive'}">${status}</span></td>
      <td>${collection}</td><td>${views}</td><td>${updated}</td>
    </tr>`;
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div><h1>Articles</h1></div>
      <div class="topbar-actions"><button class="btn btn-primary">+ New article</button></div>
    </div>
  </div>
  <div class="tabs-row">
    <div class="tab active">All articles</div>
    <div class="tab">Published</div>
    <div class="tab">Drafts</div>
  </div>
  <div class="scroll-body">
    <div class="card">
      <table>
        <thead><tr><th>Title</th><th>Status</th><th>Collection</th><th>Views (30d)</th><th>Last updated</th></tr></thead>
        <tbody>
          ${row('What to do if the lockdown browser crashes','Published','Technical Issues','842','Aug 11, 2026')}
          ${row('Camera and microphone permissions guide','Published','Getting Started','611','Aug 9, 2026')}
          ${row('Room scan troubleshooting','Published','Technical Issues','505','Aug 6, 2026')}
          ${row('Requesting extended time accommodations','Draft','Policies','0','Aug 4, 2026')}
          ${row('Two-monitor exam setup requirements','Published','Getting Started','289','Jul 28, 2026')}
          ${row('Rescheduling a missed exam','Draft','Policies','0','Jul 20, 2026')}
        </tbody>
      </table>
    </div>
  </div>`;
}

/* ---------- Contacts: Administrators ---------- */
function pageContactsAdministrators(){
  const row = (key, seen, inst, signup, exams) => {
    const p = PEOPLE[key];
    return `<tr>
      <td><span style="display:flex;align-items:center;gap:10px;">${avatar(key,28)}<span class="strong">${p.name}</span></span></td>
      <td>${roleBadge('admin')}</td><td>${seen}</td><td>${inst}</td><td>${signup}</td><td>${exams}</td>
    </tr>`;
  };
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div><h1>Administrators</h1></div>
      <div class="topbar-actions"><button class="btn">Learn &#8964;</button><button class="btn btn-primary">New contact &#8964;</button></div>
    </div>
  </div>
  <div class="scroll-body">
    <div class="promo-banner">
      <div style="flex:1;min-width:0;">
        <h3 style="font-size:20px;font-weight:600;letter-spacing:-.02em;">Import your contacts for a personalized experience</h3>
        <p style="font-size:14px;color:var(--muted);margin-top:10px;">View student, instructor, and administrator profiles, or segment your contacts by institution and role. Integrate your SIS/LMS roster, and start reaching your users more effectively with AI Assist and Workflows.</p>
        <div class="promo-links">
          <div class="link-line">${I('book',16)}Get started with contacts</div>
          <div class="link-line">${I('book',16)}Tracking and grouping your contacts</div>
          <div class="link-line">${I('book',16)}Using apps and integrations</div>
          <div class="link-line">${I('arrowUpRight',16)}Visit our App Store</div>
        </div>
      </div>
    </div>
    <div style="display:flex;gap:8px;align-items:center;">
      <button class="btn">${I('users',13)} Administrators</button>
      <button class="btn">${I('calClock',13)} Last seen less than 30 days ago</button>
      <span class="link-line" style="margin:0;">+ Add filter</span>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <h3 style="font-size:16px;font-weight:600;letter-spacing:-.02em;">6 administrators</h3>
      <div style="display:flex;gap:8px;"><button class="btn">New message</button><button class="btn">Add tag</button><button class="btn">More &#8964;</button></div>
    </div>
    <div class="card">
      <table>
        <thead><tr><th>Name</th><th>Role</th><th>Last seen</th><th>Institution</th><th>Signed up</th><th>Exams overseen</th></tr></thead>
        <tbody>
          ${row('alex','4 hours ago','Cascade State University','Aug 2, 2025','1,204')}
          ${row('priya','1 day ago','Cascade State University','Jun 14, 2025','860')}
          ${row('marcus','3 days ago','Northfield College','Feb 3, 2025','512')}
          ${row('dana','2 weeks ago','Northfield College','Nov 19, 2024','298')}
        </tbody>
      </table>
    </div>
  </div>`;
}

/* ---------- Reports: Overview ---------- */
function pageReportsOverview(){
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div><h1>Overview</h1></div>
      <div class="topbar-actions"><button class="btn">Date range</button><button class="btn">Export</button></div>
    </div>
  </div>
  <div class="filter-row bordered">
    <button class="btn">${I('search',13)} Search reports</button>
    <button class="btn">All categories &#8964;</button>
  </div>
  <div class="scroll-body">
    <div class="stat-grid cols-4">
      <div class="stat-tile highlight"><div class="stat-label">${I('msgSquare',14)}Total conversations this week</div>
        <div class="stat-value-row"><span class="stat-value">24</span><span class="stat-delta up">${I('arrowUp',12)}+3</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('clock',14)}Median time to first response</div>
        <div class="stat-value-row"><span class="stat-value">2.1 hrs</span><span class="stat-delta down">${I('arrowDown',12)}-0.2 hrs</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('target',14)}Flag precision</div>
        <div class="stat-value-row"><span class="stat-value">77%</span></div>
        <div class="stat-caption">See Flagged Sessions for detail</div></div>
      <div class="stat-tile"><div class="stat-label">${I('userCheck',14)}Deflected by AI Assist</div>
        <div class="stat-value-row"><span class="stat-value">68%</span><span class="stat-delta up">${I('arrowUp',12)}+4pt</span></div></div>
    </div>
    <div class="card chart-card">
      <h3>Overall volume growth</h3>
      <div class="chart-wrap">
        <div class="chart-yaxis" style="height:200px;"><span>30</span><span>15</span><span>0</span></div>
        <div class="chart-plot">${multiLineChart([
          {data:[9,10,11,10,12,13,14,15,17,19,21,24],color:'var(--series-all)',width:2.5,name:'All conversations'},
          {data:[5,6,6,6,7,7,8,9,10,11,12,13],color:'var(--series-student)',name:'Student'},
          {data:[3,3,4,3,4,4,4,5,5,6,6,7],color:'var(--series-instructor)',name:'Instructor'},
          {data:[1,1,1,2,1,2,2,2,2,3,3,3],color:'var(--series-admin)',name:'Administrator'},
        ],1140,200,WEEKS)}</div>
      </div>
      ${xAxis(WEEKS)}
      <div class="chart-legend">
        <div class="legend-item"><span class="legend-dot" style="background:var(--series-all);"></span>All conversations</div>
        <div class="legend-item"><span class="legend-dot" style="background:var(--series-student);"></span>Student</div>
        <div class="legend-item"><span class="legend-dot" style="background:var(--series-instructor);"></span>Instructor</div>
        <div class="legend-item"><span class="legend-dot" style="background:var(--series-admin);"></span>Administrator</div>
      </div>
    </div>
    <div class="card chart-card">
      <h3>Median time to first response, last 12 weeks</h3>
      <div class="chart-wrap">
        <div class="chart-yaxis" style="height:160px;"><span>3.5h</span><span>1.75h</span><span>0h</span></div>
        <div class="chart-plot">${lineChart([3.4,3.2,3.1,2.9,2.8,2.9,2.6,2.5,2.4,2.2,2.3,2.1],1140,160,'var(--series-all)',WEEKS,'Median time to first response','hrs')}</div>
      </div>
      ${xAxis(WEEKS)}
    </div>
  </div>`;
}

/* ---------- Reports: All reports ---------- */
function pageReportsAll(){
  const row = (icon, name, cat, type, viewed, author, page) => `
    <tr class="clickable" data-page="${page}"><td class="strong"><span style="display:inline-flex;align-items:center;gap:8px;">${I(icon,16)}${name}</span></td>
    <td>${cat}</td><td>${type}</td><td>${viewed}</td><td>${author}</td></tr>`;
  return `
  <div class="topbar">
    <div class="topbar-row"><div><h1>All reports</h1></div>
      <div class="topbar-actions"><button class="btn btn-primary">+ New report</button></div>
    </div>
  </div>
  <div class="filter-row bordered">
    <button class="btn">${I('search',13)} Search reports</button>
    <button class="btn">All categories &#8964;</button>
  </div>
  <div class="scroll-body">
    <div class="card">
      <table>
        <thead><tr><th>Report</th><th>Category</th><th>Type</th><th>Last viewed</th><th>Created by</th></tr></thead>
        <tbody>
          ${row('msgSquare','Conversation topics','Human Support','Donut','Just now','Victoria Bryan','reports-topics')}
          ${row('bar','Overall volume growth','Human Support','Line','2 hours ago','Victoria Bryan','reports-overview')}
          ${row('users','New conversations by role','Human Support','Line','2 hours ago','Victoria Bryan','reports-conversations-by-role')}
          ${row('clock','Response time','Human Support','Line','2 hours ago','Victoria Bryan','reports-response-time')}
          ${row('smile','Satisfaction (CSAT)','Human Support','Line','5 hours ago','Victoria Bryan','reports-csat')}
          ${row('userCheck','AI Assist deflection rate','AI &amp; Automation','Line','2 days ago','Victoria Bryan','reports-ai-assist')}
          ${row('flag','Flagged sessions by week','Proctoring','Bar','3 hours ago','Victoria Bryan','reports-flagged-sessions')}
          ${row('camOff','Room scan failure rate','Proctoring','Line','1 day ago','Jordan Kim','reports-room-scan')}
          ${row('monitor','Lockdown browser stability','Proctoring','Line','1 day ago','Jordan Kim','reports-lockdown-browser')}
          ${row('puzzle','Extension violations detected','Proctoring','Bar','1 day ago','Jordan Kim','reports-extension-violations')}
          ${row('monitor','Screen share &amp; multi-monitor issues','Proctoring','Line','1 day ago','Jordan Kim','reports-screen-share')}
          ${row('check','Exam completion rate','Proctoring','Line','4 days ago','Jordan Kim','reports-exam-completion')}
        </tbody>
      </table>
    </div>
  </div>`;
}

/* ---------- Reports: Flagged Sessions ---------- */
function pageReportsFlagged(){
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div><h1>Flagged Sessions</h1></div>
      <div class="topbar-actions"><button class="btn">Date range</button><button class="btn">Export</button><button class="btn">Share</button><button class="btn btn-primary">Save</button></div>
    </div>
    <p class="sub" style="margin-top:14px;">Use this report to monitor exam sessions flagged for manual integrity review.</p>
  </div>
  <div class="filter-row bordered">
    <button class="btn">${I('search',13)} Search sessions</button>
    <button class="btn">All statuses</button>
    <span class="filter-spacer"></span>
    <span class="filter-meta">Updated 3 minutes ago</span>
    <button class="btn btn-clickable" data-page="integrity-review">View flagged queue &rarr;</button>
  </div>
  <div class="scroll-body">
    <div class="stat-grid cols-4">
      <div class="stat-tile highlight"><div class="stat-label">${I('target',14)}Flag precision</div>
        <div class="stat-value-row"><span class="stat-value">77%</span></div>
        <div class="stat-caption">5 escalated of 22 decided sessions</div></div>
      <div class="stat-tile"><div class="stat-label">${I('flag',14)}Sessions flagged this week</div>
        <div class="stat-value-row"><span class="stat-value">14</span><span class="stat-delta up">${I('arrowUp',12)}+3 vs last week</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('shieldAlert',14)}Escalated</div>
        <div class="stat-value-row"><span class="stat-value">5</span><span class="stat-delta up">${I('arrowUp',12)}+2</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('alertCircle',14)}False positives</div>
        <div class="stat-value-row"><span class="stat-value">17</span></div></div>
    </div>
    <div class="footnote"><span class="f">&fnof;</span><span>Method: Flag precision = escalated &divide; (escalated + false positives). Roughly 3 false alarms for every real incident, at ~38 min of review each.</span></div>
    <div class="stat-grid cols-2">
      <div class="stat-tile"><div class="stat-label">${I('hourglass',14)}Total reviewer time this week</div>
        <div class="stat-value-row"><span class="stat-value">14.2 hrs</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('clock',14)}Median time to decision</div>
        <div class="stat-value-row"><span class="stat-value">38 min</span><span class="stat-delta down">${I('arrowDown',12)}-6 min</span></div></div>
    </div>
    <div class="card chart-card">
      <h3>Flagged sessions by week</h3>
      <div class="chart-wrap">
        <div class="chart-yaxis" style="height:200px;"><span>5</span><span>0</span></div>
        <div class="chart-plot">${barChart([1,0,2,1,1,3,2,1,4,2,3,5],1138,200,'var(--bar-idle)',5,'Flagged sessions',WEEKS)}</div>
      </div>
      ${xAxis(WEEKS)}
    </div>
  </div>`;
}

/* ---------- Reports: Room Scan Failures ---------- */
function pageReportsRoomScan(){
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div><h1>Room Scan Failures</h1></div>
      <div class="topbar-actions"><button class="btn">Date range</button><button class="btn">Export</button><button class="btn">Share</button><button class="btn btn-primary">Save</button></div>
    </div>
    <p class="sub" style="margin-top:14px;">Track how often students fail the initial room scan before an exam can begin.</p>
  </div>
  <div class="filter-row bordered">
    <button class="btn">${I('search',13)} Search sessions</button>
    <button class="btn">All institutions</button>
    <span class="filter-spacer"></span>
    <button class="btn">Compare to last period</button>
  </div>
  <div class="scroll-body">
    <div class="stat-grid cols-3">
      <div class="stat-tile"><div class="stat-label">${I('camOff',14)}Room scans failed</div>
        <div class="stat-value-row"><span class="stat-value">6.8%</span><span class="stat-delta down">${I('arrowDown',12)}-1.2pt</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('scan',14)}Room scans attempted</div>
        <div class="stat-value-row"><span class="stat-value">2,914</span><span class="stat-delta up">${I('arrowUp',12)}+8%</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('rotateCcw',14)}Retry success rate</div>
        <div class="stat-value-row"><span class="stat-value">91%</span></div></div>
    </div>
    <div class="card chart-card">
      <h3>Failure rate by week</h3>
      <div class="chart-wrap">
        <div class="chart-yaxis" style="height:220px;"><span>15%</span><span>7.5%</span><span>0%</span></div>
        <div class="chart-plot">${lineChart([9.4,8.8,9.1,8.2,7.9,8.4,7.6,7.1,7.4,6.9,7.2,6.8],1124,220,'var(--series-all)',WEEKS,'Failure rate','%')}</div>
      </div>
      ${xAxis(WEEKS)}
    </div>
  </div>`;
}

/* ---------- Reports: AI Assist ---------- */
function pageReportsAiAssist(){
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div><h1>AI Assist</h1></div>
      <div class="topbar-actions"><button class="btn">Date range</button><button class="btn">Export</button><button class="btn">Share</button><button class="btn btn-primary">Save</button></div>
    </div>
    <div class="segment-row" style="margin-top:14px;">
      <span class="segment-pill active">All</span>
      <span class="segment-pill">Outside live attempt</span>
      <span class="segment-pill">During live attempt</span>
    </div>
  </div>
  <div class="filter-row bordered">
    <button class="btn">${I('search',13)} Search conversations</button>
    <button class="btn">All outcomes</button>
  </div>
  <div class="scroll-body">
    <div class="stat-grid cols-4">
      <div class="stat-tile"><div class="stat-label">${I('headset',14)}Time to human (live)</div>
        <div class="stat-value-row"><span class="stat-value">41 sec</span><span class="stat-delta down">${I('arrowDown',12)}-9 sec</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('userCheck',14)}Deflected by AI Assist</div>
        <div class="stat-value-row"><span class="stat-value">68%</span><span class="stat-delta up">${I('arrowUp',12)}+4pt</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('alertTriangle',14)}Escalated without resolution</div>
        <div class="stat-value-row"><span class="stat-value">12%</span><span class="stat-delta warn">${I('alertTriangle',12)}flat</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('userCheck',14)}Resolved by AI Assist</div>
        <div class="stat-value-row"><span class="stat-value">341</span><span class="stat-delta up">${I('arrowUp',12)}+22</span></div></div>
    </div>
    <div class="card chart-card">
      <h3>Time to human by week (live attempts)</h3>
      <div class="chart-wrap">
        <div class="chart-yaxis" style="height:220px;"><span>50%</span><span>25%</span><span>0%</span></div>
        <div class="chart-plot">${lineChart([38,36,34,33,31,30,29,27,26,24,23,22],1120,220,'var(--series-all)',WEEKS,'Time to human','%')}</div>
      </div>
      ${xAxis(WEEKS)}
    </div>
  </div>`;
}

/* ---------- Reports: Conversation Topics ---------- */
function pageReportsTopics(){
  const TOPIC_CATEGORIES = [
    { key:'lockdown', label:'Lockdown browser', icon:'monitor', color:'var(--topic-1)',
      weekly:[3,4,3,5,4,6,5,7,6,8,7,9],
      examples:[ {role:'student', quote:'The lockdown browser closed mid-exam. What do I do?'},
                 {role:'student', quote:'The lockdown browser closed mid-exam'} ] },
    { key:'camera', label:'Camera & room scan', icon:'camOff', color:'var(--topic-2)',
      weekly:[4,5,4,6,5,4,6,5,4,5,4,5], linkPage:'reports-room-scan',
      examples:[ {role:'student', quote:'My camera permission keeps getting denied'} ] },
    { key:'extension', label:'Browser extension conflicts', icon:'puzzle', color:'var(--topic-3)',
      weekly:[2,3,2,4,3,5,4,6,5,7,6,8],
      examples:[ {role:'student', quote:'The proctoring extension says it needs an update'},
                 {role:'student', quote:"Extension update loop won't finish installing"} ] },
    { key:'screenshare', label:'Screen share / multi-monitor', icon:'monitor', color:'var(--topic-4)',
      weekly:[3,4,3,4,3,4,3,4,3,4,3,4],
      examples:[ {role:'student', quote:'Screen recording permission keeps resetting'},
                 {role:'unknown', quote:'My screen share stopped working mid-exam'},
                 {role:'unknown', quote:'Do I need two monitors disconnected?'} ] },
    { key:'access', label:'Exam access', icon:'appWindow', color:'var(--topic-5)',
      weekly:[6,7,6,8,7,6,8,7,6,8,7,9],
      examples:[ {role:'student', quote:'I keep getting a black screen after the proctoring loads'},
                 {role:'unknown', quote:"Hi, I can't access my exam page"} ] },
    { key:'scheduling', label:'Scheduling & accommodations', icon:'calClock', color:'var(--topic-6)',
      weekly:[2,2,3,2,2,3,2,3,2,3,2,3],
      examples:[ {role:'admin', quote:'Is there a way to reschedule my exam time'} ] },
  ];
  const total = c => c.weekly.reduce((s,v)=>s+v,0);
  const top3 = TOPIC_CATEGORIES.slice().sort((a,b)=>total(b)-total(a)).slice(0,3);
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div><h1>Conversation Topics</h1></div>
      <div class="topbar-actions"><button class="btn">Date range</button><button class="btn">Export</button><button class="btn">Share</button><button class="btn btn-primary">Save</button></div>
    </div>
    <p class="sub" style="margin-top:14px;">See what students, instructors, and administrators are asking for help with, grouped by topic.</p>
  </div>
  <div class="filter-row bordered">
    <button class="btn">${I('search',13)} Search conversations</button>
    <button class="btn">All categories &#8964;</button>
    <span class="filter-spacer"></span>
    <span class="filter-meta">Updated 3 minutes ago</span>
  </div>
  <div class="scroll-body">
    <div class="stat-grid cols-3">
      <div class="stat-tile highlight"><div class="stat-label">${I('msgSquare',14)}Top topic this week</div>
        <div class="stat-value-row"><span class="stat-value">Exam access</span></div>
        <div class="stat-caption">85 conversations &middot; 25% of total volume</div></div>
      <div class="stat-tile"><div class="stat-label">${I('bar',14)}Total categorized conversations</div>
        <div class="stat-value-row"><span class="stat-value">335</span><span class="stat-delta up">${I('arrowUp',12)}+11%</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('arrowUp',14)}Fastest-growing topic</div>
        <div class="stat-value-row"><span class="stat-value">Browser extensions</span><span class="stat-delta up">${I('arrowUp',12)}+89%</span></div></div>
    </div>
    <div class="card chart-card">
      <h3>Conversations by topic</h3>
      <div style="display:flex;align-items:center;gap:32px;flex-wrap:wrap;">
        ${donutChart(TOPIC_CATEGORIES.map(c=>({value:total(c),color:c.color,name:c.label})),200,28,'Conversations')}
        <div class="chart-legend" style="flex-direction:column;align-items:flex-start;gap:10px;">
          ${TOPIC_CATEGORIES.map(c=>`<div class="legend-item"><span class="legend-dot" style="background:${c.color};"></span>${c.label}</div>`).join('')}
        </div>
      </div>
    </div>
    <div class="card chart-card">
      <h3>Topic volume, last 12 weeks</h3>
      <div class="chart-wrap">
        <div class="chart-yaxis" style="height:200px;"><span>9</span><span>4.5</span><span>0</span></div>
        <div class="chart-plot">${multiLineChart(top3.map(c=>({data:c.weekly,color:c.color,name:c.label})),1140,200,WEEKS)}</div>
      </div>
      ${xAxis(WEEKS)}
      <div class="chart-legend">
        ${top3.map(c=>`<div class="legend-item"><span class="legend-dot" style="background:${c.color};"></span>${c.label}</div>`).join('')}
      </div>
    </div>
    <div class="card">
      <h3>Themes with real examples</h3>
      <div class="segment-row" style="margin-top:14px;">
        ${TOPIC_CATEGORIES.map((c,i)=>`<span class="segment-pill clickable${i===0?' active':''}" data-topic="${c.key}" onclick="selectTopicTab(event,'${c.key}')">${c.label}</span>`).join('')}
      </div>
      ${TOPIC_CATEGORIES.map((c,i)=>`
      <div class="topic-examples${i===0?' active':''}" id="topic-examples-${c.key}">
        ${c.examples.map(ex=>`
        <div class="example-card">
          <div>${roleBadge(ex.role)}</div>
          <div class="example-card-title">${c.label}</div>
          <div class="example-card-quote">"${ex.quote}"</div>
        </div>`).join('')}
        ${c.linkPage?`<button class="btn btn-clickable" data-page="${c.linkPage}" style="flex-basis:100%;align-self:flex-start;">View Room Scan Failures report &rarr;</button>`:''}
      </div>`).join('')}
    </div>
  </div>`;
}

/* ---------- Reports: New Conversations by Role ---------- */
function pageReportsConversationsByRole(){
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div><h1>New Conversations by Role</h1></div>
      <div class="topbar-actions"><button class="btn">Date range</button><button class="btn">Export</button><button class="btn">Share</button><button class="btn btn-primary">Save</button></div>
    </div>
    <p class="sub" style="margin-top:14px;">See how new conversation volume breaks down by who's asking for help.</p>
  </div>
  <div class="filter-row bordered">
    <button class="btn">${I('search',13)} Search conversations</button>
    <button class="btn">All roles &#8964;</button>
  </div>
  <div class="scroll-body">
    <div class="stat-grid cols-3">
      <div class="stat-tile"><div class="stat-label">${I('user',14)}Student conversations</div>
        <div class="stat-value-row"><span class="stat-value">13</span><span class="stat-delta up">${I('arrowUp',12)}+1</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('userCheck',14)}Instructor conversations</div>
        <div class="stat-value-row"><span class="stat-value">7</span><span class="stat-delta up">${I('arrowUp',12)}+1</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('shield',14)}Administrator conversations</div>
        <div class="stat-value-row"><span class="stat-value">3</span></div></div>
    </div>
    <div class="card chart-card">
      <h3>New conversations by role, last 12 weeks</h3>
      <div class="chart-wrap">
        <div class="chart-yaxis" style="height:200px;"><span>15</span><span>7.5</span><span>0</span></div>
        <div class="chart-plot">${multiLineChart([
          {data:[5,6,6,6,7,7,8,9,10,11,12,13],color:'var(--series-student)',name:'Student'},
          {data:[3,3,4,3,4,4,4,5,5,6,6,7],color:'var(--series-instructor)',name:'Instructor'},
          {data:[1,1,1,2,1,2,2,2,2,3,3,3],color:'var(--series-admin)',name:'Administrator'},
        ],1140,200,WEEKS)}</div>
      </div>
      ${xAxis(WEEKS)}
      <div class="chart-legend">
        <div class="legend-item"><span class="legend-dot" style="background:var(--series-student);"></span>Student</div>
        <div class="legend-item"><span class="legend-dot" style="background:var(--series-instructor);"></span>Instructor</div>
        <div class="legend-item"><span class="legend-dot" style="background:var(--series-admin);"></span>Administrator</div>
      </div>
    </div>
  </div>`;
}

/* ---------- Reports: Response Time ---------- */
function pageReportsResponseTime(){
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div><h1>Response Time</h1></div>
      <div class="topbar-actions"><button class="btn">Date range</button><button class="btn">Export</button><button class="btn">Share</button><button class="btn btn-primary">Save</button></div>
    </div>
    <p class="sub" style="margin-top:14px;">Track how quickly conversations get a first reply, and whether that meets your response-time target.</p>
  </div>
  <div class="filter-row bordered">
    <button class="btn">${I('search',13)} Search conversations</button>
    <button class="btn">All roles &#8964;</button>
    <span class="filter-spacer"></span>
    <span class="filter-meta">Updated 3 minutes ago</span>
  </div>
  <div class="scroll-body">
    <div class="stat-grid cols-3">
      <div class="stat-tile highlight"><div class="stat-label">${I('clock',14)}Median time to first response</div>
        <div class="stat-value-row"><span class="stat-value">2.1 hrs</span><span class="stat-delta down">${I('arrowDown',12)}-0.2 hrs</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('target',14)}SLA compliance</div>
        <div class="stat-value-row"><span class="stat-value">92%</span><span class="stat-delta up">${I('arrowUp',12)}+3pt</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('hourglass',14)}Longest outstanding wait</div>
        <div class="stat-value-row"><span class="stat-value">6.4 hrs</span></div></div>
    </div>
    <div class="footnote"><span class="f">&fnof;</span><span>Method: SLA target is 4 hours during business hours. Compliance = replies sent within target &divide; total conversations.</span></div>
    <div class="card chart-card">
      <h3>Median time to first response, last 12 weeks</h3>
      <div class="chart-wrap">
        <div class="chart-yaxis" style="height:200px;"><span>3.5h</span><span>1.75h</span><span>0h</span></div>
        <div class="chart-plot">${lineChart([3.4,3.2,3.1,2.9,2.8,2.9,2.6,2.5,2.4,2.2,2.3,2.1],1140,200,'var(--series-all)',WEEKS,'Median time to first response','hrs')}</div>
      </div>
      ${xAxis(WEEKS)}
    </div>
  </div>`;
}

/* ---------- Reports: Satisfaction (CSAT) ---------- */
function pageReportsCsat(){
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div><h1>Satisfaction (CSAT)</h1></div>
      <div class="topbar-actions"><button class="btn">Date range</button><button class="btn">Export</button><button class="btn">Share</button><button class="btn btn-primary">Save</button></div>
    </div>
    <p class="sub" style="margin-top:14px;">See how satisfied students, instructors, and administrators are with the help they received.</p>
  </div>
  <div class="filter-row bordered">
    <button class="btn">${I('search',13)} Search conversations</button>
    <button class="btn">All roles &#8964;</button>
  </div>
  <div class="scroll-body">
    <div class="stat-grid cols-4">
      <div class="stat-tile highlight"><div class="stat-label">${I('smile',14)}Average satisfaction</div>
        <div class="stat-value-row"><span class="stat-value">4.6/5</span><span class="stat-delta up">${I('arrowUp',12)}+0.1</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('messageCircle',14)}Rated conversations</div>
        <div class="stat-value-row"><span class="stat-value">61%</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('userCheck',14)}Resolution rate</div>
        <div class="stat-value-row"><span class="stat-value">89%</span><span class="stat-delta up">${I('arrowUp',12)}+2pt</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('alertTriangle',14)}Negative ratings this week</div>
        <div class="stat-value-row"><span class="stat-value">3</span><span class="stat-delta down">${I('arrowDown',12)}-2</span></div></div>
    </div>
    <div style="display:flex;gap:20px;flex-wrap:wrap;">
      <div class="card chart-card" style="flex:2;min-width:400px;">
        <h3>Satisfaction score, last 12 weeks</h3>
        <div class="chart-wrap">
          <div class="chart-yaxis" style="height:180px;"><span>5</span><span>2.5</span><span>0</span></div>
          <div class="chart-plot">${lineChart([4.1,4.2,4.2,4.3,4.3,4.4,4.4,4.5,4.5,4.5,4.6,4.6],780,180,'var(--series-all)',WEEKS,'Satisfaction','/5')}</div>
        </div>
        ${xAxis(WEEKS)}
      </div>
      <div class="card chart-card" style="flex:1;min-width:280px;">
        <h3>Rating distribution</h3>
        <div class="chart-wrap">
          <div class="chart-yaxis" style="height:180px;"><span>60%</span><span>30%</span><span>0%</span></div>
          <div class="chart-plot">${barChart([2,3,7,26,62],320,180,'var(--bar-idle)',65,'Ratings',['1 star','2 stars','3 stars','4 stars','5 stars'])}</div>
        </div>
        ${xAxis(['1&#9733;','2&#9733;','3&#9733;','4&#9733;','5&#9733;'])}
      </div>
    </div>
  </div>`;
}

/* ---------- Reports: Lockdown Browser ---------- */
function pageReportsLockdownBrowser(){
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div><h1>Lockdown Browser</h1></div>
      <div class="topbar-actions"><button class="btn">Date range</button><button class="btn">Export</button><button class="btn">Share</button><button class="btn btn-primary">Save</button></div>
    </div>
    <p class="sub" style="margin-top:14px;">Track lockdown browser stability during exams &mdash; crashes, forced closures, and recovery.</p>
  </div>
  <div class="filter-row bordered">
    <button class="btn">${I('search',13)} Search sessions</button>
    <button class="btn">All institutions</button>
    <span class="filter-spacer"></span>
    <button class="btn">Compare to last period</button>
  </div>
  <div class="scroll-body">
    <div class="stat-grid cols-3">
      <div class="stat-tile"><div class="stat-label">${I('monitor',14)}Sessions with a crash or forced close</div>
        <div class="stat-value-row"><span class="stat-value">4.1%</span><span class="stat-delta down">${I('arrowDown',12)}-0.6pt</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('scan',14)}Sessions using lockdown browser</div>
        <div class="stat-value-row"><span class="stat-value">3,208</span><span class="stat-delta up">${I('arrowUp',12)}+6%</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('rotateCcw',14)}Recovered without support</div>
        <div class="stat-value-row"><span class="stat-value">84%</span></div></div>
    </div>
    <div class="card chart-card">
      <h3>Crash rate by week</h3>
      <div class="chart-wrap">
        <div class="chart-yaxis" style="height:220px;"><span>8%</span><span>4%</span><span>0%</span></div>
        <div class="chart-plot">${lineChart([6.8,6.5,6.9,6.1,5.8,6,5.4,5.1,5.3,4.6,4.4,4.1],1124,220,'var(--series-all)',WEEKS,'Crash rate','%')}</div>
      </div>
      ${xAxis(WEEKS)}
    </div>
  </div>`;
}

/* ---------- Reports: Extension Violations ---------- */
function pageReportsExtensionViolations(){
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div><h1>Extension Violations</h1></div>
      <div class="topbar-actions"><button class="btn">Date range</button><button class="btn">Export</button><button class="btn">Share</button><button class="btn btn-primary">Save</button></div>
    </div>
    <p class="sub" style="margin-top:14px;">Track browser extension conflicts and policy violations detected during proctored exams.</p>
  </div>
  <div class="filter-row bordered">
    <button class="btn">${I('search',13)} Search sessions</button>
    <button class="btn">All institutions</button>
    <span class="filter-spacer"></span>
    <span class="filter-meta">Updated 3 minutes ago</span>
  </div>
  <div class="scroll-body">
    <div class="stat-grid cols-3">
      <div class="stat-tile highlight"><div class="stat-label">${I('puzzle',14)}Violations detected this week</div>
        <div class="stat-value-row"><span class="stat-value">8</span><span class="stat-delta up">${I('arrowUp',12)}+2 vs last week</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('scan',14)}Sessions scanned for extensions</div>
        <div class="stat-value-row"><span class="stat-value">3,208</span><span class="stat-delta up">${I('arrowUp',12)}+6%</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('rotateCcw',14)}Resolved without escalation</div>
        <div class="stat-value-row"><span class="stat-value">88%</span></div></div>
    </div>
    <div class="card chart-card">
      <h3>Violations detected by week</h3>
      <div class="chart-wrap">
        <div class="chart-yaxis" style="height:200px;"><span>10</span><span>5</span><span>0</span></div>
        <div class="chart-plot">${barChart([2,3,2,4,3,5,4,6,5,7,6,8],1138,200,'var(--bar-idle)',10,'Violations',WEEKS)}</div>
      </div>
      ${xAxis(WEEKS)}
    </div>
  </div>`;
}

/* ---------- Reports: Screen Share & Multi-Monitor ---------- */
function pageReportsScreenShare(){
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div><h1>Screen Share &amp; Multi-Monitor</h1></div>
      <div class="topbar-actions"><button class="btn">Date range</button><button class="btn">Export</button><button class="btn">Share</button><button class="btn btn-primary">Save</button></div>
    </div>
    <p class="sub" style="margin-top:14px;">Track screen share permission failures and multi-monitor detections during proctored exams.</p>
  </div>
  <div class="filter-row bordered">
    <button class="btn">${I('search',13)} Search sessions</button>
    <button class="btn">All institutions</button>
    <span class="filter-spacer"></span>
    <button class="btn">Compare to last period</button>
  </div>
  <div class="scroll-body">
    <div class="stat-grid cols-3">
      <div class="stat-tile"><div class="stat-label">${I('monitor',14)}Multi-monitor detections</div>
        <div class="stat-value-row"><span class="stat-value">3.2%</span><span class="stat-delta down">${I('arrowDown',12)}-0.4pt</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('camOff',14)}Screen share permission failures</div>
        <div class="stat-value-row"><span class="stat-value">41</span><span class="stat-delta up">${I('arrowUp',12)}+5</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('rotateCcw',14)}Cleared on retry</div>
        <div class="stat-value-row"><span class="stat-value">79%</span></div></div>
    </div>
    <div class="card chart-card">
      <h3>Detection rate by week</h3>
      <div class="chart-wrap">
        <div class="chart-yaxis" style="height:220px;"><span>6%</span><span>3%</span><span>0%</span></div>
        <div class="chart-plot">${lineChart([4.8,4.6,4.9,4.3,4.5,4.1,4.4,3.9,3.7,3.6,3.4,3.2],1124,220,'var(--series-all)',WEEKS,'Detection rate','%')}</div>
      </div>
      ${xAxis(WEEKS)}
    </div>
  </div>`;
}

/* ---------- Reports: Exam Completion Rate ---------- */
function pageReportsExamCompletion(){
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div><h1>Exam Completion Rate</h1></div>
      <div class="topbar-actions"><button class="btn">Date range</button><button class="btn">Export</button><button class="btn">Share</button><button class="btn btn-primary">Save</button></div>
    </div>
    <p class="sub" style="margin-top:14px;">Track how often proctored exam sessions complete without a technical or integrity interruption.</p>
  </div>
  <div class="filter-row bordered">
    <button class="btn">${I('search',13)} Search sessions</button>
    <button class="btn">All institutions</button>
    <span class="filter-spacer"></span>
    <button class="btn">Compare to last period</button>
  </div>
  <div class="scroll-body">
    <div class="stat-grid cols-3">
      <div class="stat-tile highlight"><div class="stat-label">${I('check',14)}Completed without interruption</div>
        <div class="stat-value-row"><span class="stat-value">93.4%</span><span class="stat-delta up">${I('arrowUp',12)}+0.7pt</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('monitor',14)}Terminated early &mdash; technical</div>
        <div class="stat-value-row"><span class="stat-value">142</span><span class="stat-delta down">${I('arrowDown',12)}-18</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('shieldAlert',14)}Terminated early &mdash; integrity flag</div>
        <div class="stat-value-row"><span class="stat-value">31</span><span class="stat-delta up">${I('arrowUp',12)}+4</span></div></div>
    </div>
    <div class="card chart-card">
      <h3>Sessions terminated early, by week</h3>
      <div class="chart-wrap">
        <div class="chart-yaxis" style="height:200px;"><span>20</span><span>10</span><span>0</span></div>
        <div class="chart-plot">${multiLineChart([
          {data:[16,15,17,14,13,15,12,13,11,10,12,9],color:'var(--bar-idle)',width:2.5,name:'Technical'},
          {data:[2,3,2,3,2,4,2,3,3,4,3,4],color:'var(--red-text)',name:'Integrity flag'},
        ],1140,200,WEEKS)}</div>
      </div>
      ${xAxis(WEEKS)}
      <div class="chart-legend">
        <div class="legend-item"><span class="legend-dot" style="background:var(--bar-idle);"></span>Technical</div>
        <div class="legend-item"><span class="legend-dot" style="background:var(--red-text);"></span>Integrity flag</div>
      </div>
    </div>
  </div>`;
}

/* ---------- Settings: Home ---------- */
function pageSettingsHome(){
  const card = (icon,bg,title,desc,clickable) => `
    <div class="settings-card${clickable?' clickable':''}"${clickable?` data-page="settings-general"`:''}>
      <div class="settings-icon-bg" style="background:${bg};">${I(icon,20)}</div>
      <div><h4>${title}</h4><p>${desc}</p></div>
    </div>`;
  return `
  <div class="topbar"><h1>Home</h1></div>
  <div class="scroll-body">
    <div class="section-block">
      <h3>Workspace</h3>
      <div class="settings-grid">
        ${card('list','var(--purple-bg)','General','Set workspace name, time zone, languages, and more.',true)}
        ${card('users','var(--purple-bg)','Teammates','Manage or invite teammates and see all activity logs.')}
        ${card('crown','var(--purple-bg)','Workspace owners','Manage who receives important service announcements.')}
        ${card('clock','var(--purple-bg)','Office hours','Set your office hours to manage customer expectations.')}
        ${card('shield','var(--purple-bg)','Security','Configure all security settings for your workspace and data.')}
        ${card('globe','var(--purple-bg)','Multilingual','Set up and manage your multilingual settings.')}
      </div>
    </div>
    <div class="section-block">
      <h3>Subscription</h3>
      <div class="settings-grid">
        ${card('card','var(--green-bg2)','Billing','Manage your subscription and payment details.')}
        ${card('bar','var(--green-bg2)','Usage','View your billed usage and set usage alerts and limits.')}
      </div>
    </div>
    <div class="section-block">
      <h3>Integrations</h3>
      <div class="settings-grid">
        ${card('grid','var(--pink-bg)','Canvas LMS','Connect your Canvas instance to sync rosters and exams.')}
        ${card('monitor','var(--pink-bg)','Blackboard','Connect Blackboard Learn for course and exam data.')}
        ${card('headset','var(--pink-bg)','Zendesk','Sync support tickets and articles from Zendesk.')}
      </div>
    </div>
  </div>`;
}

/* ---------- Settings: General ---------- */
function pageSettingsGeneral(){
  return `
  <div class="topbar">
    <div class="topbar-row"><h1>General</h1><button class="btn btn-primary">Save</button></div>
  </div>
  <div class="scroll-body">
    <div class="field-group">
      <div class="field-label"><h4>Workspace name &amp; time zone</h4><p>The workspace time zone will affect time-dependent features across the proctoring workspace.</p></div>
      <div class="field-body">
        <div class="form-field"><label>Name</label><div class="form-input">tbds</div></div>
        <div class="form-field"><label>Customer-facing name</label><div class="form-input">The Proctoring Support</div></div>
        <div class="form-field"><label>App ID</label><div class="form-input">yilng9t9</div></div>
        <div class="form-field"><label>Time zone</label><div class="form-input">America/Los_Angeles</div></div>
      </div>
    </div>
    <div class="field-group">
      <div class="field-label"><h4>Institutions</h4><p>The proctoring treats all users as individuals, but this feature groups students, instructors, and administrators from the same institution together.</p>
        <div class="link-line">${I('book',14)}How does the institutions feature work</div></div>
      <div class="field-body">
        <div class="toggle-row"><div class="toggle on"><span class="toggle-knob"></span></div>
          <div class="toggle-text"><strong>Enable institution-related features</strong></div></div>
        <div class="toggle-row"><div class="toggle off"><span class="toggle-knob"></span></div>
          <div class="toggle-text"><strong>Prevent institution attribute updates on Messenger</strong>
          <span>Enabling this will prevent tampering with the data. Workflows can still be used to collect attribute data from users.</span></div></div>
      </div>
    </div>
    <div class="field-group">
      <div class="field-label"><h4>Test workspace</h4><p>Experiment with features and integrations in a risk-free environment before rolling changes out to your live workspace.</p></div>
      <div class="field-body">
        <div class="toggle-row"><div class="toggle off"><span class="toggle-knob"></span></div>
          <div class="toggle-text"><strong>Enable test workspace</strong></div></div>
      </div>
    </div>
  </div>`;
}

/* ---------- Integrity Review ---------- */
function pageIntegrityReview(){
  const row = (key,course,note,pill,bg) => `
    <div class="ir-row" style="display:flex;gap:16px;align-items:center;padding:12px 16px;border-top:.5px solid var(--border-soft);${bg?`background:${bg};`:''}">
      <div style="width:180px;flex:0 0 180px;">
        <div class="strong" style="font-weight:600;">${PEOPLE[key].name}</div>
        <div style="font-size:12px;color:var(--muted);">${course}</div>
      </div>
      <div style="flex:1;font-size:13px;color:var(--muted);">${note}</div>
      <div style="flex:0 0 auto;">${pill}</div>
    </div>`;
  return `
  <div class="topbar">
    <h1>Integrity Review</h1>
    <p class="sub">Flag classification and adjudication live here &mdash; never in the support conversation. Support agents send facts; reviewers make the call.</p>
  </div>
  <div class="scroll-body" style="flex-direction:row;align-items:flex-start;">
    <div class="card" style="width:760px;flex:0 0 760px;">
      <div class="card-header bordered">Flagged sessions</div>
      ${row('jordan','BIO 201 Midterm','Room scan re-check triggered after browser restart','<span class="pill pill-outline">Under review</span>','var(--amber-bg)')}
      ${row('priya','CHEM 110 Final','Lockdown browser closed and reopened','<span class="pill pill-escalated">Escalated</span>')}
      ${row('marcus','MATH 220 Quiz 3','Two monitors detected at start of exam','<span class="pill pill-cleared">Cleared</span>')}
    </div>
    <div class="card" style="width:390px;flex:0 0 390px;">
      <div style="padding:16px 20px 12px;">
        <div style="font-size:14px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--red-text);">Support Activity &middot; Facts Only</div>
        <div style="font-size:16px;font-weight:600;letter-spacing:-.02em;margin-top:4px;">Jordan Lee &mdash; auto-generated on close</div>
      </div>
      <div style="padding:0 20px 16px;display:flex;flex-direction:column;gap:14px;">
        <div style="display:flex;gap:10px;"><span style="width:6px;height:6px;border-radius:999px;background:var(--muted);margin-top:6px;flex:0 0 auto;"></span>
          <div><div style="font-size:12px;color:var(--muted);font-weight:500;">2:44 PM</div><div style="font-size:13px;margin-top:2px;">Student reported: lockdown browser closed mid-exam.</div></div></div>
        <div style="display:flex;gap:10px;"><span style="width:6px;height:6px;border-radius:999px;background:var(--muted);margin-top:6px;flex:0 0 auto;"></span>
          <div><div style="font-size:12px;color:var(--muted);font-weight:500;">2:44 PM</div><div style="font-size:13px;margin-top:2px;">Agent diagnosed: application crash, consistent with a known browser-extension conflict &mdash; not tab-switch or exit behavior.</div></div></div>
        <div style="display:flex;gap:10px;"><span style="width:6px;height:6px;border-radius:999px;background:var(--muted);margin-top:6px;flex:0 0 auto;"></span>
          <div><div style="font-size:12px;color:var(--muted);font-weight:500;">2:45 PM</div><div style="font-size:13px;margin-top:2px;">Action taken: instructed restart from desktop shortcut; confirmed exam progress saved automatically.</div></div></div>
        <div style="display:flex;gap:10px;"><span style="width:6px;height:6px;border-radius:999px;background:var(--muted);margin-top:6px;flex:0 0 auto;"></span>
          <div><div style="font-size:12px;color:var(--muted);font-weight:500;">2:47 PM</div><div style="font-size:13px;margin-top:2px;">Outcome: student re-entered the exam. Session resumed without further interruption.</div></div></div>
      </div>
      <div style="border-top:1px solid var(--border);padding:14px 20px 18px;">
        <p style="font-size:12px;color:var(--muted);">This record is generated automatically from the support conversation. It contains no suspicion language and no reviewer conclusion &mdash; reviewers decide below.</p>
        <div style="display:flex;gap:8px;margin-top:10px;">
          <button class="btn" style="background:var(--green-bg);color:var(--green-text);">Clear &mdash; no action needed</button>
          <button class="btn" style="background:#fffbeb;color:var(--amber);">Escalate</button>
        </div>
      </div>
    </div>
  </div>`;
}

/* ---------- Inbox ---------- */
function inboxChatItem(role, roleLabel, timeLabel, preview, opts){
  opts = opts || {};
  // Row state drives surface: selected > unread (lighter than ground) > read.
  const state = opts.selected ? ' selected' : (opts.unread ? ' unread' : '');
  // A live attempt is now called out by a badge on the row rather than by a
  // section header, so the list can stay a single recency-ordered stream.
  const right = opts.live
    ? `<span class="live-badge">In-attempt</span>`
    : `<span class="chat-item-time">${timeLabel}</span>`;
  return `<div class="chat-item${state}" role="button" tabindex="0" aria-current="${opts.selected?'true':'false'}"
    onclick="selectChatItem(event,this)" onkeydown="onChatItemKeydown(event)">
    ${roleAvatar(role, opts.replied)}
    <div class="chat-item-body">
      <div class="chat-item-top">
        <span class="chat-item-name">${roleLabel}</span>
        ${right}
      </div>
      <div class="chat-item-preview"><p>${preview}</p></div>
    </div>
  </div>`;
}
function pageInbox(){
  return `
  <div class="inbox-shell">
    <div class="convo-list">
      <div class="convo-header">
        <div class="convo-header-left">
          <button class="convo-header-btn" onclick="toggleViews(event)" title="Views">${I('menu',18)}</button>
          <h2>Chats</h2>
        </div>
        <div class="convo-search-wrap" id="convo-search-wrap">
          <div class="convo-search-form">
            <input id="convo-search-input" class="convo-search-input" type="text" placeholder="Search conversations" onkeydown="onConvoSearchKeydown(event)">
          </div>
          <button class="convo-header-btn round" onclick="toggleConvoSearch(event)" title="Search" aria-label="Search" aria-expanded="false">${I('search',16)}</button>
        </div>
      </div>
      <div id="views-popover" class="views-popover">
        <div class="views-popover-header">Inbox</div>
        <div class="views-list">
          <div class="view-item active" onclick="selectView(event,'your-inbox')">
            ${I('inbox',16)}Your Inbox <span class="view-count">3</span>
          </div>
          <div class="view-item" onclick="selectView(event,'mentions')">
            ${I('user',16)}Mentions <span class="view-count">0</span>
          </div>
          <div class="view-item" onclick="selectView(event,'all')">
            ${I('inbox',16)}All <span class="view-count">11</span>
          </div>
          <div class="view-item" onclick="selectView(event,'unassigned')">
            ${I('inbox',16)}Unassigned <span class="view-count">8</span>
          </div>
          <div class="view-item" onclick="selectView(event,'spam')">
            ${I('alertCircle',16)}Spam <span class="view-count">0</span>
          </div>
        </div>
      </div>
      <div class="convo-filters">
        <div class="filter-tab-wrap">
          <button class="filter-tab" data-role="filter" onclick="toggleFilterMenu(event)">
            <span class="filter-tab-label">${FILTER_LABELS[inboxStatusFilter]}</span>${I('chevronDown',12)}
          </button>
          <div id="filter-menu" class="filter-menu">
            <button class="menu-check-item${inboxStatusFilter==='open'?' active':''}" onclick="selectFilter(event,'open')">${I('inbox',15)}Open<span class="check">${I('check',14)}</span></button>
            <button class="menu-check-item${inboxStatusFilter==='closed'?' active':''}" onclick="selectFilter(event,'closed')">${I('x',15)}Closed<span class="check">${I('check',14)}</span></button>
            <button class="menu-check-item${inboxStatusFilter==='all'?' active':''}" onclick="selectFilter(event,'all')">${I('inbox',15)}Open &amp; Closed<span class="check">${I('check',14)}</span></button>
          </div>
        </div>
        <div class="filter-tab-wrap">
          <button class="filter-tab" data-role="sort" onclick="toggleSortMenu(event)">
            <span class="filter-tab-label">${SORT_LABELS[inboxSortBy]}</span>${I('listFilter',12)}
          </button>
          <div id="sort-menu" class="sort-menu">
            <button class="menu-check-item${inboxSortBy==='last-activity'?' active':''}" onclick="selectSort(event,'last-activity')">${I('clock',15)}Last activity<span class="check">${I('check',14)}</span></button>
            <button class="menu-check-item${inboxSortBy==='date-started'?' active':''}" onclick="selectSort(event,'date-started')">${I('calClock',15)}Date started<span class="check">${I('check',14)}</span></button>
            <button class="menu-check-item${inboxSortBy==='waiting-since'?' active':''}" onclick="selectSort(event,'waiting-since')">${I('hourglass',15)}Waiting since<span class="check">${I('check',14)}</span></button>
          </div>
        </div>
      </div>
      <div class="convo-scroll">
        ${inboxChatItem('student','Student','&mdash;','I keep getting a black screen after The proctoring loads',{live:true,unread:true})}
        ${inboxChatItem('unknown','Unknown','&mdash;',"Hi, I can't access my exam page",{live:true,unread:true})}
        ${inboxChatItem('student','Student','2m ago','The lockdown browser closed mid-exam. What do I do?',{replied:true})}
        ${inboxChatItem('student','Student','4m ago','My camera permission keeps getting denied',{})}
        ${inboxChatItem('admin','Administrator','7m ago','Is there a way to reschedule my exam time',{selected:true})}
        ${inboxChatItem('student','Student','3m ago','The proctoring extension says it needs an update',{replied:true})}
        ${inboxChatItem('student','Student','6 min left','The lockdown browser closed mid-exam',{replied:true})}
        ${inboxChatItem('unknown','Unknown','8 min ago',"Hi, I can't access my exam page",{replied:true})}
        ${inboxChatItem('admin','Administrator','6m ago','Thanks, that should resolve it &mdash; let me know',{replied:true})}
        ${inboxChatItem('student','Student','2m ago','I keep getting a black screen after The proctoring loads',{replied:true})}
        ${inboxChatItem('student','Student','2m ago','Screen recording permission keeps resetting',{replied:true})}
        ${inboxChatItem('unknown','Unknown','9m ago','My screen share stopped working mid-exam',{})}
        ${inboxChatItem('student','Student','2m ago',"Extension update loop won't finish installing",{replied:true})}
        ${inboxChatItem('unknown','Unknown','18m ago','Do I need two monitors disconnected?',{})}
      </div>
    </div>
    <div class="chat-window-wrap">
      <div class="chat-window">
        <div class="chat-header">
          <div class="chat-header-id">
            <strong>Jordan Lee</strong>
            <div class="chat-header-badges">
              <span class="badge badge-student">Student</span>
              <span class="icon-btn-square" style="border:.5px solid var(--border-soft);" title="Canvas">${Ilms('canvas',16)}</span>
            </div>
          </div>
          <div class="chat-actions">
            <button class="icon-btn-square panel-reopen${sidePanelCollapsed?' show':''}" data-panel-toggle
              aria-label="Show context panel" title="Show context panel"
              aria-expanded="${!sidePanelCollapsed}"
              onclick="toggleSidePanel(event)">${I('panelRightOpen',16)}</button>
            <div class="chat-more-wrap">
              <button class="icon-btn-square" onclick="toggleChatMoreMenu(event)" aria-haspopup="true" aria-expanded="false" title="More">${I('dots',16)}</button>
              <div id="chat-more-menu" class="chat-more-menu">
                <button class="chat-more-item" onclick="chatMoreAction(event,'screenshare')">${I('monitor',15)}Screen share</button>
                <button class="chat-more-item" onclick="chatMoreAction(event,'transfer')">${I('reply',15)}Transfer conversation</button>
                <button class="chat-more-item" onclick="chatMoreAction(event,'assign')">${I('userCheck',15)}Assign to teammate</button>
                <div class="chat-more-divider"></div>
                <button class="chat-more-item" onclick="chatMoreAction(event,'spam')">${I('alertCircle',15)}Mark as spam</button>
              </div>
            </div>
            <button class="btn btn-primary btn-deep" style="padding:8px 12px;gap:4px;">${I('x',16)} Close</button>
          </div>
        </div>
        <div class="chat-thread">
          <div class="system-msg">Chat Started - 2:44 PM</div>
          <div class="msg-row"><div class="msg-avatar">JL</div><div class="msg-col"><div class="bubble">The lockdown browser closed mid-exam. What do I do?</div><span class="msg-time">2:44 PM</span></div></div>
          <div class="msg-row mine"><div class="msg-col mine"><div class="bubble mine">Reopen it from your desktop shortcut &mdash; your progress is saved automatically.</div><span class="msg-time">2:45 PM</span></div></div>
        </div>
        <div class="composer-wrap">
          <div class="composer">
            <div id="composer-input" class="composer-input" contenteditable="true"
              data-placeholder="Type a message or ! for commands"
              oninput="onComposerInput(event)" onkeydown="onComposerKeydown(event)"></div>
            <div class="composer-toolbar">
              <div class="composer-icons">
                <button class="toolbar-icon-btn" onclick="toggleEmojiMenu(event)" title="Emoji">${I('smile',20)}</button>
                <button id="mic-btn" class="toolbar-icon-btn" onclick="toggleMic(event)" title="Speech to text">${I('mic',20)}</button>
                <button class="toolbar-icon-btn" onclick="toggleAiMenu(event)" title="AI Assist">${I('sparkles',20)}</button>
              </div>
              <button id="send-btn" class="send-btn" onclick="sendComposerMessage(event)" disabled>${I('arrowUp',20)}</button>
            </div>
          </div>
          <div id="emoji-menu" class="emoji-menu">
            <div class="emoji-grid">${EMOJIS.map(function(em){return '<button onclick="insertEmoji(event,\''+em+'\')">'+em+'</button>';}).join('')}</div>
          </div>
          <div id="ai-menu" class="ai-menu">
            <div class="ai-menu-header">${I('sparkles',13)} AI Assist &middot; Suggested replies</div>
            <button class="ai-suggestion" onclick="useAiSuggestion(event,this)">Glad that worked! Let me know if the browser closes again during the exam.</button>
            <button class="ai-suggestion" onclick="useAiSuggestion(event,this)">I can also verify your student ID now, just to be safe &mdash; want me to do that?</button>
            <button class="ai-suggestion" onclick="useAiSuggestion(event,this)">You're all set. Go ahead and continue with the exam whenever you're ready.</button>
          </div>
        </div>
        <div id="command-menu" class="command-menu">
          <div class="command-trigger"><span class="bang">!</span> Commands &middot; type to filter</div>
          <div class="command-list">
            <div class="command-group-header">Diagnostics &amp; Utilities</div>
            <div class="command-item" data-cmd="restart" onclick="useCommand(event)"><span class="name">Restart lockdown browser</span><span class="command-trigger-key">!restart</span></div>
            <div class="command-item" data-cmd="verifyid" onclick="useCommand(event)"><span class="name">Verify student ID</span><span class="command-trigger-key">!verify-id</span></div>
            <div class="command-item" data-cmd="greeting" onclick="useCommand(event)"><span class="name">Insert greeting</span><span class="command-trigger-key">!greeting</span></div>
            <div class="command-divider"></div>
            <div class="command-group-header">Academic Remedies</div>
            <div class="command-item" onclick="openModal(event)">
              <span><span class="name">Grant extra time</span><span class="subtext">Requires approval &middot; writes to record</span></span>
              <span class="command-trigger-key">!extra-time</span></div>
            <div class="command-item" onclick="closeCommandMenu()">
              <span><span class="name">Reschedule exam</span><span class="subtext">Requires approval &middot; writes to record</span></span>
              <span class="command-trigger-key">!reschedule</span></div>
            <div class="command-item" onclick="goToIntegrityReview(event)">
              <span><span class="name">Escalate to administrator</span><span class="subtext">Requires approval &middot; writes to record</span></span>
              <span class="command-trigger-key">!escalate</span></div>
          </div>
        </div>
      </div>
      <div class="side-panel${sidePanelCollapsed?' collapsed':''}" aria-hidden="${sidePanelCollapsed}">
        <div class="side-tabs">
          <div class="side-tabs-left">
            <button class="side-tab active" onclick="selectSideTab(event,'user')">User</button>
            <button class="side-tab" onclick="selectSideTab(event,'history')">History</button>
            <button class="side-tab" onclick="selectSideTab(event,'resources')">Resources</button>
          </div>
          <div class="side-tabs-actions">
            <button class="icon-btn-square">${I('external',14)}</button>
            <button class="icon-btn-square" aria-label="Collapse context panel" title="Collapse context panel"
              onclick="toggleSidePanel(event)">${I('panelRightClose',14)}</button>
          </div>
        </div>
        <div class="field-row-list">
          <div class="field-row"><span>Student Name</span><strong>Jordan Lee</strong></div>
          <div class="field-row"><span>Student ID</span><strong>e6a0c4f2b8d6e0a4</strong></div>
          <div class="field-row"><span>Course</span><strong>BIO 201 &middot; Cell Biology</strong></div>
          <div class="field-row"><span>Exam</span><strong>Midterm &mdash; Ch. 4-7</strong></div>
          <div class="field-row"><span>Institution</span><strong>Cascade State University</strong></div>
        </div>
        <div class="accordion-header" onclick="toggleAccordion(event,'acc-userdata')"><span class="left">${I('user',16)}User Data</span><span class="chev">${I('chevronRight',16)}</span></div>
        <div class="accordion-body" id="acc-userdata">
          <div class="accordion-row"><strong>Email</strong><span>jordan.lee@cascadestate.edu</span></div>
          <div class="accordion-row"><strong>Enrollment Status</strong><span>Active &mdash; Fall 2026</span></div>
          <div class="accordion-row"><strong>Accommodations</strong><span>None on file</span></div>
          <div class="accordion-row"><strong>Time Zone</strong><span>Pacific Time (UTC-7)</span></div>
        </div>
        <div class="accordion-header" onclick="toggleAccordion(event,'acc-hardware')"><span class="left">${I('cpu',16)}Hardware &amp; System</span><span class="chev">${I('chevronRight',16)}</span></div>
        <div class="accordion-body" id="acc-hardware">
          <div class="accordion-row"><strong>Operating System</strong><span>Windows 11 Home</span></div>
          <div class="accordion-row"><strong>Browser</strong><span>Chrome 128.0.6613</span></div>
          <div class="accordion-row"><strong>Lockdown Browser Version</strong><span>2.1.4 &mdash; up to date</span></div>
          <div class="accordion-row"><strong>Webcam</strong><span>Logitech C920 &mdash; Connected</span></div>
          <div class="accordion-row"><strong>Microphone</strong><span>Built-in &mdash; Connected</span></div>
          <div class="accordion-row"><strong>Displays Detected</strong><span>1 monitor</span></div>
        </div>
        <div class="accordion-header" onclick="toggleAccordion(event,'acc-extensions')"><span class="left">${I('puzzle',16)}Extensions</span><span class="chev">${I('chevronRight',16)}</span></div>
        <div class="accordion-body" id="acc-extensions">
          <div class="accordion-row"><strong>Grammarly</strong><span>Disabled during exam</span></div>
          <div class="accordion-row"><strong>1Password</strong><span>Disabled during exam</span></div>
          <div class="accordion-row"><strong>Honey</strong><span>Not detected running</span></div>
        </div>
        <div class="accordion-header" onclick="toggleAccordion(event,'acc-examsettings')"><span class="left">${I('settings2',16)}Exam Settings</span><span class="chev">${I('chevronRight',16)}</span></div>
        <div class="accordion-body" id="acc-examsettings">
          <div class="accordion-row"><strong>Time Limit</strong><span>90 minutes</span></div>
          <div class="accordion-row"><strong>Attempts Allowed</strong><span>1</span></div>
          <div class="accordion-row"><strong>Webcam Required</strong><span>Yes</span></div>
          <div class="accordion-row"><strong>Allowed Materials</strong><span>None &mdash; closed book</span></div>
          <div class="accordion-row"><strong>Extra Time Granted</strong><span>None</span></div>
        </div>
        <div class="accordion-header open" onclick="toggleAccordion(event,'acc-environment')"><span class="left">${I('appWindow',16)}Environment</span><span class="chev">${I('chevronRight',16)}</span></div>
        <div class="accordion-body open" id="acc-environment">
          <div class="accordion-row"><strong>Canvas &mdash; BIO 201 Exam</strong><span>chat.theproctoring.com</span></div>
          <div class="accordion-row"><strong>Chegg &mdash; Homework Help</strong><span>May conflict with lockdown browser</span></div>
          <div class="accordion-row"><strong>Access status</strong><span>Identity re-verification required before re-entry</span></div>
        </div>
      </div>
    </div>
  </div>`;
}
