/* ================= APP / ROUTING ================= */
const PAGES = {
  'inbox':                    {sidenav:'inbox',     secondary:null, bare:true,                   content:pageInbox},
  'knowledge-sources':        {sidenav:'knowledge',  secondary:()=>knowledgeNav('knowledge-sources'), content:pageKnowledgeSources},
  'knowledge-content':        {sidenav:'knowledge',  secondary:()=>knowledgeNav('knowledge-content'), content:pageKnowledgeContent},
  'knowledge-articles':       {sidenav:'knowledge',  secondary:()=>knowledgeNav('knowledge-articles'),content:pageKnowledgeArticles},
  'reports-overview':         {sidenav:'reports',    secondary:()=>reportsNav('reports-overview'),content:pageReportsOverview},
  'reports-all':              {sidenav:'reports',    secondary:()=>reportsNav('reports-all'),     content:pageReportsAll},
  'reports-flagged-sessions': {sidenav:'reports',    secondary:()=>reportsNav('reports-flagged-sessions'),content:pageReportsFlagged},
  'reports-room-scan':        {sidenav:'reports',    secondary:()=>reportsNav('reports-room-scan'),content:pageReportsRoomScan},
  'reports-ai-assist':        {sidenav:'reports',    secondary:()=>reportsNav('reports-ai-assist'),content:pageReportsAiAssist},
  'contacts-administrators':  {sidenav:'contacts',   secondary:contactsNav,                       content:pageContactsAdministrators},
  'settings-home':            {sidenav:'settings',   secondary:()=>settingsNav('home'),           content:pageSettingsHome},
  'settings-general':         {sidenav:'settings',   secondary:()=>settingsNav('general'),        content:pageSettingsGeneral},
  'integrity-review':         {sidenav:null,         secondary:null,                              content:pageIntegrityReview},
};
const DEFAULT_FOR_ICON = {inbox:'inbox', knowledge:'knowledge-sources', reports:'reports-overview', contacts:'contacts-administrators', settings:'settings-home'};

function renderShell(key){
  const cfg = PAGES[key];
  if(!cfg) return;
  const app = document.getElementById('app');
  // Every page body sits inside one white card, except the inbox, which composes
  // its own pair of cards (conversation list + chat window) and opts out.
  const body = cfg.bare ? cfg.content() : '<div class="content-card">' + cfg.content() + '</div>';
  app.innerHTML = sidenav(cfg.sidenav) + (cfg.secondary ? cfg.secondary() : '')
    + `<div class="content${cfg.bare?' bare':''}">` + body + '</div>';
}

function showPage(key){
  if(!PAGES[key]) return;
  closeCommandMenu();
  closeModal();
  renderShell(key);
  window.scrollTo(0,0);
}

document.addEventListener('click', function(e){
  const iconBtn = e.target.closest('[data-page-icon]');
  if(iconBtn){
    const target = DEFAULT_FOR_ICON[iconBtn.dataset.pageIcon];
    if(target){ showPage(target); }
    return;
  }
  const pageBtn = e.target.closest('[data-page]');
  if(pageBtn){
    e.preventDefault();
    showPage(pageBtn.dataset.page);
    return;
  }
  // click-away closes the views popover
  const popover = document.getElementById('views-popover');
  if(popover && popover.classList.contains('open')){
    const withinPopover = e.target.closest('#views-popover');
    const isToggle = e.target.closest('.convo-header-btn');
    if(!withinPopover && !isToggle) popover.classList.remove('open');
  }
  // click-away closes composer flyouts (command menu / emoji / AI)
  if(!e.target.closest('.composer-wrap')){
    closeCommandMenu();
    closeEmojiMenu();
    closeAiMenu();
  }
  // click-away closes the chat header "more" menu
  const moreMenu = document.getElementById('chat-more-menu');
  if(moreMenu && moreMenu.classList.contains('open')){
    const withinMore = e.target.closest('#chat-more-menu');
    const isMoreToggle = e.target.closest('.chat-more-wrap > .icon-btn-square');
    if(!withinMore && !isMoreToggle) moreMenu.classList.remove('open');
  }
  // click-away closes the status filter / sort dropdowns
  const filterMenu = document.getElementById('filter-menu');
  if(filterMenu && filterMenu.classList.contains('open')){
    const within = e.target.closest('#filter-menu');
    const isToggle = e.target.closest('[data-role="filter"]');
    if(!within && !isToggle) filterMenu.classList.remove('open');
  }
  const sortMenu = document.getElementById('sort-menu');
  if(sortMenu && sortMenu.classList.contains('open')){
    const within = e.target.closest('#sort-menu');
    const isToggle = e.target.closest('[data-role="sort"]');
    if(!within && !isToggle) sortMenu.classList.remove('open');
  }
});

// These four popovers all live in the header/list area (as opposed to the
// composer flyouts, which are spatially separate) — each one's toggle closes
// the other three, since stopPropagation() below means the document-level
// click-away listener never runs for these clicks, only for genuine
// click-aways.
function closeViews(){ const p = document.getElementById('views-popover'); if(p) p.classList.remove('open'); }
function closeChatMoreMenu(){ const m = document.getElementById('chat-more-menu'); if(m) m.classList.remove('open'); }
function toggleViews(e){
  e.stopPropagation();
  closeChatMoreMenu(); closeFilterMenu(); closeSortMenu();
  const popover = document.getElementById('views-popover');
  if(popover) popover.classList.toggle('open');
}
function selectView(e, key){
  e.stopPropagation();
  document.querySelectorAll('.view-item').forEach(el=>el.classList.remove('active'));
  e.currentTarget.classList.add('active');
  document.getElementById('views-popover').classList.remove('open');
  showHint(key==='your-inbox' ? 'Showing Your Inbox' : 'This is a prototype — only Your Inbox has live data');
}
function toggleChatMoreMenu(e){
  e.stopPropagation();
  closeViews(); closeFilterMenu(); closeSortMenu();
  const menu = document.getElementById('chat-more-menu');
  if(!menu) return;
  const open = menu.classList.toggle('open');
  e.currentTarget.setAttribute('aria-expanded', String(open));
}
function chatMoreAction(e, key){
  e.stopPropagation();
  document.getElementById('chat-more-menu').classList.remove('open');
  const labels = {screenshare:'Screen share',transfer:'Transfer conversation',assign:'Assign to teammate',spam:'Mark as spam'};
  showHint('This is a prototype — ' + (labels[key]||'this action') + ' isn’t wired up yet');
}
function toggleFilterMenu(e){ e.stopPropagation(); closeSortMenu(); closeViews(); closeChatMoreMenu(); document.getElementById('filter-menu').classList.toggle('open'); }
function toggleSortMenu(e){ e.stopPropagation(); closeFilterMenu(); closeViews(); closeChatMoreMenu(); document.getElementById('sort-menu').classList.toggle('open'); }
function closeFilterMenu(){ const m=document.getElementById('filter-menu'); if(m) m.classList.remove('open'); }
function closeSortMenu(){ const m=document.getElementById('sort-menu'); if(m) m.classList.remove('open'); }
function selectFilter(e, key){
  e.stopPropagation();
  inboxStatusFilter = key;
  document.querySelector('[data-role="filter"] .filter-tab-label').textContent = FILTER_LABELS[key];
  document.querySelectorAll('#filter-menu .menu-check-item').forEach(function(el,i){ el.classList.toggle('active', ['open','closed','all'][i]===key); });
  closeFilterMenu();
  showHint('This is a prototype — filtering isn’t wired up yet');
}
function selectSort(e, key){
  e.stopPropagation();
  inboxSortBy = key;
  document.querySelector('[data-role="sort"] .filter-tab-label').textContent = SORT_LABELS[key];
  document.querySelectorAll('#sort-menu .menu-check-item').forEach(function(el,i){ el.classList.toggle('active', ['last-activity','date-started','waiting-since'][i]===key); });
  closeSortMenu();
  showHint('This is a prototype — sorting isn’t wired up yet');
}
// Selecting a row marks it read and moves the selected state — the open
// thread itself doesn't change, since only Jordan Lee's conversation has
// live data in this prototype.
function selectChatItem(e, row){
  if(row.classList.contains('selected')) return;
  document.querySelectorAll('.chat-item.selected').forEach(function(el){
    el.classList.remove('selected');
    el.setAttribute('aria-current','false');
  });
  row.classList.remove('unread');
  row.classList.add('selected');
  row.setAttribute('aria-current','true');
  showHint('This is a prototype — only Jordan Lee’s conversation has live data');
}
function onChatItemKeydown(e){
  if(e.key === 'Enter' || e.key === ' '){
    e.preventDefault();
    e.currentTarget.click();
  }
}
function toggleAccordion(e, id){
  e.stopPropagation();
  const header = e.currentTarget;
  const body = document.getElementById(id);
  header.classList.toggle('open');
  if(body) body.classList.toggle('open');
}
function toggleSidePanel(e){
  if(e) e.stopPropagation();
  sidePanelCollapsed = !sidePanelCollapsed;
  const panel = document.querySelector('.side-panel');
  if(panel){
    panel.classList.toggle('collapsed', sidePanelCollapsed);
    panel.setAttribute('aria-hidden', String(sidePanelCollapsed));
  }
  document.querySelectorAll('[data-panel-toggle]').forEach(btn=>{
    btn.classList.toggle('show', sidePanelCollapsed);
    btn.setAttribute('aria-expanded', String(!sidePanelCollapsed));
  });
  // Whichever control was clicked is the one that just disappeared, so hand
  // focus to its counterpart rather than dropping it on <body>.
  const next = sidePanelCollapsed
    ? document.querySelector('[data-panel-toggle]')
    : document.querySelector('.side-tabs-actions [aria-label="Collapse context panel"]');
  if(next) next.focus();
}
function selectSideTab(e, key){
  e.stopPropagation();
  document.querySelectorAll('.side-tab').forEach(el=>el.classList.remove('active'));
  e.currentTarget.classList.add('active');
  if(key !== 'user') showHint('This is a prototype — only the User tab has live data');
}

function toggleCommandMenu(e){
  if(e) e.stopPropagation();
  const menu = document.getElementById('command-menu');
  if(menu) menu.classList.toggle('open');
}
function closeCommandMenu(){
  const menu = document.getElementById('command-menu');
  if(menu) menu.classList.remove('open');
}
function closeEmojiMenu(){
  const menu = document.getElementById('emoji-menu');
  if(menu) menu.classList.remove('open');
}
function closeAiMenu(){
  const menu = document.getElementById('ai-menu');
  if(menu) menu.classList.remove('open');
}

/* ---------------- composer ---------------- */
function placeCaretAtEnd(el){
  el.focus();
  const range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}
function updateSendBtn(){
  const el = document.getElementById('composer-input');
  const btn = document.getElementById('send-btn');
  if(!el || !btn) return;
  btn.disabled = el.textContent.trim().length === 0;
}
function filterCommandMenu(query){
  document.querySelectorAll('#command-menu .command-item').forEach(item=>{
    const match = !query || item.textContent.toLowerCase().includes(query);
    item.style.display = match ? '' : 'none';
  });
}
function onComposerInput(e){
  const el = e.currentTarget;
  updateSendBtn();
  const text = el.textContent;
  if(text.trim().startsWith('!')){
    closeEmojiMenu();
    closeAiMenu();
    document.getElementById('command-menu').classList.add('open');
    filterCommandMenu(text.trim().slice(1).toLowerCase());
  } else {
    closeCommandMenu();
  }
}
function onComposerKeydown(e){
  if(e.key === 'Enter' && !e.shiftKey){
    e.preventDefault();
    sendComposerMessage(e);
  } else if(e.key === 'Escape'){
    closeCommandMenu();
  }
}
function formatNowTime(){
  const d = new Date();
  let h = d.getHours();
  const m = d.getMinutes().toString().padStart(2,'0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12; if(h === 0) h = 12;
  return h + ':' + m + ' ' + ampm;
}
function appendMineMessage(text){
  const thread = document.querySelector('.chat-thread');
  if(!thread) return;
  const row = document.createElement('div');
  row.className = 'msg-row mine';
  const col = document.createElement('div');
  col.className = 'msg-col mine';
  const bubble = document.createElement('div');
  bubble.className = 'bubble mine';
  bubble.textContent = text;
  const time = document.createElement('span');
  time.className = 'msg-time';
  time.textContent = formatNowTime();
  col.appendChild(bubble);
  col.appendChild(time);
  row.appendChild(col);
  thread.appendChild(row);
  thread.scrollTop = thread.scrollHeight;
}
function sendComposerMessage(e){
  if(e) e.preventDefault();
  const el = document.getElementById('composer-input');
  if(!el) return;
  const text = el.textContent.trim();
  if(!text) return;
  appendMineMessage(text);
  el.textContent = '';
  updateSendBtn();
  closeCommandMenu();
  el.focus();
}
function toggleEmojiMenu(e){
  e.stopPropagation();
  closeCommandMenu();
  closeAiMenu();
  document.getElementById('emoji-menu').classList.toggle('open');
}
function insertEmoji(e, emoji){
  e.stopPropagation();
  const el = document.getElementById('composer-input');
  el.textContent += emoji;
  placeCaretAtEnd(el);
  updateSendBtn();
  closeEmojiMenu();
}
function toggleAiMenu(e){
  e.stopPropagation();
  closeCommandMenu();
  closeEmojiMenu();
  document.getElementById('ai-menu').classList.toggle('open');
}
function useAiSuggestion(e, btn){
  e.stopPropagation();
  const el = document.getElementById('composer-input');
  el.textContent = btn.textContent;
  placeCaretAtEnd(el);
  updateSendBtn();
  closeAiMenu();
}
function useCommand(e){
  e.stopPropagation();
  const key = e.currentTarget.dataset.cmd;
  const text = COMMAND_TEXTS[key];
  if(!text) return;
  const el = document.getElementById('composer-input');
  el.textContent = text;
  placeCaretAtEnd(el);
  updateSendBtn();
  closeCommandMenu();
}
/* ---------------- dictation (Web Speech API, with simulated fallback) ---------------- */
let recognition = null;
let micBaseText = '';
let micFallbackTimer = null;
function getSpeechRecognitionCtor(){
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}
function startSimulatedDictation(btn, el){
  micBaseText = el.textContent.trim() ? el.textContent.trim() + ' ' : '';
  btn.classList.add('mic-recording');
  el.setAttribute('data-placeholder','Listening…');
  micFallbackTimer = setTimeout(function(){
    btn.classList.remove('mic-recording');
    el.setAttribute('data-placeholder','Type a message or ! for commands');
    const phrase = "Sure — I’ll walk you through the restart steps now.";
    el.textContent = micBaseText + phrase;
    placeCaretAtEnd(el);
    updateSendBtn();
  }, 1400);
}
function toggleMic(e){
  e.stopPropagation();
  closeCommandMenu();
  closeEmojiMenu();
  closeAiMenu();
  const btn = document.getElementById('mic-btn');
  const el = document.getElementById('composer-input');
  if(btn.classList.contains('mic-recording')){
    clearTimeout(micFallbackTimer);
    if(recognition){ recognition.stop(); recognition = null; }
    btn.classList.remove('mic-recording');
    el.setAttribute('data-placeholder','Type a message or ! for commands');
    return;
  }
  const SpeechRecognitionCtor = getSpeechRecognitionCtor();
  if(!SpeechRecognitionCtor){
    // no browser support at all — keep the demo alive with a simulated transcript
    startSimulatedDictation(btn, el);
    return;
  }
  micBaseText = el.textContent.trim() ? el.textContent.trim() + ' ' : '';
  let finalTranscript = '';
  let started = false;
  let settled = false; // true once this session has been resolved exactly once (real or fallback)
  recognition = new SpeechRecognitionCtor();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  recognition.onstart = function(){
    started = true;
    btn.classList.add('mic-recording');
    el.setAttribute('data-placeholder','Listening…');
  };
  recognition.onresult = function(event){
    let interimTranscript = '';
    for(let i = event.resultIndex; i < event.results.length; i++){
      const transcript = event.results[i][0].transcript;
      if(event.results[i].isFinal){
        finalTranscript += transcript + ' ';
      } else {
        interimTranscript += transcript;
      }
    }
    el.textContent = micBaseText + finalTranscript + interimTranscript;
    placeCaretAtEnd(el);
    updateSendBtn();
  };
  recognition.onerror = function(event){
    if(settled) return; // watchdog (or a prior error) already resolved this session
    settled = true;
    recognition = null;
    if(event.error === 'no-speech'){
      showHint('No speech detected.');
      btn.classList.remove('mic-recording');
      el.setAttribute('data-placeholder','Type a message or ! for commands');
    } else {
      // permission denied, or blocked by this page's embed context — fall back to a simulated transcript
      startSimulatedDictation(btn, el);
    }
  };
  recognition.onend = function(){
    if(settled) return;
    settled = true;
    btn.classList.remove('mic-recording');
    el.setAttribute('data-placeholder','Type a message or ! for commands');
    recognition = null;
  };
  try {
    recognition.start();
  } catch(err){
    settled = true;
    recognition = null;
    startSimulatedDictation(btn, el);
    return;
  }
  // watchdog: some embed contexts silently block the mic (no onstart, no onerror ever fires) —
  // fall back to a simulated transcript rather than leaving the button looking unresponsive
  setTimeout(function(){
    if(started || settled) return;
    settled = true;
    const stale = recognition;
    recognition = null;
    try { stale.abort(); } catch(err){}
    startSimulatedDictation(btn, el);
  }, 700);
}

function openModal(e){
  if(e) e.stopPropagation();
  closeCommandMenu();
  document.getElementById('backdrop').classList.add('open');
  document.getElementById('remedy-modal').classList.add('open');
}
function closeModal(){
  const backdrop = document.getElementById('backdrop');
  const modal = document.getElementById('remedy-modal');
  if(backdrop) backdrop.classList.remove('open');
  if(modal) modal.classList.remove('open');
}
document.getElementById('backdrop').addEventListener('click', closeModal);

function goToIntegrityReview(e){
  if(e) e.stopPropagation();
  closeCommandMenu();
  showPage('integrity-review');
}

let hintTimer = null;
function showHint(msg){
  const toast = document.getElementById('hint-toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(hintTimer);
  hintTimer = setTimeout(()=>toast.classList.remove('show'), 2200);
}

/* ---------------- chart hover tooltip ---------------- */
// One shared floating tooltip, positioned from delegated pointer events —
// works against every re-render of the reports pages without re-wiring.
function chartTooltipEl(){
  let el = document.getElementById('chart-tooltip');
  if(!el){
    el = document.createElement('div');
    el.id = 'chart-tooltip';
    el.className = 'chart-tooltip';
    document.body.appendChild(el);
  }
  return el;
}
function clearChartMarks(){
  document.querySelectorAll('.chart-crosshair.show, .chart-hover-dot.show').forEach(function(mark){ mark.classList.remove('show'); });
}
function hideChartTooltip(){
  const el = document.getElementById('chart-tooltip');
  if(el) el.classList.remove('show');
  clearChartMarks();
}
function positionChartTooltip(tip, clientX, clientY){
  const pad = 14;
  const rect = tip.getBoundingClientRect();
  let left = clientX + pad, top = clientY + pad;
  if(left + rect.width > window.innerWidth - 8) left = clientX - rect.width - pad;
  if(top + rect.height > window.innerHeight - 8) top = clientY - rect.height - pad;
  tip.style.left = left+'px';
  tip.style.top = top+'px';
}
function showBarTooltip(bar, e){
  let data; try{ data = JSON.parse(bar.dataset.tip); } catch(err){ return; }
  clearChartMarks();
  const tip = chartTooltipEl();
  tip.innerHTML = chartTooltipHtml(data);
  tip.classList.add('show');
  positionChartTooltip(tip, e.clientX, e.clientY);
}
function showLineTooltip(hit, e){
  const svg = hit.closest('svg.mini-chart');
  if(!svg) return;
  let data; try{ data = JSON.parse(hit.dataset.tip); } catch(err){ return; }
  clearChartMarks();
  const tip = chartTooltipEl();
  tip.innerHTML = chartTooltipHtml(data);
  tip.classList.add('show');
  positionChartTooltip(tip, e.clientX, e.clientY);

  const cx = hit.getAttribute('data-cx');
  const cross = svg.querySelector('.chart-crosshair');
  if(cross){ cross.setAttribute('x1', cx); cross.setAttribute('x2', cx); cross.classList.add('show'); }
  let cys = []; try{ cys = JSON.parse(hit.getAttribute('data-cy')); } catch(err){}
  svg.querySelectorAll('.chart-hover-dot').forEach(function(dot){
    const si = Number(dot.dataset.series);
    if(cys[si] === undefined) return;
    dot.setAttribute('cx', cx);
    dot.setAttribute('cy', cys[si]);
    dot.classList.add('show');
  });
}
function chartTooltipHtml(data){
  const rows = (data.entries||[]).map(function(en){
    return '<div class="chart-tip-row"><span class="chart-tip-dot" style="background:'+en.color+'"></span>'
      + '<span class="chart-tip-name">'+en.name+'</span><span class="chart-tip-value">'+en.value+'</span></div>';
  }).join('');
  return (data.label ? '<div class="chart-tip-label">'+data.label+'</div>' : '') + rows;
}
function initChartTooltip(){
  document.addEventListener('mousemove', function(e){
    const hit = e.target.closest && e.target.closest('.chart-hit');
    if(hit){ showLineTooltip(hit, e); return; }
    const bar = e.target.closest && e.target.closest('.chart-bar');
    if(bar){ showBarTooltip(bar, e); return; }
    hideChartTooltip();
  });
  // mousemove alone won't fire once the pointer leaves the window entirely.
  document.addEventListener('mouseout', function(e){
    if(!e.relatedTarget) hideChartTooltip();
  });
}
initChartTooltip();

showPage('inbox');
